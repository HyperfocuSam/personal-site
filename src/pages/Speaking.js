import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import OptimizedImage from '../components/Template/OptimizedImage';
import ScrollReveal from '../components/ScrollReveal';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import { topics, engagements, whatYouGet } from '../data/speaking';

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
    description="Hong Kong AI keynote speaker and workshop facilitator. Sam Wong delivers talks on practical AI adoption for enterprises. Past events include YPO, a major Hong Kong bank, a global technology company, MIIT, Chow Tai Fook, and Arup."
    canonicalUrl={`${SITE_URL}/speaking`}
    ogTitle="Speaking & Events | Sam Wong"
    ogDescription="Keynotes, panels, and workshops that shift how teams think about AI. Past events include YPO, a major Hong Kong bank, a global technology company, and MIIT."
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/speaking`}
    ogType="website"
    twitterTitle="Speaking & Events | Sam Wong"
    twitterDescription="Keynotes, panels, and workshops that shift how teams think about AI."
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/speaking` },
      { lang: 'zh-Hant', href: `${SITE_URL}/zh/speaking` },
      { lang: 'x-default', href: `${SITE_URL}/speaking` },
    ]}
  >
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
    <article className="post field-notes-content" id="speaking">
      {/* Dark hero */}
      <header className="page-hero">
        <div className="content-standard">
          <div className="title">
            <h1>Speaking &amp; Events</h1>
            <p>Keynotes, panels, and workshops that shift how teams think about AI.</p>
          </div>
        </div>
      </header>

      {/* Photo band */}
      <div className="full-bleed photo-band">
        <OptimizedImage
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
          <ScrollReveal variant="fade-up-long">
            <h3>What I Speak About</h3>
          </ScrollReveal>
          <ScrollReveal variant="fade-up-long" stagger={120}>
            <div className="card-grid cols-3">
              {topics.map((topic) => (
                <div key={topic.id} className="card card-accent fn-card">
                  <h4>{topic.title}</h4>
                  <p>{topic.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Selected engagements */}
      <section className="section-sunken section-padding">
        <div className="content-standard">
          <ScrollReveal variant="fade-up-long">
            <h3>Selected Engagements</h3>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" stagger={100}>
            <div className="engagement-list">
              {engagements.map((e) => (
                <div key={e.id} className="engagement-item fn-entry">
                  <div className="engagement-item__left">
                    <span className="engagement-item__year fn-stamp">{e.year}</span>
                  </div>
                  <div className="engagement-item__right">
                    <h4 className="engagement-item__org">{e.org}</h4>
                    <p className="engagement-item__title">{e.title}</p>
                    <p className="engagement-item__desc">{e.description}</p>
                    {e.stat && (
                      <span className="engagement-item__stat fn-stamp fn-stamp--verified">
                        {e.stat}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What organizers get */}
      <section className="section-base section-padding">
        <div className="content-standard">
          <ScrollReveal variant="fade-up-long">
            <h3>What You Get</h3>
          </ScrollReveal>
          <ScrollReveal variant="fade-up-long" stagger={120}>
            <div className="card-grid cols-2">
              {whatYouGet.map((item) => (
                <div key={item.id} className="card fn-card">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="section-dark section-dark--centered section-padding">
        <div className="content-standard">
          <ScrollReveal variant="fade-up">
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
                <Link to="/contact?interest=speaking" className="button-secondary" data-cta="speaking_contact">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </section>
    </article>
  </Main>
);

export default Speaking;
