import React from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import testimonials from '../data/testimonials';
import TestimonialSection from '../components/Testimonials/TestimonialSection';
import HeroSection from '../components/Home/HeroSection';
import StatsBar from '../components/Home/StatsBar';
import ClientLogoBar from '../components/Home/ClientLogoBar';
import ServicesEditorial from '../components/Home/ServicesEditorial';
import LatestWriting from '../components/Home/LatestWriting';
import AboutCallout from '../components/Home/AboutCallout';
import HomeFAQ from '../components/Home/HomeFAQ';
import EmailCapture from '../components/EmailCapture/EmailCapture';
import ScrollReveal from '../components/ScrollReveal';

// Outcomes, not scores (Sam's ruling, 2026-08-02) — and the bank stays
// anonymous here like everywhere else on the site.
const homepageReceiptFragments = [
  'CTF: 5 proposals shipped in under 3 hours',
  'Garden: 6 departments re-booked',
  'one staff day became a 24-month AI community',
];

const Index = () => (
  <Main
    description={
      // 152 chars. Was 274 — nearly double the ~155 Google renders — and it
      // said "Train-the-Trainer programs" twice in one sentence.
      'Sam Wong is a Hong Kong AI train-the-trainer and Co-Founder at Adaptig. '
      + 'Corporate AI workshops, 1-1 coaching, trainer certification. '
      + '10,000+ trained.'
    }
    canonicalUrl={`${SITE_URL}/`}
    ogTitle="Sam Wong | Co-Founder, Adaptig — AI Train-the-Trainer"
    ogDescription="Corporate AI workshops, coaching, and Train-the-Trainer programs for Hong Kong enterprises. 10,000+ professionals trained through Adaptig."
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/`}
    ogType="website"
    twitterTitle="Sam Wong | Co-Founder, Adaptig — AI Train-the-Trainer"
    twitterDescription="Corporate AI workshops, coaching, and Train-the-Trainer programs for Hong Kong enterprises."
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/` },
      { lang: 'zh-Hant', href: `${SITE_URL}/zh` },
      { lang: 'x-default', href: `${SITE_URL}/` },
    ]}
  >
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify([{
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'Sam Wong - Co-Founder & AI Train-the-Trainer',
          url: SITE_URL,
          image: `${SITE_URL}/images/Sam.png`,
          description: 'Hong Kong-based AI train-the-trainer. Co-Founder & Director of Academy at Adaptig, delivering Train-the-Trainer certification, corporate workshops, and coaching for enterprises across Asia-Pacific.',
          areaServed: ['Hong Kong', 'Asia-Pacific', 'Global'],
          serviceType: ['AI Training', 'Corporate AI Workshops', 'Prompt Engineering Training', 'Executive AI Coaching', 'Train-the-Trainer Certification'],
          knowsLanguage: ['English', 'Cantonese', 'Mandarin'],
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Hong Kong',
            addressCountry: 'HK',
          },
          provider: {
            '@type': 'Person',
            name: 'Sam Wong',
            url: SITE_URL,
            jobTitle: 'Co-Founder & Director of Academy, Adaptig',
            worksFor: [
              { '@type': 'Organization', name: 'Adaptig', url: 'https://adaptig.ai' },
            ],
          },
        }, {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${SITE_URL}/#webpage`,
          url: `${SITE_URL}/`,
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['.stats-strip', "meta[name='description']"],
          },
        }])}
      </script>
    </Helmet>
    <article className="homepage-dark field-notes" id="index">
      {/* 1. Dark Hero — massive centered serif, single CTA */}
      <HeroSection />

      {/* 2. Stats — understated horizontal strip */}
      <ScrollReveal variant="fade-up-long">
        <StatsBar />
      </ScrollReveal>

      <section className="home-case-notes-strip" aria-labelledby="home-case-notes-heading">
        <div className="home-case-notes-strip__inner">
          <h2 className="home-case-notes-strip__heading" id="home-case-notes-heading">
            <span className="fn-stamp">CASE NOTES</span>
          </h2>
          <p className="home-case-notes-strip__receipts">
            {homepageReceiptFragments.join(' · ')}
          </p>
          <Link className="home-case-notes-strip__link" to="/case-notes/">
            Read the case notes →
          </Link>
        </div>
      </section>

      {/* 3. Client Logos — infinite marquee */}
      <ScrollReveal variant="fade-in">
        <ClientLogoBar />
      </ScrollReveal>

      {/* 4. Services — single-column editorial */}
      <ScrollReveal variant="fade-up-long">
        <ServicesEditorial />
      </ScrollReveal>

      {/* 5. Testimonials — full-width pull quotes */}
      <ScrollReveal variant="scale-in">
        <TestimonialSection
          testimonials={testimonials}
          variant="dark-pullquote"
        />
      </ScrollReveal>

      {/* 6. Latest Writing — date + title list */}
      <ScrollReveal variant="fade-up-long">
        <LatestWriting />
      </ScrollReveal>

      {/* 7. About — photo + bio callout */}
      <ScrollReveal variant="blur-in">
        <AboutCallout />
      </ScrollReveal>

      {/* 8. FAQ — question-shaped answer targets for AI discovery queries */}
      <ScrollReveal variant="fade-up-long">
        <HomeFAQ />
      </ScrollReveal>

      {/* 9. Email Capture — ink band for contrast */}
      <ScrollReveal variant="fade-up">
        <EmailCapture
          title="Get practical AI insights — no fluff"
          blurb="One email when I publish: workshop frameworks, adoption case studies, and tools I actually use with clients."
          caption="no spam, field notes only"
          variant="dark"
        />
      </ScrollReveal>

      <p className="lang-toggle lang-toggle--dark">
        <Link to="/zh">&#x4E2D;&#x6587;&#x7248;&#x672C;</Link>
      </p>
    </article>
  </Main>
);

export default Index;
