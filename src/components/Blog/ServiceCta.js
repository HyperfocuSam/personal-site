import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TAG_TO_SERVICE = {
  workshop: {
    href: '/services#organizations',
    label: 'Explore Corporate AI Workshops',
    text: 'Want this for your team? Sam delivers AI workshops for enterprises across Hong Kong and Asia-Pacific.',
  },
  'case-study': {
    href: '/services#organizations',
    label: 'See All Training Services',
    text: 'See how Sam helps organizations adopt AI through workshops, coaching, and trainer development.',
  },
  enterprise: {
    href: '/services#organizations',
    label: 'Explore Enterprise Training',
    text: 'Sam works with enterprises across banking, retail, engineering, and education in Hong Kong.',
  },
  'ai-adoption': {
    href: '/services',
    label: 'How Sam Helps Teams Adopt AI',
    text: 'From awareness workshops to multi-session Pioneer Programs — practical AI training that drives real behavior change.',
  },
  tools: {
    href: '/services#one-on-one',
    label: 'Book a Coaching Session',
    text: 'Want personalized guidance on AI tools and workflows? Sam offers 1-1 coaching for professionals.',
  },
  productivity: {
    href: '/services#one-on-one',
    label: 'Book a Coaching Session',
    text: 'Want personalized guidance on AI productivity? Sam offers 1-1 coaching for professionals.',
  },
};

// The blog is the best funnel on the site — 33% bounce against the homepage's
// 79.5%, and 28% of blog readers reach /services — but until now NONE of the 98
// posts linked to /book. A reader could only reach the calendar via the global
// nav. The service link stays primary because that path demonstrably works;
// booking is added beside it as the direct route for anyone already convinced.
const BookLink = () => (
  <Link to="/book" className="service-cta__book" data-cta="blog_cta_book">
    or book a free 30-minute call &rarr;
  </Link>
);

const ServiceCta = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  // Find the first matching tag by priority
  const match = ['workshop', 'case-study', 'enterprise', 'ai-adoption', 'tools', 'productivity']
    .find((tag) => tags.includes(tag));

  if (!match) {
    return (
      <div className="service-cta">
        <p className="service-cta__text">
          Sam Wong helps teams adopt AI through workshops, coaching,
          and trainer development across Hong Kong and Asia-Pacific.
        </p>
        <Link to="/services" className="button" data-cta="blog_service_cta_default">
          View Training Services
        </Link>
        <BookLink />
      </div>
    );
  }

  const cta = TAG_TO_SERVICE[match];

  return (
    <div className="service-cta">
      <p className="service-cta__text">{cta.text}</p>
      <Link to={cta.href} className="button" data-cta={`blog_service_cta_${match}`}>
        {cta.label}
      </Link>
      <BookLink />
    </div>
  );
};

ServiceCta.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

ServiceCta.defaultProps = {
  tags: null,
};

export default ServiceCta;
