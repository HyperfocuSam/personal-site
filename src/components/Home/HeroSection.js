import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => (
  <section className="dark-hero full-bleed">
    <div className="dark-hero__inner content-wide">
      <h1 className="dark-hero__headline">
        I Help Teams
        <br />
        Adopt AI That
        <br />
        <em className="dark-hero__highlight fn-highlight">Actually Sticks.</em>
      </h1>
      <p className="dark-hero__evidence">
        <span className="fn-stamp fn-stamp--verified">
          field notes · hong kong · since 2023 · 10,000+ trained
        </span>
      </p>
      <p className="dark-hero__subtitle">
        Workshops, coaching, and trainer development for organizations
        that want real behavior change &mdash; not just another AI demo.
        Based in Hong Kong, working across Asia-Pacific.
      </p>
      <div className="dark-hero__actions">
        {/* Single-expression text: adjacent text nodes break react-snap hydration (#418) */}
        <Link to="/services" className="dark-hero__cta">
          {'How I Can Help '}
          <span className="dark-hero__arrow">&rarr;</span>
        </Link>
        <Link to="/book" className="dark-hero__cta dark-hero__cta--secondary">
          Book a Free Call
        </Link>
      </div>
      {/* 2026-08-02 audit: the receipts are the best line on the site and sat
          800px down — a scoped strip now rides under the CTAs. Single JSX
          expression: adjacent text nodes break react-snap hydration (#418). */}
      <p className="dark-hero__receipts">
        <Link to="/case-notes">
          {'A major HK bank 9.2/10 (1,530 participants) · Garden 4.48/5 (n=29)'
            + ' · CTF: 5 teams shipped in under 3 hours → the receipts'}
        </Link>
      </p>
    </div>
  </section>
);

export default HeroSection;
