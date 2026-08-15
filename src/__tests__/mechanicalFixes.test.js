/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Main from '../layouts/Main';

const root = path.resolve(__dirname, '..', '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

let consoleError;

beforeEach(() => {
  window.scrollTo = jest.fn();
  consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  document.head.innerHTML = '';
  consoleError.mockRestore();
});

// Two tests were removed with the components they guarded (Resume/Courses/Course
// and Resume/Skills/SkillBar): /resume and /projects were retired in Phase C
// after 0 and 1 pageviews in 90 days and zero inbound links. The assertions had
// no subject left — this is not a coverage reduction.
describe('S1 verified bug regressions', () => {
  it('keeps the email capture heading paper-colored inside Field Notes pages', () => {
    const styles = read('src/static/css/components/_email-capture.scss');
    expect(styles).toMatch(/\.field-notes-content\s+&\s*\{[\s\S]*?h3\s*\{[\s\S]*?color:\s*_palette\(surface-base\)/);
  });

  it('guards the Chinese media like count when likes are null', () => {
    const source = read('src/pages/ZhMedia.js');
    expect(source).toMatch(/\{episode\.likes && <span>\{`\$\{episode\.likes\} 讚好`\}<\/span>\}/);
  });

  it('collapses receipt internals on narrow shared stat cards', () => {
    const styles = read('src/static/css/pages/_content-field-notes.scss');
    expect(styles).toMatch(/@include breakpoint\(small\)[\s\S]*?\.stat-item\.fn-receipt\s*\{[\s\S]*?display:\s*block/);
    expect(styles).toMatch(/@include breakpoint\(small\)[\s\S]*?\.fn-receipt__leader\s*\{[\s\S]*?display:\s*none/);
  });

  it('lays out media dates and membership badges without inline overlap', () => {
    const styles = read('src/static/css/pages/_media.scss');
    const fieldNotesStyles = read('src/static/css/pages/_content-field-notes.scss');
    expect(styles).toMatch(/&__meta\s*\{[\s\S]*?display:\s*inline-flex[\s\S]*?flex-wrap:\s*wrap/);
    expect(styles).toMatch(/&__badge\s*\{[\s\S]*?margin-left:\s*0/);
    expect(fieldNotesStyles).toMatch(/\.episode-card__meta\.fn-stamp\s*\{[\s\S]*?display:\s*inline-flex/);
  });

  it('serves all Latin font families from stable public woff2 URLs', () => {
    const typography = read('public/fonts/fonts.css');
    const index = read('public/index.html');
    const fonts = [
      'inter-latin.woff2',
      'fraunces-latin.woff2',
      'fraunces-latin-italic.woff2',
      'jetbrains-mono-latin.woff2',
    ];

    fonts.forEach((font) => {
      const fontPath = path.join(root, 'public', 'fonts', font);
      expect(fs.existsSync(fontPath)).toBe(true);
      const contents = fs.readFileSync(fontPath);
      expect(contents.length).toBeGreaterThan(10 * 1024);
      expect(contents.subarray(0, 4).toString('ascii')).toBe('wOF2');
      expect(typography).toContain(`/fonts/${font}`);
    });

    expect(typography).toContain("font-family: 'Fraunces'");
    expect(typography).toContain("font-family: 'JetBrains Mono'");
    expect(index).toContain('%PUBLIC_URL%/fonts/fonts.css');
    expect(index).not.toContain('dm-serif-display-regular.woff2" type="font/woff2" crossorigin');
    expect(index).not.toContain('family=Fraunces');
  });

  it('targets the rendered homepage stat strip for speakable schema', () => {
    const source = read('src/pages/Index.js');
    expect(source).not.toContain('.hero-stats');
    expect(source).toContain("cssSelector: ['.stats-strip', \"meta[name='description']\"]");
  });

  it('emits locale and locale alternate metadata for bilingual routes', () => {
    render(
      <MemoryRouter>
        <Main
          title="\u7db2\u8a8c"
          canonicalUrl="https://hyperfocusam.com/zh/blog"
          hreflangTags={[
            { lang: 'en', href: 'https://hyperfocusam.com/blog' },
            { lang: 'zh-Hant', href: 'https://hyperfocusam.com/zh/blog' },
          ]}
        >
          <div />
        </Main>
      </MemoryRouter>,
    );

    expect(document.head.querySelector('meta[property="og:locale"]')).toHaveAttribute('content', 'zh_HK');
    expect(document.head.querySelector('meta[property="og:locale:alternate"]')).toHaveAttribute('content', 'en_US');
    expect(document.head.querySelectorAll('title')).toHaveLength(1);
    expect(read('public/index.html')).not.toContain('<meta property="og:locale" content="en_US" />');
  });

  it('contains only the specified About and legal-entity corrections', () => {
    const about = read('src/pages/About.js');
    const mediaKit = read('src/pages/MediaKit.js');
    // The About FAQ answers moved to src/data/faqs.js when they were made
    // visible on the page — they had been schema-only. The legal-entity
    // assertion follows the copy rather than the file it used to live in.
    const aboutCopy = about + read('src/data/faqs.js');
    expect(about).not.toContain('70% AI execution, 30% human judgment.');
    expect(about.match(/30% AI execution, 70% human judgment\./g)).toHaveLength(1);
    expect(about).toContain('A data sensitivity framework for regulated industries.');
    expect(about).toContain('Green (public info), Yellow (internal, strip identifiers),');
    expect(aboutCopy).toContain('Adaptig (Adaptig Group Limited)');
    expect(mediaKit.match(/Adaptig Group Limited/g)).toHaveLength(2);
  });

  it('keeps generated GEO artifacts on the corrected entity and scoped figures', () => {
    const generator = read('scripts/generate-llms-txt.js');
    const llms = read('public/llms.txt');
    const llmsFull = read('public/llms-full.txt');
    [generator, llms, llmsFull].forEach((content) => {
      expect(content).not.toContain('Adaptig (Animo Technology Limited)');
      expect(content).toContain('Adaptig (Adaptig Group Limited)');
    });
    expect(generator).not.toMatch(/3,000\+/);
    // Adaptig's company figures (180+ workshops / 7,000+ participants) may appear, but
    // never bare — they are not Sam's personal numbers (10,000+ / 70+ orgs / 13 countries).
    // Every sentence mentioning them must attribute them to Adaptig.
    generator.split(/(?<=\.)\s+/).filter((sentence) => /180\+|7,000\+/.test(sentence))
      .forEach((sentence) => expect(sentence).toMatch(/Adaptig/));
  });

  it('removes meta-only CSP noise and includes the indexable book route', () => {
    const index = read('public/index.html');
    const sitemapScript = read('scripts/generate-sitemap.js');
    const sitemap = read('public/sitemap.xml');
    expect(index).not.toContain('frame-ancestors');
    expect(sitemapScript).toContain("{ path: '/book',");
    expect(sitemap).toContain('<loc>https://hyperfocusam.com/book/</loc>');
    expect(sitemap).not.toContain('<loc>https://hyperfocusam.com/get-started/</loc>');
  });

  // Both of these shipped live and were invisible to every existing check: the
  // source read as correct, and Lighthouse only ever looked at / and /blog/.
  // These are source guards against a revert; the general case is covered by
  // widening lighthouserc.json, whose axe color-contrast audit is what caught
  // them. Found 2026-08-15 audit.
  it('keeps the email capture input legible against components/_form.scss', () => {
    const styles = read('src/static/css/components/_email-capture.scss');
    // `input[type="email"]` in components/_form.scss is (0,1,1) and sets both
    // `background: surface-sunken` and `color: inherit`. A bare `&__input` is
    // (0,1,0) and loses on both, leaving #e8e9f0 text on a #f7f6f3 field —
    // ratio 1.12, i.e. the visitor cannot see the address they are typing.
    expect(styles).toMatch(/input#\{&\}__input\s*\{/);
    expect(styles).not.toMatch(/input#\{&\}__input\s*\{[^}]*color:\s*_palette\(text-on-dark\)/);
    // The --dark variant is (0,2,0) and outranks the fix, so it must not
    // reinstate the translucent field. ZhIndex.js mounts variant="dark".
    expect(styles).not.toMatch(/background-color:\s*rgba\(255,\s*255,\s*255,\s*0\.05\)/);
  });

  it('recolours bare links when a dark band is repainted white', () => {
    const styles = read('src/static/css/pages/_content-field-notes.scss');
    // base/_textures.scss gives `.section-dark a` the paper-white text-on-dark.
    // .field-notes-content repaints .section-dark white, so anchors must be in
    // the recolour list or they render #e8e9f0 on #ffffff — ratio 1.21. The
    // buttons were already handled, which is why only the quiet link broke.
    expect(styles).toMatch(/a:not\(\.button\):not\(\.button-secondary\)\s*\{[\s\S]*?color:\s*_palette\(text-body\)/);
  });
});
