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

// The site's two money paths are third-party origins, and the Content-Security
// -Policy is the one file that can kill them without raising an error anywhere.
// It did: from 2026-05-15 to 2026-08-11, formspree.io was missing from
// connect-src and every contact-form submission was refused. Fifteen people
// submitted three to six times each in that window. The console showed a CSP
// violation; nothing else did, and the form told them "Network error".
//
// These assertions exist so the next omission fails the build instead of the
// funnel.
describe('conversion origins survive in the CSP', () => {
  const vercel = JSON.parse(read('vercel.json'));
  const policy = vercel.headers
    .flatMap((entry) => entry.headers)
    .find((h) => h.key === 'Content-Security-Policy');

  const directive = (name) => {
    const match = policy.value.split(';').map((d) => d.trim())
      .find((d) => d.startsWith(`${name} `));
    return match || '';
  };

  it('serves a CSP header at all', () => {
    expect(policy).toBeDefined();
  });

  it('lets the contact form POST to its own /api/contact', () => {
    // Since 2026-08-14 the form posts same-origin to api/contact.js (Resend).
    // connect-src 'self' covers the fetch() the React handler makes;
    // form-action 'self' covers the native POST fallback that fires when React
    // never hydrated. Losing either one breaks a real path.
    expect(directive('connect-src')).toMatch(/'self'/);
    expect(directive('form-action')).toMatch(/'self'/);
  });

  it('has retired the Formspree rollback', () => {
    // The cutover week is over: the Resend path was exercised end to end on
    // 2026-08-15 through both the English and Chinese forms and both messages
    // were confirmed delivered. Dead allowances are not free — a CSP nobody
    // trusts as a list of what the site actually talks to is a CSP nobody
    // reads carefully, which is how the next omission gets in.
    expect(directive('connect-src')).not.toContain('formspree.io');
    expect(directive('form-action')).not.toContain('formspree.io');
  });

  it('lets GTM report the generate_lead conversion', () => {
    // The same omission as 2026-05-15, caught 2026-08-15 in a real browser and
    // never in review: gtag posts the Google Ads conversion beacon to
    // https://www.google.com/measurement/conversion — a different origin from
    // the google-analytics.com one below — and it was refused on pageview and
    // again on submit, the second carrying value=1. GA4's own collection
    // endpoint was allowed throughout, so the event was in GA4 reports and
    // absent from Ads conversion measurement, which is exactly the kind of
    // half-failure that reads as "working".
    expect(directive('connect-src')).toContain('https://www.google.com');
  });

  it('lets the booking page load and frame the Ro.am embed', () => {
    expect(directive('script-src')).toContain('https://ro.am');
    expect(directive('frame-src')).toContain('https://ro.am');
    expect(directive('connect-src')).toContain('https://ro.am');
  });

  it('still allows the two analytics vendors', () => {
    expect(directive('connect-src')).toContain('posthog.com');
    expect(directive('connect-src')).toContain('google-analytics.com');
    expect(directive('script-src')).toContain('googletagmanager.com');
  });

  // A meta CSP and a header CSP are enforced as an intersection, so a second
  // copy means an origin has to be added twice or it is silently blocked by
  // whichever one was forgotten. Retired 2026-08-12; the header is the policy.
  it('keeps the policy in exactly one place', () => {
    expect(read('public/index.html')).not.toMatch(/http-equiv="Content-Security-Policy"/);
  });
});

describe('pageview paths are recorded in one shape', () => {
  // /about had 43 entry sessions and /about/ had 31 — the same page, split in
  // two, because client-side navigation writes the unslashed form. Every
  // path-grouped number was halved until this normaliser went in.
  it('normalises $pathname in the PostHog init', () => {
    const html = read('public/index.html');
    expect(html).toMatch(/sanitize_properties/);
    expect(html).toMatch(/\$prev_pageview_pathname/);
  });
});
