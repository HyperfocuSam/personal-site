import React, {
  useEffect, useRef, useState, Children,
} from 'react';
import PropTypes from 'prop-types';

const ScrollReveal = ({
  children,
  variant,
  delay,
  stagger,
  threshold,
  className,
  as: Tag,
  once,
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const style = delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  // If stagger is set, wrap each child with incremental delays
  let content = children;
  if (stagger > 0 && isVisible) {
    let idx = 0;
    content = Children.map(children, (child) => {
      if (!child || typeof child !== 'object') return child;
      const childDelay = delay + (idx * stagger);
      idx += 1;
      return (
        <div
          key={child.key || idx}
          className={`sr-child sr-${variant} sr-visible`}
          style={{ transitionDelay: `${childDelay}ms` }}
        >
          {child}
        </div>
      );
    });
  }

  const classes = [
    'sr',
    `sr-${variant}`,
    isVisible ? 'sr-visible' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag ref={ref} className={classes} style={style}>
      {content}
    </Tag>
  );
};

ScrollReveal.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  delay: PropTypes.number,
  stagger: PropTypes.number,
  threshold: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  className: PropTypes.string,
  as: PropTypes.string,
  once: PropTypes.bool,
};

ScrollReveal.defaultProps = {
  variant: 'fade-up',
  delay: 0,
  stagger: 0,
  threshold: 0,
  className: '',
  as: 'div',
  once: true,
};

export default ScrollReveal;
