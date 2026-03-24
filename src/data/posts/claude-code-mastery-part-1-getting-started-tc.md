
# Claude Code 完全攻略：由零開始到你第一個 Agent

三個月前我第一次打開 Claude Code，以為係又一個 terminal chatbox。打咗句嘢，佢答咗，我心諗：啊，即係 ChatGPT 著咗件黑色衫。

三個月後嘅今日，我四間公司嘅日常運作全部行緊 Claude Code。Email、invoice、客戶跟進、meeting transcript、寫 blog、甚至一隻三國志 RPG -- 全部喺同一個 terminal window 搞掂。438 個鐘頭嘅 session，200 幾次對話。而呢一切都係由一個我差啲就關咗嘅 terminal 開始。

呢個係「Claude Code 完全攻略」系列嘅第一篇。唔係嗰啲「十個 prompt 提升生產力」嘅文章 -- 係我真正用緊嘅系統，由零開始講起。

## Claude Code 唔係 ChatGPT

呢句係最重要嘅 reframe。

ChatGPT 係一個你問嘢佢答嘢嘅 chatbox。Cursor 係一個幫你寫 code 嘅 autocomplete。Claude Code 係一個有手有腳嘅 agent -- 佢可以讀你嘅 file、寫新 file、搜尋你成個 codebase、行 shell command、連接外部服務。

你話佢「fix 呢個 bug」，佢唔會俾段 code 你叫你自己貼。佢會自己搵到個 file，讀完理解完，改完 test 完，然後同你講佢做咗咩。

個分別係：ChatGPT 俾你建議。Claude Code 幫你做嘢。

呢個 mental model shift 係所有嘢嘅起點。你唔係喺度「同 AI 傾計」，你係喺度指揮一個有真正能力嘅 agent。

## 裝機：五分鐘搞掂

```bash
npm install -g @anthropic-ai/claude-code
```

一條 command。要 Node.js 18+ 同一條 Anthropic API key。裝完打 `claude`，authenticate，搞掂。

第一次開嗰個 interface 好 minimal -- 一個 prompt、一段對話歷史、tool call 嘅 output。冇 sidebar，冇 file tree，冇 button。就係你同一個好叻嘅 agent 對住。

如果你覺得驚，呢個係正常嘅。因為你啱啱見到嘅嘢係真嘅。

## 六個工具：呢個就係「有手有腳」嘅意思

Claude Code 唔係用 prompt magic 做嘢，係用工具：

- **Read** -- 讀你機上面任何 file
- **Write** -- 開新 file 或者覆寫
- **Edit** -- 改特定嘅行數
- **Bash** -- 行 shell command
- **Glob** -- 用 pattern 搵 file
- **Grep** -- 搜尋 file 內容

你話「fix 我個 login page 嘅 bug」，佢會 call Glob 搵 file、call Read 理解 code、call Grep 搵相關 pattern、call Edit 改 code、call Bash 跑 test。一氣呵成。

你唔係喺度寫 prompt 求佢答得好啲。你係喺度形容一件要做嘅工作，然後佢去做。呢個分別好大。

## Plan Mode：諗完先做

好多人唔知 Claude Code 有兩個模式。Normal mode 係即時行動 -- 讀、寫、執行。Plan mode 用 `shift+tab` 觸發 -- 佢會先想好成個 approach，等你 review 完先動手。

我做任何非 trivial 嘅嘢都用 plan mode。「Plan 吓你會點 refactor 呢個 auth flow。」「Plan 吓由 SQLite 轉 Postgres 嘅 migration。」

對我嘅工作嚟講 -- 改錯一個 invoice template 可能會 send 錯數俾真客 -- plan mode 唔係 optional，係 default。

## CLAUDE.md：你個 Project 嘅大腦

呢樣嘢係 Claude Code 由「工具」變成「系統」嘅關鍵。

每個 project 可以喺 root 放一個 `CLAUDE.md` file。Claude Code 每次開 session 都會讀呢個 file。佢唔係 README -- 係你個 AI agent 嘅操作手冊。

我嘅 CLAUDE.md 喺 production 入面有 200 幾行。Business context、client database、溝通規則、error handling policy、integration config -- 全部寫晒喺度。

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

冇 CLAUDE.md 嘅 Claude Code 係一個有失憶嘅聰明助手。有咗 CLAUDE.md 嘅 Claude Code 係一個記得規則嘅 team member。

呢個就係真正嘅 unlock。

## 第一個真正嘅任務

唔好做 hello world。揀一個你真實 project 入面嘅真實 file -- 有 bug 嘅、要 refactor 嘅。喺嗰個 directory 開 Claude Code，打：

```
Look at src/components/LoginForm.tsx. There's a bug where the error
message doesn't clear after a successful retry. Fix it.
```

然後睇住佢做。Read file、理解結構、搵到問題、Edit 修正、解釋改咗咩。

冇 copy-paste。冇切 tab。冇「呢度係 code，你自己放返入去」。

嗰個 moment -- 睇住 AI 真正修咗你 codebase 入面嘅 bug，改啱嘅 file，改啱嘅 line -- 係大部分人唔再當佢係玩具嘅一刻。

## MCP：可以有幾癲

MCP 即係 Model Context Protocol -- 一個標準，等 Claude Code 連接外部服務。Google Calendar、Gmail、WhatsApp、database、browser automation -- 乜都得。

我而家行緊 15 個以上嘅 MCP integration。Claude Code 可以幫我讀 email、check calendar、send WhatsApp、建 document、search web -- 全部喺同一個 terminal。

MCP 嘅 deep dive 會喺系列第三篇講。但我喺第一篇就提，因為知道 MCP 存在會改變你一開始點理解 Claude Code。呢個唔係一個有 AI 嘅 code editor。係一個 AI agent 嘅 operating system。

## 下一篇預告

呢個係「Claude Code 完全攻略」系列嘅 Part 1。之後仲有：

- **Part 2：Skills 同 Memory** -- 點樣俾 Claude Code 持久記憶、可重用嘅技能、同從過去 session 學習嘅能力
- **Part 3：MCP Integration** -- 連接你真正嘅工具，建立真實嘅 workflow
- **Part 4：Hooks 同 Automation** -- event-driven 行為、policy enforcement、建立自己行嘅系統

如果你睇過我之前寫嘅[幫 Claude Code 砌 voice mode](/blog/i-built-voice-mode-claude-code) 同[將佢變成三國志 RPG](/blog/ada-gersang-gamifying-claude-code)，你已經見過終點嘅樣。呢個系列係由零行到嗰度嘅路。

「識裝 Claude Code」同「Claude Code 幫我行成盤生意」之間嘅距離，唔係天份，唔係技術 -- 係一個 mental model 嘅轉變。工具，唔係 chat。系統，唔係 prompt。同一個寫得好嘅 CLAUDE.md。

如果佢唔喺 CLAUDE.md 入面，佢咩都記唔到。

---

*完整英文版喺 hyperfocusam.com/blog/claude-code-mastery-part-1-getting-started 睇全文。*

*歡迎喺 [LinkedIn](https://www.linkedin.com/in/samwonghk/) 搵我傾。*
