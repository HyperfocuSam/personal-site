import React from 'react';
import PropTypes from 'prop-types';

// Average reading speed: 200-250 words per minute
const WORDS_PER_MINUTE = 220;

/**
 * Calculate reading time from text content
 * @param {string} text - The text content to calculate reading time for
 * @returns {number} - Estimated reading time in minutes
 */
export const calculateReadingTime = (text) => {
  if (!text) return 1;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  return Math.max(1, minutes); // Minimum 1 minute
};

const ReadingTime = ({ text, className }) => {
  const minutes = calculateReadingTime(text);

  return (
    <span className={`reading-time ${className || ''}`}>
      {minutes} min read
    </span>
  );
};

ReadingTime.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

ReadingTime.defaultProps = {
  text: '',
  className: '',
};

export default ReadingTime;
