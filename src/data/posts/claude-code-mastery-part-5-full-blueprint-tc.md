
# Claude Code 完全攻略：完整藍圖 -- 我真正嘅系統

我有 ADHD。唔係嗰種「有時會分心」嘅程度。係確診、食緊藥、但仲係會忘記噚日同 client 承諾咗乜嘅程度。Executive function 嘅問題 -- 下一步做乜、答應咗人啲咩、上次做到邊 -- 唔係偶然嘅不便，係我日常運作嘅基本條件。

我手上有八個 active client engagement，四間公司，train 過超過一萬個 professional，六個國家。寫緊中英雙語 blog，maintain 緊 content pipeline，跑緊一個 AI voice agent。全部喺一個 terminal window 入面搞掂。

呢篇係 Claude Code 完全攻略系列嘅最後一篇。[第一篇](/blog/claude-code-mastery-part-1-getting-started-tc)講 CLAUDE.md。[第二篇](/blog/claude-code-mastery-part-2-skills-memory-tc)講 memory 同 skills。[第三篇](/blog/claude-code-mastery-part-3-hooks-guardrails-tc)講 hooks 同安全機制。[第四篇](/blog/claude-code-mastery-part-4-agent-teams-tc)講 agent teams 同自動化。

今次我攤開晒成個系統俾你睇。每一個 file，每一個連接，每一個學到嘅教訓。你見到嘅係第 12 版。第 1 到第 11 版都係尷尬嘅失敗。

## 完整架構

呢個唔係 diagram，唔係 conceptual model。係我部機入面真實嘅目錄結構。

```
Ada/
├── CLAUDE.md                        # Project 大腦 (Part 1)
├── .clinerules/                     # 憲法同操作規則
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
│   ├── memory_worklogs.md           # 第二層：按時間記錄嘅動作
│   ├── memory_todos.md              # Active tasks
│   ├── memory_people.md             # 41 人嘅聯絡人目錄
│   ├── memory_<client>.md           # 每個 client 嘅 status file
│   └── digested/                    # 處理過嘅 meeting recording
├── Knowledge/                       # 第四層：可重用嘅 patterns
│   ├── insights.md                  # 乜嘢 work
│   ├── lessons.md                   # 乜嘢 fail 咗
│   └── sam-content-dna.md           # 所有 content 嘅 voice reference
├── scripts/
│   ├── hooks/                       # HTTP hooks server (Part 3)
│   │   ├── server.py                # FastAPI @ localhost:18924
│   │   ├── policy.py                # Policy evaluation engine
│   │   └── config.yaml              # Policy rules
│   └── cron/                        # 7 個自動化 job (Part 4)
└── output/                          # 生成嘅 files，flat structure
```

系列每一篇都對應一個 component。CLAUDE.md 係 Part 1。Memory 同 skills 係 Part 2。Hooks server 係 Part 3。Agent definitions 同 cron jobs 係 Part 4。Part 5 加嘅嘢係 wiring -- 呢啲嘢點樣互相連接，同埋點解 order matters。

## 數據點樣流

一個 session 唔係一個對話。佢係一個有定義階段嘅 lifecycle。

**Session start。** InstructionsLoaded hook fire。佢讀最後 15 行 worklog，check priority todo file。我未打字之前，Claude 已經知道：上個 session send 咗 Garden invoice，今日有兩個 item due，HKCT training 仲有四日。兩秒。500 tokens 以下。

**我打咗嘢。** CLAUDE.md 提供 project context -- golden rules、business entities、communication style。如果個 task 夠複雜，Agent Teams 會 route 去 specialist。Content agent 處理 blog draft。Client-ops agent 處理 invoice。Research agent 處理 analysis。每個 specialist 有自己嘅 context window、自己嘅 instructions、access 到相關嘅 skills。

**執行。** Specialist agent 讀相關嘅 Memory files -- client status、contact directory、past interactions。揀 matching skill，跟佢嘅 workflow。Output 去 `output/`，用我堅持嘅 flat naming convention：`CLIENT-Description-YYYYMMDD.ext`。冇 subfolder。靠 filename 搵晒所有嘢。

**安全層。** PreToolUse hooks 喺敏感操作執行前 validate。Policy engine check sender address、require approval keywords、enforce rate limits。PostToolUse hooks scan incoming content 搵 prompt injection。每個 decision log 落 SQLite。

**Memory write-back。** Task 完成之後，worklog 加新 entry。Client memory file update（如果 status 有變）。Response footer confirm 咗 log 咗乜 -- 呢個唔係 optional，system enforce 嘅。

**Session end。** Stop hook fire。佢 check 呢個 session 有冇涉及 client work，block exit 直到 memory files update 咗。Deploy 咗之後，我再冇 lost 過 session context。之前每個禮拜都會 lose 一次。

**夜晚。** 七個 cron job 按 schedule 跑。朝早 8:30 嘅 morning briefing compile 我嘅一日。禮拜一 10:00 嘅 blog scanner auto-publish approved drafts。9:00 PM 嘅 bookmark digest。禮拜一朝早嘅 stale check flag 超過兩個禮拜冇 update 嘅 memory files。每月一號嘅 worklog rotation。

成個 data flow 就係噉。我打一句嘢，六個 coordinated actions 跨 memory、skills、hooks、cron 自動發生。我唔使諗其中任何一步。

## 持續學習嘅 Protocol

Memory system 唔係一個 static archive。係一個有 promotion rules 嘅活系統。

每個有意義嘅動作 log 落 worklog。呢個係第二層。Schema 好嚴格：日期、domain、action、outcome、next step。一行嘢就夠我恢復 context。

Client status 有變嘅時候 -- 新 invoice sent、deliverable 完成、engagement phase shift -- 相關嘅 `memory_<client>.md` file 會 update。呢個係第三層。21 個 curated files，每個頂部有 status header。

有趣嘅嘢喺第四層發生。System 會 watch patterns：

- Worklog 入面三次以上類似動作 -- 提議：「要唔要 capture 做 Knowledge entry？」
- 兩次以上類似錯誤 -- 自動加入 `lessons.md`
- 五次以上成功執行同一個 workflow -- promote 做正式 SOP

呢個唔係紙上談兵。係跑緊嘅 code。三個月內，Knowledge base 累積咗 47 個 entry -- brand voice rules、invoice formatting standards、deployment checklists、client communication patterns。每一個都係由重複動作自然產生，唔係我坐低寫 documentation。

三月嘅 system 明顯聰明過一月嘅 system。唔係因為 model 升級。係因為 memory layer 密度增加咗。

## 真正嘅費用

大部分寫 AI tool 嘅人唔講錢。我講。

Claude Code 用 API credits。我每個月嘅費用大概 USD 150 到 300，視乎 workload。多 client deliverables、agent team sessions、content generation 嘅禮拜會去到上限。routine 嘅禮拜 -- email、follow-up、memory maintenance -- 大概 USD 150。

三個 decision 大幅降低咗成本：

**Model selection。** 唔係每個 task 都需要最叻嘅 model。Simple search 用 Haiku。Routine 操作 -- email drafting、memory update、status check -- 用 Sonnet。Complex planning、multi-client synthesis、nuanced writing -- 先用 Opus。全部用 Opus 對比 tiered model selection，差大概 60% 嘅總支出。

**Skills 嘅 progressive disclosure。** 40 個 skills 全部 load 大概要 200,000 tokens。三層 system -- metadata 開機 load、instructions on-demand、resources 需要先 load -- 將 startup cost 壓到大概 4,000 tokens。慳咗 80% context overhead。

**Agent Teams 慳住用。** Agent Teams 設計上就係 token-intensive -- 每個 sub-agent 有自己嘅 context window。我只喺複雜嘅 multi-domain task 先用，唔會用嚟「check 下 email」。一個 scope 得差嘅 agent team session 可以一次對話用 $8-12。Scope 好嘅大概 $2-3，但慳返成個鐘手動 coordination。

個 system 回唔回本？我 bill client 大概 HKD 800 到 2,000 一個鐘。如果個 system 每個月慳返 10 個鐘 -- 而佢慳返嘅遠多過呢個數 -- 回本好幾倍。

真正嘅成本唔係 API 費用。係五個月嘅 iteration 時間。

## 由零開始嘅 Priority Order

如果你由零開始，唔好 build 我嘅 system。Build 第一層，然後等其餘嘅由實際需要自然出現。

**第一個禮拜：CLAUDE.md。** 五分鐘。即時有效。寫你嘅 project snapshot、三條 golden rules、一個 communication preference。第一個 session 就感覺到分別。

**第二個禮拜：Auto-memory。** Claude Code 有 built-in memory 功能，會寫入 `~/.claude/memory`。開咗佢，用一個禮拜。留意佢記得乜同唔記得乜。呢個會教你 custom memory system 需要解決啲乜。

**第三個禮拜：你嘅第一個 skill。** 揀你最常重複嘅一個 task。我嘅係 publish blog post。將準確嘅步驟寫入 SKILL.md。具體 path、具體 command、冇含糊。30 分鐘 setup，之後每次做嗰個 task 都慳返 30 分鐘重新解釋。

**第二個月：Email 嘅 PreToolUse hook。** 15 分鐘 setup。一條 rule：outbound message 之前要 explicit approval。當呢個 hook 第一次 catch 到錯誤嗰日，你就會明白點解 guardrails 比 features 重要。

**第二至三個月：真正嘅 memory system。** 由 worklog 開始 -- 一個 file，one-line entries，按時間排。兩個禮拜之後你會見到邊啲 topic 需要自己嘅 curated file。建咗佢哋。喺 CLAUDE.md 加 rule 講提到 client 名就自動 load。

**第三至四個月：第一個 agent definition。** 到呢個時候你有夠多 skills 同 memory 令 delegation 有意義。定義一個 specialist agent 俾你最複雜嘅 workflow。

**第四個月之後：Cron jobs。** 呢啲排最後，因為佢哋需要一個穩定嘅 system 喺下面。Blog scan 嘅 cron job 冇用，如果個 blog publishing skill 自己都未 work 穩。

呢個 order 唔係隨便排嘅。係我真正 build 嘅順序，減去六次行錯路嘅 detour。

## ADHD 嘅操作系統

我起呢個 system 唔係因為我有條理。係因為我冇。

ADHD 代表我嘅 working memory 唔可靠。我會唔記得兩日前同 client 承諾咗乜。我會 lose track 邊個 engagement 喺邊個 phase。我開咗個 session，俾 urgent 嘢拉走咗，然後唔記得原本做緊乜。呢啲唔係性格缺陷。係我個腦嘅運作方式。

個 system 補償咗每一樣：

**InstructionsLoaded hook 係我嘅「做到邊？」button。** 每個 session 自動有 context。我唔使記得上次做到邊。Worklog 話俾我知。

**Memory system 係外置 working memory。** 我唔使記得 Garden 係 Batch 2、invoice 係 HKD 63K、Top Management workshop confirmed 咗。佢喺 `memory_adaptig_garden.md` 入面。我一講 "Garden"，Claude 自動 load。

**Follow-up tracker 係自動嘅 nag。** 我嘅 `/followups` command 將每個 open todo 分類做 OVERDUE、DUE SOON、WAITING、STALE。我唔使喺腦入面 maintain 一個 commitments list。System maintain 佢然後 flag 需要注意嘅嘢。

**Cron jobs 係就算我忘記都會發生嘅嘢。** Morning briefing compile 我嘅一日，唔理我記唔記得 check。Blog scanner publish approved content，唔理我記唔記得 deploy。Stale check flag 被忽略嘅 client files，唔理我記唔記得 review。

**Stop hook 係不可略過嘅 exit check。** 我嘅傾向係做完就即刻 move on，唔 update records。呢個 hook 擋住。Session 唔可以結束直到 memory 係 current 嘅。

呢個 system 嘅每一個 component 都存在，因為冇佢嗰陣我 fail 過。Memory system 存在因為我忘記過 client commitments。Hooks 存在因為我差啲 send 錯 email。Cron jobs 存在因為我忘記 publish 已經寫好嘅嘢。Stop hook 存在因為我不斷 lose context between sessions。

我唔係喺 sell productivity framework。我係喺描述一個 executive function 嘅義肢。佢 work 係因為佢由一個真正需要佢嘅人 build 出嚟。

## 失敗同唔 Work 嘅嘢

你見到嘅係第 12 版。第 1 到第 11 版嘅精選：

**太早 over-engineer。** 我喺需要 10 個 skill 之前就 build 咗 40 個。第一個月我太興奮，為一年做兩次嘅 task 都建 skill。大部分一直冇人用。教訓：一個 task 做到第三次先 build skill，唔係第一次。

**Memory files 無限增長。** Worklog 去到 102KB 先發現。Claude 花緊幾千 tokens 讀兩個月前完全冇關嘅 entry。之後起咗 monthly rotation。Active file 保持 15KB 以下。舊 entry archive，唔會 delete。呢個 constraint 本身就係 feature。

**Auto-publish 嘅信任校準。** Blog auto-publish pipeline 用咗三個月 build guardrails 先夠膽開。第一版：冇 approval gate，冇 content check。佢 publish 咗一篇有 placeholder text 嘅 draft 去我嘅 live site。我 20 分鐘之後先知，因為有朋友 message 我。而家個 pipeline 有 content validation、pipeline spreadsheet 嘅 decision column、同禮拜四嘅 nudge cron catch failed publishes。

**Agent Teams 嘅 token 成本。** 第一次用 Agent Teams 做一個 simple email task，花咗 $11。十一美金一封 email。每個 sub-agent 開自己嘅 context window，load 成套 memory system，然後其中一個重讀咗另一個已經 process 過嘅 files。加咗 model selection rules -- Haiku 做 search，Sonnet 做 routine，Opus 做 complex -- 之後平均 agent team session 降到 $2-3。

**個 game 變咗真。** 我起咗一隻 [RTK 式 strategy game](/blog/ada-gersang-gamifying-claude-code) 做 fun side project 去 gamify Claude Code 使用量。本來係玩嘅。然後我開始真係喺 session 之間 check 個 dashboard。然後我開始 optimize workflow 去賺 XP。然後我發現個 game 變咗一個真正嘅 motivational tool -- 對一個 ADHD 嘅人嚟講，visible progress bar 嘅效果好過 abstract todo list 好多倍。

**Voice agent 嘅 latency 問題。** 我用 ElevenLabs 同 Claude 做 backend 起咗個 [live voice mode](/blog/i-built-voice-mode-claude-code)。Demo 好靚。Production 嘅時候 latency 太高 -- ElevenLabs 大概一秒冇聲就 abort，Claude 嘅回應時間超過呢個。最後要轉用 Gemini Flash 做 live inference，Claude 做 background knowledge layer。System work 咗，但架構比我想像中醜。

我分享呢啲唔係因為 failure stories 而家流行。係因為 polished version -- 我喺 Part 1 到 Part 4 描述嗰個 -- 會令人以為我一開始就知做乜。我唔知。我係靠不斷 build 錯嘢先知要 build 啱嘅嘢。

## 全貌

五個月 iteration 之後，一個成熟嘅 AI operating system 係點嘅，講到最直白：

200 行 config file 話俾 AI 知佢係邊個。21 個 memory file 話俾佢知每個 client 嘅情況。40 個 skills 話俾佢知點做特定 task。163 行 policy server 阻止佢做危險嘅嘢。7 個 cron job 令嘢自動按 schedule 發生。9 個 agent definition 俾佢 delegate 俾 specialist。同一個 continuous learning protocol 令成套嘢每個禮拜都聰明啲。

每一個 component 單獨嚟睇都唔算 impressive。CLAUDE.md 係一個 markdown file。Skill 係一個有 text file 嘅 folder。Hooks server 係一個 weekend project。Cron jobs 係 bash scripts。

令個 system work 嘅唔係任何單一 component。係每一個 component 都同其他所有 component 有連接，而呢啲連接係五個月嘅實際使用 shape 出嚟嘅。Memory system feed 入 skills。Skills 產出嘅嘢 log 返落 memory。Hooks enforce safety 喺所有嘢上面。Cron jobs 喺我唔喺度嘅時候 keep 個 system alive。Agents coordinate across 全部。

大部分人用 Claude Code 當一個高級 terminal。冇問題，佢做嗰樣嘢的確好叻。但如果你一直用落去，一直遇到同樣嘅問題 -- context loss、repeated mistakes、forgotten follow-ups、manual coordination -- 你最終會 build 到一個好似噉嘅嘢。唔係因為你計劃好，係因為每個問題都需要一個解決方案，而啲解決方案累積起嚟就變成一個 system。

我冇打算起一個 AI operating system。我只係想 send 一封 client email 唔好漏 attachment。然後要記住上個禮拜同佢哋承諾咗乜。然後要唔好 send invoice 俾錯人。然後要個 blog 自己 publish。然後要 agents 互相合作。

五個月。十二個版本。一個 terminal window。

如果唔喺個 system 入面，就唔存在。呢個正正就係點解個 system work。

---

*呢篇係 Claude Code 完全攻略系列嘅最後一篇。[第一篇](/blog/claude-code-mastery-part-1-getting-started-tc)、[第二篇](/blog/claude-code-mastery-part-2-skills-memory-tc)、[第三篇](/blog/claude-code-mastery-part-3-hooks-guardrails-tc)、[第四篇](/blog/claude-code-mastery-part-4-agent-teams-tc)有每個 component 嘅詳細講解。如果你都喺度砌自己嘅 system，歡迎嚟 [LinkedIn](https://www.linkedin.com/in/samwonghk/) connect -- 我真係想睇其他人會 build 出啲乜。*
