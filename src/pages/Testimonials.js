import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import testimonialData from '../data/testimonialData';
import ScrollReveal from '../components/ScrollReveal';

const TestimonialCard = ({
  quote, attribution, featured, stat,
}) => (
  <div className={`testimonial-card${featured ? ' testimonial-card--featured' : ''}`}>
    <p className="testimonial-card__quote">{quote}</p>
    <p className="testimonial-card__author">
      {attribution}
      {stat && <span>{stat}</span>}
    </p>
  </div>
);

TestimonialCard.propTypes = {
  quote: PropTypes.string.isRequired,
  attribution: PropTypes.string.isRequired,
  featured: PropTypes.bool,
  stat: PropTypes.string,
};

TestimonialCard.defaultProps = {
  featured: false,
  stat: null,
};

const TestimonialSection = ({
  title, subtitle, testimonials,
}) => (
  <div className="testimonials__section">
    <h3>{title}</h3>
    {subtitle && <p>{subtitle}</p>}
    <div className="testimonials__grid">
      {testimonials.map((t) => (
        <TestimonialCard key={t.attribution} {...t} />
      ))}
    </div>
  </div>
);

TestimonialSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string.isRequired,
      attribution: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

TestimonialSection.defaultProps = {
  subtitle: null,
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
    <article className="post" id="testimonials">
      {/* Dark hero */}
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

      {/* Stats bar */}
      <section className="section-base">
        <div className="stats-floating content-standard">
          <div className="stats-bar">
            <div className="stat-item">
              <span className="stat-item__number">
                {testimonialData.stats.satisfaction}
              </span>
              <span className="stat-item__label">
                {`Satisfaction — ${testimonialData.stats.satisfactionSource}`}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-item__number">
                {testimonialData.stats.participantsServed}
              </span>
              <span className="stat-item__label">
                Participants Trained
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-item__number">
                {testimonialData.stats.enterpriseClients}
              </span>
              <span className="stat-item__label">
                Enterprise Clients
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About Sam section */}
      <section className="section-base section-padding">
        <div className="content-standard testimonials">
          <ScrollReveal variant="scale-in">
            <TestimonialSection
              title="What participants say about Sam"
              subtitle="Direct feedback from anonymous post-workshop surveys"
              testimonials={testimonialData.aboutSam}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Corporate section */}
      <section className="section-base section-alt section-padding">
        <div className="content-standard testimonials">
          <ScrollReveal variant="scale-in">
            <TestimonialSection
              title="Enterprise clients"
              subtitle="Feedback from corporate AI training engagements"
              testimonials={testimonialData.corporate}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Academy section */}
      <section className="section-base section-padding">
        <div className="content-standard testimonials">
          <ScrollReveal variant="scale-in">
            <TestimonialSection
              title="DotAI Academy"
              subtitle="Practical AI education for Hong Kong professionals"
              testimonials={testimonialData.academy}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA linking to services */}
      <section className="section-warm section-padding">
        <div className="content-standard" style={{ textAlign: 'center' }}>
          <ScrollReveal variant="fade-up">
            <h3>Ready to experience this for your team?</h3>
            <p>
              Corporate AI workshops, 1-1 coaching, and Train-the-Trainer programs
              — available in English and Cantonese across Hong Kong and Asia-Pacific.
            </p>
            <div style={{
              display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem',
            }}
            >
              <Link to="/services" className="button">
                See Training Services
              </Link>
              <Link to="/clients" className="button button--outline">
                View Case Studies
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </article>
  </Main>
);

export default Testimonials;
