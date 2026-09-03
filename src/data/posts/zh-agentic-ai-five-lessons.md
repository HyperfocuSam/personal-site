# 從零建構一個 Agentic AI 系統學到的五件事

人人都在做 chatbot。我在做 agent 系統——分別不是 marketing 用詞，是 architecture。

最近我從零建了一個：4 個 specialist agent、一個 team router（route mode：leader agent 分析每一條訊息，再 delegate 給最適合的 specialist）、persistent memory（抽取每個用戶的 facts，跨 session 記住）、streaming UI（實時顯示 routing 決定、tool call、每步耗時）。

做完之後我更確定了：做出 chatbot 不難，做出 agent 系統很難。以下五件事，framework 的文件不會告訴你。

## 1. Orchestration 是 prompt engineering 問題，不是架構問題

單一 agent 加 tools 加 memory，開箱即用。一引入 team——router 要 delegate 給 specialist，像我在 [Claude Code Mastery: Agent Teams](/blog/claude-code-mastery-part-4-agent-teams-tc) 那篇寫過的——一切都變了。

Router 有自己的性格：它總想自己回答問題，不想 delegate，尤其是打招呼和簡單問題。同一條 routing 規則，我要用三種寫法、寫足三次：「ALWAYS delegate」、「NEVER answer directly」、「Even for greetings, delegate to assistant」。寫一次它不理你，寫兩次它偶爾聽話，寫滿三次才穩定下來。LLM 需要 redundancy 才會可靠地遵守 routing constraint。

這是實戰教訓，不是理論。

## 2. Memory 是殺手級功能——前提是共享

AI 記得你上星期講過的事，那一刻體驗就變了：它由工具變成顧問，用戶立刻察覺。

但 memory 只在所有 agent 讀寫同一個 store 時才成立，正如我在 [Claude Code Mastery: Skills & Memory](/blog/claude-code-mastery-part-2-skills-memory-tc) 拆解過的：如果 finance agent 抽取了一個 fact，而 wellness agent 看不到，你其實是 4 個 chatbot 扮一個系統。Shared state 實作起來極簡單，卻極容易被忽略。

產品層面的洞察：用戶不在乎是哪個 agent 回答，只在乎系統記得。

## 3. Agentic UX 的重點不在答案

整個項目最大的升級不在 agent，在 frontend。

當我開始把結構化 event 推送到介面——哪個 agent 接手了訊息、call 了哪些 tool、每步用了多久——整個體驗都變了。用戶看得到 routing 決定，看得到一個 web search 轉了 2.3 秒，看得到 router 交棒給 specialist。Activity chip、duration badge、agent label。它不再像一個 chatbot，開始像一隊人在為你工作。

大部分 framework 只給你 streaming text，那是最低要求；真正的產品在於把過程 surface 出來：delegation、tool usage、reasoning chain。用戶看得見機器的內部運作，信任不減反增。Show the work：agentic AI 不是魔術，是看得見的能力。

## 4. Guardrail 內藏文化假設

我寫了一條 input validation：少於 10 個字的回覆當錯誤處理。

英文合理——再簡單的回答都是完整句子。廣東話呢？「好呀！」3 個字，「明白」2 個字，全是正常回覆。這條 guardrail 一直在殺掉好好的回覆，用戶只看到空白 bubble，沒有任何解釋。

問題不止字數。用英文訓練的 prompt injection detector，會把正常中文句式當成攻擊；PII detector 對不同地區的電話號碼格式誤判。每條 validation rule 都內藏它訓練資料裡的文化假設。

教訓：為多語言用戶開發，每一條 guardrail 都應視為有罪，直至證明無罪。

## 5. Framework 的 80/20

Agent framework 免費給你 80%：model integration、tool calling、memory extraction、session persistence、streaming——50 行 code 就有一個能動的 agent。

剩下的 20% 才是產品所在：multi-agent 對話真正可用的 session replay、經過不同 storage 層來回而不壞的 encoding、告訴用戶發生了甚麼事的 error state、把十多種 event 分類再重組給 frontend 的 streaming proxy。

沒有人 ship 那 80%，人人 ship 的都是那 20%。

Agent 不是 feature，是 architecture。一旦有 routing、memory、tools、specialist delegation，你已不是在做 chatbot，而是在做一個會判斷誰該處理甚麼、記得自己學過甚麼、會執行實際動作的系統。Framework 令 architecture 變得人人可及；產品的部分——UX、edge case、文化假設——仍然在你手上。而 craft 正正在那裡。

---
