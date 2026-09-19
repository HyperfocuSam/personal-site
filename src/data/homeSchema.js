// Homepage JSON-LD, one builder for both homepages.
//
// WHY THIS FILE EXISTS (2026-09-18). The English homepage inlined its schema in
// Index.js and /zh emitted NO page-level JSON-LD at all — the Chinese half of
// the site, the half that ranks #2 in Hong Kong for the commercial query, was
// described to every crawler only by the English Person node baked into
// public/index.html. Two inline copies would have drifted the way the twins
// always drift, so the copy lives here per language and both pages render
// whatever this returns.
//
// ENTITY RULE: the Person node keeps the site-wide `@id`
// (https://hyperfocusam.com/#person, the same node public/index.html and
// ZhAbout.js's `mainEntity` already point at). Same person, one node, described
// twice — an English description and a Chinese one. A second `@id` would invent
// a second Sam Wong and split exactly the entity signal these pages exist to
// consolidate.
//
// ⚠ Titles and credentials come ONLY from Memory/memory_sam_profile.md, and the
// Chinese phrasing is the one ZhAbout.js already shows a reader
// (「Adaptig 聯合創辦人兼學院總監」). Do not translate it again here.
// ⚠ DotAI stays off every surface this file touches: it is invisible in EN by
// Sam's 2026-08-02 ruling, and the ZH about page does not name it either.
import { SITE_URL } from './seo';

export const PERSON_ID = `${SITE_URL}/#person`;

// The 44 KB WebP, never the 794 KB PNG — every consumer of a schema `image`
// fetches the file named here (guarded in mechanicalFixes.test.js).
export const PORTRAIT_IMAGE = `${SITE_URL}/images/sam-portrait-2026-09.webp`;

// Identical in both languages on purpose: a profile URL is not translated, and
// a differing list would read as two different people.
export const SAME_AS = [
  'https://www.linkedin.com/in/sam-ai-agent/',
  'https://x.com/HyperfocuSam',
  'https://github.com/HyperfocuSam',
  'https://www.threads.net/@sam_ai_cbo',
  'https://www.instagram.com/sam_ai_cbo/',
];

const ADAPTIG = { '@type': 'Organization', name: 'Adaptig', url: 'https://adaptig.ai' };

const HONG_KONG_ADDRESS = {
  '@type': 'PostalAddress',
  addressLocality: 'Hong Kong',
  addressCountry: 'HK',
};

const COPY = {
  en: {
    path: '/',
    inLanguage: 'en',
    serviceName: 'Sam Wong - Co-Founder & AI Train-the-Trainer',
    serviceDescription: 'Hong Kong-based AI train-the-trainer. Co-Founder & Director of Academy at Adaptig, delivering Train-the-Trainer certification, corporate workshops, and coaching for enterprises across Asia-Pacific.',
    serviceType: ['AI Training', 'Corporate AI Workshops', 'Prompt Engineering Training', 'Executive AI Coaching', 'Train-the-Trainer Certification'],
    jobTitle: 'Co-Founder & Director of Academy, Adaptig',
    personDescription: 'Co-Founder & Director of Academy at Adaptig. Sam Wong trains the people who train AI — 10,000+ professionals across 70+ organizations in 13 countries.',
    // The rendered stat strip is the quotable block on the page.
    speakableSelector: ['.stats-strip', "meta[name='description']"],
  },
  'zh-Hant': {
    path: '/zh/',
    inLanguage: 'zh-Hant',
    serviceName: 'Sam Wong - 企業 AI 培訓與導師培訓',
    serviceDescription: 'Sam Wong 是 Adaptig 聯合創辦人兼學院總監，駐香港的 AI 導師培訓師。為亞太區企業提供導師認證、企業 AI 工作坊與一對一教練，粵語英語皆可。',
    serviceType: ['AI 培訓', '企業 AI 工作坊', '提示工程培訓', '高管 AI 教練', '導師培訓認證'],
    jobTitle: 'Adaptig 聯合創辦人兼學院總監',
    personDescription: 'Sam Wong（黃力桐）是 Adaptig 聯合創辦人兼學院總監，駐香港的 AI 導師培訓師——他教的是教 AI 的人。至今為 70+ 間機構、10,000+ 位專業人士提供培訓，遍及 13 個國家。',
    speakableSelector: ['.stats-strip', "meta[name='description']"],
  },
};

// `language` accepts the same values the homepage components take: 'en' or
// 'zh-Hant'. Anything else falls back to English rather than shipping a page
// with no schema, which is the defect this file was written to fix.
const homeSchema = (language = 'en') => {
  const t = COPY[language] || COPY.en;
  const pageUrl = `${SITE_URL}${t.path}`;
  const isZh = t.inLanguage === 'zh-Hant';

  return [{
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: t.serviceName,
    url: isZh ? pageUrl : SITE_URL,
    image: PORTRAIT_IMAGE,
    description: t.serviceDescription,
    areaServed: ['Hong Kong', 'Asia-Pacific', 'Global'],
    serviceType: t.serviceType,
    knowsLanguage: ['English', 'Cantonese', 'Mandarin'],
    ...(isZh ? { inLanguage: t.inLanguage } : {}),
    address: HONG_KONG_ADDRESS,
    provider: {
      '@id': PERSON_ID,
      '@type': 'Person',
      name: 'Sam Wong',
      url: SITE_URL,
      jobTitle: t.jobTitle,
      worksFor: [ADAPTIG],
    },
  }, {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Sam Wong',
    alternateName: isZh ? '黃力桐' : ['Samuel Wong', '黃力桐'],
    url: pageUrl,
    image: PORTRAIT_IMAGE,
    jobTitle: t.jobTitle,
    description: t.personDescription,
    worksFor: [ADAPTIG],
    knowsLanguage: ['English', 'Cantonese', 'Mandarin'],
    workLocation: { '@type': 'City', name: 'Hong Kong' },
    sameAs: SAME_AS,
  }, {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    inLanguage: t.inLanguage,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': PERSON_ID },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: t.speakableSelector,
    },
  }];
};

export default homeSchema;
