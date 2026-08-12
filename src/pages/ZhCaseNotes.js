import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import zhCases from '../data/cases-zh';
import posts from '../data/posts';
import testimonialsZh from '../data/testimonials-zh';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import {
  imageDimensions, datesFor, locationFor, splitLedger,
} from '../data/casePeriods';

const PERSON_ID = `${SITE_URL}/#person`;

const { deepDives, ledger } = splitLedger(zhCases);

// The Chinese case-study posts. /case-notes explicitly EXCLUDES these
// (`post.language !== 'zh-Hant'`), so until this page existed the four Chinese
// write-ups were listed nowhere at all.
const linkedSlugs = new Set(zhCases.map((entry) => entry.blogSlug).filter(Boolean));
const zhWriteUps = posts
  .filter((post) => post.type === 'case-study'
    && post.language === 'zh-Hant'
    && !linkedSlugs.has(post.slug));

const ZhCaseNotes = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/zh/case-notes/#case-notes-list`,
        name: '案例記錄',
        inLanguage: 'zh-Hant',
        itemListElement: zhCases.map((entry) => ({
          '@type': 'EducationEvent',
          '@id': `${SITE_URL}/zh/case-notes/#${entry.id}`,
          name: `${entry.org} — ${entry.title}`,
          description: entry.summary,
          inLanguage: 'zh-Hant',
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
      title="案例記錄 — 交付過的企業 AI 培訓"
      description="21 個交付過的項目，連數字一齊放出來：銀行、食品製造、珠寶、玩具、教育、旅遊。客戶已公開的就寫名，未公開的就只寫行業。"
      canonicalUrl={`${SITE_URL}/zh/case-notes`}
      ogTitle="案例記錄 | Sam Wong"
      ogDescription="交付過的項目，連數字一齊放出來。客戶已公開的就寫名，未公開的就只寫行業。"
      ogImage={DEFAULT_OG_IMAGE}
      ogUrl={`${SITE_URL}/zh/case-notes`}
      ogType="website"
      twitterTitle="案例記錄 | Sam Wong"
      twitterDescription="交付過的項目，連數字一齊放出來。"
      twitterImage={DEFAULT_OG_IMAGE}
      hreflangTags={[
        { lang: 'en', href: `${SITE_URL}/case-notes` },
        { lang: 'zh-Hant', href: `${SITE_URL}/zh/case-notes` },
        { lang: 'x-default', href: `${SITE_URL}/case-notes` },
      ]}
    >
      <Helmet>
        <html lang="zh-Hant" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <article className="case-notes field-notes-content zh" id="zh-case-notes">
        <header className="case-notes__hero">
          <div className="case-notes__hero-inner">
            <p className="fn-stamp fn-stamp--verified">實地記錄 / 已核實</p>
            <h1>案例記錄</h1>
            <p>
              交付過的項目，連數字一齊放出來。客戶已經公開的就寫名，未公開的就只寫行業。
            </p>
          </div>
        </header>

        <section className="case-notes__section" aria-labelledby="zh-deep-dives-heading">
          <div className="case-notes__section-inner">
            <h2 id="zh-deep-dives-heading"><span className="fn-highlight">深入案例</span></h2>
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

                      {/* Receipts stay in their recorded language on purpose —
                          they quote participants. See src/data/cases-zh.js. */}
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
                          睇完整案例 →
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="case-notes__section case-notes__section--ledger" aria-labelledby="zh-ledger-heading">
          <div className="case-notes__section-inner">
            <h2 id="zh-ledger-heading">項目紀錄</h2>
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
                        睇完整案例 →
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="case-notes__section" aria-labelledby="zh-voices-heading">
          <div className="case-notes__section-inner">
            <h2 id="zh-voices-heading">客戶點講</h2>
            <div className="case-notes__voices">
              <div className="testimonials__compact-list">
                {testimonialsZh.map((item) => (
                  <div className="testimonial-compact fn-entry" key={item.quote}>
                    <p className="testimonial-compact__quote">{item.quote}</p>
                    <p className="testimonial-compact__author">
                      {[item.name, item.title, item.company].filter(Boolean).join('，')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {zhWriteUps.length > 0 && (
          <section
            className="case-notes__section case-notes__section--ledger"
            aria-labelledby="zh-writeups-heading"
          >
            <div className="case-notes__section-inner">
              <h2 id="zh-writeups-heading">完整寫成文章</h2>
              <ul className="case-notes__writeups">
                {zhWriteUps.map((post) => (
                  <li className="case-notes__writeup fn-entry" key={post.slug}>
                    <Link to={`/blog/${post.slug}/`}>{post.title}</Link>
                    <span className="fn-stamp">{dayjs(post.date).format('YYYY年M月')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="case-notes__cta">
          <Link className="button" to="/zh/book">預約通話</Link>
        </section>
      </article>
    </Main>
  );
};

export default ZhCaseNotes;
