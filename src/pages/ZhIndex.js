import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import testimonialsZh from '../data/testimonials-zh';
import TestimonialSection from '../components/Testimonials/TestimonialSection';
import HeroSection from '../components/Home/HeroSection';
import StatsBar from '../components/Home/StatsBar';
import ProofReceipt from '../components/Home/ProofReceipt';
import ClientLogoBar from '../components/Home/ClientLogoBar';
import ServicesEditorial from '../components/Home/ServicesEditorial';
import LatestWriting from '../components/Home/LatestWriting';
import EmailCapture from '../components/EmailCapture/EmailCapture';
import ScrollReveal from '../components/ScrollReveal';

// Pass a bare title and let Main.js's titleTemplate add "| Sam Wong", the way
// every other page does. The old value carried the brand itself AND was under
// the template's 48-char threshold, so it rendered with the suffix twice:
// "Sam Wong | 企業 AI 培訓 - 香港 | Sam Wong".
//
// 2026-08-15: rebuilt on the redesigned EN skeleton (same language-aware
// components, one-voice ruling). /zh is the half that ranks #2 in Hong Kong
// for the commercial query — until now it had no hero CTA at all. Dropped:
// the 你好。hero, the 我的平台 platforms section, the old receipts band
// (ProofReceipt carries it). No FAQ here — /zh/services owns the zh FAQPage.
const ZhIndex = () => (
  <Main
    title="香港企業 AI 培訓與工作坊"
    description="Sam Wong 是 Adaptig 聯合創辦人兼學院總監，駐香港的 AI 導師培訓師。已培訓 10,000+ 位專業人士、遍及 13 個國家。企業工作坊、一對一教練、導師認證，粵語英語皆可。"
    canonicalUrl={`${SITE_URL}/zh`}
    ogTitle="Sam Wong | 企業 AI 培訓 · Adaptig 共同創辦人兼學院總監"
    ogDescription="幫助企業和個人自信應用 AI。企業工作坊、一對一輔導、培訓師培訓計劃。"
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/zh`}
    ogType="website"
    twitterTitle="Sam Wong | 企業 AI 培訓 · Adaptig 共同創辦人兼學院總監"
    twitterDescription="幫助企業和個人自信應用 AI。"
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/` },
      { lang: 'zh-Hant', href: `${SITE_URL}/zh` },
      { lang: 'x-default', href: `${SITE_URL}/` },
    ]}
  >
    <Helmet><html lang="zh-Hant" /></Helmet>
    <article className="homepage-dark field-notes zh" id="zh-index">
      {/* 1. Hero (white) — the claim, the credential, one red CTA, portrait */}
      <HeroSection language="zh-Hant" />

      {/* 2. Stats (soft) — the four canonical numbers */}
      <ScrollReveal variant="fade-up-long">
        <StatsBar language="zh-Hant" />
      </ScrollReveal>

      {/* 3. Proof receipt (ink) — the one quantified receipt */}
      <ScrollReveal variant="fade-in">
        <ProofReceipt language="zh-Hant" />
      </ScrollReveal>

      {/* 4. Client logos (white) — logos are language-neutral, label is not */}
      <ScrollReveal variant="fade-in">
        <ClientLogoBar language="zh-Hant" />
      </ScrollReveal>

      {/* 5. Services (soft) */}
      <ScrollReveal variant="fade-up-long">
        <ServicesEditorial language="zh-Hant" />
      </ScrollReveal>

      {/* 6. Testimonials (white) — the Chinese client quotes */}
      <ScrollReveal variant="scale-in">
        <TestimonialSection
          title="客戶怎麼說"
          testimonials={testimonialsZh}
          limit={3}
          variant="dark-pullquote"
        />
      </ScrollReveal>

      {/* 7. Conversion band (ink) — the ask repeats the hero's verbatim */}
      <ScrollReveal variant="fade-up">
        <section className="section-dark section-dark--centered section-padding">
          <div className="content-standard">
            <ul className="actions">
              <li>
                <Link to="/zh/book" className="button" data-cta="home_band_book">
                  預約通話
                </Link>
              </li>
              <li>
                <Link to="/zh/services" className="button-secondary" data-cta="home_band_services">
                  查看服務選項
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </ScrollReveal>

      {/* 8. Selected writing (white) — curated zh posts */}
      <ScrollReveal variant="fade-up-long">
        <LatestWriting language="zh-Hant" />
      </ScrollReveal>

      {/* 9. Email capture — honest note: the newsletter posts are English */}
      <ScrollReveal variant="fade-up">
        {/* 2026-08-15 DeepSeek audit: 「客戶現場」 was a "client site" calque
            — 培訓現場 is the natural collocation; the caption gained its verb
            (只寄 = the anti-spam promise stated as an action). */}
        <EmailCapture
          title="來自真實培訓現場的實戰筆記"
          blurb="每次發佈新文章時一封電郵：工作坊框架、應用案例、我實際使用的工具。（文章以英文為主）"
          caption="只寄實戰筆記"
          variant="dark"
        />
      </ScrollReveal>

      <p className="lang-toggle lang-toggle--dark">
        <Link to="/">View in English</Link>
      </p>
    </article>
  </Main>
);

export default ZhIndex;
