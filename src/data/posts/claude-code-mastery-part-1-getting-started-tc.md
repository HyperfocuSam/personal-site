# Claude Code 完全攻略：從零開始到你的第一個 Agent

三個月前我首次打開 Claude Code，以為不過是另一個 terminal chatbox。輸入了一句話，它回答了，我心想：這就是 ChatGPT 穿了件黑色外衣而已。

三個月後的今天，我四間公司的日常運作全部在 Claude Code 上運行。Email、invoice、客戶跟進、meeting transcript、寫 blog、甚至一隻三國志 RPG -- 全部在同一個 terminal window 內完成。438 小時的 session，200 多次對話。而這一切都始於一個我差點就關掉的 terminal。

這是「Claude Code 完全攻略」系列的第一篇。不是那種「十個 prompt 提升生產力」的文章 -- 而是我真正在用的系統，從零開始說起。

## Claude Code 不是 ChatGPT

這是最重要的 reframe。

ChatGPT 是一個你提問、它回答的 chatbox。Cursor 是一個協助你寫 code 的 autocomplete。Claude Code 是一個有手有腳的 agent -- 它能讀取你的 file、寫入新 file、搜尋整個 codebase、執行 shell command、連接外部服務。

你告訴它「fix 這個 bug」，它不會丟一段 code 讓你自行貼上。它會自己找到對應的 file，讀取並理解內容，修改後測試，然後向你匯報它做了什麼。

差別在於：ChatGPT 給你建議。Claude Code 替你執行。

這個 mental model shift 是一切的起點。你不是在「跟 AI 聊天」，你是在指揮一個具備真正能力的 agent。

## 安裝：五分鐘搞定

```bash
npm install -g @anthropic-ai/claude-code
```

一條 command。需要 Node.js 18+ 和一組 Anthropic API key。安裝完畢輸入 `claude`，完成認證，即可使用。

第一次打開的 interface 非常 minimal -- 一個 prompt、一段對話歷史、tool call 的 output。沒有 sidebar，沒有 file tree，沒有 button。就是你與一個極其能幹的 agent 面對面。

如果你感到震撼，這是正常的。因為你剛才看到的是真的。

## 六個工具：這就是「有手有腳」的含義

Claude Code 不是靠 prompt magic 運作，而是使用工具：

- **Read** -- 讀取你機器上的任何 file
- **Write** -- 建立新 file 或覆寫現有 file
- **Edit** -- 修改特定的行數
- **Bash** -- 執行 shell command
- **Glob** -- 以 pattern 搜尋 file
- **Grep** -- 搜尋 file 內容

你說「fix 我 login page 的 bug」，它會 call Glob 搜尋 file、call Read 理解 code、call Grep 尋找相關 pattern、call Edit 修改 code、call Bash 執行 test。一氣呵成。

你不是在撰寫 prompt 祈求它回答得更好。你是在描述一件需要完成的工作，然後它去執行。這個差別非常大。

## Plan Mode：先想後做

很多人不知道 Claude Code 有兩個模式。Normal mode 是即時行動 -- 讀、寫、執行。Plan mode 用 `shift+tab` 觸發 -- 它會先構思整個 approach，等你審核完畢才動手。

我處理任何非 trivial 的任務都使用 plan mode。「Plan 一下你會如何 refactor 這個 auth flow。」「Plan 一下從 SQLite 遷移到 Postgres 的 migration。」

就我的工作而言 -- 改錯一個 invoice template 可能導致向真實客戶發送錯誤金額 -- plan mode 不是 optional，而是 default。

## CLAUDE.md：你的 Project 的大腦

這是 Claude Code 從「工具」蛻變為「系統」的關鍵。

每個 project 可以在 root 放置一個 `CLAUDE.md` file。Claude Code 每次開啟 session 都會讀取這個 file。它不是 README -- 而是你的 AI agent 的操作手冊。

我的 CLAUDE.md 在 production 環境中有 200 多行。Business context、client database、溝通規則、error handling policy、integration config -- 全部記載其中。

簡化版本：

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

## Continuous Learning Protocol
Every meaningful action: log to worklogs BEFORE responding.
```

沒有 CLAUDE.md 的 Claude Code 是一個患有失憶症的聰明助手。有了 CLAUDE.md 的 Claude Code 是一個記得規則的 team member。

這就是真正的 unlock。

## 第一個真正的任務

不要做 hello world。選一個你真實 project 中的真實 file -- 有 bug 的、需要 refactor 的。在那個 directory 開啟 Claude Code，輸入：

```
Look at src/components/LoginForm.tsx. There's a bug where the error
message doesn't clear after a successful retry. Fix it.
```

然後看着它運作。Read file、理解結構、找到問題、Edit 修正、解釋修改了什麼。

沒有 copy-paste。沒有切換 tab。沒有「這裏是 code，請你自行放回去」。

那個 moment -- 看着 AI 真正修復了你 codebase 中的 bug，改對了 file，改對了 line -- 是大部分人不再把它當作玩具的一刻。

## MCP：能力可以走多遠

MCP 即 Model Context Protocol -- 一個標準，讓 Claude Code 連接外部服務。Google Calendar、Gmail、WhatsApp、database、browser automation -- 無所不包。

我目前運行着 15 個以上的 MCP integration。Claude Code 可以替我讀 email、查 calendar、發 WhatsApp、建立 document、搜尋 web -- 全部在同一個 terminal 內完成。

MCP 的 deep dive 會在系列第三篇詳述。但我在第一篇就提及，因為知道 MCP 的存在會改變你從一開始如何理解 Claude Code。這不是一個附帶 AI 的 code editor。而是一個 AI agent 的 operating system。

## 下一篇預告

這是「Claude Code 完全攻略」系列的 Part 1。後續還有：

- **Part 2：Skills 與 Memory** -- 如何賦予 Claude Code 持久記憶、可重用的技能、以及從過往 session 學習的能力
- **Part 3：MCP Integration** -- 連接你真正的工具，建立真實的 workflow
- **Part 4：Hooks 與 Automation** -- event-driven 行為、policy enforcement、建構自主運行的系統

如果你讀過我之前寫的[替 Claude Code 構建 voice mode](/blog/i-built-voice-mode-claude-code) 和[將它變成三國志 RPG](/blog/ada-gersang-gamifying-claude-code)，你已經見過終點的樣貌。這個系列是從零走到那裏的路。

「懂得安裝 Claude Code」與「Claude Code 替我經營整盤生意」之間的距離，不是天份，不是技術 -- 而是一個 mental model 的轉變。工具，不是 chat。系統，不是 prompt。以及一份寫得好的 CLAUDE.md。

如果它不在 CLAUDE.md 裏面，它什麼都記不住。

---

*完整英文版請至 hyperfocusam.com/blog/claude-code-mastery-part-1-getting-started 閱讀。*

*歡迎在 [LinkedIn](https://www.linkedin.com/in/samwonghk/) 交流。*
