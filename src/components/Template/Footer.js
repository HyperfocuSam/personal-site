import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';
import { footerLinksFor } from '../../data/routes';
import { isZhPath } from '../../data/langPairs';

// Every string below branches on `isZh`, so when the language was read from
// the path alone the whole footer — tagline, bio, headings, copyright — came
// out English on all 28 Chinese posts. See the note in data/langPairs.js.
const Footer = ({ language }) => {
  const { pathname } = useLocation();
  const isZh = isZhPath(pathname, language);
  const links = footerLinksFor(pathname, language);

  return (
    <footer id="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-col footer-brand">
          <h3>Sam Wong</h3>
          <p className="footer-tagline">
            {isZh ? '讓 AI 真正留在日常工作裡。' : 'AI adoption that sticks.'}
          </p>
          {/* Contiguous text lives in single JSX expressions here (and in the
              copyright line): adjacent text nodes break react-snap hydration
              (React #418) because the baked HTML merges them into one node. */}
          {isZh ? (
            <p className="footer-bio">
              {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
              {'我教的是教 AI 的人。Adaptig 聯合創辦人兼學院總監 '}
              <a href="https://adaptig.ai" target="_blank" rel="noopener noreferrer">Adaptig</a>
              。
            </p>
          ) : (
            <p className="footer-bio">
              {'I train the people who train AI. Co-Founder & Director of Academy at '}
              <a href="https://adaptig.ai" target="_blank" rel="noopener noreferrer">Adaptig</a>
              .
            </p>
          )}
        </div>

        <div className="footer-col footer-links">
          <h4>{isZh ? '快速連結' : 'Quick Links'}</h4>
          <ul>
            {links.map((l) => (
              <li key={l.path}><Link to={l.path}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer-col footer-social">
          <h4>{isZh ? '聯繫' : 'Connect'}</h4>
          <ContactIcons />
          <p className="footer-email">
            <a href="mailto:sam@adaptig.com">sam@adaptig.com</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          {isZh
            ? `© ${new Date().getFullYear()} Sam Wong. 香港製造。`
            : `© ${new Date().getFullYear()} Sam Wong. Built in Hong Kong.`}
        </p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  language: PropTypes.string,
};

Footer.defaultProps = {
  language: undefined,
};

export default Footer;
