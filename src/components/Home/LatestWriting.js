import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import posts from '../../data/posts';

// Curated, not latest-N: the raw feed surfaced practitioner-diary posts
// ("103 Rules for My AI") to L&D buyers. These are the three posts a buyer
// evaluating training actually needs; swap slugs here when something better
// publishes. Copy lives per-language in one object (bilingual rule).
const COPY = {
  en: {
    title: 'Selected writing',
    slugs: [
      'how-to-choose-ai-training-hong-kong',
      'five-questions-corporate-ai-training-hong-kong',
      'ai-train-the-trainer-hong-kong',
    ],
    more: 'View all writing →',
    about: 'More about me →',
    aboutPath: '/about',
    blogPath: '/blog',
    blogBase: '/blog/',
  },
  'zh-Hant': {
    title: '精選文章',
    slugs: [
      'five-questions-corporate-ai-training-hong-kong-tc',
      'ai-train-the-trainer-hong-kong-tc',
      'why-my-best-ai-workshops-have-thirteen-people-tc',
    ],
    more: '查看所有文章 →',
    about: '更多關於我 →',
    aboutPath: '/zh/about',
    blogPath: '/zh/blog',
    blogBase: '/blog/',
  },
};

const formatDate = (dateStr, language) => (
  language === 'zh-Hant'
    ? dayjs(dateStr).format('YYYY年M月D日')
    : dayjs(dateStr).format('MMM D, YYYY')
);

const LatestWriting = ({ language }) => {
  const t = COPY[language] || COPY.en;
  const selected = t.slugs
    .map((slug) => posts.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <section className="latest-writing full-bleed">
      <div className="content-narrow">
        <h2 className="latest-writing__title">{t.title}</h2>
        <div className="latest-writing__list">
          {selected.map((post) => (
            <Link
              key={post.slug}
              to={`${t.blogBase}${post.slug}`}
              className="latest-writing__item"
            >
              <time
                className="latest-writing__date fn-stamp fn-stamp--verified"
                dateTime={post.date}
              >
                {formatDate(post.date, language)}
              </time>
              <div className="latest-writing__content">
                <h3 className="latest-writing__heading">{post.title}</h3>
                <p className="latest-writing__excerpt">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <p className="latest-writing__links">
          <Link to={t.blogPath} className="latest-writing__more">
            {t.more}
          </Link>
          <Link to={t.aboutPath} className="latest-writing__more">
            {t.about}
          </Link>
        </p>
      </div>
    </section>
  );
};

LatestWriting.propTypes = {
  language: PropTypes.oneOf(['en', 'zh-Hant']),
};

LatestWriting.defaultProps = {
  language: 'en',
};

export default LatestWriting;
