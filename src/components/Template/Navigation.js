import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import Hamburger from './Hamburger';
import { routesFor } from '../../data/routes';
import { counterpartOf, isZhPath } from '../../data/langPairs';

// `language` and `counterpartHref` are passed down by pages whose path cannot
// reveal their language — Chinese posts live at /blog/<slug>-tc, not under /zh.
// Without them all 28 rendered this header in English. See data/langPairs.js.
const Navigation = ({ language, counterpartHref }) => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const other = counterpartOf(pathname, { lang: language, href: counterpartHref });
  // On a Chinese page the whole header is Chinese, not just the toggle. Until
  // 2026-08-12 this rendered the English list on /zh, so the only way out of a
  // Chinese page was back into English.
  const routes = routesFor(pathname, language);
  const isZh = isZhPath(pathname, language);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Match active route — exact for "/" , prefix for others
  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header
      id="header"
      className={`${scrolled ? 'scrolled' : ''}${isZh ? ' header--zh' : ''}`.trim()}
      role="banner"
    >
      <div className="index-link">
        {routes
          .filter((l) => l.index)
          .map((l) => (
            <Link key={l.label} to={l.path}>
              {l.label}
            </Link>
          ))}
      </div>
      <nav className="links">
        <ul>
          {routes
            .filter((l) => !l.index)
            .map((l) => (
              <li key={l.label}>
                {l.path.startsWith('http') ? (
                  <a href={l.path} target="_blank" rel="noopener noreferrer">
                    {l.label}
                  </a>
                ) : (
                  <Link
                    to={l.path}
                    className={isActive(l.path) ? 'active' : ''}
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
        </ul>
      </nav>
      {/* Language switch lives in the fixed header, NOT the hamburger. Until
          2026-08-11 the only 中文版本 link on the homepage sat 6,873px down a
          7,623px page — roughly eight phone screens — and 172 Hong Kong mobile
          visitors arriving from a Cantonese YouTube show got an English-only
          site with no way to know the Chinese one existed. */}
      <div className="nav-lang">
        <Link
          to={other.href}
          data-cta="nav_lang"
          lang={other.lang === 'zh' ? 'zh-Hant' : 'en'}
          hrefLang={other.lang === 'zh' ? 'zh-Hant' : 'en'}
          aria-label={other.lang === 'zh' ? '切換至中文版本' : 'Switch to English'}
        >
          {other.lang === 'zh' ? '中文' : 'EN'}
        </Link>
      </div>
      <div className="nav-cta">
        <Link to={isZh ? '/zh/book' : '/book'} data-cta="nav_book">
          {isZh ? '預約通話' : 'Book a Call'}
        </Link>
      </div>
      <Hamburger language={language} />
    </header>
  );
};

Navigation.propTypes = {
  language: PropTypes.string,
  counterpartHref: PropTypes.string,
};

Navigation.defaultProps = {
  language: undefined,
  counterpartHref: undefined,
};

export default Navigation;
