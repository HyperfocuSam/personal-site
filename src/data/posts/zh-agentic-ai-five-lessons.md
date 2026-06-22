# 起一個 Agentic AI 系統學到既五件事

我最近起咗個 multi-agent AI 系統。唔係 chatbot，係真正既 agent architecture：四個 specialist agent，一個 [team router 自動分配任務](/blog/claude-code-mastery-part-4-agent-teams-tc)，persistent memory 跨 session 記住用戶，streaming UI 即時顯示成個 agentic process。

由零到 production deploy，以下係五個最深刻既體會。

## 一、Orchestration 係 prompt engineering 問題

好多人以為 multi-agent 最難係 architecture。揀咩 framework、點 design routing logic、用咩 protocol。

錯。最難係教個 router 唔好自己答。

我用既係 route mode team — leader agent 分析用戶 message，然後 delegate 俾最適合既 specialist。理論上完美。實際上個 router 成日覺得自己答得掂，尤其係 greeting 同簡單問題。

最後我要喺 instructions 入面寫三次同一個意思：「ALWAYS delegate」「NEVER answer directly」「Even for greetings, delegate to assistant」。三次。同一個 rule。佢先肯 consistently follow。

LLM 需要 redundancy 嚟 enforce routing constraint。呢個係實戰教訓，唔係理論。

## 二、Memory 係用戶感知到既最大差異

Agent 識用 tool、識 search、識 reason — 呢啲用戶未必感受到。但當佢第二日返嚟，AI 講「你上次提過你個仔叫 XX」，成個 experience 即刻唔同。

重點係：memory 一定要 shared。如果你有四個 agent，每個各自有獨立既 memory store，用戶同 finance agent 講過既野，wellness agent 完全唔知。對用戶嚟講佢哋同緊一個 AI 傾，但背後係四個獨立既腦。

一個 [shared database，所有 agent 讀寫同一個地方](/blog/claude-code-mastery-part-2-skills-memory-tc)。呢個 architectural decision 決定咗成個產品既 coherence。

## 三、Agentic UX 唔係關個答案事

我做過最有價值既 feature 唔係 memory，唔係 routing，係喺 UI 度 show 成個 agentic process。

用戶見到：「轉交俾財務顧問」→「搜尋網絡... 2.3s」→「完成」。Routing chip、tool spinner、duration badge。

成個 app 即刻由「好似個 chatbot」變成「好似有個 team 幫緊我」。呢個 perception shift 巨大。

大部分 agent framework 只 stream text。但 text 係最低要求。真正既 agentic UX 係將 delegation、tool usage、reasoning chain 全部 surface 出嚟。

Show the work。唔好扮 magic。

## 四、Guardrail 有文化偏見

我設咗個 validation rule：回覆少過 10 個字就 reject。英文嚟講合理，一句完整回答起碼都有十幾個 character。

廣東話「好呀！」三個字。「明白」兩個字。全部被 reject。用戶見到空白 bubble，以為 app 壞咗。

更嚴重既係內建既 prompt injection detector。佢用英文 pattern 訓練，遇到中文 sentence structure 就 false positive。正常廣東話被當成 injection attack，直接 block。

每一條 validation rule 都 encode 緊文化假設。你唔 audit，佢就靜靜雞 kill 緊你既用戶體驗。

## 五、Framework 俾你 80%，Product 係嗰 20%

Agent framework 真係好強。Model integration、tool calling、memory extraction、session persistence、streaming — 50 行 code 就有個 working agent。

但冇人 ship 嗰 80%。

你 ship 既係：multi-agent session 既 replay 邏輯。Streaming event 既分類同 reassembly。Error state 既 graceful handling。Multilingual guardrail 既 audit。Empty state UX。

呢 20% 冇 framework 幫到你。呢 20% 先係 product。

---

Agent 唔係 feature。Agent 係 architecture。識 route、識記、識用 tool、識 delegate。

Framework 降低咗門檻。但 craft 仲係喺你手上。

---

*Sam Wong 喺 6 個國家做 AI adoption training，訓練超過 10,000 位專業人士。[LinkedIn](https://www.linkedin.com/in/sam-ai-agent/) | [Adaptig](https://adaptig.ai)*
