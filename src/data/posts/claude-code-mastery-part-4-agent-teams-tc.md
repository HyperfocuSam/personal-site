# Claude Code 完全攻略：Agent 團隊與自動化 — 你的 AI 工作團隊

9 個 agent。7 個 cron job。每個星期一早上 10:00，我的 blog 自動發文，鍵盤不用碰一下。平日 8:30，手機震動，Ada 的 WhatsApp 短訊用廣東話送來當日簡報：日曆衝突已標記、過期事項按嚴重程度排好。客戶在 email 提到一個名字，系統在我打開那條 thread 之前，已經把那個人的完整往來歷史、待辦事項、最近記憶撈了出來，放在我眼前。

一個 agent 有用。一隊 specialist，是完全另一個層次的東西。

這是 Claude Code 完全攻略的第 4 篇。第 1 篇講 [CLAUDE.md 入門與基本設定](/blog/claude-code-mastery-part-1-getting-started-tc)，第 2 篇是 [memory 與 skills 的實戰](/blog/claude-code-mastery-part-2-skills-memory-tc)，第 3 篇拆解 [hooks 與安全機制](/blog/claude-code-mastery-part-3-hooks-guardrails-tc)。這一篇，我想講清楚一件事：當你不再把 AI 當一個助手，開始把它當一隊人——系統的性質會改變。

## 為甚麼單一 agent 會崩

建 Ada 的頭 3 個月，所有事情都經一個 agent。一個 context window，一套系統指令。行得通——直到行不通。

爆煲點是一個星期二早上。我叫 Ada 準備一場客戶會議：撈最新 email thread、查客戶 invoice 狀態、查日曆衝突、寫一份 brief。4 件事。Agent 順序執行：載入 email MCP、掃 inbox、載入 calendar MCP、讀記憶檔、開始起草。做完的時候，context window 塞了 80,000 token 的中間結果——email 原文、日曆 raw data、記憶摘要。Brief 寫得平庸。不是 model 不夠好，而是 agent 花在管理自己 context 的 token，多過花在思考輸出的。解法不是更好的 prompt——是架構。

## Agent Teams 是甚麼

Claude Code 有個實驗性功能，讓你在同一 session 內運行多個 agent，每個擁有獨立的 context window 和專門的角色。啟用方法是一行環境變數：

```
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

每個 agent 就是 `.claude/agents/` 裡的一個 markdown 檔案。Frontmatter 定義名字、描述、model、顏色；內文是 agent 的系統指令——性格、範圍邊界、可用工具、操作程序。像這樣：

```markdown
---
name: comms-agent
description: "Handles all communication tasks: drafting and sending
  emails via Gmail, managing WhatsApp messages, client follow-ups..."
model: inherit
color: blue
---

You are the **Communications Agent** for Ada...

## Brand Voice Guidelines
## Email Templates
## Scope Boundary
```

`description` 欄位比看起來重要得多。Claude Code 用它做 routing：你把任務交給 coordinator agent，它讀取各 specialist 的描述，決定委派給誰。描述寫得馬虎，任務就去錯地方。

## 9 個 agent 的名單

我現在的 agent team 是這樣分工的。每個 agent 有自己的 MCP server 配置，有的連 Google Workspace，有的連 Firecrawl 和 Exa，有的只讀不改。

| Agent | 負責範疇 | 觸發詞 |
|---|---|---|
| **ada-executive-assistant** | 總指揮：routing、記憶整合 | 多步任務、含糊請求 |
| **comms-agent** | email、WhatsApp、跟進 | draft、reply、send、follow-up |
| **scheduler-agent** | 日曆、會議、ICS 檔 | meeting、schedule、availability |
| **docs-agent** | proposal、invoice、簡報 | proposal、invoice、report、handout |
| **research-agent** | 網上研究、競爭情報 | research、look up、analyze、trends |
| **memory-agent** | 大腦消化、記憶整理 | digest brain、process memory |
| **workshop-agent** | 工作坊內容、翻譯 | workshop、translation、TTT、trainer |
| **inbox-triage-agent** | 只讀 inbox 分析 | inbox、triage、what did I miss |
| **mascot-video-agent** | 完整影片製作 pipeline | mascot、animated video、episode |

重點不是 agent 的數量，而是每個 agent 的範圍邊界。comms-agent 有 Google Workspace 和 WhatsApp，可以發送、回覆、草擬。inbox-triage-agent 同樣有 Google Workspace，但明文設定為「只讀」——永遠不能發送、起草、修改任何 email。這些不是建議，是寫死在每個 agent 系統指令裡的硬約束。

Coordinator（ada-executive-assistant）的系統 prompt 內建了一張委派矩陣。我說「draft an invoice for a client」，它不會自己動手——讀矩陣、見到文件生成對應 docs-agent、委派出去。Coordinator 的工作是 routing 和整合，不是執行。這點很重要：當 coordinator 也下場做 task，context window 就開始污染，然後我們又回到單一 agent 的失敗模式。

## 平行 vs 順序——真正的架構決定

Agent team 真正的回報，在這裡出現。平行執行，用於無依賴的任務。

「Prepare for my meeting with a global advertising group」同時開 3 個 agent：

- **research-agent** 拉客戶背景情報  
- **comms-agent** 撈最近 5 封 email 往來  
- **memory-agent** 載入策展記憶裡的完整客戶歷史

3 個 agent、3 個獨立 context window、3 份結果幾乎同時到齊，coordinator 整合成一份 brief。總耗時大約等於一個 agent 處理其中一件事。

順序執行，用於 pipeline 類任務。「Draft and send a proposal to Kelly about AI training」按次序跑：

1. research-agent 收集客戶 context 和競爭定位  
2. docs-agent 接住生成 proposal  
3. comms-agent 起草交付 email

每個 agent 的輸出餵給下一個。研究未做完不可能寫 proposal，proposal 未有不可能寫 email。Coordinator 管理交接。

規則很簡單：步驟互不依賴就平行，有依賴就順序。Coordinator 從任務描述自己判斷，我不用指定執行模式。不過描述寫得清楚有幫助：「prepare for a meeting」暗示平行，「draft then send」暗示順序。

## Cron job——無人監督的自動化

*編按（2026 年 7 月）：下文描述的自動發佈流程及早晨簡報排程，自 2026 年 7 月初起已暫停；文章現時經人手審閱後才發佈。*

Agent team 再加上排程執行，系統就開始改變性質。以下 7 個 cron job 正在跑：

| Job | 時間 | 做甚麼 |
|---|---|---|
| **morning-briefing.sh** | 平日 8:30 | 拉日曆＋過期事項＋客戶狀態，廣東話 WhatsApp 提示，完整 dashboard 存入 Craft |
| **blog-content-scan.sh** | 星期一 10:00 | 掃 worklog、客戶檔案、X bookmark 找題材，選一個、起草、發佈，無審核關卡 |
| **blog-nudge.sh** | 星期四 10:00 | blog 發佈健康檢查，接住星期一失敗的發佈，WhatsApp 死了就用 Gmail 後備 |
| **bookmark-digest.sh** | 每日 21:00 | 把 X/Twitter bookmark 按主題彙整成 digest |
| **stale-check.sh** | 星期一 9:00 | 找出閒置超過 14 日的 todo，標記發霉項目 |
| **rotate-worklogs.sh** | 每月 1 號 | 歸檔一個月前的 worklog，活躍檔案保持 15KB 以下 |
| **backup-game-data.sh** | 排程 | 備份遊戲化系統數據 |

最有感的，是 morning briefing。每個平日 8:30，我未打開 laptop，電話先震。Ada 的 WhatsApp：

```
Ada 早晨提醒 03/23:

今日:
- 14:00 client call

要跟進:
- [OVERDUE] 客戶發票 — 逾期 26 日
- [DUE SOON] a client 工作坊 — 3日後

Full briefing 喺 Craft.
```

日曆事件和客戶記憶交叉對照，相關客戶有未完成 todo 的會議會標記 `[PREP NEEDED]`。完整 dashboard 入了 Craft，WhatsApp 只是重點提示。兩個系統、兩個層次的細節、零人手。

Blog pipeline 是最進取的一個：auto-publish 模式。每個星期一，script 掃 30 日的 worklog、客戶檔案、消化過的逐字稿、X bookmark 集群，選題、起草、過一次 Content DNA 語氣校準、直接發佈到 hyperfocusam.com——git push 加 npm run deploy，無審核關卡。這是 2026 年 3 月我批准的：之前 3 個月每篇 draft 都人手審，發現每次我的改動不足 5%。既然改動不足 5%，為甚麼還要卡住一道關口？

## 有成本意識的模型選擇

9 個 agent 聽起來很貴。不是——如果模型選擇夠刻意。

每個 agent 預設繼承父模型（`model: inherit`），但 coordinator 會按成本做 routing：

- **Haiku**：簡單搜尋、檔案探索、狀態檢查。最平、最快，「找這個檔案」夠用。
- **Sonnet**：例行操作：email 起草、記憶更新、日曆管理。主力，90% 任務落在這裡。
- **Opus**：複雜規劃、多步推理、講究的寫作：proposal、blog post、多客戶整合。質素直接影響收入的任務。

規則只有一條：Sonnet 做得到的絕不用 Opus，Haiku 做得到的絕不用 Sonnet。層與層之間 token 成本大約差 10 倍。Routing 做得對，就是同樣輸出質素之下，每月 $50 和每月 $500 的分別。

## 怎樣開始——一個 agent，不是九個

我必須說清楚：我不是一個週末建了 9 個 agent。這個系統是幾個月慢慢演化出來的。

頭 3 個月是單一 agent。然後分拆出 comms-agent，因為 email 處理污染著其他所有任務的 context window。然後 docs-agent，因為 invoice 排版是受惠於常設範本的專項技能。然後 research-agent，因為 web scraping 工具很重，我不想簡單 email 任務也載著它們。

如果你今天要開始：

1. 由一份 CLAUDE.md 開始（參考[第 1 篇](/blog/claude-code-mastery-part-1-getting-started-tc)和[第 2 篇](/blog/claude-code-mastery-part-2-skills-memory-tc)）  
2. 為最高風險的 tool call 加 hooks（參考[第 3 篇](/blog/claude-code-mastery-part-3-hooks-guardrails-tc)）  
3. 留意到某類任務——email、research、文件——開始塞爆 context window，就把它分拆成第一個 specialist agent  
4. 加一個 cron job：morning briefing。20 分鐘設定，改變你每天的開場  
5. 按實際需要擴展，不是按 blog post 上聽起來威的東西

這套架構不是理論。它跑著我 20+ 個客戶項目、13 個國家、3 個商業實體：處理會議錄音、生成 invoice、發佈 blog、發廣東話早晨簡報。建造成本大約 200 小時、橫跨 4 個月；現在每星期省回約 15 小時。

這些數字會複利。記憶愈厚系統愈好，skills 愈磨愈準，worklog 記的模式愈多，cron 接住的 edge case 就愈多。系統不是建好就定型——它持續在長。

系列下一篇，第 5 篇，我會把一切拼成完整藍圖：CLAUDE.md、memory、skills、hooks、agents、cron——full stack，一個 repo。

---
