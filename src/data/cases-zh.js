import cases from './cases';

// Chinese layer over the case ledger.
//
// `cases.js` says "DO NOT edit values here without Sam's sign-off" and it means
// it — the receipts are quoted from sources on record. So this file does NOT
// copy a single figure. It supplies Chinese for the four DESCRIPTIVE fields
// only (org, title, type, summary), and `zhCases` merges them over the real
// record, which stays the sole source of `period`, `scale`, `receipts`,
// `blogSlug`, `image` and `deepDive`. A number cannot drift between the two
// languages because there is only one copy of it.
//
// Two consequences of that rule, both deliberate:
//   - `receipts` render in English on the Chinese page. They contain verbatim
//     participant quotes; translating what somebody said, without them saying
//     it, is not a translation.
//   - Anonymised orgs use the wording already approved in Sam's 2026-07-12
//     ruling. `garden` is the precedent — cases.js already carries
//     「一間香港食品製造商」 — and every other anonymised entry follows it.
const ZH = {
  bochk: {
    org: '一間香港大型銀行',
    title: '多節企業 AI 培訓計劃',
    type: '企業培訓',
    summary: '為銀行團隊設計並交付的多節培訓——把 prompt 技巧用在真實的銀行工作流程上，每節課後都做評估。',
  },
  garden: {
    org: '一間香港食品製造商',
    title: '逐個部門推行的 AI Pioneer Program',
    type: '工作坊計劃',
    summary: '香港其中一個最為人熟悉的食品品牌，逐個部門推行 AI——每一批對應該團隊的實際工作，每一批都量度，每一批帶出下一批。',
  },
  ctf: {
    org: '周大福',
    title: '設有創新評審的 AI 工作坊計劃',
    type: '工作坊計劃',
    summary: '為亞洲其中一個最大的珠寶集團而設的工作坊系列，以一場實作衝刺作結：五隊人、三小時、五份完整的市場推廣方案。',
  },
  hkct: {
    org: 'HKCT 香港專業進修學校',
    title: '由 400 人的教職員發展日，到 24 個月的 AI 學習社群',
    type: '主題演講 + 培訓系列',
    summary: '由一場教職員發展主題演講開始，最後變成一項機構層面的承諾：為期 24 個月、每月一節的學習社群。',
  },
  'ypo-la': {
    org: 'YPO — The AI Advantage Summit（洛杉磯）',
    title: '峰會主題演講 + AI 魔術騷',
    type: '主題演講',
    summary: '飛到洛杉磯，向一室的企業總裁現場示範 AI 真正做到甚麼——即場、無腳本、在台上做。',
  },
  'playmates-hk': {
    org: '一間國際玩具公司',
    title: '分層的員工 AI 培訓計劃',
    type: '企業培訓',
    summary: '兩層結構：全員的認知課，加上有需要團隊的深入課——大部分中型企業真正需要的，其實就是這個模式。',
  },
  openclaw: {
    org: 'DotAI × OpenClaw',
    title: '發布直播 + AI Agent 課堂',
    type: '主題演講 + 工作坊',
    summary: '由四位數觀眾的直播，到小班實作教人跑 AI agent——同一個計劃裡涵蓋了整個光譜。',
  },
  publicis: {
    org: '一間國際廣告集團（香港）',
    title: '全公司 AI 認知網上講座',
    type: '網上講座',
    summary: '一場網上講座覆蓋整個廣告網絡的香港業務——只有廣播形式才做得到的認知規模。',
  },
  cts: {
    org: '香港中國旅行社',
    title: '企業 AI 培訓',
    type: '企業培訓',
    summary: '為香港旅遊業其中一個最老牌的名字提供企業 AI 培訓。',
  },
  novajoy: {
    org: 'Novajoy',
    title: 'AI 創意 + Showroom Builder 工作坊系列',
    type: '工作坊系列',
    summary: '創意製作的工作坊系列——參加者做出來的是 AI 生成的 showroom，不是簡報。',
  },
  dorich: {
    org: 'DoRich',
    title: '高管 AI 教練歷程',
    type: '一對一教練',
    summary: '長線的做法：每週高管顧問、CEO 一對一教練，加上一個導師培訓班，讓能力留在公司內部。',
  },
  'adaptig-ttt': {
    org: 'Adaptig 導師培訓',
    title: '全球導師班',
    type: '導師培訓',
    summary: '教教 AI 的人：把實踐者變成 AI 導師的班別，跨時區進行。',
  },
  'dotai-academy': {
    org: 'DotAI Academy',
    title: '粵語公開班 + AI Builders 訓練營',
    type: '公開班',
    summary: '面向在職人士的粵語 AI 公開班——職場 AI、市場推廣、no-code agent——再加一個第一屆就滿額的訓練營。',
  },
  'garden-csr': {
    org: '一間香港食品製造商 — CSR 兒童 AI 工作坊',
    title: '兒童慈善 AI 工作坊',
    type: '社區',
    summary: '同樣的工具，不同的課室：一個下午，教基層家庭的小朋友用 AI 創作。',
  },
  'expo-panel': {
    org: '生產力促進局 — 網上營商博覽 2026',
    title: '座談：AI × MarTech — 慳時間，賣多啲',
    type: '座談',
    summary: '討論 AI 到底在哪裡真的為市場推廣團隊省時間——實踐者的答案，不是供應商的答案。',
  },
  'hk-bank': {
    org: '一間香港銀行',
    title: '企業 AI 培訓',
    type: '企業培訓',
    summary: '按銀行合規現實裁剪的 AI 基礎課。',
  },
  'jewellery-retailer': {
    org: '一間香港大型珠寶零售商',
    title: '兩節培訓：設計上的 AI、營運上的 AI',
    type: '企業培訓',
    summary: '兩個課室，兩份很不同的工作：珠寶設計用的 AI 和營運用的 AI，各有各的一節。',
  },
  'ecommerce-saas': {
    org: '亞洲一個領先的電商 SaaS 平台',
    title: '兩日企業 AI 培訓',
    type: '企業培訓',
    summary: '和一隊為網店商戶開發軟件的產品團隊做了兩日——AI 用在他們的開發與支援流程上。',
  },
  'pet-retailer': {
    org: '歐洲最大寵物用品零售商的亞洲分部',
    title: 'SPARK Productivity + SPARK Creativity 工作坊',
    type: '工作坊',
    summary: '一間歐洲跨國企業的香港辦公室：一場講怎樣拿回時間，一場講創意製作。',
  },
  'parent-workshop': {
    org: '一間香港中學的家長教師會',
    title: '「AI 與未來」家長工作坊',
    type: '社區',
    summary: '家長問的都是真問題——功課、螢幕時間、將來還有甚麼工作——用粵語老實回答，不吹水。',
  },
  'us-coaching': {
    org: '經合作夥伴轉介的美國企業',
    title: '遙距一對一高管 AI 教練',
    type: '一對一教練',
    summary: '為美國創辦人與高管做的遙距一對一——由選工具到做出成品，一節內完成。',
  },
};

// Merge, never replace. An id missing from ZH falls back to the English record
// rather than disappearing from the Chinese page.
const zhCases = cases.map((entry) => ({ ...entry, ...(ZH[entry.id] || {}) }));

export default zhCases;
