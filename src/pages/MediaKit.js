import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';

const NAVY = '#1a1f36';
const GOLD = '#d4a843';
const LIGHT_BG = '#f8f9fa';
const TEXT_DARK = '#1a1f36';
const TEXT_MID = '#4a4a5a';
const TEXT_LIGHT = '#6b7280';

const s = {
  hero: {
    background: `linear-gradient(135deg, ${NAVY} 0%, #2d3561 100%)`,
    padding: '4em 2em',
    textAlign: 'center',
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  heroInner: {
    maxWidth: '800px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  heroImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: `4px solid ${GOLD}`,
    marginBottom: '1.5em',
  },
  heroName: {
    fontSize: '2.8em',
    fontWeight: 800,
    margin: 0,
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    color: '#fff',
  },
  heroSubtitle: {
    fontSize: '1.1em',
    fontWeight: 400,
    color: 'rgba(255,255,255,0.7)',
    marginTop: '0.5em',
    marginBottom: '0.75em',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  heroTagline: {
    fontSize: '1.4em',
    fontWeight: 300,
    fontStyle: 'italic',
    color: GOLD,
    marginTop: '0.25em',
    marginBottom: '2em',
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2.5em',
    flexWrap: 'wrap',
  },
  statItem: {
    textAlign: 'center',
    minWidth: '100px',
  },
  statNumber: {
    display: 'block',
    fontSize: '2.2em',
    fontWeight: 800,
    color: GOLD,
    lineHeight: 1,
  },
  statLabel: {
    display: 'block',
    fontSize: '0.8em',
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginTop: '0.35em',
  },
  section: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '3.5em 2em',
  },
  sectionHeading: {
    fontSize: '1.6em',
    fontWeight: 700,
    color: TEXT_DARK,
    marginBottom: '0.25em',
    letterSpacing: '-0.01em',
  },
  sectionRule: {
    width: '50px',
    height: '3px',
    background: GOLD,
    border: 'none',
    margin: '0.5em 0 2em 0',
  },
  bioGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3em',
  },
  bioColumn: {
    fontSize: '0.95em',
    lineHeight: 1.75,
    color: TEXT_MID,
  },
  bioLangLabel: {
    display: 'inline-block',
    fontSize: '0.7em',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: GOLD,
    marginBottom: '0.75em',
    borderBottom: `2px solid ${GOLD}`,
    paddingBottom: '0.25em',
  },
  topicGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5em',
  },
  topicCard: {
    background: '#fff',
    border: '1px solid #e8e8ee',
    borderRadius: '8px',
    padding: '1.75em',
    transition: 'box-shadow 0.2s ease',
  },
  topicNumber: {
    display: 'inline-block',
    fontSize: '0.7em',
    fontWeight: 800,
    color: GOLD,
    background: 'rgba(212,168,67,0.1)',
    borderRadius: '4px',
    padding: '0.3em 0.6em',
    marginBottom: '0.75em',
    letterSpacing: '0.05em',
  },
  topicTitle: {
    fontSize: '1.05em',
    fontWeight: 700,
    color: TEXT_DARK,
    marginBottom: '0.6em',
    lineHeight: 1.35,
  },
  topicDesc: {
    fontSize: '0.88em',
    color: TEXT_LIGHT,
    lineHeight: 1.65,
    margin: 0,
  },
  proofSection: {
    background: LIGHT_BG,
  },
  pullQuote: {
    borderLeft: `4px solid ${GOLD}`,
    padding: '1em 1.5em',
    margin: '2em 0',
    background: '#fff',
    borderRadius: '0 8px 8px 0',
  },
  pullQuoteText: {
    fontSize: '1.2em',
    fontStyle: 'italic',
    color: TEXT_DARK,
    margin: 0,
    lineHeight: 1.5,
  },
  pullQuoteAttr: {
    fontSize: '0.85em',
    color: TEXT_LIGHT,
    marginTop: '0.5em',
  },
  clientList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.6em',
    listStyle: 'none',
    padding: 0,
    margin: '1.5em 0',
  },
  clientPill: {
    display: 'inline-block',
    fontSize: '0.82em',
    fontWeight: 600,
    color: TEXT_DARK,
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '20px',
    padding: '0.4em 1em',
  },
  mediaItem: {
    marginBottom: '1em',
  },
  mediaLabel: {
    fontWeight: 700,
    color: TEXT_DARK,
    fontSize: '0.95em',
  },
  mediaSub: {
    fontSize: '0.85em',
    color: TEXT_LIGHT,
    marginLeft: '0.5em',
  },
  contactSection: {
    background: `linear-gradient(135deg, ${NAVY} 0%, #2d3561 100%)`,
    color: '#fff',
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2.5em',
  },
  contactLabel: {
    fontSize: '0.75em',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '0.3em',
  },
  contactValue: {
    fontSize: '0.95em',
    color: '#fff',
    marginBottom: '1.25em',
  },
  contactLink: {
    color: GOLD,
    textDecoration: 'none',
  },
  formatList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  formatItem: {
    padding: '0.3em 0',
    fontSize: '0.95em',
    color: '#fff',
  },
  printBtn: {
    display: 'inline-block',
    padding: '0.75em 2em',
    background: GOLD,
    color: NAVY,
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.9em',
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '0.03em',
    marginTop: '1em',
  },
};

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
      <div className="media-kit-hero media-kit-section" style={s.hero}>
        <div style={s.heroInner}>
          <img
            src="/images/Sam.png"
            alt="Sam Wong"
            style={s.heroImage}
          />
          <h1 style={s.heroName}>Sam Wong</h1>
          <p style={s.heroSubtitle}>AI Training Specialist | Hong Kong</p>
          <p style={s.heroTagline}>AI adoption that sticks.</p>
          <div style={s.statsRow}>
            {stats.map((item) => (
              <div key={item.label} style={s.statItem}>
                <span style={s.statNumber}>{item.number}</span>
                <span style={s.statLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="media-kit-section" style={s.section}>
        <h2 style={s.sectionHeading}>Biography</h2>
        <hr style={s.sectionRule} />
        <div
          className="bio-grid"
          style={s.bioGrid}
        >
          <div style={s.bioColumn}>
            <span style={s.bioLangLabel}>English</span>
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
          <div style={s.bioColumn}>
            <span style={s.bioLangLabel}>中文</span>
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
      <div
        className="media-kit-section"
        style={{ ...s.section, background: LIGHT_BG }}
      >
        <h2 style={s.sectionHeading}>Speaking Topics</h2>
        <hr style={s.sectionRule} />
        <div style={s.topicGrid}>
          {topics.map((topic, idx) => (
            <div
              key={topic.title}
              className="topic-card"
              style={s.topicCard}
            >
              <span style={s.topicNumber}>
                {`TOPIC ${String(idx + 1).padStart(2, '0')}`}
              </span>
              <h3 style={s.topicTitle}>{topic.title}</h3>
              <p style={s.topicDesc}>{topic.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Social Proof */}
      <div className="media-kit-section" style={s.section}>
        <h2 style={s.sectionHeading}>Social Proof &amp; Media</h2>
        <hr style={s.sectionRule} />

        <h3 style={{ fontSize: '1.1em', fontWeight: 700, color: TEXT_DARK }}>
          As Seen On
        </h3>
        <div style={{ marginBottom: '1.5em' }}>
          <div style={s.mediaItem}>
            <span style={s.mediaLabel}>
              {'Club 80 \u6703\u516B\u5341 \u2014 Episode 012'}
            </span>
            <span style={s.mediaSub}>
              64K+ views &mdash; &ldquo;How Can AI Save You?&rdquo;
            </span>
          </div>
          <div style={s.mediaItem}>
            <span style={s.mediaLabel}>
              {'Club 80 \u6703\u516B\u5341 \u2014 Episode 024'}
            </span>
            <span style={s.mediaSub}>
              34K+ views, 944+ likes, 1,300 concurrent viewers
            </span>
          </div>
          <div style={s.mediaItem}>
            <span style={s.mediaLabel}>
              {'Club 80 \u6703\u516B\u5341 \u2014 Episode 049'}
            </span>
            <span style={s.mediaSub}>Focus &amp; Productivity tools</span>
          </div>
        </div>

        <div style={s.pullQuote}>
          <p style={s.pullQuoteText}>
            {'\u300C\u6DCA\u4FC2\u5462\u500B\u76F4\u56DE\u7968\u50F9\uFF01\u300D'}
          </p>
          <p style={s.pullQuoteText}>
            &ldquo;Just this alone is worth the ticket price!&rdquo;
          </p>
          <p style={s.pullQuoteAttr}>
            {'— Greg, Club 80 (\u6703\u516B\u5341) host'}
          </p>
        </div>

        <h3
          style={{
            fontSize: '1.1em',
            fontWeight: 700,
            color: TEXT_DARK,
            marginTop: '2em',
          }}
        >
          Select Clients
        </h3>
        <ul style={s.clientList}>
          {clients.map((client) => (
            <li key={client} style={s.clientPill}>{client}</li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div
        className="media-kit-section"
        style={{ ...s.section, ...s.contactSection }}
      >
        <h2 style={{ ...s.sectionHeading, color: '#fff' }}>
          Contact &amp; Availability
        </h2>
        <hr style={s.sectionRule} />
        <div className="contact-grid" style={s.contactGrid}>
          <div>
            <p style={s.contactLabel}>Available Formats</p>
            <ul style={s.formatList}>
              {formats.map((f) => (
                <li key={f} style={s.formatItem}>{f}</li>
              ))}
            </ul>

            <p style={{ ...s.contactLabel, marginTop: '1.5em' }}>Languages</p>
            <p style={s.contactValue}>English, Cantonese</p>

            <p style={s.contactLabel}>Location</p>
            <p style={s.contactValue}>Hong Kong (in-person or remote)</p>
          </div>
          <div>
            <p style={s.contactLabel}>Email</p>
            <p style={s.contactValue}>
              <a
                href="mailto:sam@adaptig.com"
                style={s.contactLink}
              >
                sam@adaptig.com
              </a>
            </p>

            <p style={s.contactLabel}>LinkedIn</p>
            <p style={s.contactValue}>
              <a
                href="https://linkedin.com/in/sam-ai-agent/"
                target="_blank"
                rel="noopener noreferrer"
                style={s.contactLink}
              >
                linkedin.com/in/sam-ai-agent
              </a>
            </p>

            <p style={s.contactLabel}>Website</p>
            <p style={s.contactValue}>
              <a
                href="https://hyperfocusam.com"
                target="_blank"
                rel="noopener noreferrer"
                style={s.contactLink}
              >
                hyperfocusam.com
              </a>
            </p>

          </div>
        </div>
      </div>

      {/* Back link */}
      <div
        className="print-hide"
        style={{ textAlign: 'center', padding: '2em' }}
      >
        <Link to="/media" style={{ color: TEXT_LIGHT, fontSize: '0.9em' }}>
          &larr; Back to Media
        </Link>
      </div>
    </article>

    {/* Responsive overrides via inline style tag */}
    {/* eslint-disable-next-line react/no-danger */}
    <style
      dangerouslySetInnerHTML={{
        __html: `
          @media (max-width: 768px) {
            .bio-grid { grid-template-columns: 1fr !important; gap: 1.5em !important; }
            .contact-grid { grid-template-columns: 1fr !important; gap: 1.5em !important; }
          }
        `,
      }}
    />
  </Main>
);

export default MediaKit;
