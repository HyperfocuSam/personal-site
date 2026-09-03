import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import servicesZh from '../data/services-zh';

import testimonials from '../data/testimonials-zh';
import ServiceGroup from '../components/Services/ServiceGroup';
import FaqSection from '../components/FaqSection/FaqSection';
import { zhServicesFaqs } from '../data/faqs-zh';

// Built from src/data/services-zh.js rather than hand-written, so the catalog
// cannot drift from what the page renders — the same pattern as Services.js.
// The English ProfessionalService gained an offer catalog in Phase A; the
// Chinese one, on the page that ranks #2 in Hong Kong for the commercial query,
// still had six keys and no offers.
const offerCatalogZh = {
  '@type': 'OfferCatalog',
  name: 'AI 培訓與教練服務',
  itemListElement: servicesZh.map((service) => ({
    '@type': 'Offer',
    name: service.title,
    url: `${SITE_URL}/zh/services/#${service.anchor}`,
    availability: 'https://schema.org/InStock',
    itemOffered: {
      '@type': 'Service',
      name: service.title,
      description: service.subtitle,
      serviceType: service.title,
      provider: service.provider === 'Adaptig'
        ? { '@type': 'Organization', name: 'Adaptig', url: 'https://adaptig.ai' }
        : { '@type': 'Person', name: 'Sam Wong', url: SITE_URL },
      areaServed: ['Hong Kong', 'Asia-Pacific'],
      availableLanguage: ['Cantonese', 'Mandarin', 'English'],
    },
  })),
};

const groups = [
  {
    id: 'organizations',
    category: 'organizations',
    title: '企業服務',
    subtitle: '工作坊、培訓與活動，推動團隊由興趣走向真正應用。',
    socialProof:
      '周大福（第三次合作）、匯豐、YPO——加上一間大型香港銀行（1,530 位參加者、滿意度 9.2/10）及一間國際玩具公司。',
    testimonial: testimonials[0],
    primaryCta: {
      id: 'organizations',
      cta: '聯絡我們',
      ctaLink: '/zh/contact',
      external: false,
    },
    band: 'section-base',
  },
  {
    id: 'one-on-one',
    category: 'individuals',
    title: '個人服務',
    subtitle: '個人化輔導，助專業人士養成實用的 AI 習慣。',
    socialProof: '300 節一對一輔導，橫跨金融、市場推廣、教育及醫療。',
    testimonial: testimonials[1],
    primaryCta: {
      id: 'one-on-one',
      cta: '預約免費諮詢',
      ctaLink: '/zh/book',
      external: false,
    },
    band: 'section-sunken',
  },
  {
    id: 'train-the-trainer',
    category: 'trainers',
    title: '培訓師計劃',
    subtitle: '招募培訓師——想教實用 AI 的人，由這裡開始。',
    socialProof:
      '加入橫跨北美、拉丁美洲、歐洲與亞太的全球網絡。',
    testimonial: testimonials[2],
    primaryCta: {
      id: 'train-the-trainer',
      cta: '申請加入網絡',
      ctaLink: '/zh/contact?interest=trainer',
      external: false,
    },
    band: 'section-base',
  },
];

const ZhServices = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      return;
    }

    const id = hash.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  return (
    <Main
      title="AI 培訓服務 — 企業工作坊、一對一教練、導師認證"
      description="Sam Wong 在香港提供的三種合作方式：為團隊而設的企業 AI 工作坊、為專業人士而設的一對一教練，以及 Adaptig 的導師認證計劃。粵語、英語皆可。"
      canonicalUrl={`${SITE_URL}/zh/services`}
      ogTitle="AI 培訓服務 | Sam Wong"
      ogDescription="企業工作坊、培訓師培訓計劃、一對一輔導。透過 Adaptig 提供。"
      ogImage={DEFAULT_OG_IMAGE}
      ogUrl={`${SITE_URL}/zh/services`}
      ogType="website"
      twitterTitle="AI 培訓服務 | Sam Wong"
      twitterDescription="企業工作坊、培訓師培訓計劃、一對一輔導。"
      twitterImage={DEFAULT_OG_IMAGE}
      hreflangTags={[
        { lang: 'en', href: `${SITE_URL}/services` },
        { lang: 'zh-Hant', href: `${SITE_URL}/zh/services` },
        { lang: 'x-default', href: `${SITE_URL}/services` },
      ]}
    >
      <Helmet><html lang="zh-Hant" /></Helmet>
      <article className="post field-notes-content zh" id="zh-services">
        {/* Dark hero with anchor pills */}
        <header className="page-hero">
          <div className="content-standard">
            <div className="title">
              <h1>AI 培訓及工作坊服務</h1>
              <p>香港及亞太區企業 AI 培訓</p>
            </div>
            <div className="services-anchor-pills">
              <Link to="/zh/services#organizations" className="anchor-pill">
                企業
              </Link>
              <Link to="/zh/services#one-on-one" className="anchor-pill">
                個人
              </Link>
              <Link to="/zh/services#train-the-trainer" className="anchor-pill">
                培訓師
              </Link>
            </div>
          </div>
        </header>

        {/* Service groups in alternating section bands */}
        {groups.map((group) => (
          <section key={group.id} className={`${group.band} section-padding`}>
            <div className="content-standard">
              <ServiceGroup
                id={group.id}
                title={group.title}
                subtitle={group.subtitle}
                services={servicesZh.filter(
                  (service) => service.category === group.category,
                )}
                socialProof={group.socialProof}
                testimonial={group.testimonial}
                primaryCta={group.primaryCta}
              />
            </div>
          </section>
        ))}

        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Sam Wong - AI 培訓服務',
              url: `${SITE_URL}/zh/services`,
              provider: {
                '@type': 'Person', name: 'Sam Wong', url: SITE_URL,
              },
              areaServed: ['Hong Kong', 'Asia-Pacific'],
              serviceType: ['AI 培訓', '企業工作坊', 'AI 輔導', '培訓師認證'],
              knowsLanguage: ['English', 'Cantonese', 'Mandarin'],
              inLanguage: 'zh-Hant',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Hong Kong',
                addressCountry: 'HK',
              },
              hasOfferCatalog: offerCatalogZh,
            })}
          </script>
        </Helmet>

        {/* Visible FAQ block + FAQPage schema, from one array. This page
            previously shipped the FAQPage schema below with no matching
            visible content — the same defect faqs.js was created to fix on
            the English side. */}
        <FaqSection
          faqs={zhServicesFaqs}
          id="zh-services-faq"
          title="常見問題"
          path="/zh/services/"
        />

        {/* 為誰而設 — 五個界別頁的內部連結。ZH twins must ship together with the
            EN ones; a Chinese page linking only to English pages is the defect
            routes.js was written to end. */}
        <section className="services-verticals" id="zh-by-profession">
          <h2>按專業界別</h2>
          <p>以下每一個界別，都由已交付的工作坊發展出來，並各自附上往績。</p>
          <ul>
            <li><Link to="/zh/ai-training-healthcare-hong-kong">醫護人員 &rarr;</Link></li>
            <li><Link to="/zh/ai-training-teachers-hong-kong">教師 &rarr;</Link></li>
            <li><Link to="/zh/ai-training-nonprofit-hong-kong">社福機構及 NGO &rarr;</Link></li>
            <li><Link to="/zh/ai-training-sme-owners-hong-kong">中小企老闆 &rarr;</Link></li>
            <li><Link to="/zh/ai-training-executive-assistants-hong-kong">行政支援及行政助理 &rarr;</Link></li>
          </ul>
        </section>

        <p className="lang-toggle">
          <Link to="/services">View in English</Link>
        </p>
      </article>
    </Main>
  );
};

export default ZhServices;
