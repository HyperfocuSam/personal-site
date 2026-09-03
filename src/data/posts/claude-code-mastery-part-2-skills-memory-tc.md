# Claude Code 完全攻略：Skills 與 Memory — 讓 AI 學會記憶

你用過的每一個 AI 工具都有同一個問題。花 45 分鐘教會它你的 workflow、偏好、限制，關掉視窗，第二天打開——全部忘光。我稱之為「金魚問題」。這也是最多人用 AI 助手一星期就放棄的原因。

我的整盤生意跑在 Claude Code 上——客戶 invoice、工作坊準備、blog 發佈、20+ 個進行中客戶項目的會議跟進。如果 Claude 每個 session 之間都忘記一切，我重新解釋 context 的時間會多過真正工作的時間。那不是生產力工具，是一個很貴的 autocomplete。

所以我建了一套記憶系統：4 層、40+ 個 skill，整套系統開機載入不超過 5,000 token。以下逐層拆。

## 第 1 篇回顧——CLAUDE.md 只是起點

我在[第 1 篇](/blog/claude-code-mastery-part-1-getting-started-tc)講過，CLAUDE.md 是 AI 的操作手冊——跨 session 存活的設定檔。未讀的先讀。

但 CLAUDE.md 是第 0 層：它告訴 Claude 它是誰、守甚麼規矩。它不會告訴 Claude 昨天發生了甚麼、哪個客戶的 invoice 過期未付、怎樣把 blog post 發上你那個特定的網站。那些要靠 memory 和 skills。

## 四層記憶架構

這不是理論框架。是我 repo 裡現在就放著的檔案。

### 第 1 層：Session 工作記憶

當前對話。短暫，session 完結就消失。所有 AI 工具預設都有、而且只有這個。有用，但不是記憶——是一本每晚扔掉的記事簿。

### 第 2 層：Worklog

檔案 `Memory/memory_worklogs.md`。每個有意義的動作，在我看到回應之前先記錄。Schema 很嚴格：

```
## 2026-03-23 | Domain: an international toy company US | Action: Drafted reply | Outcome: Sent for review | Next: Sam to reply all
```

一行記下：何時、哪個 domain、發生了甚麼、下一步。檔案每月輪換，保持 15KB 以下；舊紀錄歸檔，不刪除。這個限制本身重要——檔案無限增長的話，Claude 會花 token 讀兩個月前不相干的歷史。

這是時間軸骨幹：開新 session 時，Claude 自動讀最後 10 條紀錄。一個字都不用說，連續性就在。

### 第 3 層：策展記憶

21 個 `Memory/memory_*.md` 檔案，一客戶一檔、一領域一檔，每個以客戶命名。每個頂部有 status header：目前階段、上一張 invoice、未交付項、關鍵聯絡人。

關鍵行為：對話中提到客戶名，Claude 自動先載入那個客戶的檔案再回應——不用吩咐，因為 CLAUDE.md 寫了。這是 Agno 的 pattern：retrieval on mention。我說一聲「a client」，Claude 已知道現在是 Batch 2、Top Management 工作坊已確認、最新一張 invoice 已發出。

另有 `memory_people.md`——跨客戶聯絡人目錄。我用名字提及某位聯絡人，Claude 查到他屬於哪個客戶，載入該客戶的檔案。兩跳，零阻力。

### 第 4 層：Knowledge base

`Knowledge/*.md`：在 worklog 出現 3 次或以上的模式，升級成可重用知識——教訓、SOP、品牌語氣規則、驗證過的 workflow。升級門檻有講究：同一個錯誤糾正 2 次，寫入 `Knowledge/lessons.md` 做護欄；同一個 workflow 成功 5 次，升做正式 SOP。

這不是願景——Claude 會主動提出升級：

> "This is the third time you've asked me to format invoices with the Animo Technology Limited header. Should I capture this as a Knowledge entry?"

答案永遠是 yes。系統就是這樣在我不用維護的情況下變聰明。

## Skills——可以規模化的程序記憶

Memory 告訴 Claude 發生過甚麼、它知道甚麼；skills 告訴 Claude 怎樣做事。

以資料夾為單位，放在 `.claude/skills/`，我現在有 40 個。40 個而不塞爆 context，靠 progressive disclosure：

每個 skill 三層——Level 1 metadata：名字加一行描述，每個約 100 token，開機只載入這層，40 個 skill 約 4,000 token，Claude 看到一張「我會做甚麼」的菜單而不用載入任何指令；Level 2 instructions：完整 workflow，每個 5,000 token 以下，任務匹配才載入——不是在發佈 blog，`personal-blog` skill 就一直沉睡；Level 3 resources：範本、script、參考檔，大小基本無上限，在 skill 的 workflow 內按需載入。

開機成本 4K token 換全張菜單，其餘全部按需。

### 一個真實的 skill：`personal-blog`

```
.claude/skills/personal-blog/
└── SKILL.md          # Level 2: full publishing workflow
```

```markdown
---
name: personal-blog
description: Create and publish blog posts to hyperfocusam.com
---

## Workflow
1. Draft in `output/Blog/drafts/{slug}.md`
2. Copy to `/Users/sam/personal-site/src/data/posts/`
3. Update index.js (add entry at TOP of array)
4. git add, commit, pull --rebase, push, npm run deploy
5. Cross-post to Substack (full content, not teaser)
```

5 步，具體路徑，具體指令，零含糊。我說「寫一篇 a client 工作坊的 blog post」，Claude 知道在哪起草、複製去哪、怎樣更新 index、怎樣部署。我不用每個 session 解釋——解釋過一次，在 skill 檔案裡。

### 其他值得一提的 skill

`magic-moment`——為企業客戶建互動 HTML demo，我被讚最多的一個。`deck-design`——用 AI 圖像生成加品牌參考圖做簡報 slide。`workshop-translation`——工作坊教材多語言本地化。`task-notification`——完成通知，行 WhatsApp，後備是 macOS 原生通知。`memory-management`——維護記憶系統本身的 meta-skill。`video-recolor`——AI 對現有影片做產品重新上色。全部同一個 pattern：開機載 metadata，需要才載指令，最後才載資源。

## Pattern detection——會自我改進的系統

記憶架構不是靜態的。CLAUDE.md 內建 3 個觸發器：近期 worklog 出現 3 次或以上相似動作——提議寫入 Knowledge；2 次或以上相似錯誤——加入 lessons.md 做護欄；同一 workflow 成功執行 5 次或以上——自動升級為正式 SOP。

多數人想 AI 記憶想漏了這部分：重點不只是記住發生過甚麼，是辨認發生過的事情裡的模式，再把模式結晶成可重用的知識。

實際效果：我 2026 年 3 月的系統，比 2026 年 1 月的系統聰明得多——不是模型升級了，是 memory 層累積了更好的模式。

## 實際運作的一天

星期一早上，打開 Claude Code。未打任何字，它已載入：最後 10 條 worklog（在跟誰工作、有甚麼未完）、todo 檔今天到期的事、一行「上次做到哪」的確認。

我打：「Follow up with the contact about the training session.」

Claude 不會問那位聯絡人是誰、屬於哪個客戶。它已查 `memory_people.md` 找到那位聯絡人所屬的客戶，載入該客戶的記憶檔，知道項目歷史和下一步。它用 `email-drafting` skill 起草、經 Google Workspace 整合以 sam@adaptig.com 發出、記錄 worklog、更新該客戶記憶檔的跟進時間。

我一句話，系統 6 個協調動作。

這就是 memory 加 skills 買到的東西：不是一個記得你名字的 chatbot，是一個像共事了幾個月的同事一樣運作的系統。

## 下一篇——Part 3：Hooks

[第 3 篇](/blog/claude-code-mastery-part-3-hooks-guardrails-tc)會講 Claude Code 的 hooks 系統——令這一切不需人手介入的 event-driven 自動化層：session 生命周期 hook 自動載入 context、pre-tool-use hook 執行安全政策、每個對外動作發生之前都被捕捉的 audit trail。

Memory 告訴 Claude 它知道甚麼。Skills 告訴它怎樣做。Hooks 告訴它幾時做——以及幾時停。（系列完整藍圖在[第 5 篇](/blog/claude-code-mastery-part-5-full-blueprint-tc)。）

如果不在 memory.md 裡，它甚麼都沒記住。

---
