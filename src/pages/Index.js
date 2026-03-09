import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import testimonials from '../data/testimonials';
import TestimonialSection from '../components/Testimonials/TestimonialSection';
import HeroSection from '../components/Home/HeroSection';
import StatsBar from '../components/Home/StatsBar';
import FeaturedCaseStudies from '../components/Home/FeaturedCaseStudies';
import RevenuePathCTA from '../components/Home/RevenuePathCTA';
import EmailCapture from '../components/EmailCapture/EmailCapture';

const Index = () => (
  <Main
    description={
      'Sam Wong helps teams and professionals adopt AI with confidence through workshops, '
      + 'coaching, and trainer development. Human-first, practical, and outcome-focused.'
    }
    canonicalUrl={`${SITE_URL}/`}
    ogTitle="Sam Wong | AI Training Specialist"
    ogDescription="Helping enterprises and individuals thrive with AI. Corporate workshops, 1-1 coaching, and Train-the-Trainer programs."
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/`}
    ogType="website"
    twitterTitle="Sam Wong | AI Training Specialist"
    twitterDescription="Helping enterprises and individuals thrive with AI."
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/` },
      { lang: 'zh-Hant', href: `${SITE_URL}/zh` },
      { lang: 'x-default', href: `${SITE_URL}/` },
    ]}
  >
    <article className="post" id="index">
      {/* Hero — full-bleed dark gradient */}
      <HeroSection />

      {/* Stats — floating card overlapping hero/content boundary */}
      <StatsBar />

      {/* Trusted By Leaders */}
      <section className="section-base section-padding">
        <div className="content-wide">
          <TestimonialSection
            title="Trusted by leaders"
            subtitle="From executive teams to founders and emerging leaders."
            testimonials={testimonials}
            limit={1}
            featured
          />
        </div>
      </section>

      {/* What I Actually Do */}
      <section className="section-sunken section-padding">
        <div className="content-wide">
          <h3>What I Actually Do</h3>
          <p>Three ways I help people make AI useful in real work:</p>
          <div className="card-grid cols-3">
            <div className="card">
              <h4>Workshops for Organizations</h4>
              <p>
                Align teams, lower fear, and build practical skills tied to daily workflows.
              </p>
              <Link to="/services#organizations" className="button-ghost">
                Learn more &rarr;
              </Link>
            </div>
            <div className="card">
              <h4>One-on-One Coaching</h4>
              <p>
                Personalized sessions focused on your projects, your role, and your goals.
              </p>
              <Link to="/services#one-on-one" className="button-ghost">
                Learn more &rarr;
              </Link>
            </div>
            <div className="card">
              <h4>Train-the-Trainer</h4>
              <p>
                Equip facilitators to teach AI confidently with the Adaptig methodology.
              </p>
              <Link to="/services#train-the-trainer" className="button-ghost">
                Learn more &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="section-base section-padding">
        <div className="content-wide">
          <FeaturedCaseStudies limit={3} tag="case-study" />
        </div>
      </section>

      {/* Where I Work */}
      <section className="section-base section-padding">
        <div className="content-wide">
          <h3>Where I Work</h3>
          <div className="card-grid cols-2">
            <div className="card">
              <h4>
                <a href="https://adaptig.ai" target="_blank" rel="noopener noreferrer">
                  Adaptig
                </a>
              </h4>
              <p>
                Global trainer network and workshops for enterprise AI adoption.
                Spanning North America, Latin America, Europe, and Asia-Pacific.
              </p>
            </div>
            <div className="card">
              <h4>
                <a href="https://dotai.hk" target="_blank" rel="noopener noreferrer">
                  DotAI
                </a>
              </h4>
              <p>
                Hong Kong AI training community serving clients including HSBC,
                Bank of China, and Chow Tai Fook.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Start Here — conversion paths */}
      <section className="section-sunken section-padding">
        <div className="content-wide">
          <RevenuePathCTA />
        </div>
      </section>

      {/* Newsletter */}
      <EmailCapture
        source="homepage"
        title="Stay in the loop"
        blurb="Occasional insights on AI adoption. No spam, no hype."
      />

      <p style={{
        fontSize: '0.85em', color: '#888', marginTop: '2em', textAlign: 'center',
      }}
      >
        <Link to="/zh">&#x4E2D;&#x6587;&#x7248;&#x672C;</Link>
      </p>
    </article>
  </Main>
);

export default Index;
