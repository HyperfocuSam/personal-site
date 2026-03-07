import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import Main from '../layouts/Main';
import posts from '../data/posts';

const clientPosts = posts.filter((p) => p.type === 'case-study');

const ClientCard = ({ post }) => (
  <article className="blog-card blog-card--case-study">
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
        <h3 className="blog-card__title">{post.title}</h3>
        <p className="blog-card__meta">
          {dayjs(post.date).format('MMM D, YYYY')}
        </p>
        <p className="blog-card__excerpt">{post.excerpt}</p>
      </div>
    </Link>
  </article>
);

ClientCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

const Clients = () => (
  <Main
    title="Clients"
    description="Case studies from enterprise AI workshops and training engagements by Sam Wong."
  >
    <article className="post" id="clients">
      <header>
        <div className="title">
          <h2>
            <Link to="/clients">Clients</Link>
          </h2>
          <p>Enterprise AI Training Case Studies</p>
        </div>
      </header>

      <p>
        Real examples from workshops and coaching engagements across banking,
        retail, education, and engineering.
      </p>

      <div className="blog-grid">
        {clientPosts.map((post) => (
          <ClientCard key={post.slug} post={post} />
        ))}
      </div>
    </article>
  </Main>
);

export default Clients;
