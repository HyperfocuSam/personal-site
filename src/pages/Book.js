import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';

const ROAM_EMBED_SCRIPT = 'https://ro.am/lobbylinks/embed.js';
const ROAM_LOBBY_URL = 'https://ro.am/samwong/';
const ACCENT_COLOR = '#c8965a';

const Book = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const script = document.createElement('script');
    script.src = ROAM_EMBED_SCRIPT;
    script.async = true;
    script.onload = () => {
      if (window.Roam) {
        window.Roam.initLobbyEmbed({
          url: ROAM_LOBBY_URL,
          parentElement: el,
          accentColor: ACCENT_COLOR,
          theme: 'light',
          lobbyConfiguration: 'default',
          onSizeChange: (_width, height) => {
            el.style.height = `${height}px`;
          },
        });
      }
    };
    document.body.appendChild(script);

    return () => {
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
      <article className="post book-page field-notes-content" id="book">
        <header className="page-hero page-hero--dark">
          <div className="content-narrow">
            <div className="title">
              <h1>
                <Link to="/book">Book a Call</Link>
              </h1>
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

        <section className="book-page__context">
          <div className="content-narrow">
            <div className="book-page__options">
              <div className="book-page__option fn-card">
                <h4>Discovery Call</h4>
                <span className="book-page__label fn-stamp">Free, 30 min</span>
                <p>
                  Define your goals and see if coaching is a fit.
                  No pressure, no pitch.
                </p>
              </div>
              <div className="book-page__option fn-card">
                <h4>Coaching Session</h4>
                <span className="book-page__label fn-stamp">60-90 min</span>
                <p>
                  Focused work on your active projects and workflows.
                  We start from your real constraints.
                </p>
              </div>
              <div className="book-page__option fn-card">
                <h4>Something Else?</h4>
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
