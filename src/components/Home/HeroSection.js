import React from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../Template/OptimizedImage';

const HeroSection = () => (
  <section className="dark-hero full-bleed">
    <div className="dark-hero__inner content-wide">
      <div className="dark-hero__content">
        <p className="dark-hero__eyebrow">
          <span className="fn-stamp fn-stamp--verified">
            field notes · hong kong · 10,000+ trained since 2023
          </span>
        </p>
        <h1 className="dark-hero__headline">
          AI training that still sticks after Monday.
        </h1>
        <p className="dark-hero__subhead">
          I train the people who train AI. Workshops, cohorts, and train-the-trainer
          for Hong Kong and APAC teams that want real behavior change, not another demo.
        </p>
        <p className="dark-hero__who-line">
          <span className="fn-stamp">
            Book Sam via Adaptig · Co-Founder &amp; Director of Academy
          </span>
        </p>
        <div className="dark-hero__actions">
          <Link to="/book" className="dark-hero__cta dark-hero__cta--primary" data-cta="hero_book">
            {'Book a free call '}
            <span className="dark-hero__arrow">&rarr;</span>
          </Link>
          <Link to="/services" className="dark-hero__cta dark-hero__cta--secondary" data-cta="hero_services">
            See how I can help
          </Link>
        </div>
        <p className="dark-hero__proof">
          <span className="fn-stamp fn-stamp--muted">
            CTF: 5 go-to-market proposals in under 3 hours · Garden: 6 departments
            came back · HKCT: one staff day → 24-month AI community
          </span>
        </p>
      </div>
      <div className="dark-hero__photo">
        <OptimizedImage
          src="/images/home/workshop-corporate.jpg"
          alt="Corporate AI training workshop in Hong Kong"
          loading="eager"
        />
        <p className="dark-hero__photo-caption fn-stamp">hands-on workshop · hong kong</p>
      </div>
    </div>
  </section>
);

export default HeroSection;
