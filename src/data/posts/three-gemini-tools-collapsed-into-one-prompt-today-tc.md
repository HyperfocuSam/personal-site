# 今日,我三個 Gemini tab 收埋成一個 prompt

我的日常工作流之中，Gemini 有三個獨立 surface。Pro 跑會議錄音逐字稿。3 Pro Preview 處理 Adaptig 德語 keynote 材料的英德翻譯。Nano Banana Pro 通過 deck-design skill 生成 slide 圖與 case study illustration。三個 model ID，三條 API call，三套「現在該用哪一個」的判斷邏輯。

今早 I/O 2026，Google 發佈了 Gemini Omni。它的提案是：不再分開三個工具。一個 model，一個 prompt，multimodal 輸入輸出 —— 將 Veo 的 video、Nano Banana 的圖，加上 Genie 的 world-simulation 工作，整合到一個 surface 之內，並且在多輪對話之間維持人物、物理規則與先前修改的一致性。

我未在 production 跑過 Omni。Omni Flash 今日只 roll 到 Google AI Plus / Pro / Ultra 訂閱者，通過 Gemini app 與 Google Flow 開放；YouTube Shorts 集成本週上線，API access 大概還要幾週。所以這是一個 directional read，不是 battle-tested 結論。但這個 directional read 在 day one 已經夠重要，值得記下，因為「整合」這個論述終於落地了。

如果 Omni 按照 Google demo 那樣交付，我工作流會出現的具體變化：

我的 deck-design skill 現在 call `gemini-3-pro-image-preview` 來生成品牌化的 slide 圖像。這個組合一直 work 得不錯 —— Nano Banana Pro 是少數能穩定 hold 住 Adaptig 酒紅加 Helvetica 的圖像 model。如果 Omni 將同一條 call 升級為一個統一 surface，並且能夠處理短篇 workshop intro video 並維持跨 cut 角色一致性，那麼我的 video 模型評估 backlog —— Kling 3 對 MiniMax Hailuo 對 Veo 3.1 —— 會少一個 column。不是因為 Kling 或 Hailuo 變差，而是因為「[保持在同一個 vendor 的內部邏輯](/blog/zh-why-pay-for-ai-tools)」這個 property，變得比我之前定價得更高。

對話式編輯這個 claim，在我親眼看著它在真實 client brief 上撐得住之前，我會繼續持疑。「改 background，角色保持，重做 lighting，鏡頭向右推」這種 demo，在 keynote 舞台從來都 work；但去到實際 brief 是「讓角色看起來像我們品牌大使 8%，但又不要太像」的時候，通常崩潰。多輪一致性是過去 18 個月我測過的每一個 multimodal model 共同失敗的地方。如果 Omni 真的 hold 得住，那才是真正的轉捩點。

Gemini 3 Deep Think 今日同步 upgrade。無工具下 Humanity's Last Exam 拿到 48.4%，ARC-AGI-2 拿到 84.6%，2025 IMO 與 IPhO 達到金牌水平。這些數字對研究實驗室的意義比對我的培訓教室大。但它們在一個具體場景對我的 pitch 是有用的：當企業 L&D buyer 問「AI 真的還在變聰明，還是已經到了瓶頸」的時候，我今日比昨日多一個 sharper 的答案。「瓶頸論」的聲量比現實大，而 Deep Think 在一個專門測試前沿推理極限的 benchmark 上拿到這種分數，正是我可以在 workshop 開場引用的 receipt。

不過，整合（consolidation）這個 thesis 才是更值得 watch 的。如果 Omni 兌現承諾，下一季教企業 AI adoption 的正確方式，就不再是「[五個工作五個工具](/blog/zh-3-ai-tools-save-focus)」，而是「一個 prompt surface，以下幾種 compose 方式」。這是另一種 workshop。也是一種更多 client 能在半日吸收的 workshop。

我會在用 Omni 跑過真實 brief 之後再回報。下一批 Adaptig case study illustration 大概是最適合的 pilot —— 同樣的 prompt set、同樣的品牌約束，看哪一個能 survive。

Day one read。還不是定案的 pattern。只是 toolbox 變小的一日。

---

*在 [LinkedIn](https://www.linkedin.com/in/sam-ai-agent/) 上聯絡我。*