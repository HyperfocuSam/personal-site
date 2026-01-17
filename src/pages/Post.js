import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import dayjs from 'dayjs';

import Main from '../layouts/Main';
import posts from '../data/posts';

const Post = () => {
  const { slug } = useParams();
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);

  const post = posts.find((p) => p.slug === slug);

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

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <Main
      title={post.title}
      description={post.excerpt}
    >
      <article className="post" id="blog-post">
        <header>
          <div className="title">
            <h2>
              <Link to={`/blog/${slug}`}>{post.title}</Link>
            </h2>
            <p>{dayjs(post.date).format('MMMM D, YYYY')}</p>
          </div>
        </header>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <Markdown>{markdown}</Markdown>
        )}

        <hr />
        <p>
          {post.tags && post.tags.length > 0 && (
            <span><strong>Tags:</strong> {post.tags.join(', ')}</span>
          )}
        </p>
        <Link to="/blog">&larr; Back to all posts</Link>
      </article>
    </Main>
  );
};

export default Post;
