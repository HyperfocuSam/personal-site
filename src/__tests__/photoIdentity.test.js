/**
 * @jest-environment jsdom
 *
 * jsdom, not node: setupFilesAfterEach loads src/setupTests.js for every suite
 * and it touches `window` at module scope.
 */

import fs from 'fs';
import path from 'path';

const root = path.resolve(__dirname, '..', '..');
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');

// A photograph is a factual claim, and this repo has already published a false
// one. From at least 2026-04 until 2026-08-15 the hero band on BOTH /speaking
// and /zh/speaking carried `ypo-stage-wide.jpg` under the alt text "Sam Wong on
// stage at the YPO Global Event" — and the man in it is Jan-Eric Kloth, Sam's
// co-trainer. The same alt text also placed the Skirball Cultural Center in New
// York; it is in Los Angeles.
//
// /speaking is the page a conference programme committee lands on, so this was
// the single worst-placed error on the site. A real photograph of Sam at that
// lectern existed on disk the whole time.
//
// Nothing in the test suite could have caught it: no assertion had ever been
// written about who is in a picture. These are the first.
describe('the speaking hero shows Sam', () => {
  const en = read('src/pages/Speaking.js');
  const zh = read('src/pages/ZhSpeaking.js');

  it('has retired the co-trainer frame from the repo entirely', () => {
    // Deleted rather than left unreferenced. /images/* is served with
    // `max-age=2592000`, so re-pointing at the same filename would have kept
    // the wrong man in visitors' caches for thirty days — the replacement
    // ships under a new name for that reason, and the old one must not come
    // back under any reference.
    expect(fs.existsSync(path.join(root, 'public/images/home/ypo-stage-wide.jpg'))).toBe(false);
    expect(fs.existsSync(path.join(root, 'public/images/home/ypo-stage-wide.webp'))).toBe(false);
    expect(en).not.toContain('ypo-stage-wide');
    expect(zh).not.toContain('ypo-stage-wide');
  });

  it('points both language pages at the same photograph, and it exists', () => {
    const hero = '/images/home/ypo-stage-sam-lectern.jpg';
    expect(en).toContain(hero);
    expect(zh).toContain(hero);

    // OptimizedImage swaps the extension for its <source>; both must be on disk
    // or the picture element falls back silently to a 404.
    ['jpg', 'webp'].forEach((ext) => {
      const file = path.join(root, `public/images/home/ypo-stage-sam-lectern.${ext}`);
      expect(fs.existsSync(file)).toBe(true);
      expect(fs.statSync(file).size).toBeGreaterThan(20 * 1024);
    });
  });

  it('names Sam in the alt text and puts Skirball in Los Angeles', () => {
    expect(en).toMatch(/alt="Sam Wong presenting from the lectern[^"]*Los Angeles"/);
    expect(en).not.toMatch(/alt="[^"]*Skirball[^"]*New York"/);
    expect(zh).toMatch(/alt="Sam Wong 在洛杉磯[^"]*"/);
    expect(zh).not.toMatch(/alt="[^"]*紐約 Skirball[^"]*"/);
  });
});

// Second-order guard: a src that points at nothing renders an empty band and
// says nothing at all, which on these pages is the same failure in a quieter
// form. Cheap to assert, so assert it everywhere a booker looks.
describe('every image a booker sees resolves to a file', () => {
  const bookerPages = [
    'src/pages/Speaking.js',
    'src/pages/ZhSpeaking.js',
    'src/pages/Media.js',
    'src/pages/ZhMedia.js',
    'src/pages/MediaKit.js',
    'src/pages/ZhMediaKit.js',
  ];

  bookerPages.forEach((page) => {
    it(`resolves every local image referenced by ${path.basename(page)}`, () => {
      const source = read(page);
      const refs = [...source.matchAll(/src="(\/images\/[^"]+)"/g)].map((m) => m[1]);

      refs.forEach((ref) => {
        expect(fs.existsSync(path.join(root, 'public', ref))).toBe(true);
      });
    });
  });
});

// 2026-09-08: the homepage hero, author avatar, media kit and every Person
// schema `image` moved off the drifted AI cutout (`Sam.png` / `sam-hero.jpg` —
// one Gemini portrait whose likeness had slid off Sam) onto a portrait edited
// from Sam's own photograph, chosen by him. Same cache rule as above: new
// filenames, old files deleted, no reference may point back.
describe('the site portrait is the 2026-09 photograph', () => {
  const pages = [
    'src/components/Home/HeroSection.js',
    'src/components/Blog/AuthorCard.js',
    'src/pages/MediaKit.js',
    'src/pages/ZhMediaKit.js',
    'src/pages/About.js',
    'src/pages/Index.js',
    'src/pages/CorporateTraining.js',
    'src/pages/ZhCorporateTraining.js',
    'public/index.html',
  ];

  it('has retired the AI cutout from the repo entirely', () => {
    ['Sam.png', 'Sam.webp', 'sam-hero.jpg', 'sam-hero.webp'].forEach((f) => {
      expect(fs.existsSync(path.join(root, 'public/images', f))).toBe(false);
    });
    pages.forEach((p) => {
      expect(read(p)).not.toMatch(/images\/(Sam|sam-hero)\.(png|webp|jpg)/);
    });
  });

  it('ships the replacement in both formats, and every slot points at it', () => {
    [['sam-hero-2026-09', 'jpg'], ['sam-hero-2026-09', 'webp'],
      ['sam-portrait-2026-09', 'png'], ['sam-portrait-2026-09', 'webp']].forEach(([name, ext]) => {
      const file = path.join(root, `public/images/${name}.${ext}`);
      expect(fs.existsSync(file)).toBe(true);
      expect(fs.statSync(file).size).toBeGreaterThan(20 * 1024);
    });
    expect(read('src/components/Home/HeroSection.js')).toContain('/images/sam-hero-2026-09.jpg');
    expect(read('public/index.html')).toContain('/images/sam-hero-2026-09.webp');
    pages.filter((p) => !p.includes('HeroSection')).forEach((p) => {
      expect(read(p)).toContain('/images/sam-portrait-2026-09.png');
    });
  });
});
