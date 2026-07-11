import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import servicesZh from '../data/services-zh';
import testimonials from '../data/testimonials';
import ServiceGroup from '../components/Services/ServiceGroup';

const groups = [
  {
    id: 'organizations',
    category: 'organizations',
    title: '企業服務',
    subtitle: '工作坊、培訓與活動，推動團隊由興趣走向真正應用。',
    socialProof:
      '中銀香港 (1,530 位參加者, 9.2/10)、周大福 (第三次合作)、匯豐、美泰、豐田、YPO。',
    testimonial: testimonials[0],
    primaryCta: {
      cta: '聯絡我們',
      ctaLink: '/contact',
      external: false,
    },
    band: 'section-base',
  },
  {
    id: 'one-on-one',
    category: 'individuals',
    title: '個人服務',
    subtitle: '為建立實用 AI 習慣的專業人士提供個人化輔導。',
    socialProof: '160+ 位跨行業專業人士接受輔導。',
    testimonial: testimonials[1],
    primaryCta: {
      cta: '預約免費諮詢',
      ctaLink: '/book',
      external: false,
    },
    band: 'section-sunken',
  },
  {
    id: 'train-the-trainer',
    category: 'trainers',
    title: '培訓師計劃',
    subtitle: '培訓師招募——希望教授實用 AI 的培訓師。',
    socialProof:
      '加入橫跨北美、拉丁美洲、歐洲與亞太的全球網絡。',
    testimonial: testimonials[2],
    primaryCta: {
      cta: '申請加入網絡',
      ctaLink: '/contact?interest=trainer',
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
      title="服務"
      description="Sam Wong AI 培訓服務 — 企業工作坊、培訓師培訓計劃、一對一輔導，透過 Adaptig 提供，為香港企業提供 AI 培訓及 AI 顧問服務。"
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
              <h1>
                <Link to="/zh/services">AI 培訓及工作坊服務</Link>
              </h1>
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
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Hong Kong',
                addressCountry: 'HK',
              },
            })}
          </script>
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Sam Wong 提供哪些類型的 AI 培訓？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sam Wong 透過 Adaptig 提供企業 AI 工作坊、多節 AI Pioneer Program、一對一 AI 輔導、培訓師認證計劃，以及主題演講與活動。服務涵蓋企業、個人及有志成為 AI 培訓師的專業人士。',
                  },
                },
                {
                  '@type': 'Question',
                  name: '香港企業 AI 培訓的收費是多少？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '企業 AI 培訓費用取決於形式、時長和團隊規模。Sam Wong 提供半日及全日工作坊、多節 Pioneer Program（通常 6 節、歷時 6 星期）、以及高管顧問服務。歡迎聯絡索取報價。部分計劃可能符合香港政府資助計劃資格。',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'AI 培訓工作坊是否有廣東話版本？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '有。Sam Wong 以英語和廣東話提供 AI 培訓，確保香港團隊無論語言偏好都可以參與。教材可以提供英文、繁體中文或雙語版本。',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Sam Wong 在香港為哪些行業提供 AI 培訓？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sam Wong 的 AI 培訓覆蓋銀行及金融業（中銀香港、匯豐）、零售及奢侈品（周大福、美泰）、工程（奧雅納、中電）、教育（理工大學、HKCT）、旅遊（香港賽馬會）及專業服務。工作坊內容根據每個行業的工作流程、合規要求及實際用途度身定制。',
                  },
                },
                {
                  '@type': 'Question',
                  name: '企業 AI 工作坊可以預期哪些效果？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '工作坊平均滿意度達 9.2/10。重點是行為改變而非工具認知——團隊學會將 AI 融入日常工作流程。多節 Pioneer Program 參加者平均每週透過 AI 輔助工作流程設計節省 5-8 小時。',
                  },
                },
              ],
            })}
          </script>
        </Helmet>

        <p className="lang-toggle">
          <Link to="/services">View in English</Link>
        </p>
      </article>
    </Main>
  );
};

export default ZhServices;
