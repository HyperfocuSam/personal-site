import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

const stats = [
  {
    value: 10000, suffix: '+', label: 'Professionals Trained', primary: true, format: true,
  },
  { value: 180, suffix: '+', label: 'Workshops Delivered' },
  { value: 70, suffix: '+', label: 'Organizations Served' },
  { value: 13, suffix: '', label: 'Countries Reached' },
  {
    value: 9.2, suffix: '/10', label: 'Avg. Satisfaction', decimal: true,
  },
];

const AnimatedNumber = ({
  value, suffix, format, decimal,
}) => {
  const [display, setDisplay] = useState('0');
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out quart for natural deceleration
      const eased = 1 - ((1 - progress) ** 4);
      const current = eased * value;

      if (decimal) {
        setDisplay(current.toFixed(1));
      } else if (format) {
        setDisplay(Math.round(current).toLocaleString());
      } else {
        setDisplay(String(Math.round(current)));
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [value, format, decimal]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    // Skip animation if reduced motion
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) {
      if (decimal) {
        setDisplay(value.toFixed(1));
      } else if (format) {
        setDisplay(value.toLocaleString());
      } else {
        setDisplay(String(value));
      }
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate, value, format, decimal]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

AnimatedNumber.propTypes = {
  value: PropTypes.number.isRequired,
  suffix: PropTypes.string,
  format: PropTypes.bool,
  decimal: PropTypes.bool,
};

AnimatedNumber.defaultProps = {
  suffix: '',
  format: false,
  decimal: false,
};

const StatsBar = () => (
  <div className="stats-floating content-standard">
    <div className="stats-bar">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`stat-item${stat.primary ? ' stat-item--primary' : ''}`}
        >
          <span className="stat-item__number">
            <AnimatedNumber
              value={stat.value}
              suffix={stat.suffix}
              format={stat.format}
              decimal={stat.decimal}
            />
          </span>
          <span className="stat-item__label">{stat.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default StatsBar;
