import React from 'react';
import PropTypes from 'prop-types';

const Cell = ({ data }) => (
  <article className="project-card">
    <div className="project-card__content">
      <div className="project-card__header">
        <h3>{data.title}</h3>
        {data.status === 'live' && (
          <span className="project-card__status">
            <span className="project-card__status-dot" />
            LIVE
          </span>
        )}
      </div>
      <p className="project-card__role">{data.role}</p>
      <p className="project-card__desc">{data.desc}</p>
      {data.tech && data.tech.length > 0 && (
        <div className="project-card__tech">
          {data.tech.map((tag) => (
            <span key={tag} className="project-card__tech-tag">{tag}</span>
          ))}
        </div>
      )}
      {data.link && (
        <a
          href={data.link}
          className="project-card__url"
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.url}
          <span>&nbsp;&rarr;</span>
        </a>
      )}
    </div>
  </article>
);

Cell.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    url: PropTypes.string,
    link: PropTypes.string,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    tech: PropTypes.arrayOf(PropTypes.string),
    desc: PropTypes.string.isRequired,
  }).isRequired,
};

export default Cell;
