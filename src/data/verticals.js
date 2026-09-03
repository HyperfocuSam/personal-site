// Profession pages — 「為誰而設」.
//
// WHY THESE EXIST (2026-08-26). GSC says the English head term is an OFF-SITE
// problem: zero editorial backlinks, and Google cannot tell this Sam Wong from
// Hong Kong's Commissioner for Sports. More metadata on /services cannot move
// it. What CAN be won is the long tail by profession — 「醫護 AI 培訓 香港」,
// 「社福機構 AI 培訓」 — where the competition is thin and the intent is high.
//
// And Chinese is the lane that converts: ZH surfaces take 44% of clicks from
// 27.8% of impressions. So each entry is written ZH-first; the English twin is
// a real translation, not the source.
//
// GEO as much as SEO. `answer` is a self-contained, quotable paragraph and
// `proof` is dated and attributable — that is what an answer engine will lift.
// Both are emitted into llms-full.txt and into FAQPage JSON-LD.
//
// ⚠ FIVE, NOT NINE. Nine near-templated profession pages is the doorway-page
// pattern Google demotes, and this site already reports 122 sitemap URLs
// submitted against 0 indexed. Each page here carries its own receipts, its own
// FAQ and its own worked example. Do not add a sixth by copying a fifth.
//
// ⚠ CLIENT NAMING: `scripts/anonymize_site_clients.py` and the build-failing
// test `src/__tests__/clientAnonymisation.test.js` govern every name below.
// The bank, the food manufacturer and the advertising group are all on the
// anonymise list and appear here only by descriptor — and note the test bans the
// ABBREVIATIONS too, so do not name them even inside a comment explaining the
// rule. That is how this file failed the suite on its first run.
// HKCT, Chow Tai Fook, CTS, Arup and ThreeSixty stay named.
// ⚠ DotAI is deliberately invisible in EN (ruling 2026-08-02) — the English
// twins describe the bootcamp without naming it.

const verticals = [
  {
    slug: 'ai-training-healthcare-hong-kong',
    order: 1,
    zh: {
      title: '醫護人員的 AI 應用培訓',
      metaTitle: '醫護 AI 培訓（香港）— 把時間還給病人',
      lede: '為醫生、護理及專職醫療人員而設。不觸碰臨床決策，只處理臨床以外那一半工作。',
      answer:
        '醫護人員的時間，大量消耗在臨床判斷以外——行政文書、查證指引、跟進文獻。'
        + '這個課程只處理這一部分：以 AI 整理文件、快速查證，'
        + '以及病人資料必須先去識別化才可使用的做法。'
        + '重點不在於「可不可以用 AI」，而在於資料最終存放在哪一台伺服器——'
        + '那才是私隱風險的真正所在。課程不提供臨床建議，亦不取代專業判斷。',
      bullets: [
        '把一篇論文變成可以對話的討論對手，用於文獻會議前的準備',
        '病人資料去識別化的實際做法，以及在非官方工具上的處理原則',
        '把會議或個案錄音，整理成需求清單與跟進重點',
        '判斷哪些工作可以交出去、哪些必須留在人手的一條準則',
      ],
      proof: '2026 年 8 月，為香港外科醫學院近百名院士交付兩日 AI 工作坊（粵語、實作為主）。',
      faq: [
        {
          q: '課程會教臨床決策或診斷嗎？',
          a: '不會。課程明確不觸碰臨床決策。導師是 AI 應用培訓師，不是醫療專業人員，'
             + '價值在於把行政與快速查證的工作交給 AI，臨床判斷仍然完全屬於醫護人員。',
        },
        {
          q: '病人資料可以輸入 AI 工具嗎？',
          a: '在非官方提供的工具上，一律先去識別化。即使在機構批准的模型上，'
             + '亦要同時去識別化並確認「協助改善模型」的設定已關閉。'
             + '真正的問題不是在哪裡使用，而是資料的終點落在哪一台伺服器。',
        },
      ],
    },
    en: {
      title: 'AI training for healthcare professionals',
      metaTitle: 'AI Training for Healthcare Professionals — Hong Kong',
      lede: 'For doctors, nursing and allied health. It does not touch clinical decisions — it handles the other half of the job.',
      answer:
        'Healthcare professionals lose most of their non-clinical time to paperwork, '
        + 'checking guidelines and keeping up with the literature. This session covers only '
        + 'that half: using AI to organise documents, verify quickly, and de-identify patient '
        + 'data before it goes anywhere near a tool. The real question is not whether AI may '
        + 'be used, but which server the data ends up on. No clinical advice is given and no '
        + 'professional judgement is replaced.',
      bullets: [
        'Turn a paper into a sparring partner before a journal club',
        'How to de-identify patient data, and the rule for non-approved tools',
        'Turn a meeting or case recording into a requirements list and follow-ups',
        'One test for what can be handed over and what stays with a person',
      ],
      proof: 'August 2026 — a two-day, hands-on AI workshop delivered in Cantonese for close to a '
             + 'hundred Fellows of the College of Surgeons of Hong Kong.',
      faq: [
        {
          q: 'Does this cover clinical decision-making or diagnosis?',
          a: 'No. The session explicitly stays out of clinical decisions. The trainer is an AI '
             + 'adoption specialist, not a clinician. The value is in handing administrative and '
             + 'fast-research work to AI; clinical judgement stays entirely with the clinician.',
        },
        {
          q: 'Can patient data go into an AI tool?',
          a: 'On any tool your organisation has not provided, de-identify first, without exception. '
             + 'Even on an approved model, de-identify and confirm the improve-the-model setting is '
             + 'off. The question is not where you are using it — it is where the endpoint is.',
        },
      ],
    },
  },

  {
    slug: 'ai-training-teachers-hong-kong',
    order: 2,
    zh: {
      title: '教師的 AI 應用培訓',
      metaTitle: '教師 AI 培訓（香港）— 備課、出題、家長溝通',
      lede: '為中小學及專上教師而設。三件最消耗時間的事，逐件處理。',
      answer:
        '備課、出題與家長溝通，是教師日常最常見亦最消耗的三件事。'
        + '課程示範由課程大綱生成練習與評估、把冗長的家長訊息整理成可直接回覆的草稿，'
        + '並正面處理學生用 AI 交功課的問題——不是禁止，'
        + '而是把要求改成 AI 代做不到的形式。'
        + '導師的角色是與教師一同把 AI 放進原有流程，專業判斷仍然留在教師手上。',
      bullets: [
        '由課程大綱生成練習、評估與差異化教材',
        '把冗長的家長訊息，整理成可以直接發出的回覆草稿',
        '重新設計功課要求，令 AI 代做不到，而不是靠偵測',
        '一條判斷學生是否過度依賴的準則',
      ],
      proof: '2026 年 7 至 8 月，為香港專業進修學校（港專）設計並帶領首輪「AI+」教師短期課程系列；'
             + '2026 年 4 月於港專教職員發展日主講，出席教職員約四百人。',
      faq: [
        {
          q: '學生用 AI 交功課，應該禁止嗎？',
          a: '偵測工具並不可靠，禁止亦難以執行。課程處理的方向是重新設計評估——'
             + '把要求改成需要學生自己的判斷、過程或本地脈絡才做得到的形式，'
             + 'AI 代勞的空間自然收窄。',
        },
        {
          q: '這是教學法課程還是工具課程？',
          a: '以工具為入口，但落點在流程。每個示範都對應教師實際要交的東西——'
             + '一份練習、一份評估、一則家長回覆——而不是抽離的功能介紹。',
        },
      ],
    },
    en: {
      title: 'AI training for teachers',
      metaTitle: 'AI Training for Teachers — Hong Kong',
      lede: 'For secondary and tertiary teachers. The three things that eat the week, handled one at a time.',
      answer:
        'Lesson preparation, setting assessments and parent communication are the three heaviest '
        + 'recurring tasks in teaching. This session generates exercises and assessments from a '
        + 'course outline, turns long parent messages into a reply you can send, and addresses '
        + 'students using AI for homework head-on — not by banning it, but by rewriting the task '
        + 'so AI cannot do it for them. Professional judgement stays with the teacher.',
      bullets: [
        'Generate exercises, assessments and differentiated material from an outline',
        'Turn a long parent message into a reply that is ready to send',
        'Redesign assessment so AI cannot substitute, instead of relying on detection',
        'One test for whether a student has become over-reliant',
      ],
      proof: 'July–August 2026 — designed and led the first round of the "AI+" short-course series '
             + 'for teachers at Hong Kong College of Technology (HKCT); April 2026 — staff development '
             + 'day keynote to roughly four hundred HKCT staff.',
      faq: [
        {
          q: 'Should students be banned from using AI for homework?',
          a: 'Detection tools are unreliable and bans are hard to enforce. The session works on '
             + 'assessment design instead: rewrite the task so it needs the student’s own '
             + 'judgement, process or local context, and the room for substitution closes on its own.',
        },
        {
          q: 'Is this a pedagogy course or a tools course?',
          a: 'Tools are the entry point; the destination is workflow. Every demonstration produces '
             + 'something a teacher actually has to hand in — an exercise, an assessment, a parent '
             + 'reply — rather than a feature tour.',
        },
      ],
    },
  },

  {
    slug: 'ai-training-nonprofit-hong-kong',
    order: 3,
    zh: {
      title: '社福機構及 NGO 的 AI 應用培訓',
      metaTitle: '社福機構 AI 培訓（香港）— 資助申請、個案紀錄、社區推廣',
      lede: '為社工、服務主任及項目同事而設。人手最缺的地方，先處理哪一項。',
      answer:
        '撰寫資助申請與成效報告、整理個案紀錄、製作社區推廣文宣，'
        + '是社福機構常見但極耗人力的工作，而人手往往正是最缺的一項。'
        + '課程處理這三類文書的實際用法，'
        + '同場交代服務對象個人資料的處理原則，'
        + '以及在資源有限之下應該先自動化哪一項——'
        + '不是最煩的那一項，是最規律的那一項。',
      bullets: [
        '由服務數據生成資助申請與成效報告的初稿',
        '個案紀錄整理，以及服務對象資料的處理界線',
        '社區推廣文宣與一週內容行事曆',
        '一條排序準則：哪些工序可以交予 AI，哪些必須保留人手覆核',
      ],
      proof: '2026 年 7 月，為港專「AI+」學校及社福機構試堂交付課程；'
             + '2026 年 6 月，為一個大灣區家庭基金的基層婦女 AI 課程授課。',
      faq: [
        {
          q: '服務對象的個人資料可以用 AI 處理嗎？',
          a: '姓名、住址、身份證號碼、聯絡方法及可識別的個案細節屬於紅燈類別，'
             + '不應輸入任何非機構提供的工具。可行的做法是先去識別化，'
             + '把個案改寫成不具名的情境再處理。',
        },
        {
          q: '機構資源有限，應該先自動化哪一項？',
          a: '先看規律程度，不是先看煩厭程度。每月格式相同的成效報告，'
             + '比每次都不同的個案處理更值得先做——'
             + '規律的工序做一次設定可以重用，不規律的每次都要重新判斷。',
        },
      ],
    },
    en: {
      title: 'AI training for NGOs and social service organisations',
      metaTitle: 'AI Training for NGOs — Hong Kong',
      lede: 'For social workers, service leads and programme staff. Where headcount is thinnest, what to automate first.',
      answer:
        'Funding applications and outcome reports, case notes, and community publicity are common '
        + 'and extremely labour-intensive in social service work — and labour is usually the '
        + 'scarcest thing available. This session covers the practical use of AI on those three, '
        + 'the handling rules for service users’ personal data, and which task to automate '
        + 'first when resources are limited: not the most irritating one, the most regular one.',
      bullets: [
        'Draft funding applications and outcome reports from service data',
        'Organise case notes, and where the line sits on service-user data',
        'Community publicity copy and a weekly content calendar',
        'A priority rule for what can be handed to AI and what needs human review',
      ],
      proof: 'July 2026 — delivered the "AI+" taster for schools and social service organisations '
             + 'at HKCT; June 2026 — taught an AI class for grassroots women for a Greater Bay '
             + 'Area family foundation.',
      faq: [
        {
          q: 'Can service users’ personal data be processed with AI?',
          a: 'Names, addresses, ID numbers, contact details and identifiable case details are the '
             + 'red tier and should not enter any tool the organisation has not provided. The '
             + 'workable path is to de-identify first — rewrite the case as an anonymous scenario.',
        },
        {
          q: 'With limited resources, what should be automated first?',
          a: 'Judge by regularity, not by irritation. A monthly outcome report in a fixed format is '
             + 'a better first target than casework that differs every time: a regular task is set '
             + 'up once and reused, an irregular one needs fresh judgement each round.',
        },
      ],
    },
  },

  {
    slug: 'ai-training-sme-owners-hong-kong',
    order: 4,
    zh: {
      title: '中小企老闆的 AI 應用培訓',
      metaTitle: '中小企 AI 培訓（香港）— 以一當五',
      lede: '為東主、創業者及家族企業而設。直接處理取捨：哪一道工序真的慳到錢。',
      answer:
        '中小企東主一人身兼數職，由產品、推廣到客戶服務都要親自處理，'
        + '資源有限而工作不減。課程直接處理取捨問題：'
        + '哪一道工序用 AI 是真的省到錢，哪些只是看起來先進。'
        + '同場示範以 AI 開一條子品牌去試市場——成本低到可以錯，錯完再試——'
        + '並講解一人公司如何靠 AI 維持日常運作。',
      bullets: [
        '一套判斷投入是否值得的框架，先算工序再算工具',
        '以 AI 快速開一條子品牌，用低成本測試市場反應',
        '報價、跟進、客戶查詢分流的自動化做法',
        '一個當週就可以啟動的市場測試',
      ],
      proof: '2026 年 6 至 8 月，與 DotAI 共同設計並任教「AI Builder」實戰訓練營第一期，25 個實體名額全數售出；'
             + '2026 年 6 月於電子商貿創新博覽 2026 擔任座談講者。',
      faq: [
        {
          q: '公司規模好細，值唔值得投放時間學 AI？',
          a: '規模細反而更快見效，因為決策鏈短、流程改動不需開會。'
             + '關鍵是先揀一道每星期都重複、而且格式固定的工序，'
             + '做一次設定重用整年，而不是全公司一起轉。',
        },
        {
          q: '應該先買工具，還是先改流程？',
          a: '先改流程。工具在未知道要解決哪一道工序之前買下來，通常會變成一筆訂閱費用。'
             + '課程的次序是先拆解工序，再決定需不需要付費工具。',
        },
      ],
    },
    en: {
      title: 'AI training for small business owners',
      metaTitle: 'AI Training for SME Owners — Hong Kong',
      lede: 'For owners, founders and family businesses. The trade-off, handled directly: which task actually saves money.',
      answer:
        'A small-business owner covers several roles at once — product, marketing, customer service '
        + '— with limited resources and no reduction in work. This session goes straight at the '
        + 'trade-off: which task genuinely saves money with AI, and which only looks advanced. It '
        + 'also demonstrates spinning up a sub-brand to test a market cheaply enough to be wrong, '
        + 'and how a one-person company keeps running on AI.',
      bullets: [
        'A framework for judging whether the investment is worth it — task first, tool second',
        'Spin up a sub-brand to test market response at low cost',
        'Automate quoting, follow-up and inbound enquiry triage',
        'One market test you can start the same week',
      ],
      proof: 'June–August 2026 — co-designed and taught a hands-on AI builders bootcamp whose 25 '
             + 'in-person seats sold out; June 2026 — panellist at the E-commerce Innovation Expo 2026.',
      faq: [
        {
          q: 'My company is very small — is it worth the time?',
          a: 'Small is an advantage here: the decision chain is short and changing a process does '
             + 'not need a meeting. The trick is to pick one task that repeats weekly in a fixed '
             + 'format, set it up once and reuse it, rather than moving the whole company at once.',
        },
        {
          q: 'Should I buy tools first or change the process first?',
          a: 'Process first. A tool bought before you know which task it solves usually becomes a '
             + 'subscription line item. The order here is to break the task down, then decide '
             + 'whether a paid tool is needed at all.',
        },
      ],
    },
  },

  {
    slug: 'ai-training-executive-assistants-hong-kong',
    order: 5,
    zh: {
      title: '行政支援及行政助理的 AI 應用培訓',
      metaTitle: '行政助理 AI 培訓（香港）— 由錄音到待辦清單',
      lede: '為行政助理、營運及秘書處同事而設。由做過這個崗位的人講起。',
      answer:
        '會議紀錄、行程協調、跨時區跟進，以及老闆要的那一頁摘要，'
        + '是行政支援崗位最花時間的部分。'
        + '課程由這個崗位的角度講起，示範把一段會議錄音變成需求清單、'
        + '待辦事項與跟進重點，直接接上原有的工作流程，而覆核仍然由人負責。',
      bullets: [
        '把一段會議錄音，變成需求清單、待辦事項與跟進重點',
        '跨時區行程協調與收件匣分流',
        '把散亂的資料，整理成老闆要的那一頁摘要',
        '排程一個在上班之前已經完成整理的 AI 任務',
      ],
      proof: '導師曾任 ThreeSixty Group 總裁行政助理，及 RENPHO 行政總裁行政助理；'
             + '2026 年為一間香港食品製造商多個部門交付 AI 應用工作坊。',
      faq: [
        {
          q: '會議錄音可以直接交給 AI 嗎？',
          a: '先確認錄音獲得同意，再看內容。涉及人事、薪酬、未公佈的商業決定，'
             + '應先去識別化或只擷取需要的段落。一般的項目會議，'
             + '在機構批准的工具上處理是可行的。',
        },
        {
          q: '整理出來的清單準確嗎？',
          a: '準確度足以做初稿，不足以直接發出。課程的做法是 AI 負責提煉、人負責覆核，'
             + '而覆核一份已經成形的清單，比由零開始寫快得多。',
        },
      ],
    },
    en: {
      title: 'AI training for executive assistants and operations',
      metaTitle: 'AI Training for Executive Assistants — Hong Kong',
      lede: 'For EAs, operations and secretariat staff. Taught by someone who held the job.',
      answer:
        'Minutes, diary coordination, cross-timezone follow-up and the one-page summary the boss '
        + 'wants are where executive support time actually goes. This session is taught from inside '
        + 'that role: turning a meeting recording into a requirements list, to-dos and follow-up '
        + 'points that plug into the workflow already in place, with review staying with a person.',
      bullets: [
        'Turn a meeting recording into a requirements list, to-dos and follow-ups',
        'Cross-timezone diary coordination and inbox triage',
        'Turn scattered material into the one-page summary the boss asked for',
        'Schedule an AI task that has finished the tidying before you arrive',
      ],
      proof: 'The trainer served as Executive Assistant to the President of ThreeSixty Group and as '
             + 'Executive Assistant to the CEO of RENPHO; in 2026 he delivered AI workshops '
             + 'across several departments of a Hong Kong food manufacturer.',
      faq: [
        {
          q: 'Can a meeting recording go straight into an AI tool?',
          a: 'Confirm the recording was consented to, then look at the content. Anything touching '
             + 'personnel, pay or unannounced commercial decisions should be de-identified or '
             + 'clipped first. An ordinary project meeting is workable on an approved tool.',
        },
        {
          q: 'How accurate is the list it produces?',
          a: 'Accurate enough for a first draft, not accurate enough to send. The method is that AI '
             + 'extracts and a person reviews — and reviewing a list that already exists is far '
             + 'faster than writing one from nothing.',
        },
      ],
    },
  },
];

export const VERTICAL_SLUGS = verticals.map((v) => v.slug);

export const getVertical = (slug) => verticals.find((v) => v.slug === slug);

export default verticals;
