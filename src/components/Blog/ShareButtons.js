import React from 'react';
import PropTypes from 'prop-types';

const ShareButtons = ({ title, url }) => {
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareTitle = title || 'Check out this article';

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;

  return (
    <div className="share-buttons">
      <span className="share-buttons__label">Share:</span>
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="share-buttons__button share-buttons__button--linkedin"
        aria-label="Share on LinkedIn"
      >
        LinkedIn
      </a>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="share-buttons__button share-buttons__button--twitter"
        aria-label="Share on Twitter"
      >
        Twitter
      </a>
    </div>
  );
};

ShareButtons.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
};

ShareButtons.defaultProps = {
  title: '',
  url: '',
};

export default ShareButtons;
