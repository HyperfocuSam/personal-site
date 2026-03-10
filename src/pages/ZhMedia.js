import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';

const episodes = [
  {
    id: 'ep012',
    number: '012',
    title: '點用AI救到你？｜使用AI三大心法',
    date: '2025年5月12日',
    views: '64K+',
    likes: null,
    embedUrl: 'https://www.youtube.com/embed/lWY4JVlz960',
    membersOnly: false,
    description: 'Sam 分享 AI 三大心法，並即場示範如何用 AI 拒絕朋友借錢，全場爆笑。',
    highlights: [],
  },
  {
    id: 'ep024',
    number: '024',
    title: '點解要課金用AI？！',
    date: '2025年6月9日',
    views: '34K+',
    likes: '944+',
    embedUrl: 'https://www.youtube.com/embed/1cJ6dwOad6g',
    membersOnly: false,
    description: 'Sam 拆解三大 AI 工具迷思，比較 o3 與 4o 的分別，並示範大部分付費用戶都忽略的隱藏功能。',
    highlights: [
      { time: '08:53', label: 'Sam 自我介紹' },
      { time: '13:33', label: '「課金 AI = 投資自己」' },
      { time: '30:00', label: 'o3 vs 4o 深入解析' },
      { time: '44:19', label: '隱藏功能示範' },
    ],
  },
  {
    id: 'ep049',
    number: '049',
    title: '拯救專注力！增加生產力！三個AI工具自救指南！',
    date: '2025年8月6日',
    views: null,
    likes: null,
    embedUrl: 'https://www.youtube.com/embed/7Gswgk7Qd7Q',
    membersOnly: true,
    description: 'Sam 分享三個幫助你拯救專注力、提升生產力的 AI 工具。',
    highlights: [],
  },
];

const styles = {
  episodeCard: {
    marginBottom: '2.5em',
    paddingBottom: '2em',
    borderBottom: '1px solid #e5e2db',
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
    color: '#6b6d7a',
    whiteSpace: 'nowrap',
  },
  badge: {
    display: 'inline-block',
    fontSize: '0.7em',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    padding: '0.25em 0.6em',
    borderRadius: '4px',
    background: '#edeae4',
    color: '#6b6d7a',
    marginLeft: '0.75em',
  },
  videoWrapper: {
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
    overflow: 'hidden',
    maxWidth: '100%',
    marginBottom: '1.25em',
    borderRadius: '8px',
  },
  videoIframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 0,
  },
  statsRow: {
    display: 'flex',
    gap: '1.5em',
    fontSize: '0.85em',
    color: '#6b6d7a',
    marginBottom: '0.5em',
    flexWrap: 'wrap',
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
    fontWeight: 700,
    color: '#1a1d2b',
    minWidth: '3.5em',
  },
  sectionHeading: {
    borderBottom: '1px solid #e5e2db',
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
    background: '#0f1729',
    color: '#e8e6e1',
    whiteSpace: 'nowrap',
  },
};

const EpisodeCard = ({ episode }) => (
  <div style={styles.episodeCard} id={episode.id}>
    <div style={styles.episodeHeader}>
      <h4 style={styles.episodeTitle}>
        {`\u76F4\u64AD${episode.number}: ${episode.title}`}
      </h4>
      <span style={styles.episodeMeta}>
        {episode.date}
        {episode.membersOnly && (
          <span style={styles.badge}>會員專屬</span>
        )}
      </span>
    </div>

    {episode.views && (
      <div style={styles.statsRow}>
        <span>{`${episode.views} 觀看次數`}</span>
        <span>{`${episode.likes} 讚好`}</span>
      </div>
    )}

    <div style={styles.videoWrapper}>
      <iframe
        style={styles.videoIframe}
        src={episode.embedUrl}
        title={episode.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>

    <p className="episode-card__desc-zh">
      {episode.description}
    </p>

    {episode.highlights.length > 0 && (
      <>
        <strong className="episode-highlights__label">重點時刻</strong>
        <ul style={styles.highlights}>
          {episode.highlights.map((h) => (
            <li key={h.time} style={styles.highlightItem}>
              <span style={styles.highlightTime}>{h.time}</span>
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
    description: PropTypes.string.isRequired,
    highlights: PropTypes.arrayOf(
      PropTypes.shape({
        time: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

const ZhMedia = () => (
  <Main
    title="媒體"
    description="Sam Wong 媒體出演 — 會八十嘉賓專家，討論 AI 工具、生產力同實用科技應用。AI顧問 香港、企業AI培訓。"
    canonicalUrl={`${SITE_URL}/zh/media`}
    ogTitle="媒體出演 | Sam Wong"
    ogDescription="睇 Sam Wong 喺會八十嘅嘉賓出演，討論 AI 工具、生產力同實用科技應用。"
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/zh/media`}
    ogType="website"
    twitterTitle="媒體出演 | Sam Wong"
    twitterDescription="睇 Sam Wong 喺會八十嘅嘉賓出演，討論 AI 工具、生產力同實用科技應用。"
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/media` },
      { lang: 'zh-Hant', href: `${SITE_URL}/zh/media` },
      { lang: 'x-default', href: `${SITE_URL}/media` },
    ]}
  >
    <Helmet><html lang="zh-Hant" /></Helmet>
    <article className="post" id="zh-media">
      {/* Dark hero */}
      <header className="page-hero">
        <div className="content-standard">
          <div className="title">
            <h2>
              <Link to="/zh/media">媒體</Link>
            </h2>
            <p>嘉賓出演、訪問同座談討論。</p>
          </div>
        </div>
      </header>

      <section className="section-base section-padding">
        <div className="content-standard">
          <h3 style={styles.sectionHeading}>曾出演</h3>
          <div style={styles.showIntro}>
            <span style={styles.showBadge}>Club 80 會八十</span>
            <span>熱門廣東話 YouTube 節目</span>
          </div>
          <p>
            Sam 曾以嘉賓專家身份三度出演
            {' '}
            <strong>會八十</strong>
            ，一個由阿Bu、陳強同 Greg 主持嘅熱門廣東話 YouTube 節目。
            節目涵蓋科技、AI 工具同實用數碼技能，面向香港觀眾。
            Sam 嘅三集節目累計觀看次數超過 98,000。
          </p>
        </div>
      </section>

      <section className="section-sunken section-padding">
        <div className="content-standard">
          <h3 style={styles.sectionHeading}>節目集數</h3>
          {episodes.map((ep) => (
            <EpisodeCard key={ep.id} episode={ep} />
          ))}
        </div>
      </section>

      <section className="section-dark section-dark--centered section-padding">
        <div className="content-standard">
          <h3>有興趣邀請 Sam 上你嘅節目？</h3>
          <p>
            Sam 可以接受 Podcast 訪問（直播或預錄）、YouTube 直播、座談討論、
            會議主題演講，主題包括 AI 應用、生產力同實用科技。
          </p>
          <ul className="actions">
            <li>
              <Link to="/media/kit" className="button">
                睇媒體資料包
              </Link>
            </li>
            <li>
              <Link to="/contact" className="button-secondary">
                聯絡我
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <p className="lang-toggle">
        <Link to="/media">View in English</Link>
      </p>
    </article>
  </Main>
);

export default ZhMedia;
