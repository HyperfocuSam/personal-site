import React, { useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import Menu from 'react-burger-menu/lib/menus/slide';
import { routesFor } from '../../data/routes';

// Menu is imported EAGERLY on purpose. It used to be React.lazy-loaded, but
// the nav renders on every page: during hydration the pending chunk swapped
// in the Suspense fallback, mismatched the react-snap HTML, and forced every
// route into client re-rendering (React #418/#423). The chunk was ~12KB —
// not worth a sitewide hydration failure.

const Hamburger = () => {
  const [open, setOpen] = useState(false);
  // Mobile carries the Hong Kong audience — 131 of 429 sessions, and the 172
  // visitors who arrived from a Cantonese YouTube show landed here first. The
  // burger menu must speak the same language as the page behind it.
  const routes = routesFor(useLocation().pathname);

  return (
    <div className="hamburger-container">
      <nav className="main" id="hambuger-nav">
        <ul>
          <li className={`menu ${open ? 'close-menu' : 'open-menu'}`}>
            <div
              onClick={() => setOpen(!open)}
              className={`hamburger-btn ${open ? 'is-open' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={open ? 'Close menu' : 'Open menu'}
              onKeyDown={(e) => { if (e.key === 'Enter') setOpen(!open); }}
            >
              <span className="hamburger-bar" />
              <span className="hamburger-bar" />
              <span className="hamburger-bar" />
            </div>
          </li>
        </ul>
      </nav>
      <Menu right isOpen={open}>
        <ul className="hamburger-ul">
          {routes.map((l) => (
            <li key={l.label}>
              {l.path.startsWith('http') ? (
                <a
                  href={l.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  <h3 className={l.index ? 'index-li' : undefined}>{l.label}</h3>
                </a>
              ) : (
                <Link to={l.path} onClick={() => setOpen(false)}>
                  <h3 className={l.index ? 'index-li' : undefined}>{l.label}</h3>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </Menu>
    </div>
  );
};

export default Hamburger;
