import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';
import { LeadMagnetBanner } from '../LeadCapture';

const { PUBLIC_URL } = process.env;

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/Sam.png`} alt="Sam Wong - AI Training Specialist in Hong Kong" />
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
        AI Training Specialist helping enterprises and individuals adopt AI.{' '}
        Founding member of <a href="https://dotai.hk" target="_blank" rel="noopener noreferrer">DotAI</a>.{' '}
        Co-founder of <a href="https://adaptig.ai" target="_blank" rel="noopener noreferrer">Adaptig</a>.
        <br /><br />
        70+ enterprise clients. 10,000+ professionals trained.
        <br /><br />
        MA Public History from <a href="https://www.cuhk.edu.hk/english/index.html">CUHK</a>.
      </p>
      <ul className="actions">
        <li>
          {!window.location.pathname.includes('/services') ? (
            <Link to="/services" className="button">
              View Services
            </Link>
          ) : (
            <Link to="/about" className="button">
              About Me
            </Link>
          )}
        </li>
      </ul>
    </section>

    <LeadMagnetBanner variant="sidebar" />

    <section id="footer">
      <ContactIcons />
      <p className="copyright">
        &copy; Sam Wong <Link to="/">samwong.me</Link>
      </p>
    </section>
  </section>
);

export default SideBar;
