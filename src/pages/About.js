import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import OptimizedImage from '../components/Template/OptimizedImage';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import testimonials from '../data/testimonials';
import TestimonialSection from '../components/Testimonials/TestimonialSection';
import ScrollReveal from '../components/ScrollReveal';
import FaqSection from '../components/FaqSection/FaqSection';
import { aboutFaqs } from '../data/faqs';

const About = () => (
  <Main
    // 50 chars, deliberately over the 48-char threshold in Main.js so
    // titleTemplate drops the " | Sam Wong" suffix. It was "About", which
    // rendered as "About | Sam Wong" — 16 characters in the highest-value
    // entity slot on the site, on the page Google sends the second-most
    // people to (52 organic entries in 90 days, behind only "/").
    title="About Sam Wong — AI Train-the-Trainer in Hong Kong"
    description="Sam Wong is Co-Founder & Director of Academy at Adaptig, a Hong Kong-based AI train-the-trainer who has trained 10,000+ professionals across 70+ organizations. From ADHD diagnosis to building Adaptig."
    canonicalUrl={`${SITE_URL}/about`}
    ogTitle="About Sam Wong | Co-Founder & AI Train-the-Trainer"
    ogDescription="From ADHD diagnosis to training 10,000+ professionals in AI adoption. The story behind Adaptig."
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/about`}
    ogType="profile"
    twitterTitle="About Sam Wong | Co-Founder & AI Train-the-Trainer"
    twitterDescription="Why I do this work and how I got here."
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/about` },
      { lang: 'zh-Hant', href: `${SITE_URL}/zh/about` },
      { lang: 'x-default', href: `${SITE_URL}/about` },
    ]}
  >
    <article className="post field-notes-content" id="about">
      {/* Dark hero */}
      <header className="page-hero">
        <div className="content-narrow">
          <div className="title">
            {/* Was <h1><Link to="/about">About Me</Link></h1> — a heading that
                linked to the page it was already on, and named nobody. */}
            <h1>About Sam Wong</h1>
            <p>Why I do this work and how I got here.</p>
          </div>
        </div>
      </header>

      {/* Prose content */}
      <section className="section-base section-padding">
        <div className="content-narrow">
          {/* Readers reach a 90% median scroll here and then 82% leave without
              a second page — they read it closely, so the opening is the one
              place worth spending entity signal. It used to open "I help people
              and organizations adopt AI": first person, no name, no title, no
              company, no city. Third person for the summary, first person from
              "How It Started" on, same split that works in the homepage hero. */}
          <h2>Quick Version</h2>
          {/* ONE VOICE (Sam's ruling, 2026-08-15): visible prose stays first
              person; the entity signal keeps the name right here, and
              metadata/JSON-LD stay third person. */}
          <p>
            I&rsquo;m Sam Wong, Co-Founder &amp; Director of Academy at Adaptig, an AI
            train-the-trainer based in Hong Kong. I train the people who train
            AI &mdash; 10,000+ professionals across 70+ organizations in 13 countries.
          </p>
          <p>
            The focus is not tool hype. It is whether teams still use AI on real
            work weeks after the session &mdash; real behavior change.
          </p>
          {/* Sam's two institutional credentials, confirmed 2026-08-07 and
              approved for bios and collateral, appeared NOWHERE on this site
              until 2026-08-12 — HKPC and HKCT were named only as clients. They
              are the strongest third-party authority markers he holds, and the
              only ones a stranger can verify without taking his word for it.
              "Registered Speaker", never "Trainer" — the HKPC trainer claim is
              explicitly banned in memory_sam_profile.md. */}
          <p>
            I am a <strong>Registered Speaker</strong> with the Hong Kong
            Productivity Council and an <strong>Official Trainer Partner</strong> of
            the Hong Kong College of Technology.
          </p>

          <h2>How It Started</h2>
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

          <h2>What Changed</h2>
          <p>
            AI did not just help me work better. It helped me think differently
            about work itself. I started building systems for clarity, not just
            efficiency, and saw the same patterns help teams far beyond my own context.
          </p>

          <h2>Career Path</h2>
          <p>
            I studied Public &amp; Comparative History at the Chinese University
            of Hong Kong, specializing in records management and knowledge systems.
            My career moved from Executive Assistant to the President of ThreeSixty
            Group (the company behind Sharper Image and FAO Schwarz) to AI Product
            Manager at RENPHO, working on AI adoption and team capability.
          </p>
          <p>
            <span className="fn-stamp">In 2024</span>, I left that stable role
            to start AICBO &mdash; free, one-on-one
            AI tutoring sessions for anyone who wanted to learn. What began as a small
            experiment became 300 sessions and eventually led to co-founding Adaptig.
          </p>
          <p>
            I learned a simple truth: adoption is rarely a tool problem.
            It is a people problem. Skills matter, but psychological safety
            is what gets people to start.
          </p>
        </div>
      </section>

      {/* Photo: Sam on stage — DSLR quality */}
      <ScrollReveal variant="blur-in">
        <div className="full-bleed photo-band">
          <OptimizedImage
            src="/images/about/sam-stage-ypo.jpg"
            alt="Sam Wong presenting The 45 Mins AI Show on stage at the Skirball Center, YPO event"
            loading="lazy"
          />
        </div>
      </ScrollReveal>

      {/* What I Believe — 2x2 card grid */}
      <section className="section-sunken section-padding">
        <div className="content-standard">
          <ScrollReveal variant="fade-up-long">
            <h2>What I Believe</h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up-long" stagger={120}>
            <div className="card-grid cols-2">
              <div className="card card-accent fn-card">
                <h3>Humans are the point.</h3>
                <p>AI is a tool. The goal is meaningful work.</p>
              </div>
              <div className="card card-accent fn-card">
                <h3>Start with the smallest step.</h3>
                <p>Small wins compound into real change.</p>
              </div>
              <div className="card card-accent fn-card">
                <h3>Psychological safety comes first.</h3>
                <p>People do not adopt what they fear.</p>
              </div>
              <div className="card card-accent fn-card">
                <h3>Frameworks beat features.</h3>
                <p>Tools change. Thinking patterns endure.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Signature Frameworks */}
      <section className="section-base section-padding">
        <div className="content-standard">
          <ScrollReveal variant="fade-up-long">
            <h2>Signature Frameworks</h2>
            <p>
              I create named, repeatable thinking patterns that make AI adoption
              feel concrete instead of abstract. A few examples:
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up-long" stagger={120}>
            <div className="card-grid cols-3">
              <div className="card card-accent fn-card">
                <h3>Traffic Light Framework</h3>
                <p>
                  A data sensitivity framework for regulated industries.
                  Green (public info), Yellow (internal, strip identifiers),
                  Red (PII, full stop). Designed for instant decision-making.
                </p>
              </div>
              <div className="card card-accent fn-card">
                <h3>IPA Framework</h3>
                <p>
                  Input &rarr; Process &rarr; Audit. A three-step
                  mental model for working with any AI tool safely
                  and effectively.
                </p>
              </div>
              <div className="card card-accent fn-card">
                <h3>C-How Thinking</h3>
                <p>
                  Bridges left-brain logic and right-brain creativity
                  through structured prompting. Used in engineering
                  and design workshops.
                </p>
              </div>
              <div className="card card-accent fn-card">
                <h3>AI Pioneer Program</h3>
                <p>
                  A 6-session cohort model based on change management.
                  Train 10-20 internal champions who drive adoption
                  across the wider organization.
                </p>
              </div>
              <div className="card card-accent fn-card">
                <h3>70/30 Split</h3>
                <p>
                  30% AI execution, 70% human judgment.
                  A principle for delegating work to AI while
                  keeping critical thinking with the human.
                </p>
              </div>
              <div className="card card-accent fn-card">
                <h3>AI Maturity Model</h3>
                <p>
                  Four stages from Awareness to Transformation.
                  Helps organizations diagnose where they are
                  and what to do next.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What I've Built */}
      <section className="section-sunken section-padding">
        <div className="content-standard">
          <h2>What I&apos;ve Built</h2>
          <ul>
            <li className="fn-entry">
              <strong>
                <a href="https://adaptig.ai" target="_blank" rel="noopener noreferrer">Adaptig</a>
              </strong>
              {/* Single-expression text here and below: adjacent text nodes
                  break react-snap hydration (React #418) */}
              {' - Co-founded a global trainer network spanning North America, Latin America, Europe, and Asia-Pacific.'}
            </li>
            <li className="fn-entry">
              <strong>AICBO</strong>
              {' - 300 one-on-one coaching sessions with professionals across industries.'}
            </li>
            <li className="fn-entry">
              <strong>RENPHO</strong>
              {' - EA to CEO, then AI Product Manager: AI adoption and team capability building.'}
            </li>
            <li className="fn-entry">
              <strong>PromptBox</strong>
              {' - Built internal LLM workflows for daily operations.'}
            </li>
            <li className="fn-entry">
              <strong>AI Pioneer Program</strong>
              {' - A change management-driven model for building internal AI champions, now in second batch deployment.'}
            </li>
            <li className="fn-entry">
              <strong>Fooocus Traditional Chinese</strong>
              {' - Contributed translation for wider AI accessibility.'}
            </li>
          </ul>
          <ScrollReveal variant="blur-in">
            <div className="photo-grid cols-3">
              <OptimizedImage
                src="/images/about/workshop-audience-wide.jpg"
                alt="Adaptig AI workshop with participants at YPO Skirball Center"
                loading="lazy"
              />
              <OptimizedImage
                src="/images/blog/ctf-workshop-2026.jpeg"
                alt="Chow Tai Fook Design Thinking Workshop group"
                loading="lazy"
              />
              <OptimizedImage
                src="/images/about/participant-adaptig.jpg"
                alt="Workshop participant using the Adaptig platform during a hands-on exercise"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials band */}
      <section className="section-base section-padding">
        <div className="content-wide">
          <ScrollReveal variant="scale-in">
            <TestimonialSection
              title="What participants say"
              subtitle="Voices from the professionals I have trained and coached."
              testimonials={testimonials}
              limit={2}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA band */}
      <section className="section-dark section-dark--centered section-padding">
        <div className="content-standard">
          <ScrollReveal variant="fade-up">
            <h2>Why This Matters</h2>
            <p>
              What motivates me is the shift from &ldquo;AI is not for me&rdquo;
              to &ldquo;I can use this.&rdquo; We are in a major transition, and
              people who learn to think alongside AI while staying human will thrive.
            </p>
            {/* /about is the #2 organic landing page and readers reach a 90%
                median scroll, so they do see this band — and 82% still leave.
                Until now both options were another step: /services, then
                /contact. The calendar is now the primary action. */}
            <ul className="actions" style={{ marginTop: '1.5rem' }}>
              <li>
                <Link to="/book" className="button" data-cta="about_book">
                  Book a Free Call
                </Link>
              </li>
              <li>
                <Link to="/services" className="button-secondary" data-cta="about_services">
                  See Service Options
                </Link>
              </li>
            </ul>
            <p className="about-cta__quiet">
              <Link to="/contact" data-cta="about_contact">
                or send me a message &rarr;
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': 'https://hyperfocusam.com/#person',
            name: 'Sam Wong',
            alternateName: ['Samuel Wong', 'HyperfocuSam'],
            url: 'https://hyperfocusam.com/about',
            image: 'https://hyperfocusam.com/images/Sam.png',
            jobTitle: 'Co-Founder & Director of Academy',
            disambiguatingDescription: 'Hong Kong-based AI train-the-trainer and Co-Founder & Director of Academy at Adaptig — trains corporate trainers across Asia-Pacific.',
            worksFor: [
              { '@type': 'Organization', name: 'Adaptig', url: 'https://adaptig.ai' },
            ],
            alumniOf: {
              '@type': 'CollegeOrUniversity',
              name: 'The Chinese University of Hong Kong',
            },
            hasCredential: [{
              '@type': 'EducationalOccupationalCredential',
              credentialCategory: 'degree',
              educationalLevel: 'Master of Arts',
              about: 'Public & Comparative History (records management and knowledge systems)',
              recognizedBy: {
                '@type': 'CollegeOrUniversity',
                name: 'The Chinese University of Hong Kong',
              },
            }, {
              '@type': 'EducationalOccupationalCredential',
              credentialCategory: 'Registered Speaker',
              name: 'Registered Speaker, Hong Kong Productivity Council',
              recognizedBy: {
                '@type': 'Organization',
                name: 'Hong Kong Productivity Council',
                alternateName: 'HKPC',
                url: 'https://www.hkpc.org/',
              },
            }, {
              '@type': 'EducationalOccupationalCredential',
              credentialCategory: 'Official Trainer Partner',
              name: 'Official Trainer Partner, Hong Kong College of Technology',
              recognizedBy: {
                '@type': 'CollegeOrUniversity',
                name: 'Hong Kong College of Technology',
                alternateName: 'HKCT',
                url: 'https://www.hkct.edu.hk/',
              },
            }],
            hasOccupation: {
              '@type': 'Occupation',
              name: 'AI Train-the-Trainer & Corporate AI Trainer',
              occupationLocation: { '@type': 'City', name: 'Hong Kong' },
              skills: 'Generative AI adoption, Microsoft Copilot training, ChatGPT for enterprise, AI workshop facilitation, change management, Train-the-Trainer programs, prompt engineering, behavior change',
            },
            knowsAbout: [
              'Generative AI', 'ChatGPT', 'Microsoft Copilot', 'AI adoption',
              'Corporate training', 'Change management', 'Workshop facilitation',
              'Train-the-Trainer', 'Prompt engineering', 'Behavior change',
              'Traffic Light Protocol', 'AI Pioneer Model', 'AI Maturity Model',
              'ACE Framework', 'C-How Thinking', '70/30 Human-AI Split',
            ],
            knowsLanguage: ['English', 'Cantonese', 'Mandarin'],
            sameAs: [
              'https://www.linkedin.com/in/sam-ai-agent/',
              'https://x.com/HyperfocuSam',
              'https://github.com/HyperfocuSam',
              'https://www.threads.net/@sam_ai_cbo',
              'https://www.instagram.com/sam_ai_cbo/',
            ],
            description: 'Co-Founder & Director of Academy at Adaptig. Sam Wong trains the people who train AI — 10,000+ professionals across 70+ organizations in 13 countries on practical AI adoption that changes behavior.',
          })}
        </script>

      </Helmet>

      <FaqSection
        faqs={aboutFaqs}
        id="about-faq"
        title="Frequently asked questions"
        path="/about/"
      />

      <p className="lang-toggle">
        <Link to="/zh/about">&#x4E2D;&#x6587;&#x7248;&#x672C;</Link>
      </p>
    </article>
  </Main>
);

export default About;
