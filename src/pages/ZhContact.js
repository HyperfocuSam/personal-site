import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import EmailLink from '../components/Contact/EmailLink';
import ContactIcons from '../components/Contact/ContactIcons';
import ContactForm from '../components/Contact/ContactForm';
import ScrollReveal from '../components/ScrollReveal';

// `?interest=` values stay English so one link works in both languages — the
// English lander, a Chinese post and a WhatsApp share can all point at
// ?interest=corporate and land on the right option.
const interestByQuery = {
  corporate: 'Corporate Training',
  coaching: '1-1 Coaching',
  speaking: 'Speaking',
  trainer: 'Become an Adaptig Trainer',
  other: 'Other',
};

// The site's enquiry form existed only in English. /zh ranks #2 in Hong Kong for
// 「企業 AI 培訓 香港 工作坊」 and the reader it brings had to switch language to
// ask a question. `placement: 'zh_contact_page'` keeps the two funnels apart in
// PostHog; the `interest` VALUE stays English so Sam's inbox stays sortable.
const ZhContact = () => {
  const { search } = useLocation();
  const initialInterest = useMemo(() => {
    const params = new URLSearchParams(search);
    const interest = params.get('interest');
    if (!interest) {
      return 'Corporate Training';
    }
    return interestByQuery[interest.toLowerCase()] || 'Corporate Training';
  }, [search]);

  return (
    <Main
      title="聯絡 Sam Wong — 企業 AI 培訓查詢"
      description="查詢企業 AI 培訓、團隊工作坊、一對一教練或演講邀請。填表或 WhatsApp 都可以，我會在 24 小時內回覆。粵語、英語皆可。"
      canonicalUrl={`${SITE_URL}/zh/contact`}
      ogTitle="聯絡 | Sam Wong"
      ogDescription="查詢企業 AI 培訓、工作坊、一對一教練與演講邀請。"
      ogImage={DEFAULT_OG_IMAGE}
      ogUrl={`${SITE_URL}/zh/contact`}
      ogType="website"
      twitterTitle="聯絡 | Sam Wong"
      twitterDescription="查詢企業 AI 培訓、工作坊、一對一教練與演講邀請。"
      twitterImage={DEFAULT_OG_IMAGE}
      hreflangTags={[
        { lang: 'en', href: `${SITE_URL}/contact` },
        { lang: 'zh-Hant', href: `${SITE_URL}/zh/contact` },
        { lang: 'x-default', href: `${SITE_URL}/contact` },
      ]}
    >
      <Helmet>
        <html lang="zh-Hant" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: '聯絡 Sam Wong',
            url: `${SITE_URL}/zh/contact/`,
            inLanguage: 'zh-Hant',
            isPartOf: { '@id': `${SITE_URL}/#website` },
            mainEntity: {
              '@type': 'Person',
              name: 'Sam Wong',
              email: 'sam@adaptig.com',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                email: 'sam@adaptig.com',
                areaServed: ['Hong Kong', 'Asia-Pacific', 'Global'],
                availableLanguage: ['Cantonese', 'Mandarin', 'English'],
              },
            },
          })}
        </script>
      </Helmet>
      <article className="post field-notes-content zh" id="zh-contact">
        {/* Dark hero */}
        <header className="page-hero">
          <div className="content-narrow">
            <div className="title">
              <h1>聯絡</h1>
              <p>一起找出合適的下一步</p>
            </div>
          </div>
        </header>

        {/* Contact form */}
        <section className="section-base section-padding">
          <div className="content-narrow">
            <ScrollReveal variant="fade-up">
              <p>
                無論是團隊培訓、一對一教練、演講邀請，還是想了解導師招募，
                講一下你的情況，我會告訴你哪個方式最合適。
              </p>

              <ContactForm
                initialInterest={initialInterest}
                placement="zh_contact_page"
                language="zh-Hant"
              />

              {/* Single-expression text: adjacent text nodes break react-snap hydration (#418) */}
              <p>
                {'或者 '}
                <a
                  href="https://wa.me/85264315177"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp 我
                </a>
                。
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Other contact methods */}
        <section className="section-sunken section-padding">
          <div className="content-narrow">
            <h2>想直接傳訊息？</h2>
            <div className="email-at">
              <p>直接電郵我：</p>
              <EmailLink />
            </div>

            <h2>想快一點？用 WhatsApp</h2>
            {/* Single-expression text: adjacent text nodes break react-snap hydration (#418) */}
            <p>
              {'想快點收到回覆，可以 '}
              <a
                href="https://wa.me/85264315177"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp 我
              </a>
              。
            </p>
          </div>
        </section>

        {/* What I help with + social */}
        <section className="section-base section-padding">
          <div className="content-narrow">
            <ScrollReveal variant="fade-up-long">
              <h2>我可以幫甚麼</h2>
            </ScrollReveal>
            <ScrollReveal variant="fade-up-long" stagger={120}>
              <div className="card-grid cols-2">
                <div className="card fn-card">
                  <h3>企業培訓</h3>
                  <p>團隊工作坊與應用推行計劃</p>
                </div>
                <div className="card fn-card">
                  <h3>一對一教練</h3>
                  <p>針對你自己工作流程的個人化支援</p>
                </div>
                <div className="card fn-card">
                  <h3>演講</h3>
                  <p>主題演講、高管簡報與活動環節</p>
                </div>
                <div className="card fn-card">
                  <h3>導師招募</h3>
                  <p>加入 Adaptig 的導師網絡</p>
                </div>
              </div>
            </ScrollReveal>

            <h2>社交平台</h2>
            <ContactIcons />

            <p style={{ marginTop: '2em' }}>
              <em>base 在香港，服務遍及亞太區及全球。</em>
            </p>
          </div>
        </section>
      </article>
    </Main>
  );
};

export default ZhContact;
