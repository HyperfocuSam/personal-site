import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';

const stats = [
  { number: '10,000+', label: 'Professionals Trained' },
  { number: '6', label: 'Sectors' },
  { number: '13', label: 'Countries Reached' },
  { number: '9.2/10', label: 'Avg. Satisfaction' },
];

const topics = [
  {
    title: 'Why 76% of people still don\'t pay for AI (and should)',
    desc: 'The competitive gap between AI users and non-users is widening. Most people who do pay aren\'t using the features they\'re paying for.',
  },
  {
    title: 'The AI maturity trap: Why most companies are stuck at Stage 1',
    desc: 'A 4-stage framework for enterprise AI adoption, and why tool training alone doesn\'t move organizations forward.',
  },
  {
    title: 'What training 3,000 professionals taught me about AI adoption',
    desc: 'Real patterns from working with BOCHK (1,500 people, 13 countries), Chow Tai Fook, HKJC, and others.',
  },
  {
    title: 'The hidden features in AI tools that most users never find',
    desc: 'Model selection, deep search, Gmail integration \u2014 the features that transform paid AI.',
  },
  {
    title: 'AI and attention: How AI tools can actually help focus',
    desc: 'Practical tools and frameworks for knowledge workers struggling with information overload.',
  },
];

const clients = [
  'Bank of China HK',
  'Chow Tai Fook',
  'Hong Kong Jockey Club',
  'Arup',
  'PolyU',
  'HKCT',
  'China Travel Service',
  'Mattel',
  'HSBC',
  'Toyota',
  'YPO',
];

const formats = [
  'Podcast interviews',
  'YouTube / livestream',
  'Panel discussions',
  'Conference keynotes',
];

const MediaKit = () => (
  <Main
    title="Media Kit"
    description="Speaker media kit for Sam Wong - AI Training Specialist based in Hong Kong. Available for keynotes, panels, podcasts, and livestreams."
    canonicalUrl={`${SITE_URL}/media/kit`}
    ogTitle="Media Kit | Sam Wong"
    ogDescription="Speaker media kit for Sam Wong, AI Training Specialist. 10,000+ professionals trained across 13 countries."
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/media/kit`}
    ogType="website"
    twitterTitle="Media Kit | Sam Wong"
    twitterDescription="Speaker media kit for Sam Wong, AI Training Specialist. 10,000+ professionals trained across 13 countries."
    twitterImage={DEFAULT_OG_IMAGE}
  >
    <article id="media-kit">
      {/* Hero */}
      <div className="media-kit-hero">
        <div className="media-kit-hero__inner">
          <img
            src="/images/Sam.png"
            alt="Sam Wong"
            className="media-kit-hero__image"
            width={150}
            height={150}
          />
          <h1 className="media-kit-hero__name">Sam Wong</h1>
          <p className="media-kit-hero__subtitle">AI Training Specialist | Hong Kong</p>
          <p className="media-kit-hero__tagline">AI adoption that sticks.</p>
          <div className="media-kit-hero__stats">
            {stats.map((item) => (
              <div key={item.label} className="media-kit-hero__stat">
                <span className="media-kit-hero__stat-number">{item.number}</span>
                <span className="media-kit-hero__stat-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="media-kit-section">
        <h2 className="media-kit-section__heading">Biography</h2>
        <hr className="media-kit-section__rule" />
        <div className="media-kit-bio">
          <div className="media-kit-bio__column">
            <span className="media-kit-bio__lang-label">English</span>
            <p>
              Sam Wong is an AI training specialist who has trained over 10,000
              professionals across banking, retail, education, and technology
              sectors. He designs and delivers corporate AI workshops through
              Adaptig (Animo Technology Limited), helping organizations move
              from AI curiosity to AI competency. His clients include Bank of
              China (Hong Kong), Chow Tai Fook, Hong Kong Jockey Club, Arup,
              and PolyU. Based in Hong Kong, Sam specializes in practical AI
              adoption that changes behavior, not just builds awareness.
            </p>
          </div>
          <div className="media-kit-bio__column">
            <span className="media-kit-bio__lang-label">中文</span>
            <p>
              Sam Wong
              是一位AI培訓專家，已為超過10,000名來自銀行、零售、教育及科技行業的專業人士提供培訓。他透過
              Adaptig（Animo Technology
              Limited）設計及執行企業AI工作坊，協助機構從AI好奇階段進入AI實戰能力階段。客戶包括中銀香港、周大福、香港賽馬會、Arup
              及理工大學。Sam
              駐港，專注於改變行為而非純粹提升認知的實用AI應用培訓。
            </p>
          </div>
        </div>
      </div>

      {/* Speaking Topics */}
      <div className="media-kit-section media-kit-section--warm">
        <h2 className="media-kit-section__heading">Speaking Topics</h2>
        <hr className="media-kit-section__rule" />
        <div className="media-kit-topics">
          {topics.map((topic, idx) => (
            <div key={topic.title} className="media-kit-topic">
              <span className="media-kit-topic__number">
                {`TOPIC ${String(idx + 1).padStart(2, '0')}`}
              </span>
              <h3 className="media-kit-topic__title">{topic.title}</h3>
              <p className="media-kit-topic__desc">{topic.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Social Proof */}
      <div className="media-kit-section">
        <h2 className="media-kit-section__heading">Social Proof &amp; Media</h2>
        <hr className="media-kit-section__rule" />

        <h3 className="media-kit-section__subheading">As Seen On</h3>
        <div>
          <div className="media-kit-media-item">
            <span className="media-kit-media-item__label">
              {'Club 80 \u6703\u516B\u5341 \u2014 Episode 012'}
            </span>
            <span className="media-kit-media-item__sub">
              64K+ views &mdash; &ldquo;How Can AI Save You?&rdquo;
            </span>
          </div>
          <div className="media-kit-media-item">
            <span className="media-kit-media-item__label">
              {'Club 80 \u6703\u516B\u5341 \u2014 Episode 024'}
            </span>
            <span className="media-kit-media-item__sub">
              34K+ views, 944+ likes, 1,300 concurrent viewers
            </span>
          </div>
          <div className="media-kit-media-item">
            <span className="media-kit-media-item__label">
              {'Club 80 \u6703\u516B\u5341 \u2014 Episode 049'}
            </span>
            <span className="media-kit-media-item__sub">Focus &amp; Productivity tools</span>
          </div>
        </div>

        <div className="media-kit-quote">
          <p className="media-kit-quote__text">
            {'\u300C\u6DCA\u4FC2\u5462\u500B\u76F4\u56DE\u7968\u50F9\uFF01\u300D'}
          </p>
          <p className="media-kit-quote__text">
            &ldquo;Just this alone is worth the ticket price!&rdquo;
          </p>
          <p className="media-kit-quote__attr">
            {'— Greg, Club 80 (\u6703\u516B\u5341) host'}
          </p>
        </div>

        <h3 className="media-kit-section__subheading">Select Clients</h3>
        <ul className="media-kit-clients">
          {clients.map((client) => (
            <li key={client} className="media-kit-clients__pill">{client}</li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div className="media-kit-section media-kit-section--dark">
        <h2 className="media-kit-section__heading">Contact &amp; Availability</h2>
        <hr className="media-kit-section__rule" />
        <div className="media-kit-contact">
          <div>
            <p className="media-kit-contact__label">Available Formats</p>
            <ul className="media-kit-formats">
              {formats.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>

            <p className="media-kit-contact__label media-kit-contact__label--spaced">Languages</p>
            <p className="media-kit-contact__value">English, Cantonese</p>

            <p className="media-kit-contact__label">Location</p>
            <p className="media-kit-contact__value">Hong Kong (in-person or remote)</p>
          </div>
          <div>
            <p className="media-kit-contact__label">Email</p>
            <p className="media-kit-contact__value">
              <a href="mailto:sam@adaptig.com" className="media-kit-contact__link">
                sam@adaptig.com
              </a>
            </p>

            <p className="media-kit-contact__label">LinkedIn</p>
            <p className="media-kit-contact__value">
              <a
                href="https://linkedin.com/in/sam-ai-agent/"
                target="_blank"
                rel="noopener noreferrer"
                className="media-kit-contact__link"
              >
                linkedin.com/in/sam-ai-agent
              </a>
            </p>

            <p className="media-kit-contact__label">Website</p>
            <p className="media-kit-contact__value">
              <a
                href="https://hyperfocusam.com"
                target="_blank"
                rel="noopener noreferrer"
                className="media-kit-contact__link"
              >
                hyperfocusam.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="media-kit-back print-hide">
        <Link to="/media">&larr; Back to Media</Link>
      </div>
    </article>
  </Main>
);

export default MediaKit;
