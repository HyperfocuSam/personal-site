import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import testimonials from '../data/testimonials';
import TestimonialSection from '../components/Testimonials/TestimonialSection';
import FeaturedCaseStudies from '../components/Home/FeaturedCaseStudies';
import RevenuePathCTA from '../components/Home/RevenuePathCTA';
import EmailCapture from '../components/EmailCapture/EmailCapture';

const Index = () => (
  <Main
    description={
      'Sam Wong helps teams and professionals adopt AI with confidence through workshops, '
      + 'coaching, and trainer development. Human-first, practical, and outcome-focused.'
    }
  >
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2>
            <Link to="/">Hey there.</Link>
          </h2>
          <p>
            I help organizations and professionals adopt AI in ways that actually stick.
            If you are exploring training, coaching, or trainer development, you are in
            the right place.
          </p>
        </div>
      </header>

      <section className="hero-stats">
        <p>
          <strong>10,000+ people</strong> trained across workshops and programs.
          <br />
          <strong>70+ organizations</strong> supported with practical AI adoption.
          <br />
          <strong>150+ one-on-one sessions</strong> delivered for professionals.
        </p>
      </section>

      <TestimonialSection
        title="Trusted by leaders"
        subtitle="From executive teams to founders and emerging leaders."
        testimonials={testimonials}
        limit={1}
        featured
      />

      <h3>What I Actually Do</h3>
      <p>
        Three ways I help people make AI useful in real work:
      </p>
      <ul>
        <li>
          <strong>Workshops for organizations:</strong>
          {' '}
          Align teams, lower fear, and build practical skills tied to daily workflows.
        </li>
        <li>
          <strong>One-on-one coaching:</strong>
          {' '}
          Personalized sessions focused on your projects, your role, and your goals.
        </li>
        <li>
          <strong>Train-the-trainer programs:</strong>
          {' '}
          Equip facilitators to teach AI confidently with the Adaptig methodology.
        </li>
      </ul>

      <FeaturedCaseStudies limit={3} tag="case-study" />

      <h3>Where I Work</h3>
      <p>
        <strong>
          <a href="https://adaptig.ai" target="_blank" rel="noopener noreferrer">Adaptig</a>
        </strong>
        {' '}&mdash; Global trainer network and workshops for enterprise AI adoption.
      </p>
      <p>
        <strong>
          <a href="https://dotai.hk" target="_blank" rel="noopener noreferrer">DotAI</a>
        </strong>
        {' '}&mdash; Hong Kong AI training community serving clients including HSBC,
        Bank of China, and Chow Tai Fook.
      </p>

      <RevenuePathCTA />

      <EmailCapture
        source="homepage"
        title="Stay in the loop"
        blurb="Occasional insights on AI adoption. No spam, no hype."
      />

      <ul className="actions">
        <li>
          <Link to="/services" className="button">
            View Services
          </Link>
        </li>
        <li>
          <Link to="/contact" className="button">
            Book a Discovery Conversation
          </Link>
        </li>
      </ul>
    </article>
  </Main>
);

export default Index;
