import React from 'react';
import PropTypes from 'prop-types';

const TestimonialCard = ({
  quote,
  name,
  title,
  company,
  featured,
}) => (
  <article className={`testimonial-card${featured ? ' testimonial-card--featured' : ''}`}>
    <blockquote className="testimonial-card__quote">
      &ldquo;
      {quote}
      &rdquo;
    </blockquote>
    <p className="testimonial-card__author">
      <strong>{name}</strong>
      {' '}
      {title}
      {company ? `, ${company}` : ''}
    </p>
  </article>
);

TestimonialCard.propTypes = {
  quote: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  company: PropTypes.string,
  featured: PropTypes.bool,
};

TestimonialCard.defaultProps = {
  company: '',
  featured: false,
};

export default TestimonialCard;
