import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import testimonialData from '../data/testimonialData';
import ScrollReveal from '../components/ScrollReveal';

// Signature hero: strongest attributed enterprise quote already on the page.
const heroTestimonial = testimonialData.corporate.find((t) => t.featured)
  || testimonialData.corporate[0];

const clusters = [
  {
    id: 'corporate',
    title: 'Corporate training',
    subtitle: 'Feedback from enterprise AI training engagements',
    testimonials: testimonialData.corporate.filter(
      (t) => t.quote !== heroTestimonial.quote,
    ),
  },
  {
    id: 'about-sam',
    title: 'Public classes',
    subtitle: 'Direct feedback from anonymous post-workshop surveys',
    testimonials: testimonialData.aboutSam,
  },
  {
    id: 'academy',
    title: 'DotAI Academy',
    subtitle: 'Practical AI education for Hong Kong professionals',
    testimonials: testimonialData.academy,
  },
];

const CompactQuote = ({ quote, attribution, stat }) => (
  <div className="testimonial-compact fn-entry">
    <p className="testimonial-compact__quote">{quote}</p>
    <p className="testimonial-compact__author">
      {attribution}
      {stat && <span className="fn-stamp fn-stamp--verified">{stat}</span>}
    </p>
  </div>
);

CompactQuote.propTypes = {
  quote: PropTypes.string.isRequired,
  attribution: PropTypes.string.isRequired,
  stat: PropTypes.string,
};

CompactQuote.defaultProps = {
  stat: null,
};

// No Review/Rating markup here by design: the survey quotes are anonymous, so
// numeric ratings can't be verified against named reviewers. Visible quotes
// stay; unverifiable structured-data ratings were removed (2026-07-01 audit).
const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Testimonials | Sam Wong',
    description:
      'Real feedback from AI workshop participants and enterprise training clients in Hong Kong.',
    url: `${SITE_URL}/testimonials`,
  },
];

const Testimonials = () => (
  <Main
    title="Testimonials"
    description="Real feedback from 1,500+ AI workshop participants across banking, retail, and education in Hong Kong. Bank of China (Hong Kong): 9.2/10 satisfaction."
    canonicalUrl={`${SITE_URL}/testimonials`}
    ogTitle="Testimonials | Sam Wong"
    ogDescription="Real feedback from 1,500+ AI workshop participants and enterprise training clients."
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/testimonials`}
    ogType="website"
    twitterTitle="Testimonials | Sam Wong"
    twitterDescription="Real feedback from AI workshop participants and enterprise training clients."
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/testimonials` },
      { lang: 'x-default', href: `${SITE_URL}/testimonials` },
    ]}
  >
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
    <article className="post field-notes-content" id="testimonials">
      <header className="page-hero">
        <div className="content-standard">
          <div className="title">
            <h1>
              <Link to="/testimonials">Testimonials</Link>
            </h1>
            <p>Real feedback from workshop participants and enterprise clients</p>
          </div>
        </div>
      </header>

      {/* Stats bar — structure untouched (mobile layout owned by another lane) */}
      <section className="section-base">
        <div className="stats-floating content-standard">
          <div className="stats-bar">
            <div className="stat-item fn-receipt">
              <span className="stat-item__number fn-receipt__number">
                {testimonialData.stats.satisfaction}
              </span>
              <span className="fn-receipt__leader" aria-hidden="true" />
              <span className="stat-item__label fn-receipt__label">
                {`Satisfaction — ${testimonialData.stats.satisfactionSource}`}
              </span>
            </div>
            <div className="stat-item fn-receipt">
              <span className="stat-item__number fn-receipt__number">
                {testimonialData.stats.participantsServed}
              </span>
              <span className="fn-receipt__leader" aria-hidden="true" />
              <span className="stat-item__label fn-receipt__label">
                Participants Trained
              </span>
            </div>
            <div className="stat-item fn-receipt">
              <span className="stat-item__number fn-receipt__number">
                {testimonialData.stats.enterpriseClients}
              </span>
              <span className="fn-receipt__leader" aria-hidden="true" />
              <span className="stat-item__label fn-receipt__label">
                Enterprise Clients
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Signature hero quote + primary CTA */}
      <section className="section-base section-padding testimonials-hero-section">
        <div className="content-standard">
          <ScrollReveal variant="scale-in">
            <blockquote className="testimonials-hero-quote fn-card">
              <p className="testimonials-hero-quote__text">
                {`“${heroTestimonial.quote}”`}
              </p>
              <footer className="testimonials-hero-quote__footer">
                <span>{heroTestimonial.attribution}</span>
                {heroTestimonial.stat && (
                  <span className="fn-stamp fn-stamp--verified">
                    {heroTestimonial.stat}
                  </span>
                )}
              </footer>
            </blockquote>
          </ScrollReveal>
          <p className="testimonials-top-cta">
            <Link to="/book" className="button">
              Book a Discovery Call
            </Link>
          </p>
        </div>
      </section>

      {/* Clustered compact quotes */}
      {clusters.map((cluster) => (
        <section
          key={cluster.id}
          className={`section-base section-padding${cluster.id === 'about-sam' ? ' section-alt' : ''}`}
        >
          <div className="content-standard testimonials">
            <ScrollReveal variant="scale-in">
              <div className="testimonials__section">
                <h3>{cluster.title}</h3>
                {cluster.subtitle && (
                  <p className="fn-stamp">{cluster.subtitle}</p>
                )}
                <div className="testimonials__compact-list">
                  {cluster.testimonials.map((t) => (
                    <CompactQuote
                      key={t.attribution + t.quote.slice(0, 24)}
                      quote={t.quote}
                      attribution={t.attribution}
                      stat={t.stat}
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      ))}

      {/* Closing CTA — single primary pattern */}
      <section className="section-warm section-padding">
        <div className="content-standard testimonials-closing">
          <ScrollReveal variant="fade-up">
            <h3>Ready to experience this for your team?</h3>
            <p>
              Corporate AI workshops, 1-1 coaching, and Train-the-Trainer programs
              — available in English and Cantonese across Hong Kong and Asia-Pacific.
            </p>
            <p>
              <Link to="/services" className="button">
                See Training Services
              </Link>
            </p>
            <p className="testimonials-closing__secondary">
              <Link to="/clients">View case studies →</Link>
            </p>
          </ScrollReveal>
        </div>
      </section>
    </article>
  </Main>
);

export default Testimonials;
