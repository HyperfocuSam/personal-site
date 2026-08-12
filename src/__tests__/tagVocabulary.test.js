/**
 * @jest-environment jsdom
 *
 * jsdom, not node: setupFilesAfterEach loads src/setupTests.js for every suite
 * and it touches `window` at module scope.
 */

import posts from '../data/posts';
import { CANONICAL_TAGS, topicClusters } from '../data/tags';

// The tag list reached 108 entries across 98 posts — 44 used exactly once — by
// accretion: nobody was wrong at any single step. These assertions are the
// mechanism that stops it happening again, because a rule nothing enforces is a
// rule that decays. See src/data/tags.js for the full history.
describe('blog tag vocabulary', () => {
  it('uses only canonical tags', () => {
    const unknown = new Map();
    posts.forEach((post) => {
      (post.tags || []).forEach((tag) => {
        if (!CANONICAL_TAGS.includes(tag)) {
          unknown.set(tag, [...(unknown.get(tag) || []), post.slug]);
        }
      });
    });
    expect([...unknown.entries()]).toEqual([]);
  });

  it('gives every post at least one tag', () => {
    const untagged = posts.filter((post) => !post.tags || post.tags.length === 0);
    expect(untagged.map((p) => p.slug)).toEqual([]);
  });

  // Sam's client-naming ruling of 2026-07-12
  // (output/SAM-ClientNaming-Decisions-20260712.md). `garden` and `publicis`
  // survived the sitewide anonymisation pass as TAGS, and shipped live as
  // <meta property="article:tag"> on the very posts whose slugs and bodies had
  // been rewritten to hide those names. The ruling is text-only for the logo
  // bar; metadata is text.
  it('never carries an anonymised client name as a tag', () => {
    const forbidden = [
      'garden', 'publicis', 'bochk', 'boc', 'clp', 'playmates', 'hp', 'litmus',
      'paly', 'bachar', 'hkej', 'hku', 'cuhk', 'hkust',
    ];
    const offenders = [];
    posts.forEach((post) => {
      (post.tags || []).forEach((tag) => {
        if (forbidden.includes(tag.toLowerCase())) offenders.push(`${post.slug}: ${tag}`);
      });
    });
    expect(offenders).toEqual([]);
  });

  // The tags used to restate the badge already printed on every listing entry,
  // which is why `case-study` existed as both. ServiceCta and the trainer
  // banner now read post.type for that signal.
  it('does not duplicate the type field as a tag', () => {
    const types = [...new Set(posts.map((post) => post.type))];
    const overlap = CANONICAL_TAGS.filter((tag) => types.includes(tag));
    expect(overlap).toEqual([]);
  });

  it('offers topic clusters that actually narrow the list', () => {
    const clusters = topicClusters(posts);
    expect(clusters.length).toBeGreaterThan(4);
    clusters.forEach(({ count }) => {
      expect(count).toBeGreaterThanOrEqual(3);
      expect(count).toBeLessThanOrEqual(posts.length * 0.5);
    });
  });
});

describe('related posts stay in the reader\'s language', () => {
  // Measured before the fix: 81% of the related-post slots under a Chinese post
  // pointed at English articles, on the best-behaving section of the site.
  it('has enough Chinese posts for a Chinese reader to have somewhere to go', () => {
    const zh = posts.filter((post) => post.language === 'zh-Hant');
    expect(zh.length).toBeGreaterThanOrEqual(4);
  });
});
