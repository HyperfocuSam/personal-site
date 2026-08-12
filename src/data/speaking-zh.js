import { topics, engagements, whatYouGet } from './speaking';

// Chinese layer over src/data/speaking.js. Same rule as cases-zh.js: this file
// carries prose only. `year` and `stat` are read from the English record, so a
// figure like 「1,530 participants, 9.2/10 satisfaction」 exists once in the
// codebase and cannot drift between the two pages.
//
// Organisation names that are already anonymised stay anonymised, in the
// wording of Sam's 2026-07-12 ruling.

const overlay = (list, zh) => list.map((item) => ({ ...item, ...(zh[item.id] || {}) }));

export const topicsZh = overlay(topics, {
  'practical-adoption': {
    title: '團隊真正用得起的 AI',
    description: '由知道有這回事，走到每日真的在用。團隊離開時手上有第二朝就用得着的工作流程。',
  },
  'human-side': {
    title: 'AI 轉型的人性面',
    description: '推行卡住的位置從來不在技術層，而在人這一層。心理安全感、變革管理，還有信任怎樣建立。',
  },
  'design-thinking': {
    title: 'AI × 設計思維',
    description: '黑客松形式，把創意解難和 AI 原型製作放在一起。參加者在同一節課裡做出可以運作的方案。',
  },
  'leading-change': {
    title: '由恐懼到可用：帶領 AI 變革',
    description: '給正在面對抗拒的領導者。怎樣定調、怎樣示範好奇心，怎樣把懷疑者變成推動者。',
  },
  prompting: {
    title: '商業用的 Prompt Engineering',
    description: '不是招數和範本。是一套結構化的方法，讓任何一個大型語言模型都給出穩定、能用的輸出。',
  },
  champions: {
    title: '培養內部的 AI 推動者',
    description: 'Pioneer Program 的模式：先深入訓練一小批人，再由他們帶動整個機構。',
  },
});

export const engagementsZh = overlay(engagements, {
  ypo: { org: 'YPO 全球活動', title: 'The 45 Minutes AI Show', description: '在洛杉磯為 YPO 會員及家屬做的互動式演講，以現場示範為主。' },
  bank: { org: '一間香港大型銀行', title: '企業 AI 培訓計劃', description: '橫跨 13 個國家、共 51 節的完整 AI 應用培訓。' },
  miit: { org: '中國工信部', title: 'AI 訓練師訓練營', description: '在重慶舉行的工信部 AI 訓練師訓練營主題演講。' },
  'tech-company': { org: '一間國際科技公司', title: 'AI 職場體驗日', description: '在該公司香港的職場 AI 體驗活動擔任講者。' },
  ctf: { org: '周大福', title: 'AI × 設計思維黑客松', description: '三次回頭合作，把創意解難和實作 AI 原型結合。' },
  polyu: { org: '香港理工大學', title: '財務處周年活動', description: '獲邀為大學財務部門周年活動做主題演講。' },
  hkbu: { org: '香港浸會大學', title: '歷史系學習日', description: '為歷史系周年學習日做的 AI 應用主題演講。' },
  hkct: { org: 'HKCT 香港專業進修學校', title: '教職員專業發展日', description: '為教學團隊做的專業發展演講，第二年再獲邀請。' },
  hkfyg: { org: '香港青年協會', title: '教師發展日', description: '為香港青年協會講教育工作者怎樣把 AI 融入教學。' },
  masterclass: { org: '一份本地財經刊物的大師班', title: 'Vibe Marketing 與 AI 員工思維', description: '與一份本地財經刊物共同設計，講由認識工具走到每日習慣的轉變。' },
  'youth-leadership': { org: '一個青年領袖計劃', title: '給新一代領袖的 AI', description: '為香港下一代領袖設計的工作坊，重點是實用的 AI 素養。' },
  'everyone-ai': { org: 'DotAI', title: 'Everyone.ai Day 開幕演講', description: 'DotAI 旗艦社群活動的開幕演講，2026 年再獲邀請。' },
  jojo: { org: 'JoJo Ventures', title: 'GENAI Summit', description: '在香港舉行的 JoJo Ventures 生成式 AI 峰會擔任講者。' },
  ctgoodjobs: { org: 'CTgoodjobs Future Leader Awards', title: '評審及導師', description: '獲邀擔任評審及導師，與入圍者分享 AI 創業方法。' },
  arup: { org: 'Arup University', title: 'AI Lunch & Learn 系列', description: '為工程專業人員而設的持續系列，講 AI 怎樣融入技術工作流程。' },
});

export const whatYouGetZh = overlay(whatYouGet, {
  tailored: { title: '度身訂造的內容', description: '每一節都圍繞你的聽眾、行業和目標而建。沒有通用簡報。' },
  interactive: { title: '互動形式', description: '現場示範、聽眾參與、實作練習。人離開時是做過一件事，不只是聽過一件事。' },
  takeaways: { title: '拿得走的東西', description: '框架、範本、工作流程，參加者即刻用得着。不是為講理論而講理論。' },
  delivery: { title: '專業交付', description: '中英雙語（粵語／英語），由 30 分鐘演講到全日工作坊都可以，實體或線上皆可。' },
});

export default engagementsZh;
