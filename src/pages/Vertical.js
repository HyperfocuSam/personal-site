import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import { getVertical } from '../data/verticals';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';

// One component serves both languages. The alternative — ten near-identical page
// files — is how the twins drift apart, and the twins drifting apart is exactly
// what put the Chinese nav into English pages for months.
//
// SEO/GEO shape of each page, in order of what an answer engine reads first:
//   1. an <h1> that is the profession, not a slogan
//   2. `answer` as the first paragraph — self-contained and quotable, so a
//      citation lifts a whole thought rather than half a sentence
//   3. `proof` as a dated, attributable receipt
//   4. FAQPage JSON-LD, because the FAQ answers are written to BE the citation
//
// The page is a real page, not a doorway: the answer, bullets, receipt and FAQ
// are unique per profession. If a sixth is ever added, write it, do not clone it.

const Vertical = ({ slug, lang }) => {
  const vertical = getVertical(slug);
  const isZh = lang === 'zh';
  const copy = isZh ? vertical.zh : vertical.en;

  const enUrl = `${SITE_URL}/${slug}`;
  const zhUrl = `${SITE_URL}/zh/${slug}`;
  const selfUrl = isZh ? zhUrl : enUrl;

  const t = isZh
    ? {
      eyebrow: '為誰而設',
      whatYouGet: '課堂上會處理什麼',
      track: '往績',
      faq: '常見問題',
      book: '預約免費諮詢通話',
      others: '其他界別',
      allServices: '查看所有服務',
      backHome: '返回首頁',
    }
    : {
      eyebrow: 'Who this is for',
      whatYouGet: 'What the session covers',
      track: 'Track record',
      faq: 'Common questions',
      book: 'Book a free consultation call',
      others: 'Other professions',
      allServices: 'See all services',
      backHome: 'Back to home',
    };

  return (
    <Main
      title={copy.metaTitle}
      description={copy.answer.slice(0, 155)}
      ogTitle={`${copy.metaTitle} | Sam Wong`}
      ogDescription={copy.lede}
      ogImage={DEFAULT_OG_IMAGE}
      ogUrl={selfUrl}
      ogType="website"
      twitterTitle={`${copy.metaTitle} | Sam Wong`}
      twitterDescription={copy.lede}
      twitterImage={DEFAULT_OG_IMAGE}
      hreflangTags={[
        { lang: 'en', href: enUrl },
        { lang: 'zh-Hant', href: zhUrl },
        { lang: 'x-default', href: enUrl },
      ]}
    >
      <Helmet>
        <html lang={isZh ? 'zh-Hant' : 'en'} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: copy.title,
            description: copy.answer,
            url: selfUrl,
            inLanguage: isZh ? 'zh-Hant' : 'en',
            teaches: copy.bullets,
            provider: {
              '@type': 'Person',
              name: 'Sam Wong',
              url: SITE_URL,
            },
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'onsite',
              location: {
                '@type': 'Place',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Hong Kong',
                  addressCountry: 'HK',
                },
              },
              courseWorkload: 'PT3H',
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: copy.faq.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: isZh ? '首頁' : 'Home',
                item: isZh ? `${SITE_URL}/zh` : SITE_URL,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: isZh ? '服務' : 'Services',
                item: isZh ? `${SITE_URL}/zh/services` : `${SITE_URL}/services`,
              },
              {
                '@type': 'ListItem', position: 3, name: copy.title, item: selfUrl,
              },
            ],
          })}
        </script>
      </Helmet>

      <article
        className={`post field-notes-content${isZh ? ' zh' : ''}`}
        id={`vertical-${slug}`}
      >
        <header className="page-hero">
          <div className="content-standard">
            <div className="title">
              <p className="fn-stamp">{t.eyebrow}</p>
              <h1 style={{ fontSize: '2rem', margin: 0 }}>{copy.title}</h1>
              <p>{copy.lede}</p>
            </div>
          </div>
        </header>

        <div className="content-standard">
          {/* The quotable block. Kept as ONE paragraph on purpose — a citation
              should be able to lift the whole thought.
              NOT .fn-highlight: that class is an INLINE highlighter swipe meant
              for a <span>, and on a block it painted a full-bleed band across
              the page. Caught on the first screenshot. */}
          <p className="vertical-answer" style={{ fontSize: '1.08rem', lineHeight: 1.75 }}>
            {copy.answer}
          </p>

          <h2>{t.whatYouGet}</h2>
          <ul>
            {copy.bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>

          <h2>{t.track}</h2>
          <p className="fn-receipt">{copy.proof}</p>

          <h2>{t.faq}</h2>
          {copy.faq.map((item) => (
            <div key={item.q} className="fn-entry">
              <h3 style={{ marginBottom: '0.35rem' }}>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}

          <p style={{ marginTop: '2rem' }}>
            <Link
              to={isZh ? '/zh/book' : '/book'}
              className="button"
              data-cta={`vertical_${slug}_book`}
            >
              {t.book}
            </Link>
          </p>

          <p>
            <Link to={isZh ? '/zh/services' : '/services'}>{t.allServices}</Link>
            {' · '}
            <Link to={isZh ? '/zh' : '/'}>{t.backHome}</Link>
          </p>
        </div>
      </article>
    </Main>
  );
};

Vertical.propTypes = {
  slug: PropTypes.string.isRequired,
  lang: PropTypes.oneOf(['en', 'zh']).isRequired,
};

export default Vertical;
