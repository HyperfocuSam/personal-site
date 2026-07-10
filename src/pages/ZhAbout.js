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
    ogDescription="為何我從事這份工作，以及我如何走到今天。由 ADHD 診斷到培訓超過 10,000 位專業人士應用 AI。"
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/zh/about`}
    ogType="profile"
    twitterTitle="關於 Sam Wong | AI 培訓專家"
    twitterDescription="為何我從事這份工作，以及我如何走到今天。"
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/about` },
      { lang: 'zh-Hant', href: `${SITE_URL}/zh/about` },
      { lang: 'x-default', href: `${SITE_URL}/about` },
    ]}
  >
    <Helmet><html lang="zh-Hant" /></Helmet>
    <article className="post markdown field-notes-content zh" id="zh-about">
      {/* Dark hero */}
      <header className="page-hero">
        <div className="content-narrow">
          <div className="title">
            <h1>
              <Link to="/zh/about">關於我</Link>
            </h1>
            <p>為何我從事這份工作，以及我如何走到今天。</p>
          </div>
        </div>
      </header>

      <section className="section-base section-padding">
        <div className="content-narrow">
          <h3>簡單版本</h3>
          <p>
            我幫助企業和個人以實用、以人為本的方式應用 AI。我的焦點不是工具的炒作，而是真正的行為改變。
          </p>

          <h3>為何開始</h3>
          <p>
            我從小就有 ADHD，但到了二十多歲才知道。作為一個歷史系畢業生在做行政助理，我花了很多年，覺得自己不斷在和自己的腦袋打仗。
          </p>
          <p>
            當我找到 AI 和自動化工具之後，一切都改變了。最初只是幫助自己管理挑戰的工具，後來變成了一個使命——幫助其他人發現當正確的支援遇上正確的工具，會有多大可能性。
          </p>

          <h3>轉變</h3>
          <p>
            AI 不止幫我做事做得更好。它幫助我以不同的方式去思考工作本身。我開始建立清晰度的系統，而不只是效率，然後見到同樣的模式幫助到超越我自己範疇的團隊。
          </p>

          <h3>職業路徑</h3>
          <p>
            我的職業由 FAO Schwarz 和 Sharper Image 的行政助理，
            到 RENPHO 的 AI 產品經理和 AI 團隊負責人，
            在那裡我由零開始建立了一個 AI 部門。
          </p>
          <p>
            我學到一個簡單的事實：應用從來不是工具問題，而是人的問題。技能重要，但心理安全感才是讓人開始的關鍵。
          </p>
        </div>
      </section>

      <section className="section-sunken section-padding">
        <div className="content-standard">
          <h3>我的信念</h3>
          <div className="card-grid cols-2">
            <div className="card">
              <h4>人是重點。</h4>
              <p>AI 是工具。目標是有意義的工作。</p>
            </div>
            <div className="card">
              <h4>從最小的一步開始。</h4>
              <p>小勝利會累積成真正的改變。</p>
            </div>
            <div className="card">
              <h4>心理安全感優先。</h4>
              <p>人不會採用他們害怕的事物。</p>
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
          <h3>我所建立的</h3>
          <ul>
            <li>
              <strong>
                <a href="https://adaptig.ai" target="_blank" rel="noopener noreferrer">
                  Adaptig
                </a>
              </strong>
              {/* Single-expression text here and below: adjacent text nodes
                  break react-snap hydration (React #418) */}
              {' — 共同創辦橫跨北美、拉丁美洲、歐洲和亞太的全球培訓師網絡。'}
            </li>
            <li>
              <strong>AICBO</strong>
              {' — 160+ 場跨行業專業人士的一對一輔導。'}
            </li>
            <li>
              <strong>RENPHO AI Division</strong>
              {' — 帶領策略性 AI 轉型和團隊能力發展。'}
            </li>
          </ul>
          <p>
            {'你可以在 '}
            <Link to="/projects">Projects</Link>
            {' 看到完整時間線。'}
          </p>
        </div>
      </section>

      <section className="section-sunken section-padding">
        <div className="content-wide">
          <TestimonialSection
            title="領導者怎麼說"
            subtitle="和我合作過的 CEO 和創辦人的評價。"
            testimonials={testimonials}
            limit={2}
          />
        </div>
      </section>

      <section className="section-base section-padding">
        <div className="content-narrow">
          <h3>為何重要</h3>
          <p>
            驅動我的是由「AI 唔關我事」到「我都用得到」的轉變。我們正處於一個重大轉型期，學會和 AI 一起思考同時保持人性的人會蓬勃發展。
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
                聯絡我
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <p className="lang-toggle">
        <Link to="/about">View in English</Link>
      </p>
    </article>
  </Main>
);

export default ZhAbout;
