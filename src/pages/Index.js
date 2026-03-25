import React from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import testimonials from '../data/testimonials';
import TestimonialSection from '../components/Testimonials/TestimonialSection';
import HeroSection from '../components/Home/HeroSection';
import OptimizedImage from '../components/Template/OptimizedImage';
import StatsBar from '../components/Home/StatsBar';
import ClientLogoBar from '../components/Home/ClientLogoBar';
import FeaturedCaseStudies from '../components/Home/FeaturedCaseStudies';
import EmailCapture from '../components/EmailCapture/EmailCapture';
import ScrollReveal from '../components/ScrollReveal';

const Index = () => (
  <Main
    description={
      'Hong Kong-based AI training specialist. Sam Wong delivers corporate AI workshops, '
      + '1-1 coaching, and Train-the-Trainer programs for enterprises across Asia-Pacific. '
      + '10,000+ professionals trained, 9.2/10 satisfaction.'
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
        {JSON.stringify({
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
        })}
      </script>
    </Helmet>
    <article className="post" id="index">
      {/* Hero — light, conversational, big serif (has its own entrance animation) */}
      <HeroSection />

      {/* Stats — numbers count up on scroll */}
      <ScrollReveal variant="fade-up">
        <StatsBar />
      </ScrollReveal>

      {/* Client Logo Bar */}
      <ScrollReveal variant="fade-in" delay={100}>
        <ClientLogoBar />
      </ScrollReveal>

      {/* How Can I Help You? — title reveals, then cards stagger in */}
      <section className="section-warm section-padding-major full-bleed">
        <div className="content-wide">
          <ScrollReveal variant="fade-up">
            <h2 className="home-section-title">
              How Can I
              <br />
              <em>Help You?</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" stagger={120} className="help-grid">
            <Link to="/services#organizations" className="help-card">
              <div className="help-card__image">
                <OptimizedImage src={`${process.env.PUBLIC_URL}/images/home/workshop-corporate.jpg`} alt="Corporate AI workshop at Arup" width={800} height={600} loading="lazy" />
              </div>
              <h3>Workshops for Organizations</h3>
              <p>
                Align your team, lower the fear, and build practical AI skills
                tied to daily workflows.
              </p>
              <span className="help-card__arrow">&rarr;</span>
            </Link>
            <Link to="/services#one-on-one" className="help-card">
              <div className="help-card__image">
                <OptimizedImage src={`${process.env.PUBLIC_URL}/images/home/coaching-session.jpg`} alt="Hands-on AI coaching with Adaptig platform" width={800} height={600} loading="lazy" />
              </div>
              <h3>One-on-One Coaching</h3>
              <p>
                Personalized sessions focused on your projects, your role,
                and your goals.
              </p>
              <span className="help-card__arrow">&rarr;</span>
            </Link>
            <Link to="/services#train-the-trainer" className="help-card">
              <div className="help-card__image">
                <OptimizedImage src={`${process.env.PUBLIC_URL}/images/home/train-the-trainer.jpg`} alt="Sam Wong presenting AI training on stage" width={800} height={600} loading="lazy" />
              </div>
              <h3>Train-the-Trainer</h3>
              <p>
                Become a certified AI trainer with the Adaptig methodology.
                Teach with confidence.
              </p>
              <span className="help-card__arrow">&rarr;</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-sunken section-padding-std full-bleed">
        <div className="content-wide">
          <ScrollReveal variant="fade-up">
            <h2 className="home-section-title">
              Trusted by
              {' '}
              <em>Leaders</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={150}>
            <TestimonialSection
              testimonials={testimonials}
              limit={2}
              featured
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-base section-padding-std full-bleed">
        <div className="content-wide">
          <ScrollReveal variant="fade-up">
            <FeaturedCaseStudies limit={3} tag="case-study" />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <ScrollReveal variant="fade-up">
        <EmailCapture
          title="Get practical AI insights — no fluff"
          blurb="One email when I publish: workshop frameworks, adoption case studies, and tools I actually use with clients."
        />
      </ScrollReveal>

      <p className="lang-toggle" style={{ textAlign: 'center' }}>
        <Link to="/zh">&#x4E2D;&#x6587;&#x7248;&#x672C;</Link>
      </p>
    </article>
  </Main>
);

export default Index;
