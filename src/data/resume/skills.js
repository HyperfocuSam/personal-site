const skills = [
  {
    title: 'Corporate AI Training',
    competency: 5,
    category: ['AI Training', 'Enterprise'],
  },
  {
    title: 'Workshop Facilitation',
    competency: 5,
    category: ['AI Training', 'Facilitation'],
  },
  {
    title: 'Curriculum Design',
    competency: 5,
    category: ['AI Training', 'Facilitation'],
  },
  {
    title: 'Microsoft Copilot',
    competency: 5,
    category: ['AI Tools', 'Enterprise'],
  },
  {
    title: 'ChatGPT / GPT-4',
    competency: 5,
    category: ['AI Tools'],
  },
  {
    title: 'Claude',
    competency: 5,
    category: ['AI Tools'],
  },
  {
    title: 'Prompt Engineering',
    competency: 5,
    category: ['AI Tools', 'AI Training'],
  },
  {
    title: 'AI Workflow Design',
    competency: 5,
    category: ['AI Training', 'Enterprise'],
  },
  {
    title: 'Change Management',
    competency: 4,
    category: ['Enterprise', 'Facilitation'],
  },
  {
    title: 'Canva AI',
    competency: 4,
    category: ['AI Tools', 'Creative'],
  },
  {
    title: 'NotebookLM',
    competency: 4,
    category: ['AI Tools'],
  },
  {
    title: 'Gemini',
    competency: 4,
    category: ['AI Tools'],
  },
  {
    title: 'AI Image Generation',
    competency: 4,
    category: ['AI Tools', 'Creative'],
  },
  {
    title: 'Design Thinking',
    competency: 4,
    category: ['Facilitation', 'Creative'],
  },
  {
    title: 'Train-the-Trainer',
    competency: 5,
    category: ['AI Training', 'Facilitation'],
  },
  {
    title: 'Executive Coaching',
    competency: 4,
    category: ['AI Training', 'Enterprise'],
  },
  {
    title: 'Keynote Speaking',
    competency: 4,
    category: ['Facilitation'],
  },
  {
    title: 'Bilingual Delivery (EN/Cantonese)',
    competency: 5,
    category: ['Facilitation'],
  },
  {
    title: 'AI Product Management',
    competency: 4,
    category: ['Enterprise', 'AI Tools'],
  },
  {
    title: 'AI Safety & Responsible Use',
    competency: 4,
    category: ['AI Training', 'Enterprise'],
  },
  {
    title: 'Python',
    competency: 3,
    category: ['Technical'],
  },
  {
    title: 'Claude Code',
    competency: 4,
    category: ['AI Tools', 'Technical'],
  },
  {
    title: 'React / Web Development',
    competency: 3,
    category: ['Technical'],
  },
  {
    title: 'Automation & Workflows',
    competency: 4,
    category: ['Technical', 'AI Tools'],
  },
].map((skill) => ({ ...skill, category: skill.category.sort() }));

const colors = [
  '#E8845C',
  '#37b1f5',
  '#515dd4',
  '#64cb7b',
  '#cc7b94',
  '#c3423f',
  '#40494e',
];

const categories = [...new Set(skills.flatMap(({ category }) => category))]
  .sort()
  .map((category, index) => ({
    name: category,
    color: colors[index % colors.length],
  }));

export { categories, skills };
