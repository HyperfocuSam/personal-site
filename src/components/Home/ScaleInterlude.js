import React from 'react';
import OptimizedImage from '../Template/OptimizedImage';

const ScaleInterlude = () => (
  <section className="scale-interlude full-bleed">
    <div className="scale-interlude__inner">
      <OptimizedImage
        src="/images/blog/hkct-ai-workshop.jpg"
        alt="HKCT staff day: 400 participants in packed auditorium"
        loading="lazy"
      />
      <p className="scale-interlude__caption fn-stamp">
        HKCT · one staff day → 400 participants → 24-month AI community
      </p>
    </div>
  </section>
);

export default ScaleInterlude;
