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
    subtitle: '工作坊、培訓同活動，推動團隊由興趣到真正應用。',
    socialProof:
      '中銀香港 (1,530 位參加者, 9.2/10)、周大福 (第三次合作)、匯豐、美泰、豐田、YPO。',
    testimonial: testimonials[0],
    primaryCta: {
      cta: '聯絡我哋',
      ctaLink: '/contact',
      external: false,
    },
    band: 'section-base',
  },
  {
    id: 'one-on-one',
    category: 'individuals',
    title: '個人服務',
    subtitle: '為建立實用 AI 習慣嘅專業人士提供個人化輔導。',
    socialProof: '160+ 位跨行業專業人士接受輔導。',
    testimonial: testimonials[1],
    primaryCta: {
      cta: '預約免費諮詢',
      ctaLink: 'https://ro.am/samwong/',
      external: true,
    },
    band: 'section-sunken',
  },
  {
    id: 'train-the-trainer',
    category: 'trainers',
    title: '培訓師計劃',
    subtitle: '培訓師招募——想教授實用 AI 嘅引導者。',
    socialProof:
      '加入橫跨北美、拉丁美洲、歐洲同亞太嘅全球網絡。',
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
      description="Sam Wong AI 培訓服務 — 企業工作坊、培訓師培訓計劃、一對一輔導。透過 DotAI 同 Adaptig 提供。AI顧問 香港、企業AI培訓。"
      canonicalUrl={`${SITE_URL}/zh/services`}
      ogTitle="AI 培訓服務 | Sam Wong"
      ogDescription="企業工作坊、培訓師培訓計劃、一對一輔導。透過 DotAI 同 Adaptig 提供。"
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
      <article className="post" id="zh-services">
        {/* Dark hero with anchor pills */}
        <header className="page-hero">
          <div className="content-standard">
            <div className="title">
              <h2>
                <Link to="/zh/services">服務</Link>
              </h2>
              <p>選擇符合你目標嘅路徑</p>
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

        <p className="lang-toggle">
          <Link to="/services">View in English</Link>
        </p>
      </article>
    </Main>
  );
};

export default ZhServices;
