// Chinese FAQ content for /zh/services.
//
// Extracted from the FAQPage JSON-LD that used to live inline in ZhServices.js
// with no visible block on the page — the exact defect src/data/faqs.js was
// created to fix on the English side (see that file's header comment). This
// mirrors that pattern via components/FaqSection/FaqSection.js, which renders
// the visible block and the schema from one array so they can never drift.
//
// Voice convention (Sam's ruling, 2026-08-15): QUESTIONS may name Sam Wong —
// they are the searcher's voice and match the query shape. ANSWERS are first
// person — the answers are Sam speaking on his own site.

export const zhServicesFaqs = [
  {
    q: 'Sam Wong 提供哪些類型的 AI 培訓？',
    a: '我透過 Adaptig 提供企業 AI 工作坊、多節 AI Pioneer Program、一對一 AI 輔導、培訓師認證計劃，以及主題演講與活動。服務涵蓋企業、個人及有志成為 AI 培訓師的專業人士。',
  },
  {
    q: '香港企業 AI 培訓的收費是多少？',
    a: '每個合作都在免費 30 分鐘初步諮詢後正式報價——費用視乎人數、語言及後續跟進深度。我提供半日及全日工作坊、多節 Pioneer Program（通常 6 節、歷時 6 星期）、以及高管顧問服務。部分課程可符合 NITTP 資助資格：1:1 配對，每間企業每個財政年度上限 25 萬港元。',
  },
  {
    q: 'AI 培訓工作坊是否有廣東話版本？',
    a: '有。我以英語和廣東話提供 AI 培訓，確保香港團隊無論語言偏好都可以參與。教材可以提供英文、繁體中文或雙語版本。',
  },
  {
    q: 'Sam Wong 在香港為哪些行業提供 AI 培訓？',
    a: '我的 AI 培訓覆蓋銀行及金融業（一間大型香港銀行、匯豐）、零售及奢侈品（周大福、一間國際玩具公司）、工程（奧雅納、一間香港公用事業公司）、教育（理工大學、HKCT）、旅遊（香港賽馬會）及專業服務。工作坊內容根據每個行業的工作流程、合規要求及實際用途度身訂造。',
  },
  {
    q: '企業 AI 工作坊可以預期哪些效果？',
    a: '工作坊平均滿意度達 9.2/10。重點不是認識工具，而是真正改變工作方式——團隊學會將 AI 融入日常工作流程。多節 Pioneer Program 參加者平均每週透過 AI 輔助工作流程設計節省 5-8 小時。',
  },
];

export default zhServicesFaqs;
