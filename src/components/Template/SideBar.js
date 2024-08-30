import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/Sam.png`} alt="Sam Wong, tutor of AI in Hong Kong" />
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
      <p> A lifelong learner. Diagnosed with ADHD. I am a history enthusiast and a {' '}
        Master of Arts in Public History graduate from <a href="https://www.cuhk.edu.hk/english/index.html">CUHK</a>. I am also an AI enthusiast and a private tutor of AI. <br /><br />
        Previously, I was the AI Product Specialist and AI Lead at <a href="https://renpho.com/">RENPHO</a>. Before my journey into AI, I served as the Executive Assistant to business owners of international brands, including <a href="https://faoschwarz.com/">FAO SCHWARZ</a>, and {' '}
        <a href="https://www.sharperimage.com/">SHARPER IMAGE</a>, and RENPHO.
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
        &copy; SAMUEL WONG <Link to="/">hyperfocusam.com</Link>.
      </p>
    </section>
  </section>
);

export default SideBar;
