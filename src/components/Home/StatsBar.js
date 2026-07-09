import React from 'react';
import PropTypes from 'prop-types';
import { stats } from '../../data/stats';

const statsBarItems = [
  stats.professionalsTrained,
  stats.workshops,
  stats.organizations,
  stats.countries,
];

const formatValue = (value, format, decimal) => {
  if (decimal) return value.toFixed(1);
  if (format) return value.toLocaleString();
  return String(value);
};

// Value and suffix are joined into ONE string: sibling expressions render as
// adjacent text nodes, which breaks react-snap hydration (React #418).
const StatNumber = ({
  value, suffix, format, decimal,
}) => (
  <span>
    {`${formatValue(value, format, decimal)}${suffix}`}
  </span>
);

StatNumber.propTypes = {
  value: PropTypes.number.isRequired,
  suffix: PropTypes.string,
  format: PropTypes.bool,
  decimal: PropTypes.bool,
};

StatNumber.defaultProps = {
  suffix: '',
  format: false,
  decimal: false,
};

const StatsBar = () => (
  <section className="stats-strip full-bleed">
    <div className="stats-strip__inner content-wide">
      {statsBarItems.map((stat) => (
        <div
          key={stat.label}
          className={`stats-strip__item${stat.primary ? ' stats-strip__item--primary' : ''}`}
        >
          <span className="stats-strip__number">
            <StatNumber
              value={stat.value}
              suffix={stat.suffix}
              format={stat.format}
              decimal={stat.decimal}
            />
          </span>
          <span className="stats-strip__label">{stat.label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default StatsBar;
