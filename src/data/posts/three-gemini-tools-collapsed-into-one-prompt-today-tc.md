# 三個 Gemini 工具，今日合併成一個 prompt

我的日常 stack 裡有三個獨立的 Gemini surface。Pro 跑會議逐字稿，把潦草錄音轉成還能用的紀錄。3 Pro Preview 做英譯德，準備 Adaptig 的 keynote 材料——容錯率極低的那種材料。Nano Banana Pro 經我的 deck-design skill 生成 slide 圖和 case-study illustration。三組 model ID，三條 API call，三套「這件事該用哪個」的心智模型。一直就這麼用著，直到今早。

I/O 2026，Google 發佈 Gemini Omni。提案是：不用再在三個工具之間切換。一個 model、一個 prompt surface，multimodal 輸入輸出——Veo 的 video、Nano Banana 的圖像、Genie 的 world-simulation 摺進同一個 surface，並且在多輪之間保持角色、物理、先前修改的一致性。換句話說，一個 prompt，就能生成 slide 資產、再變出 workshop 開場短片，而不必跑去另一條 pipeline 重建角色。

先說清楚：我未在 production 跑過 Omni。Omni Flash 今日先開放給 Gemini app 和 Google Flow 的 AI Plus、Pro、Ultra 訂閱者（就是之前[那篇](/blog/zh-why-pay-for-ai-tools)聊過，訂閱層級終於把功能切開），YouTube Shorts 整合本週上線，API 還要「幾星期」。這不是實測結論，是方向性判斷。但方向性判斷重要到值得在 day one 寫下——因為「整合」這個論述，今次真的有機會成立。

如果 Omni 交足 Google demo 的貨，我的 deck-design skill 會直接受影響。目前它 call `gemini-3-pro-image-preview` 做品牌 slide 資產，成績一直不錯，Nano Banana Pro 是唯一能穩住 Adaptig 酒紅色加 Helvetica 而不走樣的圖像 model。現在設想 Omni 用同一個統一 surface 取代那條 call，又能生成跨 cut 角色一致的 workshop 開場短片，那麼我的 video 評估清單——Kling 3 對 MiniMax Hailuo 對 Veo 3.1——會少一整欄。不是 Kling 或 Hailuo 變差了，而是「留在同一個 vendor 邏輯之內」這個特性，比我以往估的值錢。

不過有一點我很懷疑。對話式編輯這個 claim，未在真實 client brief 上活下來之前，我不信。「換背景、角色不變、重打燈光、鏡頭右移」這類 demo 在 keynote 舞台永遠成功，因為那是用同一段精心排練的 prompt set 跑出來的。真實 brief 是另一回事——「讓角色似我們的品牌大使多 8%，但又不能似到認得出」——這種要求一進來，model 通常就散架。跨輪持久性是我過去 18 個月測過的每一個 multimodal model 的共同死穴。如果 Omni 真的守得住，那就是關鍵轉捩點。目前，我還是先把它放在 backlog 裡的「等 pilot 後再說」那欄。

同日的另一條消息是 Gemini 3 Deep Think 升級。無工具下 Humanity's Last Exam 48.4%，ARC-AGI-2 84.6%，2025 年 IMO 和 IPhO 金牌水平。這些數字對研究實驗室的意義大於對我的培訓教室，但對我的 pitch 有一個具體用處——企業 L&D 買家常問「AI 還在變聰明，還是到了平台期」，我今天的答案比昨天銳利。平台期論的聲量大於現實，而 Deep Think 在一個專測前沿推理極限的 benchmark 上的成績，正是我可以在 workshop 開場拿出來的 receipt。

真正要盯住的是整合論。如果 Omni 兌現，下一季教企業 AI adoption 的正確方式就不再是「五件工作五個工具」（正是[這篇](/blog/zh-3-ai-tools-save-focus)記錄過的老 pattern），而是「一個 prompt surface，這幾種組合方式」。那是另一種 workshop——也是更多客戶能在半天內吸收的 workshop。成套方法論的教材都要重寫，但那種重寫是值得的。

我會在用 Omni 跑過真實 brief 之後回來寫後續。下一批 Adaptig case-study illustration 是合適的 pilot：同一套餵了 Nano Banana 幾個月的 prompt、同樣的品牌約束，看甚麼存活。Day one 的判斷。不是定案的 pattern。只是 toolbox 變小的一日。

---

*[在 LinkedIn 聯絡我](https://www.linkedin.com/in/sam-ai-agent/)*
