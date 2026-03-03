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
- Follow-through guidance to turn learning into habit`,
    cta: 'Explore Adaptig Workshops',
    ctaLink: 'https://adaptig.ai',
    external: true,
    relatedPosts: [
      'bochk-banking-ai-training',
      'ctf-ai-design-thinking-workshop-2026',
    ],
  },
  {
    id: 'corporate-training',
    category: 'organizations',
    anchor: 'organizations',
    title: 'Corporate AI Training (DotAI)',
    subtitle: 'Designed around your team, your context, your constraints',
    provider: 'DotAI',
    description: `Best for organizations that need role-specific training and measurable outcomes.

**Ideal when you need:**
- Adoption in compliance-heavy or high-accountability environments
- Better prompting and workflow design by role
- Department-specific use cases people can use by next week
- A practical rollout that leadership can evaluate`,
    cta: 'Discuss Corporate Training',
    ctaLink: '/contact',
    external: false,
    relatedPosts: [
      'hkct-ai-education-workshop',
      'arup-ai-lunch-learn',
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
    description: `Best for professionals who want direct support applying AI to real work.

No generic curriculum. We start from your current role, tools, and constraints.`,
    cta: 'Talk About Coaching Fit',
    ctaLink: '/contact',
    external: false,
    relatedPosts: ['polyu-finance-ai-workflow'],
    tiers: [
      {
        id: 'discovery-call',
        title: 'Discovery Call (Free, 30 min)',
        description: 'A no-pressure call to define goals and see if coaching is a fit.',
        cta: 'Book Discovery Call',
        ctaLink: 'https://ro.am/samwong/',
        external: true,
      },
      {
        id: 'standard-coaching',
        title: 'AI Coaching Sessions (Standard)',
        description: '60-90 minute sessions focused on your active projects and workflows.',
        cta: 'Book Coaching Session',
        ctaLink: 'https://ro.am/samwong/',
        external: true,
      },
      {
        id: 'executive-advisory',
        title: 'Executive AI Advisory (Premium)',
        description: 'Ongoing partnership for leaders navigating AI transformation decisions.',
        cta: 'Inquire About Executive Advisory',
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
