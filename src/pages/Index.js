import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import testimonials from '../data/testimonials';
import TestimonialSection from '../components/Testimonials/TestimonialSection';
import HeroSection from '../components/Home/HeroSection';
import StatsBar from '../components/Home/StatsBar';
import FeaturedCaseStudies from '../components/Home/FeaturedCaseStudies';
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
      {/* Hero — light background, conversational */}
      <HeroSection />

      {/* Stats bar — social proof numbers */}
      <StatsBar />

      {/* Newsletter — high on the page like Ali */}
      <EmailCapture
        source="homepage"
        title="Stay in the loop"
        blurb="Occasional insights on AI adoption, practical prompts, and what I'm learning from training 10,000+ professionals. No spam, no hype."
      />

      {/* How Can I Help You? — the service router */}
      <section className="section-yellow section-padding full-bleed">
        <div className="content-wide">
          <h2 className="section-heading">
            How Can I
            {' '}
            <span className="heading-accent">Help You?</span>
          </h2>
          <div className="help-grid">
            <Link to="/services#organizations" className="help-card">
              <div className="help-card__icon">&#x1F3E2;</div>
              <h3>Workshops for Organizations</h3>
              <p>
                Align your team, lower the fear, and build practical AI skills
                tied to daily workflows.
              </p>
              <span className="help-card__cta">Learn more &rarr;</span>
            </Link>
            <Link to="/services#one-on-one" className="help-card">
              <div className="help-card__icon">&#x1F91D;</div>
              <h3>One-on-One Coaching</h3>
              <p>
                Personalized sessions focused on your projects, your role,
                and your goals.
              </p>
              <span className="help-card__cta">Learn more &rarr;</span>
            </Link>
            <Link to="/services#train-the-trainer" className="help-card">
              <div className="help-card__icon">&#x1F393;</div>
              <h3>Train-the-Trainer</h3>
              <p>
                Become a certified AI trainer with the Adaptig methodology.
                Teach with confidence.
              </p>
              <span className="help-card__cta">Learn more &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted by leaders — testimonials on white */}
      <section className="section-base section-padding full-bleed">
        <div className="content-wide">
          <h2 className="section-heading">
            Trusted by
            {' '}
            <span className="heading-accent">Leaders</span>
          </h2>
          <TestimonialSection
            testimonials={testimonials}
            limit={2}
            featured
          />
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="section-sunken section-padding full-bleed">
        <div className="content-wide">
          <FeaturedCaseStudies limit={3} tag="case-study" />
        </div>
      </section>

      {/* Where I Work */}
      <section className="section-base section-padding full-bleed">
        <div className="content-wide">
          <h2 className="section-heading">Where I Work</h2>
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

      {/* Bottom CTA — newsletter repeat */}
      <EmailCapture
        source="homepage-bottom"
        title="Ready to bring AI to your team?"
        blurb="Drop your email for practical AI insights, or book a free conversation to explore what's possible."
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
