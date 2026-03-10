import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
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

// Language filter options
const languageLabels = {
  all: 'All',
  en: 'English',
  'zh-Hant': '中文',
};

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

// Check if any Chinese posts exist to show the language filter
const hasChinesePosts = posts.some((p) => p.language === 'zh-Hant');

const Blog = () => {
  const [langFilter, setLangFilter] = useState('all');

  // Filter posts by language
  const filteredPosts = langFilter === 'all'
    ? posts
    : posts.filter((p) => (p.language || 'en') === langFilter);

  const featuredPost = filteredPosts.find((post) => post.featured);
  const blogPosts = filteredPosts.filter(
    (p) => !p.featured && p.type !== 'case-study',
  );

  return (
    <Main
      title="Blog"
      description="Insights on AI adoption, workshop learnings, and the human side of technology by Sam Wong."
      canonicalUrl={`${SITE_URL}/blog`}
      ogTitle="Blog | Sam Wong"
      ogDescription="Insights on AI adoption, workshop learnings, and the human side of technology."
      ogImage={DEFAULT_OG_IMAGE}
      ogUrl={`${SITE_URL}/blog`}
      ogType="website"
      twitterTitle="Blog | Sam Wong"
      twitterDescription="Insights on AI adoption, workshop learnings, and the human side of technology."
      twitterImage={DEFAULT_OG_IMAGE}
      hreflangTags={[
        { lang: 'en', href: `${SITE_URL}/blog` },
        { lang: 'zh-Hant', href: `${SITE_URL}/zh/blog` },
        { lang: 'x-default', href: `${SITE_URL}/blog` },
      ]}
    >
      <article className="post" id="blog">
        {/* Dark hero */}
        <header className="page-hero">
          <div className="content-standard">
            <div className="title">
              <h2>
                <Link to="/blog">Blog</Link>
              </h2>
              <p>
                Practical lessons on AI adoption trends, tools, and what helps
                people work with AI confidently.
              </p>
            </div>
          </div>
        </header>

        {/* Blog listing content */}
        <section className="section-base section-padding">
          <div className="content-standard">
            {/* Language Filter */}
            {hasChinesePosts && (
              <div className="blog-lang-filter">
                {Object.entries(languageLabels).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setLangFilter(key)}
                    className={`blog-lang-btn${langFilter === key ? ' blog-lang-btn--active' : ''}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            {filteredPosts.length === 0 ? (
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

                {/* Blog Posts Section */}
                {blogPosts.length > 0 && (
                  <section className="blog-section">
                    <div className="blog-section__header">
                      <h3 className="blog-section__title">Blog</h3>
                      <p className="blog-section__subtitle">
                        Commentary on AI adoption trends, tools, and methodology.
                      </p>
                    </div>
                    <div className="blog-grid">
                      {blogPosts.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                      ))}
                    </div>
                  </section>
                )}

              </>
            )}
          </div>
        </section>

        {/* Author + Newsletter */}
        <section className="section-sunken section-padding">
          <div className="content-standard">
            <h3>About the Author</h3>
            <AuthorCard />
          </div>
        </section>

        <EmailCapture
          title="Want to discuss AI adoption?"
          blurb="Reach out for a conversation about training, coaching, or anything AI."
        />
      </article>
    </Main>
  );
};

export default Blog;
