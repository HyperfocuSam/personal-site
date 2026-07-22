import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TrainerRecruitmentBanner = ({ ctaHref }) => (
  <section className="trainer-banner">
    <h3>Like what you see? Teach this.</h3>
    <p>
      Adaptig is growing a global trainer network across 20+ countries.
      If you facilitate learning and want to lead practical AI workshops,
      we should talk.
    </p>
    <Link to={ctaHref} className="button">
      Apply to Join the Network
    </Link>
  </section>
);

TrainerRecruitmentBanner.propTypes = {
  ctaHref: PropTypes.string,
};

TrainerRecruitmentBanner.defaultProps = {
  ctaHref: '/contact?interest=trainer',
};

export default TrainerRecruitmentBanner;
