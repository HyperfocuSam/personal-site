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
import ProofStrip from '../components/Home/ProofStrip';
import ServicesEditorial from '../components/Home/ServicesEditorial';
import LatestWriting from '../components/Home/LatestWriting';
import AboutCallout from '../components/Home/AboutCallout';
import HomeFAQ from '../components/Home/HomeFAQ';
import EmailCapture from '../components/EmailCapture/EmailCapture';
import ScrollReveal from '../components/ScrollReveal';

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
      {/* 1. Hero — split layout with new copy and CTAs */}
      <HeroSection />

      {/* 2. Stats — understated horizontal strip */}
      <ScrollReveal variant="fade-up-long">
        <StatsBar />
      </ScrollReveal>

      {/* 3. Client Logos — verified engagements marquee */}
      <ScrollReveal variant="fade-in">
        <ClientLogoBar />
      </ScrollReveal>

      {/* 3.5. Proof — real workshop photos */}
      <ScrollReveal variant="fade-up-long">
        <ProofStrip />
      </ScrollReveal>

      {/* 4. Path Split — three service cards (Workshops emphasized) */}
      <ScrollReveal variant="fade-up-long">
        <ServicesEditorial />
      </ScrollReveal>

      {/* 5. Case Notes — three receipt cards with metrics */}
      <section className="home-case-notes-cards full-bleed" aria-labelledby="home-case-notes-heading">
        <div className="content-narrow">
          <h2 className="home-case-notes-cards__heading" id="home-case-notes-heading">
            <span className="fn-stamp">CASE NOTES</span>
          </h2>
          <div className="home-case-notes-cards__grid">
            <Link to="/case-notes/" className="case-receipt-card">
              <span className="case-receipt-card__org fn-stamp">Chow Tai Fook</span>
              <p className="case-receipt-card__metric">5 go-to-market proposals in under 3 hours</p>
              <span className="case-receipt-card__arrow">&rarr;</span>
            </Link>
            <Link to="/case-notes/" className="case-receipt-card">
              <span className="case-receipt-card__org fn-stamp">Garden (food manufacturer)</span>
              <p className="case-receipt-card__metric">6 departments came back</p>
              <span className="case-receipt-card__arrow">&rarr;</span>
            </Link>
            <Link to="/case-notes/" className="case-receipt-card">
              <span className="case-receipt-card__org fn-stamp">HKCT</span>
              <p className="case-receipt-card__metric">one staff day → 24-month AI community</p>
              <span className="case-receipt-card__arrow">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Testimonials — 2-3 max full-width pull quotes */}
      <ScrollReveal variant="scale-in">
        <TestimonialSection
          testimonials={testimonials.slice(0, 2)}
          variant="dark-pullquote"
        />
      </ScrollReveal>

      {/* 7. Latest Writing — 3 posts */}
      <ScrollReveal variant="fade-up-long">
        <LatestWriting />
      </ScrollReveal>

      {/* 8. About — photo + bio callout */}
      <ScrollReveal variant="blur-in">
        <AboutCallout />
      </ScrollReveal>

      {/* 9. Playbook Capture — free lead magnet above FAQ */}
      <ScrollReveal variant="fade-up">
        <EmailCapture
          title="Free: AI Pioneer Program Playbook"
          blurb="The 6-session structure I use with enterprise clients — champion selection, habit framework, and measurement template."
          leadMagnet={{
            title: 'AI Pioneer Program Playbook (PDF)',
            url: '/downloads/ai-pioneer-program-playbook.pdf',
          }}
        />
      </ScrollReveal>

      {/* 10. FAQ — 4 questions for AI discovery queries */}
      <ScrollReveal variant="fade-up-long">
        <HomeFAQ />
      </ScrollReveal>

      <p className="lang-toggle lang-toggle--dark">
        <Link to="/zh">&#x4E2D;&#x6587;&#x7248;&#x672C;</Link>
      </p>
    </article>
  </Main>
);

export default Index;
