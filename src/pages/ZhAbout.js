import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import testimonials from '../data/testimonials';
import TestimonialSection from '../components/Testimonials/TestimonialSection';

const ZhAbout = () => (
  <Main
    title="關於 Sam Wong — 香港 AI 導師培訓師"
    description="Sam Wong 是 Adaptig 聯合創辦人兼學院總監，一位駐香港的 AI 導師培訓師——他教的是教 AI 的人。已為 70+ 間機構、10,000+ 位專業人士提供培訓，遍及 13 個國家。"
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
    <Helmet>
      <html lang="zh-Hant" />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: '關於 Sam Wong',
          url: `${SITE_URL}/zh/about/`,
          inLanguage: 'zh-Hant',
          description: 'Sam Wong 是 Adaptig 聯合創辦人兼學院總監，駐香港的 AI 導師培訓師。',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          mainEntity: { '@id': `${SITE_URL}/#person` },
        })}
      </script>
    </Helmet>
    {/* No `markdown` class. `.markdown h1 { font-size: 0.8em }` is meant for
        in-body headings inside blog prose, but it shares specificity (0,1,1)
        with `.page-hero :is(h1)` and loses only on source order — so it won,
        and this page's H1 rendered at 14.4px while every section heading below
        it rendered at 26.4px. The main heading was the smallest text on the
        page, on the half of the site that ranks #2 in Hong Kong. This was the
        one page in src/pages that combined `markdown` with a `.page-hero`;
        About.js, which it mirrors section-for-section, never had it. */}
    <article className="post field-notes-content zh" id="zh-about">
      {/* Dark hero */}
      <header className="page-hero">
        <div className="content-narrow">
          <div className="title">
            <h1>關於 Sam Wong</h1>
            <p>為何我從事這份工作，以及我如何走到今天。</p>
          </div>
        </div>
      </header>

      <section className="section-base section-padding">
        <div className="content-narrow">
          <h2>簡單版本</h2>
          {/* Was first-person with no name, no title, no company, no numbers —
              the same gap the English page closed. /zh is the half that ranks
              (#2 in Hong Kong for 「企業 AI 培訓 香港 工作坊」), so it is the
              half worth spending entity signal on. Third person for the summary,
              first person from 為何開始 on, matching About.js. */}
          <p>
            Sam Wong（黃力桐）是 Adaptig 聯合創辦人兼學院總監，一位駐香港的 AI
            導師培訓師——他教的是教 AI 的人。至今為 70+ 間機構、10,000+
            位專業人士提供培訓，遍及 13 個國家。
          </p>
          <p>
            我幫助企業和個人以實用、以人為本的方式應用 AI。我的焦點不是工具的炒作，而是真正的行為改變。
          </p>
          {/* Same two credentials as About.js — 註冊講者 (Registered Speaker),
              never 導師/講師, per the banned-claim list in memory_sam_profile.md. */}
          <p>
            他是香港生產力促進局（HKPC）註冊講者，以及香港專業進修學校（HKCT）官方培訓夥伴。
          </p>

          <h2>為何開始</h2>
          <p>
            我自小就有 ADHD，二十多歲才確診。那些年我讀歷史出身、做著行政助理，一直覺得自己在跟自己的腦袋打仗。
          </p>
          <p>
            找到 AI 和自動化工具之後，一切都不一樣了。起初它們只是幫我應付自己狀態的工具，後來變成一個使命——讓更多人發現，當恰當的支援碰上合適的工具，可以創造多大的可能。
          </p>

          <h2>轉變</h2>
          <p>
            AI 不只讓我做事更快，它改變了我看待工作本身的方式。我開始為「清晰」而不只是「效率」建系統——後來發現，同一套模式幫到的團隊，遠遠超出我自己的範疇。
          </p>

          <h2>職業路徑</h2>
          <p>
            我的職涯由 FAO Schwarz 和 Sharper Image 的行政助理開始，
            到加入 RENPHO 擔任 AI 產品經理及 AI 團隊主管，
            並在那裡從零組建了一個 AI 部門。
          </p>
          <p>
            我學到一個簡單的事實：應用從來不是工具問題，而是人的問題。技能重要，但心理安全感才是讓人開始的關鍵。
          </p>
        </div>
      </section>

      <section className="section-sunken section-padding">
        <div className="content-standard">
          <h2>我的信念</h2>
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
          <h2>我所建立的</h2>
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
              {/* Was "160+" while About.js and memory_sam_profile.md both say
                  300 (Sam-confirmed 2026-07-10). The Chinese page was
                  understating his own track record by nearly half. */}
              {' — 300 場跨行業專業人士的一對一輔導。'}
            </li>
            <li>
              <strong>RENPHO AI Division</strong>
              {' — 帶領策略性 AI 轉型和團隊能力發展。'}
            </li>
          </ul>
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
          <h2>為何重要</h2>
          <p>
            推動我的，是那個由「AI 唔關我事」變成「我都用得到」的瞬間。我們正處於一場大轉型：學會與 AI 一起思考、同時保住人味的人，會走得最遠。
          </p>
        </div>
      </section>

      <section className="section-dark section-dark--centered section-padding">
        <div className="content-standard">
          <ul className="actions">
            <li>
              <Link to="/zh/services" className="button" data-cta="about_services">
                查看服務選項
              </Link>
            </li>
            <li>
              <Link to="/zh/contact" className="button-secondary" data-cta="about_contact">
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
