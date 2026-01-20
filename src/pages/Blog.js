import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import Main from '../layouts/Main';
import posts from '../data/posts';
import { LeadMagnetBanner } from '../components/LeadCapture';
import { AuthorCard } from '../components/Blog';

const { PUBLIC_URL } = process.env;

// Separate featured post from other posts
const featuredPost = posts.find((post) => post.featured);
const otherPosts = posts.filter((post) => !post.featured);

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
          <p>Insights & Learnings</p>
        </div>
      </header>

      <p>
        Thoughts on AI adoption, workshop observations, and the intersection of
        technology and humanity.
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
                  <div className="blog-featured__image-container">
                    <img
                      src={`${PUBLIC_URL}${featuredPost.image}`}
                      alt={featuredPost.title}
                      className="blog-featured__image"
                    />
                    <span className="blog-featured__badge">Featured</span>
                  </div>
                )}
                <div className="blog-featured__content">
                  <h3 className="blog-featured__title">{featuredPost.title}</h3>
                  <p className="blog-featured__meta">
                    {dayjs(featuredPost.date).format('MMMM D, YYYY')}
                  </p>
                  <p className="blog-featured__excerpt">{featuredPost.excerpt}</p>
                  {featuredPost.tags && featuredPost.tags.length > 0 && (
                    <div className="blog-tags">
                      {featuredPost.tags.map((tag) => (
                        <span key={tag} className="blog-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </section>
          )}

          {/* Blog Post Grid */}
          <div className="blog-grid">
            {otherPosts.map((post) => (
              <article key={post.slug} className="blog-card">
                <Link to={`/blog/${post.slug}`} className="blog-card__link">
                  {post.image && (
                    <div className="blog-card__image-container">
                      <img
                        src={`${PUBLIC_URL}${post.image}`}
                        alt={post.title}
                        className="blog-card__image"
                      />
                    </div>
                  )}
                  <div className="blog-card__content">
                    <h3 className="blog-card__title">{post.title}</h3>
                    <p className="blog-card__meta">
                      {dayjs(post.date).format('MMM D, YYYY')}
                    </p>
                    <p className="blog-card__excerpt">{post.excerpt}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="blog-tags">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="blog-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </>
      )}

      <LeadMagnetBanner variant="blog" />

      <hr />
      <h3>About the Author</h3>
      <AuthorCard />

      <hr />
      <h3>Want more frequent updates?</h3>
      <p>
        Follow me on{' '}
        <a href="https://www.linkedin.com/in/sam-ai-agent/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>{' '}
        for shorter updates and industry discussions.
      </p>
    </article>
  </Main>
);

export default Blog;
