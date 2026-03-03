import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import posts from '../../data/posts';

const FeaturedCaseStudies = ({ limit, tag }) => {
  const caseStudies = posts
    .filter((post) => post.tags && post.tags.includes(tag))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);

  if (caseStudies.length === 0) {
    return null;
  }

  return (
    <section className="home-case-studies">
      <header>
        <h3>Featured Case Studies</h3>
        <p>Real outcomes from teams and leaders adopting AI in practical ways.</p>
      </header>
      <div className="home-case-studies__grid">
        {caseStudies.map((post) => (
          <article key={post.slug} className="home-case-studies__card">
            <h4>
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h4>
            <p className="home-case-studies__date">
              {dayjs(post.date).format('MMMM D, YYYY')}
            </p>
            <p>{post.excerpt}</p>
          </article>
        ))}
      </div>
      <p className="home-case-studies__all">
        <Link to="/blog">See All Case Studies</Link>
      </p>
    </section>
  );
};

FeaturedCaseStudies.propTypes = {
  limit: PropTypes.number,
  tag: PropTypes.string,
};

FeaturedCaseStudies.defaultProps = {
  limit: 3,
  tag: 'case-study',
};

export default FeaturedCaseStudies;
