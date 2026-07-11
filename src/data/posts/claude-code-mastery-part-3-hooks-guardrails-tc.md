# Claude Code 完全攻略：Hooks 與安全機制 — 如何讓 AI 安全工作

上個月，我的 AI agent 差點把一張客戶 invoice 發給錯的人。

不是測試。不是沙盤推演。真 invoice、真金額，收件人是錯的客戶 email。附件正確、主旨正確、內文正確，只是從最近聯絡人中挑錯了收件人。

我的 PreToolUse hook 接住了。

policy engine 比對規則，發現這封 email 缺少用戶明確批准，攔下了發送。我收到的不是「已發送」，是一條拒絕訊息。我翻查草稿、發現地址錯了、改正、人手批准。損失時間：12 秒。損失金額：0。

單這一次，就值回我花一個週末建整套 hooks 系統的成本。

先回顧一下系列進度：[第 1 篇](/blog/claude-code-mastery-part-1-getting-started-tc)講的是 CLAUDE.md——設定 AI 的底層人格與行為邊界；[第 2 篇](/blog/claude-code-mastery-part-2-skills-memory-tc)講記憶架構——讓 agent 跨 session 記得住客戶和工作狀態。這一篇要談的，是多數人完全跳過的部分：讓自主 AI 安全到可以託付真實業務。

## 信任問題

自主 agent 有個令人不舒服的真相：它們有用，正因為不用問你；它們危險，也正因為不用問你。我的 agent 每天替我發 email、改檔案、發 WhatsApp 訊息、查資料庫——每一次 tool call 都是實彈。沒有 sandbox，發出去的 email 沒有 undo 鍵。

當 agent 綁住你的 Gmail、WhatsApp 和客戶資料庫權限，「move fast and break things」絕對不是選項。大部分 Claude Code 用戶處於零護欄狀態，單靠模型的判斷力。寫 code 或許可以這樣玩；替一盤在 6 個國家訓練過 10,000+ 專業人士的生意管客戶通訊，不行。

我要的是「信任，但要驗證」。Hooks 給了我這個。

## Hooks 是甚麼

在 Claude Code 的生命週期事件上執行的 shell command 或 HTTP call。你可以理解為 AI agent 的 middleware：卡在 agent 的意圖和 agent 的行動之間，可以觀察、修改、攔截。

目前支援的觸發點：
- **PreToolUse**——工具執行前觸發，可批准或攔截
- **PostToolUse**——工具執行後觸發，可檢查輸出
- **Stop**——session 準備結束時觸發，可阻止退出
- **InstructionsLoaded**——session 開始時觸發，可用來注入 context
- **Notification**——agent 發出通知時觸發
- **SubagentStart / SubagentStop**——子 agent 啟動或關閉時觸發

設定放在 `.claude/settings.json` 內：指定事件類型、可選的 matcher（指定對應工具）、動作（shell command 或 HTTP endpoint）。

## PreToolUse——那封從未發出的 email

救了我的那個 hook，真實設定長這樣：

```json
{
  "PreToolUse": [
    {
      "matcher": "mcp__google_workspace__send_gmail_message",
      "hooks": [
        {
          "type": "http",
          "url": "http://localhost:18924/hooks/PreToolUse",
          "timeout": 5
        }
      ]
    }
  ]
}
```

每次 Claude Code 準備經 Google Workspace 發送 Gmail，這個 hook 會先觸發，把工具名稱和全部參數送到我本地的 policy server。server 評估兩條規則。

規則 1 寄件人驗證：必須來自 `sam@adaptig.com`——不是我的私人 Gmail、不是測試帳號。選錯寄件人立刻攔截，回覆「Wrong sender account. Must use sam@adaptig.com」。

規則 2 用戶批准：server 會解析對話逐字稿，尋找明確批准關鍵詞——「approved」「send it」「go ahead」「confirmed」「lgtm」；找不到批准即拒絕，訊息是「Outbound email requires explicit user approval. Present the draft first」。

`config.yaml` 內的政策設定：

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
          - "yes"
          - "confirmed"
          - "lgtm"
          - "looks good"
        on_fail: deny
        reason: "Outbound email requires explicit user approval."
```

WhatsApp 訊息同一套邏輯。發送檔案同一套。所有對外通訊都要過批准，無一例外。

## 自建 HTTP hooks server

hooks 指向一個跑在 `localhost:18924` 的 FastAPI server。不是甚麼微服務架構習作——163 行 Python，很可能是我整個系統裡最重要的 code。

server 收到 hook payload——裡頭有 session ID、工具名、工具輸入參數、對話逐字稿路徑——交給 policy engine：從 YAML 載入規則、比對事件、回傳決定：`{"decision": "allow"}` 或 `{"decision": "deny", "reason": "..."}`。每一個決定都會記進 SQLite（`store/hooks.db`），讓我可以審計哪些 call 被攔、哪些放行、為甚麼。

第一個月的 log 紀錄：14 次被攔的發送。3 次是真抓到的——錯收件人、錯寄件人、缺批准。11 次是誤報——我自己忘了先說「send it」。調整批准關鍵詞清單之後，誤報率接近零。

還有內建 rate limiting：Gmail 每小時上限 20 封、每次相隔 10 秒冷卻。不是因為我真的發那麼多，而是因為自主 agent 一旦失控迴圈，幾分鐘就能燒光你一天的發送配額。

server 由 macOS LaunchAgent 自動啟動：開機時 hooks server 已在跑，先於 Claude Code。沒有手動步驟，沒有忘記的可能。

## Stop hook——記憶的強制執行

解決的是另一個問題。不是安全——是紀律。

我的 agent 為每個活躍客戶維護記憶檔——狀態、action item、聯絡人、對話歷史。如果一個 session 涉及客戶工作、agent 卻沒更新記憶檔就退出，context 就丟了，下個 session 要從冷狀態開始。

Stop hook 的設定：

```json
{
  "Stop": [
    {
      "hooks": [
        {
          "type": "prompt",
          "prompt": "Before ending this session, check: Did this conversation involve any client work? If YES, verify that the relevant Memory files were updated. If they were NOT updated, do NOT end the session yet -- update them now."
        }
      ]
    }
  ]
}
```

這是 prompt 型 hook，不是 HTTP 型：在關閉之前，把一段 prompt 注入 agent 的 context。agent 自行評估是否需要記憶回寫，然後更新檔案或確認沒有變化。跳不過，每次都觸發。

部署這個 hook 以來，我一次都沒再丟過 session context。之前的頻率是每星期至少一次。

## InstructionsLoaded——2 秒的開機初始化

session 開始時觸發。我的版本注入一段輕量初始化：(1) 讀取 worklog 最後 15 行，看上次 session 發生了甚麼；(2) 查 priority todo 有沒有過期項；(3) 用一句話跟我打招呼——上次的動作、緊急事項、今天聚焦甚麼。全程約 2 秒。

不會載入整套記憶系統——那樣會把 token 燒在未必需要的 context 上；只載入剛好夠恢復動力的量。

打開 Claude Code 見到一片空白，和打開見到「上個 session：Garden invoice 已發出。今天有 2 項到期。想從哪裡開始？」——這就是工具和助手的分別。

## PostToolUse——沉默的防線

我用了一個 prompt injection defender 作為 PostToolUse hook，掃描每次 Read、WebFetch、Bash 的輸出，尋找可疑模式——藏在抓回來的內容裡、試圖操縱 agent 行為的指令。

```bash
uv run ~/.claude/hooks/prompt-injection-defender/post-tool-defender.py
```

它檢查 context 操縱、冒認權威、人格注入、混淆過的 payload。發現時按嚴重程度標記，並把警告注入 agent 的 context，提醒謹慎。它不會攔截——PostToolUse 攔不了已發生的事——但讓危險變得可見。

這一點比多數人以為的更重要：agent 抓一個網頁、讀一個不可信來源的檔案，內容就進了 context window。一段精心設計的注入，可以改寫 agent 的行為。defender 不能令這件事不可能，但能令它看得見。

## 由這裡開始

如果這篇只能帶走一件事，我會說：給你的 email 發送工具加一個 PreToolUse hook。一個 hook、一條規則：任何對外訊息，先要明確批准。

15 分鐘的設定，防住自主 agent 最高後果的失敗模式——把錯的東西發給錯的人。複雜的可以之後再疊——HTTP server、policy engine、審計 log、rate limiter，全部能慢慢加上去。地基很簡單：永遠不要讓 agent 在高風險操作上無檢查點地行動。

我描述的整套系統：163 行 policy engine、一份 YAML、`settings.json` 幾條設定。它靜靜地跑，每次 tool call 加不到 100ms 延遲，抓過 3 個真會令我尷尬的錯。

無護欄的自主 AI 是負債。有護欄的自主 AI，是一個永遠不會忘記 double-check 的員工。

系列下一篇：[第 4 篇 Agent Teams](/blog/claude-code-mastery-part-4-agent-teams-tc)——多 agent 協作、子 agent 委派、當你的 AI agent 開始互相合作會發生甚麼。會變得奇怪——是好的那種奇怪。

---

*我在 6 個國家教企業做真正留得住的 AI adoption。如果你也在用 Claude Code 搭系統，歡迎在 [LinkedIn](https://www.linkedin.com/in/sam-ai-agent/) 交流。*
