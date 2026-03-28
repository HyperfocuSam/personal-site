# Claude Code 完全攻略：Hooks 與安全機制 -- 如何讓 AI 安全執行工作

上個月，我的 AI agent 差點將一張 invoice 發送給錯誤的收件人。

不是測試，不是假設。是真正的 invoice，真實的金額，寄往錯誤的 client email。Agent 選對了附件、選對了 subject line、寫對了 body text，但它選錯了收件人。

我的 PreToolUse hook 攔截了這次操作。Policy engine 比對了 outbound email 的參數，發現我尚未 approve，直接 block。我收到的是一則 deny message 而非 "sent" 確認。檢查後發現地址有誤，修正後手動 approve。整個過程耗時十二秒。損失：零。

做生意的人一定明白：一封寄錯的 email 足以令你與 client 的關係即刻出問題。尤其在香港，你的 client 可能就坐在你另一個 client 的隔壁。這個 hook 救了我一次，整套 system 便已值回票價。

這是 Claude Code 完全攻略的第三篇。[第一篇](/blog/claude-code-mastery-part-1-claude-md-tc)講 CLAUDE.md，[第二篇](/blog/claude-code-mastery-part-2-memory-systems-tc)講 memory 架構。本篇討論的內容，大多數人完全忽略：如何令一個自主 AI agent 安全到你敢讓它處理真正的業務。

## 自主 AI 的信任問題

AI agent 有用，是因為它不需要請示就能行動。AI agent 危險，也是同樣原因。

如果你的 agent 能夠 send email、修改 file、發送 WhatsApp、query database -- 我的 Ada 每天都在執行這些操作 -- 那麼每一個 tool call 都是真槍實彈。發出的 email 無法收回，發出的 WhatsApp 無法刪除。

大部分 Claude Code 使用者完全沒有 guardrails。他們依賴 model 本身的判斷。撰寫 code 時這沒有問題，但當 agent 替你管理 client communication，這個做法就太冒險了。

我需要的是 "trust but verify" -- 信任但驗證。Hooks 賦予了我這個能力。

## Hooks 是什麼

Hooks 是由 Claude Code lifecycle event 觸發的 shell command 或 HTTP call。可以將其理解為 AI agent 的 middleware -- 位於 agent 的意圖與行動之間，能夠觀察、修改，或阻止事件發生。

Claude Code 支援幾種 hook type：

- **PreToolUse** -- tool 執行之前觸發。可以 approve 或 block。
- **PostToolUse** -- tool 執行之後觸發。可以 inspect output。
- **Stop** -- session 結束之前觸發。可以阻止退出。
- **InstructionsLoaded** -- session 開始時觸發。可以注入 context。

在 `.claude/settings.json` 中配置。每個 hook 指定 event type、optional matcher（針對特定 tool），以及 action -- shell command 或 HTTP endpoint。

## PreToolUse：攔截錯誤的 Email

這就是救了我的那個 hook。每次 Claude Code 準備 send email，hook 便會觸發。它將 tool call 的所有參數 POST 到我本地的 policy server。Server 評估兩條 rule：

**Rule 1：Sender 驗證。** Email 必須從 `sam@adaptig.com` 發出。使用錯誤 account 即刻 block。

**Rule 2：User approval。** Server 解析整段對話 transcript，搜尋明確的 approval keyword -- "send it"、"go ahead"、"confirmed"。若我尚未 approve，tool call 直接 deny，並附帶提示：「請先 present draft。」

Config 中的 policy 大致如下：

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

WhatsApp message 與 file send 採用同一模式。所有 outbound communication 都必須通過 approval。

## HTTP Hooks Server

所有 hook 均指向一個 FastAPI server，運行於 `localhost:18924`。這並非什麼 microservice 架構 -- 只有 163 行 Python，但可能是我整套 system 中最重要的 code。

Server 接收 hook payload -- session ID、tool name、tool input、transcript path -- 然後執行 policy engine。Policy engine 載入 YAML config 的 rules，比對 incoming event，回傳決策：`{"decision": "allow"}` 或 `{"decision": "deny", "reason": "..."}`。

每個 decision 都記錄到 SQLite database（`store/hooks.db`）。我可以 audit 哪些 tool call 被 block、哪些被 approve、原因為何。

部署後第一個月檢視 logs，我找到 14 個被 block 的 send。其中 3 個是真正的 catch -- wrong recipient、wrong sender、missing approval。11 個是 false positive，因為我忘記說 "send it"。調整 approval keywords 之後，false positive rate 降到接近零。

Rate limiting 也已內建。Gmail send 每小時上限 20 次，每次之間 cooldown 10 秒。並非因為我真的會發那麼多 email，而是防止 autonomous agent 失控 loop 耗盡每日 send quota。

Server 透過 macOS LaunchAgent 自動啟動。機器一開，hooks server 即已在運行。沒有手動步驟，沒有遺漏的可能。

## Stop Hook：記憶強制寫入

Stop hook 解決的不是安全問題 -- 是紀律問題。

我的 agent 管理著每個 active client 的 memory file -- status、action items、contact details。如果一個 session 處理了 client work 卻在退出時沒有更新 memory file，下一個 session 就會 cold start。這種情況以前每週都會發生一次。

Stop hook 在 session 結束前注入一段 prompt：「本次 session 是否涉及 client work？若是，檢查 memory file 是否已更新。若否，不要退出 -- 立即更新。」

Agent 無法跳過這個步驟。Hook 每次都會觸發。部署之後，我再沒有遺失過 session context。

## InstructionsLoaded：兩秒 Init

InstructionsLoaded hook 在 session start 時觸發。我的做法：

1. 載入最後 15 行 worklog（上次做了什麼）
2. 檢查 priority todos 是否有 overdue
3. 一句話問候：上次做了什麼、多少項目到期、今天的 focus 是什麼

整個過程兩秒。不會載入整個 memory system -- 那樣會消耗大量 token。只載入足以恢復 momentum 的資訊量。

打開 Claude Code 看到空白 prompt，與看到「上次 session：sent Garden invoice。今日有 2 個 item due。要 focus 什麼？」-- 這就是 tool 與 assistant 的分別。

## PostToolUse：靜默防禦

我運行了一個 prompt injection defender 作為 PostToolUse hook。它掃描每個 Read、WebFetch、Bash output，尋找可疑的 pattern -- 例如 fetched content 中嵌入了試圖操控 agent 行為的 instruction。

一旦偵測到，便會標記 severity level 並建議謹慎處理。不會 block tool call（PostToolUse 無法 retroactively block），但會在 agent context 中注入 warning。

如果你的 agent fetch 外部 webpage 或 read untrusted file，這些 content 會進入 context window。一段精心撰寫的 injection 可以 redirect agent behavior。Defender 無法令這件事完全不可能發生，但能令它變得可見。

## 由零開始

如果你只做一件事：在你的 email sending tool 上加一個 PreToolUse hook。一個 hook。一條 rule。Send 之前要求 explicit approval。

15 分鐘的 setup。保護你免受自主 agent 最高風險的 failure mode：將錯誤的內容發送給錯誤的人。

之後可以逐步增加 complexity -- HTTP server、policy engine、audit log、rate limiter。但基礎很簡單：**高風險操作，必須設有 checkpoint。**

我所描述的 hooks system 是 163 行 policy engine、一個 YAML config file、以及 `settings.json` 中的幾個 entry。靜默運行，每個 tool call 增加不足 100ms latency，攔截過 3 個原本會非常尷尬的錯誤。

沒有 guardrails 的自主 AI 是負債。有 guardrails 的自主 AI 是一個永遠不會忘記 double-check 的員工。

下一篇：[第四篇 -- Agent Teams](/blog/claude-code-mastery-part-4-agent-teams-tc)，討論 multi-agent collaboration、sub-agent delegation，以及當你的 AI agents 開始互相協作時會發生什麼。會有些 weird，但是好的那種 weird。

---

*我在六個國家培訓企業進行 AI adoption。如果你也在用 Claude Code 構建系統，歡迎到 [LinkedIn](https://www.linkedin.com/in/samwong-ai/) connect 交流。*
