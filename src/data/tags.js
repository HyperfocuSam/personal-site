// Canonical tag vocabulary for the blog.
//
// Before this file existed there were 108 distinct tags across 98 posts, 44 of
// them used exactly once, and none of them clickable. Three separate problems
// hid inside that number:
//
//   1. Traditional Chinese posts TRANSLATED their tags (`ai-工具` vs `ai-tools`,
//      `方法論` vs `methodology`), so the same concept existed twice and the two
//      halves of the blog could never see each other. That is also why 15 of 27
//      Chinese posts fell through to the generic ServiceCta — the component
//      matches English tag names.
//   2. Several tags only restated the `type` field, which is already rendered as
//      a badge on every entry (`case-study`, `methodology`, `framework`,
//      `commentary`, `reflection`, `insight`, `announcement`).
//   3. Two tags were CLIENT NAMES — `garden` and `publicis` — on posts whose
//      slugs and bodies had already been anonymised. They shipped as
//      <meta property="article:tag"> on the live pages, so the anonymisation
//      ruling of 2026-07-12 was still being broken in the metadata after it had
//      been honoured everywhere a human looks.
//
// One canonical English slug per concept; display names live here, not in the
// data, so a Chinese post and its English pair carry the SAME tag and differ
// only in how it is printed. `src/__tests__/tagVocabulary.test.js` fails the
// build if a post ever introduces a tag that is not on this list.
const TAGS = {
  'ai-adoption': { en: 'AI adoption', zh: 'AI 應用' },
  enterprise: { en: 'Enterprise', zh: '企業' },
  'corporate-training': { en: 'Corporate training', zh: '企業培訓' },
  'ai-tools': { en: 'AI tools', zh: 'AI 工具' },
  productivity: { en: 'Productivity', zh: '生產力' },
  'claude-code': { en: 'Claude Code', zh: 'Claude Code' },
  'ai-agents': { en: 'AI agents', zh: 'AI Agent' },
  workshop: { en: 'Workshops', zh: '工作坊' },
  'hong-kong': { en: 'Hong Kong', zh: '香港' },
  workflow: { en: 'Workflow', zh: '工作流程' },
  speaking: { en: 'Speaking', zh: '演講' },
  automation: { en: 'Automation', zh: '自動化' },
  'ai-writing': { en: 'Writing with AI', zh: 'AI 寫作' },
  'system-design': { en: 'System design', zh: '系統設計' },
  prompts: { en: 'Prompts', zh: '提示詞' },
  coaching: { en: 'Coaching', zh: '一對一教練' },
  international: { en: 'International', zh: '海外' },
  'ai-education': { en: 'Education', zh: '教育' },
  'ai-safety': { en: 'AI safety', zh: 'AI 安全' },
  leadership: { en: 'Leadership', zh: '領導' },
  'train-the-trainer': { en: 'Train-the-Trainer', zh: '導師培訓' },
  'ai-memory': { en: 'AI memory', zh: 'AI 記憶' },
  'multimodal-ai': { en: 'Multimodal AI', zh: '多模態 AI' },
  copilot: { en: 'Microsoft Copilot', zh: 'Microsoft Copilot' },
  gemini: { en: 'Gemini', zh: 'Gemini' },
  notebooklm: { en: 'NotebookLM', zh: 'NotebookLM' },
  career: { en: 'Career', zh: '職涯' },
  families: { en: 'Parents & kids', zh: '親子' },
  adhd: { en: 'ADHD', zh: 'ADHD' },
  ypo: { en: 'YPO', zh: 'YPO' },
  hkpc: { en: 'HKPC', zh: '生產力促進局' },
  banking: { en: 'Banking', zh: '銀行' },
  'food-manufacturing': { en: 'Food manufacturing', zh: '食品製造' },
  advertising: { en: 'Advertising', zh: '廣告' },
  jewellery: { en: 'Jewellery', zh: '珠寶' },
  tourism: { en: 'Tourism', zh: '旅遊' },
  'e-commerce': { en: 'E-commerce', zh: '電商' },
  sme: { en: 'SMEs', zh: '中小企' },
};

export const CANONICAL_TAGS = Object.keys(TAGS);

export const tagLabel = (tag, language) => {
  const entry = TAGS[tag];
  if (!entry) return tag;
  return language === 'zh-Hant' ? entry.zh : entry.en;
};

// A topic is only worth a chip if it both groups enough posts to be a
// destination AND excludes enough to be a filter. `ai-adoption` sits on 64 of 98
// posts — true, and useless as a way to narrow the list — so the upper bound
// drops it while leaving it in the vocabulary, where it still feeds related
// posts and the service CTA.
const MIN_POSTS = 3;
const MAX_SHARE = 0.5;
const MAX_CLUSTERS = 10;

export const topicClusters = (posts) => {
  const counts = new Map();
  posts.forEach((post) => {
    (post.tags || []).forEach((tag) => {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    });
  });

  return [...counts.entries()]
    .filter(([tag, count]) => CANONICAL_TAGS.includes(tag)
      && count >= MIN_POSTS
      && count <= posts.length * MAX_SHARE)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, MAX_CLUSTERS)
    .map(([tag, count]) => ({ tag, count }));
};

export default TAGS;
