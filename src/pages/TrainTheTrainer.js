/* eslint-disable react/jsx-curly-brace-presence --
   Text sitting next to an <a> or <Link> must stay inside a single JSX expression.
   Unwrapping it creates adjacent text nodes, react-snap merges them in the baked
   HTML, and hydration then fails with React #418 — the recurring bug documented in
   Footer.js and AuthorCard.js, which keep their strings wrapped for the same reason. */
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import ScrollReveal from '../components/ScrollReveal';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';

// The four fronts a workshop actually breaks on, from the Cohort #7 Preparation
// Toolkit session. Anchor line: "A workshop never fails on the AI."
const FRONTS = [
  {
    name: 'Access',
    breaks: 'Licences missing, SSO loops, the IP block nobody mentioned, quota hit mid-exercise.',
    fix: 'A pre-flight check run with the client’s IT before the date is confirmed, not the week before.',
  },
  {
    name: 'Tools',
    breaks: 'The tool updated overnight. The long prompt hangs. The feature you built the demo around moved.',
    fix: 'Teach the pattern, not the button. A demo that survives a UI change is a demo built on a workflow.',
  },
  {
    name: 'Room',
    breaks: 'Bandwidth dies at 30 laptops. Nobody can read the screen. People are standing.',
    fix: 'Design for the worst seat in the room, and carry an offline version of every exercise.',
  },
  {
    name: 'People',
    breaks: '"全都無" — nobody has the tool. Half the room has used AI for two years; half has never opened it.',
    fix: 'A first exercise that works at both ends of the range, so neither group switches off in minute four.',
  },
];

// The five outputs a certified trainer leaves every session with.
const FIELD_KIT = [
  ['Prompt pattern', 'A reusable shape, not a saved prompt — so it still works when the tool changes.'],
  ['Demo script', 'The exact run, including what you say when it fails live.'],
  ['Critique lens', 'How to judge whether an output is good, taught to the room rather than held by you.'],
  ['Participant exercise', 'Tied to work they did last week, not a toy scenario.'],
  ['Failure-recovery move', 'The thing you do at minute 12 when the licence does not work.'],
];

const FAQS = [
  {
    q: 'Who is this for?',
    a: 'Corporate trainers, L&D leads, consultants and educators who already teach — and now need to teach AI. It is not an introduction to AI. You should already be comfortable running a room.',
  },
  {
    q: 'What is the format?',
    a: 'Adaptig’s Train-the-Trainer runs as a cohort: twelve sessions across six weeks, twice weekly, delivered live across time zones. Cohort #7 ran with participants in Hong Kong and Germany. Between cohorts, the Trainer Academy meets weekly.',
  },
  {
    q: 'What do I get at the end?',
    a: 'Certification through Adaptig, the full material set that the trainers use in bank and enterprise rooms, and access to the trainer network. Every session ends with a survey and a structured handover to the next trainer — the same standard certified trainers are held to afterwards.',
  },
  {
    q: 'Can I run it under my own brand?',
    a: 'Yes. Alongside certification there is a licence model where a partner firm delivers under its own brand using the Adaptig curriculum. That is a commercial conversation — start with a call.',
  },
  {
    q: 'Do you deliver in Cantonese?',
    a: 'Yes. Sessions run in English, Cantonese or Mandarin. Adaptig delivers in 8 languages across 4 continents.',
  },
];

const TrainTheTrainer = () => (
  <Main
    title="AI Train-the-Trainer"
    description={
      'AI Train-the-Trainer in Hong Kong: certification for trainers, L&D leads and '
      + 'consultants who must teach AI, not just use it. Run by Adaptig.'
    }
    canonicalUrl={`${SITE_URL}/ai-train-the-trainer-hong-kong`}
    ogTitle="AI Train-the-Trainer, Hong Kong | Sam Wong"
    ogDescription="Certification for trainers who need to teach AI. Twelve sessions, six weeks, run by the Co-Founder & Director of Academy at Adaptig."
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/ai-train-the-trainer-hong-kong`}
    ogType="website"
    twitterTitle="AI Train-the-Trainer, Hong Kong | Sam Wong"
    twitterDescription="Certification for trainers who need to teach AI, not just use it."
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/ai-train-the-trainer-hong-kong` },
      { lang: 'x-default', href: `${SITE_URL}/ai-train-the-trainer-hong-kong` },
    ]}
  >
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'AI Train-the-Trainer Certification',
            description: 'Certification programme for corporate trainers, L&D leads, consultants and educators who need to teach AI. Twelve sessions across six weeks, delivered live.',
            provider: { '@type': 'Organization', name: 'Adaptig', url: 'https://adaptig.ai' },
            inLanguage: ['en', 'zh-Hant', 'zh-Hans'],
            teaches: ['Teaching generative AI to adults', 'Workshop facilitation for AI tools', 'AI demo design', 'Failure recovery in live training', 'AI adoption change management'],
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: ['online', 'onsite'],
              courseWorkload: 'PT24H',
              location: { '@type': 'Place', name: 'Hong Kong' },
              instructor: { '@id': 'https://hyperfocusam.com/#person' },
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          },
        ])}
      </script>
    </Helmet>

    <article className="post" id="ai-train-the-trainer">
      <header className="page-hero">
        <div className="content-standard">
          <div className="title">
            <h1><Link to="/ai-train-the-trainer-hong-kong">AI Train-the-Trainer</Link></h1>
            <p>I train the people who train AI.</p>
          </div>
        </div>
      </header>

      <section className="section-base section-padding">
        <div className="content-standard">
          <ScrollReveal variant="fade-up-long" stagger={90}>
            <p>
              {'Knowing how to use AI and being able to teach it are different skills. Most people who '
              + 'can do the first assume the second follows. It does not — and the gap shows up about '
              + 'twelve minutes into a room of thirty people whose licences do not work.'}
            </p>
            <p>
              {'This is the programme for trainers, L&D leads, consultants and educators who already '
              + 'know how to run a room and now have to teach AI in it. It is run through '}
              <a href="https://adaptig.ai" target="_blank" rel="noopener noreferrer">Adaptig</a>
              {', where I am Co-Founder & Director of Academy.'}
            </p>

            <h2>A workshop never fails on the AI</h2>
            <p>
              {'It fails on one of four fronts. Every one of these comes from a session that actually '
              + 'went wrong, in a real client room, to a real trainer.'}
            </p>
            <div className="ttt-fronts">
              {FRONTS.map((f) => (
                <div key={f.name} className="ttt-front">
                  <h3>{f.name}</h3>
                  <p><strong>{'Where it breaks: '}</strong>{f.breaks}</p>
                  <p><strong>{'What we teach: '}</strong>{f.fix}</p>
                </div>
              ))}
            </div>

            <h2>The five things you leave every session with</h2>
            <p>
              {'Preparation is a workflow, not a personality trait — five things, every time. '
              + 'Certified trainers build these for each session they deliver.'}
            </p>
            <ul>
              {FIELD_KIT.map(([name, what]) => (
                <li key={name}><strong>{`${name}. `}</strong>{what}</li>
              ))}
            </ul>

            <h2>How the cohort runs</h2>
            <p>
              {'Twelve sessions across six weeks, twice a week, live. Cohort #7 ran with participants '
              + 'split between Hong Kong and Germany, which is the normal shape — the trainer network '
              + 'spans multiple time zones and Adaptig delivers in 8 languages across 4 continents. '
              + 'Between cohorts, the Trainer Academy meets weekly and I own that session.'}
            </p>
            <p>
              {'Every session ends with a participant survey and a structured handover to the next '
              + 'trainer, covering group dynamics and what was actually covered. That is not '
              + 'administration — it is the standard you are certified against, and it is the reason '
              + 'a client gets the same workshop from any trainer in the network.'}
            </p>

            <h2>Where this comes from</h2>
            <p>
              {'Everything taught here has been run in front of a paying room first: 10,000+ '
              + 'professionals across 70+ organizations in 13 countries, plus 300 one-on-one coaching '
              + 'sessions. The material you get is the material I use. If a framework has not survived '
              + 'a bank floor, it is not in the programme.'}
            </p>
            <p>
              {'Read the case notes for what that looks like in practice: '}
              <Link to="/case-notes">case notes</Link>
              {', or the field notes on '}
              <Link to="/blog/ai-train-the-trainer-hong-kong">train-the-trainer in Hong Kong</Link>
              {'.'}
            </p>

            <h2>Frequently asked questions</h2>
            {FAQS.map((item) => (
              <div key={item.q} className="ttt-faq">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}

            <h2>Start a conversation</h2>
            <p>
              {'If you train people and want to teach AI properly — or you want to run this under '
              + 'your own brand — '}
              <Link to="/contact">get in touch</Link>
              {'. Tell me what you already teach and who you teach it to; that is enough to start.'}
            </p>
          </ScrollReveal>
        </div>
      </section>
    </article>
  </Main>
);

export default TrainTheTrainer;
