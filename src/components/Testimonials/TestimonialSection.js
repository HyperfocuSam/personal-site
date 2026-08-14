import React from 'react';
import PropTypes from 'prop-types';

import TestimonialCard from './TestimonialCard';

const TestimonialSection = ({
  title,
  subtitle,
  testimonials,
  limit,
  featured,
  variant,
}) => {
  const limitedTestimonials = typeof limit === 'number'
    ? testimonials.slice(0, limit)
    : testimonials;

  if (limitedTestimonials.length === 0) {
    return null;
  }

  // Dark pull-quote variant for homepage
  if (variant === 'dark-pullquote') {
    return (
      <section className="testimonial-pullquote">
        {title && <h2 className="testimonial-pullquote__title">{title}</h2>}
        {limitedTestimonials.map((testimonial, index) => (
          <blockquote
            key={`${testimonial.name}-${testimonial.company || testimonial.title}`}
            className="testimonial-pullquote__item fn-card"
          >
            {/* Quote and role are single expressions: adjacent text nodes
                break react-snap hydration (React #418). */}
            <p className="testimonial-pullquote__quote">
              {`“${testimonial.quote}”`}
            </p>
            <footer className="testimonial-pullquote__attribution">
              <span className="testimonial-pullquote__name">{testimonial.name}</span>
              {testimonial.title && (
                <span className="testimonial-pullquote__role">
                  {testimonial.title}
                </span>
              )}
              {testimonial.company && (
                <span
                  className="testimonial-pullquote__stamp fn-stamp fn-stamp--verified"
                >
                  {testimonial.company}
                </span>
              )}
            </footer>
            {index < limitedTestimonials.length - 1 && (
              <hr className="testimonial-pullquote__divider" />
            )}
          </blockquote>
        ))}
      </section>
    );
  }

  // Default card-grid variant (used by About, Services, Testimonials pages)
  return (
    <section className="testimonials">
      {(title || subtitle) && (
        <header className="testimonials__header">
          {title && <h3>{title}</h3>}
          {subtitle && <p>{subtitle}</p>}
        </header>
      )}
      <div className="testimonials__grid">
        {limitedTestimonials.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.name}-${testimonial.company || testimonial.title}`}
            quote={testimonial.quote}
            name={testimonial.name}
            title={testimonial.title}
            company={testimonial.company}
            featured={featured && index === 0}
          />
        ))}
      </div>
    </section>
  );
};

TestimonialSection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      company: PropTypes.string,
    }),
  ),
  limit: PropTypes.number,
  featured: PropTypes.bool,
  variant: PropTypes.string,
};

TestimonialSection.defaultProps = {
  title: '',
  subtitle: '',
  testimonials: [],
  limit: undefined,
  featured: false,
  variant: 'default',
};

export default TestimonialSection;
