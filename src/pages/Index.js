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

const Index = () => (
  <Main
    description={
      'Hong Kong-based AI training specialist. Sam Wong delivers corporate AI workshops, '
      + '1-1 coaching, and Train-the-Trainer programs for enterprises across Asia-Pacific. '
      + '10,000+ professionals trained.'
    }
    canonicalUrl={`${SITE_URL}/`}
    ogTitle="Sam Wong | AI Training Specialist - Hong Kong"
    ogDescription="Corporate AI workshops, coaching, and Train-the-Trainer programs for Hong Kong enterprises. 10,000+ professionals trained through Adaptig."
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/`}
    ogType="website"
    twitterTitle="Sam Wong | AI Training Specialist - Hong Kong"
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
          name: 'Sam Wong - AI Training Specialist',
          url: SITE_URL,
          image: `${SITE_URL}/images/Sam.png`,
          description: 'Hong Kong-based AI training specialist delivering corporate workshops, coaching, and Train-the-Trainer programs for enterprises across Asia-Pacific.',
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
            jobTitle: 'AI Training Specialist',
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
            cssSelector: ['.hero-stats', "meta[name='description']"],
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
