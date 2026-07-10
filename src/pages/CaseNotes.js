import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import cases from '../data/cases';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import '../static/css/pages/_case-notes.scss';

const PERSON_ID = `${SITE_URL}/#person`;

const imageDimensions = {
  '/images/blog/bochk-sam-presenting.webp': { width: 2856, height: 2760 },
  '/images/blog/ctf-workshop-2026.jpeg': { width: 1200, height: 799 },
  '/images/blog/hkct-ai-workshop.jpg': { width: 1200, height: 900 },
};

const monthNumbers = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

const periodEndValue = (period) => {
  if (period.endsWith('ongoing')) return Number.MAX_SAFE_INTEGER;

  const years = period.match(/\d{4}/g);
  const endMonth = period.match(/([A-Z][a-z]{2})(?: \d{4})?$/);
  return (Number(years[years.length - 1]) * 12) + monthNumbers[endMonth[1]];
};

const deepDives = cases.filter((entry) => entry.deepDive);
const ledger = cases
  .filter((entry) => !entry.deepDive)
  .map((entry, index) => ({ entry, index }))
  .sort((a, b) => periodEndValue(b.entry.period) - periodEndValue(a.entry.period)
    || a.index - b.index)
  .map(({ entry }) => entry);

const locationFor = (id) => {
  if (id === 'ypo-la') return 'Los Angeles';
  if (id === 'us-coaching') return 'United States';
  return 'Hong Kong';
};

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
          location: {
            '@type': 'Place',
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

        <section className="case-notes__cta">
          <Link className="button" to="/book">Book a call</Link>
        </section>
      </article>
    </Main>
  );
};

export default CaseNotes;
