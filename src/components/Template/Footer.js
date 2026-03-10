import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const Footer = () => (
  <footer id="site-footer">
    <div className="footer-inner">
      <div className="footer-col footer-brand">
        <h3>Sam Wong</h3>
        <p className="footer-tagline">AI adoption that sticks.</p>
        <p className="footer-bio">
          AI Training Specialist helping enterprises and individuals adopt AI.
          {' '}Founding member of{' '}
          <a href="https://dotai.hk" target="_blank" rel="noopener noreferrer">DotAI</a>.
          {' '}Co-founder of{' '}
          <a href="https://adaptig.ai" target="_blank" rel="noopener noreferrer">Adaptig</a>.
        </p>
      </div>

      <div className="footer-col footer-links">
        <h4>Quick Links</h4>
        <ul>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/media">Media</Link></li>
          <li><Link to="/clients">Clients</Link></li>
          <li><Link to="/testimonials">Testimonials</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      <div className="footer-col footer-social">
        <h4>Connect</h4>
        <ContactIcons />
        <p className="footer-email">
          <a href="mailto:sam@adaptig.com">sam@adaptig.com</a>
        </p>
      </div>
    </div>

    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} Sam Wong. Built in Hong Kong.</p>
    </div>
  </footer>
);

export default Footer;
