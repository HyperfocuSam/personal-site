import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import testimonialData from '../data/testimonialData';

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

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Testimonials | Sam Wong',
  description:
    'Real feedback from AI workshop participants and enterprise training clients.',
  url: `${SITE_URL}/testimonials`,
};

const Testimonials = () => (
  <Main
    title="Testimonials"
    description="Real feedback from AI workshop participants and enterprise training clients across banking, retail, and education."
    canonicalUrl={`${SITE_URL}/testimonials`}
    ogTitle="Testimonials | Sam Wong"
    ogDescription="Real feedback from 1,500+ AI workshop participants and enterprise training clients."
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/testimonials`}
    ogType="website"
    twitterTitle="Testimonials | Sam Wong"
    twitterDescription="Real feedback from AI workshop participants and enterprise training clients."
    twitterImage={DEFAULT_OG_IMAGE}
  >
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
    <article className="post" id="testimonials">
      {/* Dark hero */}
      <header className="page-hero">
        <div className="content-standard">
          <div className="title">
            <h2>
              <Link to="/testimonials">Testimonials</Link>
            </h2>
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
                Satisfaction Score
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
          <TestimonialSection
            title="What participants say about Sam"
            subtitle="Direct feedback from anonymous post-workshop surveys"
            testimonials={testimonialData.aboutSam}
          />
        </div>
      </section>

      {/* Corporate section */}
      <section className="section-base section-alt section-padding">
        <div className="content-standard testimonials">
          <TestimonialSection
            title="Enterprise clients"
            subtitle="Feedback from corporate AI training engagements"
            testimonials={testimonialData.corporate}
          />
        </div>
      </section>

      {/* Academy section */}
      <section className="section-base section-padding">
        <div className="content-standard testimonials">
          <TestimonialSection
            title="DotAI Academy"
            subtitle="Hong Kong&#39;s leading practical AI education platform"
            testimonials={testimonialData.academy}
          />
        </div>
      </section>
    </article>
  </Main>
);

export default Testimonials;
