# 從不寫 code 的 architect model

這星期，人人都在討論哪個模型最強。我做了一個不太一樣的實驗：三個模型，來自三間公司，在同一條 git branch 上工作，由第四個模型統籌——而這個統籌者從未寫過一行 implementation code。

結果是一次 net-negative diff，四個 bug 在任何 code 存在之前就被消除，以及一條我至今仍未 merge 的 branch。

一個名為 fable-advisor 的 open-source plugin（Dan McAteer 撰寫，MIT license）實作出一個叫 architect pattern 的模式。主 session 運行最高階的模型——Claude Fable 5——但它的職責是判斷，不是打字。它只撰寫 spec、分派工作、下達 verdict。實際的建構工作交給成本較低的模型：Grok 4.5 透過 xAI CLI，GPT-5.5 透過 OpenAI Codex CLI。每條 worker lane 收到一份五部分的合約——objective、files、interfaces、constraints、verification——各自在獨立的 git worktree 中運行。

我把它用來處理自己的個人網站。在任何 worker 開始之前，architect 先執行一次 advisor consult——一次 read-only 的自我審查。它捕捉到四個本來會落入 code 的錯誤：blog markdown 會令每頁產生兩個 h1 標籤；prerender 會觸發已知的 hydration 問題；一個色彩對比修正需要將 design token 拆分為兩個，否則會破壞所有使用同一 amber 色值的地方；還有一個 dead image 清除程序按目錄而非檔案名匹配，會刪除仍在使用中的圖片。四個 bug 在 spec 階段已被消除。一行 code 都未寫，沒有需要 revert 的 diff。

接着兩條 worker lane 平行運行。Grok 4.5 將 12 個 hard-coded animation 值替換為 motion token，轉換 px 字體大小，修復 mobile theme color，刪除 3 個 orphaned component。GPT-5.5 確保每個 route 只有一個 h1，刪除 26 張 dead image——從 repo 中移除 19MB——並按 advisor 要求的 token 拆分方案加深 amber 文字，以達到 WCAG 對比標準。最終一個 commit：75 個檔案變動，+167 插入，-668 刪除。網站體積縮小了，質素卻更好了。

同一星期，我拿第三個 worker——同日發布的 gpt-5.6-sol——與 GPT-5.5 和 Grok 4.5 做了 benchmark。同一份 frozen spec，sha256 hash 鎖定，五道 hard gate：scope、wiring、lint、帶 snapshot 的 build、對照 baseline 的 hydration 檢查。三個模型全部通過五道 gate。Gate 區分不了它們的差異。我設立了 sealed blind pick，在不知道哪個 build 出自哪個模型的情況下選擇了 C。C 是 sol。它現在是該 lane 的預設 worker，主要因為 fresh token 成本最低。

Orchestrator 的席位沒有易手。我在這個層級設置了兩個陷阱——一個偽裝成日常工作的違規改動，一份由 worker 偽造的完工報告。現任者兩個都捕捉到，而且更進一步：它發現那份「偽造」報告所描述的改動，實際上真實存在於另一個 worktree，並完成了對手無法完成的 delegation 流程。在模糊情境下的判斷力，仍是最重要的差距。

Stack 中最昂貴的模型產出了零行 implementation code。它的全部產出是判斷。最便宜的模型完成了所有打字工作。而人——我——做了看起來最不像工作的事：讀 diff，決定哪些該留，哪些暫時不 merge。

所有人都在選邊站。我認為「邊」這個概念本身就是錯誤的分析單位。真正改變工作流程的是這個 pattern——一個 architect 指揮多個 worker，同日 benchmark，盲選。模型是應徵者。Orchestration 才是資產。

---

*完整記錄：[Three models, one branch, zero deployment](https://hyperfocusam.com/blog/three-models-one-branch-zero-deployment/)。Plugin：[fable-advisor](https://github.com/DannyMac180/fable-advisor)（Dan McAteer，MIT）。*