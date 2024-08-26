import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/Sam.png`} alt="Sam Wong the AI Tutor" />
      </Link>
      <header>
        <h2>SAMUEL WONG</h2>
        <p>
          <a href="mailto:hyperfocusam@gmail.com">hyperfocusam@gmail.com</a>
        </p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>
        Hi, I&apos;m Sam. I am a{' '}
        <a href="https://www.cuhk.edu.hk/english/index.html">CUHK</a> Master of Arts in Public History graduate. Previously, I was the AI product specialist and AI team lead of <a href="https://renpho.com/">RENPHO</a>,
        executive assistant to business owner of <a href="https://faoschwarz.com/">FAO SCHWARZ</a>, and {' '}
        <a href="https://www.sharperimage.com/">SHARPER IMAGE.</a>
      </p>
      <ul className="actions">
        <li>
          {!window.location.pathname.includes('/resume') ? (
            <Link to="/resume" className="button">
              Learn More
            </Link>
          ) : (
            <Link to="/about" className="button">
              About Me
            </Link>
          )}
        </li>
      </ul>
    </section>

    <section id="footer">
      <ContactIcons />
      <p className="copyright">
        &copy; Michael D&apos;Angelo <Link to="/">mldangelo.com</Link>.
      </p>
    </section>
  </section>
);

export default SideBar;
