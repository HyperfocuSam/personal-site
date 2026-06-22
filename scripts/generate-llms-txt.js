/**
 * Auto-generate llms.txt and llms-full.txt from blog posts index.
 * Runs as prebuild hook alongside generate-sitemap.js
 *
 * llms.txt — concise overview for AI systems (human + entity context)
 * llms-full.txt — full article catalog grouped by type with excerpts
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://hyperfocusam.com';
const POSTS_FILE = path.join(__dirname, '..', 'src', 'data', 'posts', 'index.js');
const LLMS_FILE = path.join(__dirname, '..', 'public', 'llms.txt');
const LLMS_FULL_FILE = path.join(__dirname, '..', 'public', 'llms-full.txt');

// Reuse the same regex-based parser from generate-sitemap.js
function parsePosts() {
  const content = fs.readFileSync(POSTS_FILE, 'utf-8');
  const posts = [];

  const postRegex = /\{\s*slug:\s*'([^']+)'[\s\S]*?date:\s*'([^']+)'[\s\S]*?featured:\s*(true|false)/g;
  let match;
  while ((match = postRegex.exec(content)) !== null) {
    const blockStart = match.index;
    const blockEnd = content.indexOf('},', blockStart);
    const block = content.substring(blockStart, blockEnd > -1 ? blockEnd : undefined);

    const langMatch = block.match(/language:\s*'([^']+)'/);
    const titleMatch = block.match(/title:\s*'((?:[^'\\]|\\.)+)'/);
    const excerptMatch = block.match(/excerpt:\s*'((?:[^'\\]|\\.)+)'/);
    const typeMatch = block.match(/type:\s*'([^']+)'/);

    const unescape = (s) => s.replace(/\\'/g, "'").replace(/\\\\/g, '\\');

    posts.push({
      slug: match[1],
      date: match[2],
      language: langMatch ? langMatch[1] : 'en',
      title: titleMatch ? unescape(titleMatch[1]) : match[1],
      excerpt: excerptMatch ? unescape(excerptMatch[1]) : '',
      type: typeMatch ? typeMatch[1] : 'insight',
    });
  }

  return posts;
}

// Type labels for the full catalog
const TYPE_LABELS = {
  'case-study': 'Case Studies',
  methodology: 'Methodologies & Frameworks',
  insight: 'Insights & Commentary',
  reflection: 'Personal & Productivity',
  framework: 'Frameworks',
  announcement: 'Announcements',
};

function generateLlmsTxt(posts) {
  const enPosts = posts.filter((p) => p.language === 'en');

  return `# Sam Wong

> AI Training Specialist based in Hong Kong. Helping enterprises and individuals adopt AI through corporate workshops, 1-1 coaching, and Train-the-Trainer programs.

For full context including case studies, frameworks, and blog posts, see: ${SITE_URL}/llms-full.txt

## About

Sam Wong is an AI training specialist who has trained 9,462+ professionals across 66+ organizations in banking, retail, education, engineering, and technology. He co-founded Adaptig (Animo Technology Limited), a global AI trainer network spanning North America, Latin America, Europe, and Asia-Pacific. His approach focuses on behavior change over tool awareness, emphasizing psychological safety and practical workflow integration.

## Services

- **Corporate AI Workshops** (via Adaptig): Half-day to multi-day workshops for leadership teams and departments. Human-first facilitation, hands-on exercises tied to real workflows. Clients include Bank of China (Hong Kong), Chow Tai Fook, Hong Kong Jockey Club, HSBC, Mattel, Toyota, Arup, and PolyU.
- **AI Pioneer Programs**: Multi-session cohort programs (typically 6 sessions) that build lasting AI habits through weekly guided practice on real work tasks. Designed for change management, not just training.
- **1-1 AI Coaching**: Personalized sessions for professionals. 160+ sessions delivered across industries. Includes discovery calls, standard coaching, and executive advisory tiers.
- **Train-the-Trainer** (via Adaptig): Certification program for trainers, consultants, and educators who want to teach AI using the Adaptig methodology.
- **Keynotes and Events**: 30-60 minute keynotes, executive briefings, panel discussions, and conference workshops.

## Key Results

- 9,462+ professionals trained
- 170+ workshops delivered
- 66+ organizations served
- 12 countries reached
- Bank of China (Hong Kong): 1,530 participants across 13 countries
- Chow Tai Fook: Three repeat engagements
- 160+ one-on-one coaching sessions delivered

## Named Frameworks

- **Traffic Light Protocol**: Green/Yellow/Red data sensitivity framework for AI safety in regulated industries (developed with Bank of China HK)
- **AI Pioneer Model**: Multi-session cohort approach using change management principles
- **70/30 Human-AI Split**: 70% human judgment, 30% AI assistance
- **AI Maturity Model**: 4-stage progression from Awareness to Integration to Optimization to Transformation
- **ACE Framework**: Strategy, structure, and execution model for building AI workflows (developed with PolyU)
- **C-How Thinking**: Bridges left-brain logic and right-brain creativity through AI tools (developed with Arup)

## Links

- Website: ${SITE_URL}
- Services: ${SITE_URL}/services
- Blog: ${SITE_URL}/blog
- Case Studies: ${SITE_URL}/clients
- Media Appearances: ${SITE_URL}/media
- Contact: ${SITE_URL}/contact
- Adaptig: https://adaptig.ai
- LinkedIn: https://linkedin.com/in/sam-ai-agent/
- X/Twitter: https://x.com/HyperfocuSam

## Contact

Email: sam@adaptig.com
Location: Hong Kong (available globally and across Asia-Pacific)
Languages: English, Cantonese

## Blog (${enPosts.length} English articles)

See ${SITE_URL}/llms-full.txt for the full catalog with excerpts.
`;
}

function generateLlmsFullTxt(posts) {
  const enPosts = posts.filter((p) => p.language === 'en');
  const zhPosts = posts.filter((p) => p.language !== 'en');

  let txt = `# Sam Wong \u2014 AI Training Specialist

> AI adoption training for enterprise teams. 9,462+ professionals trained across 66+ organizations. Based in Hong Kong, available globally.

Website: ${SITE_URL}
Services: ${SITE_URL}/services
Contact: sam@adaptig.com

---

## About

Sam Wong is an AI training specialist who has trained 9,462+ professionals across 66+ organizations in banking, retail, education, engineering, and technology. He co-founded Adaptig (Animo Technology Limited), a global AI trainer network spanning four continents. His approach focuses on behavior change over tool awareness, emphasizing psychological safety and practical workflow integration. He holds a Master of Arts from the Chinese University of Hong Kong.

## Services

- **Corporate AI Workshops** (via Adaptig): Half-day to multi-day workshops for leadership teams and departments. Clients include Bank of China, Chow Tai Fook, Hong Kong Jockey Club, HSBC, Arup, and PolyU.
- **AI Pioneer Programs**: 6-session cohort programs that build lasting AI habits through weekly guided practice on real work tasks.
- **1-1 AI Coaching**: 160+ sessions delivered. Discovery calls, standard coaching, and executive advisory tiers.
- **Train-the-Trainer** (via Adaptig): Certification for trainers spanning North America, Latin America, Europe, and Asia-Pacific.
- **Keynotes and Events**: Executive briefings, panel discussions, conference workshops.

## Named Frameworks

- **Traffic Light Protocol**: Green/Yellow/Red data sensitivity framework for AI safety in regulated industries (developed with Bank of China HK)
- **AI Pioneer Model**: Multi-session cohort approach using change management principles \u2014 select 10-20 influential people, train them deeply, they become internal champions
- **70/30 Human-AI Split**: 70% human judgment, 30% AI assistance \u2014 the ratio that produces sustainable adoption
- **AI Maturity Model**: 4-stage progression from Awareness to Integration to Optimization to Transformation
- **ACE Framework**: Strategy, structure, and execution model for building AI workflows
- **C-How Thinking**: Bridges left-brain logic and right-brain creativity through AI tools (developed with Arup)

## Key Results

- 9,462+ professionals trained
- 170+ workshops delivered
- 66+ organizations served
- 12 countries reached
- Bank of China (Hong Kong): 1,530 participants across 13 countries
- Chow Tai Fook: 3 repeat engagements
- 160+ one-on-one coaching sessions

---

## Blog Articles

`;

  // Group EN posts by type
  const grouped = {};
  enPosts.forEach((p) => {
    const group = TYPE_LABELS[p.type] || 'Other';
    if (!grouped[group]) grouped[group] = [];
    grouped[group].push(p);
  });

  // Output in preferred order
  const order = ['Case Studies', 'Methodologies & Frameworks', 'Insights & Commentary', 'Personal & Productivity', 'Frameworks', 'Announcements', 'Other'];
  order.forEach((label) => {
    const items = grouped[label];
    if (!items || items.length === 0) return;
    txt += `### ${label}\n\n`;
    items.sort((a, b) => b.date.localeCompare(a.date));
    items.forEach((p) => {
      txt += `- [${p.title}](${SITE_URL}/blog/${p.slug}/) (${p.date})`;
      if (p.excerpt) txt += ` \u2014 ${p.excerpt}`;
      txt += '\n';
    });
    txt += '\n';
  });

  // Chinese posts
  if (zhPosts.length > 0) {
    txt += '### Chinese (Traditional) Articles\n\n';
    zhPosts
      .sort((a, b) => b.date.localeCompare(a.date))
      .forEach((p) => {
        txt += `- [${p.title}](${SITE_URL}/blog/${p.slug}/) (${p.date})`;
        if (p.excerpt) txt += ` \u2014 ${p.excerpt}`;
        txt += '\n';
      });
    txt += '\n';
  }

  txt += `---

## Key Pages

- [Corporate AI Training Hong Kong](${SITE_URL}/corporate-ai-training-hong-kong/) \u2014 Pillar page with methodologies, case studies, FAQ, and government funding info
- [Services](${SITE_URL}/services/) \u2014 Full service catalog with coaching tiers and Train-the-Trainer
- [About](${SITE_URL}/about/) \u2014 Biography, career path, frameworks, and credentials
- [Clients](${SITE_URL}/clients/) \u2014 Enterprise client list with industry breakdown
- [Testimonials](${SITE_URL}/testimonials/) \u2014 Client feedback and satisfaction data
- [Speaking](${SITE_URL}/speaking/) \u2014 Keynotes and event appearances
- [Contact](${SITE_URL}/contact/) \u2014 Booking and inquiry

## Links

- Adaptig: https://adaptig.ai
- LinkedIn: https://linkedin.com/in/sam-ai-agent/
- Substack: https://wongsam.substack.com
- GitHub: https://github.com/HyperfocuSam
- X/Twitter: https://x.com/HyperfocuSam
`;

  return txt;
}

// Main
const posts = parsePosts();
const enCount = posts.filter((p) => p.language === 'en').length;
const zhCount = posts.filter((p) => p.language !== 'en').length;

fs.writeFileSync(LLMS_FILE, generateLlmsTxt(posts));
fs.writeFileSync(LLMS_FULL_FILE, generateLlmsFullTxt(posts));

console.log(`llms.txt: generated (${enCount} EN posts)`);
console.log(`llms-full.txt: generated (${enCount} EN + ${zhCount} TC = ${posts.length} total)`);
