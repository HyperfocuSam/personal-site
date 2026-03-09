import React from 'react';
import { Link } from 'react-router-dom';

const { PUBLIC_URL } = process.env;

const HeroSection = () => (
  <section className="home-hero hero-gradient full-bleed">
    <div className="home-hero__inner content-wide">
      <div className="home-hero__text">
        <h1>I help organizations adopt AI in ways that actually stick.</h1>
        <p className="home-hero__subtitle">
          Workshops, coaching, and trainer development that turn AI interest into real
          behavior change. Human-first, practical, and outcome-focused.
        </p>
        <div className="home-hero__actions">
          <Link to="/services" className="button">
            View Services
          </Link>
          <Link to="/contact" className="button-secondary">
            Book a Conversation
          </Link>
        </div>
      </div>
      <div className="home-hero__photo">
        <img
          src={`${PUBLIC_URL}/images/Sam.png`}
          alt="Sam Wong - AI Training Specialist"
        />
      </div>
    </div>
  </section>
);

export default HeroSection;
