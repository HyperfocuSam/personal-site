import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import OptimizedImage from '../components/Template/OptimizedImage';
import ScrollReveal from '../components/ScrollReveal';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import { topicsZh, engagementsZh, whatYouGetZh } from '../data/speaking-zh';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: '演講及活動 | Sam Wong',
  url: `${SITE_URL}/zh/speaking/`,
  inLanguage: 'zh-Hant',
  description: 'Sam Wong 為企業活動、業界會議與私人聚會提供主題演講、座談與工作坊，題目圍繞務實的 AI 應用。',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: engagementsZh.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Event',
        name: `${e.org} - ${e.title}`,
        description: e.description,
        inLanguage: 'zh-Hant',
        organizer: { '@type': 'Organization', name: e.org },
        performer: { '@type': 'Person', name: 'Sam Wong', url: SITE_URL },
      },
    })),
  },
};

const ZhSpeaking = () => (
  <Main
    title="演講及活動 — 香港 AI 主題講者"
    description="香港 AI 主題講者與工作坊導師。Sam Wong 講務實的 AI 應用，過往場合包括 YPO、一間香港大型銀行、中國工信部、周大福與 Arup。粵語、英語皆可。"
    canonicalUrl={`${SITE_URL}/zh/speaking`}
    ogTitle="演講及活動 | Sam Wong"
    ogDescription="主題演講、座談與工作坊，改變團隊看待 AI 的方式。"
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/zh/speaking`}
    ogType="website"
    twitterTitle="演講及活動 | Sam Wong"
    twitterDescription="主題演講、座談與工作坊，改變團隊看待 AI 的方式。"
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/speaking` },
      { lang: 'zh-Hant', href: `${SITE_URL}/zh/speaking` },
      { lang: 'x-default', href: `${SITE_URL}/speaking` },
    ]}
  >
    <Helmet>
      <html lang="zh-Hant" />
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
    <article className="post field-notes-content zh" id="zh-speaking">
      {/* Dark hero */}
      <header className="page-hero">
        <div className="content-standard">
          <div className="title">
            <h1>演講及活動</h1>
            <p>主題演講、座談與工作坊，改變團隊看待 AI 的方式。</p>
          </div>
        </div>
      </header>

      {/* Photo band */}
      <div className="full-bleed photo-band">
        <OptimizedImage
          src="/images/home/ypo-stage-wide.jpg"
          alt="Sam Wong 在 YPO 全球活動的舞台上，紐約 Skirball Center"
          width={1200}
          height={675}
          loading="lazy"
        />
      </div>

      {/* Topics */}
      <section className="section-base section-padding">
        <div className="content-standard">
          <ScrollReveal variant="fade-up-long">
            <h2>我講甚麼</h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up-long" stagger={120}>
            <div className="card-grid cols-3">
              {topicsZh.map((topic) => (
                <div key={topic.id} className="card card-accent fn-card">
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Selected engagements */}
      <section className="section-sunken section-padding">
        <div className="content-standard">
          <ScrollReveal variant="fade-up-long">
            <h2>部分場合</h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" stagger={100}>
            <div className="engagement-list">
              {engagementsZh.map((e) => (
                <div key={e.id} className="engagement-item fn-entry">
                  <div className="engagement-item__left">
                    <span className="engagement-item__year fn-stamp">{e.year}</span>
                  </div>
                  <div className="engagement-item__right">
                    <h3 className="engagement-item__org">{e.org}</h3>
                    <p className="engagement-item__title">{e.title}</p>
                    <p className="engagement-item__desc">{e.description}</p>
                    {e.stat && (
                      <span className="engagement-item__stat fn-stamp fn-stamp--verified">
                        {e.stat}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What organizers get */}
      <section className="section-base section-padding">
        <div className="content-standard">
          <ScrollReveal variant="fade-up-long">
            <h2>你會得到甚麼</h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up-long" stagger={120}>
            <div className="card-grid cols-2">
              {whatYouGetZh.map((item) => (
                <div key={item.id} className="card fn-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="section-dark section-dark--centered section-padding">
        <div className="content-standard">
          <ScrollReveal variant="fade-up">
            <h2>邀請 Sam 到你的活動</h2>
            <p>
              主題演講、座談、半日工作坊、多節計劃都可以。實體或線上，粵語或英語。
            </p>
            <ul className="actions">
              <li>
                <Link to="/zh/book" className="button">
                  預約通話
                </Link>
              </li>
              <li>
                <Link to="/zh/contact?interest=speaking" className="button-secondary">
                  聯絡我
                </Link>
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </section>
    </article>
  </Main>
);

export default ZhSpeaking;
