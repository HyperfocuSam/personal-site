import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';
import OptimizedImage from './OptimizedImage';

const { PUBLIC_URL } = process.env;

const SideBar = () => {
  const { pathname } = useLocation();
  const cta = (() => {
    if (pathname.startsWith('/services')) {
      return { label: 'Get in Touch', path: '/contact' };
    }
    if (pathname.startsWith('/contact')) {
      return { label: 'About Me', path: '/about' };
    }
    return { label: 'View Services', path: '/services' };
  })();

  return (
    <section id="sidebar">
      <section id="intro">
        <Link to="/" className="logo">
          <OptimizedImage src={`${PUBLIC_URL}/images/Sam.png`} alt="Sam Wong - Co-Founder & AI Train-the-Trainer in Hong Kong" />
        </Link>
        <header>
          <h2>SAM WONG</h2>
          <p>
            <a href="mailto:sam@adaptig.com">sam@adaptig.com</a>
          </p>
        </header>
      </section>

      <section className="blurb">
        <h2>About</h2>
        <p>
          Co-Founder & Director of Academy at Adaptig. I train the people who train AI.{' '}
          Co-founder of <a href="https://adaptig.ai" target="_blank" rel="noopener noreferrer">Adaptig</a>.
          <br /><br />
          70+ enterprise clients. 10,000+ professionals trained.
          <br /><br />
          MA Public History from <a href="https://www.cuhk.edu.hk/english/index.html">CUHK</a>.
        </p>
        <ul className="actions">
          <li>
            <Link to={cta.path} className="button">
              {cta.label}
            </Link>
          </li>
        </ul>
      </section>

      <section id="footer">
        <ContactIcons />
        <p className="copyright">
          &copy; Sam Wong <a href="https://hyperfocusam.com">hyperfocusam.com</a>
        </p>
      </section>
    </section>
  );
};

export default SideBar;
