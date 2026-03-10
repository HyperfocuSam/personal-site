import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet-async';

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

const EpisodeCard = ({ episode }) => (
  <div className="episode-card" id={episode.id}>
    <div className="episode-card__header">
      <h4 className="episode-card__title">
        {`直播${episode.number}: ${episode.title}`}
      </h4>
      <span className="episode-card__meta">
        {episode.date}
        {episode.membersOnly && (
          <span className="episode-card__badge">Members Only</span>
        )}
      </span>
    </div>

    {!episode.membersOnly && (
      <>
        {episode.views && (
          <div className="episode-card__stats">
            <span>{`${episode.views} views`}</span>
            {episode.likes && <span>{`${episode.likes} likes`}</span>}
          </div>
        )}

        <div className="video-wrapper">
          <iframe
            src={episode.embedUrl}
            title={episode.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="episode-card__description">
          <p className="episode-card__desc-zh">{episode.description.zh}</p>
          <p className="episode-card__desc-en">{episode.description.en}</p>
        </div>

        {episode.highlights.length > 0 && (
          <>
            <strong style={{ fontSize: '0.9em' }}>Key Moments</strong>
            <ul className="episode-highlights">
              {episode.highlights.map((h) => (
                <li key={h.time} className="episode-highlights__item">
                  <span className="episode-highlights__time">{h.time}</span>
                  <span>{h.label}</span>
                </li>
              ))}
            </ul>
          </>
        )}
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
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Media Appearances | Sam Wong',
          url: `${SITE_URL}/media`,
          description: 'Sam Wong\'s media appearances on Club 80, press mentions, and speaking engagements.',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: episodes.map((ep, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'VideoObject',
                name: ep.title,
                description: ep.description.en,
                embedUrl: ep.embedUrl,
                uploadDate: ep.date,
              },
            })),
          },
        })}
      </script>
    </Helmet>
    <article className="post" id="media">
      {/* Dark hero */}
      <header className="page-hero">
        <div className="content-standard">
          <div className="title">
            <h2>
              <Link to="/media">Media / 媒體</Link>
            </h2>
            <p>Guest appearances, interviews, and panel discussions.</p>
          </div>
        </div>
      </header>

      {/* As Seen On */}
      <section className="section-base section-padding">
        <div className="content-standard">
          <h3 className="media-section-heading">As Seen On</h3>
          <div className="show-intro">
            <span className="show-intro__badge">Club 80 會八十</span>
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
        </div>
      </section>

      {/* Press & Mentions */}
      <section className="section-sunken section-padding">
        <div className="content-standard">
          <h3 className="media-section-heading">
            Press &amp; Mentions
          </h3>
          <div className="card-grid cols-2">
            <div className="card">
              <h4>HKEJ Master Class</h4>
              <p>
                DotAI invited to co-create a Master Class
                with Hong Kong Economic Journal on Vibe
                Marketing and AI employee mindset.
              </p>
            </div>
            <div className="card">
              <h4>Ming Pao Partnership</h4>
              <p>
                Ming Pao partners with DotAI for an AI
                journalism application course covering
                translation, fact-checking, and automated
                news planning.
              </p>
            </div>
            <div className="card">
              <h4>CTgoodjobs Future Leader Awards</h4>
              <p>
                DotAI invited as judges and mentors for
                the CTgoodjobs Future Leader Awards 2025,
                sharing AI entrepreneurship methods.
              </p>
            </div>
            <div className="card">
              <h4>JoJo Ventures Speaker Spotlight</h4>
              <p>
                Featured as Head of Corporate Training
                at DotAI and Co-Founder of Adaptig at
                JoJo Ventures event.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes */}
      <section className="section-base section-padding">
        <div className="content-standard">
          <h3 className="media-section-heading">Episodes</h3>
          {episodes.map((ep) => (
            <EpisodeCard key={ep.id} episode={ep} />
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-dark section-padding" style={{ textAlign: 'center' }}>
        <div className="content-standard">
          <h3>Interested in having Sam on your show?</h3>
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
              <Link to="/contact" className="button-secondary">
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <p style={{ fontSize: '0.85em', color: '#6b6d7a', marginTop: '2em' }}>
        <Link to="/zh/media">中文版本</Link>
      </p>
    </article>
  </Main>
);

export default Media;
