import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import Main from '../layouts/Main';
import posts from '../data/posts';
import {
  AuthorCard,
  ShareButtons,
  RelatedPosts,
  calculateReadingTime,
} from '../components/Blog';

const { PUBLIC_URL } = process.env;

// Custom blockquote component for pull quotes
const PullQuote = ({ children }) => (
  <blockquote className="pull-quote">{children}</blockquote>
);

PullQuote.propTypes = {
  children: PropTypes.node,
};

PullQuote.defaultProps = {
  children: null,
};

const Post = () => {
  const { slug } = useParams();
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);

  const postIndex = posts.findIndex((p) => p.slug === slug);
  const post = posts[postIndex];

  // Get previous and next posts for navigation
  const prevPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;
  const nextPost = postIndex > 0 ? posts[postIndex - 1] : null;

  useEffect(() => {
    if (post) {
      import(`../data/posts/${slug}.md`)
        .then((res) => fetch(res.default))
        .then((res) => res.text())
        .then((text) => {
          setMarkdown(text);
          setLoading(false);
        })
        .catch(() => {
          setMarkdown('Error loading post content.');
          setLoading(false);
        });
    }
  }, [slug, post]);

  const readingTime = useMemo(() => calculateReadingTime(markdown), [markdown]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <Main
      title={post.title}
      description={post.excerpt}
    >
      <article className="post post--article" id="blog-post">
        {/* Featured Image Hero */}
        {post.image && (
          <div className="post-hero">
            <img
              src={`${PUBLIC_URL}${post.image}`}
              alt={post.title}
              className="post-hero__image"
            />
          </div>
        )}

        <header className="post-header">
          <div className="title">
            <h2>
              <Link to={`/blog/${slug}`}>{post.title}</Link>
            </h2>
            <div className="post-header__meta">
              <span className="post-header__date">
                {dayjs(post.date).format('MMMM D, YYYY')}
              </span>
              <span className="post-header__separator">|</span>
              <span className="post-header__reading-time">
                {readingTime} min read
              </span>
            </div>
          </div>
        </header>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="blog-tags blog-tags--post">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-tag">{tag}</span>
            ))}
          </div>
        )}

        {/* Article Content */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="post-content">
            <Markdown
              options={{
                overrides: {
                  blockquote: {
                    component: PullQuote,
                  },
                },
              }}
            >
              {markdown}
            </Markdown>
          </div>
        )}

        {/* Share Buttons */}
        <ShareButtons
          title={post.title}
          url={typeof window !== 'undefined' ? window.location.href : ''}
        />

        <hr />

        {/* Author Card */}
        <section className="post-author-section">
          <h3>About the Author</h3>
          <AuthorCard />
        </section>

        {/* Related Posts */}
        <RelatedPosts currentSlug={slug} currentTags={post.tags} />

        {/* Post Navigation */}
        <nav className="post-navigation">
          <div className="post-navigation__prev">
            {prevPost && (
              <>
                <span className="post-navigation__label">Previous</span>
                <Link to={`/blog/${prevPost.slug}`} className="post-navigation__link">
                  &larr; {prevPost.title}
                </Link>
              </>
            )}
          </div>
          <div className="post-navigation__next">
            {nextPost && (
              <>
                <span className="post-navigation__label">Next</span>
                <Link to={`/blog/${nextPost.slug}`} className="post-navigation__link">
                  {nextPost.title} &rarr;
                </Link>
              </>
            )}
          </div>
        </nav>

        <hr />
        <Link to="/blog" className="button">
          &larr; Back to all posts
        </Link>
      </article>
    </Main>
  );
};

export default Post;
