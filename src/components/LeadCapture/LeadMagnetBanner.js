import React from 'react';
import PropTypes from 'prop-types';
import EmailCapture from './EmailCapture';

const LeadMagnetBanner = ({ variant }) => (
  <section className={`lead-magnet-banner lead-magnet-banner--${variant}`}>
    <div className="lead-magnet-banner__content">
      <h3 className="lead-magnet-banner__title">
        Free Download: 50 AI Prompts That Actually Work
      </h3>
      <p className="lead-magnet-banner__subtitle">
        Practical prompts for business writing, research, and decision-making.
        The same frameworks I use with enterprise clients.
      </p>
      <EmailCapture source={`banner-${variant}`} />
    </div>
  </section>
);

LeadMagnetBanner.propTypes = {
  variant: PropTypes.oneOf(['homepage', 'blog', 'sidebar']),
};

LeadMagnetBanner.defaultProps = {
  variant: 'homepage',
};

export default LeadMagnetBanner;
