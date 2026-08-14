/**
 * @jest-environment jsdom
 *
 * jsdom, not node: setupFilesAfterEach loads src/setupTests.js for every suite
 * and it touches `window` at module scope.
 */

import fs from 'fs';
import path from 'path';

import servicesZh from '../data/services-zh';

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
