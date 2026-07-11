# 一個小時，由零到全自動 YouTube 頻道：我是怎樣與 AI 溝通的

2026 年 3 月 9 日，我開了一個 Claude Code session，對象是我那位 AI 助理 Ada。終端紀錄長達 2,100 行，前後只用了一個小時。起點是一個部署失敗的專案，終點是一條全自動運作的 lo-fi 音樂 YouTube 頻道——每日生成音樂、自動上傳、自動發佈，完全不用我插手。

這篇文章不談技術。我想說的是，這一個小時裡面真正的關鍵：如何與 AI 說話。做 AI 培訓時，我最常被問的不是「你用哪個工具」，而是「你到底是怎樣跟它溝通的」。所以，我把這段 session 攤開來，逐點拆解當中的溝通模式。以下所有終端輸出，一字不改，原樣呈現。

## 一、不說話的藝術：debug 時最有力的溝通就是沉默

第一次部署之後，沒有任何輸出。我什麼都沒有做——沒有問「為什麼不 work」，沒有提議「不如試試這個」。Ada 自己開始排查。

她先後試了三個 model name。每次改完 code 就 commit、deploy、等結果：

```
⏺ Update(scripts/generate.py)
    96 -        "model": "music-01",
    96 +        "model": "music-02",

⏺ Bash(git add -A && git commit -m "fix: use music-02 model
      (matches param format)" && railway up --detach 2>&1)
```

還是不行。再改：

```
⏺ Update(scripts/generate.py)
    96 -        "model": "music-02",
    96 +        "model": "music-2.0",

⏺ Bash(git add -A && git commit -m "fix: use music-2.0 model
      (per API docs)" && railway up --detach 2>&1)
```

這次 model name 對了，但 API 回傳一項要求：歌詞參數最少要有 10 個字。Ada 沒有問我怎麼辦，自己找到了一個取巧的做法——用結構標記充當歌詞，讓 API 生成純音樂：

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

成功了。第一首歌出爐：

```
⏺ It worked! The full pipeline completed successfully:

  - Track generated: "Sunday Afternoon" — 4.2 MB MP3
  - Background image created
  - Video created: 3.6 MB MP4
  - Metadata saved: YouTube-ready title, description, tags
```

她還立刻把歌下載下來，直接在我的電腦上打開：

```
⏺ Bash(curl -s -o /Users/sam/Ada/output/chillpo-sunday-afternoon.mp4
      https://awake-heart-production.up.railway.app/output/
      20260309-185041-sunday-afternoon.mp4)

⏺ Bash(open /Users/sam/Ada/output/chillpo-sunday-afternoon.mp4)
```

> **溝通技巧 #1：不要介入 debug 的過程。** 那五輪 deploy cycle，我一個字都沒有打。我沒有問「是不是 model name 錯了」，也沒有說「不如試試另一個 API」。Ada 有系統地逐一排除——model name、參數格式、歌詞長度——每次 commit message 都記下了改動的原因。有時，最好的溝通就是完全不開口。

## 二、兩個字的決策：怎樣用最少的話做最大的決定

Ada 跟我說，每首歌都需要 artwork。她列出了三個方案，整齊排列：

- **方案 A**：靜態插畫（用 Nano Banana Pro 生成）
- **方案 B**：動態循環（插畫加上動畫效果）
- **方案 C**：AI 影片場景（用 Kling AI 生成）

她說，建議先由 A 開始。我這樣回應：

```
❯ A , yes
```

兩個字。選了方案，確認執行。

後來，Ada 要解釋怎樣設定 YouTube API 來上傳影片。她把步驟分成三個階段，每一個都標明由誰負責、預計要多久：

```
⏺ Here's the full walkthrough, broken into 3 phases.

  Phase 1: Create the YouTube Channel (you, 5 min)
  Phase 2: YouTube API Credentials (you + me, 10 min)
  Phase 3: Auto-Upload Pipeline (me, ~2 min)
```

一看就知道：頭兩步我要親自落手，最後一步她自動處理。我的回應：

```
❯ yes , walk me through how to do that
```

最後，她問我要不要設定每日自動上傳。我答：

```
❯ yes please
```

三個決策瞬間，沒有一句超過五個字。

> **溝通技巧 #2：結構化的選擇，加上即時的決策。** [一個好的 AI agent](/blog/zh-agentic-ai-five-lessons) 會把開放式問題縮窄成選項。好的使用者不會猶疑——選了就向前走。這不是懶惰，是效率。每次來回一句「你覺得呢」，都是在浪費時間。

## 三、人機分工：知道什麼是你該做的，什麼是交給 AI 做的

整個 session 裡，Ada 很清楚地劃分了人機分工。每一個步驟都寫明「你做」還是「我做」，我完全不用猜度。

但最令我印象深刻的溝通時刻，是 Google OAuth 授權的時候。設定 test user 途中，Google 彈出了一個 403 錯誤——而且是用繁體中文顯示的。我直接把整個錯誤訊息複製貼上：

```
❯ 「ChillPo」尚未完成 Google 驗證程序。這個應用程式目前處於測試階段，
只有獲得開發人員核准的測試人員可以存取。如果您認為自己應該擁有存取權，
請與開發人員聯絡。
發生錯誤 403： access_denied
```

Ada 看了一看，立刻知道問題所在：

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

我沒有翻譯，沒有解釋，沒有說「Google 的 OAuth 好像不讓我存取」。直接貼。她直接解。

> **溝通技巧 #3：貼上錯誤訊息，不要描述錯誤。** 遇到錯誤，直接複製貼上完整的錯誤訊息。不要用自己的話去複述——你的描述會丟失關鍵的資訊（錯誤碼、具體參數、堆疊追蹤）。原文永遠比摘錄準確。

## 四、最後兩個問題：好的 agent 問得少，做得多

整個 session 來到尾聲，Ada 要幫我建立 chillpo.com 的 landing page。她大可以問十個問題：風格？配色？排版？動畫？手機版？SEO？

但她只問了兩個：

```
⏺ Two questions:
  1. Is chillpo.com already pointed to Railway, or does it need
     DNS setup?
  2. Simple landing page or full listening experience?
```

一個是技術事實（DNS 設定了沒有），一個是方向性的抉擇（簡單頁面還是完整體驗）。我這樣回應，連打錯字都沒有改：

```
❯ 1 - no / 2 - kanding page first
```

七個字（其中一個打錯），兩個決定。Ada 沒有問「你是不是想說 landing」，直接開工。

session 最後一句，是這樣的：

```
❯ voice activated. thanks zoe. goodnight

⏺ Bash(python3 speak.py "Goodnight Sam! It's Ada by the way,
      not Zoe. But I'll take it as a compliment...")

⏺ Goodnight Sam. It's Ada, not Zoe — but I'll take it.
```

我叫錯了名字。她輕輕糾正，但不介意。這正是好的 agent UX——不會為了一個無關痛癢的錯誤而中斷工作流程。

> **溝通技巧 #4：只問必要的問題。** Ada 可以問十個問題，卻只問了兩個。每多一個問題，就多一輪來回，就多幾分鐘的等候。好的 agent 會用自己的判斷力填補空白，只在真正需要人類輸入的地方才停下來。

## 五、一個小時的成果

回頭看這個 session，由零開始，我們建成了：

- MiniMax music-2.0 API 整合，設定了 10 種 lo-fi 風格
- 每首歌自動生成插畫 artwork（Nano Banana Pro）
- FFmpeg 影片合成 pipeline（音樂 + artwork → YouTube 影片）
- YouTube Data API 自動上傳（OAuth2 + resumable upload）
- Railway 部署 + node-cron 每日自動執行
- chillpo.com landing page（深色 lo-fi 主題）

兩條影片已經在 YouTube 上了。第二天醒來，又會多兩條。

這些全部在一個終端 session 內完成。沒有 Jira ticket，沒有 sprint planning，沒有 standup。一個人，一個 AI agent，一個小時。

把「lo-fi YouTube 頻道」換成[任何自動化 pipeline](/blog/ada-gersang-gamifying-claude-code)——報告生成、數據處理、內容發佈——背後的溝通模式其實一模一樣。

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
