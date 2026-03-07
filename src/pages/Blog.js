import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import Main from '../layouts/Main';
import posts from '../data/posts';
import { AuthorCard } from '../components/Blog';
import EmailCapture from '../components/EmailCapture/EmailCapture';

// Type display config
const typeLabels = {
  'case-study': 'Case Study',
  insight: 'Insight',
  methodology: 'Methodology',
  framework: 'Framework',
  reflection: 'Reflection',
  announcement: 'Announcement',
};

// Separate posts by section
const featuredPost = posts.find((post) => post.featured);
const caseStudies = posts.filter((p) => !p.featured && p.type === 'case-study');
const insights = posts.filter(
  (p) => !p.featured && p.type !== 'case-study',
);

const BlogCard = ({ post }) => (
  <article className={`blog-card blog-card--${post.type}`}>
    <Link to={`/blog/${post.slug}`} className="blog-card__link">
      {post.image && (
        <div className="blog-card__image-wrapper">
          <img
            src={post.image}
            alt={post.title}
            className="blog-card__image"
            loading="lazy"
          />
        </div>
      )}
      <div className="blog-card__content">
        <span className={`blog-type-pill blog-type-pill--${post.type}`}>
          {typeLabels[post.type] || post.type}
        </span>
        <h3 className="blog-card__title">{post.title}</h3>
        <p className="blog-card__meta">
          {dayjs(post.date).format('MMM D, YYYY')}
        </p>
        <p className="blog-card__excerpt">{post.excerpt}</p>
      </div>
    </Link>
  </article>
);

BlogCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

const Blog = () => (
  <Main
    title="Blog"
    description="Insights on AI adoption, workshop learnings, and the human side of technology by Sam Wong."
  >
    <article className="post" id="blog">
      <header>
        <div className="title">
          <h2>
            <Link to="/blog">Blog</Link>
          </h2>
          <p>Case Studies & Practical Insights</p>
        </div>
      </header>

      <p>
        Real examples from workshops and coaching engagements, plus practical
        lessons on what helps people adopt AI with confidence.
      </p>

      {posts.length === 0 ? (
        <p><em>Posts coming soon. Stay tuned!</em></p>
      ) : (
        <>
          {/* Featured Post Hero */}
          {featuredPost && (
            <section className="blog-featured">
              <Link to={`/blog/${featuredPost.slug}`} className="blog-featured__link">
                {featuredPost.image && (
                  <div className="blog-featured__image-wrapper">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="blog-featured__image"
                    />
                  </div>
                )}
                <div className="blog-featured__content">
                  <span className={`blog-type-pill blog-type-pill--${featuredPost.type}`}>
                    {typeLabels[featuredPost.type] || featuredPost.type}
                  </span>
                  <h3 className="blog-featured__title">{featuredPost.title}</h3>
                  <p className="blog-featured__meta">
                    {dayjs(featuredPost.date).format('MMMM D, YYYY')}
                  </p>
                  <p className="blog-featured__excerpt">{featuredPost.excerpt}</p>
                </div>
              </Link>
            </section>
          )}

          {/* Case Studies Section */}
          {caseStudies.length > 0 && (
            <section className="blog-section">
              <div className="blog-section__header">
                <h3 className="blog-section__title">Case Studies</h3>
                <p className="blog-section__subtitle">
                  Real examples from enterprise workshops and engagements.
                </p>
              </div>
              <div className="blog-grid">
                {caseStudies.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* Insights & Ideas Section */}
          {insights.length > 0 && (
            <section className="blog-section">
              <div className="blog-section__header">
                <h3 className="blog-section__title">Insights & Ideas</h3>
                <p className="blog-section__subtitle">
                  Commentary on AI adoption trends, tools, and methodology.
                </p>
              </div>
              <div className="blog-grid">
                {insights.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <hr />
      <h3>About the Author</h3>
      <AuthorCard />

      <hr />
      <EmailCapture
        source="blog-listing"
        title="Stay in the loop"
        blurb="Occasional insights on AI adoption. No spam, no hype."
      />
    </article>
  </Main>
);

export default Blog;
