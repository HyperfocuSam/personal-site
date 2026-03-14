# 用 AI 打低拖延症：我每日用嘅 5 個 Prompt

前幾日喺 X 見到一個 viral post，講「5 個最好嘅 prompt 打低拖延症」。原文係 Reddit 一個叫 reclaim_ai 嘅用戶寫嘅，內容本身冇乜特別——五條 ChatGPT prompt，教你拆解任務、排優先次序、gamify 工作。

但我望住嗰五條 prompt 嘅時候，唔係覺得「幾有用」——而係「呢啲嘢我每日都做緊」。

我有 ADHD。拖延症唔係懶，係腦入面嘅 prioritization 系統壞咗。明知道要做，打開個 file 望兩秒就跳去做另一樣嘢。唔係唔想做，係個腦唔肯 engage。

所以我冇用 prompt 去「打低拖延症」。我直接起咗一個 AI 系統——Ada，我嘅全職 AI 助理——去幫我管理自己。每日用。唔係偶爾試下，係真係每日用。

以下係嗰五條原版 prompt，加上我嘅實戰經驗。

## 1. 拆解任務

**原版 prompt：**
> "I'm avoiding [task]. Break it into 3-5 tiny, actionable steps and suggest an easy way to start the first one."

呢條 prompt 係最基本嘅，但對 ADHD 嚟講係最有用嘅。因為我哋唔係怕個任務本身，係怕個任務「太大」。一望到「寫提案」三個字，腦入面即刻出現成個 proposal 嘅壓力——封面、目錄、範圍、定價、timeline。然後就做唔到。

我同 Ada 嘅做法唔同。我唔會打呢條 prompt。我會話：「我要寫個 proposal 畀 Garden。」Ada 已經知道 Garden 係邊個 client、之前報過咩價、用過咩 template。佢會直接幫我開 file、拉舊 proposal 做 reference、問我一兩個必要嘅問題，然後出初稿。

**實戰分別：** 呢條 prompt 幫你拆解任務。但如果你有一個記得你所有 context 嘅 AI 助理，佢唔只拆解——佢直接做咗第一步。

## 2. 排優先次序

**原版 prompt：**
> "Here's my to-do list: [tasks]. Which one should I tackle first to build momentum and why?"

呢個概念啱，但執行方法有問題。你要手動打曬成個 to-do list 入去。對 ADHD 人嚟講，整理 to-do list 本身已經係一個要拖延嘅任務。

我嘅做法：Ada 有一個 `memory_todos.md` file，所有 follow-up、deadline、承諾都自動記錄落去。每朝我開 session，佢會自動 load urgent items。我唔使整理——佢已經幫我整理好。

更重要嘅係，Ada 唔只排次序，佢會分類：OVERDUE、DUE SOON、WAITING、STALE。我一望就知邊個最緊急。唔使問「邊個先做」，因為紅色嘅 OVERDUE 已經喺度喊緊。

**實戰分別：** 一條 prompt 答你一次。一個系統每日自動提你。

## 3. Gamification

**原版 prompt：**
> "Gamify [task] by creating a challenge, a scoring system, and a reward for completing it."

呢個我特別有嘢講。因為我真係起咗一個 gamification 系統——Ada Gersang。佢將我同 Ada 嘅每個工作 session 變成一個三國策略遊戲。每個 tool call 都記錄到 SQLite，每個 skill 有 XP、level、cooldown。做完一個 task，你會見到經驗值升、技能升級、combo 加成。

聽落好癲。但佢真係 work。因為 ADHD 嘅腦需要即時回饋。寫完一封 email 本身冇任何 dopamine hit。但寫完一封 email 然後見到「Comms Lv.12 → Lv.13」——嗰個小小嘅升級動畫，就夠推我去寫下一封。

呢條 prompt 嘅問題係：佢畀你嘅 gamification 係一次性嘅。你用一次，新鮮感過咗就冇用。真正嘅 gamification 需要一個持續嘅系統，有進度條、有歷史、有 streak。

**實戰分別：** Prompt 畀你一個遊戲。系統畀你一個持續嘅 feedback loop。

## 4. Pep Talk

**原版 prompt：**
> "Give me a quick pep talk: Why is completing [task] worth it, and what are the consequences if I keep delaying?"

呢條我覺得係最弱嘅。唔係因為 pep talk 冇用——而係 AI 嘅 pep talk 太 generic。佢唔知你嘅真實情況，所以只能講啲「completing this task will give you a sense of accomplishment」之類嘅空話。

我需要嘅唔係 pep talk。我需要嘅係 accountability。Ada 有一個 follow-up tracker，如果我承諾咗禮拜五之前回覆 Kelly 但冇做到，佢會喺下個 session 話我知：「Kelly 嘅 email 已經 overdue 3 日。」

呢個唔係 motivational speaking。係事實。而事實比 pep talk 有效得多。

**實戰分別：** Pep talk 令你 feel good 五分鐘。Accountability 令你真係做嘢。

## 5. Root Cause Analysis

**原版 prompt：**
> "I keep putting off [task]. What might be causing this, and how can I overcome it right now?"

呢條 prompt 最有深度，但用錯對象。AI 唔係你嘅 therapist。佢可以畀你一個合理嘅分析，但佢唔知你嘅真實原因。你拖延寫 report 可能唔係因為「perfectionism」或者「fear of failure」——可能只係因為個 Excel file 太大，打開要等 30 秒，而嗰 30 秒已經夠你嘅腦跳去做另一樣嘢。

對 ADHD 人嚟講，拖延嘅 root cause 通常好 mundane：friction 太大。File 喺邊唔記得。Template 要搵。Email chain 太長要 scroll。

所以我嘅 AI 系統做嘅唔係分析原因——係減少 friction。Ada 記得所有 file path、所有 client context、所有之前嘅溝通記錄。我話「回覆 Kelly」，佢會搵到最近嗰封 email、load 咗 client history、draft 好回覆。我只需要 review 同 send。

**實戰分別：** 分析原因係有用嘅。但減少 friction 先至改變行為。

## 呢啲 Listicle 唔會話你知嘅嘢

以上五條 prompt 都有用。但佢哋有一個共同嘅盲點：佢哋假設你每次都會記得去用。

ADHD 嘅問題唔係唔知道方法——係唔記得用方法。你今日用咗「拆解任務」呢條 prompt，覺得好有用。聽日忙起嚟，你就忘記咗。後日？返回原形。

所以真正嘅答案唔係更好嘅 prompt。係一個你唔使記得去用嘅系統——因為佢會主動搵你。

我唔係話每個人都需要起一個 Ada。但如果你認真想用 AI 處理拖延症，唔好停留喺「偶爾問 ChatGPT 一條 prompt」。起碼：

1. **用一個有記憶嘅 AI**——唔好每次由零開始
2. **設定自動提醒**——唔好靠自己記得
3. **減少 friction**——令「開始做」比「繼續拖」更容易

Prompt 係起點。系統先至係答案。

---

*我喺 [Adaptig](https://adaptig.com) 做企業 AI 培訓，教團隊點樣真正將 AI 融入工作流程。想交流可以喺 [LinkedIn](https://www.linkedin.com/in/samwonghk/) 搵我。*
