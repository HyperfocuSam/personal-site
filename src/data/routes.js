// Navigation, in both languages.
//
// This file used to be a single English array, and Navigation.js, Hamburger.js
// and Footer.js all rendered it verbatim — so /zh, the page that ranks #2 in
// Hong Kong for 「企業 AI 培訓 香港 工作坊」, linked out to /about, /blog, /book,
// /case-notes, /contact, /media and /speaking in English. Every nav item except
// Services threw a Chinese reader back into English, which is why /zh/blog had
// ZERO inbound internal links and /zh/about had one, against 102 for /about.
//
// The Chinese list is not a subset. Each entry has a real Chinese page behind
// it; adding a route here without building its /zh twin puts a 404 in the
// header of every Chinese page.
//
// /book is deliberately NOT a nav item in either language. The header already
// carries a "Book a Call" button; listing it in the nav as well asked for the
// same action twice within the first 400px, competing with itself. It is in
// the footer.

import { isZhPath } from './langPairs';

export const EN_ROUTES = [
  { index: true, label: 'SAM WONG', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Case Notes', path: '/case-notes' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Speaking', path: '/speaking' },
  { label: 'Contact', path: '/contact' },
];

export const ZH_ROUTES = [
  { index: true, label: 'SAM WONG', path: '/zh' },
  { label: '服務', path: '/zh/services' },
  { label: '案例', path: '/zh/case-notes' },
  { label: '關於', path: '/zh/about' },
  { label: '網誌', path: '/zh/blog' },
  { label: '演講', path: '/zh/speaking' },
  { label: '聯絡', path: '/zh/contact' },
];

export const EN_FOOTER_LINKS = [
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Media', path: '/media' },
  { label: 'Speaking', path: '/speaking' },
  { label: 'Case Notes', path: '/case-notes' },
  { label: 'Book a Call', path: '/book' },
  { label: 'Contact', path: '/contact' },
];

export const ZH_FOOTER_LINKS = [
  { label: '服務', path: '/zh/services' },
  { label: '關於', path: '/zh/about' },
  { label: '網誌', path: '/zh/blog' },
  { label: '媒體', path: '/zh/media' },
  { label: '演講', path: '/zh/speaking' },
  { label: '案例', path: '/zh/case-notes' },
  { label: '預約通話', path: '/zh/book' },
  { label: '聯絡', path: '/zh/contact' },
];

/**
 * Header/menu routes for whichever language the current page is in.
 * @param {string} pathname  from useLocation()
 * @param {string} [lang]    the page's real language when the path cannot show
 *                           it — Chinese posts live at /blog/<slug>-tc, not
 *                           under /zh. See the note in data/langPairs.js.
 */
export const routesFor = (pathname, lang) => (
  isZhPath(pathname, lang) ? ZH_ROUTES : EN_ROUTES
);

/** Footer quick links, same rule. */
export const footerLinksFor = (pathname, lang) => (
  isZhPath(pathname, lang) ? ZH_FOOTER_LINKS : EN_FOOTER_LINKS
);

export default EN_ROUTES;
