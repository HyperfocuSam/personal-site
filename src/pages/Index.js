import React from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import testimonials from '../data/testimonials';
import TestimonialSection from '../components/Testimonials/TestimonialSection';
import HeroSection from '../components/Home/HeroSection';
import StatsBar from '../components/Home/StatsBar';
import ProofReceipt from '../components/Home/ProofReceipt';
import ClientLogoBar from '../components/Home/ClientLogoBar';
import ServicesEditorial from '../components/Home/ServicesEditorial';
import LatestWriting from '../components/Home/LatestWriting';
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
      {/* 1. Hero (white) — the claim, the credential, one red CTA, portrait */}
      <HeroSection />

      {/* 2. Stats (soft) — the four canonical numbers */}
      <ScrollReveal variant="fade-up-long">
        <StatsBar />
      </ScrollReveal>

      {/* 3. Proof receipt (ink) — the one quantified receipt, then the logos
          that back it. Replaces the old case-notes strip, whose text named
          Garden (anonymise ruling is text-only; logos are exempt). */}
      <ScrollReveal variant="fade-in">
        <ProofReceipt language="en" />
      </ScrollReveal>

      {/* 4. Client Logos (white) — infinite marquee */}
      <ScrollReveal variant="fade-in">
        <ClientLogoBar />
      </ScrollReveal>

      {/* 5. Services (soft) — single-column editorial */}
      <ScrollReveal variant="fade-up-long">
        <ServicesEditorial />
      </ScrollReveal>

      {/* 6. Testimonials (white) — three corporate quotes; heading kept the
          weaker claim on purpose (never "leaders" over participant voices) */}
      <ScrollReveal variant="scale-in">
        <TestimonialSection
          title="From client teams"
          testimonials={testimonials}
          variant="dark-pullquote"
        />
      </ScrollReveal>

      {/* 7. Conversion band (ink) — the ask lands right after the social proof
          most visitors actually reach (median scroll 53%). CTA label repeats
          the hero's verbatim — one ask, one wording. */}
      <ScrollReveal variant="fade-up">
        <section className="section-dark section-dark--centered section-padding">
          <div className="content-standard">
            <ul className="actions">
              <li>
                <Link to="/book" className="button" data-cta="home_band_book">
                  Book a Free Call
                </Link>
              </li>
              <li>
                <Link to="/services" className="button-secondary" data-cta="home_band_services">
                  See How I Can Help
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </ScrollReveal>

      {/* 8. Selected writing (white) — three buyer-relevant posts, curated,
          not the raw latest-N feed (which surfaced practitioner-diary posts
          to L&D buyers). AboutCallout absorbed into the hero; the about link
          rides here. */}
      <ScrollReveal variant="fade-up-long">
        <LatestWriting />
      </ScrollReveal>

      {/* 9. FAQ (soft) — question-shaped answer targets for AI discovery queries */}
      <ScrollReveal variant="fade-up-long">
        <HomeFAQ />
      </ScrollReveal>

      {/* 10. Email Capture — bordered card close */}
      <ScrollReveal variant="fade-up">
        <EmailCapture
          title="Field notes from real client rooms"
          blurb="One email when I publish: workshop frameworks, adoption case studies, and tools I use with clients."
          caption="field notes only"
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
