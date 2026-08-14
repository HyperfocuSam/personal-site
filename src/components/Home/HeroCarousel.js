import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import OptimizedImage from '../Template/OptimizedImage';

const HeroCarousel = ({ slides, autoAdvanceMs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!isPaused && autoAdvanceMs > 0) {
      timerRef.current = setTimeout(() => {
        goToNext();
      }, autoAdvanceMs);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, isPaused, autoAdvanceMs]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  return (
    <div
      className="hero-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Workshop photos carousel"
      tabIndex={0}
    >
      <div className="hero-carousel__viewport">
        <div
          className="hero-carousel__slides"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.src} className="hero-carousel__slide">
              <OptimizedImage
                src={slide.src}
                alt={slide.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="hero-carousel__nav hero-carousel__nav--prev"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        <span aria-hidden="true">&larr;</span>
      </button>

      <button
        type="button"
        className="hero-carousel__nav hero-carousel__nav--next"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <span aria-hidden="true">&rarr;</span>
      </button>

      <div className="hero-carousel__dots" role="tablist">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className={`hero-carousel__dot ${index === currentIndex ? 'hero-carousel__dot--active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            role="tab"
            aria-selected={index === currentIndex}
          />
        ))}
      </div>

      <p className="hero-carousel__caption fn-stamp">
        {slides[currentIndex].caption}
      </p>
    </div>
  );
};

HeroCarousel.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
    }),
  ).isRequired,
  autoAdvanceMs: PropTypes.number,
};

HeroCarousel.defaultProps = {
  autoAdvanceMs: 6000,
};

export default HeroCarousel;
