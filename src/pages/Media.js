import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';

const episodes = [
  {
    id: 'ep012',
    number: '012',
    title: '點用AI救到你？｜使用AI三大心法 | How Can AI Save You?',
    date: 'May 12, 2025',
    views: '64K+',
    likes: null,
    embedUrl: 'https://www.youtube.com/embed/lWY4JVlz960',
    membersOnly: false,
    description: {
      zh: 'Sam 分享 AI 三大心法，並即場示範如何用 AI 拒絕朋友借錢，全場爆笑。',
      en: 'Sam shares three core principles for using AI and demonstrates live how to use AI to decline a friend\'s loan request — to hilarious effect.',
    },
    highlights: [],
  },
  {
    id: 'ep024',
    number: '024',
    title: '點解要課金用AI？！| Why Pay for AI Tools?',
    date: 'June 9, 2025',
    views: '34K+',
    likes: '944+',
    embedUrl: 'https://www.youtube.com/embed/1cJ6dwOad6g',
    membersOnly: false,
    description: {
      zh: 'Sam 拆解三大 AI 工具迷思，比較 o3 與 4o 的分別，並示範大部分付費用戶都忽略的隱藏功能。',
      en: 'Sam discusses three myths about AI tools, explains o3 vs 4o, and reveals hidden features most paid users miss.',
    },
    highlights: [
      { time: '08:53', label: "Sam's introduction" },
      { time: '13:33', label: '"Paying for AI = investing in yourself"' },
      { time: '30:00', label: 'o3 vs 4o deep dive' },
      { time: '44:19', label: 'Hidden features walkthrough' },
    ],
  },
  {
    id: 'ep049',
    number: '049',
    title: '拯救專注力！增加生產力！三個AI工具自救指南！| 3 AI Tools for Focus & Productivity',
    date: 'August 6, 2025',
    views: null,
    likes: null,
    embedUrl: 'https://www.youtube.com/embed/7Gswgk7Qd7Q',
    membersOnly: true,
    description: {
      zh: 'Sam 分享三個幫助你拯救專注力、提升生產力的 AI 工具。',
      en: 'Sam shares three AI tools for saving focus and boosting productivity.',
    },
    highlights: [],
  },
];

const mediaStyles = {
  episodeCard: {
    marginBottom: '2.5em',
    paddingBottom: '2em',
    borderBottom: '1px solid rgba(160, 160, 160, 0.3)',
  },
  episodeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: '0.5em',
    marginBottom: '0.75em',
  },
  episodeTitle: {
    margin: 0,
    fontSize: '1.1em',
    fontWeight: 700,
  },
  episodeMeta: {
    fontSize: '0.85em',
    color: '#888',
    whiteSpace: 'nowrap',
  },
  badge: {
    display: 'inline-block',
    fontSize: '0.7em',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    padding: '0.25em 0.6em',
    borderRadius: '3px',
    background: '#f4f4f4',
    color: '#888',
    marginLeft: '0.75em',
  },
  videoWrapper: {
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
    overflow: 'hidden',
    maxWidth: '100%',
    marginBottom: '1.25em',
    borderRadius: '4px',
  },
  videoIframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 0,
  },
  description: {
    marginBottom: '1em',
  },
  descZh: {
    fontSize: '0.95em',
    marginBottom: '0.35em',
  },
  descEn: {
    fontSize: '0.9em',
    color: '#666',
  },
  highlights: {
    listStyle: 'none',
    padding: 0,
    margin: '0.75em 0 0 0',
  },
  highlightItem: {
    display: 'flex',
    gap: '0.75em',
    padding: '0.3em 0',
    fontSize: '0.9em',
  },
  highlightTime: {
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeight: 700,
    color: '#3d4449',
    minWidth: '3.5em',
  },
  sectionHeading: {
    borderBottom: '1px solid rgba(160, 160, 160, 0.3)',
    paddingBottom: '0.5em',
    marginBottom: '1.25em',
  },
  showIntro: {
    display: 'flex',
    alignItems: 'center',
    gap: '1em',
    marginBottom: '1.5em',
    flexWrap: 'wrap',
  },
  showBadge: {
    display: 'inline-block',
    fontSize: '0.75em',
    fontWeight: 800,
    letterSpacing: '0.05em',
    padding: '0.4em 0.8em',
    borderRadius: '4px',
    background: '#3d4449',
    color: '#fff',
    whiteSpace: 'nowrap',
  },
  statsRow: {
    display: 'flex',
    gap: '1.5em',
    fontSize: '0.85em',
    color: '#888',
    marginBottom: '0.5em',
    flexWrap: 'wrap',
  },
  ctaSection: {
    background: '#f5f6f7',
    padding: '2em',
    borderRadius: '4px',
    marginTop: '1em',
    textAlign: 'center',
  },
  ctaHeading: {
    marginBottom: '0.5em',
  },
};

const EpisodeCard = ({ episode }) => (
  <div style={mediaStyles.episodeCard} id={episode.id}>
    <div style={mediaStyles.episodeHeader}>
      <h4 style={mediaStyles.episodeTitle}>
        {`直播${episode.number}: ${episode.title}`}
      </h4>
      <span style={mediaStyles.episodeMeta}>
        {episode.date}
        {episode.membersOnly && (
          <span style={mediaStyles.badge}>Members Only</span>
        )}
      </span>
    </div>

    {episode.views && (
      <div style={mediaStyles.statsRow}>
        <span>{`${episode.views} views`}</span>
        <span>{`${episode.likes} likes`}</span>
      </div>
    )}

    <div style={mediaStyles.videoWrapper}>
      <iframe
        style={mediaStyles.videoIframe}
        src={episode.embedUrl}
        title={episode.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>

    <div style={mediaStyles.description}>
      <p style={mediaStyles.descZh}>{episode.description.zh}</p>
      <p style={mediaStyles.descEn}>{episode.description.en}</p>
    </div>

    {episode.highlights.length > 0 && (
      <>
        <strong style={{ fontSize: '0.9em' }}>Key Moments</strong>
        <ul style={mediaStyles.highlights}>
          {episode.highlights.map((h) => (
            <li key={h.time} style={mediaStyles.highlightItem}>
              <span style={mediaStyles.highlightTime}>{h.time}</span>
              <span>{h.label}</span>
            </li>
          ))}
        </ul>
      </>
    )}
  </div>
);

EpisodeCard.propTypes = {
  episode: PropTypes.shape({
    id: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    views: PropTypes.string,
    likes: PropTypes.string,
    embedUrl: PropTypes.string.isRequired,
    membersOnly: PropTypes.bool,
    description: PropTypes.shape({
      zh: PropTypes.string.isRequired,
      en: PropTypes.string.isRequired,
    }).isRequired,
    highlights: PropTypes.arrayOf(
      PropTypes.shape({
        time: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

const Media = () => (
  <Main
    title="Media"
    description="Sam Wong's media appearances - recurring guest expert on Club 80 (會八十), a popular Cantonese YouTube show. 3 episodes, 98K+ combined views."
    canonicalUrl={`${SITE_URL}/media`}
    ogTitle="Media Appearances | Sam Wong"
    ogDescription="Watch Sam Wong's guest appearances on Club 80 (會八十), discussing AI tools, productivity, and practical technology adoption."
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/media`}
    ogType="website"
    twitterTitle="Media Appearances | Sam Wong"
    twitterDescription="Watch Sam Wong's guest appearances on Club 80 (會八十), discussing AI tools, productivity, and practical technology adoption."
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/media` },
      { lang: 'zh-Hant', href: `${SITE_URL}/zh/media` },
      { lang: 'x-default', href: `${SITE_URL}/media` },
    ]}
  >
    <article className="post" id="media">
      <header>
        <div className="title">
          <h2>
            <Link to="/media">Media / 媒體</Link>
          </h2>
          <p>Guest appearances, interviews, and panel discussions.</p>
        </div>
      </header>

      {/* As Seen On */}
      <section>
        <h3 style={mediaStyles.sectionHeading}>As Seen On</h3>
        <div style={mediaStyles.showIntro}>
          <span style={mediaStyles.showBadge}>Club 80 會八十</span>
          <span>Popular Cantonese YouTube show</span>
        </div>
        <p>
          Sam has appeared as a recurring guest expert on
          {' '}
          <strong>Club 80 (會八十)</strong>
          , a popular Cantonese YouTube show hosted by
          阿Bu, 陳強, and Greg.
          The show covers technology, AI tools, and practical digital skills
          for a Hong Kong audience. Sam&apos;s three episodes have collectively
          reached over 98,000 views.
        </p>
      </section>

      {/* Episodes */}
      <section>
        <h3 style={mediaStyles.sectionHeading}>Episodes</h3>
        {episodes.map((ep) => (
          <EpisodeCard key={ep.id} episode={ep} />
        ))}
      </section>

      {/* Contact CTA */}
      <section style={mediaStyles.ctaSection}>
        <h3 style={mediaStyles.ctaHeading}>Interested in having Sam on your show?</h3>
        <p>
          Sam is available for podcast interviews, live streams, panel discussions,
          and conference talks on AI adoption, productivity, and practical technology use.
        </p>
        <ul className="actions" style={{ justifyContent: 'center' }}>
          <li>
            <Link to="/media/kit" className="button">
              View Media Kit
            </Link>
          </li>
          <li>
            <Link to="/contact" className="button">
              Get in Touch
            </Link>
          </li>
        </ul>
      </section>

      <p style={{ fontSize: '0.85em', color: '#888', marginTop: '2em' }}>
        <Link to="/zh/media">中文版本</Link>
      </p>
    </article>
  </Main>
);

export default Media;
