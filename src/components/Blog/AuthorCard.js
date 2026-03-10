import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import OptimizedImage from '../Template/OptimizedImage';

const { PUBLIC_URL } = process.env;

const AuthorCard = ({ compact }) => (
  <div className={`author-card ${compact ? 'author-card--compact' : ''}`}>
    <Link to="/about" className="author-card__image-link">
      <OptimizedImage
        src={`${PUBLIC_URL}/images/Sam.png`}
        alt="Sam Wong - AI Training Specialist"
        className="author-card__image"
        width={760}
        height={880}
        loading="lazy"
      />
    </Link>
    <div className="author-card__info">
      <Link to="/about" className="author-card__name">
        Sam Wong
      </Link>
      {!compact && (
        <p className="author-card__bio">
          AI Training Specialist helping enterprises and individuals adopt AI.
          Co-founder of Adaptig. Founding member of DotAI.
        </p>
      )}
      <div className="author-card__links">
        <a
          href="https://www.linkedin.com/in/sam-ai-agent/"
          target="_blank"
          rel="noopener noreferrer"
          className="author-card__social"
          aria-label="LinkedIn"
        >
          LinkedIn
        </a>
        <span className="author-card__separator">|</span>
        <a
          href="https://twitter.com/hyperfocusam"
          target="_blank"
          rel="noopener noreferrer"
          className="author-card__social"
          aria-label="Twitter"
        >
          Twitter
        </a>
      </div>
    </div>
  </div>
);

AuthorCard.propTypes = {
  compact: PropTypes.bool,
};

AuthorCard.defaultProps = {
  compact: false,
};

export default AuthorCard;
