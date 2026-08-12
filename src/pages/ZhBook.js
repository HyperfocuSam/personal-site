import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import RoamEmbed, { ROAM_LOBBY_URL } from '../components/Book/RoamEmbed';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';

// The Chinese half of the site had no booking page at all: /zh linked to the
// English /book, so the last step of the funnel switched language on the reader.
// The scheduler itself is Ro.am's and stays English — that is a real limit, said
// plainly on the page rather than discovered after a click.
const ZhBook = () => (
  <Main
    title="預約通話 — AI 培訓與一對一教練"
    description="預約與 Sam Wong 的 30 分鐘免費諮詢通話，或一節一對一 AI 教練。企業培訓、團隊工作坊、高管顧問都可以由這裡開始。粵語、英語皆可。"
    canonicalUrl={`${SITE_URL}/zh/book`}
    ogTitle="預約通話 | Sam Wong"
    ogDescription="預約 30 分鐘免費諮詢通話，或一節一對一 AI 教練。"
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/zh/book`}
    ogType="website"
    twitterTitle="預約通話 | Sam Wong"
    twitterDescription="預約 30 分鐘免費諮詢通話，或一節一對一 AI 教練。"
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/book` },
      { lang: 'zh-Hant', href: `${SITE_URL}/zh/book` },
      { lang: 'x-default', href: `${SITE_URL}/book` },
    ]}
  >
    <Helmet>
      <html lang="zh-Hant" />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${SITE_URL}/zh/book/#webpage`,
          url: `${SITE_URL}/zh/book/`,
          name: '預約與 Sam Wong 的通話',
          description: '預約與 Adaptig 聯合創辦人兼學院總監 Sam Wong 的 30 分鐘免費諮詢通話，或一節收費的一對一 AI 教練。',
          inLanguage: 'zh-Hant',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          about: { '@id': `${SITE_URL}/#person` },
          potentialAction: {
            '@type': 'ScheduleAction',
            name: '預約諮詢通話',
            target: ROAM_LOBBY_URL,
          },
          mainEntity: {
            '@type': 'Service',
            name: 'Sam Wong 的 AI 教練與顧問服務',
            serviceType: ['AI Coaching', 'Executive AI Advisory', 'Corporate AI Training'],
            provider: { '@type': 'Person', name: 'Sam Wong', url: SITE_URL },
            areaServed: ['Hong Kong', 'Asia-Pacific', 'Global'],
            availableLanguage: ['Cantonese', 'Mandarin', 'English'],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: '可以由哪裡開始',
              itemListElement: [
                {
                  '@type': 'Offer',
                  name: '諮詢通話',
                  description: '講清楚你的目標，看看合不合適。不推銷。',
                  price: '0',
                  priceCurrency: 'HKD',
                  availability: 'https://schema.org/InStock',
                  url: `${SITE_URL}/zh/book/`,
                  itemOffered: {
                    '@type': 'Service',
                    name: '諮詢通話',
                    description: '30 分鐘的初次通話。',
                  },
                },
                {
                  '@type': 'Offer',
                  name: '一對一教練',
                  description: '用 60 至 90 分鐘處理你手頭上真實的專案與工作流程。',
                  availability: 'https://schema.org/InStock',
                  url: `${SITE_URL}/zh/book/`,
                  itemOffered: {
                    '@type': 'Service',
                    name: '一對一 AI 教練',
                    description: '針對專業人士的 AI 工具與工作流程教練。',
                  },
                },
              ],
            },
          },
        })}
      </script>
    </Helmet>
    <article className="post book-page field-notes-content zh" id="zh-book">
      <header className="page-hero page-hero--dark">
        <div className="content-narrow">
          <div className="title">
            <h1>預約通話</h1>
            <p>
              免費諮詢，或者一節認真做事的教練——揀個時間，我會在。
            </p>
          </div>
        </div>
      </header>

      <section className="book-page__embed-section">
        <div className="book-page__embed-wrap">
          <RoamEmbed placement="zh_book_page" />
          <p className="book-page__fallback">
            {'預約系統本身是英文介面。載入不到的話，可以 '}
            <a href={ROAM_LOBBY_URL} target="_blank" rel="noopener noreferrer">
              直接在 Ro.am 預約
            </a>
            {'，或者 '}
            <Link to="/zh/contact">聯絡我</Link>
            。
          </p>
        </div>
      </section>

      <section className="book-page__context" aria-labelledby="zh-book-options-heading">
        <div className="content-narrow">
          <h2 className="book-page__options-heading" id="zh-book-options-heading">
            可以預約甚麼
          </h2>
          <div className="book-page__options">
            <div className="book-page__option fn-card">
              <h3>諮詢通話</h3>
              <span className="book-page__label fn-stamp">免費，30 分鐘</span>
              <p>
                講清楚你的目標，看看合不合適。不推銷。
              </p>
            </div>
            <div className="book-page__option fn-card">
              <h3>一對一教練</h3>
              <span className="book-page__label fn-stamp">60–90 分鐘</span>
              <p>
                處理你手頭上真實的專案與工作流程，由你的實際限制出發。
              </p>
            </div>
            <div className="book-page__option fn-card">
              <h3>其他安排？</h3>
              <span className="book-page__label fn-stamp">傾一傾</span>
              {/* Single-expression text: adjacent nodes break hydration (#418) */}
              <p>
                {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
                {'高管顧問、團隊培訓或者演講，'}
                <Link to="/zh/contact">直接聯絡我</Link>
                。
              </p>
            </div>
          </div>
        </div>
      </section>
    </article>
  </Main>
);

export default ZhBook;
