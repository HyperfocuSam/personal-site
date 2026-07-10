import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import testimonialsZh from '../data/testimonials-zh';
import TestimonialSection from '../components/Testimonials/TestimonialSection';

const ZhIndex = () => (
  <Main
    title="Sam Wong | AI 培訓專家 - 香港"
    description="Sam Wong 協助團隊與專業人士自信地應用 AI，透過工作坊、輔導和培訓師發展，以人為本、實用、注重成果，為香港企業提供 AI 培訓及顧問服務。"
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
      {/* Dark hero */}
      <header className="page-hero">
        <div className="content-standard">
          <div className="title">
            <h1>
              <Link to="/zh">你好。</Link>
            </h1>
            <p>
              我幫助機構與專業人士以真正落地的方式應用 AI。
              如果你正在探索培訓、輔導或培訓師發展，你來對地方了。
            </p>
          </div>
        </div>
      </header>

      <section className="section-base section-padding">
        <div className="content-wide">
          <TestimonialSection
            title="獲各界領袖信賴"
            subtitle="來自管理層團隊、創辦人與新晉領袖的聲音。"
            testimonials={testimonialsZh}
            limit={2}
            featured
          />
        </div>
      </section>

      <section className="section-sunken section-padding">
        <div className="content-wide">
          <h3>我實際做什麼</h3>
          <p>三個方式幫助你將 AI 應用到真實工作中：</p>
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
              <Link to="/contact" className="button-secondary">
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
