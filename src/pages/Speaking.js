import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';

const topics = [
  {
    title: 'Practical AI Adoption for Teams',
    description:
      'Move beyond awareness into real daily usage. Teams leave with workflows they can apply the next morning.',
  },
  {
    title: 'The Human Side of AI Transformation',
    description:
      'Why adoption stalls at the people layer, not the technology layer. Psychological safety, change management, and building trust.',
  },
  {
    title: 'AI x Design Thinking',
    description:
      'A hackathon-style format that fuses creative problem-solving with AI prototyping. Participants build working solutions in a single session.',
  },
  {
    title: 'From Fear to Function: Leading AI Change',
    description:
      'For leaders navigating resistance. How to set the tone, model curiosity, and turn skeptics into champions.',
  },
  {
    title: 'Prompt Engineering for Business',
    description:
      'Beyond tricks and templates. A structured framework for getting reliable, high-quality output from any LLM.',
  },
  {
    title: 'Building Internal AI Champions',
    description:
      'The Pioneer Program model: train a small cohort deeply, then let them drive adoption across the wider organization.',
  },
];

const engagements = [
  {
    year: '2025',
    org: 'YPO Global Event',
    title: 'The 45 Minutes AI Show',
    description:
      'Interactive, demo-heavy keynote for YPO members and families at the Skirball Center, New York.',
    stat: null,
  },
  {
    year: '2024-25',
    org: 'Bank of China (Hong Kong)',
    title: 'Enterprise AI Training Program',
    description:
      'Comprehensive AI adoption training delivered across 51 sessions in 13 countries.',
    stat: '1,530 participants, 9.2/10 satisfaction',
  },
  {
    year: '2025',
    org: 'Chow Tai Fook',
    title: 'AI x Design Thinking Hackathon',
    description:
      'Three repeat engagements combining creative problem-solving with hands-on AI prototyping.',
    stat: '3 repeat engagements',
  },
  {
    year: '2025',
    org: 'HKEJ Master Class',
    title: 'Vibe Marketing & AI Employee Mindset',
    description:
      'Co-created with Hong Kong Economic Journal. Covered the shift from tool awareness to daily AI habit-building.',
    stat: null,
  },
  {
    year: '2025',
    org: 'Hong Kong 200 Leadership Workshop',
    title: 'AI for Emerging Leaders',
    description:
      'Workshop designed for Hong Kong\'s next generation of leaders, focusing on practical AI literacy.',
    stat: null,
  },
  {
    year: '2025',
    org: 'CTgoodjobs Future Leader Awards',
    title: 'Judge & Mentor',
    description:
      'Invited as judge and mentor, sharing AI entrepreneurship methods with award candidates.',
    stat: null,
  },
  {
    year: '2025',
    org: 'Arup University',
    title: 'AI Lunch & Learn Series',
    description:
      'Recurring sessions for engineering professionals on integrating AI into technical workflows.',
    stat: null,
  },
  {
    year: '2025',
    org: 'JoJo Ventures',
    title: 'Featured Speaker',
    description:
      'Spoke as Head of Corporate Training at DotAI and Co-Founder of Adaptig on practical AI adoption.',
    stat: null,
  },
];

const whatYouGet = [
  {
    title: 'Tailored Content',
    description:
      'Every session is built around your audience, industry, and goals. No generic slide decks.',
  },
  {
    title: 'Interactive Format',
    description:
      'Live demos, audience participation, and hands-on exercises. People leave having done something, not just heard something.',
  },
  {
    title: 'Practical Takeaways',
    description:
      'Frameworks, templates, and workflows participants can apply immediately. Not theory for theory\'s sake.',
  },
  {
    title: 'Professional Delivery',
    description:
      'Bilingual (English/Cantonese), adaptable to 30-minute keynotes or full-day workshops, in-person or virtual.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Speaking & Events | Sam Wong',
  url: `${SITE_URL}/speaking`,
  description:
    'Sam Wong delivers keynotes, panels, and workshops on practical AI adoption for corporate events, industry conferences, and private gatherings.',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: engagements.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Event',
        name: `${e.org} - ${e.title}`,
        description: e.description,
        organizer: { '@type': 'Organization', name: e.org },
        performer: { '@type': 'Person', name: 'Sam Wong', url: SITE_URL },
      },
    })),
  },
};

const Speaking = () => (
  <Main
    title="Speaking & Events"
    description="Sam Wong delivers keynotes, panels, and workshops on practical AI adoption. Past events include YPO, Bank of China, Chow Tai Fook, and Arup."
    canonicalUrl={`${SITE_URL}/speaking`}
    ogTitle="Speaking & Events | Sam Wong"
    ogDescription="Keynotes, panels, and workshops that shift how teams think about AI. Past events include YPO, Bank of China, and Chow Tai Fook."
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/speaking`}
    ogType="website"
    twitterTitle="Speaking & Events | Sam Wong"
    twitterDescription="Keynotes, panels, and workshops that shift how teams think about AI."
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/speaking` },
      { lang: 'x-default', href: `${SITE_URL}/speaking` },
    ]}
  >
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
    <article className="post" id="speaking">
      {/* Dark hero */}
      <header className="page-hero">
        <div className="content-standard">
          <div className="title">
            <h2>
              <Link to="/speaking">Speaking &amp; Events</Link>
            </h2>
            <p>Keynotes, panels, and workshops that shift how teams think about AI.</p>
          </div>
        </div>
      </header>

      {/* Photo band */}
      <div className="full-bleed photo-band">
        <img
          src="/images/home/ypo-stage-wide.jpg"
          alt="Sam Wong on stage at the YPO Global Event, Skirball Center, New York"
          width={1200}
          height={675}
          loading="lazy"
        />
      </div>

      {/* Speaking topics */}
      <section className="section-base section-padding">
        <div className="content-standard">
          <h3>What I Speak About</h3>
          <div className="card-grid cols-3">
            {topics.map((topic) => (
              <div key={topic.title} className="card card-accent">
                <h4>{topic.title}</h4>
                <p>{topic.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected engagements */}
      <section className="section-sunken section-padding">
        <div className="content-standard">
          <h3>Selected Engagements</h3>
          <div className="engagement-list">
            {engagements.map((e) => (
              <div key={`${e.org}-${e.title}`} className="engagement-item">
                <div className="engagement-item__left">
                  <span className="engagement-item__year">{e.year}</span>
                </div>
                <div className="engagement-item__right">
                  <h4 className="engagement-item__org">{e.org}</h4>
                  <p className="engagement-item__title">{e.title}</p>
                  <p className="engagement-item__desc">{e.description}</p>
                  {e.stat && (
                    <span className="engagement-item__stat">{e.stat}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What organizers get */}
      <section className="section-base section-padding">
        <div className="content-standard">
          <h3>What You Get</h3>
          <div className="card-grid cols-2">
            {whatYouGet.map((item) => (
              <div key={item.title} className="card">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="section-dark section-dark--centered section-padding">
        <div className="content-standard">
          <h3>Book Sam for Your Event</h3>
          <p>
            Available for keynotes, panel discussions, half-day workshops,
            and multi-session programs. In-person or virtual, English or Cantonese.
          </p>
          <ul className="actions">
            <li>
              <Link to="/media/kit" className="button">
                View Media Kit
              </Link>
            </li>
            <li>
              <Link to="/contact?interest=speaking" className="button-secondary">
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </article>
  </Main>
);

export default Speaking;
