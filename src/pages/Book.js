import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import RoamEmbed, { ROAM_LOBBY_URL } from '../components/Book/RoamEmbed';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';

// The scheduler and its failure detection live in components/Book/RoamEmbed —
// shared with /zh/book so the two pages cannot drift apart.
const Book = () => (
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
      { lang: 'zh-Hant', href: `${SITE_URL}/zh/book` },
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
          <RoamEmbed placement="book_page" />
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

export default Book;
