import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import testimonials from '../data/testimonials';
import TestimonialSection from '../components/Testimonials/TestimonialSection';

const About = () => (
  <Main title="About" description="About Sam Wong, the AI private tutor in Hong Kong">
    <article className="post markdown" id="about">
      <header>
        <div className="title">
          <h2>
            <Link to="/about">About Me</Link>
          </h2>
          <p>Why I do this work and how I got here.</p>
        </div>
      </header>

      <section>
        <h3>Quick Version</h3>
        <p>
          I help people and organizations adopt AI in practical, human-first ways.
          My focus is not tool hype. It is real behavior change.
        </p>
      </section>

      <section>
        <h3>How It Started</h3>
        <p>
          I grew up with ADHD but did not know it until my mid-20s.
          As a history graduate working as an executive assistant,
          I spent years feeling like I was constantly fighting my own brain.
        </p>
        <p>
          That changed when I found AI and automation. What started as tools
          to manage my own challenges became a mission to help other people
          discover what is possible when the right support meets the right tools.
        </p>
      </section>

      <section>
        <h3>What Changed</h3>
        <p>
          AI did not just help me work better. It helped me think differently
          about work itself. I started building systems for clarity, not just
          efficiency, and saw the same patterns help teams far beyond my own context.
        </p>
      </section>

      <section>
        <h3>Career Path</h3>
        <p>
          My career moved from Executive Assistant roles at FAO Schwarz and Sharper
          Image to AI Product Manager and AI Team Lead at RENPHO, where I built an
          AI division from scratch.
        </p>
        <p>
          I learned a simple truth: adoption is rarely a tool problem.
          It is a people problem. Skills matter, but psychological safety
          is what gets people to start.
        </p>
      </section>

      <section>
        <h3>What I Believe</h3>
        <p>
          <strong>Humans are the point.</strong>
          {' '}
          AI is a tool. The goal is meaningful work.
        </p>
        <p>
          <strong>Start with the smallest step.</strong>
          {' '}
          Small wins compound into real change.
        </p>
        <p>
          <strong>Psychological safety comes first.</strong>
          {' '}
          People do not adopt what they fear.
        </p>
        <p>
          <strong>Frameworks beat features.</strong>
          {' '}
          Tools change. Thinking patterns endure.
        </p>
      </section>

      <section>
        <h3>What I&apos;ve Built</h3>
        <ul>
          <li>
            <strong>
              <a href="https://adaptig.ai" target="_blank" rel="noopener noreferrer">Adaptig</a>
            </strong>
            {' '}
            - Co-founded global trainer network spanning North America,
            Latin America, Europe, and Asia-Pacific.
          </li>
          <li>
            <strong>
              <a href="https://dotai.hk" target="_blank" rel="noopener noreferrer">DotAI</a>
            </strong>
            {' '}
            - Founding member of Hong Kong&apos;s practical AI training community.
          </li>
          <li>
            <strong>AICBO</strong>
            {' '}
            - 150+ one-on-one coaching sessions with professionals across industries.
          </li>
          <li>
            <strong>RENPHO AI Division</strong>
            {' '}
            - Led strategic AI transformation and team capability building.
          </li>
          <li>
            <strong>PromptBox</strong>
            {' '}
            - Built internal LLM workflows for daily operations.
          </li>
          <li>
            <strong>Fooocus Traditional Chinese</strong>
            {' '}
            - Contributed translation for wider AI accessibility.
          </li>
        </ul>
        <p>
          You can still browse the full timeline in
          {' '}
          <Link to="/projects">Projects</Link>
          .
        </p>
      </section>

      <TestimonialSection
        title="What leaders say"
        subtitle="Voices from CEOs and founders I have worked with."
        testimonials={testimonials}
        limit={2}
      />

      <section>
        <h3>Why This Matters</h3>
        <p>
          What motivates me is the shift from &ldquo;AI is not for me&rdquo;
          to &ldquo;I can use this.&rdquo; We are in a major transition, and
          people who learn to think alongside AI while staying human will thrive.
        </p>
      </section>

      <ul className="actions">
        <li>
          <Link to="/services" className="button">
            See Service Options
          </Link>
        </li>
        <li>
          <Link to="/contact" className="button">
            Contact Me
          </Link>
        </li>
      </ul>
    </article>
  </Main>
);

export default About;
