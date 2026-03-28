const servicesZh = [
  {
    id: 'workshops',
    category: 'organizations',
    anchor: 'organizations',
    title: 'Adaptig 工作坊',
    subtitle: '由觀望到實戰',
    provider: 'Adaptig',
    description: `最適合需要 AI 應用而唔止係認知嘅領導團隊同部門。

**你會得到：**
- 以人為本嘅引導，降低恐懼同建立信心
- 結合你真實工作流程嘅實戰練習
- 團隊可以即時應用嘅實用案例
- 將學習轉化為習慣嘅跟進指導`,
    cta: '了解 Adaptig 工作坊',
    ctaLink: 'https://adaptig.ai',
    external: true,
    relatedPosts: [
      'bochk-banking-ai-training',
      'ctf-ai-design-thinking-workshop-2026',
    ],
  },
  {
    id: 'keynotes-events',
    category: 'organizations',
    anchor: 'organizations',
    title: '主題演講及活動',
    subtitle: '建立背景、降低恐懼、激發行動',
    provider: 'Sam Wong',
    description: `最適合需要清晰訊號、實用例子同觀眾參與嘅活動。

**可選格式：**
- 主題演講 (30-60 分鐘)
- 高管簡報
- 座談會同問答
- 實戰工作坊`,
    cta: '討論演講或活動',
    ctaLink: '/contact',
    external: false,
    relatedPosts: [
      'hkjc-mt-ai-training',
      'cts-tourism-ai-training',
    ],
  },
  {
    id: 'one-on-one',
    category: 'individuals',
    anchor: 'one-on-one',
    title: '一對一輔導',
    subtitle: '你嘅目標、你嘅節奏、你嘅真實項目',
    description: `最適合想直接支援將 AI 應用到實際工作嘅專業人士。

冇通用課程。我哋由你目前嘅角色、工具同限制開始。`,
    cta: '了解輔導是否適合你',
    ctaLink: '/contact',
    external: false,
    relatedPosts: ['polyu-finance-ai-workflow'],
    tiers: [
      {
        id: 'discovery-call',
        title: '免費諮詢 (30 分鐘)',
        description: '無壓力嘅通話，確定目標同睇吓輔導是否適合你。',
        cta: '預約免費諮詢',
        ctaLink: '/book',
        external: false,
      },
      {
        id: 'standard-coaching',
        title: 'AI 輔導課程 (標準)',
        description: '60-90 分鐘，專注於你嘅進行中項目同工作流程。',
        cta: '預約輔導課程',
        ctaLink: '/book',
        external: false,
      },
      {
        id: 'executive-advisory',
        title: '高管 AI 顧問 (高級)',
        description: '為正在導航 AI 轉型決策嘅領導者提供持續合作夥伴關係。',
        cta: '查詢高管顧問服務',
        ctaLink: '/contact',
        external: false,
      },
    ],
  },
  {
    id: 'train-the-trainer',
    category: 'trainers',
    anchor: 'train-the-trainer',
    title: '培訓師培訓計劃',
    subtitle: '加入橫跨四大洲嘅全球網絡',
    provider: 'Adaptig',
    description: `最適合想自信教授 AI 嘅培訓師、顧問、HR 領導同教育工作者。

**你會得到：**
- Adaptig 引導方法論
- 完整嘅工作坊材料同交付結構
- 培訓師社群同交付支援
- 認證同持續發展機會`,
    cta: '申請加入網絡',
    ctaLink: '/contact?interest=trainer',
    external: false,
    relatedPosts: [
      'ctf-ai-design-thinking-workshop-2026',
      'bochk-banking-ai-training',
    ],
  },
];

export default servicesZh;
