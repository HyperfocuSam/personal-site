import React from 'react';
import PropTypes from 'prop-types';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Analytics from '../components/Template/Analytics';
import Navigation from '../components/Template/Navigation';
import ScrollToTop from '../components/Template/ScrollToTop';
import Footer from '../components/Template/Footer';

// GitHub Pages serves trailing-slash URLs (react-snap creates dir/index.html).
// Canonical + OG URLs must match sitemap.xml to avoid Google indexing errors.
const ensureTrailingSlash = (url) => {
  if (!url) return url;
  const [path, query] = url.split('?');
  const slashed = path.endsWith('/') ? path : `${path}/`;
  return query ? `${slashed}?${query}` : slashed;
};

const Main = (props) => (
  <HelmetProvider>
    <Analytics />
    <ScrollToTop />
    <Helmet
      titleTemplate="%s | Sam Wong"
      defaultTitle="Sam Wong | AI Training Specialist - Hong Kong"
      defer={false}
    >
      {props.title && <title>{props.title}</title>}
      <meta name="description" content={props.description} />
      {props.canonicalUrl && <link rel="canonical" href={ensureTrailingSlash(props.canonicalUrl)} />}
      {/* Open Graph */}
      {props.ogTitle && <meta property="og:title" content={props.ogTitle} />}
      {props.ogDescription && <meta property="og:description" content={props.ogDescription} />}
      {props.ogImage && <meta property="og:image" content={props.ogImage} />}
      {props.ogUrl && <meta property="og:url" content={ensureTrailingSlash(props.ogUrl)} />}
      {props.ogType && <meta property="og:type" content={props.ogType} />}
      {/* Twitter Card */}
      <meta name="twitter:card" content={props.twitterCard || 'summary_large_image'} />
      {props.twitterTitle && <meta name="twitter:title" content={props.twitterTitle} />}
      {props.twitterDescription && <meta name="twitter:description" content={props.twitterDescription} />}
      {props.twitterImage && <meta name="twitter:image" content={props.twitterImage} />}
      {/* Article metadata */}
      {props.articlePublishedTime && <meta property="article:published_time" content={props.articlePublishedTime} />}
      {props.articleModifiedTime && <meta property="article:modified_time" content={props.articleModifiedTime} />}
      {props.articleTags && props.articleTags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      {/* hreflang tags */}
      {props.hreflangTags && props.hreflangTags.map((tag) => (
        <link key={tag.lang} rel="alternate" hrefLang={tag.lang} href={ensureTrailingSlash(tag.href)} />
      ))}
    </Helmet>
    <a className="skip-to-content" href="#main">Skip to content</a>
    <div id="wrapper">
      <Navigation />
      <main id="main" role="main">{props.children}</main>
      <Footer />
    </div>
  </HelmetProvider>
);

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  title: PropTypes.string,
  description: PropTypes.string,
  canonicalUrl: PropTypes.string,
  ogTitle: PropTypes.string,
  ogDescription: PropTypes.string,
  ogImage: PropTypes.string,
  ogUrl: PropTypes.string,
  ogType: PropTypes.string,
  twitterCard: PropTypes.string,
  twitterTitle: PropTypes.string,
  twitterDescription: PropTypes.string,
  twitterImage: PropTypes.string,
  articlePublishedTime: PropTypes.string,
  articleModifiedTime: PropTypes.string,
  articleTags: PropTypes.arrayOf(PropTypes.string),
  hreflangTags: PropTypes.arrayOf(PropTypes.shape({
    lang: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  })),
};

Main.defaultProps = {
  children: null,
  title: null,
  description: 'Sam Wong - AI Training Specialist helping enterprises and individuals '
    + 'adopt AI through corporate workshops, 1-1 coaching, and Train-the-Trainer programs.',
  canonicalUrl: null,
  ogTitle: 'Sam Wong | AI Training Specialist',
  ogDescription: 'Helping enterprises and individuals thrive with AI. Corporate workshops, 1-1 coaching, and Train-the-Trainer programs.',
  ogImage: 'https://hyperfocusam.com/images/og-image.jpg',
  ogUrl: 'https://hyperfocusam.com/',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Sam Wong | AI Training Specialist',
  twitterDescription: 'Helping enterprises and individuals thrive with AI. Corporate workshops, 1-1 coaching, and Train-the-Trainer programs.',
  twitterImage: 'https://hyperfocusam.com/images/og-image.jpg',
  articlePublishedTime: null,
  articleModifiedTime: null,
  articleTags: null,
  hreflangTags: null,
};

export default Main;
