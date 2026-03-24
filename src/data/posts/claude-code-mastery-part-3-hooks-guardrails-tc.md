
# Claude Code 完全攻略：Hooks 同安全機制 -- 點樣令 AI 安全做嘢

上個月我個 AI agent 差啲 send 咗張 invoice 俾錯人。

唔係 test。唔係假設。係真金白銀嘅 invoice，真實嘅金額，寄去錯誤嘅 client email。個 agent 揀啱咗附件、揀啱咗 subject line、寫啱咗 body text。但佢揀錯咗收件人。

我嘅 PreToolUse hook 攔截咗。Policy engine 對比咗 outbound email 嘅參數，發現我未 approve，直接 block。我收到一個 deny message 而唔係 "sent" 確認。Check 返封信，發現錯 address，改正，手動 approve。成件事用咗十二秒。損失：零。

做生意嘅人一定明白：一封寄錯嘅 email 可以搞到你同 client 嘅關係即刻出事。特別喺香港，你嘅 client 可能隔籬位就坐住你另一個 client 嘅人。呢個 hook 救咗我一次，成個 system 就值回票價。

呢篇係 Claude Code 完全攻略嘅第三篇。[第一篇](/blog/claude-code-mastery-part-1-claude-md-tc)講 CLAUDE.md，[第二篇](/blog/claude-code-mastery-part-2-memory-systems-tc)講 memory 架構。今次講嘅嘢，大部分人完全唔做：點樣令一個自主 AI agent 安全到你敢用佢處理真正嘅業務。

## 自主 AI 嘅信任問題

AI agent 有用，係因為佢唔使問你就做嘢。AI agent 危險，都係因為呢個原因。

如果你個 agent 可以 send email、改 file、發 WhatsApp、query database -- 我嘅 Ada 每日都做緊呢啲 -- 噉每一個 tool call 都係真槍實彈。Send 咗嘅 email 收唔返。發咗嘅 WhatsApp delete 唔到。

大部分 Claude Code user 完全冇 guardrails。佢哋靠 model 自己嘅判斷。寫 code 嘅時候冇問題，但當個 agent 幫你管 client communication，呢個做法就太冒險。

我需要嘅係 "trust but verify" -- 信任但驗證。Hooks 俾咗我呢個能力。

## Hooks 係乜

Hooks 係 Claude Code lifecycle event 觸發嘅 shell command 或者 HTTP call。你可以當佢係 AI agent 嘅 middleware -- 坐喺 agent 嘅意圖同行動之間，可以觀察、修改、或者阻止嘢發生。

Claude Code 支援幾種 hook type：

- **PreToolUse** -- tool 執行之前觸發。可以 approve 或者 block。
- **PostToolUse** -- tool 執行之後觸發。可以 inspect output。
- **Stop** -- session 結束之前觸發。可以阻止退出。
- **InstructionsLoaded** -- session 開始時觸發。可以注入 context。

你喺 `.claude/settings.json` 入面配置。每個 hook 指定 event type、optional matcher（針對特定 tool），同 action -- shell command 或者 HTTP endpoint。

## PreToolUse：攔截錯誤嘅 Email

呢個就係救咗我嗰個 hook。每次 Claude Code 準備 send email，hook 就 fire。佢 POST 個 tool call 嘅所有參數去我本地嘅 policy server。Server evaluate 兩條 rule：

**Rule 1：Sender 驗證。** Email 一定要從 `sam@adaptig.com` 發出。用錯 account 即刻 block。

**Rule 2：User approval。** Server parse 成個對話 transcript，搵明確嘅 approval keyword -- "send it"、"go ahead"、"confirmed"。如果我未 approve，tool call 直接 deny，附帶提示：「請先 present draft。」

Config 入面嘅 policy 大概係噉：

```yaml
policies:
  - event: PreToolUse
    matcher: mcp__google_workspace__send_gmail_message
    rules:
      - field: tool_input.user_google_email
        equals: "sam@adaptig.com"
        on_fail: deny
        reason: "Wrong sender account. Must use sam@adaptig.com"
      - check: user_approval
        approval_keywords:
          - "approved"
          - "send it"
          - "go ahead"
          - "confirmed"
          - "lgtm"
        on_fail: deny
        reason: "Outbound email requires explicit user approval."
```

WhatsApp message 同 file send 都係同一個 pattern。所有 outbound communication 都要過 approval。

## HTTP Hooks Server

所有 hook 都指向一個 FastAPI server，跑喺 `localhost:18924`。唔係乜嘢 microservice 架構 -- 係 163 行 Python，但可能係我成個 system 入面最重要嘅 code。

Server 收到 hook payload -- session ID、tool name、tool input、transcript path -- 然後跑 policy engine。Policy engine load YAML config 嘅 rules，match incoming event，return decision：`{"decision": "allow"}` 或者 `{"decision": "deny", "reason": "..."}`。

每個 decision 都 log 落 SQLite database（`store/hooks.db`）。我可以 audit 邊啲 tool call 被 block、邊啲被 approve、原因係乜。

第一個月 review logs，我搵到 14 個被 block 嘅 send。3 個係真正嘅 catch -- wrong recipient、wrong sender、missing approval。11 個係 false positive，因為我忘記講 "send it"。Tune 完 approval keywords 之後，false positive rate 跌到接近零。

Rate limiting 都 built in。Gmail send 每小時 cap 20 次，每次之間 cooldown 10 秒。唔係因為我真係 send 噉多 email，而係防止 autonomous agent 失控 loop 燒晒你嘅 daily send quota。

個 server 用 macOS LaunchAgent 自動啟動。機一開，hooks server 已經跑緊。冇手動步驟，冇機會漏。

## Stop Hook：記憶強制寫入

Stop hook 解決嘅唔係安全問題 -- 係紀律問題。

我個 agent 管住每個 active client 嘅 memory file -- status、action items、contact details。如果一個 session 做咗 client work 但退出時冇 update memory file，下一個 session 就會 cold start。之前每個禮拜都會發生一次。

Stop hook 喺 session 結束前注入一個 prompt：「呢個 session 有冇涉及 client work？如果有，check memory file 有冇 update。如果冇，唔好退出 -- 而家 update。」

Agent 唔可以 skip 呢個步驟。Hook 每次都 fire。Deploy 咗之後，我再冇 lost 過 session context。

## InstructionsLoaded：兩秒 Init

InstructionsLoaded hook 喺 session start 時 fire。我嘅做法：

1. Load 最後 15 行 worklog（上次做咗乜）
2. Check priority todos 有冇 overdue
3. 一句嘢 greet：上次做咗乜、幾多嘢 due、today focus 乜

成個過程兩秒。唔會 load 成個 memory system -- 嗰個會燒 token。淨係 load 夠恢復 momentum 嘅量。

開 Claude Code 見到空白 prompt，同見到「上次 session：sent Garden invoice。今日有 2 個 item due。要 focus 乜？」-- 呢個就係 tool 同 assistant 嘅分別。

## PostToolUse：靜默防禦

我跑緊一個 prompt injection defender 做 PostToolUse hook。佢 scan 每個 Read、WebFetch、Bash output，搵可疑嘅 pattern -- 例如 fetched content 入面有 embedded instruction 想操控 agent 行為。

搵到嘅話會 flag severity level 同 recommend caution。唔會 block tool call（PostToolUse 冇辦法 retroactively block），但會喺 agent context 注入 warning。

如果你個 agent fetch 外部 webpage 或者 read untrusted file，呢啲 content 會入到 context window。一個寫得好嘅 injection 可以 redirect agent behavior。Defender 唔能令呢件事不可能發生，但令佢 visible。

## 由零開始

如果你只做一樣嘢：加一個 PreToolUse hook 喺你嘅 email sending tool 上面。一個 hook。一條 rule。Send 之前要 explicit approval。

15 分鐘 setup。保護你免受自主 agent 最高風險嘅 failure mode：send 錯嘢俾錯人。

之後你可以慢慢加 complexity -- HTTP server、policy engine、audit log、rate limiter。但基礎好簡單：**高風險操作，一定要有 checkpoint。**

我描述嘅 hooks system 係 163 行 policy engine、一個 YAML config file、同 `settings.json` 入面幾個 entry。靜默運行，每個 tool call 加少過 100ms latency，catch 過 3 個本來會好尷尬嘅錯誤。

自主 AI 冇 guardrails 係 liability。有 guardrails 嘅自主 AI 係一個永遠唔會忘記 double-check 嘅員工。

下一篇：[第四篇 -- Agent Teams](/blog/claude-code-mastery-part-4-agent-teams-tc)，講 multi-agent collaboration、sub-agent delegation、同你嘅 AI agents 開始互相合作之後會發生啲乜。會有啲 weird。好嘅 weird。

---

*我喺六個國家 train 企業做 AI adoption。如果你都喺度用 Claude Code 砌嘢，歡迎嚟 [LinkedIn](https://www.linkedin.com/in/samwong-ai/) connect 交流。*
