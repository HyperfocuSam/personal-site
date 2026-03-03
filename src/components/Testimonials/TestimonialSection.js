import React from 'react';
import PropTypes from 'prop-types';

import TestimonialCard from './TestimonialCard';

const TestimonialSection = ({
  title,
  subtitle,
  testimonials,
  limit,
  featured,
}) => {
  const limitedTestimonials = typeof limit === 'number'
    ? testimonials.slice(0, limit)
    : testimonials;

  if (limitedTestimonials.length === 0) {
    return null;
  }

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
};

TestimonialSection.defaultProps = {
  title: '',
  subtitle: '',
  testimonials: [],
  limit: undefined,
  featured: false,
};

export default TestimonialSection;
