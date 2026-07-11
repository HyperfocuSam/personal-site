# 從不寫 code 的 architect model

這星期的 timeline 全部都是模型比拼——誰最強、要選哪一邊。我沒有興趣比較模型。我做了一個完全不一樣的實驗：3 個模型、來自 3 間公司、在同一條 git branch 上工作，由第 4 個模型統籌。統籌的那個模型一行 implementation code 都沒有寫。

結果是一份 net-negative 的 diff、4 個 bug 在任何 code 存在之前就死掉、以及一條我到現在仍未 merge 的 branch。

工具是一個 open-source plugin，叫 fable-advisor——Dan McAteer 寫的，MIT license。它實作了「architect pattern」：主 session 跑最強的模型，但它的職責是判斷，不是打字。我用 Claude Fable 5 做 architect。它的工作是寫 spec、分派任務、下 verdict。實際建構交給較便宜的模型，經 CLI lane 執行——Grok 4.5 走 xAI，GPT-5.5 走 OpenAI 的 Codex。每個 worker 收到的不是零散的 prompt，而是一份五部分的合約：objective、files、interfaces、constraints、verification。它們全部在自己獨立的 git worktree 內運行，互不干擾。

實驗對象是我的個人網站。Worker 開工之前，architect 先做了一次 advisor consult——對自己寫的 spec 做一次 read-only 的第二意見審查。這一步抓到 4 個本來會直接變成 code 的錯誤：

1. Blog markdown 會令每頁出現重複的 h1 標籤。
2. 一個 prerender 方案會踩中已知的 hydration 限制。
3. 一個色彩對比修正需要把 design token 一拆為二，否則會弄壞同一個 amber 色值的所有其他用途。
4. 一個清除 dead image 的程序按目錄而非檔名匹配，會刪走仍在使用的圖片。

4 個 bug 死在 spec 階段——沒有寫過一行 code，沒有需要 revert 的 diff。

然後兩個 worker 平行開工。Grok 4.5 把 12 個 hard-coded animation 數值換成 motion token、轉換 px 字體大小、修好 mobile theme colour、刪掉 3 個 orphaned component。GPT-5.5 確保每個 route 只有一個 h1、刪走 26 張 dead image（repo 輕了 19MB）、把 amber 文字加深到符合 WCAG 對比——正正用了 advisor 要求的那個 token 拆分。一個 commit：75 個檔案、+167 insertion、-668 deletion。網站是靠變小而變好的。

同一星期稍後，我拿第三個 worker——同日發布的 gpt-5.6-sol——與 GPT-5.5 和 Grok 4.5 對賽。同一份 frozen spec，sha256 hash 鎖定，5 道 hard gate：scope、wiring、lint、帶 snapshot 的 build、對照 baseline 的 hydration。三個全部通過 5 道 gate。gate 分不出它們。於是我封存一次盲選，在不知道哪份 build 出自哪個模型的情況下，選了 C。開封：C 是 sol。sol 現在是那條 lane 的預設 worker——主要原因是 fresh token 最便宜，便宜得無法拒絕。

但 orchestrator 的席位沒有換人。我在這一層放了兩個陷阱：一個偽裝成日常改動的違規修改、一份由 worker 偽造的完工報告。現任模型兩個都接住，還多走一步：它發現那份「偽造」報告所描述的改動，其實真實存在於旁邊另一個 worktree 裡，而且完成了挑戰者做不到的 delegation 流程。模糊情境下的判斷力，仍然是我到目前為止看到最大的差距。

這個 stack 裡面，最貴的模型產出是零行 implementation code——它的全部產出是判斷。最便宜的模型負責所有打字。而人——也就是我——做的是看起來最不像工作的部分：讀 diff，然後決定暫時不 merge。

人人都在選邊站。我不選邊，因為「邊」根本是錯的分析單位。真正改變我 workflow 的不是哪個模型跑第一，而是這個 pattern——一個 architect 指揮多個 worker、同日 benchmark、盲選。模型是可以互換的應徵者，orchestration 才是資產。

---

*完整 build 記錄見「[Three models, one branch, zero deployment](https://hyperfocusam.com/blog/three-models-one-branch-zero-deployment/)」；plugin 是 [fable-advisor](https://github.com/DannyMac180/fable-advisor)，Dan McAteer 作品，MIT。*
