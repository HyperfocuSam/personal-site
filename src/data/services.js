const services = [
  {
    id: 'workshops',
    category: 'organizations',
    anchor: 'organizations',
    title: 'Adaptig Workshops',
    subtitle: 'From unsure to unstoppable',
    provider: 'Adaptig',
    description: `Best for leadership teams and departments that need AI adoption, not just awareness.

**What you get:**
- Human-first facilitation that lowers fear and builds confidence
- Hands-on exercises tied to your real workflows
- Practical use cases teams can apply immediately
- Follow-through guidance to turn learning into habit
- Multi-session Pioneer Programs that build internal AI champions (5-8 hours saved per week per participant)`,
    cta: 'Explore Adaptig Workshops',
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
    title: 'Keynotes & Events',
    subtitle: 'Set context, lower fear, spark action',
    provider: 'Sam Wong',
    description: `Best for events where you need clear signal, practical examples, and audience engagement.

**Available formats:**
- Keynotes (30-60 min)
- Executive briefings
- Panel conversations and Q&A
- Hands-on conference workshops`,
    cta: 'Discuss Speaking or Events',
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
    title: '1-1 Coaching Paths',
    subtitle: 'Your goals, your pace, your real projects',
    description: `Best for professionals who want direct support applying AI to real work. Over 160 individuals coached across finance, marketing, education, and healthcare.

No generic curriculum. We start from your current role, tools, and constraints.`,
    cta: 'Talk About Coaching Fit',
    ctaLink: '/contact',
    external: false,
    relatedPosts: ['polyu-finance-ai-workflow'],
    tiers: [
      {
        id: 'discovery-call',
        level: 'free',
        title: 'Discovery Call',
        label: 'Free, 30 min',
        description: 'A no-pressure call to define goals and see if coaching is a fit.',
        cta: 'Book Free Call',
        ctaLink: '/book',
        external: false,
      },
      {
        id: 'standard-coaching',
        level: 'standard',
        badge: 'Most Popular',
        title: 'AI Coaching Sessions',
        label: 'Per session',
        description: '60-90 minute sessions focused on your active projects and workflows.',
        cta: 'Book Coaching Session',
        ctaLink: '/book',
        external: false,
      },
      {
        id: 'executive-advisory',
        level: 'premium',
        title: 'Executive AI Advisory',
        label: 'Ongoing partnership',
        description: 'For leaders navigating AI transformation decisions. Strategic guidance, not just technical help.',
        cta: 'Inquire',
        ctaLink: '/contact',
        external: false,
      },
    ],
  },
  {
    id: 'train-the-trainer',
    category: 'trainers',
    anchor: 'train-the-trainer',
    title: 'Train-the-Trainer Program',
    subtitle: 'Join a global network across four continents',
    provider: 'Adaptig',
    description: `Best for trainers, consultants, HR leaders, and educators who want to teach AI with confidence.

**What you get:**
- Adaptig facilitation methodology
- Complete workshop materials and delivery structure
- Trainer community and delivery support
- Certification and ongoing opportunities`,
    cta: 'Apply to Join the Network',
    ctaLink: '/contact?interest=trainer',
    external: false,
    relatedPosts: [
      'ctf-ai-design-thinking-workshop-2026',
      'bochk-banking-ai-training',
    ],
  },
];

export default services;
