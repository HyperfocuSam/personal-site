
# Claude Code 完全攻略：Agent 團隊同自動化 -- 你嘅 AI 工作團隊

我有 9 個 agent。佢哋跑緊 7 個 cron job。我嘅 blog 每個禮拜一自己出文，我完全唔使㩒 keyboard。每朝 8:30，WhatsApp 會彈個 Cantonese briefing 出嚟 -- calendar 衝突 flag 咗，overdue item 排好晒。

一個 agent 有用。一隊 specialist 係完全唔同層次嘅嘢。

呢篇係 Claude Code 完全攻略第四篇。[第一篇](/blog/claude-code-mastery-part-1-getting-started-tc)講 CLAUDE.md，[第二篇](/blog/claude-code-mastery-part-2-skills-memory-tc)講 memory 同 skills，[第三篇](/blog/claude-code-mastery-part-3-hooks-guardrails-tc)講 hooks 同安全機制。今次講嘅係：當你唔再當 AI 係一個助手，而係當佢係一隊人嘅時候，會發生啲乜。

## 點解一個 Agent 唔夠用

頭三個月我乜嘢都塞落一個 agent 度。一個 context window、一套 instructions。直到有一日爆煲。

嗰日我叫 Ada 幫我準備 client meeting：pull 最新 email thread、check invoice status、睇下 calendar 有冇衝突、draft 個 brief。四樣嘢。Agent 逐樣做 -- load email MCP、query inbox、load calendar MCP、讀 memory file、開始 draft。做完嘅時候，context window 已經塞咗 80,000 tokens 嘅中間結果。個 draft 好普通，因為 agent 花咗更多 token 去 manage 自己嘅 context，而唔係 think about output。

解決方法唔係寫更好嘅 prompt。係改架構。

## Agent Teams 係乜

Agent Teams 係 Claude Code 嘅 experimental feature -- 同時跑幾個 agent，每個有自己嘅 context window 同專長。一個 environment variable 就開到：

```
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

每個 agent 係 `.claude/agents/` 入面嘅一個 markdown file。Frontmatter 定義 name、description、model、color。Body 係 agent 嘅 system instructions -- 佢嘅角色、scope boundary、available tools、operating procedures。

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

個 description field 好重要。Claude Code 靠佢嚟做 routing -- coordinator 收到 task 嘅時候，會讀每個 agent 嘅 description 嚟決定 delegate 俾邊個。Description 寫得差，task 就去錯 agent。

## 九個 Agent 嘅完整陣容

| Agent | 負責範圍 | 觸發條件 |
|-------|---------|---------|
| **ada-executive-assistant** | 總指揮、routing、memory | 多步驟 task、唔明確嘅 request |
| **comms-agent** | Email、WhatsApp、follow-up | draft、reply、send |
| **scheduler-agent** | Calendar、meetings、ICS | meeting、schedule、availability |
| **docs-agent** | Proposal、invoice、presentation | proposal、invoice、report |
| **research-agent** | Web research、competitive intel | research、look up、analyze |
| **memory-agent** | Brain digestion、memory 整合 | digest brain、process memory |
| **workshop-agent** | Workshop 內容、翻譯 | workshop、translation、TTT |
| **inbox-triage-agent** | 只讀 inbox 分析 | inbox、triage、what did I miss |
| **mascot-video-agent** | 完整 video production | mascot、animated video |

每個 agent 有自己嘅 MCP server assignment。Comms-agent 有 Google Workspace 同 WhatsApp。Research-agent 有 Firecrawl 同 Exa。Inbox-triage-agent 有 Google Workspace 但係 strictly read-only -- 永遠唔可以 send、draft、或者改 email。Scope boundary 唔係建議，係寫死喺 instructions 入面嘅硬限制。

Coordinator -- ada-executive-assistant -- 嘅 system prompt 入面有一個 delegation matrix。我話「幫 Garden 出張 invoice」，佢唔會自己做。佢查 matrix，見到 document generation 對應 docs-agent，直接 delegate。Coordinator 嘅工作係 routing 同 synthesis，唔係 execution。

## 平行 vs 順序執行

呢度係 agent teams 真正值錢嘅地方。

**平行執行**用喺冇 dependency 嘅 task。「幫我準備 Publicis 嘅 meeting」會同時 spawn 三個 agent：

- research-agent pull client background
- comms-agent 搵最近五封 email
- memory-agent load 完整 client history

三個 agent，三個獨立 context window，幾秒內三個結果一齊返嚟。Coordinator 綜合成一份 brief。Total wall-clock time 大約等於一個 agent 做其中一樣嘅時間。

**順序執行**用喺 pipeline。「Draft 份 proposal 然後 send 俾 Kelly」要順序嚟：

1. research-agent gather client context
2. docs-agent 用 research output 嚟 generate proposal
3. comms-agent 用 proposal 嚟 draft email

每個 agent 嘅 output feed 去下一個。未有 research 就寫唔到 proposal。未有 proposal 就寫唔到 email。Coordinator 管 handoff。

Rule 好簡單：唔使互相等嘅就平行跑，要等嘅就順序跑。

## Cron Jobs：冇人監督嘅自動化

Agent teams 加上 scheduled execution，就係真正嘅轉捩點。呢 7 個 cron job 喺我瞓覺嘅時候跑住。

| Job | 時間 | 做咩 |
|-----|------|------|
| **morning-briefing.sh** | 平日 8:30 AM | Calendar + overdue + client status → WhatsApp Cantonese ping |
| **blog-content-scan.sh** | 星期一 10 AM | Scan → 揀 topic → draft → auto-publish（冇 review gate） |
| **blog-nudge.sh** | 星期四 10 AM | Blog health check，catch 星期一 publish 失敗 |
| **bookmark-digest.sh** | 每日 9 PM | X/Twitter bookmarks 按 theme 歸類 |
| **stale-check.sh** | 星期一 9 AM | 搵 >14 日冇郁嘅 todo |
| **rotate-worklogs.sh** | 每月 1 號 | Archive 舊 worklog，保持 <15KB |
| **backup-game-data.sh** | 定期 | Backup gamification data |

Morning briefing 係我最有感覺嘅一個。每個平日 8:30 AM，我未開電腦，WhatsApp 已經彈咗出嚟：

```
Ada 早晨提醒 03/23:

今日:
- 14:00 Seneca call (Garden)

要跟進:
- [OVERDUE] CTF 發票 — 逾期26日
- [DUE SOON] Garden 工作坊 — 3日後

Full briefing 喺 Craft.
```

Calendar event 對比咗 client memory。如果 meeting 涉及嘅 client 有未完成嘅 todo，會 flag [PREP NEEDED]。完整 dashboard 去 Craft document，WhatsApp 只係 highlight。兩個系統、兩層 detail、零手動。

Blog pipeline 係最激進嘅。Auto-publish mode。每個星期一，script scan 30 日嘅 worklog、client files、digested transcripts、X bookmark clusters。揀個 topic，draft 篇文，跑 Content DNA voice calibration，直接 publish 去 hyperfocusam.com。`git push` 加 `npm run deploy`。冇 review gate。我喺 2026 年三月批准嘅 -- 因為之前三個月每篇 draft 我都 review，但改動少過 5%。

## 慳錢嘅 Model 選擇

跑 9 個 agent 聽落好貴。其實唔係，如果你 deliberate 去揀 model。

每個 agent default `model: inherit`（繼承 parent model），但 coordinator 會做 cost-aware routing：

- **Haiku** -- 簡單搜索、file exploration、status check。最平。
- **Sonnet** -- 日常操作：email draft、memory update、calendar management。90% task 落呢度。
- **Opus** -- 複雜 planning、multi-step reasoning、nuanced writing。Proposal、blog、multi-client synthesis。質素直接影響收入嘅 task。

Rule：Sonnet 搞到嘅唔好用 Opus。Haiku 搞到嘅唔好用 Sonnet。Tier 之間嘅 token cost 大約差 10 倍。Routing 做得好，同樣 output 質素可以係 $50/月同 $500/月嘅分別。

## 點樣開始：一個 Agent，唔係九個

我想講清楚一件事。我唔係一個 weekend 就起咗 9 個 agent。個 system evolve 咗幾個月。頭三個月得一個 agent。之後因為 email handling 污染每個 task 嘅 context window，先 split 咗 comms-agent 出嚟。然後 docs-agent，因為 invoice formatting 係 specialized skill。然後 research-agent，因為 web scraping tools 好重，唔想每個簡單 email task 都 load 佢哋。

如果你今日開始，我建議：

1. 由一個 CLAUDE.md 開始（[第一篇](/blog/claude-code-mastery-part-1-getting-started-tc)同[第二篇](/blog/claude-code-mastery-part-2-skills-memory-tc)）
2. 加 hooks 保護你最高風險嘅 tool call（[第三篇](/blog/claude-code-mastery-part-3-hooks-guardrails-tc)）
3. 當你發現某類 task 不斷 bloat context window -- email、research、document -- 就 split 佢做你第一個 specialist agent
4. 加一個 cron job：morning briefing。20 分鐘 setup，改變你每日嘅起步方式
5. 之後按你真正需要嘅去 scale，唔係按 blog 上面睇落幾 impressive 去 scale

我描述嘅架構唔係理論。佢跑緊我 20 幾個 client engagement、六個國家、三間公司嘅業務。佢 process meeting recordings、generate invoices、publish blog posts、send Cantonese morning briefings。我大約用咗 200 個鐘去起，分開四個月。而家每個禮拜幫我慳大約 15 個鐘。

呢啲數字會 compound。System 越用越好，因為 memory 越嚟越豐富。Agent 越嚟越準確，因為 skills 越嚟越 refined。Cron jobs catch 到更多 edge cases，因為 worklogs record 咗更多 patterns。

下一篇：第五篇，我會將成套嘢 -- CLAUDE.md、memory、skills、hooks、agents、cron -- 拉埋做一份 complete blueprint，有 starter template 你可以 fork 同 customize。Full stack，一個 repo。

---

*我喺六個國家 train 企業做 AI adoption。如果你都喺度用 Claude Code 砌嘢，歡迎嚟 [LinkedIn](https://www.linkedin.com/in/samwong-ai/) connect 交流。*
