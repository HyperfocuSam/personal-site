import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import OptimizedImage from '../Template/OptimizedImage';

const { PUBLIC_URL } = process.env;

const AuthorCard = ({ compact, language }) => {
  const zh = language === 'zh-Hant';
  return (
    <div className={`author-card ${compact ? 'author-card--compact' : ''}`}>
      <Link to={zh ? '/zh/about' : '/about'} className="author-card__image-link">
        <OptimizedImage
          src={`${PUBLIC_URL}/images/sam-portrait-2026-09.png`}
          alt="Sam Wong"
          className="author-card__image"
          width={760}
          height={880}
          loading="lazy"
        />
      </Link>
      <div className="author-card__info">
        <Link to={zh ? '/zh/about' : '/about'} className="author-card__name">
          Sam Wong
        </Link>
        {/* Single-expression text: adjacent text nodes break react-snap
            hydration (#418). Bio per language in one component (bilingual
            rule) — the zh blog rendered this card in English until
            2026-08-15. */}
        {!compact && (
          <p className="author-card__bio">
            {zh
              ? 'Adaptig 聯合創辦人兼學院總監。我教的是教 AI 的人——'
              : 'Co-Founder & Director of Academy at Adaptig. I train the people who train AI through '}
            <Link to={zh ? '/zh/services' : '/services'}>
              {zh ? '企業工作坊、一對一輔導與培訓師發展' : 'corporate workshops, coaching, and trainer development'}
            </Link>
            {zh ? '。駐香港。' : '. Based in Hong Kong.'}
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
};

AuthorCard.propTypes = {
  compact: PropTypes.bool,
  language: PropTypes.oneOf(['en', 'zh-Hant']),
};

AuthorCard.defaultProps = {
  compact: false,
  language: 'en',
};

export default AuthorCard;
