import React from 'react';

const stats = [
  { number: '10,000+', label: 'Professionals Trained', primary: true },
  { number: '180+', label: 'Workshops Delivered' },
  { number: '70+', label: 'Organizations Served' },
  { number: '13', label: 'Countries Reached' },
  { number: '9.2/10', label: 'Avg. Satisfaction' },
];

const StatsBar = () => (
  <div className="stats-floating content-standard">
    <div className="stats-bar">
      {stats.map((stat) => (
        <div key={stat.label} className={`stat-item${stat.primary ? ' stat-item--primary' : ''}`}>
          <span className="stat-item__number">{stat.number}</span>
          <span className="stat-item__label">{stat.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default StatsBar;
