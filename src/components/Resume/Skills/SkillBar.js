import React from 'react';
import PropTypes from 'prop-types';

const SkillBar = ({ data }) => {
  const { competency, title } = data;

  const barStyle = {
    width: `${String(Math.min(100, Math.max((competency / 5.0) * 100.0, 0)))}%`,
  };

  return (
    <div className="skillbar clearfix">
      <div className="skillbar-title">
        <span>{title}</span>
      </div>
      <div className="skillbar-bar" style={barStyle} />
      {/* Single expression: adjacent text nodes break react-snap hydration (#418) */}
      <div className="skill-bar-percent">{`${competency} / 5`}</div>
    </div>
  );
};

SkillBar.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.arrayOf(PropTypes.string).isRequired,
    competency: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default SkillBar;
