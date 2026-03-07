import React from 'react';
import PropTypes from 'prop-types';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Analytics from '../components/Template/Analytics';
import Navigation from '../components/Template/Navigation';
import SideBar from '../components/Template/SideBar';
import ScrollToTop from '../components/Template/ScrollToTop';

const Main = (props) => (
  <HelmetProvider>
    <Analytics />
    <ScrollToTop />
    <Helmet
      titleTemplate="%s | Sam Wong"
      defaultTitle="Sam Wong | AI Training Specialist"
      defer={false}
    >
      {props.title && <title>{props.title}</title>}
      <meta name="description" content={props.description} />
      {props.canonicalUrl && <link rel="canonical" href={props.canonicalUrl} />}
      {/* Open Graph */}
      {props.ogTitle && <meta property="og:title" content={props.ogTitle} />}
      {props.ogDescription && <meta property="og:description" content={props.ogDescription} />}
      {props.ogImage && <meta property="og:image" content={props.ogImage} />}
      {props.ogUrl && <meta property="og:url" content={props.ogUrl} />}
      {props.ogType && <meta property="og:type" content={props.ogType} />}
      {/* Twitter Card */}
      <meta name="twitter:card" content={props.twitterCard || 'summary_large_image'} />
      {props.twitterTitle && <meta name="twitter:title" content={props.twitterTitle} />}
      {props.twitterDescription && <meta name="twitter:description" content={props.twitterDescription} />}
      {props.twitterImage && <meta name="twitter:image" content={props.twitterImage} />}
      {/* Article metadata */}
      {props.articlePublishedTime && <meta property="article:published_time" content={props.articlePublishedTime} />}
      {props.articleTags && props.articleTags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
    </Helmet>
    <div id="wrapper">
      <Navigation />
      <div id="main">{props.children}</div>
      {props.fullPage ? null : <SideBar />}
    </div>
  </HelmetProvider>
);

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  fullPage: PropTypes.bool,
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
  articleTags: PropTypes.arrayOf(PropTypes.string),
};

Main.defaultProps = {
  children: null,
  fullPage: false,
  title: null,
  description: 'Sam Wong - AI Training Specialist helping enterprises and individuals '
    + 'adopt AI through corporate workshops, 1-1 coaching, and Train-the-Trainer programs.',
  canonicalUrl: null,
  ogTitle: null,
  ogDescription: null,
  ogImage: null,
  ogUrl: null,
  ogType: null,
  twitterCard: 'summary_large_image',
  twitterTitle: null,
  twitterDescription: null,
  twitterImage: null,
  articlePublishedTime: null,
  articleTags: null,
};

export default Main;
