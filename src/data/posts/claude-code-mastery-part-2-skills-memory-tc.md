
# Claude Code 完全攻略：Skills 同 Memory — 教 AI 識記嘢

你用過幾多個 AI tool？每個都係噉：你花咗半個鐘解釋你做咩、你鍾意點、你啲 client 叫咩名。然後你閂咗個 window。第二日返嚟，佢乜都唔記得。

我叫呢個做「金魚問題」。呢個問題係大部份人用咗一個禮拜就放棄 AI assistant 嘅最大原因。

我成間公司都係用 Claude Code 跑嘅 — invoice、workshop 準備、blog 發布、20 幾個 client 嘅 follow-up。如果 Claude 每次開新 session 都乜都唔記得，我用嚟重新解釋 context 嘅時間多過做嘢嘅時間。噉就唔係 productivity tool，係一個好貴嘅 autocomplete。

所以我起咗一套 memory system。四層架構，40 幾個 skills，開機只需要 5,000 tokens 以下。等我逐樣講。

## 四層 Memory 架構

呢個唔係 theoretical framework — 係我 repo 入面真實存在嘅 files。

### 第一層：Session Working Memory

即係你而家呢個對話。閂咗就冇。每個 AI tool 都有呢層，但係只有呢層。呢個唔叫 memory，呢個叫每晚扔嘅草稿紙。

### 第二層：Worklogs

一個 file：`Memory/memory_worklogs.md`。每個有意義嘅動作都會 log 落去，格式好嚴格：

```
## 2026-03-23 | Domain: Playmates US | Action: Drafted reply | Outcome: Sent for review | Next: Sam to reply all
```

一行就知幾時、邊個 domain、做咗咩、下一步係咩。個 file 每個月 rotate 一次，保持 15KB 以下。太大嘅話 Claude 會花 token 讀兩個月前嘅舊嘢，唔值。

每次開新 session，Claude 自動讀最後 10 條 entry。我乜都唔使講，佢已經知上次做到邊。

### 第三層：Curated Memory

21 個 file，每個 client 一個：`memory_adaptig_garden.md`、`memory_playmates_toys_hk.md`、`memory_hkct.md`。每個 file 頂部有 status header — engagement 去到邊、上一張 invoice、outstanding deliverables、key contacts。

重點嚟喇：當我喺對話入面提到一個 client 名，Claude 會自動 load 嗰個 client 嘅 memory file。我唔使叫佢，佢自己識做。因為 CLAUDE.md 入面已經寫咗呢條 rule。

仲有一個 `memory_people.md` — 跨 client 嘅聯絡人目錄，41 個人。當我話「同 Joanne 跟進下」，Claude 會查到 Joanne Chan 係 HKCT 嘅 contact，然後自動 load HKCT 嘅 memory file。兩步。零 friction。

### 第四層：Knowledge Base

`Knowledge/*.md` — 由 worklogs 提煉出嚟嘅 reusable patterns。出現三次以上嘅 pattern 先會 promote 上嚟。

Claude 會主動提議：

> 「你已經第三次叫我用 Animo Technology Limited 格式出 invoice。要唔要我 capture 做 Knowledge entry？」

要。永遠要。噉個 system 先會自己進化，唔使你手動 maintain。

## Skills：教 AI 識做嘢

Memory 話俾 Claude 知發生咗咩。Skills 話俾佢知點樣做嘢。

我而家有 40 個 skills，全部放喺 `.claude/skills/` 入面。聽落好多？其實唔會 overload，因為用咗 progressive disclosure pattern。

### 三層載入

**Level 1 — Metadata。** 名同一句描述。每個 skill 大概 100 tokens。開機嗰陣只係 load 呢層。40 個 skills = 大概 4,000 tokens。Claude 見到一個 menu，知道自己識做啲咩，但未 load 任何 instructions。

**Level 2 — Instructions。** 完整 workflow。每個 5,000 tokens 以下。只有 match 到嗰個 task 先會 load。如果我唔係 publish blog，`personal-blog` skill 就唔會醒。

**Level 3 — Resources。** Templates、scripts、reference files。基本上無限大。需要嗰陣先 load。

呢個就係點解 40 個 skills 唔會搞到 context bloat。開機成本得 4K tokens，其餘全部 on-demand。

### 實例：`personal-blog` skill

```
.claude/skills/personal-blog/
└── SKILL.md          # Level 2: 完整 publishing workflow
```

SKILL.md 入面（簡化版）：

```markdown
---
name: personal-blog
description: Create and publish blog posts to hyperfocusam.com
---

## Workflow
1. Draft 喺 output/Blog/drafts/{slug}.md
2. Copy 去 personal-site/src/data/posts/
3. Update index.js（新 entry 加喺最頂）
4. git add → commit → pull --rebase → push → npm run deploy
5. Cross-post 去 Substack（full content，唔係 teaser）
```

五步。每步有具體 path 同 command。冇任何含糊。我話「寫篇 blog 講 Garden workshop」，Claude 知道喺邊度 draft、喺邊度 copy、點 update index、點 deploy。我唔使每次解釋。我解釋咗一次，寫咗入 skill file。

### 其他 Skills

40 個 skills 聽落多，揀幾個講下 range：

- **`magic-moment`** — 幫 corporate clients 起 interactive HTML demo
- **`deck-design`** — 用 AI image generation 配合 brand reference 出 presentation slides
- **`workshop-translation`** — 跨語言 localize workshop materials
- **`video-recolor`** — AI recolor 現有 video 入面嘅產品顏色
- **`memory-management`** — meta-skill，maintain 個 memory system 本身

每個都係同一個 pattern：metadata 開機 load，instructions on-demand，resources 需要先 load。

## Pattern Detection：個 System 自己會進步

Memory 架構唔係 static 嘅。CLAUDE.md 入面寫咗三個 detection trigger：

1. **3 次以上類似動作** — 提議變 Knowledge entry
2. **2 次以上類似錯誤** — 加入 lessons.md 做 guardrail
3. **5 次以上成功執行** — auto-promote 做正式 SOP

呢個先係大部份人唔理解嘅嘢。AI memory 唔淨係記住發生咗咩，係要識得喺發生咗嘅嘢入面搵 pattern，然後變成 reusable knowledge。

實際效果：我三月嘅 system 明顯聰明過一月嘅 system。唔係因為 model 升級 — 係因為 memory layer 累積咗更好嘅 patterns。

## 實際操作係點

禮拜一朝早。開 Claude Code。未打字之前，佢已經 load 咗：

- 最近 10 條 worklog entry
- 今日嘅 deadlines
- 上次做到邊嘅一句 summary

我打：「同 Joanne 跟進下 HKCT 3月27號嗰個 training。」

Claude 唔會問 Joanne 係邊個。唔會問 HKCT 係咩。唔會問邊個 training。佢已經 load 咗 `memory_people.md`，搵到 Joanne Chan 係 HKCT contact，load 咗 `memory_hkct.md`，知道呢個係 AI Learning Community engagement，HKD 240K / 24 個月，第一次 training 喺 3 月 27 號。

佢 draft email。用 `email-drafting` skill 控制 tone。經 Google Workspace 用 `sam@adaptig.com` 發出。Log 落 worklogs。Update HKCT memory file。

我打咗一句。System 做咗六個 coordinated actions。

呢個先係 memory 同 skills 嘅價值。唔係一個記得你個名嘅 chatbot。係一個好似同你做咗幾個月嘅同事噉運作嘅 system。

## 下一篇：Part 3 — Hooks

Part 3 會講 Claude Code 嘅 hooks system — event-driven 嘅 automation layer。Session lifecycle hooks 點樣自動 load context。Pre-tool-use hooks 點樣 enforce safety policies。點樣起一個 audit trail 去 catch 每一個 external action。

Memory 話俾 Claude 知佢知啲咩。Skills 話俾佢知點做。Hooks 話俾佢知幾時做 — 同幾時要停。

如果唔喺 memory.md 入面，佢就乜都冇記住。

---

*[喺 LinkedIn 搵我](https://www.linkedin.com/in/hyperfocusam/)，傾下點樣起真正 work 到嘅 AI system。*
