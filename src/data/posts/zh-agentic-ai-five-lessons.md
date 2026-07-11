# 起一個 Agentic AI 系統學到既五件事

我最近建立了一個 multi-agent AI 系統。不是 chatbot，而是真正的 agent architecture：四個 specialist agent、一個 [team router 自動分配任務](/blog/claude-code-mastery-part-4-agent-teams-tc)，persistent memory 跨 session 記住用戶，streaming UI 即時顯示整個 agentic process。

由零到 production deploy，以下是我最深刻的五個體會。

## 一、Orchestration 是 prompt engineering 問題

很多人以為 multi-agent 最難是 architecture。選擇甚麼 framework、如何設計 routing logic、使用甚麼 protocol。錯了。最難是教會 router 不要自己回答。

我使用的是 route mode team — leader agent 分析用戶訊息，然後 delegate 給最適合的 specialist。理論上完美。實際上 router 經常覺得自己能夠回答，特別是 greeting 和簡單問題。

最後我要在 instructions 裡寫三次同一個意思：「ALWAYS delegate」「NEVER answer directly」「Even for greetings, delegate to assistant」。三次。同一個規則。它才肯 consistently follow。

LLM 需要 redundancy 來 enforce routing constraint。這是實戰教訓，不是理論。

## 二、Memory 是用戶感知到的最大差異

Agent 懂得用 tool、懂得 search、懂得 reason — 這些用戶未必感受到。但當他第二天回來，AI 說「你上次提過你的兒子叫 XX」，整個 experience 立刻不同。

重點是：memory 一定要 shared。如果你有四個 agent，每個各自有獨立的 memory store，用戶與 finance agent 說過的事情，wellness agent 完全不知道。對用戶來說他們是在與一個 AI 對話，但背後是四個獨立的腦。

一個 [shared database，所有 agent 讀寫同一個地方](/blog/claude-code-mastery-part-2-skills-memory-tc)。這個 architectural decision 決定了整個產品的 coherence。

## 三、Agentic UX 不是關乎答案的事

我做過最有價值的 feature 不是 memory，不是 routing，是在 UI 上展示整個 agentic process。

用戶見到：「轉交俾財務顧問」→「搜尋網絡... 2.3s」→「完成」。Routing chip、tool spinner、duration badge。

整個 app 立即由「好像一個 chatbot」變成「好像有一個 team 正在幫助我」。這個 perception shift 十分巨大。

大部分 agent framework 只 stream text。但 text 是最低要求。真正的 agentic UX 是將 delegation、tool usage、reasoning chain 全部 surface 出來。

Show the work。不要假裝 magic。

## 四、Guardrail 有文化偏見

我設定了一個 validation rule：回覆少於 10 個字就 reject。英文來說合理，一句完整回答起碼都有十幾個 character。

廣東話「好呀！」三個字。「明白」兩個字。全部被 reject。用戶看到空白 bubble，以為 app 壞了。

更嚴重的是內建的 prompt injection detector。它用英文 pattern 訓練，遇到中文 sentence structure 就 false positive。正常廣東話被當成 injection attack，直接 block。PII detector 對不同的電話號碼格式也會誤判。

每一條 validation rule 都 encodes 著文化假設。你不 audit，它就靜悄悄 kill 你的用戶體驗。

## 五、Framework 給你 80%，Product 是那 20%

Agent framework 真的很強。Model integration、tool calling、memory extraction、session persistence、streaming — 50 行 code 就有一個 working agent。但沒有人 ship 那 80%。

你 ship 的是：multi-agent session 的 replay 邏輯。Streaming event 的分類與 reassembly。Error state 的 graceful handling。Multilingual guardrail 的 audit。Empty state UX。

這 20% 沒有 framework 幫到你。這 20% 才是 product。

---

Agent 不是 feature。Agent 是 architecture。懂得 route、懂得記憶、懂得用 tool、懂得 delegate。

Framework 降低了門檻。但 craft 仍然在你手上。

---

*Sam Wong 在 6 個國家進行 AI adoption training，訓練超過 10,000 位專業人士。[LinkedIn](https://www.linkedin.com/in/sam-ai-agent/) | [Adaptig](https://adaptig.ai)*