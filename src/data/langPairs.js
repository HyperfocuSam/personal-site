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
};

export const ZH_TO_EN = Object.entries(EN_TO_ZH)
  .reduce((acc, [en, zh]) => ({ ...acc, [zh]: en }), {});

// GitHub Pages serves react-snap's dir/index.html, so the same page is reached
// both with and without a trailing slash. Normalise before any lookup.
const stripSlash = (path) => (
  path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path
);

export const isZhPath = (pathname) => /^\/zh(\/|$)/.test(stripSlash(pathname || '/'));

/**
 * The other-language counterpart of a path, and which language that is.
 *
 * @param   {string} pathname  e.g. '/about/' or '/zh/services'
 * @returns {{ href: string, lang: 'zh'|'en' }}
 */
export const counterpartOf = (pathname) => {
  const path = stripSlash(pathname || '/');

  if (isZhPath(path)) {
    return { href: ZH_TO_EN[path] || '/', lang: 'en' };
  }
  return { href: EN_TO_ZH[path] || '/zh', lang: 'zh' };
};

export default counterpartOf;
