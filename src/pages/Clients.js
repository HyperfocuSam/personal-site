import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import OptimizedImage from '../components/Template/OptimizedImage';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import posts from '../data/posts';

const clientPosts = posts.filter((p) => p.type === 'case-study');

const ClientCard = ({ post }) => (
  <article className="blog-card blog-card--case-study">
    <Link to={`/blog/${post.slug}`} className="blog-card__link">
      {post.image && (
        <div className="blog-card__image-wrapper">
          <OptimizedImage
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
    description="Case studies from enterprise AI workshops and training engagements in Hong Kong. Clients include Bank of China, Chow Tai Fook, HSBC, CLP, and PolyU."
    canonicalUrl={`${SITE_URL}/clients`}
    ogTitle="Clients | Sam Wong"
    ogDescription="Case studies from enterprise AI workshops and training engagements by Sam Wong."
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/clients`}
    ogType="website"
    twitterTitle="Clients | Sam Wong"
    twitterDescription="Case studies from enterprise AI workshops and training engagements."
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/clients` },
      { lang: 'x-default', href: `${SITE_URL}/clients` },
    ]}
  >
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Clients | Sam Wong',
          url: `${SITE_URL}/clients`,
          description: 'Case studies from enterprise AI workshops and training engagements.',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: clientPosts.map((post, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `${SITE_URL}/blog/${post.slug}`,
              name: post.title,
            })),
          },
        })}
      </script>
    </Helmet>
    <article className="post" id="clients">
      {/* Dark hero */}
      <header className="page-hero">
        <div className="content-standard">
          <div className="title">
            <h2>
              <Link to="/clients">Clients</Link>
            </h2>
            <p>Enterprise AI Training Case Studies</p>
          </div>
        </div>
      </header>

      <section className="section-base section-padding">
        <div className="content-standard">
          <p>
            Real examples from workshops and coaching engagements across banking,
            retail, education, and engineering.
          </p>

          <div className="blog-grid">
            {clientPosts.map((post) => (
              <ClientCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </article>
  </Main>
);

export default Clients;
