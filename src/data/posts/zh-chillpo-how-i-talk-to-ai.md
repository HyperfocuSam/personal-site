# 我點同 AI 傾偈：一個鐘由零到自動 YouTube 頻道

2026 年 3 月 9 號，我同我嘅 AI 助理 Ada 開咗一個 Claude Code session。2,100 行終端紀錄，一個鐘頭。由一個壞咗嘅 deploy 開始，到最後建成一條全自動嘅 lo-fi 音樂 YouTube 頻道——每日自動生成音樂、自動上傳、自動發佈。

呢篇文章唔係講技術——而係講點樣同 AI 溝通。

我做 AI 培訓嘅時候，最常被問嘅問題唔係「用咩工具」，而係「點樣同 AI 講嘢」。所以我將呢個 session 完整紀錄落嚟，拆解入面嘅溝通模式。以下所有終端輸出都係原文，一字不改。

## 1. Debug 嘅藝術：乜都唔講就係最好嘅溝通

Deploy 咗之後冇任何輸出。我乜都冇做——冇問「點解唔 work」，冇提議「試下呢個」。Ada 自己開始 debug。

佢試咗三個 model name，每次改 code、commit、deploy、等結果：

```
⏺ Update(scripts/generate.py)
    96 -        "model": "music-01",
    96 +        "model": "music-02",

⏺ Bash(git add -A && git commit -m "fix: use music-02 model
      (matches param format)" && railway up --detach 2>&1)
```

仲係唔啱。再試：

```
⏺ Update(scripts/generate.py)
    96 -        "model": "music-02",
    96 +        "model": "music-2.0",

⏺ Bash(git add -A && git commit -m "fix: use music-2.0 model
      (per API docs)" && railway up --detach 2>&1)
```

Model name 啱咗，但 API 話 lyrics 參數唔夠長（最少 10 個字）。Ada 自己搵到 workaround——用結構標記當作歌詞，令 API 生成純音樂：

```
    instrumental_lyrics = (
        "[Intro]\n"
        "[Verse]\n"
        "[Chorus]\n"
        "[Verse]\n"
        "[Bridge]\n"
        "[Chorus]\n"
        "[Outro]"
    )
```

成功。第一首歌生成咗：

```
⏺ It worked! The full pipeline completed successfully:

  - Track generated: "Sunday Afternoon" — 4.2 MB MP3
  - Background image created
  - Video created: 3.6 MB MP4
  - Metadata saved: YouTube-ready title, description, tags
```

Ada 仲即刻下載首歌畀我聽：

```
⏺ Bash(curl -s -o /Users/sam/Ada/output/chillpo-sunday-afternoon.mp4
      https://awake-heart-production.up.railway.app/output/
      20260309-185041-sunday-afternoon.mp4)

⏺ Bash(open /Users/sam/Ada/output/chillpo-sunday-afternoon.mp4)
```

> **溝通技巧 #1：唔好介入 debug 過程。** 呢五個 deploy cycle 入面，我一個字都冇打。我冇問「係咪 model name 錯咗」，冇話「不如試下另一個 API」。Ada 有系統咁逐個排除——model name、參數格式、lyrics 長度——每次 commit message 都記錄咗改咗乜。最好嘅溝通，有時就係乜都唔講。

## 2. 兩個字嘅決策：點樣用最少嘅字做最大嘅決定

Ada 話每首歌需要 artwork。佢提出三個方案：

- **Option A**：靜態插畫（用 Nano Banana Pro 生成）
- **Option B**：動態循環（插畫加動畫效果）
- **Option C**：AI 影片場景（用 Kling AI 生成）

佢建議由 A 開始。我嘅回應：

```
❯ A , yes
```

兩個字。揀咗方案、確認執行。

之後 Ada 講解點樣設置 YouTube API 上傳。佢列出三個階段，每個都標明邊個做、要幾耐：

```
⏺ Here's the full walkthrough, broken into 3 phases.

  Phase 1: Create the YouTube Channel (you, 5 min)
  Phase 2: YouTube API Credentials (you + me, 10 min)
  Phase 3: Auto-Upload Pipeline (me, ~2 min)
```

「you, 5 min」、「you + me, 10 min」、「me, ~2 min」。一睇就知道邊啲要我做，邊啲佢搞掂。我嘅回應：

```
❯ yes , walk me through how to do that
```

最後，佢問我要唔要設置每日自動上傳。我嘅回應：

```
❯ yes please
```

三個決策時刻，冇一次超過五個字。

> **溝通技巧 #2：結構化選擇 + 即時決策。** 好嘅 AI agent 會將開放式問題變成選擇題。好嘅使用者唔會猶豫——揀咗就行。呢個唔係懶，係效率。每次「你覺得呢」嘅來回，都係蝕緊時間。

## 3. 人機分工：知道邊啲係你做、邊啲畀 AI 做

整個 session 入面，Ada 清楚標明咗人機分工。每個步驟都寫明「你做」定「我做」，令我唔使猜。

但最有趣嘅溝通發生喺 Google OAuth 授權嗰度。我做 test user 設定嘅時候，Google 彈咗個 403 錯誤——用繁體中文顯示。我直接 copy paste 咗成個錯誤訊息：

```
❯ 「ChillPo」尚未完成 Google 驗證程序。這個應用程式目前處於測試階段，
只有獲得開發人員核准的測試人員可以存取。如果您認為自己應該擁有存取權，
請與開發人員聯絡。
發生錯誤 403： access_denied
```

Ada 即刻睇明：

```
⏺ That's the "test users" restriction. You need to add yourself
  as a test user in Google Cloud Console:

  1. Go to console.cloud.google.com > select chillpo-youtube project
  2. Left menu: APIs & Services > OAuth consent screen
  3. Click Audience (or "Test users" section)
  4. Click + Add Users
  5. Add the Gmail address you're signing in with
  6. Save
```

我冇翻譯、冇解釋、冇話「Google 個 OAuth 好似唔畀我 access」。直接貼。佢直接答。

> **溝通技巧 #3：貼 error、唔好描述 error。** 當你遇到錯誤，直接 copy paste 完整嘅錯誤訊息。唔好用自己嘅話去描述——你嘅描述會丟失關鍵資訊（錯誤碼、具體參數、堆疊追蹤）。原文永遠比摘要準確。

## 4. 最後兩個問題：好嘅 Agent 問得少、做得多

成個 session 嚟到最後，Ada 要起一個 chillpo.com landing page。佢可以問十個問題：風格？配色？排版？動畫？手機版？SEO？

佢只問咗兩個：

```
⏺ Two questions:
  1. Is chillpo.com already pointed to Railway, or does it need
     DNS setup?
  2. Simple landing page or full listening experience?
```

一個係技術事實（DNS 有冇設定），一個係方向性決策（簡單定完整）。我嘅回應，連 typo 都冇改：

```
❯ 1 - no / 2 - kanding page first
```

七個字（其中一個打錯），兩個決定。Ada 冇問「你係咪 meant landing」，直接開工。

然後係成個 session 最後一句：

```
❯ voice activated. thanks zoe. goodnight

⏺ Bash(python3 speak.py "Goodnight Sam! It's Ada by the way,
      not Zoe. But I'll take it as a compliment...")

⏺ Goodnight Sam. It's Ada, not Zoe — but I'll take it.
```

我叫錯名。佢糾正但唔介意。呢個就係好嘅 agent UX——唔會因為一個無關嘅錯誤而中斷工作流程。

> **溝通技巧 #4：只問必要嘅問題。** Ada 可以問十個問題，問咗兩個。每多一個問題，就多一次來回，就多幾分鐘等待。好嘅 agent 識得用自己嘅判斷力填補空白，只喺真正需要人類輸入嘅地方先停落嚟。

## 5. 一個鐘嘅成果

回顧呢個 session，我哋由零開始，建成咗：

- MiniMax music-2.0 API 整合，10 種 lo-fi 風格
- 每首歌自動生成插畫 artwork（Nano Banana Pro）
- FFmpeg 影片合成 pipeline（音樂 + artwork → YouTube 影片）
- YouTube Data API 自動上傳（OAuth2 + resumable upload）
- Railway 部署 + node-cron 每日自動執行
- chillpo.com landing page（深色 lo-fi 主題）

兩條片已經喺 YouTube 上面。第二朝醒嚟，又會多兩條。

呢啲全部喺一個終端 session 入面完成。冇 Jira ticket，冇 sprint planning，冇 standup。一個人，一個 AI agent，一個鐘。

將「lo-fi YouTube 頻道」換成任何自動化 pipeline——報告生成、數據處理、內容發佈——溝通模式都係一樣嘅。

## 溝通速查表

| 技巧 | 做法 | 例子 |
|------|------|------|
| 唔好介入 debug | AI 系統性排查緊嘅時候，乜都唔講 | 5 個 deploy cycle，0 個字 |
| 即時決策 | 揀 A/B/C，唔好反問 | 「A, yes」 |
| 貼 error 原文 | Copy paste，唔好翻譯或描述 | 直接貼中文 403 錯誤 |
| 只答必要問題 | 唔好主動加料 | 7 個字答 2 個問題 |

---

*最重要嘅技能唔係寫 code。係知道幾時講「yes please」，幾時貼個 error message，幾時乜都唔講。*

*想了解更多 AI 協作技巧，可以喺 [LinkedIn](https://www.linkedin.com/in/sam-ai-agent/) 搵我。我提供[企業 AI 培訓同工作坊](/zh/services)，教團隊點樣真正用 AI 做嘢。*
