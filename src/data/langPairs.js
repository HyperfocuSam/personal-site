// The single source of truth for which English page maps to which Chinese one.
//
// Before this file, that mapping was hardcoded 22 times across 11 page
// components — once in each page's `hreflangTags` and once in each inline
// `.lang-toggle` link — with no shared helper. The nav switcher needs it on
// every route including ones that have no translation, so it lives here.
//
// Every page in the header and footer now has a Chinese twin (2026-08-12).
// Anything still missing one — blog posts, /get-started — falls back to the
// Chinese homepage: a chrome element that appears and disappears between pages
// is worse than one that always works, and a reader who wants Chinese is better
// served landing on /zh than on nothing.

export const EN_TO_ZH = {
  '/': '/zh',
  '/about': '/zh/about',
  '/blog': '/zh/blog',
  '/book': '/zh/book',
  '/case-notes': '/zh/case-notes',
  '/contact': '/zh/contact',
  '/media': '/zh/media',
  '/media/kit': '/zh/media/kit',
  '/services': '/zh/services',
  '/speaking': '/zh/speaking',
  '/corporate-ai-training-hong-kong': '/zh/corporate-ai-training-hong-kong',
  '/ai-training-healthcare-hong-kong': '/zh/ai-training-healthcare-hong-kong',
  '/ai-training-teachers-hong-kong': '/zh/ai-training-teachers-hong-kong',
  '/ai-training-nonprofit-hong-kong': '/zh/ai-training-nonprofit-hong-kong',
  '/ai-training-sme-owners-hong-kong': '/zh/ai-training-sme-owners-hong-kong',
  '/ai-training-executive-assistants-hong-kong': '/zh/ai-training-executive-assistants-hong-kong',
};

export const ZH_TO_EN = Object.entries(EN_TO_ZH)
  .reduce((acc, [en, zh]) => ({ ...acc, [zh]: en }), {});

// GitHub Pages serves react-snap's dir/index.html, so the same page is reached
// both with and without a trailing slash. Normalise before any lookup.
const stripSlash = (path) => (
  path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path
);

// ⚠ The path is NOT sufficient to know a page's language, and treating it as
// such shipped a real bug for as long as Chinese posts have existed.
//
// Chinese blog posts do not live under /zh — they live at /blog/<slug>-tc (23
// of them) and /blog/zh-<slug> (5). So this predicate answered "English" for
// all 28, and because routesFor/footerLinksFor/counterpartOf all delegate their
// entire language decision to it, every Chinese article rendered an English
// header AND an English footer, its "Book a Call" button pushed the reader into
// the English funnel, and the switcher offered 「中文」 — to a Chinese reader —
// then dropped them on /zh, losing the article. Found live 2026-08-15.
//
// The fix is NOT a slug regex. `language: 'zh-Hant'` in data/posts/index.js is
// the authoritative field and a second source of truth would drift the first
// time a slug is named differently. But importing that metadata here would pull
// ~17 KB gzipped of it into the main bundle — it currently sits in lazy chunks
// — for the sake of the nav on every page. So the language is passed DOWN from
// the one component that already resolves it (Post.js computes postLang before
// it renders <Main>), and the path sniff stays as the fallback for every route
// that is not a post.
export const isZhPath = (pathname, lang) => {
  if (lang) return lang === 'zh-Hant' || lang === 'zh';
  return /^\/zh(\/|$)/.test(stripSlash(pathname || '/'));
};

/**
 * The other-language counterpart of a path, and which language that is.
 *
 * @param   {string} pathname  e.g. '/about/' or '/zh/services'
 * @param   {object} [override]
 * @param   {string} [override.lang]  'en' | 'zh' | 'zh-Hant' — the page's real
 *                                    language when the path cannot reveal it
 * @param   {string} [override.href]  the known counterpart, e.g. a post's twin
 * @returns {{ href: string, lang: 'zh'|'en' }}
 */
export const counterpartOf = (pathname, override = {}) => {
  const path = stripSlash(pathname || '/');
  const { lang, href } = override;

  if (lang) {
    const pageIsZh = isZhPath(path, lang);
    // A post with no twin still needs somewhere to go: the other language's
    // blog index, not the homepage — the reader was reading, not browsing.
    return {
      href: href || (pageIsZh ? '/blog' : '/zh/blog'),
      lang: pageIsZh ? 'en' : 'zh',
    };
  }

  if (isZhPath(path)) {
    return { href: ZH_TO_EN[path] || '/', lang: 'en' };
  }
  return { href: EN_TO_ZH[path] || '/zh', lang: 'zh' };
};

export default counterpartOf;
