/**
 * @jest-environment jsdom
 *
 * jsdom, not node: setupFilesAfterEach loads src/setupTests.js for every suite
 * and it touches `window` at module scope.
 */

import { installOutboundTracking } from '../utils/track';

const pathnameOf = (href) => new URL(href, 'http://example.com').pathname;

// Delegated listener reads e.target.closest('a[href]') — a bare anchor
// appended to document.body and clicked is enough to exercise it, no router.
const clickLink = (href, attrs = {}) => {
  const anchor = document.createElement('a');
  anchor.setAttribute('href', href);
  Object.entries(attrs).forEach(([key, value]) => anchor.setAttribute(key, value));
  document.body.appendChild(anchor);
  anchor.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  return anchor;
};

const ctaCalls = () => window.posthog.capture.mock.calls
  .filter(([event]) => event === 'cta_clicked');

let teardown;
let preventNav;

beforeEach(() => {
  window.posthog = { capture: jest.fn() };
  teardown = installOutboundTracking();
  // Bubble phase, so it runs after the tracker's own capture-phase listener.
  // Silences jsdom's "Not implemented: navigation" error for same-tab clicks.
  preventNav = (e) => e.preventDefault();
  document.addEventListener('click', preventNav);
});

afterEach(() => {
  teardown();
  document.removeEventListener('click', preventNav);
  document.body.innerHTML = '';
  delete window.posthog;
  window.history.pushState({}, '', '/');
});

describe('cta_clicked fires for both languages\' funnel destinations', () => {
  it.each([
    '/zh/book',
    '/zh/book/',
    '/zh/contact',
    '/zh/contact?interest=trainer',
    '/book',
    '/contact/',
  ])('captures cta_clicked with a matching destination for %s', (href) => {
    clickLink(href);
    const [event, payload] = ctaCalls()[0];
    expect(event).toBe('cta_clicked');
    expect(payload.destination).toBe(pathnameOf(href));
  });
});

describe('non-funnel links stay silent', () => {
  it.each([
    '/zh/blog/some-post/',
    '/bookshelf',
    '#anchor',
  ])('does not capture cta_clicked for %s', (href) => {
    clickLink(href);
    expect(ctaCalls()).toHaveLength(0);
  });
});

describe('data-cta plumbing', () => {
  it('threads an explicit data-cta into cta_id and placement', () => {
    clickLink('/book', { 'data-cta': 'home_band_book' });
    const [, payload] = ctaCalls()[0];
    expect(payload.cta_id).toBe('home_band_book');
    expect(payload.placement).toBe('home_band_book');
  });

  it('falls back to body placement when there is no data-cta', () => {
    clickLink('/book');
    const [, payload] = ctaCalls()[0];
    expect(payload.cta_id).toBeUndefined();
    expect(payload.placement).toBe('body');
  });
});

describe('lang', () => {
  it('reports zh when the click happens on a /zh page', () => {
    window.history.pushState({}, '', '/zh/');
    clickLink('/zh/book');
    const [, payload] = ctaCalls()[0];
    expect(payload.lang).toBe('zh');
  });
});
