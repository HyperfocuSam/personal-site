# Claude Code 完全攻略：從零開始到你的第一個 Agent

我第一次打開 Claude Code，以為是另一個 terminal——一個配色深一點的 chatbox。打了一句問題，它答了，我心想：就是給喜歡 monospace 字體的人用的 ChatGPT 而已。

三個月後，它承載了我的整盤生意：4 間公司、70 多個客戶項目、invoice、email、會議逐字稿、一個 blog、一個 voice agent，還有一隻像三國志 RPG 一樣追蹤我生產力的策略遊戲。全部在一個我第一日差點關掉的 terminal window 裡。

這不是 marketing 版本，不是那種「10 條 prompt 提升生產力」的速成文章。這是我用了 438 小時 session 建出來的真實系統。寫給兩種人：一直好奇但未開始的，和裝了之後心想「然後呢」的。

## Claude Code 不是 ChatGPT

先講它不是甚麼。它不是 chatbox，不是你在瀏覽器開一個分頁打問題的地方，不是少了功能的 Cursor。

它是一個 workspace，住在 terminal 裡。它讀你的檔案、寫新檔案、搜尋 codebase、跑 shell command、連接外部服務。給它任務，它不是告訴你怎樣做——它直接做，就在你真實的 project 目錄裡。

ChatGPT 給你意見。Cursor 給你 autocomplete。Claude Code 給 AI 一雙手。

這個分別比任何功能對比都重要。一旦不再當它是「跟 AI 聊天」、開始當它是「一個能操作我電腦的 agent」，一切都變了。

## 安裝——5 分鐘，沒有藉口

```bash
npm install -g @anthropic-ai/claude-code
```

一條 command。需要 Node.js 18+ 和 Anthropic API key。在 terminal 跑 `claude`，認證，就進去了。

我第一次打開，花了 20 分鐘左右摸索才明白眼前是甚麼。介面極簡：一個 prompt、對話歷史、tool call 直接顯示在行內。沒有 sidebar、沒有 file tree、沒有按鈕。就是你和一個非常能幹的 agent。

如果這聽起來令人卻步——好，代表你意識到這是甚麼。

## Mental model——工具，不是聊天

改變一切的 reframe：Claude Code 不是在「聊天」，是在用工具。

即時要認識的有 6 個：

- **Read**——讀你機器上任何檔案
- **Write**——建立或覆寫檔案
- **Edit**——修改現有檔案的特定行
- **Bash**——跑 shell command
- **Glob**——按 pattern 找檔案
- **Grep**——搜尋檔案內容

你叫它「fix 我 login page 的 bug」，它不會給你一段 code 叫你自己貼——它 call Glob 找到相關檔案、call Read 理解 code、call Grep 搜相關 pattern、call Edit 修改、call Bash 跑測試，然後告訴你它做了甚麼。

你不是在 prompt 一個 chatbot，是在指揮一個有實際能力的 agent。指令質素仍然重要，但性質和 ChatGPT 的 prompt engineering 根本不同：你在描述工作，不是在雕琢咒語。

## Plan mode——先想後做

Claude Code 有兩個模式，多數人不知道。

Normal mode 即讀即寫即執行。Plan mode——按 `shift+tab` 觸發——先想清楚整個 approach 才碰任何東西。

我所有非瑣碎的任務都用 plan mode：「Plan 你會怎樣 refactor 這個 authentication flow」「Plan 由 SQLite 遷去 Postgres」「Plan 這個 frontend 的部署 pipeline」。輸出是一份可以審核、修改、然後執行的結構化計劃。

就像「你去修好廚房」和「先告訴我你打算對廚房做甚麼，我說開工才開工」的分別。對我的工作——改錯一個客戶 invoice template 就會把錯的數字發給真人——plan mode 不是可選項，是預設。

## CLAUDE.md——你 project 的大腦

這裡是 Claude Code 由工具變成系統的位置。

每個 project 根目錄可以放一個 `CLAUDE.md`，每次 session 開始都會讀。它不是 README，不是給人看的文件——是你 AI agent 的操作手冊。

以下是一個簡化版本：

```markdown
# CLAUDE.md

## Project Snapshot
Ada is an executive-assistant agent for Sam Wong across DotAI, Adaptig, Loopem, and Voice2Story.

## Golden Rules
1. Follow the user request; ask one short question if ambiguous.
2. Never assert facts without confirmation or a dated source.
3. Use the matching skill when a task fits.
4. Log meaningful actions before responding.
5. No emojis, concise narrative paragraphs.

## Agent Team Architecture
See `.claude/docs/AGENT_ROUTING.md` for delegation rules.
Agent Teams enabled via CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1.

## Continuous Learning Protocol
Every meaningful action: log to worklogs BEFORE responding.
```

我 production 的版本有 200 多行：business context、客戶資料庫、溝通規則、error handling 政策、integration 設定。每次開 session 它都在這些約束之內運作。

沒有 CLAUDE.md 的 Claude Code，是一個患失憶症的聰明助手；有了它，是一個記得規矩的 team member。這是真正的分水嶺。

## 你的第一個真實任務

不要 hello world。挑一個真實 project 裡的真實檔案——有 bug 的、要小 refactor 的。在那個目錄開 Claude Code，輸入：

```
Look at src/components/LoginForm.tsx. There's a bug where the error
message doesn't clear after a successful retry. Fix it.
```

然後看著。它會 Read 檔案、理解組件結構、找出 state management 的問題、Edit 那幾行、解釋改了甚麼和為甚麼。Terminal 輸出大概是一串 tool call——`Read src/components/LoginForm.tsx`、`Edit src/components/LoginForm.tsx (lines 42-47)`——加一段總結。

沒有 copy-paste，沒有切換分頁，沒有「這是 code，自己放回正確位置」。看著 AI 真的在你的 codebase 裡、在對的檔案、對的行數修好一個 bug——那一刻，多數人就不再當它是玩具。

## MCP——開始危險的地方

MCP 即 Model Context Protocol——一個標準，讓 Claude Code 連接外部服務：Google Calendar、Gmail、Slack、資料庫、API、瀏覽器自動化，任何有 MCP server 的東西。

我現在跑著 15 個以上的 MCP integration：讀 email、查 calendar、發 WhatsApp、在 Craft 建文件、搜尋網頁、控制 headless browser、操作客戶管理工具——全部同一個 terminal。

第一篇不深入 MCP，但要在這裡提，因為知道 MCP 存在，會從一開始改變你對 Claude Code 的理解：這不是一個帶 AI 的 code editor，是一個 AI agent 的作業系統。

## 接下來

這個系列還有三篇：

- 第 2 篇——Skills 與 Memory：怎樣給 Claude Code 持久知識、可重用的技能、從過往 session 學習的能力。
- 第 3 篇——Hooks 與安全機制：event-driven 行為、policy enforcement、在 AI 動手之前攔住它。
- 第 4 篇——Agent Teams 與自動化：委派規則、平行執行、自主運行的系統。

如果你讀過我寫的「[替 Claude Code 建 voice mode](/blog/i-built-voice-mode-claude-code)」和「[把它變成三國志式策略遊戲](/blog/ada-gersang-gamifying-claude-code)」，你已見過終點的樣子——這個系列是由零走到那裡的路。

「裝了 Claude Code」和「Claude Code 經營我的生意」之間的距離，不是天份，不是技術，是一次 mental model 的轉換：工具，不是 chat；系統，不是 prompt；以及一份告訴 agent 它是誰的 CLAUDE.md。

如果不在 CLAUDE.md 裡，它甚麼都記不住。

---

*我幫機構做 AI adoption 培訓，也為自己的生意搭 agent 系統。歡迎在 [LinkedIn](https://www.linkedin.com/in/sam-ai-agent/) 交流。*
