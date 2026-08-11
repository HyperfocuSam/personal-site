// FAQ content, extracted from the JSON-LD that used to live inline in
// Services.js and About.js.
//
// Those pages shipped a FAQPage schema whose questions appeared NOWHERE in the
// rendered HTML — grepping the live pages for the question strings returned
// zero matches. That is the exact profile Google issues structured-data manual
// actions for, and it wasted good copy: these answers are written to be lifted
// by AI engines, which cannot lift what is not on the page.
//
// One array per page drives BOTH the visible block and the schema, the way
// components/Home/HomeFAQ.js already does it.

export const servicesFaqs = [
  {
    q: 'What types of AI training does Sam Wong offer?',
    a: 'Sam Wong offers corporate AI workshops through Adaptig, multi-session AI Pioneer Programs for cohort-based learning, 1-1 AI coaching for professionals, Train-the-Trainer certification programs, and keynotes and event sessions. Services are available for organizations, individuals, and aspiring AI trainers.',
  },
  {
    q: 'Who are Sam Wong\'s typical clients for AI training?',
    a: 'Sam Wong works with enterprises across banking, retail, education, engineering, tourism, and technology sectors. Notable clients include a major Hong Kong bank with 1,530 participants across 13 countries, Chow Tai Fook (three repeat engagements), Hong Kong Jockey Club, HSBC, Arup, PolyU, Mattel, Toyota, and YPO.',
  },
  {
    q: 'What results can teams expect from corporate AI workshops?',
    a: 'Workshops achieve a 9.2/10 average satisfaction rating. The focus is on behavior change rather than tool awareness — teams learn to integrate AI into their actual daily workflows. Multi-session Pioneer Programs have shown participants saving 5-8 hours per week through AI-assisted workflow redesign.',
  },
  {
    q: 'What is the Adaptig Train-the-Trainer program?',
    a: 'The Adaptig Train-the-Trainer program is a certification path for trainers, consultants, HR leaders, and educators who want to teach AI with confidence. Participants receive the Adaptig facilitation methodology, complete workshop materials and delivery structure, trainer community support, certification, and ongoing delivery opportunities through a global network spanning North America, Latin America, Europe, and Asia-Pacific.',
  },
  {
    q: 'How does Sam Wong\'s AI coaching work?',
    a: 'AI coaching is personalized 1-1 sessions starting from the individual\'s current role, tools, and constraints — no generic curriculum. There are three tiers: a free 30-minute discovery call, standard 60-90 minute sessions focused on active projects, and premium executive AI advisory for leaders navigating AI transformation decisions. Over 300 one-on-one sessions across industries.',
  },
  {
    q: 'What is the AI Pioneer Program model?',
    a: 'The AI Pioneer Program is a multi-session cohort approach (typically 6 sessions over 6 weeks) based on change management principles. Instead of training everyone at once, 10-20 curious and influential people are selected and trained deeply. They work on real tasks from their actual jobs each week. These Pioneers then become internal champions who drive adoption across the wider organization.',
  },
  {
    q: 'Where is Sam Wong based and what languages does he work in?',
    a: 'Sam Wong is based in Hong Kong and available globally, with particular focus across the Asia-Pacific region. He delivers training in English and Cantonese. Workshops have been delivered to teams across 13 countries.',
  },
  {
    q: 'How much does corporate AI training cost in Hong Kong?',
    a: 'Corporate training typically runs HKD 15,000–50,000 per session or day, depending on format and depth — contact me for a scoped quote. Sam Wong offers half-day and full-day workshops, multi-session Pioneer Programs (typically 6 sessions over 6 weeks), and executive advisory packages. Some programs may be eligible for Hong Kong government funding schemes.',
  },
  {
    q: 'Are AI training workshops available in Cantonese?',
    a: 'Yes. Sam Wong delivers AI training in both English and Cantonese, making workshops accessible to Hong Kong teams regardless of language preference. Materials can be provided in English, Traditional Chinese, or bilingual formats.',
  },
  {
    q: 'What industries does Sam Wong provide AI training for in Hong Kong?',
    a: 'Sam Wong has delivered AI training across banking and finance (a major Hong Kong bank, HSBC), retail and luxury (Chow Tai Fook, an international toy company), engineering (Arup, a major Hong Kong utility), education (PolyU, HKCT), tourism (Hong Kong Jockey Club), and professional services. Workshop content is customized to each industry\'s workflows, compliance requirements, and use cases.',
  },
];

export const aboutFaqs = [
  {
    q: 'Who is Sam Wong?',
    a: 'Sam Wong is Co-Founder & Director of Academy at Adaptig, a Hong Kong-based AI train-the-trainer who has personally trained 10,000+ professionals across 70+ organizations. He co-founded Adaptig, a global AI trainer network spanning 4 continents and 8 languages, where he is Co-Founder & Director of Academy. He focuses on practical, human-first AI adoption that changes behavior, not just builds awareness.',
  },
  {
    q: 'What is Sam Wong\'s background?',
    a: 'Sam Wong holds a Master of Arts in Public & Comparative History from the Chinese University of Hong Kong, specializing in records management and knowledge systems. His career moved from Executive Assistant to the President of ThreeSixty Group (Sharper Image / FAO Schwarz) to AI Product Manager at RENPHO, where he built an AI division from scratch. In 2024, he started AICBO — free 1-on-1 AI tutoring — which grew into 300 coaching sessions and led to co-founding Adaptig.',
  },
  {
    q: 'What organizations does Sam Wong work with?',
    a: 'Sam Wong works with Adaptig (Adaptig Group Limited), a global AI trainer network he co-founded spanning North America, Latin America, Europe, and Asia-Pacific. His enterprise clients include a major Hong Kong bank, Chow Tai Fook, Hong Kong Jockey Club, HSBC, Arup, PolyU, Mattel, Toyota, China Travel Service, and HKCT.',
  },
  {
    q: 'What is Sam Wong\'s training approach?',
    a: 'Sam Wong\'s approach is built on four principles: humans are the point (AI is a tool, the goal is meaningful work), start with the smallest step (small wins compound into real change), psychological safety comes first (people don\'t adopt what they fear), and frameworks beat features (tools change, thinking patterns endure). He emphasizes behavior change over tool training.',
  },
];

export default { servicesFaqs, aboutFaqs };
