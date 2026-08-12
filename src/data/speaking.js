// Speaking topics, engagements and the organiser promise.
//
// Extracted from src/pages/Speaking.js when /zh/speaking was added. `year` and
// `stat` are facts and live here once, so the two language pages can never
// disagree about a number — the Chinese page overlays only prose
// (src/data/speaking-zh.js), exactly as cases-zh.js does over cases.js.
//
// Client names follow Sam's 2026-07-12 anonymisation ruling: the bank, the
// technology company, the business publication and the youth programme are
// described, not named.

export const topics = [
  {
    id: 'practical-adoption',
    title: 'Practical AI Adoption for Teams',
    description:
      'Move beyond awareness into real daily usage. Teams leave with workflows they can apply the next morning.',
  },
  {
    id: 'human-side',
    title: 'The Human Side of AI Transformation',
    description:
      'Why adoption stalls at the people layer, not the technology layer. Psychological safety, change management, and building trust.',
  },
  {
    id: 'design-thinking',
    title: 'AI x Design Thinking',
    description:
      'A hackathon-style format that fuses creative problem-solving with AI prototyping. Participants build working solutions in a single session.',
  },
  {
    id: 'leading-change',
    title: 'From Fear to Function: Leading AI Change',
    description:
      'For leaders navigating resistance. How to set the tone, model curiosity, and turn skeptics into champions.',
  },
  {
    id: 'prompting',
    title: 'Prompt Engineering for Business',
    description:
      'Beyond tricks and templates. A structured framework for getting reliable, high-quality output from any LLM.',
  },
  {
    id: 'champions',
    title: 'Building Internal AI Champions',
    description:
      'The Pioneer Program model: train a small cohort deeply, then let them drive adoption across the wider organization.',
  },
];

export const engagements = [
  {
    id: 'ypo',
    year: '2025',
    org: 'YPO Global Event',
    title: 'The 45 Minutes AI Show',
    description: 'Interactive, demo-heavy keynote for YPO members and families in Los Angeles.',
    stat: null,
  },
  {
    id: 'bank',
    year: '2024-25',
    org: 'a major Hong Kong bank',
    title: 'Enterprise AI Training Program',
    description: 'Comprehensive AI adoption training delivered across 51 sessions in 13 countries.',
    stat: '1,530 participants, 9.2/10 satisfaction',
  },
  {
    id: 'miit',
    year: '2025',
    org: 'MIIT (China)',
    title: 'AI Trainers Camp',
    description: 'Keynote at the Ministry of Industry and Information Technology AI Trainers Camp in Chongqing.',
    stat: null,
  },
  {
    id: 'tech-company',
    year: '2025',
    org: 'a global technology company',
    title: 'AI Workplace Experience Day',
    description: 'Featured speaker at a global technology company\'s workplace AI experience event in Hong Kong.',
    stat: null,
  },
  {
    id: 'ctf',
    year: '2025',
    org: 'Chow Tai Fook',
    title: 'AI x Design Thinking Hackathon',
    description: 'Three repeat engagements combining creative problem-solving with hands-on AI prototyping.',
    stat: '3 repeat engagements',
  },
  {
    id: 'polyu',
    year: '2025',
    org: 'HK Polytechnic University',
    title: 'Finance Office Annual Event',
    description: 'Invited keynote for the university\'s finance division annual event.',
    stat: null,
  },
  {
    id: 'hkbu',
    year: '2025',
    org: 'HK Baptist University',
    title: 'History Faculty Learning Day',
    description: 'AI adoption keynote for the History Faculty\'s annual learning day.',
    stat: null,
  },
  {
    id: 'hkct',
    year: '2025-26',
    org: 'HK College of Technology',
    title: 'Teaching Staff L&D Day',
    description: 'Keynote for teaching staff professional development. Invited back for a second year.',
    stat: '2 consecutive years',
  },
  {
    id: 'hkfyg',
    year: '2025',
    org: 'HKFYG',
    title: 'Teachers Development Day',
    description: 'Keynote for the Hong Kong Federation of Youth Groups on AI integration for educators.',
    stat: null,
  },
  {
    id: 'masterclass',
    year: '2025',
    org: 'a local business publication Master Class',
    title: 'Vibe Marketing & AI Employee Mindset',
    description: 'Co-created with a local business publication. Covered the shift from tool awareness to daily AI habit-building.',
    stat: null,
  },
  {
    id: 'youth-leadership',
    year: '2025',
    org: 'a youth leadership workshop',
    title: 'AI for Emerging Leaders',
    description: 'Workshop designed for Hong Kong\'s next generation of leaders, focusing on practical AI literacy.',
    stat: null,
  },
  {
    id: 'everyone-ai',
    year: '2025-26',
    org: 'DotAI',
    title: 'Everyone.ai Day Keynote',
    description: 'Opening keynote at DotAI\'s flagship community event. Invited back for 2026.',
    stat: '2 consecutive years',
  },
  {
    id: 'jojo',
    year: '2025',
    org: 'JoJo Ventures',
    title: 'GENAI Summit',
    description: 'Featured speaker at the JoJo Ventures Generative AI Summit in Hong Kong.',
    stat: null,
  },
  {
    id: 'ctgoodjobs',
    year: '2025',
    org: 'CTgoodjobs Future Leader Awards',
    title: 'Judge & Mentor',
    description: 'Invited as judge and mentor, sharing AI entrepreneurship methods with award candidates.',
    stat: null,
  },
  {
    id: 'arup',
    year: '2025',
    org: 'Arup University',
    title: 'AI Lunch & Learn Series',
    description: 'Recurring sessions for engineering professionals on integrating AI into technical workflows.',
    stat: null,
  },
];

export const whatYouGet = [
  {
    id: 'tailored',
    title: 'Tailored Content',
    description: 'Every session is built around your audience, industry, and goals. No generic slide decks.',
  },
  {
    id: 'interactive',
    title: 'Interactive Format',
    description: 'Live demos, audience participation, and hands-on exercises. People leave having done something, not just heard something.',
  },
  {
    id: 'takeaways',
    title: 'Practical Takeaways',
    description: 'Frameworks, templates, and workflows participants can apply immediately. Not theory for theory\'s sake.',
  },
  {
    id: 'delivery',
    title: 'Professional Delivery',
    description: 'Bilingual (English/Cantonese), adaptable to 30-minute keynotes or full-day workshops, in-person or virtual.',
  },
];

export default engagements;
