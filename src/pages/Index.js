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
      'Sam Wong - AI trainer and coach helping people discover what\'s possible with AI. '
      + 'From ADHD brain to AI mission. Co-founder of Adaptig, Founding member of DotAI. '
      + 'Human-first approach to AI adoption.'
    }
  >
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2>
            <Link to="/">Hey there.</Link>
          </h2>
          <p>
            I didn&apos;t set out to teach AI. I discovered it while figuring out how to
            manage my ADHD brain&mdash;and what started as a personal solution became a
            mission to help others.
          </p>
        </div>
      </header>

      <section className="hero-stats">
        <p>
          <strong>10,000+ people</strong> who&apos;ve gone from skeptical to curious.
          <br />
          <strong>70+ organizations</strong> that chose practical over hype.
          <br />
          <strong>3 ventures</strong> built on one belief: humans come first.
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
        Not teaching tools. Helping people discover what&apos;s possible.
      </p>
      <ul>
        <li>
          <strong>Run workshops</strong> where skeptics become curious and the curious
          become confident. The goal isn&apos;t mastering ChatGPT&mdash;it&apos;s finding
          what AI makes possible for <em>you</em>.
        </li>
        <li>
          <strong>Coach individuals</strong> through their own AI journeys. Not a
          curriculum, but a conversation. We start with your actual work, not hypothetical
          use cases.
        </li>
        <li>
          <strong>Train trainers</strong> who want to bring this to their own organizations.
          The Adaptig approach: psychological safety first, then practical skills.
        </li>
      </ul>

      <FeaturedCaseStudies limit={3} tag="case-study" />

      <h3>Where I Work</h3>
      <p>
        <strong>
          <a href="https://adaptig.ai" target="_blank" rel="noopener noreferrer">Adaptig</a>
        </strong>
        {' '}&mdash; A global trainer network I co-founded. We help organizations like
        Mattel, Toyota, and YPO go from unsure to unstoppable with AI they actually use.
      </p>
      <p>
        <strong>
          <a href="https://dotai.hk" target="_blank" rel="noopener noreferrer">DotAI</a>
        </strong>
        {' '}&mdash; Hong Kong&apos;s practical AI training community. HSBC, Bank of China,
        Chow Tai Fook, and others chose us because we focus on adoption, not just awareness.
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
            See How I Work
          </Link>
        </li>
        <li>
          <Link to="/contact" className="button">
            Start a Conversation
          </Link>
        </li>
      </ul>
    </article>
  </Main>
);

export default Index;
