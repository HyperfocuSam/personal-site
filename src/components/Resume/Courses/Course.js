import React from 'react';
import PropTypes from 'prop-types';

const Course = ({ data }) => (
  <li className="course-container">
    {data.link ? (
      <a href={data.link} className="course-name">{data.title}</a>
    ) : (
      <span className="course-name">{data.title}</span>
    )}
  </li>
);

Course.propTypes = {
  data: PropTypes.shape({
    link: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Course;
