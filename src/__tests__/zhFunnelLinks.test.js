/**
 * @jest-environment jsdom
 *
 * jsdom, not node: setupFilesAfterEach loads src/setupTests.js for every suite
 * and it touches `window` at module scope.
 */

import fs from 'fs';
import path from 'path';

import servicesZh from '../data/services-zh';
import posts from '../data/posts';
import { isZhPath, counterpartOf } from '../data/langPairs';
import { routesFor, footerLinksFor } from '../data/routes';

const root = path.resolve(__dirname, '..', '..');
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');

// A Chinese reader who followed the Chinese CTAs into the English /book and
// /contact funnel was the exact bug this bundle fixes — the tracker only
// counts /book and /contact as conversions, so a stray English link there
// also underreported the Chinese pages that own it.
const zhInternalLink = /^\/zh(\/|\?|$)/;

describe('services-zh.js funnel links stay in the zh tree', () => {
  const collectCtaLinks = (services) => {
    const links = [];
    services.forEach((service) => {
      if (service.ctaLink) links.push(service.ctaLink);
      (service.tiers || []).forEach((tier) => {
        if (tier.ctaLink) links.push(tier.ctaLink);
      });
    });
    return links;
  };

  const links = collectCtaLinks(servicesZh);
  const internal = links.filter((link) => link.startsWith('/'));

  it('has internal ctaLinks to check', () => {
    expect(internal.length).toBeGreaterThan(0);
  });

  it('routes every internal ctaLink (top-level and tiers) through /zh', () => {
    internal.forEach((link) => {
      expect(link).toMatch(zhInternalLink);
    });
  });
});

describe('ZhServices.js primary CTAs stay in the zh tree', () => {
  const source = read('src/pages/ZhServices.js');
  const ctaLinks = [...source.matchAll(/ctaLink:\s*'([^']*)'/g)].map((m) => m[1]);
  const internal = ctaLinks.filter((link) => link.startsWith('/'));

  it('extracts at least one ctaLink', () => {
    expect(ctaLinks.length).toBeGreaterThan(0);
  });

  it('routes every internal ctaLink through /zh', () => {
    internal.forEach((link) => {
      expect(link).toMatch(zhInternalLink);
    });
  });
});

describe('ServiceCta.js book link follows the reader\'s language', () => {
  const source = read('src/components/Blog/ServiceCta.js');

  it('routes readers to a language-matched book page via the isChinese ternary', () => {
    expect(source).toMatch(/isChinese \? '\/zh\/book' : '\/book'/);
  });

  it('does not hardcode the English-only /book path any more', () => {
    expect(source).not.toContain('to="/book"');
  });
});

describe('data-cta coverage on funnel <Link> buttons in src/pages', () => {
  const pagesDir = path.join(root, 'src', 'pages');
  const pageFiles = fs.readdirSync(pagesDir).filter((f) => f.endsWith('.js'));

  // /book, /book/, /contact, /contact/, /zh/book(/), /zh/contact(/), each
  // optionally carrying a query string (e.g. ?interest=trainer).
  const funnelDestination = /^\/(?:zh\/)?(?:book|contact)\/?(?:\?[^"]*)?$/;

  const missing = [];

  pageFiles.forEach((file) => {
    const source = fs.readFileSync(path.join(pagesDir, file), 'utf8');
    const linkTags = source.match(/<Link\b[\s\S]*?>/g) || [];
    linkTags.forEach((tag) => {
      const toMatch = tag.match(/\bto="([^"]*)"/);
      if (!toMatch) return;
      if (!funnelDestination.test(toMatch[1])) return;
      if (!/className="[^"]*\bbutton/.test(tag)) return;
      if (!/data-cta=/.test(tag)) {
        missing.push(`${file}: ${tag.replace(/\s+/g, ' ')}`);
      }
    });
  });

  it('tags every funnel-destination button Link with data-cta', () => {
    expect(missing).toEqual([]);
  });

  const explicitChecks = [
    ['src/pages/Services.js', 'services_hero_book'],
    ['src/pages/CorporateTraining.js', 'corporate_hero_book'],
    ['src/pages/CorporateTraining.js', 'corporate_closing_book'],
    ['src/pages/ZhCorporateTraining.js', 'corporate_hero_book'],
    ['src/pages/CaseNotes.js', 'case_notes_book'],
    ['src/pages/ZhCaseNotes.js', 'case_notes_book'],
    ['src/pages/ZhSpeaking.js', 'speaking_book'],
    ['src/pages/Speaking.js', 'speaking_contact'],
    ['src/pages/ZhSpeaking.js', 'speaking_contact'],
    ['src/pages/ZhAbout.js', 'about_contact'],
    ['src/pages/Media.js', 'media_contact'],
    ['src/pages/ZhMedia.js', 'media_contact'],
    ['src/pages/Index.js', 'home_band_book'],
  ];

  it.each(explicitChecks)('%s contains data-cta="%s"', (file, ctaId) => {
    expect(read(file)).toContain(`data-cta="${ctaId}"`);
  });
});

// The gap that survived the 2026-08-12 nav fix for three days, and the reason
// this block is a loop over the data rather than another hand-written table:
// isZhPath() tested the path, Chinese posts live at /blog/<slug>-tc, and so all
// 28 of them rendered an English header AND footer, sent "Book a Call" into the
// English funnel, and offered a Chinese reader 「中文」 before dropping them on
// /zh. Adding a post can never re-open it now — the assertions grow with the
// data. Both directions are asserted, because an over-broad fix that matched
// "-tc" anywhere in a slug would be its own bug.
describe('a post carries its own language, whatever its path looks like', () => {
  const zhPosts = posts.filter((post) => post.language === 'zh-Hant');
  const enPosts = posts.filter((post) => post.language !== 'zh-Hant');

  it('has Chinese posts to check, and they do not live under /zh', () => {
    expect(zhPosts.length).toBeGreaterThan(20);
    zhPosts.forEach((post) => {
      expect(`/blog/${post.slug}`).not.toMatch(/^\/zh(\/|$)/);
    });
  });

  it.each(zhPosts.map((post) => [post.slug, post.language]))(
    'gives %s the Chinese chrome',
    (slug) => {
      const pathname = `/blog/${slug}`;
      expect(isZhPath(pathname, 'zh-Hant')).toBe(true);
      expect(routesFor(pathname, 'zh-Hant')[0].path).toMatch(/^\/zh/);
      expect(footerLinksFor(pathname, 'zh-Hant')[0].path).toMatch(/^\/zh/);
    },
  );

  it.each(enPosts.slice(0, 12).map((post) => [post.slug]))(
    'leaves %s in English',
    (slug) => {
      const pathname = `/blog/${slug}`;
      expect(isZhPath(pathname, 'en')).toBe(false);
      expect(routesFor(pathname, 'en')[0].path).not.toMatch(/^\/zh/);
    },
  );

  it('offers a Chinese post the ENGLISH switcher, pointing at its real twin', () => {
    zhPosts.forEach((post) => {
      const other = counterpartOf(`/blog/${post.slug}`, {
        lang: 'zh-Hant',
        href: post.linkedPost ? `/blog/${post.linkedPost}` : undefined,
      });
      // Never 'zh' — that is the label that told a Chinese reader to switch to
      // Chinese, with an aria-label to match.
      expect(other.lang).toBe('en');
      if (post.linkedPost) {
        expect(other.href).toBe(`/blog/${post.linkedPost}`);
      } else {
        // No twin: the English blog index, not the homepage. They were reading.
        expect(other.href).toBe('/blog');
      }
    });
  });

  it('keeps every declared linkedPost resolvable and pointing back', () => {
    posts.filter((post) => post.linkedPost).forEach((post) => {
      const twin = posts.find((p) => p.slug === post.linkedPost);
      expect(twin).toBeDefined();
      expect(twin.linkedPost).toBe(post.slug);
      expect(twin.language === 'zh-Hant').toBe(post.language !== 'zh-Hant');
    });
  });

  it('still reads unflagged routes from the path', () => {
    expect(isZhPath('/zh/about')).toBe(true);
    expect(isZhPath('/about')).toBe(false);
    expect(counterpartOf('/about')).toEqual({ href: '/zh/about', lang: 'zh' });
    expect(counterpartOf('/zh/about')).toEqual({ href: '/about', lang: 'en' });
  });
});
