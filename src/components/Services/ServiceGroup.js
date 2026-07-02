import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import RelatedCaseStudies from './RelatedCaseStudies';

const CtaButton = ({ cta, ctaLink, external }) => {
  const isExternal = external || ctaLink.startsWith('http');

  if (!cta || !ctaLink) {
    return null;
  }

  if (isExternal) {
    return (
      <a href={ctaLink} target="_blank" rel="noopener noreferrer" className="button">
        {cta}
      </a>
    );
  }

  return (
    <Link to={ctaLink} className="button">
      {cta}
    </Link>
  );
};

CtaButton.propTypes = {
  cta: PropTypes.string.isRequired,
  ctaLink: PropTypes.string.isRequired,
  external: PropTypes.bool,
};

CtaButton.defaultProps = {
  external: false,
};

const ServiceGroup = ({
  id,
  title,
  subtitle,
  services,
  socialProof,
  testimonial,
  primaryCta,
}) => (
  <section id={id} className="service-group">
    <header className="service-group__header">
      <h3>{title}</h3>
      {subtitle && <p>{subtitle}</p>}
      {socialProof && (
        <p className="service-group__social-proof">
          <strong>{socialProof}</strong>
        </p>
      )}
      {testimonial && (
        /* Quote and attribution are single expressions: adjacent text nodes
           break react-snap hydration (React #418). */
        <blockquote className="service-group__testimonial">
          {`“${testimonial.quote}”`}
          <footer>
            {`${testimonial.name} | ${testimonial.title}${testimonial.company ? `, ${testimonial.company}` : ''}`}
          </footer>
        </blockquote>
      )}
    </header>

    <div className="service-group__list">
      {services.map((service) => (
        <article key={service.id} className="service-group__item">
          <h4>{service.title}</h4>
          {service.provider && (
            <p className="service-group__item-subtitle">
              {'Delivered via '}
              <strong>{service.provider}</strong>
            </p>
          )}
          {service.subtitle && (
            <p className="service-group__item-subtitle">
              <em>{service.subtitle}</em>
            </p>
          )}
          {service.description && <Markdown>{service.description}</Markdown>}

          {service.tiers && service.tiers.length > 0 && (
            <div className="service-group__tiers">
              <p><strong>Choose your level of support:</strong></p>
              {service.tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`service-group__tier service-group__tier--${tier.level || 'standard'}`}
                >
                  {tier.badge && (
                    <span className="service-group__tier-badge">{tier.badge}</span>
                  )}
                  <h5>{tier.title}</h5>
                  {tier.label && (
                    <span className="service-group__tier-label">{tier.label}</span>
                  )}
                  <p>{tier.description}</p>
                  <CtaButton
                    cta={tier.cta}
                    ctaLink={tier.ctaLink}
                    external={tier.external}
                  />
                </div>
              ))}
            </div>
          )}

          <RelatedCaseStudies slugs={service.relatedPosts} />

          {service.cta && service.ctaLink && (
            <p className="service-group__item-cta">
              <CtaButton
                cta={service.cta}
                ctaLink={service.ctaLink}
                external={service.external}
              />
            </p>
          )}
        </article>
      ))}
    </div>

    {primaryCta && (
      <div className="service-group__primary-cta">
        <CtaButton
          cta={primaryCta.cta}
          ctaLink={primaryCta.ctaLink}
          external={primaryCta.external}
        />
      </div>
    )}
  </section>
);

ServiceGroup.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  services: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      description: PropTypes.string,
      cta: PropTypes.string,
      ctaLink: PropTypes.string,
      external: PropTypes.bool,
      relatedPosts: PropTypes.arrayOf(PropTypes.string),
      tiers: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          level: PropTypes.string,
          badge: PropTypes.string,
          title: PropTypes.string.isRequired,
          label: PropTypes.string,
          description: PropTypes.string.isRequired,
          cta: PropTypes.string.isRequired,
          ctaLink: PropTypes.string.isRequired,
          external: PropTypes.bool,
        }),
      ),
    }),
  ),
  socialProof: PropTypes.string,
  testimonial: PropTypes.shape({
    quote: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string,
  }),
  primaryCta: PropTypes.shape({
    cta: PropTypes.string.isRequired,
    ctaLink: PropTypes.string.isRequired,
    external: PropTypes.bool,
  }),
};

ServiceGroup.defaultProps = {
  subtitle: '',
  services: [],
  socialProof: '',
  testimonial: null,
  primaryCta: null,
};

export default ServiceGroup;
