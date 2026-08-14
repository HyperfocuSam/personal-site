import React from 'react';
import PropTypes from 'prop-types';
import { stats } from '../../data/stats';

// All four are canonical (memory_sam_profile.md). "170+ Workshops" was
// dropped 2026-08-14 — no ruled workshop count exists, and the site carried
// three contradicting variants (170+/180+/230+).
const statsBarItems = [
  stats.professionalsTrained,
  stats.oneOnOnes,
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
          className={`stats-strip__item fn-receipt${stat.primary ? ' stats-strip__item--primary' : ''}`}
        >
          <span className="stats-strip__number fn-receipt__number">
            <StatNumber
              value={stat.value}
              suffix={stat.suffix}
              format={stat.format}
              decimal={stat.decimal}
            />
          </span>
          <span
            className="stats-strip__leader fn-receipt__leader"
            aria-hidden="true"
          />
          <span className="stats-strip__label fn-receipt__label">{stat.label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default StatsBar;
