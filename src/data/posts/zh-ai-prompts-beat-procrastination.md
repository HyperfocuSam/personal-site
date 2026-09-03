# 5 條真正有用的 AI Prompt 對付拖延症（我每日在用）

這 5 條 prompt 早前在 X 上瘋傳。源頭是 Reddit 用戶 reclaim_ai 貼出的一份清單。網上流傳的 prompt 清單，十份有九份不值一看。這一份是例外——我知道，因為 5 條的變化版我每天都在用。

我有 ADHD。不是偶爾分心的程度，是確診、服藥後依然會打開一個檔案兩秒，然後發現自己無緣無故在做著另一件事的類型。拖延對我不是生產力問題，是腦部線路問題。不是不想做，是腦袋不肯 engage。明明知道要做，但那份「知道」無法轉化為行動。

過去一年，我用 Claude Code 把這些 prompt 織進了每日的 AI workflow。以下逐條講：為甚麼有效、怎樣用出更多價值。

## 1. 把任務碎開

> "I'm avoiding [任務]. Break it into 3-5 tiny, actionable steps and suggest an easy way to start the first one."

整份清單最有用的一條。對 ADHD 腦袋來說，拖延通常不是任務本身的問題，是任務「看起來太大」。「寫提案」三個字會在腦中自動展開成整份文件——封面、範圍、定價、時間表——腦袋未開始已經關機。這條 prompt 把一件壓死人的事切成 5 件小事，而第一件通常 2 分鐘內做得完。最難的是開始；一動起來，momentum 會帶著你走。

**怎樣用得更好：** [任務] 要寫得具體——「I'm avoiding the Q2 marketing report for my manager」遠勝「I'm avoiding work」。context 愈多，步驟愈貼身。如果你用有記憶功能的 ChatGPT 或 Claude，讓它累積你的工作模式，下次再問時它會愈來愈準。

## 2. 幫你決定先做哪件

> "Here's my to-do list: [任務清單]. Which one should I tackle first to build momentum and why?"

清單上有 12 件事、決定不了先做哪件的時候，預設結果是一件都不做。這條 prompt 給你一個有理由的第一步，打破僵局。「build momentum」這個問法是關鍵：它問的不是哪件最重要，是哪件能讓你動起來。有時正確的第一步是一個 quick win，不是最大那件——違反直覺，但有效：完成一件小事，能量就來了。

**怎樣用得更好：** 貼真實的 to-do list，不要貼美化版；瑣碎的煩人小事也一併放進去。有時 AI 會叫你先掃走 3 件小事清空腦袋——它通常是對的。進階用法：用有記憶的 AI（ChatGPT memory、Claude Projects 或自建系統），to-do list 可以跨 session 保留，下次直接問「今天先做哪件？」它已有 context。

## 3. 把任務變成遊戲

> "Gamify [任務] by creating a challenge, a scoring system, and a reward for completing it."

聽起來兒戲，但背後是腦部化學。拖延很多時是多巴胺問題——任務給不出即時回饋，鬥不過滑手機、吃零食、整理桌面。遊戲化就是人工注入回饋。AI 通常會給你分數系統、里程碑、獎勵機制；重點是獎勵要真的兌現。告訴 AI 你吃哪一套（「我要咖啡時間，不要叫我做運動」），它會調整。

**怎樣用得更好：** 叫它設計全日挑戰，不是一次性遊戲——「Gamify my workday: I need to complete these 5 tasks by 6pm」讓你整天有得玩；加罰則提高賭注。我把這個概念推到盡頭，在自己的 AI workflow 上建了一個真正的 gamification 系統——[完成任務賺 XP、技能升級、combo 疊加](/blog/ada-gersang-gamifying-claude-code)。聽起來過火，但對需要持續回饋的 ADHD 腦袋，它真的改變行為。Prompt 版是同一原理的輕量版，起步剛好。

## 4. 找人踢你一腳

> "Give me a quick pep talk: Why is completing [任務] worth it, and what are the consequences if I keep delaying?"

這條做兩件事。第一，AI 會把你心裡知道、但從未跟這個任務連上的好處講出來——「完成這份 report，上司會覺得你可靠」，比腦中那團「我應該做」的焦慮實在得多。第二——大部分人跳過的部分——它會列出拖下去的後果。不是災難片式的假設，是實際的連鎖反應：「再拖一星期，就會撞正 product launch 的準備期，到時兩樣一起趕。」這才是多數人需要的那一腳。

**怎樣用得更好：** 加上個人賭注——「I tend to procrastinate when I'm anxious about the quality, and I have a deadline on Friday.」AI 愈了解你的模式，pep talk 愈準。我自己已用自動化 accountability 系統取代了 pep talk——AI 助理追蹤所有承諾和 deadline，如果我說過星期五前要覆 Kelly 而沒有做，下一個 session 一打開就是一句「Kelly 的 email 遲了 3 日」。不用打氣，只有事實。但 prompt 版對沒有這種系統的人已經很好用——老實說，有時你就是需要有人（哪怕是 AI）告訴你這件事值得做。

## 5. 找出真正的原因

> "I keep putting off [任務]. What might be causing this, and how can I overcome it right now?"

全清單最深的一條，也最令人意外。我們通常以為自己知道為何拖延（懶、累、不在乎），但真正原因往往未被講清楚。AI 可能指出：你避開它是因為資料還未齊、怕做出來不夠好、或第一步不清晰。一旦把 blocker 講出名字，解法通常自動浮現。

**怎樣用得更好：** 跟進。AI 提出一個原因，就追問下去——「You said I might be avoiding this because I'm unsure about the format. That's actually true — can you suggest three formats for this report and help me pick one?」兩條訊息，由拖延變成行動。ADHD 特有的視角：對 ADHD 的人，root cause 通常平庸得很——不是情緒抗拒，是摩擦。你不是怕那個任務，你是煩：檔案埋在三層 folder 之下、template 在 email 某處、一想到要先找齊所有東西已經是另一件事。[減少摩擦](/blog/zh-3-ai-tools-save-focus)——整理 workspace、pin 常用檔案、存好 template——往往比分析感受有效得多。

## 怎樣令它們真正用得著

任何生產力技巧最難的不是學會，是在真正拖延的當下記得用。你逃避事情的時候，不會突然想到「打開 ChatGPT 輸入第 3 條 prompt」。這就是「懂一個技巧」與「有一套系統」之間的落差。三個方法補上：

1. 存成隨手可用的 template——手機備忘錄、pin 住一個 ChatGPT 對話、text shortcut。你與 prompt 之間的步驟愈少，愈會用。
2. 先用一條。不要 5 條齊上。選最貼近你拖延模式那條——多數人是第 1 條（任務太大）或第 2 條（不知從何開始）。用一星期，再加下一條。
3. [用有記憶的 AI](/blog/zh-why-pay-for-ai-tools)。長期用同一個工具、讓它記住你的 context，這些 prompt 會愈用愈強——不用每次重新解釋，它已知道你的工作模式、deadline、和你慣性避開哪類事。

這 5 條 prompt 是有用的。問題是你明天會不會真的用——還是把這篇文章 save 下來，連它也一起拖延掉。

---
