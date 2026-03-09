import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import testimonials from '../data/testimonials';
import TestimonialSection from '../components/Testimonials/TestimonialSection';

const ZhAbout = () => (
  <Main
    title="關於我"
    description="Sam Wong — 香港AI顧問、企業AI培訓師。提供實用人工智能培訓、一對一AI輔導、企業工作坊，幫助團隊真正應用AI。"
    canonicalUrl={`${SITE_URL}/zh/about`}
    ogTitle="關於 Sam Wong | AI 培訓專家"
    ogDescription="點解我做呢份工，同埋我點樣走到今日。由 ADHD 診斷到培訓超過 10,000 位專業人士應用 AI。"
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/zh/about`}
    ogType="profile"
    twitterTitle="關於 Sam Wong | AI 培訓專家"
    twitterDescription="點解我做呢份工，同埋我點樣走到今日。"
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/about` },
      { lang: 'zh-Hant', href: `${SITE_URL}/zh/about` },
      { lang: 'x-default', href: `${SITE_URL}/about` },
    ]}
  >
    <Helmet><html lang="zh-Hant" /></Helmet>
    <article className="post markdown" id="zh-about">
      {/* Dark hero */}
      <header className="page-hero">
        <div className="content-narrow">
          <div className="title">
            <h2>
              <Link to="/zh/about">關於我</Link>
            </h2>
            <p>點解我做呢份工，同埋我點樣走到今日。</p>
          </div>
        </div>
      </header>

      <section className="section-base section-padding">
        <div className="content-narrow">
          <h3>簡單版本</h3>
          <p>
            我幫助企業同個人以實用、以人為本嘅方式應用 AI。我嘅焦點唔係工具嘅炒作，而係真正嘅行為改變。
          </p>

          <h3>點解開始</h3>
          <p>
            我由細到大都有 ADHD，但到咗二十幾歲先知道。作為一個歷史系畢業生做緊行政助理，我花咗好多年覺得自己不斷同自己個腦打仗。
          </p>
          <p>
            當我搵到 AI 同自動化工具之後，一切都改變咗。最初只係幫自己管理挑戰嘅工具，後來變成咗一個使命——幫其他人發現當正確嘅支援遇上正確嘅工具，會有幾大嘅可能性。
          </p>

          <h3>轉變</h3>
          <p>
            AI 唔止幫我做嘢做得更好。佢幫我用唔同嘅方式去思考工作本身。我開始建立清晰度嘅系統，而唔單止係效率，然後見到同樣嘅模式幫到超越我自己範疇嘅團隊。
          </p>

          <h3>職業路徑</h3>
          <p>
            我嘅職業由 FAO Schwarz 同 Sharper Image 嘅行政助理，
            到 RENPHO 嘅 AI 產品經理同 AI 團隊負責人，
            喺嗰度我由零開始建立咗一個 AI 部門。
          </p>
          <p>
            我學到一個簡單嘅事實：應用從來唔係工具問題，而係人嘅問題。技能重要，但心理安全感先係令人開始嘅關鍵。
          </p>
        </div>
      </section>

      <section className="section-sunken section-padding">
        <div className="content-standard">
          <h3>我嘅信念</h3>
          <div className="card-grid cols-2">
            <div className="card">
              <h4>人係重點。</h4>
              <p>AI 係工具。目標係有意義嘅工作。</p>
            </div>
            <div className="card">
              <h4>由最細嘅一步開始。</h4>
              <p>小勝利會累積成真正嘅改變。</p>
            </div>
            <div className="card">
              <h4>心理安全感排第一。</h4>
              <p>人唔會採用佢哋害怕嘅嘢。</p>
            </div>
            <div className="card">
              <h4>框架勝過功能。</h4>
              <p>工具會變，思維模式會持續。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-base section-padding">
        <div className="content-narrow">
          <h3>我建立咗嘅嘢</h3>
          <ul>
            <li>
              <strong>
                <a href="https://adaptig.ai" target="_blank" rel="noopener noreferrer">
                  Adaptig
                </a>
              </strong>
              {' '}
              — 共同創辦橫跨北美、拉丁美洲、歐洲同亞太嘅全球培訓師網絡。
            </li>
            <li>
              <strong>
                <a href="https://dotai.hk" target="_blank" rel="noopener noreferrer">
                  DotAI
                </a>
              </strong>
              {' '}
              — 香港實用 AI 培訓社群嘅創始成員。
            </li>
            <li>
              <strong>AICBO</strong>
              {' '}
              — 150+ 場跨行業專業人士嘅一對一輔導。
            </li>
            <li>
              <strong>RENPHO AI Division</strong>
              {' '}
              — 帶領策略性 AI 轉型同團隊能力建設。
            </li>
          </ul>
          <p>
            你可以喺
            {' '}
            <Link to="/projects">Projects</Link>
            {' '}
            睇到完整時間線。
          </p>
        </div>
      </section>

      <section className="section-sunken section-padding">
        <div className="content-wide">
          <TestimonialSection
            title="領導者點講"
            subtitle="同我合作過嘅 CEO 同創辦人嘅評價。"
            testimonials={testimonials}
            limit={2}
          />
        </div>
      </section>

      <section className="section-base section-padding">
        <div className="content-narrow">
          <h3>點解重要</h3>
          <p>
            驅動我嘅係由「AI 唔關我事」到「我都用得到」嘅轉變。我哋正處於一個重大轉型期，學識同 AI 一齊思考同時保持人性嘅人會蓬勃發展。
          </p>
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
                聯絡我
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <p style={{ fontSize: '0.85em', color: '#6b6d7a', marginTop: '2em' }}>
        <Link to="/about">View in English</Link>
      </p>
    </article>
  </Main>
);

export default ZhAbout;
