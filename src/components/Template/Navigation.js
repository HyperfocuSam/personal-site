import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Hamburger from './Hamburger';
import routes from '../../data/routes';

const Navigation = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

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
    <header id="header" className={scrolled ? 'scrolled' : ''} role="banner">
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
      <div className="nav-cta">
        <Link to="/book">Book a Call</Link>
      </div>
      <Hamburger />
    </header>
  );
};

export default Navigation;
