import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import testimonials from '../data/testimonials';
import TestimonialSection from '../components/Testimonials/TestimonialSection';

const ZhIndex = () => (
  <Main
    title="Sam Wong | AI 培訓專家 - 香港"
    description="Sam Wong 幫助團隊同專業人士自信地應用 AI——透過工作坊、輔導同培訓師發展。以人為本、實用、注重成果。AI顧問 香港、企業AI培訓。"
    canonicalUrl={`${SITE_URL}/zh`}
    ogTitle="Sam Wong | AI 培訓專家"
    ogDescription="幫助企業同個人自信應用 AI。企業工作坊、一對一輔導、培訓師培訓計劃。"
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/zh`}
    ogType="website"
    twitterTitle="Sam Wong | AI 培訓專家"
    twitterDescription="幫助企業同個人自信應用 AI。"
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/` },
      { lang: 'zh-Hant', href: `${SITE_URL}/zh` },
      { lang: 'x-default', href: `${SITE_URL}/` },
    ]}
  >
    <Helmet><html lang="zh-Hant" /></Helmet>
    <article className="post" id="zh-index">
      {/* Dark hero */}
      <header className="page-hero">
        <div className="content-standard">
          <div className="title">
            <h2>
              <Link to="/zh">你好。</Link>
            </h2>
            <p>
              我幫助機構同專業人士以真正落地嘅方式應用 AI。
              如果你正在探索培訓、輔導或培訓師發展，你嚟啱地方。
            </p>
          </div>
        </div>
      </header>

      <section className="section-base section-padding">
        <div className="content-wide">
          <TestimonialSection
            title="獲各界領袖信賴"
            subtitle="來自高管團隊、創辦人同新晉領袖嘅聲音。"
            testimonials={testimonials}
            limit={1}
            featured
          />
        </div>
      </section>

      <section className="section-sunken section-padding">
        <div className="content-wide">
          <h3>我實際做啲乜</h3>
          <p>三個方式幫你將 AI 應用到真實工作中：</p>
          <div className="card-grid cols-3">
            <div className="card">
              <h4>企業工作坊</h4>
              <p>統一團隊認知、降低恐懼、建立同日常工作流程掛鈎嘅實用技能。</p>
              <Link to="/zh/services#organizations" className="button-ghost">
                了解更多 &rarr;
              </Link>
            </div>
            <div className="card">
              <h4>一對一輔導</h4>
              <p>圍繞你嘅項目、角色同目標嘅個人化課程。</p>
              <Link to="/zh/services#one-on-one" className="button-ghost">
                了解更多 &rarr;
              </Link>
            </div>
            <div className="card">
              <h4>培訓師培訓計劃</h4>
              <p>裝備引導者運用 Adaptig 方法論自信教授 AI。</p>
              <Link to="/zh/services#train-the-trainer" className="button-ghost">
                了解更多 &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-base section-padding">
        <div className="content-wide">
          <h3>我嘅平台</h3>
          <div className="card-grid cols-2">
            <div className="card">
              <h4>
                <a href="https://adaptig.ai" target="_blank" rel="noopener noreferrer">
                  Adaptig
                </a>
              </h4>
              <p>全球培訓師網絡，為企業提供 AI 應用工作坊。</p>
            </div>
            <div className="card">
              <h4>
                <a href="https://dotai.hk" target="_blank" rel="noopener noreferrer">
                  DotAI
                </a>
              </h4>
              <p>香港 AI 培訓社群，服務客戶包括匯豐銀行、中國銀行同周大福。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark section-padding" style={{ textAlign: 'center' }}>
        <div className="content-standard">
          <ul className="actions" style={{ justifyContent: 'center' }}>
            <li>
              <Link to="/zh/services" className="button">
                睇服務選項
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

      <p style={{ fontSize: '0.85em', color: '#6b6d7a', marginTop: '2em' }}>
        <Link to="/">View in English</Link>
      </p>
    </article>
  </Main>
);

export default ZhIndex;
