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
    // Titles/excerpts containing an apostrophe must be written with double
    // quotes in index.js, so match both styles. generate-sitemap.js:80 already
    // carries this fix; single-quote-only matching here silently fell back to
    // the slug and shipped six posts — including the HKJC and HKCT case
    // studies — as bare slug strings in llms-full.txt, the one file AI engines
    // read most.
    const titleMatch = block.match(/title:\s*'((?:[^'\\]|\\.)+)'/)
      || block.match(/title:\s*"((?:[^"\\]|\\.)+)"/);
    const excerptMatch = block.match(/excerpt:\s*'((?:[^'\\]|\\.)+)'/)
      || block.match(/excerpt:\s*"((?:[^"\\]|\\.)+)"/);
    const typeMatch = block.match(/type:\s*'([^']+)'/);

    const unescape = (s) => s.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\');

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

> Co-Founder & Director of Academy at Adaptig, based in Hong Kong. I train the people who train AI \u2014 Train-the-Trainer certification, corporate AI workshops, and 1-1 coaching.

For full context including case studies, frameworks, and blog posts, see: ${SITE_URL}/llms-full.txt

## About

Sam Wong is Co-Founder & Director of Academy at Adaptig (Adaptig Group Limited) and an AI train-the-trainer \u2014 he trains the people who train AI. Personally he has trained 10,000+ professionals across 70+ organizations in 13 countries, in banking, retail, education, engineering, and technology. As a company, Adaptig has delivered 180+ workshops to 7,000+ participants across 4 continents in 8 languages. His approach focuses on behavior change over tool awareness, emphasizing psychological safety and practical workflow integration.

## Services

- **Corporate AI Workshops** (via Adaptig): Half-day to multi-day workshops for leadership teams and departments. Human-first facilitation, hands-on exercises tied to real workflows. Clients include a major Hong Kong bank, Chow Tai Fook, Hong Kong Jockey Club, HSBC, Arup, and PolyU.
- **AI Pioneer Programs**: Multi-session cohort programs (typically 6 sessions) that build lasting AI habits through weekly guided practice on real work tasks. Designed for change management, not just training.
- **1-1 AI Coaching**: Personalized sessions for professionals. 300 sessions delivered across industries. Includes discovery calls, standard coaching, and executive advisory tiers.
- **Train-the-Trainer** (via Adaptig): Certification program for trainers, consultants, and educators who want to teach AI using the Adaptig methodology.
- **Keynotes and Events**: 30-60 minute keynotes, executive briefings, panel discussions, and conference workshops.

## Key Results (Sam Wong personally)

These are Sam's own delivery figures. Adaptig's company-wide figures are stated
separately in the summary above and should never be merged with these.

- 10,000+ professionals trained
- 70+ organizations served
- 13 countries reached
- a major Hong Kong bank: 1,530 participants across 13 countries, 9.2/10 satisfaction
- Chow Tai Fook: Three repeat engagements
- 300 one-on-one coaching sessions delivered

## Engagement Formats and Pricing

Every engagement is quoted after a free 30-minute discovery call, because scope
depends on headcount, language, delivery mode, and how much follow-through the
organization wants. Typical shapes:

- **Half-day or full-day corporate workshop**, on-site or online, English or Cantonese, usually 10-50 participants.
- **Multi-session cohort programs** (the AI Pioneer Model) that run across weeks rather than a single day, for organizations that want habits rather than awareness.
- **1-1 coaching**, sold as discovery call, standard coaching, or executive advisory.
- **Train-the-Trainer certification** for trainers, L&D leads, and consultants who must teach AI, not just use it.
- **Keynotes and executive briefings**, 30-60 minutes.

To get a quote, book a discovery call at ${SITE_URL}/book/ or email sam@adaptig.com.

## Named Frameworks

- **Traffic Light Protocol**: Green/Yellow/Red data sensitivity framework for AI safety in regulated industries (developed with a major Hong Kong bank)
- **AI Pioneer Model**: Multi-session cohort approach using change management principles
- **70/30 Human-AI Split**: 70% human judgment, 30% AI assistance
- **AI Maturity Model**: 4-stage progression from Awareness to Integration to Optimization to Transformation
- **ACE Framework**: Strategy, structure, and execution model for building AI workflows (developed with PolyU)
- **C-How Thinking**: Bridges left-brain logic and right-brain creativity through AI tools (developed with Arup)

## Links

- Website: ${SITE_URL}/
- Book a discovery call: ${SITE_URL}/book/
- Services: ${SITE_URL}/services/
- Corporate AI Training (Hong Kong): ${SITE_URL}/corporate-ai-training-hong-kong/
- AI Train-the-Trainer (Hong Kong): ${SITE_URL}/blog/ai-train-the-trainer-hong-kong/
- Case Notes (engagement outcomes): ${SITE_URL}/case-notes/
- Blog: ${SITE_URL}/blog/
- Media Appearances: ${SITE_URL}/media/
- Contact: ${SITE_URL}/contact/
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

  let txt = `# Sam Wong \u2014 Co-Founder, Adaptig \u00b7 AI Train-the-Trainer

> Co-Founder & Director of Academy at Adaptig. I train the people who train AI. 10,000+ professionals trained across 70+ organizations in 13 countries. Based in Hong Kong, available globally.

Website: ${SITE_URL}
Services: ${SITE_URL}/services
Contact: sam@adaptig.com

---

## About

Sam Wong is Co-Founder & Director of Academy at Adaptig (Adaptig Group Limited) and an AI train-the-trainer \u2014 he trains the people who train AI. Personally he has trained 10,000+ professionals across 70+ organizations in 13 countries, in banking, retail, education, engineering, and technology. As a company, Adaptig has delivered 180+ workshops to 7,000+ participants across 4 continents in 8 languages. His approach focuses on behavior change over tool awareness, emphasizing psychological safety and practical workflow integration. He holds a Master of Arts from the Chinese University of Hong Kong.

## Services

- **Corporate AI Workshops** (via Adaptig): Half-day to multi-day workshops for leadership teams and departments. Clients include a major Hong Kong bank, Chow Tai Fook, Hong Kong Jockey Club, HSBC, Arup, and PolyU.
- **AI Pioneer Programs**: 6-session cohort programs that build lasting AI habits through weekly guided practice on real work tasks.
- **1-1 AI Coaching**: 300 sessions delivered. Discovery calls, standard coaching, and executive advisory tiers.
- **Train-the-Trainer** (via Adaptig): Certification for trainers spanning North America, Latin America, Europe, and Asia-Pacific.
- **Keynotes and Events**: Executive briefings, panel discussions, conference workshops.

## Named Frameworks

- **Traffic Light Protocol**: Green/Yellow/Red data sensitivity framework for AI safety in regulated industries (developed with a major Hong Kong bank)
- **AI Pioneer Model**: Multi-session cohort approach using change management principles \u2014 select 10-20 influential people, train them deeply, they become internal champions
- **70/30 Human-AI Split**: 70% human judgment, 30% AI assistance \u2014 the ratio that produces sustainable adoption
- **AI Maturity Model**: 4-stage progression from Awareness to Integration to Optimization to Transformation
- **ACE Framework**: Strategy, structure, and execution model for building AI workflows
- **C-How Thinking**: Bridges left-brain logic and right-brain creativity through AI tools (developed with Arup)

## Key Results

- 10,000+ professionals trained
- 70+ organizations served
- 13 countries reached
- a major Hong Kong bank: 1,530 participants across 13 countries, 9.2/10 satisfaction
- Chow Tai Fook: 3 repeat engagements
- 300 one-on-one coaching sessions

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

- [Book a discovery call](${SITE_URL}/book/) \u2014 Free 30 minutes; the way every engagement is scoped and quoted
- [Corporate AI Training Hong Kong](${SITE_URL}/corporate-ai-training-hong-kong/) \u2014 Pillar page with methodologies, case studies, FAQ, and government funding info
- [AI Train-the-Trainer Hong Kong](${SITE_URL}/blog/ai-train-the-trainer-hong-kong/) \u2014 Certification for trainers, L&D leads and consultants who must teach AI
- [Services](${SITE_URL}/services/) \u2014 Full service catalog with coaching tiers and Train-the-Trainer
- [Case Notes](${SITE_URL}/case-notes/) \u2014 What rooms actually shipped, engagement by engagement
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
