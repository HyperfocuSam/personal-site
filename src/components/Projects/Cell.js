import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import OptimizedImage from '../Template/OptimizedImage';

const Cell = ({ data }) => (
  <div className="cell-container">
    <article className="mini-post">
      {data.link ? (
        <a href={data.link} className="image">
          <OptimizedImage src={data.image} alt={data.title} />
        </a>
      ) : (
        <span className="image">
          <OptimizedImage src={data.image} alt={data.title} />
        </span>
      )}
      <header>
        <h3>
          {data.link ? (
            <a href={data.link}>{data.title}</a>
          ) : (
            <span>{data.title}</span>
          )}
        </h3>
        <time className="published">
          {dayjs(data.date).format('MMMM, YYYY')}
        </time>
      </header>
      <div className="description">
        <p>{data.desc}</p>
      </div>
    </article>
  </div>
);

Cell.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string,
    image: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
};

export default Cell;
