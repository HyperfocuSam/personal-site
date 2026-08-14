/**
 * @jest-environment jsdom
 *
 * jsdom, not node: setupFilesAfterEach loads src/setupTests.js for every suite
 * and it touches `window` at module scope.
 */

import fs from 'fs';
import path from 'path';

const root = path.resolve(__dirname, '..', '..');

// Sam's client-naming ruling of 2026-07-12
// (output/SAM-ClientNaming-Decisions-20260712.md). The sitewide pass shipped as
// 75fa2dcd and has now been caught missing FOUR separate carriers, each found
// only because somebody happened to look:
//
//   HomeFAQ.js prose        — named the bank twice for a month   (fixed 7bf4f204)
//   seven blog slugs        — the client name was in the URL     (fixed de0b317d)
//   two post tags           — shipped as <meta article:tag>      (fixed 1ffa4775)
//   MediaKit.js English bio — while the Chinese column beside it
//                             was correctly anonymised           (fixed 2026-08-12)
//   ZhCorporateTraining FAQ — 中銀, on the page that ranks #2     (fixed 2026-08-12)
//
// A rule nothing enforces decays. This is the enforcement.
// Latin AND Chinese spellings. The first version of this list only knew the
// Latin ones, and 嘉頓 — Garden's Chinese name — was sitting on the Chinese
// homepage's proof line while every English page said "a Hong Kong food
// manufacturer". Found 2026-08-12, by looking at the rendered page.
const FORBIDDEN = [
  'Bank of China',
  'BOCHK',
  '中銀',
  'China Light and Power',
  '中電',
  'Playmates Toys',
  'Publicis Groupe',
  'Paly Adventures',
  'Bachar Investments',
  '嘉頓',
  // Hardened 2026-08-14: the list knew 嘉頓 but not the English name, which
  // is how "Garden: 6 departments re-booked" shipped on the live homepage.
  // Colon/paren forms only — bare "Garden" would flag the common noun.
  'Garden:',
  '(Garden)',
  'Playmates',
  '彩星',
  '陽獅',
];

// The ONE deliberate exception, Sam's decision of 2026-08-11: the client logo
// bar keeps its logos, and a logo you cannot label is a logo no screen reader
// can announce. The ruling is text-only; this file is image markup.
const ALLOWED_FILES = new Set([
  'src/components/Home/ClientLogoBar.js',
  'src/__tests__/clientAnonymisation.test.js',
  'src/__tests__/tagVocabulary.test.js',
]);

const walk = (dir, acc = []) => {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/\.(js|md)$/.test(entry.name)) acc.push(full);
  });
  return acc;
};

describe('anonymised clients stay anonymised', () => {
  const files = walk(path.join(root, 'src'))
    .map((f) => path.relative(root, f))
    .filter((f) => !ALLOWED_FILES.has(f))
    // Regenerated from the .md sources by `npm run prebuild`; the sources
    // themselves are checked, so checking the mirror only duplicates failures.
    .filter((f) => f !== 'src/data/posts/content.generated.js');

  it.each(FORBIDDEN)('never writes "%s" in src/', (name) => {
    const offenders = files.filter((f) => fs.readFileSync(path.join(root, f), 'utf8').includes(name));
    expect(offenders).toEqual([]);
  });

  it('keeps the logo-bar exemption explicit rather than accidental', () => {
    // If the logo bar stops naming the bank, the exemption is no longer needed
    // and this allowlist should shrink — the test says so out loud.
    const bar = fs.readFileSync(path.join(root, 'src/components/Home/ClientLogoBar.js'), 'utf8');
    expect(bar).toContain('Bank of China (Hong Kong)');
  });
});
