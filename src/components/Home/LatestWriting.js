import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import posts from '../../data/posts';

const formatDate = (dateStr) => dayjs(dateStr).format('MMM D, YYYY');

const LatestWriting = () => {
  const englishPosts = posts
    .filter((p) => p.language !== 'zh-Hant')
    .slice(0, 6);

  return (
    <section className="latest-writing full-bleed">
      <div className="content-narrow">
        <h2 className="latest-writing__title">Latest Writing</h2>
        <div className="latest-writing__list">
          {englishPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="latest-writing__item"
            >
              <time className="latest-writing__date" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
              <div className="latest-writing__content">
                <h3 className="latest-writing__heading">{post.title}</h3>
                <p className="latest-writing__excerpt">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link to="/blog" className="latest-writing__more">
          View all writing &rarr;
        </Link>
      </div>
    </section>
  );
};

export default LatestWriting;
