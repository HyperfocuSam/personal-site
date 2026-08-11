import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => (
  <section className="dark-hero full-bleed">
    <div className="dark-hero__inner content-wide">
      {/* Sam's own tagline (2026-08-02) — his coinage after Arteta's
          "love for the game"; replaces the generic adoption promise. */}
      <h1 className="dark-hero__headline">
        Love for the
        <br />
        <em className="dark-hero__highlight fn-highlight">Adoption.</em>
      </h1>
      <p className="dark-hero__evidence">
        <span className="fn-stamp fn-stamp--verified">
          field notes · hong kong · since 2023 · 10,000+ trained
        </span>
      </p>
      {/* The entity sentence. Median homepage scroll depth is 5% of a 7,295px
          page — about 365px — so for most visitors the hero IS the website,
          and until now it never said who Sam is: "Sam Wong is" appeared zero
          times on the homepage, which is why AI engines cite him on branded
          queries only. Kept as its own <p> with a single text child; adjacent
          text nodes break react-snap hydration (#418). */}
      <p className="dark-hero__identity">
        Sam Wong is Co-Founder &amp; Director of Academy at Adaptig in Hong Kong.
        He trains the people who train AI.
      </p>
      <p className="dark-hero__subtitle">
        Workshops, coaching, and trainer development for organizations
        that want real behavior change &mdash; not just another AI demo.
        Based in Hong Kong, working across Asia-Pacific.
      </p>
      <div className="dark-hero__actions">
        {/* Single-expression text: adjacent text nodes break react-snap hydration (#418) */}
        <Link to="/services" className="dark-hero__cta" data-cta="hero_services">
          {'How I Can Help '}
          <span className="dark-hero__arrow">&rarr;</span>
        </Link>
        <Link to="/book" className="dark-hero__cta dark-hero__cta--secondary" data-cta="hero_book">
          Book a Free Call
        </Link>
      </div>
      {/* 2026-08-02 audit: the receipts are the best line on the site and sat
          800px down — a scoped strip now rides under the CTAs. Single JSX
          expression: adjacent text nodes break react-snap hydration (#418). */}
      <p className="dark-hero__receipts">
        <Link to="/case-notes">
          {'5 teams shipped go-to-market proposals in under 3 hours (CTF)'
            + ' · 6 departments came back (Garden)'
            + ' · one staff day became a 24-month AI community → the receipts'}
        </Link>
      </p>
    </div>
  </section>
);

export default HeroSection;
