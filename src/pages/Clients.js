import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import OptimizedImage from '../components/Template/OptimizedImage';
import ScrollReveal from '../components/ScrollReveal';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import posts from '../data/posts';

const clientPosts = posts.filter((p) => p.type === 'case-study');

const ClientCard = ({ post }) => (
  <article className="blog-card blog-card--case-study fn-card">
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
        <p className="blog-card__meta fn-stamp">
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
    <article className="post field-notes-content" id="clients">
      {/* Dark hero */}
      <header className="page-hero">
        <div className="content-standard">
          <div className="title">
            <h1>
              <Link to="/clients">Clients</Link>
            </h1>
            <p>Enterprise AI Training Case Studies</p>
          </div>
        </div>
      </header>

      <section className="section-base section-padding">
        <div className="content-standard">
          <ScrollReveal variant="fade-up-long">
            <p>
              Real examples from workshops and coaching engagements across banking,
              retail, education, and engineering.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up-long" stagger={120}>
            <div className="blog-grid">
              {clientPosts.map((post) => (
                <ClientCard key={post.slug} post={post} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sunken section-padding">
        <div className="content-narrow" style={{ textAlign: 'center' }}>
          <ScrollReveal variant="fade-up">
            <h2>Want results like these for your team?</h2>
            <p>
              Every engagement starts with a 30-minute discovery call
              to understand your team&apos;s workflows, goals, and constraints.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '1.5rem',
            }}
            >
              <Link to="/contact" className="button">
                Book a Discovery Call
              </Link>
              <Link to="/services" className="button button--outline">
                View Training Services
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </article>
  </Main>
);

export default Clients;
