/**
 * Single place every analytics event goes through.
 *
 * Why this exists: before it, three components hand-rolled `if (window.posthog)`
 * and six more hand-rolled `if (window.gtag)`, so the two vendors disagreed about
 * what happened on the site and no single file could be audited. Everything now
 * dual-fires from here. Nothing outside this file should ever touch
 * window.posthog or window.gtag.
 *
 * Three constraints shape the design:
 *
 * 1. react-snap prerenders ~121 routes through puppeteer. Every export bails on
 *    the ReactSnap user agent, matching the guard in public/index.html.
 * 2. public/index.html loads PostHog inside requestIdleCallback, so
 *    window.posthog is undefined for the first frames. Early events are queued
 *    and drained rather than dropped.
 * 3. PostHog inits with defaults '2026-01-30', which means
 *    capture_pageview: 'history_change' and autocapture are already on. Do NOT
 *    add manual pageviews here — they would double-count.
 */

// ---------------------------------------------------------------------------
// Guards
// ---------------------------------------------------------------------------

const isPrerender = () => (
  typeof window === 'undefined'
  || typeof navigator === 'undefined'
  || navigator.userAgent === 'ReactSnap'
);

// ---------------------------------------------------------------------------
// GA4 mapping
//
// These event names and parameter strings are the ones GA4 has been receiving
// since March 2026. Changing them would split the historical reports in two, so
// they are preserved exactly. PostHog gets the cleaner names; GA4 gets its
// legacy vocabulary. A null mapping means the event is PostHog-only.
// ---------------------------------------------------------------------------

const GA_EVENTS = {
  cta_clicked: (p) => ['select_content', {
    content_type: 'cta',
    // Fall back to placement: an unlabelled CTA still reports where it was,
    // which beats item_id: undefined.
    item_id: p.cta_id || p.placement,
  }],
  outbound_click: (p) => ['click', {
    event_category: 'outbound',
    event_label: p.placement,
    transport_type: 'beacon',
  }],
  contact_form_started: () => ['form_start', { event_category: 'contact' }],
  contact_form_submitted: (p) => ['generate_lead', {
    event_category: 'contact',
    event_label: p.interest,
    value: 1,
  }],
  contact_form_failed: (p) => ['exception', {
    description: `contact_form_${p.reason}`,
    fatal: false,
  }],
  newsletter_subscribed: (p) => ['sign_up', {
    event_category: 'newsletter',
    method: p.magnet ? 'lead_magnet' : 'substack',
  }],
  lead_magnet_downloaded: (p) => ['file_download', {
    event_category: 'newsletter',
    event_label: p.magnet,
  }],
  booking_embed_loaded: null,
  booking_embed_failed: (p) => ['exception', {
    description: `booking_embed_${p.reason}`,
    fatal: false,
  }],
};

// ---------------------------------------------------------------------------
// Deferred-load queue
//
// booking_embed_failed can fire within ~1s of load and would otherwise race the
// requestIdleCallback that boots PostHog. Bounded on both count and age so a
// visitor who blocks PostHog entirely never accumulates state.
// ---------------------------------------------------------------------------

const MAX_QUEUE = 20;
const GIVE_UP_MS = 15000;
const DRAIN_INTERVAL_MS = 400;

let queue = [];
let drainTimer = null;
let firstQueuedAt = 0;

const posthogReady = () => (
  window.posthog && typeof window.posthog.capture === 'function'
);

const stopDraining = () => {
  if (drainTimer) {
    clearInterval(drainTimer);
    drainTimer = null;
  }
  queue = [];
  firstQueuedAt = 0;
};

const drain = () => {
  if (posthogReady()) {
    queue.forEach(({ event, props, options }) => {
      try {
        window.posthog.capture(event, props, options);
      } catch {
        // A single bad event must not abort the rest of the queue.
      }
    });
    stopDraining();
    return;
  }
  if (firstQueuedAt && Date.now() - firstQueuedAt > GIVE_UP_MS) {
    stopDraining();
  }
};

const enqueue = (event, props, options) => {
  if (queue.length >= MAX_QUEUE) return;
  if (!firstQueuedAt) firstQueuedAt = Date.now();
  queue.push({ event, props, options });
  if (!drainTimer) drainTimer = setInterval(drain, DRAIN_INTERVAL_MS);
};

// ---------------------------------------------------------------------------
// track
// ---------------------------------------------------------------------------

/**
 * Fire one event to PostHog and (where mapped) GA4.
 *
 * @param {string} event      snake_case name from the 9-event taxonomy
 * @param {object} props      event properties; `beacon: true` forces sendBeacon
 */
export const track = (event, props = {}) => {
  if (isPrerender()) return;

  const { beacon, ...rest } = props;
  const payload = {
    ...rest,
    path: window.location.pathname,
    lang: window.location.pathname.startsWith('/zh') ? 'zh' : 'en',
  };
  // sendBeacon survives the unload of a same-tab outbound navigation. Only used
  // where the link has no target="_blank", because XHR would be cancelled.
  const options = beacon ? { transport: 'sendBeacon' } : undefined;

  // The two vendors fire in separate try/catch blocks on purpose: this runs
  // inside <a> click handlers, and a throw from a broken vendor script would
  // block the user's navigation.
  try {
    if (posthogReady()) {
      window.posthog.capture(event, payload, options);
    } else {
      enqueue(event, payload, options);
    }
  } catch {
    // Analytics must never break the page.
  }

  try {
    const mapper = GA_EVENTS[event];
    if (mapper && typeof window.gtag === 'function') {
      const [gaName, gaParams] = mapper(payload);
      window.gtag('event', gaName, gaParams);
    }
  } catch {
    // Analytics must never break the page.
  }
};

// ---------------------------------------------------------------------------
// identifyLead
// ---------------------------------------------------------------------------

/**
 * Attach a name to an anonymous visitor.
 *
 * PostHog inits with person_profiles: 'identified_only' (implied by defaults
 * '2026-01-30'), so anonymous visitors generate events but no person record.
 * On identify(), PostHog merges $anon_distinct_id — every earlier pageview,
 * cta_clicked and the session replay of that whole session retro-attach to the
 * named person. At this site's traffic that retro-attach is the entire point:
 * one lead is worth reading end to end.
 *
 * PRIVACY: the email becomes the distinct_id and is stored on PostHog US Cloud.
 * The site discloses this in plain language under the contact form and in the
 * footer. Nothing calls posthog.reset(), so on a shared device a later
 * visitor's events would attach to this person — acceptable on a personal site,
 * noted here so it is a decision rather than an oversight.
 *
 * @param {string} rawEmail   the address the visitor typed
 * @param {object} props      name, interest, identified_via
 */
export const identifyLead = (rawEmail, props = {}) => {
  if (isPrerender()) return;

  const email = String(rawEmail || '').trim().toLowerCase();
  // Never create a person record from garbage — a junk distinct_id is
  // permanent and unmergeable.
  if (email.indexOf('@') < 1 || email.endsWith('@')) return;

  try {
    if (!window.posthog || typeof window.posthog.identify !== 'function') return;
    window.posthog.identify(
      email,
      {
        email,
        ...(props.name && { name: props.name }),
        ...(props.interest && { latest_interest: props.interest }),
        identified_via: props.identified_via,
      },
      {
        first_identified_at: new Date().toISOString(),
        first_identified_via: props.identified_via,
        ...(props.interest && { first_interest: props.interest }),
        first_landing_path: window.location.pathname,
      },
    );
  } catch {
    // Analytics must never break the page.
  }
};

// ---------------------------------------------------------------------------
// Delegated outbound / CTA click tracking
// ---------------------------------------------------------------------------

const WHATSAPP_NUMBER = 'wa.me';

const socialHosts = [
  'linkedin.com', 'threads.net', 'threads.com', 'x.com', 'twitter.com',
  'github.com', 'instagram.com', 'youtube.com', 'substack.com',
];

/**
 * Classify an anchor into one of the taxonomy's two click events.
 * Returns null for links we deliberately do not track (in-page anchors,
 * ordinary internal navigation).
 */
const classify = (anchor) => {
  const raw = anchor.getAttribute('href') || '';
  if (!raw || raw.startsWith('#')) return null;

  if (raw.startsWith('mailto:')) {
    return { event: 'outbound_click', props: { channel: 'email' } };
  }
  if (raw.startsWith('tel:')) {
    return { event: 'outbound_click', props: { channel: 'phone' } };
  }

  let url;
  try {
    url = new URL(raw, window.location.origin);
  } catch {
    return null;
  }

  const isInternal = url.origin === window.location.origin;

  if (isInternal) {
    // The lead magnet is a same-origin PDF, so it is a conversion, not a CTA.
    if (url.pathname.endsWith('.pdf')) {
      return {
        event: 'lead_magnet_downloaded',
        props: { magnet: url.pathname.split('/').pop() },
      };
    }
    // Only the two funnel destinations are worth an event, in either language
    // (/book, /contact, /zh/book, /zh/contact). Ordinary internal navigation is
    // already covered by PostHog's history_change pageviews.
    if (/^\/(?:zh\/)?(?:book|contact)(?:\/|$)/.test(url.pathname)) {
      return {
        event: 'cta_clicked',
        props: { destination: url.pathname },
      };
    }
    return null;
  }

  if (url.hostname.includes(WHATSAPP_NUMBER)) {
    return { event: 'outbound_click', props: { channel: 'whatsapp' } };
  }
  if (url.hostname.endsWith('ro.am')) {
    return { event: 'outbound_click', props: { channel: 'roam_direct' } };
  }
  if (url.hostname.endsWith('adaptig.ai') || url.hostname.endsWith('adaptig.com')) {
    return { event: 'outbound_click', props: { channel: 'adaptig' } };
  }
  if (socialHosts.some((h) => url.hostname.endsWith(h))) {
    return { event: 'outbound_click', props: { channel: 'social' } };
  }
  return {
    event: 'outbound_click',
    props: { channel: 'other', href_host: url.hostname },
  };
};

/**
 * Derive a stable placement label.
 *
 * The three WhatsApp values here are the exact GA4 event_labels the removed
 * inline onClick handlers used to send, so GA4 reporting stays continuous
 * across this refactor.
 */
const placementOf = (anchor) => {
  const explicit = anchor.getAttribute('data-cta');
  if (explicit) return explicit;

  if (anchor.classList.contains('floating-whatsapp')) {
    return window.location.pathname.startsWith('/get-started')
      ? 'whatsapp_floating_landing'
      : 'whatsapp_floating';
  }
  if (anchor.classList.contains('email-capture__whatsapp')) return 'whatsapp';
  if (anchor.closest('.book-page__fallback')) return 'book_fallback';
  if (anchor.closest('footer')) return 'footer';
  if (anchor.closest('nav')) return 'nav';
  return 'body';
};

// Module-level so a second <Analytics> mount (App.js renders <Main /> as the
// Suspense fallback, which mounts one) cannot install a duplicate listener.
let installed = false;

/**
 * Install one capture-phase click listener that covers every outbound link and
 * funnel CTA on the site.
 *
 * This is deliberately a delegated listener rather than ~40 inline onClick
 * handlers: it changes zero markup, so the react-snap snapshot and the
 * hydration render stay identical. This codebase has been burned by React
 * hydration error #418 repeatedly (see App.js, index.js, ScrollReveal.js,
 * Book.js and scripts/inject-suspense-markers.js), and adding markup for
 * analytics is not worth reopening that.
 *
 * @returns {function} teardown
 */
export const installOutboundTracking = () => {
  if (isPrerender() || installed) return () => {};
  installed = true;

  const onClick = (e) => {
    const anchor = e.target && e.target.closest
      ? e.target.closest('a[href]')
      : null;
    if (!anchor) return;

    const hit = classify(anchor);
    if (!hit) return;

    // Without target="_blank" the click unloads this document, which cancels an
    // in-flight XHR. Every icon in src/data/contact.js renders this way.
    const sameTab = anchor.getAttribute('target') !== '_blank';
    const ctaId = anchor.getAttribute('data-cta');

    track(hit.event, {
      ...hit.props,
      // cta_id is the deliberate, stable name from a data-cta attribute.
      // placement is always present and is derived from position when no
      // attribute was set, so every event is attributable either way.
      ...(ctaId && { cta_id: ctaId }),
      placement: placementOf(anchor),
      ...(sameTab && { beacon: true }),
    });
  };

  document.addEventListener('click', onClick, true);

  return () => {
    document.removeEventListener('click', onClick, true);
    installed = false;
  };
};
