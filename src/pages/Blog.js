import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import Main from '../layouts/Main';
import posts from '../data/posts';

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
        <div className="blog-list">
          {posts.map((post) => (
            <article key={post.slug} className="blog-item" style={{ marginBottom: '2rem' }}>
              <h3>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                {post.featured && <span className="featured-tag"> *</span>}
              </h3>
              <p className="post-meta" style={{ color: '#666', marginTop: '-0.5rem' }}>
                {dayjs(post.date).format('MMMM D, YYYY')}
                {post.tags && post.tags.length > 0 && (
                  <span> | {post.tags.join(', ')}</span>
                )}
              </p>
              <p>{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`}>Read more &rarr;</Link>
            </article>
          ))}
        </div>
      )}

      <hr />
      <h3>Want more frequent updates?</h3>
      <p>
        Follow me on{' '}
        <a href="https://www.linkedin.com/in/samwlt/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>{' '}
        for shorter updates and industry discussions.
      </p>
    </article>
  </Main>
);

export default Blog;
