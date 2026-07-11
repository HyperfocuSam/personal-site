# Claude Code 完全攻略：Agent 團隊與自動化 -- 你的 AI 工作團隊

我有 9 個 agent。它們正在執行 7 個 cron job。我的 blog 每週一自動發文，完全不需要碰 keyboard。每天早上 8:30，WhatsApp 會收到一則 Cantonese briefing -- calendar 衝突已標記，overdue item 排列完畢。當 client 在 email 中提及某個名字，系統會在我讀 thread 之前，先載入那個人的完整歷史。

一個 agent 有用。一隊 specialist 是完全不同層次的事。

這是 Claude Code 完全攻略第四篇。[第一篇](/blog/claude-code-mastery-part-1-getting-started-tc)談 CLAUDE.md，[第二篇](/blog/claude-code-mastery-part-2-skills-memory-tc)談 memory 與 skills，[第三篇](/blog/claude-code-mastery-part-3-hooks-guardrails-tc)談 hooks 與安全機制。本篇要談的是：當你不再把 AI 當作一個助手，而是當作一支團隊的時候，會發生什麼。

## 為何一個 Agent 不夠用

頭三個月我把所有事情都塞進一個 agent。一個 context window、一套 instructions。直到有一天崩潰了。

那天我請 Ada 幫我準備 client meeting：pull 最新 email thread、check invoice status、確認 calendar 有無衝突、draft 一份 brief。四件事。Agent 逐一執行 -- load email MCP、query inbox、load calendar MCP、讀 memory file、開始 draft。完成時，context window 已塞滿 80,000 tokens 的中間結果。那份 draft 平庸至極，因為 agent 花了更多 token 去管理自身的 context，而非思考 output 品質。

解決方法不是寫更好的 prompt，而是改架構。

## Agent Teams 是什麼

Agent Teams 是 Claude Code 的 experimental feature -- 同時運行多個 agent，每個擁有獨立的 context window 與專長。一個 environment variable 即可啟用：

```
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

每個 agent 是 `.claude/agents/` 目錄下的一個 markdown file。Frontmatter 定義 name、description、model、color。Body 是 agent 的 system instructions -- 其角色、scope boundary、available tools、operating procedures。

```markdown
---
name: comms-agent
description: "Handles all communication tasks..."
model: inherit
color: blue
---

You are the **Communications Agent** for Ada...

## Brand Voice Guidelines
## Scope Boundary
```

Description field 至關重要。Claude Code 依賴它進行 routing -- coordinator 收到 task 時，會讀取每個 agent 的 description 來決定 delegate 給誰。Description 寫得不好，task 就會分配到錯誤的 agent。

## 九個 Agent 的完整陣容

| Agent | 負責範圍 | 觸發條件 |
|-------|---------|---------|
| **ada-executive-assistant** | 總指揮、routing、memory | 多步驟 task、不明確的 request |
| **comms-agent** | Email、WhatsApp、follow-up | draft、reply、send |
| **scheduler-agent** | Calendar、meetings、ICS | meeting、schedule、availability |
| **docs-agent** | Proposal、invoice、presentation | proposal、invoice、report |
| **research-agent** | Web research、competitive intel | research、look up、analyze |
| **memory-agent** | Brain digestion、memory 整合 | digest brain、process memory |
| **workshop-agent** | Workshop 內容、翻譯 | workshop、translation、TTT |
| **inbox-triage-agent** | 只讀 inbox 分析 | inbox、triage、what did I miss |
| **mascot-video-agent** | 完整 video production | mascot、animated video |

每個 agent 有獨立的 MCP server assignment。Comms-agent 配有 Google Workspace 與 WhatsApp。Research-agent 配有 Firecrawl 與 Exa。Inbox-triage-agent 擁有 Google Workspace 存取權限但嚴格限定為 read-only -- 絕不可以 send、draft、或修改 email。Scope boundary 不是建議，而是寫死在 instructions 中的硬性限制。

Coordinator -- ada-executive-assistant -- 的 system prompt 內嵌一個 delegation matrix。我說「幫 Garden 開張 invoice」，它不會自行處理。它查閱 matrix，發現 document generation 對應 docs-agent，直接 delegate。Coordinator 的職責是 routing 與 synthesis，不是 execution。

## 平行 vs 順序執行

這是 agent teams 真正體現價值之處。

**平行執行**適用於無 dependency 的 task。「幫我準備 Publicis 的 meeting」會同時 spawn 三個 agent：

- research-agent pull client background
- comms-agent 搜尋最近五封 email
- memory-agent load 完整 client history

三個 agent，三個獨立 context window，數秒內三個結果同時返回。Coordinator 綜合為一份 brief。Total wall-clock time 約等於一個 agent 執行其中一項的時間。

**順序執行**適用於 pipeline。「Draft 一份 proposal 然後 send 給 Kelly」需要按序進行：

1. research-agent gather client context
2. docs-agent 以 research output 生成 proposal
3. comms-agent 以 proposal 撰寫 email

每個 agent 的 output 輸入至下一個。沒有 research 就無法撰寫 proposal。沒有 proposal 就無法撰寫 email。Coordinator 管理 handoff。

規則很簡單：不需互相等待的就平行執行，需要等待的就順序執行。Coordinator 會從 task description 自行判斷執行模式，我無需指定。但清晰的描述有幫助——『準備 meeting』意味平行；『draft 然後 send』意味順序。

## Cron Jobs：無人監督的自動化

Agent teams 加上 scheduled execution，便是真正的轉捩點。以下 7 個 cron job 在我睡覺的時候持續運行。

| Job | 時間 | 功能 |
|-----|------|------|
| **morning-briefing.sh** | 平日 8:30 AM | Calendar + overdue + client status → WhatsApp Cantonese ping |
| **blog-content-scan.sh** | 週一 10 AM | Scan → 選定 topic → draft → auto-publish（無 review gate） |
| **blog-nudge.sh** | 週四 10 AM | Blog health check，補捉週一 publish 失敗。WhatsApp 失效時以 Gmail 作 fallback |
| **bookmark-digest.sh** | 每日 9 PM | X/Twitter bookmarks 按主題歸類 |
| **stale-check.sh** | 週一 9 AM | 找出超過 14 日未動的 todo |
| **rotate-worklogs.sh** | 每月 1 號 | Archive 舊 worklog，保持低於 15KB |
| **backup-game-data.sh** | 定期 | Backup gamification data |

Morning briefing 是我感受最深的一個。每個工作日 8:30 AM，我尚未開電腦，WhatsApp 已經推送到手：

```
Ada 早晨提醒 03/23:

今日:
- 14:00 Seneca call (Garden)

要跟進:
- [OVERDUE] CTF 發票 — 逾期26日
- [DUE SOON] Garden 工作坊 — 3日後

Full briefing 喺 Craft.
```

Calendar event 已與 client memory 交叉比對。若 meeting 涉及的 client 有未完成的 todo，會標記 [PREP NEEDED]。完整 dashboard 存於 Craft document，WhatsApp 只呈現重點。兩個系統、兩層 detail、零手動操作。

Blog pipeline 是最激進的設計。Auto-publish mode。每週一，script scan 30 日的 worklog、client files、digested transcripts、X bookmark clusters。選定 topic，draft 文章，執行 Content DNA voice calibration，直接 publish 至 hyperfocusam.com。`git push` 加 `npm run deploy`。沒有 review gate。我於 2026 年三月批准此機制 -- 因為之前三個月每篇 draft 我都逐一 review，但改動不超過 5%。

## 節省成本的 Model 選擇

運行 9 個 agent 聽起來很貴。實際上並非如此，前提是有意識地選擇 model。

每個 agent 預設為 `model: inherit`（繼承 parent model），但 coordinator 會進行 cost-aware routing：

- **Haiku** -- 簡單搜索、file exploration、status check。最便宜。
- **Sonnet** -- 日常操作：email draft、memory update、calendar management。90% 的 task 落在這一層。
- **Opus** -- 複雜 planning、multi-step reasoning、nuanced writing。Proposal、blog、multi-client synthesis。品質直接影響收入的 task。

原則：Sonnet 能處理的不用 Opus。Haiku 能處理的不用 Sonnet。各 tier 之間的 token cost 大約相差 10 倍。Routing 做得好，同樣的 output 品質可以是每月 $50 與 $500 的差別。

## 如何開始：一個 Agent，不是九個

我要說清楚一件事。我並非一個週末就建立了 9 個 agent。整個 system 經歷了數月的演進。頭三個月只有一個 agent。後來因為 email handling 污染每個 task 的 context window，才先分拆出 comms-agent。接著是 docs-agent，因為 invoice formatting 是一項 specialized skill。然後是 research-agent，因為 web scraping tools 很重，不希望每個簡單的 email task 都載入它們。

若你今天開始，我的建議如下：

1. 從一個 CLAUDE.md 開始（[第一篇](/blog/claude-code-mastery-part-1-getting-started-tc)與[第二篇](/blog/claude-code-mastery-part-2-skills-memory-tc)）
2. 加入 hooks 保護最高風險的 tool call（[第三篇](/blog/claude-code-mastery-part-3-hooks-guardrails-tc)）
3. 當你發現某類 task 持續 bloat context window -- email、research、document -- 就將它分拆為你的第一個 specialist agent
4. 加一個 cron job：morning briefing。20 分鐘 setup，改變你每天的起步方式
5. 之後根據實際需求去 scale，而非根據 blog 上看起來多 impressive 去 scale

我所描述的架構並非理論。它正在運行我 20 多個 client engagement、六個國家、三間公司的業務。它 process meeting recordings、generate invoices、publish blog posts、send Cantonese morning briefings。我大約花了 200 個小時搭建，分佈在四個月內。現在每週為我節省約 15 個小時。

這些數字會 compound。System 越用越好，因為 memory 越來越豐富。Agent 越來越準確，因為 skills 越來越 refined。Cron jobs 捕捉到更多 edge cases，因為 worklogs 記錄了更多 patterns。

下一篇：第五篇，我會將整套體系 -- CLAUDE.md、memory、skills、hooks、agents、cron -- 整合為一份 complete blueprint，附有 starter template 供你 fork 與 customize。Full stack，一個 repo。

---

*我在六個國家為企業提供 AI adoption 培訓。如果你也在用 Claude Code 構建系統，歡迎到 [LinkedIn](https://www.linkedin.com/in/sam-ai-agent/) connect 交流。*