import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a <picture> element with WebP source and original fallback.
 * Derives the WebP path by replacing the file extension.
 */
const OptimizedImage = ({
  src, alt, className, width, height, loading, fetchPriority, ...rest
}) => {
  const webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp');

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        {...rest}
      />
    </picture>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  loading: PropTypes.string,
  fetchPriority: PropTypes.string,
};

OptimizedImage.defaultProps = {
  className: undefined,
  width: undefined,
  height: undefined,
  loading: 'lazy',
  fetchPriority: undefined,
};

export default OptimizedImage;
