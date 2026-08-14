import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import testimonialsZh from '../data/testimonials-zh';
import TestimonialSection from '../components/Testimonials/TestimonialSection';

// Pass a bare title and let Main.js's titleTemplate add "| Sam Wong", the way
// every other page does. The old value carried the brand itself AND was under
// the template's 48-char threshold, so it rendered with the suffix twice:
// "Sam Wong | AI 培訓專家 - 香港 | Sam Wong".
const ZhIndex = () => (
  <Main
    title="香港企業 AI 培訓與工作坊"
    description="Sam Wong 是 Adaptig 聯合創辦人兼學院總監，駐香港的 AI 導師培訓師。已培訓 10,000+ 位專業人士、遍及 13 個國家。企業工作坊、一對一教練、導師認證，粵語英語皆可。"
    canonicalUrl={`${SITE_URL}/zh`}
    ogTitle="Sam Wong | AI 培訓專家"
    ogDescription="幫助企業和個人自信應用 AI。企業工作坊、一對一輔導、培訓師培訓計劃。"
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/zh`}
    ogType="website"
    twitterTitle="Sam Wong | AI 培訓專家"
    twitterDescription="幫助企業和個人自信應用 AI。"
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/` },
      { lang: 'zh-Hant', href: `${SITE_URL}/zh` },
      { lang: 'x-default', href: `${SITE_URL}/` },
    ]}
  >
    <Helmet><html lang="zh-Hant" /></Helmet>
    <article className="post field-notes-content zh" id="zh-index">
      {/* Hero with split layout */}
      <header className="page-hero page-hero--split">
        <div className="content-wide">
          <div className="page-hero__content">
            <p className="page-hero__eyebrow">
              <span className="fn-stamp fn-stamp--verified">
                field notes · 香港 · 自 2023 年起已培訓 10,000+ 人
              </span>
            </p>
            <h1>週一過後仍然有用的 AI 培訓。</h1>
            <p className="page-hero__subhead">
              我培訓培訓 AI 的人。為香港和亞太區團隊提供工作坊、小組培訓和培訓師培訓，
              讓真正的行為改變發生——而非又一場演示。
            </p>
            <p className="page-hero__who-line">
              <span className="fn-stamp">
                透過 Adaptig 預約 Sam · 聯合創辦人兼學院總監
              </span>
            </p>
            <div className="page-hero__actions">
              <Link to="/zh/book" className="button">
                預約免費通話 &rarr;
              </Link>
              <Link to="/zh/services" className="button-ghost">
                看看我能如何幫助你
              </Link>
            </div>
            <p className="page-hero__proof">
              <span className="fn-stamp fn-stamp--muted">
                周大福：3 小時內交付 5 個市場方案 · Garden：6 個部門回訪 ·
                HKCT：一個培訓日 → 24 個月的 AI 社群
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* 2026-08-02: 實績受 Sam 指示加到中文主頁。Single-expression text:
          adjacent text nodes break react-snap hydration (#418). */}
      <section className="section-sunken section-padding">
        <div className="content-wide">
          <h3>實績，有數據為證</h3>
          {/* The food manufacturer's Chinese name was live here while every
              English page said "a Hong Kong food manufacturer" — Sam's
              2026-07-12 ruling covers both spellings, and the guard test only
              knew the Latin one until now. */}
          <p>
            周大福 5 隊在 3 小時內交付完整市場方案 · 一間香港食品製造商 6 個部門與管理層先後回訪 · 一個 400 人培訓日發展成 24 個月的 AI 學習社群
          </p>
          <p>
            {/* Pointed at the English /case-notes until 2026-08-12, hence the
                「（英文版）」 note. There is a Chinese page now. */}
            <Link to="/zh/case-notes" className="button-ghost">
              查看完整實績記錄 &rarr;
            </Link>
          </p>
        </div>
      </section>

      <section className="section-base section-padding">
        <div className="content-wide">
          <TestimonialSection
            title="獲客戶團隊信賴"
            subtitle="來自客戶團隊與受訓專業人士的真實回饋。"
            testimonials={testimonialsZh}
            limit={2}
            featured
          />
        </div>
      </section>

      <section className="section-sunken section-padding">
        <div className="content-wide">
          <h3>我做的三件事</h3>
          <p>把 AI 帶進真實工作，有三條路徑：</p>
          <div className="card-grid cols-3">
            <div className="card">
              <h4>企業工作坊</h4>
              <p>統一團隊認知、降低恐懼、建立與日常工作流程掛鉤的實用技能。</p>
              <Link to="/zh/services#organizations" className="button-ghost">
                了解更多 &rarr;
              </Link>
            </div>
            <div className="card">
              <h4>一對一輔導</h4>
              <p>圍繞你的項目、角色與目標的個人化課程。</p>
              <Link to="/zh/services#one-on-one" className="button-ghost">
                了解更多 &rarr;
              </Link>
            </div>
            <div className="card">
              <h4>培訓師培訓計劃</h4>
              <p>協助培訓師掌握 Adaptig 方法論，自信教授 AI。</p>
              <Link to="/zh/services#train-the-trainer" className="button-ghost">
                了解更多 &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-base section-padding">
        <div className="content-wide">
          <h3>我的平台</h3>
          <div className="card-grid cols-1">
            <div className="card">
              <h4>
                <a href="https://adaptig.ai" target="_blank" rel="noopener noreferrer">
                  Adaptig
                </a>
              </h4>
              <p>全球培訓師網絡，為企業提供 AI 應用工作坊。</p>
            </div>
          </div>
          {/* Single-expression text: adjacent text nodes break react-snap hydration (#418) */}
          <p style={{ textAlign: 'center', marginTop: '1rem', opacity: 0.7 }}>
            {'同時是 '}
            <a href="https://dotai.hk" target="_blank" rel="noopener noreferrer">DotAI</a>
            {' 的創始成員——香港 AI 培訓社群。'}
          </p>
        </div>
      </section>

      <section className="section-dark section-dark--centered section-padding">
        <div className="content-standard">
          <ul className="actions">
            <li>
              <Link to="/zh/services" className="button">
                查看服務選項
              </Link>
            </li>
            <li>
              <Link to="/zh/contact" className="button-secondary">
                預約諮詢
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <p className="lang-toggle">
        <Link to="/">View in English</Link>
      </p>
    </article>
  </Main>
);

export default ZhIndex;
