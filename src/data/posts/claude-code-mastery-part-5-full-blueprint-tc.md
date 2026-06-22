# Claude Code 完全攻略：完整藍圖 -- 我真正的系統

我有 ADHD。不是那種「偶爾分心」的程度，而是確診、正在服藥、卻依然會忘記昨天對 client 承諾過什麼的程度。Executive function 的問題 -- 下一步做什麼、答應過別人什麼、上次做到哪裡 -- 不是偶發的不便，而是我日常運作的基本條件。

我手上有八個 active client engagement，四間公司，訓練過超過一萬名 professional，遍及六個國家。同時撰寫中英雙語 blog，維護 content pipeline，運行一個 AI voice agent。全部在一個 terminal window 內完成。

本篇是 Claude Code 完全攻略系列的最後一篇。[第一篇](/blog/claude-code-mastery-part-1-getting-started-tc)講 CLAUDE.md。[第二篇](/blog/claude-code-mastery-part-2-skills-memory-tc)講 memory 與 skills。[第三篇](/blog/claude-code-mastery-part-3-hooks-guardrails-tc)講 hooks 與安全機制。[第四篇](/blog/claude-code-mastery-part-4-agent-teams-tc)講 agent teams 與自動化。

這次我把整個系統攤開來。每一個 file，每一個連接，每一個學到的教訓。你看到的是第 12 版。第 1 到第 11 版都是令人尷尬的失敗。

## 完整架構

這不是 diagram，不是 conceptual model。是我電腦裡真實的目錄結構。

```
Ada/
├── CLAUDE.md                        # Project 大腦 (Part 1)
├── .clinerules/                     # 憲法與操作規則
│   ├── ada.md                       # 指令接收 protocol
│   ├── agent.md                     # 五層學習架構
│   ├── skills.md                    # Skill 參考
│   └── response-format.md           # 回應 footer 格式
├── .claude/
│   ├── settings.json                # Hooks, permissions, env vars
│   ├── agents/                      # 9 個 agent 定義 (Part 4)
│   ├── skills/                      # 40+ skills (Part 2)
│   └── docs/                        # Agent routing, MCP setup, invoices
├── Memory/                          # 四層 memory system (Part 2)
│   ├── memory_worklogs.md           # 第二層：按時間記錄的動作
│   ├── memory_todos.md              # Active tasks
│   ├── memory_people.md             # 41 人的聯絡人目錄
│   ├── memory_<client>.md           # 每個 client 的 status file
│   └── digested/                    # 處理過的 meeting recording
├── Knowledge/                       # 第四層：可重用的 patterns
│   ├── insights.md                  # 有效的做法
│   ├── lessons.md                   # 失敗的教訓
│   └── sam-content-dna.md           # 所有 content 的 voice reference
├── scripts/
│   ├── hooks/                       # HTTP hooks server (Part 3)
│   │   ├── server.py                # FastAPI @ localhost:18924
│   │   ├── policy.py                # Policy evaluation engine
│   │   └── config.yaml              # Policy rules
│   └── cron/                        # 7 個自動化 job (Part 4)
└── output/                          # 生成的 files，flat structure
```

系列每一篇都對應一個 component。CLAUDE.md 是 Part 1。Memory 與 skills 是 Part 2。Hooks server 是 Part 3。Agent definitions 與 cron jobs 是 Part 4。Part 5 增加的是 wiring -- 這些元件如何互相連接，以及為什麼順序很重要。

## 數據如何流動

一個 session 不是一場對話，而是一個具有明確階段的 lifecycle。

**Session start。** InstructionsLoaded hook 觸發。它讀取 worklog 最後 15 行，檢查 priority todo file。在我尚未輸入任何文字之前，Claude 已經知道：上個 session 發送了 Garden invoice，今天有兩個 item 到期，HKCT training 還有四天。兩秒。500 tokens 以下。

**我輸入指令。** CLAUDE.md 提供 project context -- golden rules、business entities、communication style。如果任務足夠複雜，Agent Teams 會 route 至 specialist。Content agent 處理 blog draft。Client-ops agent 處理 invoice。Research agent 處理 analysis。每個 specialist 擁有自己的 context window、自己的 instructions、以及對相關 skills 的 access。

**執行。** Specialist agent 讀取相關的 Memory files -- client status、contact directory、past interactions。選擇匹配的 skill，依照其 workflow 執行。Output 進入 `output/`，採用我堅持的 flat naming convention：`CLIENT-Description-YYYYMMDD.ext`。沒有 subfolder。靠 filename 找到一切。

**安全層。** PreToolUse hooks 在敏感操作執行前進行 validate。Policy engine 檢查 sender address、要求 approval keywords、執行 rate limits。PostToolUse hooks 掃描傳入內容以偵測 prompt injection。每個 decision 都記錄到 SQLite。

**Memory write-back。** Task 完成後，worklog 增加新 entry。Client memory file 更新（如果 status 有變化）。Response footer 確認已記錄的內容 -- 這不是 optional，而是 system 強制執行的。

**Session end。** Stop hook 觸發。它檢查本次 session 是否涉及 client work，阻止退出直到 memory files 更新完畢。部署之後，我再沒有遺失過 session context。之前每週都會遺失一次。

**夜間。** 七個 cron job 按 schedule 運行。早上 8:30 的 morning briefing 彙整我的一天。週一 10:00 的 blog scanner 自動發布已核准的 drafts。晚上 9:00 的 bookmark digest。週一早上的 stale check 標記超過兩週未更新的 memory files。每月一號的 worklog rotation。

整個 data flow 就是如此。我輸入一句話，六個 coordinated actions 跨越 memory、skills、hooks、cron 自動發生。我無需思考其中任何一步。

## 持續學習的 Protocol

Memory system 不是一個 static archive，而是一個具有 promotion rules 的活系統。

每個有意義的動作都記錄到 worklog。這是第二層。Schema 極為嚴格：日期、domain、action、outcome、next step。一行記錄就足以讓我恢復 context。

當 client status 發生變化時 -- 新 invoice 送出、deliverable 完成、engagement phase 轉換 -- 相關的 `memory_<client>.md` file 隨之更新。這是第三層。21 個經過篩選的 files，每個頂部都有 status header。

有趣的事情發生在第四層。System 會監測 patterns：

- Worklog 中出現三次以上類似動作 -- 提議：「是否將此記錄為 Knowledge entry？」
- 兩次以上類似錯誤 -- 自動加入 `lessons.md`
- 五次以上成功執行同一個 workflow -- 提升為正式 SOP

這不是紙上談兵，而是正在運行的 code。三個月內，Knowledge base 累積了 47 個 entry -- brand voice rules、invoice formatting standards、deployment checklists、client communication patterns。每一個都由重複動作自然產生，而非我坐下來撰寫 documentation。

三月的系統明顯比一月的系統聰明。不是因為 model 升級，而是因為 memory layer 的密度增加了。

## 真正的費用

大部分撰寫 AI tool 相關文章的人不談錢。我談。

Claude Code 使用 API credits。我每月的費用約為 USD 150 到 300，視 workload 而定。多 client deliverables、agent team sessions、content generation 的週數會觸及上限。Routine 的週數 -- email、follow-up、memory maintenance -- 約 USD 150。

三個決策大幅降低了成本：

**Model selection。** 並非每個 task 都需要最強的 model。Simple search 用 Haiku。Routine 操作 -- email drafting、memory update、status check -- 用 Sonnet。Complex planning、multi-client synthesis、nuanced writing -- 才用 Opus。全部使用 Opus 與 tiered model selection 相比，總支出相差約 60%。

**Skills 的 progressive disclosure。** 40 個 skills 全部載入約需 200,000 tokens。三層系統 -- metadata 開機載入、instructions 按需載入、resources 需要時才載入 -- 將 startup cost 壓縮至約 4,000 tokens。節省 80% 的 context overhead。

**Agent Teams 節制使用。** Agent Teams 設計上就是 token-intensive -- 每個 sub-agent 擁有自己的 context window。我僅在複雜的 multi-domain task 時使用，不會用來「查一下 email」。一個 scope 不佳的 agent team session 單次對話可耗費 $8-12。Scope 良好的約 $2-3，但能省下整整一小時的手動 coordination。

系統是否回本？我對 client 的收費約為 HKD 800 到 2,000 一小時。如果系統每月節省 10 小時 -- 而實際節省的遠超此數 -- 回本數倍。

真正的成本不是 API 費用，而是五個月的 iteration 時間。

## 從零開始的優先順序

如果你從零開始，不要照搬我的系統。先建第一層，然後讓其餘部分從實際需求中自然浮現。

**第一週：CLAUDE.md。** 五分鐘。即時見效。寫下你的 project snapshot、三條 golden rules、一個 communication preference。第一個 session 就能感受到差別。

**第二週：Auto-memory。** Claude Code 有 built-in memory 功能，會寫入 `~/.claude/memory`。開啟它，使用一週。觀察它記住什麼、遺漏什麼。這會教你 custom memory system 需要解決哪些問題。

**第三週：你的第一個 skill。** 選擇你最常重複的一項 task。我的是 publish blog post。將準確的步驟寫入 SKILL.md。具體 path、具體 command、沒有含糊空間。30 分鐘 setup，此後每次執行該 task 都節省 30 分鐘的重新解釋。

**第二個月：Email 的 PreToolUse hook。** 15 分鐘 setup。一條 rule：outbound message 前須取得 explicit approval。當這個 hook 第一次攔截到錯誤的那天，你就會明白為什麼 guardrails 比 features 重要。

**第二至三個月：真正的 memory system。** 從 worklog 開始 -- 一個 file，one-line entries，按時間排列。兩週後你會看到哪些 topic 需要自己的 curated file。建立它們。在 CLAUDE.md 中加入 rule，使提及 client 名稱時自動載入。

**第三至四個月：第一個 agent definition。** 到這個階段，你已有足夠的 skills 與 memory 使 delegation 具有意義。為你最複雜的 workflow 定義一個 specialist agent。

**第四個月之後：Cron jobs。** 排在最後，因為它們需要一個穩定的系統作為基礎。Blog scan 的 cron job 毫無用處，如果 blog publishing skill 本身都還不穩定。

這個順序並非隨意排列，而是我真正的建設順序，減去六次走錯路的 detour。

## ADHD 的作業系統

我建造這個系統不是因為我有條理，恰恰是因為我沒有。

ADHD 意味著我的 working memory 不可靠。我會忘記兩天前對 client 承諾過什麼。我會失去對哪個 engagement 處於哪個 phase 的追蹤。我開啟一個 session，被緊急事務拉走，然後忘記原本在做什麼。這些不是性格缺陷，而是我大腦的運作方式。

這個系統補償了每一項：

**InstructionsLoaded hook 是我的「做到哪了？」按鈕。** 每個 session 自動擁有 context。我無需記住上次做到哪裡。Worklog 告訴我。

**Memory system 是外置的 working memory。** 我無需記住 Garden 是 Batch 2、invoice 是 HKD 63K、Top Management workshop 已確認。它都在 `memory_adaptig_garden.md` 裡。我一說「Garden」，Claude 自動載入。

**Follow-up tracker 是自動化的提醒。** 我的 `/followups` command 將每個 open todo 分類為 OVERDUE、DUE SOON、WAITING、STALE。我無需在腦中維護一份 commitments 清單。System 代為維護，並標記需要關注的項目。

**Cron jobs 是即使我忘記也會發生的事。** Morning briefing 彙整我的一天，不論我是否記得檢查。Blog scanner 發布已核准的 content，不論我是否記得 deploy。Stale check 標記被忽略的 client files，不論我是否記得 review。

**Stop hook 是不可略過的退出檢查。** 我的傾向是做完就立刻 move on，不更新記錄。這個 hook 擋住了。Session 無法結束，直到 memory 是最新的。

這個系統的每一個 component 都因為沒有它時我曾經失敗過而存在。Memory system 存在是因為我忘記過 client commitments。Hooks 存在是因為我差點發送錯誤的 email。Cron jobs 存在是因為我忘記發布已經寫好的內容。Stop hook 存在是因為我不斷在 sessions 之間遺失 context。

我不是在推銷 productivity framework。我是在描述一個 executive function 的義肢。它之所以有效，是因為它由一個真正需要它的人建造出來。

## 失敗與無效的嘗試

你看到的是第 12 版。第 1 到第 11 版的精選：

**過早的 over-engineer。** 我在需要 10 個 skill 之前就建了 40 個。第一個月我過於興奮，為一年只做兩次的 task 也建 skill。大部分從未被使用。教訓：一個 task 做到第三次再建 skill，而不是第一次。

**Memory files 無限增長。** Worklog 到了 102KB 才發現問題。Claude 花費數千 tokens 讀取兩個月前完全無關的 entry。之後建立了 monthly rotation。Active file 保持在 15KB 以下。舊 entry 歸檔，不做刪除。這個限制本身就是 feature。

**Auto-publish 的信任校準。** Blog auto-publish pipeline 花了三個月建立 guardrails 才敢啟用。第一版：沒有 approval gate，沒有 content check。它發布了一篇含有 placeholder text 的 draft 到我的 live site。我 20 分鐘後才知道，因為有朋友傳訊息給我。現在這個 pipeline 具備 content validation、pipeline spreadsheet 的 decision column、以及週四的 nudge cron 捕捉失敗的 publishes。

**Agent Teams 的 token 成本。** 第一次用 Agent Teams 處理一封簡單 email，花了 $11。十一美金一封 email。每個 sub-agent 開啟自己的 context window，載入整套 memory system，其中一個還重讀了另一個已經處理過的 files。加入 model selection rules -- Haiku 做 search，Sonnet 做 routine，Opus 做 complex -- 之後平均 agent team session 降至 $2-3。

**遊戲變成了現實。** 我建了一款 [RTK 式 strategy game](/blog/ada-gersang-gamifying-claude-code) 作為 fun side project 來 gamify Claude Code 使用量。本來只是娛樂。然後我開始真的在 sessions 之間查看 dashboard。然後我開始 optimize workflow 以賺取 XP。然後我發現這個遊戲變成了一個真正的 motivational tool -- 對一個 ADHD 的人而言，visible progress bar 的效果遠勝 abstract todo list。

**Voice agent 的 latency 問題。** 我用 ElevenLabs 和 Claude 作為 backend 建了一個 [live voice mode](/blog/i-built-voice-mode-claude-code)。Demo 很出色。Production 時 latency 過高 -- ElevenLabs 大約一秒無聲就會 abort，而 Claude 的回應時間超過這個閾值。最終改用 Gemini Flash 做 live inference，Claude 作為 background knowledge layer。System 運作了，但架構比我想像中醜陋。

我分享這些不是因為 failure stories 如今流行，而是因為經過打磨的版本 -- 我在 Part 1 到 Part 4 描述的那個 -- 會讓人以為我一開始就知道該做什麼。我並不知道。我是靠不斷建造錯誤的東西，才知道要建造正確的東西。

## 全貌

五個月 iteration 之後，一個成熟的 AI operating system 究竟是什麼樣子，說到最直白：

200 行 config file 告訴 AI 它是誰。21 個 memory file 告訴它每個 client 的狀況。40 個 skills 告訴它如何完成特定 task。163 行 policy server 阻止它做危險的事。7 個 cron job 讓事情按 schedule 自動發生。9 個 agent definition 讓它 delegate 給 specialist。以及一個 continuous learning protocol 讓整套系統每週都更聰明。

每一個 component 單獨來看都不算 impressive。CLAUDE.md 是一個 markdown file。Skill 是一個含有 text file 的 folder。Hooks server 是一個週末項目。Cron jobs 是 bash scripts。

使這個系統有效的不是任何單一 component，而是每一個 component 都與其他所有 component 相互連接，而這些連接是經過五個月實際使用所塑造出來的。Memory system 輸入到 skills。Skills 產出的內容記錄回 memory。Hooks 在所有操作之上執行安全機制。Cron jobs 在我不在的時候保持系統運轉。Agents 跨越全部進行 coordinate。

大部分人將 Claude Code 當作一個高級 terminal。沒有問題，它做那件事確實很出色。但如果你持續使用下去，持續遇到同樣的問題 -- context loss、repeated mistakes、forgotten follow-ups、manual coordination -- 你最終會建造出類似的東西。不是因為你事先規劃好，而是因為每個問題都需要一個解決方案，而那些解決方案累積起來就變成了一個 system。

我並未打算建造一個 AI operating system。我只是想發一封 client email 而不遺漏 attachment。然後想記住上週對他們承諾了什麼。然後想不要把 invoice 發給錯誤的人。然後想讓 blog 自動發布。然後想讓 agents 互相合作。

五個月。十二個版本。一個 terminal window。

如果不在系統之中，就不存在。這正是系統有效的原因。

---

*本篇是 Claude Code 完全攻略系列的最後一篇。[第一篇](/blog/claude-code-mastery-part-1-getting-started-tc)、[第二篇](/blog/claude-code-mastery-part-2-skills-memory-tc)、[第三篇](/blog/claude-code-mastery-part-3-hooks-guardrails-tc)、[第四篇](/blog/claude-code-mastery-part-4-agent-teams-tc)有每個 component 的詳細講解。如果你也正在搭建自己的系統，歡迎到 [LinkedIn](https://www.linkedin.com/in/sam-ai-agent/) connect -- 我確實想看看其他人會建造出什麼。*
