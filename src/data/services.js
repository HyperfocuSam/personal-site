const services = [
  {
    id: 'workshops',
    category: 'organizations',
    anchor: 'organizations',
    title: 'Adaptig Workshops',
    subtitle: 'From unsure to unstoppable',
    provider: 'Adaptig',
    description: `Practical, human-first workshops that move people from hesitation to real application.

**What this looks like:**
- Psychological safety first, then practical skills
- Guided discovery so teams find their own use cases
- Exercises tied to real workflow problems, not generic demos
- Follow-through support to turn momentum into habits`,
    cta: 'Explore Adaptig',
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
    description: `Most training creates short-term excitement. This one builds working behavior.

**Ideal for teams that need:**
- AI adoption in compliance-heavy environments
- Better prompting, workflow design, and decision support
- Clear, role-based use cases across departments
- Practical wins leadership can measure`,
    cta: 'Talk About Your Team',
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
    description: `For leadership sessions, conferences, and internal events where teams need clarity, not hype.

**Formats:**
- Keynotes (30-60 min)
- Executive briefings
- Panel conversations and Q&A
- Hands-on conference workshops`,
    cta: 'Discuss Your Event',
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
    subtitle: 'Your questions, your pace, your real projects',
    description: `For professionals who want practical progress with AI in their own work context.

No generic curriculum. We start from where you are and build from there.`,
    cta: 'Talk About Fit',
    ctaLink: '/contact',
    external: false,
    relatedPosts: ['polyu-finance-ai-workflow'],
    tiers: [
      {
        id: 'discovery-call',
        title: 'Discovery Call (Free, 30 min)',
        description: 'Not sure if coaching is right for you? Let us talk through your goals.',
        cta: 'Book Discovery Call',
        ctaLink: 'https://ro.am/samwong/',
        external: true,
      },
      {
        id: 'standard-coaching',
        title: 'AI Coaching Sessions (Standard)',
        description: '60-90 minute sessions focused on your live projects and workflows.',
        cta: 'Book Coaching Session',
        ctaLink: 'https://ro.am/samwong/',
        external: true,
      },
      {
        id: 'executive-advisory',
        title: 'Executive AI Advisory (Premium)',
        description: 'Ongoing strategic partnership for leaders navigating AI transformation.',
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
    description: `A recruitment-focused pathway for trainers, facilitators, consultants, HR leaders, and educators who want to teach practical AI confidently.

**What trainers get:**
- Adaptig facilitation methodology
- Complete workshop materials and delivery structure
- Trainer community and support
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
