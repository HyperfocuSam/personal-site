import React from 'react';
import { Link } from 'react-router-dom';

const { PUBLIC_URL } = process.env;

const HeroSection = () => (
  <section className="home-hero full-bleed">
    <div className="home-hero__inner content-wide">
      <div className="home-hero__text">
        <p className="home-hero__greeting">Hey, I&rsquo;m Sam.</p>
        <h1>
          I help teams adopt AI
          <br />
          in ways that
          {' '}
          <em>actually stick.</em>
        </h1>
        <p className="home-hero__subtitle">
          Workshops, coaching, and trainer development for organizations
          that want real behavior change &mdash; not just another AI demo.
        </p>
        <div className="home-hero__actions">
          <Link to="/services" className="button">
            How I Can Help
          </Link>
          <Link to="/contact" className="button button--outline">
            Book a Conversation
          </Link>
        </div>
      </div>
      <div className="home-hero__photo">
        <img
          src={`${PUBLIC_URL}/images/Sam.png`}
          alt="Sam Wong"
          width={760}
          height={880}
          fetchPriority="high"
        />
      </div>
    </div>
  </section>
);

export default HeroSection;
