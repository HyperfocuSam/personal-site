import React from 'react';
import { Link } from 'react-router-dom';
import HeroCarousel from './HeroCarousel';

const carouselSlides = [
  {
    src: '/images/home/workshop-dotai-academy.jpg',
    alt: 'AI workshop with participants and laptops in Hong Kong',
    caption: 'workshop · hong kong',
  },
  {
    src: '/images/blog/ctf-workshop-2026.jpeg',
    alt: 'Chow Tai Fook AI workshop with team working on laptops',
    caption: 'chow tai fook · hong kong',
  },
  {
    src: '/images/blog/arup-ai-workshop.jpg',
    alt: 'Sam Wong presenting at Arup corporate AI training',
    caption: 'arup · hong kong',
  },
  {
    src: '/images/blog/hkct-ai-workshop.jpg',
    alt: 'HKCT auditorium workshop with packed audience',
    caption: 'hkct · hong kong',
  },
  {
    src: '/images/blog/creativity-workshop-la.jpg',
    alt: 'YPO Los Angeles workshop with 120 participants',
    caption: 'ypo · los angeles',
  },
];

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
          <Link to="/book/" className="dark-hero__cta dark-hero__cta--primary" data-cta="hero_book">
            {'Book a free call '}
            <span className="dark-hero__arrow">&rarr;</span>
          </Link>
          <Link to="/services/" className="dark-hero__cta dark-hero__cta--secondary" data-cta="hero_services">
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
        <HeroCarousel slides={carouselSlides} autoAdvanceMs={6000} />
      </div>
    </div>
  </section>
);

export default HeroSection;
