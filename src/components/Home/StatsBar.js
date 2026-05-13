import React from 'react';
import PropTypes from 'prop-types';

const stats = [
  {
    value: 9462, suffix: '+', label: 'Professionals Trained', primary: true, format: true,
  },
  { value: 170, suffix: '+', label: 'Workshops Delivered' },
  { value: 66, suffix: '+', label: 'Organizations Served' },
  { value: 12, suffix: '', label: 'Countries Reached' },
  {
    value: 7.9, suffix: '/10', label: 'Avg. Satisfaction', decimal: true,
  },
];

const formatValue = (value, format, decimal) => {
  if (decimal) return value.toFixed(1);
  if (format) return value.toLocaleString();
  return String(value);
};

const StatNumber = ({
  value, suffix, format, decimal,
}) => (
  <span>
    {formatValue(value, format, decimal)}
    {suffix}
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
      {stats.map((stat) => (
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
