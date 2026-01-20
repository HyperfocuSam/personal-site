import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import posts from '../../data/posts';

const { PUBLIC_URL } = process.env;

/**
 * Find related posts based on shared tags
 * @param {string} currentSlug - The slug of the current post
 * @param {string[]} currentTags - Tags of the current post
 * @param {number} limit - Maximum number of related posts to return
 * @returns {object[]} - Array of related posts
 */
const findRelatedPosts = (currentSlug, currentTags, limit = 3) => {
  if (!currentTags || currentTags.length === 0) {
    // Return most recent posts if no tags
    return posts
      .filter((post) => post.slug !== currentSlug)
      .slice(0, limit);
  }

  // Score posts by number of shared tags
  const scoredPosts = posts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const sharedTags = post.tags
        ? post.tags.filter((tag) => currentTags.includes(tag)).length
        : 0;
      return { ...post, score: sharedTags };
    })
    .sort((a, b) => {
      // Sort by score (shared tags), then by date
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.date) - new Date(a.date);
    });

  return scoredPosts.slice(0, limit);
};

const RelatedPosts = ({ currentSlug, currentTags }) => {
  const relatedPosts = findRelatedPosts(currentSlug, currentTags);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="related-posts">
      <h3 className="related-posts__title">Related Posts</h3>
      <div className="related-posts__grid">
        {relatedPosts.map((post) => (
          <article key={post.slug} className="related-posts__item">
            {post.image && (
              <Link to={`/blog/${post.slug}`} className="related-posts__image-link">
                <img
                  src={`${PUBLIC_URL}${post.image}`}
                  alt={post.title}
                  className="related-posts__image"
                />
              </Link>
            )}
            <div className="related-posts__content">
              <h4 className="related-posts__item-title">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h4>
              <p className="related-posts__date">
                {dayjs(post.date).format('MMM D, YYYY')}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

RelatedPosts.propTypes = {
  currentSlug: PropTypes.string.isRequired,
  currentTags: PropTypes.arrayOf(PropTypes.string),
};

RelatedPosts.defaultProps = {
  currentTags: [],
};

export default RelatedPosts;
