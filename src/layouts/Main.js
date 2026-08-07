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

const isZhUrl = (url) => /\/zh(?:\/|$)/.test(url || '');

const getOgLocale = (props) => (
  isZhUrl(props.canonicalUrl || props.ogUrl) ? 'zh_HK' : 'en_US'
);

const getAlternateOgLocale = (props) => {
  const languages = (props.hreflangTags || []).map((tag) => tag.lang);
  if (!languages.includes('en') || !languages.includes('zh-Hant')) return null;
  return getOgLocale(props) === 'zh_HK' ? 'en_US' : 'zh_HK';
};

const Main = (props) => (
  <HelmetProvider>
    <Analytics />
    <ScrollToTop />
    <Helmet
      // The " | Sam Wong" suffix costs 12 characters. On a long editorial headline
      // that pushes the title past the ~60 chars a result listing shows, so the
      // suffix is what gets truncated anyway — it buys nothing and hides the last
      // words of the headline. Drop it once the headline no longer has room, and
      // keep the headline itself untouched.
      titleTemplate={(props.title || '').length > 48 ? '%s' : '%s | Sam Wong'}
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
      <meta property="og:locale" content={getOgLocale(props)} />
      {getAlternateOgLocale(props) && (
        <meta property="og:locale:alternate" content={getAlternateOgLocale(props)} />
      )}
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
      {!props.hideNav && <Navigation />}
      <main id="main" role="main">{props.children}</main>
      {!props.hideNav && <Footer />}
      <a
        href="https://wa.me/85264315177"
        className="floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message me on WhatsApp"
        onClick={() => {
          if (window.gtag) {
            window.gtag('event', 'click', {
              event_category: 'outbound',
              event_label: 'whatsapp_floating',
              transport_type: 'beacon',
            });
          }
        }}
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
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
  hideNav: PropTypes.bool,
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
  hideNav: false,
};

export default Main;
