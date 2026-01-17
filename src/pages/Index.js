import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const Index = () => (
  <Main
    description={
      'Sam Wong - AI Training Specialist helping enterprises and individuals adopt AI. '
      + 'Co-founder of Adaptig, Founding member of DotAI. Corporate workshops, 1-1 coaching, '
      + 'Train-the-Trainer programs in Hong Kong.'
    }
  >
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2>
            <Link to="/">Welcome!</Link>
          </h2>
          <p>I help people and organizations thrive with AI.</p>
        </div>
      </header>

      <section className="hero-stats">
        <p>
          <strong>10,000+ professionals</strong> trained across Hong Kong and globally.
          <br />
          <strong>70+ enterprise clients</strong> including HSBC, Bank of China, Chow Tai Fook.
          <br />
          <strong>3 ventures</strong> driving AI adoption: DotAI, Adaptig, and Loopem.
        </p>
      </section>

      <h3>What I Do</h3>
      <ul>
        <li>
          <strong>Corporate AI Training</strong> - Helping enterprises build AI-capable
          teams through hands-on workshops and strategic implementation guidance.
        </li>
        <li>
          <strong>1-1 AI Coaching</strong> - Personalized learning journeys for
          professionals who want to leverage AI in their careers.
        </li>
        <li>
          <strong>Train-the-Trainer</strong> - Empowering facilitators to deliver
          AI workshops through the Adaptig methodology.
        </li>
      </ul>

      <h3>Current Ventures</h3>
      <p>
        <strong>
          <a href="https://dotai.hk" target="_blank" rel="noopener noreferrer">DotAI</a>
        </strong>
        {' '}- Founding member. Corporate AI training and community in Hong Kong.
      </p>
      <p>
        <strong>
          <a href="https://adaptig.ai" target="_blank" rel="noopener noreferrer">Adaptig</a>
        </strong>
        {' '}- Co-founder. Global AI workshop platform with trainer network across
        North America, Latin America, Europe, and Asia-Pacific.
      </p>
      <p>
        <strong>Loopem</strong> - Exploring AI product opportunities in mainland China.
      </p>

      <br />
      <p>
        Ready to explore how AI can transform your work or organization?{' '}
        <Link to="/contact">Let&apos;s talk</Link>.
      </p>

      <ul className="actions">
        <li>
          <Link to="/services" className="button">
            View Services
          </Link>
        </li>
        <li>
          <Link to="/about" className="button">
            Learn More About Me
          </Link>
        </li>
      </ul>
    </article>
  </Main>
);

export default Index;
