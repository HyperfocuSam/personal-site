# Claude Code 完全攻略：Skills 與 Memory — 讓 AI 學會記憶

你用過多少個 AI 工具？每一個都是如此：花半小時解釋自己在做什麼、偏好什麼、客戶叫什麼名字。然後關閉視窗。隔天回來，它什麼都不記得。

我稱之為「金魚問題」。這個問題是大多數人使用一週後便放棄 AI assistant 的最大原因。

我整間公司都靠 [Claude Code](/blog/claude-code-mastery-part-1-getting-started-tc) 運作 — invoice、workshop 準備、blog 發布、二十多個 client 的 follow-up。若 Claude 每次開新 session 都什麼都不記得，我花在重新解釋 context 的時間比實際做事的時間更多。那就不是 productivity tool，而是一個昂貴的 autocomplete。

因此我建立了一套 [memory system](/blog/claude-code-mastery-part-5-full-blueprint-tc)。四層架構，四十多個 skills，啟動僅需不到 5,000 tokens。以下逐一說明。

## 四層 Memory 架構

這不是 theoretical framework — 是我 repo 裡實際存在的 files。

### 第一層：Session Working Memory

即當前對話。關閉即消失。每個 AI 工具都有這一層，但僅有這一層。這不算 memory，這只是每晚丟棄的草稿紙。

### 第二層：Worklogs

一個 file：`Memory/memory_worklogs.md`。每個有意義的動作都會記錄下來，格式極為嚴格：

```
## 2026-03-23 | Domain: Playmates US | Action: Drafted reply | Outcome: Sent for review | Next: Sam to reply all
```

一行便能看出時間、所屬 domain、做了什麼、下一步是什麼。這個 file 每月 rotate 一次，保持在 15KB 以下。過大的話 Claude 會耗費 token 閱讀兩個月前的舊紀錄，不值得。

每次開新 session，Claude 自動讀取最後 10 條 entry。我無需說明任何事，它已知道上次做到哪裡。

### 第三層：Curated Memory

21 個 file，每個 client 一個：`memory_adaptig_garden.md`、`memory_playmates_toys_hk.md`、`memory_hkct.md`。每個 file 頂部都有 status header — engagement 進展到哪裡、上一張 invoice、outstanding deliverables、key contacts。

重點在此：當我在對話中提及某個 client 名稱，Claude 會自動 load 該 client 的 memory file。無需指示，它自行執行。因為 CLAUDE.md 裡已寫明這條 rule。

此外還有一個 `memory_people.md` — 跨 client 的聯絡人目錄，共 41 人。當我說「跟 Joanne 跟進一下」，Claude 會查到 Joanne Chan 是 HKCT 的 contact，然後自動 load HKCT 的 memory file。兩步。零 friction。

### 第四層：Knowledge Base

`Knowledge/*.md` — 由 worklogs 提煉而來的 reusable patterns。出現三次以上的 pattern 才會 promote 上來。

Claude 會主動建議：

> 「你已經第三次要求我用 Animo Technology Limited 格式開 invoice。是否需要我 capture 成 Knowledge entry？」

需要。永遠需要。這樣系統才會自行進化，無需手動 maintain。

## Skills：教 AI 做事

Memory 告訴 Claude 發生了什麼。Skills 告訴它如何做事。

我目前有 40 個 skills，全部放在 `.claude/skills/` 裡。聽起來很多？實際上不會 overload，因為採用了 progressive disclosure pattern。

### 三層載入

**Level 1 — Metadata。** 名稱與一句描述。每個 skill 約 100 tokens。啟動時只載入這一層。40 個 skills = 約 4,000 tokens。Claude 看到一個 menu，知道自己能做什麼，但尚未 load 任何 instructions。

**Level 2 — Instructions。** 完整 workflow。每個不超過 5,000 tokens。只有匹配到相應 task 時才會 load。若我不是在 publish blog，`personal-blog` skill 就不會啟動。

**Level 3 — Resources。** Templates、scripts、reference files。基本上無限大。需要時才 load。

這就是為什麼 40 個 skills 不會造成 context bloat。啟動成本僅 4K tokens，其餘全部 on-demand。

### 實例：`personal-blog` skill

```
.claude/skills/personal-blog/
└── SKILL.md          # Level 2: 完整 publishing workflow
```

SKILL.md 內容（簡化版）：

```markdown
---
name: personal-blog
description: Create and publish blog posts to hyperfocusam.com
---

## Workflow
1. Draft 在 output/Blog/drafts/{slug}.md
2. Copy 至 personal-site/src/data/posts/
3. Update index.js（新 entry 加在最頂）
4. git add → commit → pull --rebase → push → npm run deploy
5. Cross-post 至 Substack（full content，非 teaser）
```

五步。每步有具體 path 與 command。沒有任何含糊。我說「寫篇 blog 講 Garden workshop」，Claude 知道在哪裡 draft、在哪裡 copy、如何 update index、如何 deploy。無需每次解釋。我解釋了一次，寫進了 skill file。

### 其他 Skills

40 個 skills 聽起來多，選幾個說明涵蓋範圍：

- **`magic-moment`** — 為 corporate clients 建立 interactive HTML demo
- **`deck-design`** — 用 AI image generation 配合 brand reference 產出 presentation slides
- **`workshop-translation`** — 跨語言 localize workshop materials
- **`video-recolor`** — AI recolor 現有 video 中的產品顏色
- **`memory-management`** — meta-skill，維護 memory system 本身

每個都遵循同一 pattern：metadata 啟動時載入，instructions on-demand，resources 需要時才載入。

## Pattern Detection：系統自行進步

Memory 架構並非 static。CLAUDE.md 裡寫了三個 detection trigger：

1. **3 次以上類似動作** — 建議轉為 Knowledge entry
2. **2 次以上類似錯誤** — 加入 lessons.md 作為 guardrail
3. **5 次以上成功執行** — auto-promote 為正式 SOP

這才是大多數人未能理解的地方。AI memory 不僅是記住發生過什麼，而是要能從已發生的事件中辨識 pattern，然後轉化為 reusable knowledge。

實際效果：我三月的 system 明顯比一月的 system 更聰明。不是因為 model 升級 — 而是因為 memory layer 累積了更好的 patterns。

## 實際操作流程

週一早上。開啟 Claude Code。尚未打字，它已載入了：

- 最近 10 條 worklog entry
- 當天的 deadlines
- 上次做到哪裡的一句 summary

我輸入：「跟 Joanne 跟進一下 HKCT 3月27號那場 training。」

Claude 不會問 Joanne 是誰。不會問 HKCT 是什麼。不會問哪場 training。它已載入 `memory_people.md`，找到 Joanne Chan 是 HKCT contact，載入了 `memory_hkct.md`，知道這是 AI Learning Community engagement，HKD 240K / 24 個月，第一次 training 在 3 月 27 日。

它 draft email。用 `email-drafting` skill 控制 tone。經 Google Workspace 以 `sam@adaptig.com` 發出。Log 至 worklogs。Update HKCT memory file。

我輸入了一句。System 執行了六個 coordinated actions。

這才是 memory 與 skills 的價值。不是一個記得你名字的 chatbot。而是一個如同與你共事數月的同事般運作的 system。

## 下一篇：Part 3 — Hooks

[Part 3](/blog/claude-code-mastery-part-3-hooks-guardrails-tc) 將討論 Claude Code 的 hooks system — event-driven 的 automation layer。Session lifecycle hooks 如何自動載入 context。Pre-tool-use hooks 如何 enforce safety policies。如何建立一個 audit trail 來 catch 每一個 external action。

Memory 告訴 Claude 它知道什麼。Skills 告訴它怎麼做。Hooks 告訴它何時做 — 以及何時該停。

若不在 memory.md 裡，它就什麼都沒記住。

---

*[在 LinkedIn 找我](https://www.linkedin.com/in/sam-ai-agent/)，聊聊如何建立真正能運作的 AI system。*
