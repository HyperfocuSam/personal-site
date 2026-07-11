# 我點同 AI 傾偈：一個鐘由零到自動 YouTube 頻道

2026 年 3 月 9 日，我與我的 AI 助理 Ada 開了一個 Claude Code session。2,100 行終端紀錄，一個小時。由一個壞掉的 deploy 開始，到最後建成一條全自動的 lo-fi 音樂 YouTube 頻道——每日自動生成音樂、自動上傳、自動發佈。

這篇文章並非談論技術——而是講述如何與 AI 溝通。

我在進行 AI 培訓時，最常被問的問題不是「用什麼工具」，而是「如何與 AI 說話」。所以我將這個 session 完整記錄下來，拆解當中的溝通模式。以下所有終端輸出都是原文，一字不改。

## 1. Debug 的藝術：什麼都不說就是最好的溝通

Deploy 之後沒有任何輸出。我什麼都沒有做——沒有問「為何不 work」，沒有提議「試試這個」。Ada 自己開始 debug。

她嘗試了三個 model name，每次改 code、commit、deploy、等待結果：

```
⏺ Update(scripts/generate.py)
    96 -        "model": "music-01",
    96 +        "model": "music-02",

⏺ Bash(git add -A && git commit -m "fix: use music-02 model
      (matches param format)" && railway up --detach 2>&1)
```

還是不對。再試：

```
⏺ Update(scripts/generate.py)
    96 -        "model": "music-02",
    96 +        "model": "music-2.0",

⏺ Bash(git add -A && git commit -m "fix: use music-2.0 model
      (per API docs)" && railway up --detach 2>&1)
```

Model name 正確了，但 API 表示 lyrics 參數不夠長（最少 10 個字）。Ada 自己找到 workaround——用結構標記當作歌詞，讓 API 生成純音樂：

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

成功。第一首歌生成了：

```
⏺ It worked! The full pipeline completed successfully:

  - Track generated: "Sunday Afternoon" — 4.2 MB MP3
  - Background image created
  - Video created: 3.6 MB MP4
  - Metadata saved: YouTube-ready title, description, tags
```

Ada 還立刻下載那首歌給我聽：

```
⏺ Bash(curl -s -o /Users/sam/Ada/output/chillpo-sunday-afternoon.mp4
      https://awake-heart-production.up.railway.app/output/
      20260309-185041-sunday-afternoon.mp4)

⏺ Bash(open /Users/sam/Ada/output/chillpo-sunday-afternoon.mp4)
```

> **溝通技巧 #1：不要介入 debug 過程。** 這五個 deploy cycle 裡面，我一個字都沒有打。我沒有問「是不是 model name 錯了」，沒有說「不如試試另一個 API」。Ada 有系統地逐一排除——model name、參數格式、lyrics 長度——每次 commit message 都記錄了改了什麼。最好的溝通，有時就是什麼都不說。

## 2. 兩個字的決策：怎樣用最少的字做最大的決定

Ada 說每首歌需要 artwork。她提出三個方案：

- **Option A**：靜態插畫（用 Nano Banana Pro 生成）
- **Option B**：動態循環（插畫加動畫效果）
- **Option C**：AI 影片場景（用 Kling AI 生成）

她建議從 A 開始。我的回應：

```
❯ A , yes
```

兩個字。選擇了方案、確認執行。

之後 Ada 講解如何設置 YouTube API 上傳。她列出三個階段，每個都標明誰做、要多久：

```
⏺ Here's the full walkthrough, broken into 3 phases.

  Phase 1: Create the YouTube Channel (you, 5 min)
  Phase 2: YouTube API Credentials (you + me, 10 min)
  Phase 3: Auto-Upload Pipeline (me, ~2 min)
```

「you, 5 min」、「you + me, 10 min」、「me, ~2 min」。一看就知道哪些要我做，哪些她處理完。我的回應：

```
❯ yes , walk me through how to do that
```

最後，她問我要不要設置每日自動上傳。我的回應：

```
❯ yes please
```

三個決策時刻，沒有一個超過五個字。

> **溝通技巧 #2：結構化選擇 + 即時決策。** [好的 AI agent](/blog/zh-agentic-ai-five-lessons) 會將開放式問題變成選擇題。好的使用者不會猶豫——選了就做。這不是懶惰，是效率。每次「你覺得呢」的來回，都是在浪費時間。

## 3. 人機分工：知道哪些是你做、哪些給 AI 做

整個 session 中，Ada 清楚標明了人機分工。每個步驟都寫明「你做」還是「我做」，讓我不必猜測。

但最有趣的溝通發生在 Google OAuth 授權那裡。在設定 test user 的時候，Google 彈出了一個 403 錯誤——用繁體中文顯示。我直接複製貼上了整個錯誤訊息：

```
❯ 「ChillPo」尚未完成 Google 驗證程序。這個應用程式目前處於測試階段，
只有獲得開發人員核准的測試人員可以存取。如果您認為自己應該擁有存取權，
請與開發人員聯絡。
發生錯誤 403： access_denied
```

Ada 立刻看懂：

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

我沒有翻譯、沒有解釋、沒有說「Google 的 OAuth 好像不讓我 access」。直接貼。她直接答。

> **溝通技巧 #3：貼上錯誤訊息、不要描述錯誤。** 當你遇到錯誤，直接複製貼上完整的錯誤訊息。不要用自己的話去描述——你的描述會丢失關鍵資訊（錯誤碼、具體參數、堆疊追蹤）。原文永遠比摘要準確。

## 4. 最後兩個問題：好的 Agent 問得少、做得多

整個 session 來到最後，Ada 要建立一個 chillpo.com landing page。她可以問十個問題：風格？配色？排版？動畫？手機版？SEO？

她只問了兩個：

```
⏺ Two questions:
  1. Is chillpo.com already pointed to Railway, or does it need
     DNS setup?
  2. Simple landing page or full listening experience?
```

一個是技術事實（DNS 有沒有設定），一個是方向性決策（簡單還是完整）。我的回應，連打錯字都沒有改：

```
❯ 1 - no / 2 - kanding page first
```

七個字（其中一個打錯），兩個決定。Ada 沒有問「你是不是 meant landing」，直接開工。

然後是整個 session 最後一句：

```
❯ voice activated. thanks zoe. goodnight

⏺ Bash(python3 speak.py "Goodnight Sam! It's Ada by the way,
      not Zoe. But I'll take it as a compliment...")

⏺ Goodnight Sam. It's Ada, not Zoe — but I'll take it.
```

我叫錯名字。她糾正但不介意。這就是好的 agent UX——不會因為一個無關的錯誤而中斷工作流程。

> **溝通技巧 #4：只問必要的問題。** Ada 可以問十個問題，問了兩個。每多一個問題，就多一次來回，就多幾分鐘等待。好的 agent 懂得用自己的判斷力填補空白，只在真正需要人類輸入的地方才停下來。

## 5. 一個小時的成果

回顧這個 session，我們由零開始，建成了：

- MiniMax music-2.0 API 整合，10 種 lo-fi 風格
- 每首歌自動生成插畫 artwork（Nano Banana Pro）
- FFmpeg 影片合成 pipeline（音樂 + artwork → YouTube 影片）
- YouTube Data API 自動上傳（OAuth2 + resumable upload）
- Railway 部署 + node-cron 每日自動執行
- chillpo.com landing page（深色 lo-fi 主題）

兩條影片已經在 YouTube 上面。第二天醒來，又會多兩條。

這些全部在一個終端 session 中完成。沒有 Jira ticket，沒有 sprint planning，沒有 standup。一個人，一個 AI agent，一個小時。

將「lo-fi YouTube 頻道」換成[任何自動化 pipeline](/blog/ada-gersang-gamifying-claude-code)——報告生成、數據處理、內容發佈——溝通模式都是一樣的。

## 溝通速查表

| 技巧 | 做法 | 例子 |
|------|------|------|
| 不要介入 debug | AI 系統性排查的時候，什麼都不說 | 5 個 deploy cycle，0 個字 |
| 即時決策 | 選 A/B/C，不要反問 | 「A, yes」 |
| 貼上錯誤訊息原文 | 複製貼上，不要翻譯或描述 | 直接貼中文 403 錯誤 |
| 只答必要問題 | 不要主動加料 | 7 個字答 2 個問題 |

---

*最重要的技能不是寫 code。是知道何時說「yes please」，何時貼上錯誤訊息，何時什麼都不說。*

*想了解更多 AI 協作技巧，可以在 [LinkedIn](https://www.linkedin.com/in/sam-ai-agent/) 找我。我提供[企業 AI 培訓和工作坊](/zh/services)，教團隊怎樣真正用 AI 做事。*
