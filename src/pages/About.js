import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import testimonials from '../data/testimonials';
import TestimonialSection from '../components/Testimonials/TestimonialSection';

const About = () => (
  <Main
    title="About"
    description="About Sam Wong, the AI private tutor in Hong Kong"
    canonicalUrl={`${SITE_URL}/about`}
    ogTitle="About Sam Wong | AI Training Specialist"
    ogDescription="From ADHD diagnosis to training 10,000+ professionals in AI adoption. The story behind Adaptig and DotAI."
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/about`}
    ogType="profile"
    twitterTitle="About Sam Wong | AI Training Specialist"
    twitterDescription="Why I do this work and how I got here."
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/about` },
      { lang: 'zh-Hant', href: `${SITE_URL}/zh/about` },
      { lang: 'x-default', href: `${SITE_URL}/about` },
    ]}
  >
    <article className="post" id="about">
      {/* Dark hero */}
      <header className="page-hero">
        <div className="content-narrow">
          <div className="title">
            <h2>
              <Link to="/about">About Me</Link>
            </h2>
            <p>Why I do this work and how I got here.</p>
          </div>
        </div>
      </header>

      {/* Prose content */}
      <section className="section-base section-padding">
        <div className="content-narrow">
          <h3>Quick Version</h3>
          <p>
            I help people and organizations adopt AI in practical, human-first ways.
            My focus is not tool hype. It is real behavior change.
          </p>

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

          <h3>What Changed</h3>
          <p>
            AI did not just help me work better. It helped me think differently
            about work itself. I started building systems for clarity, not just
            efficiency, and saw the same patterns help teams far beyond my own context.
          </p>

          <h3>Career Path</h3>
          <p>
            I studied Public &amp; Comparative History at the Chinese University
            of Hong Kong, specializing in records management and knowledge systems.
            My career moved from Executive Assistant to the President of ThreeSixty
            Group (the company behind Sharper Image and FAO Schwarz) to AI Product
            Manager at RENPHO, where I built an AI division from scratch.
          </p>
          <p>
            In 2024, I left that stable role to start AICBO &mdash; free, one-on-one
            AI tutoring sessions for anyone who wanted to learn. What began as a small
            experiment became 150+ sessions and eventually led to co-founding Adaptig
            and joining DotAI as a founding member.
          </p>
          <p>
            I learned a simple truth: adoption is rarely a tool problem.
            It is a people problem. Skills matter, but psychological safety
            is what gets people to start.
          </p>
        </div>
      </section>

      {/* What I Believe — 2x2 card grid */}
      <section className="section-sunken section-padding">
        <div className="content-standard">
          <h3>What I Believe</h3>
          <div className="card-grid cols-2">
            <div className="card card-accent">
              <h4>Humans are the point.</h4>
              <p>AI is a tool. The goal is meaningful work.</p>
            </div>
            <div className="card card-accent">
              <h4>Start with the smallest step.</h4>
              <p>Small wins compound into real change.</p>
            </div>
            <div className="card card-accent">
              <h4>Psychological safety comes first.</h4>
              <p>People do not adopt what they fear.</p>
            </div>
            <div className="card card-accent">
              <h4>Frameworks beat features.</h4>
              <p>Tools change. Thinking patterns endure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Frameworks */}
      <section className="section-base section-padding">
        <div className="content-standard">
          <h3>Signature Frameworks</h3>
          <p>
            I create named, repeatable thinking patterns that make AI adoption
            feel concrete instead of abstract. A few examples:
          </p>
          <div className="card-grid cols-3">
            <div className="card card-accent">
              <h4>Traffic Light Framework</h4>
              <p>
                Red / Yellow / Green classification for AI task
                suitability. Helps teams quickly assess what to
                delegate, what to co-create, and what to keep human.
              </p>
            </div>
            <div className="card card-accent">
              <h4>IPA Framework</h4>
              <p>
                Input &rarr; Process &rarr; Audit. A three-step
                mental model for working with any AI tool safely
                and effectively.
              </p>
            </div>
            <div className="card card-accent">
              <h4>C-How Thinking</h4>
              <p>
                Bridges left-brain logic and right-brain creativity
                through structured prompting. Used in engineering
                and design workshops.
              </p>
            </div>
            <div className="card card-accent">
              <h4>AI Pioneer Program</h4>
              <p>
                A 6-session cohort model based on change management.
                Train 10-20 internal champions who drive adoption
                across the wider organization.
              </p>
            </div>
            <div className="card card-accent">
              <h4>70/30 Split</h4>
              <p>
                70% AI execution, 30% human judgment.
                A principle for delegating work to AI while
                keeping critical thinking with the human.
              </p>
            </div>
            <div className="card card-accent">
              <h4>AI Maturity Model</h4>
              <p>
                Four stages from Awareness to Transformation.
                Helps organizations diagnose where they are
                and what to do next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What I've Built */}
      <section className="section-sunken section-padding">
        <div className="content-narrow">
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
        </div>
      </section>

      {/* Testimonials band */}
      <section className="section-base section-padding">
        <div className="content-wide">
          <TestimonialSection
            title="What leaders say"
            subtitle="Voices from CEOs and founders I have worked with."
            testimonials={testimonials}
            limit={2}
          />
        </div>
      </section>

      {/* CTA band */}
      <section className="section-dark section-padding" style={{ textAlign: 'center' }}>
        <div className="content-standard">
          <h3>Why This Matters</h3>
          <p>
            What motivates me is the shift from &ldquo;AI is not for me&rdquo;
            to &ldquo;I can use this.&rdquo; We are in a major transition, and
            people who learn to think alongside AI while staying human will thrive.
          </p>
          <ul className="actions" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
            <li>
              <Link to="/services" className="button">
                See Service Options
              </Link>
            </li>
            <li>
              <Link to="/contact" className="button-secondary">
                Contact Me
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Who is Sam Wong?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sam Wong is an AI training specialist based in Hong Kong who has trained over 10,000 professionals across 70+ organizations. He co-founded Adaptig, a global AI trainer network, and is a founding member of DotAI, Hong Kong\'s practical AI training community. He focuses on practical, human-first AI adoption that changes behavior, not just builds awareness.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is Sam Wong\'s background?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sam Wong holds a Master of Arts in Public & Comparative History from the Chinese University of Hong Kong, specializing in records management and knowledge systems. His career moved from Executive Assistant to the President of ThreeSixty Group (Sharper Image / FAO Schwarz) to AI Product Manager at RENPHO, where he built an AI division from scratch. In 2024, he started AICBO — free 1-on-1 AI tutoring — which grew into 150+ coaching sessions and led to co-founding Adaptig and DotAI.',
                },
              },
              {
                '@type': 'Question',
                name: 'What organizations does Sam Wong work with?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sam Wong works with Adaptig (Animo Technology Limited), a global AI trainer network he co-founded spanning North America, Latin America, Europe, and Asia-Pacific, and DotAI, a Hong Kong-based AI training community. His enterprise clients include Bank of China (Hong Kong), Chow Tai Fook, Hong Kong Jockey Club, HSBC, Arup, PolyU, Mattel, Toyota, China Travel Service, and HKCT.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is Sam Wong\'s training approach?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sam Wong\'s approach is built on four principles: humans are the point (AI is a tool, the goal is meaningful work), start with the smallest step (small wins compound into real change), psychological safety comes first (people don\'t adopt what they fear), and frameworks beat features (tools change, thinking patterns endure). He emphasizes behavior change over tool training.',
                },
              },
            ],
          })}
        </script>
      </Helmet>

      <p style={{ fontSize: '0.85em', color: '#6b6777', marginTop: '2em' }}>
        <Link to="/zh/about">&#x4E2D;&#x6587;&#x7248;&#x672C;</Link>
      </p>
    </article>
  </Main>
);

export default About;
