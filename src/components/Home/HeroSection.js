import React from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../Template/OptimizedImage';

const { PUBLIC_URL } = process.env;

// Hero contract (Sam's rulings, 2026-08-14): the H1 is the claim — his own
// line, promoted from body text. One red per viewport: the Book CTA. The
// credential line replaces the old "field notes · since 2023" stamp (the date
// undercut him and the label read as a blog chip). Receipts moved to the
// ProofReceipt band below the stats — the hero makes the claim, the band
// proves it. Every text node is a single expression: adjacent text nodes
// break react-snap hydration (React #418).
const HeroSection = () => (
  <section className="dark-hero full-bleed">
    <div className="dark-hero__inner content-wide">
      <div className="dark-hero__copy">
        <h1 className="dark-hero__headline">
          I train the people who train AI.
        </h1>
        <p className="dark-hero__credential">
          Sam Wong · Co-Founder &amp; Director of Academy, Adaptig · Hong Kong
        </p>
        <p className="dark-hero__subtitle">
          Workshops, coaching, and trainer certification for organizations
          that want AI in daily use &mdash; weeks after the session ends.
        </p>
        <div className="dark-hero__actions">
          <Link to="/book" className="dark-hero__cta" data-cta="hero_book">
            Book a Free Call
          </Link>
          {/* Single-expression text: adjacent text nodes break hydration (#418) */}
          <Link to="/services" className="dark-hero__cta dark-hero__cta--secondary" data-cta="hero_services">
            {'See how I can help '}
            <span className="dark-hero__arrow">&rarr;</span>
          </Link>
        </div>
      </div>
      {/* Rendered unconditionally (hydration safety); CSS hides it below 980px.
          The cutout portrait is already preloaded in index.html. */}
      <div className="dark-hero__photo">
        <OptimizedImage
          src={`${PUBLIC_URL}/images/Sam.png`}
          alt="Sam Wong"
          width={380}
          height={440}
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </div>
  </section>
);

export default HeroSection;
