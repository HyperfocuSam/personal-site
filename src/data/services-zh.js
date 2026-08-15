const servicesZh = [
  {
    id: 'workshops',
    category: 'organizations',
    anchor: 'organizations',
    title: 'Adaptig 工作坊',
    subtitle: '由觀望到實戰',
    provider: 'Adaptig',
    description: `最適合想真正應用 AI、而非只停留在認知層面的領導團隊和部門。

**你會得到：**
- 以人為本的引導，消除顧慮、建立信心
- 結合你真實工作流程的實戰練習
- 團隊可以即時應用的實用案例
- 後續跟進指導，把所學變成日常工作習慣`,
    cta: '了解 Adaptig 工作坊',
    ctaLink: 'https://adaptig.ai',
    external: true,
    relatedPosts: [
      '1500-banking-professionals-ai-adoption',
      'ctf-ai-design-thinking-workshop-2026',
    ],
  },
  {
    id: 'keynotes-events',
    category: 'organizations',
    anchor: 'organizations',
    title: '主題演講及活動',
    subtitle: '建立情境、消除顧慮、激發行動',
    provider: 'Sam Wong',
    description: `最適合需要清晰訊號、實用例子和觀眾參與的活動。

**可選格式：**
- 主題演講 (30-60 分鐘)
- 高管簡報
- 座談會和問答
- 實戰工作坊`,
    cta: '查詢演講或活動',
    ctaLink: '/zh/contact',
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
    subtitle: '你的目標、你的節奏、你的真實項目',
    description: `最適合希望獲得直接支援、將 AI 應用到實際工作的專業人士。

我不會套用標準課程；我會由你目前的崗位、工具和局限出發。`,
    cta: '了解輔導是否適合你',
    ctaLink: '/zh/contact',
    external: false,
    relatedPosts: ['polyu-finance-ai-workflow'],
    tiers: [
      {
        id: 'discovery-call',
        title: '免費諮詢 (30 分鐘)',
        description: '無壓力的通話，確定目標和看看輔導是否適合你。',
        cta: '預約免費諮詢',
        ctaLink: '/zh/book',
        external: false,
      },
      {
        id: 'standard-coaching',
        title: 'AI 輔導課程 (標準)',
        description: '60-90 分鐘，專注於你手上的項目和工作流程。',
        cta: '預約輔導課程',
        ctaLink: '/zh/book',
        external: false,
      },
      {
        id: 'executive-advisory',
        title: '高管 AI 顧問 (高級)',
        description: '為正在處理 AI 轉型決策的領導者提供長期顧問合作。',
        cta: '查詢高管顧問服務',
        ctaLink: '/zh/contact',
        external: false,
      },
    ],
  },
  {
    id: 'train-the-trainer',
    category: 'trainers',
    anchor: 'train-the-trainer',
    title: '培訓師培訓計劃',
    subtitle: '加入橫跨四大洲的全球網絡',
    provider: 'Adaptig',
    description: `最適合想有信心教好 AI 的培訓師、顧問、HR 領導和教育工作者。

**你會得到：**
- Adaptig 引導方法論
- 完整的工作坊材料和授課流程
- 培訓師社群和授課支援
- 認證和持續發展機會`,
    cta: '申請加入網絡',
    ctaLink: '/zh/contact?interest=trainer',
    external: false,
    relatedPosts: [
      'ctf-ai-design-thinking-workshop-2026',
      '1500-banking-professionals-ai-adoption',
    ],
  },
];

export default servicesZh;
