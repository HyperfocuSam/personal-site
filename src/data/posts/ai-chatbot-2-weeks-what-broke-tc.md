# 兩星期建了一個 AI Chatbot。第三輪對話就崩潰

客戶需要一個 AI 顧問 chatbot。不是 ChatGPT 套殼——是一個真正的 [multi-agent 系統](/blog/zh-agentic-ai-five-lessons)：危機偵測、個人化路由、一個涵蓋 137 間香港學校的知識庫。而且要快。

兩星期，我交貨了。僱員人數：0。團隊是我自己，加一隊 AI coding agent。

但這不是一個吹速度的成功故事。這篇講的，是一個人加一隊 agent 出貨的 AI 產品，真正會在哪裡壞。

## Turn 3 崩潰

chatbot 頭兩輪對話完美。第三條訊息就死。

錯誤訊息極其行貨：「Sorry, there was a problem processing your request.」用戶那邊沒有 stack trace，只有沉默。我花了 1 小時才找到根本原因：系統有一條 `MaxLengthGuardrail`，上限 5,000 字元——防止用戶把整份文件貼進對話框，合理。

但這條 guardrail 檢查的，不是用戶訊息，是「組裝後的 context」——對話歷史加 system prompt 加 agent routing metadata 加用戶訊息的完整 payload。到第三輪，組裝 context 超過 5,000 字元，guardrail 觸發，每一段對話都死在第三、四輪。

修復是 6 行 code：先抽出用戶的實際訊息再檢查長度。但找到它，需要理解「用戶送出的」和「framework 在幕後組裝的」是兩樣東西。這正是所有「10 分鐘建 chatbot」教學不會為你準備的落差。

## 一人開發模式

沒有工程團隊。要把一個 multi-agent chatbot 從零推到 production，做法是這樣。

Phase 0 是人手做的：我花了 2 天深入學 framework——Agno Agent OS，深到能做架構決定。哪個 agent 管哪種對話模式、routing 怎樣走、[guardrail 該放在 pipeline 哪個位置](/blog/claude-code-mastery-part-3-hooks-guardrails-tc)。AI agent 能執行 code，但不能替你下架構判斷；跳過這步，得到的是一個起得快、但被自己重量壓垮的系統。

之後每個 phase 一份自足的 brief：spec 包含範圍、現有 code pattern、檔案路徑、驗證清單。coding agent 讀 spec、讀 codebase、執行、驗證；我 review；下一個 phase 開始。流程是這樣：第一，我決定建甚麼；第二，coordinator agent 把意圖翻譯成有具體 pass/fail 標準的技術 spec；第三，coding agent 自主執行；第四，我 review、批准、commit；第五，下一個 phase 由乾淨的已知狀態開始。兩個 phase 就跑起核心系統：3 種對話模式的 multi-agent routing（危機偵測、升學顧問、一般育兒）、137 校知識庫、streaming 回應、用戶登入。

樽頸從來不是寫 code 的速度，是 spec 的清晰度。brief 寫得精確——設計 token 連 hex code、framework API 參照、現有 pattern 例子——agent 就交出乾淨的 code；brief 含糊時，agent 自創慣例，之後要逐條拆。

## 接手爛攤子的問題

重建之前，本來有一套舊 codebase：3 個 repo、167,000 行 code，前一隊開發商建的。客戶需要先知道自己手上有甚麼，才能決定下一步建甚麼。我跑了一次 security audit：18 項發現，7 項 critical。critical 包括：API key 硬編碼、直接 commit 進 repo——不在環境變數、不在 secrets manager，在 source code 裡；其中一個 repo 連 Apple 的 .p8 推送通知私鑰都 commit 了進版本控制。任何有 repo 權限的人都拿到 production 憑證。交接評分：3 分，滿分 10 分。

而 AI backend——整個系統的大腦——根本不在交接範圍內：交了 3 個 repo，最重要那個不見了。

所以「我們已經有一個 AI chatbot」這句話，不是大多數人以為的意思：有 code 不等於有產品；有產品不等於有安全的產品；有安全的產品，不等於有一個撐得過第三輪對話的產品。

## 「兩星期」實際的樣子

Day 1-2：學 framework、讀文件、做 AI 替代不了的架構決定。

Day 3：寫 Phase 1 spec，細到 coding agent 不用發問。

Day 4-5：Phase 1 執行與 review——核心 agent、routing 邏輯、知識庫、guardrail。

Day 6：寫 Phase 2 spec——個人化功能、家庭 profile、回應偏好。

Day 7-8：Phase 2 執行、部署上 production，然後就是 turn-3 崩潰。

Day 9：debug——guardrail 修復，另加一行漏掉的 Dockerfile，漏了的話任何一次部署都會令 backend 崩潰。

Day 10-14：測試、迭代、對舊 codebase 的 security audit、寫給非技術持份者的 executive summary。

兩星期是真的。但「兩星期」包含 2 天學習、2 天寫 spec、1 天 debug 一個 6 行的修復，真正 AI 輔助寫 code 的日子大約只有 4 天。

## Spec 清晰度這個樽頸

最大的一課：AI agent 寫 code 快，但垃圾 spec 產出垃圾更快。

跟 coding agent 說「implement the school advisor feature」，出來的東西技術上可行，但命名慣例和 codebase 其他部分不同、漏用現有 design token、另開 3 個和現有 function 重複的 utility 檔。改成「implement the school advisor feature using the `AdvisorAgent` class pattern from `agents/base.py`, the color tokens from `styles/tokens.ts`, and the streaming pattern from the crisis agent implementation」——第一次就交出乾淨一致的 code。分別不在 AI 的能力，在 spec 的精確度。

## 這代表甚麼

一個人可以出貨 production 級 AI 產品。工具存在，framework 夠成熟，coding agent 夠能力。但工作沒有消失，只是轉移了：由寫 code 變成寫 spec；由 debug 語法變成 debug 架構；由管理工程師變成管理 context。

chatbot 死在第三輪，不是因為 AI 失敗——是因為 guardrail 守錯了東西。

---

*我寫建 AI 產品和教企業採用 AI 的實戰。有共鳴的話，[LinkedIn 找我](https://linkedin.com/in/sam-ai-agent)。*
