import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import { track } from '../utils/track';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';

const ROAM_EMBED_SCRIPT = 'https://ro.am/lobbylinks/embed.js';
const ROAM_LOBBY_URL = 'https://ro.am/samwong/';
const ACCENT_COLOR = '#c8965a';
const LOAD_TIMEOUT_MS = 8000;

/**
 * The site's primary CTA, and until 2026-08-11 the least observable page on it.
 *
 * The Ro.am lobby is a cross-origin iframe, so slot selection and booking
 * completion are invisible to us and any "bookings" number derived here would
 * be fabricated. What this instrumentation measures is DELIVERY: did the
 * scheduler actually render for this human, and if not, why.
 *
 * That distinction is not academic. From 2026-05-15 the site's own CSP omitted
 * ro.am from script-src and frame-src, so this page rendered an empty box for
 * three months while pageviews looked perfectly healthy.
 */
const Book = () => {
  const containerRef = useRef(null);
  const settledRef = useRef(false);

  useEffect(() => {
    // react-snap would otherwise bake this <script> into build/book/index.html
    // and every real visitor would pay for a duplicate request.
    if (navigator.userAgent === 'ReactSnap') return undefined;

    const el = containerRef.current;
    if (!el) return undefined;

    const t0 = (window.performance && window.performance.now()) || 0;
    const elapsed = () => Math.round(
      ((window.performance && window.performance.now()) || 0) - t0,
    );

    // Only the first outcome counts: onSizeChange fires repeatedly as the
    // widget resizes, and a CSP refusal trips both the violation event and
    // script.onerror.
    const settle = (event, props) => {
      if (settledRef.current) return;
      settledRef.current = true;
      track(event, props);
    };

    // Highest-signal detector on the page, and the one that would have caught
    // the 2026-05 outage on day one instead of month three.
    const onViolation = (e) => {
      if ((e.blockedURI || '').includes('ro.am')) {
        settle('booking_embed_failed', {
          reason: 'csp_blocked',
          blocked_uri: e.blockedURI,
          violated_directive: e.violatedDirective,
          elapsed_ms: elapsed(),
        });
      }
    };
    document.addEventListener('securitypolicyviolation', onViolation);

    const script = document.createElement('script');
    script.src = ROAM_EMBED_SCRIPT;
    script.async = true;
    script.onerror = () => settle('booking_embed_failed', {
      reason: 'script_error',
      elapsed_ms: elapsed(),
    });
    script.onload = () => {
      if (!window.Roam) {
        settle('booking_embed_failed', {
          reason: 'no_global',
          elapsed_ms: elapsed(),
        });
        return;
      }
      window.Roam.initLobbyEmbed({
        url: ROAM_LOBBY_URL,
        parentElement: el,
        accentColor: ACCENT_COLOR,
        theme: 'light',
        lobbyConfiguration: 'default',
        onSizeChange: (_width, height) => {
          el.style.height = `${height}px`;
          // Best available proof of life: onSizeChange only fires once the
          // cross-origin frame posts back, so the script loaded AND executed
          // AND the handshake succeeded.
          settle('booking_embed_loaded', { load_ms: elapsed() });
        },
      });
    };
    document.body.appendChild(script);

    const timer = setTimeout(() => {
      const frame = el.querySelector('iframe');
      if (!frame || !frame.offsetHeight) {
        settle('booking_embed_failed', {
          reason: 'timeout',
          elapsed_ms: LOAD_TIMEOUT_MS,
        });
      }
    }, LOAD_TIMEOUT_MS);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('securitypolicyviolation', onViolation);
      script.remove();
    };
  }, []);

  return (
    <Main
      title="Book a Call"
      description="Book a free discovery call or AI coaching session with Sam Wong. Available for 1-1 coaching, executive advisory, and team training consultations."
      canonicalUrl={`${SITE_URL}/book`}
      ogTitle="Book a Call | Sam Wong"
      ogDescription="Schedule a free discovery call or AI coaching session."
      ogImage={DEFAULT_OG_IMAGE}
      ogUrl={`${SITE_URL}/book`}
      ogType="website"
      twitterTitle="Book a Call | Sam Wong"
      twitterDescription="Schedule a free discovery call or AI coaching session."
      twitterImage={DEFAULT_OG_IMAGE}
      hreflangTags={[
        { lang: 'en', href: `${SITE_URL}/book` },
        { lang: 'x-default', href: `${SITE_URL}/book` },
      ]}
    >
      {/* The site's primary CTA had no page-level structured data at all, so
          the one thing an AI engine most needs to answer — "how do I actually
          engage him, and what does the first step cost" — was unreadable here.
          The free discovery call is stated as a priced Offer precisely because
          "free" is the answer that removes the objection. */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${SITE_URL}/book/#webpage`,
            url: `${SITE_URL}/book/`,
            name: 'Book a Call with Sam Wong',
            description: 'Book a free 30-minute discovery call or a paid coaching session with Sam Wong, Co-Founder & Director of Academy at Adaptig, Hong Kong.',
            inLanguage: 'en',
            isPartOf: { '@id': `${SITE_URL}/#website` },
            about: { '@id': `${SITE_URL}/#person` },
            potentialAction: {
              '@type': 'ScheduleAction',
              name: 'Book a discovery call',
              target: ROAM_LOBBY_URL,
            },
            mainEntity: {
              '@type': 'Service',
              name: 'AI coaching and advisory with Sam Wong',
              serviceType: ['AI Coaching', 'Executive AI Advisory', 'Corporate AI Training'],
              provider: { '@type': 'Person', name: 'Sam Wong', url: SITE_URL },
              areaServed: ['Hong Kong', 'Asia-Pacific', 'Global'],
              availableLanguage: ['English', 'Cantonese', 'Mandarin'],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Ways to start',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    name: 'Discovery Call',
                    description: 'Define your goals and see if coaching is a fit. No pressure, no pitch.',
                    price: '0',
                    priceCurrency: 'HKD',
                    availability: 'https://schema.org/InStock',
                    url: `${SITE_URL}/book/`,
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Discovery Call',
                      description: '30-minute introductory call.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    name: 'Coaching Session',
                    description: 'Focused 60-90 minute work on your active projects and workflows.',
                    availability: 'https://schema.org/InStock',
                    url: `${SITE_URL}/book/`,
                    itemOffered: {
                      '@type': 'Service',
                      name: 'One-to-one AI Coaching Session',
                      description: 'Personalised coaching on AI tools and workflows for professionals.',
                    },
                  },
                ],
              },
            },
          })}
        </script>
      </Helmet>
      <article className="post book-page field-notes-content" id="book">
        <header className="page-hero page-hero--dark">
          <div className="content-narrow">
            <div className="title">
              {/* Was wrapped in <Link to="/book"> — a heading linking to its own
                  page. Same pattern removed from /about and every post. */}
              <h1>Book a Call</h1>
              <p>
                Whether it&apos;s a free discovery call or a focused coaching
                session, pick a time that works and I&apos;ll be there.
              </p>
            </div>
          </div>
        </header>

        <section className="book-page__embed-section">
          <div className="book-page__embed-wrap">
            <div className="roam-embed-container" ref={containerRef} />
            <p className="book-page__fallback">
              {'If the scheduler doesn’t load, '}
              <a href={ROAM_LOBBY_URL} target="_blank" rel="noopener noreferrer">
                book directly on Ro.am
              </a>
              {' or '}
              <Link to="/contact">contact me</Link>
              .
            </p>
          </div>
        </section>

        <section className="book-page__context" aria-labelledby="book-options-heading">
          <div className="content-narrow">
            {/* The page went H1 -> H4 with no section heading between them. */}
            <h2 className="book-page__options-heading" id="book-options-heading">
              What you can book
            </h2>
            <div className="book-page__options">
              <div className="book-page__option fn-card">
                <h3>Discovery Call</h3>
                <span className="book-page__label fn-stamp">Free, 30 min</span>
                <p>
                  Define your goals and see if coaching is a fit.
                  No pressure, no pitch.
                </p>
              </div>
              <div className="book-page__option fn-card">
                <h3>Coaching Session</h3>
                <span className="book-page__label fn-stamp">60-90 min</span>
                <p>
                  Focused work on your active projects and workflows.
                  We start from your real constraints.
                </p>
              </div>
              <div className="book-page__option fn-card">
                <h3>Something Else?</h3>
                <span className="book-page__label fn-stamp">Let&apos;s talk</span>
                {/* Single-expression text: adjacent nodes break hydration (#418) */}
                <p>
                  {'For executive advisory, team training, or speaking, '}
                  <Link to="/contact">reach out directly</Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </article>
    </Main>
  );
};

export default Book;
