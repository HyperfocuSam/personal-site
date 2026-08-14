import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import cases from '../data/cases';
import posts from '../data/posts';
import testimonialData from '../data/testimonialData';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import {
  imageDimensions, datesFor, locationFor, splitLedger,
} from '../data/casePeriods';

const PERSON_ID = `${SITE_URL}/#person`;

// Absorbed from /testimonials and /clients (retired 2026-08-12). The site had
// three separate social-proof pages — this one for delivered engagements,
// /clients for the case-study write-ups, /testimonials for the quotes — which
// split the same argument across three URLs competing for the same query.
// /case-notes wins: it is the page in the nav and it carries the ItemList and
// EducationEvent schema. Nothing was dropped; the other two now 301 here.
const voiceClusters = [
  { id: 'corporate', title: 'Enterprise training', quotes: testimonialData.corporate },
  { id: 'public-classes', title: 'Public classes', quotes: testimonialData.aboutSam },
  { id: 'academy', title: 'DotAI Academy', quotes: testimonialData.academy },
];

// Case-study posts that are NOT already linked from a case note above, so the
// same engagement never appears twice on the page.
const linkedSlugs = new Set(cases.map((entry) => entry.blogSlug).filter(Boolean));
const writeUps = posts
  .filter((post) => post.type === 'case-study'
    && post.language !== 'zh-Hant'
    && !linkedSlugs.has(post.slug));

const { deepDives, ledger } = splitLedger(cases);

const CaseNotes = () => {
  const caseNotesJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/case-notes/#case-notes-list`,
        name: 'Case Notes',
        itemListElement: cases.map((entry) => ({
          '@type': 'EducationEvent',
          '@id': `${SITE_URL}/case-notes/#${entry.id}`,
          name: `${entry.org} — ${entry.title}`,
          description: entry.summary,
          ...datesFor(entry.period),
          location: {
            '@type': 'Place',
            name: locationFor(entry.id),
            address: {
              '@type': 'PostalAddress',
              addressLocality: locationFor(entry.id),
            },
          },
          organizer: { '@id': PERSON_ID },
          ...(entry.blogSlug
            ? { subjectOf: `${SITE_URL}/blog/${entry.blogSlug}/` }
            : {}),
        })),
      },
    ],
  };

  return (
    <Main
      title="Case Notes"
      description="Delivered engagements, with receipts. Named where the client is already public; described where they are not."
      canonicalUrl={`${SITE_URL}/case-notes`}
      ogTitle="Case Notes | Sam Wong"
      ogDescription="Delivered engagements, with receipts. Named where the client is already public; described where they are not."
      ogImage={DEFAULT_OG_IMAGE}
      ogUrl={`${SITE_URL}/case-notes`}
      ogType="website"
      twitterTitle="Case Notes | Sam Wong"
      twitterDescription="Delivered engagements, with receipts. Named where the client is already public; described where they are not."
      twitterImage={DEFAULT_OG_IMAGE}
      hreflangTags={[
        { lang: 'en', href: `${SITE_URL}/case-notes` },
        { lang: 'zh-Hant', href: `${SITE_URL}/zh/case-notes` },
        { lang: 'x-default', href: `${SITE_URL}/case-notes` },
      ]}
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(caseNotesJsonLd)}</script>
      </Helmet>

      <article className="case-notes field-notes-content" id="case-notes">
        <header className="case-notes__hero">
          <div className="case-notes__hero-inner">
            <p className="fn-stamp fn-stamp--verified">Field record / verified</p>
            <h1>Case Notes</h1>
            <p>
              Delivered engagements, with receipts. Named where the client is already
              public; described where they are not.
            </p>
          </div>
        </header>

        <section className="case-notes__section" aria-labelledby="deep-dives-heading">
          <div className="case-notes__section-inner">
            <h2 id="deep-dives-heading"><span className="fn-highlight">Deep dives</span></h2>
            <div className="case-notes__deep-list">
              {deepDives.map((entry) => {
                const dimensions = entry.image ? imageDimensions[entry.image] : null;

                return (
                  <article className="case-note case-note--deep fn-card" id={entry.id} key={entry.id}>
                    <div className="case-note__period">
                      <span className="fn-stamp">{entry.period}</span>
                    </div>
                    <div className="case-note__content">
                      <div className="case-note__heading-row">
                        <div>
                          <p className="case-note__org">{entry.org}</p>
                          <h3>{entry.title}</h3>
                        </div>
                        <span className="case-note__type fn-stamp">{entry.type}</span>
                      </div>
                      <p className="case-note__scale">{entry.scale}</p>

                      {entry.image && (
                        <img
                          className="case-note__image"
                          src={entry.image}
                          alt={`${entry.org} — ${entry.title}`}
                          loading="lazy"
                          width={dimensions.width}
                          height={dimensions.height}
                        />
                      )}

                      <ul className="case-note__receipts">
                        {entry.receipts.map((receipt) => (
                          <li className="case-note__receipt fn-receipt" key={receipt}>
                            <span
                              className="case-note__receipt-mark fn-stamp fn-stamp--verified"
                              aria-hidden="true"
                            >
                              ✓
                            </span>
                            <span>{receipt}</span>
                          </li>
                        ))}
                      </ul>

                      <p className="case-note__summary">{entry.summary}</p>
                      {entry.blogSlug && (
                        <Link className="case-note__link" to={`/blog/${entry.blogSlug}/`}>
                          Read the full case →
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="case-notes__section case-notes__section--ledger" aria-labelledby="ledger-heading">
          <div className="case-notes__section-inner">
            <h2 id="ledger-heading">The ledger</h2>
            <div className="case-notes__ledger">
              {ledger.map((entry) => (
                <article className="case-note case-note--compact fn-entry" key={entry.id}>
                  <div className="case-note__period">
                    <span className="fn-stamp">{entry.period}</span>
                    <span className="case-note__type fn-stamp">{entry.type}</span>
                  </div>
                  <div className="case-note__content">
                    <p className="case-note__org">{entry.org}</p>
                    <h3>{entry.title}</h3>
                    <p className="case-note__compact-receipt">{entry.receipts[0]}</p>
                    {entry.blogSlug && (
                      <Link className="case-note__link" to={`/blog/${entry.blogSlug}/`}>
                        Read the full case →
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="case-notes__section" aria-labelledby="voices-heading">
          <div className="case-notes__section-inner">
            <h2 id="voices-heading">What people said</h2>
            {voiceClusters.map((cluster) => (
              <div className="case-notes__voices" key={cluster.id}>
                <h3 className="case-notes__voices-title">{cluster.title}</h3>
                <div className="testimonials__compact-list">
                  {cluster.quotes.map((quote) => (
                    <div className="testimonial-compact fn-entry" key={quote.quote}>
                      <p className="testimonial-compact__quote">{quote.quote}</p>
                      <p className="testimonial-compact__author">{quote.attribution}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          className="case-notes__section case-notes__section--ledger"
          aria-labelledby="writeups-heading"
        >
          <div className="case-notes__section-inner">
            <h2 id="writeups-heading">Written up in full</h2>
            <ul className="case-notes__writeups">
              {writeUps.map((post) => (
                <li className="case-notes__writeup fn-entry" key={post.slug}>
                  <Link to={`/blog/${post.slug}/`}>{post.title}</Link>
                  <span className="fn-stamp">{dayjs(post.date).format('MMM YYYY')}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="case-notes__cta">
          <Link className="button" to="/book" data-cta="case_notes_book">Book a call</Link>
        </section>
      </article>
    </Main>
  );
};

export default CaseNotes;
