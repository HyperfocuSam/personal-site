import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import RelatedCaseStudies from './RelatedCaseStudies';

// data-cta is read by the delegated click listener in utils/track.js. Threading
// it through these two components names every CTA defined in data/services.js,
// data/services-zh.js and pages/ZhServices.js at once, with no per-page edits.
const QuietLink = ({
  cta, ctaLink, external, ctaId,
}) => {
  const isExternal = external || ctaLink.startsWith('http');

  if (!cta || !ctaLink) {
    return null;
  }

  if (isExternal) {
    return (
      <a
        href={ctaLink}
        target="_blank"
        rel="noopener noreferrer"
        className="service-group__quiet-link"
        data-cta={ctaId}
      >
        {`${cta} →`}
      </a>
    );
  }

  return (
    <Link to={ctaLink} className="service-group__quiet-link" data-cta={ctaId}>
      {`${cta} →`}
    </Link>
  );
};

QuietLink.propTypes = {
  cta: PropTypes.string.isRequired,
  ctaLink: PropTypes.string.isRequired,
  external: PropTypes.bool,
  ctaId: PropTypes.string,
};

QuietLink.defaultProps = {
  external: false,
  ctaId: undefined,
};

const PrimaryCtaButton = ({
  cta, ctaLink, external, ctaId,
}) => {
  const isExternal = external || ctaLink.startsWith('http');

  if (!cta || !ctaLink) {
    return null;
  }

  if (isExternal) {
    return (
      <a
        href={ctaLink}
        target="_blank"
        rel="noopener noreferrer"
        className="button"
        data-cta={ctaId}
      >
        {cta}
      </a>
    );
  }

  return (
    <Link to={ctaLink} className="button" data-cta={ctaId}>
      {cta}
    </Link>
  );
};

PrimaryCtaButton.propTypes = {
  cta: PropTypes.string.isRequired,
  ctaLink: PropTypes.string.isRequired,
  external: PropTypes.bool,
  ctaId: PropTypes.string,
};

PrimaryCtaButton.defaultProps = {
  external: false,
  ctaId: undefined,
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
      {/* h2, not h3: /services ran H1 -> H3 with its only H2 arriving in the FAQ
          block at the bottom. Sizes are pinned in pages/_services.scss for both
          #services and #zh-services, so this is a semantic change only. */}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      {socialProof && (
        <p className="service-group__social-proof">
          <strong>{socialProof}</strong>
        </p>
      )}
      {testimonial && (
        /* Quote and attribution are single expressions: adjacent text nodes
           break react-snap hydration (React #418). Compact row on mobile. */
        <blockquote className="service-group__testimonial fn-entry">
          <p className="service-group__testimonial-quote">
            {`“${testimonial.quote}”`}
          </p>
          <footer className="service-group__testimonial-attr">
            {`${testimonial.name} | ${testimonial.title}${testimonial.company ? `, ${testimonial.company}` : ''}`}
          </footer>
        </blockquote>
      )}
    </header>

    <div className="service-group__list">
      {services.map((service) => (
        <article key={service.id} className="service-group__item fn-entry">
          <h3>{service.title}</h3>
          {(service.provider || service.subtitle) && (
            <p className="service-group__item-meta">
              {service.provider
                ? `Delivered via ${service.provider}${service.subtitle ? ` · ${service.subtitle}` : ''}`
                : service.subtitle}
            </p>
          )}
          {service.description && (
            <div className="service-group__item-body">
              <Markdown>{service.description}</Markdown>
            </div>
          )}

          {service.tiers && service.tiers.length > 0 && (
            <div className="service-group__tiers">
              <p><strong>Choose your level of support:</strong></p>
              {service.tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`service-group__tier service-group__tier--${tier.level || 'standard'} fn-entry`}
                >
                  {tier.badge && (
                    <span className="service-group__tier-badge fn-stamp fn-stamp--verified">
                      {tier.badge}
                    </span>
                  )}
                  <div className="service-group__tier-header">
                    <h5>{tier.title}</h5>
                    {tier.label && (
                      <span className="service-group__tier-format fn-stamp">
                        {tier.label}
                      </span>
                    )}
                  </div>
                  <p>{tier.description}</p>
                </div>
              ))}
            </div>
          )}

          <RelatedCaseStudies slugs={service.relatedPosts} />

          {service.cta && service.ctaLink && (
            <p className="service-group__item-cta">
              <QuietLink
                cta={service.cta}
                ctaLink={service.ctaLink}
                external={service.external}
                ctaId={service.id && `service_${service.id}`}
              />
            </p>
          )}
        </article>
      ))}
    </div>

    {primaryCta && (
      <div className="service-group__primary-cta">
        <PrimaryCtaButton
          cta={primaryCta.cta}
          ctaLink={primaryCta.ctaLink}
          external={primaryCta.external}
          ctaId={primaryCta.id ? `primary_${primaryCta.id}` : 'primary_cta'}
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
    id: PropTypes.string,
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
