import React, { Suspense, lazy, useState } from 'react';

import { Link } from 'react-router-dom';
import routes from '../../data/routes';

const Menu = lazy(() => import('react-burger-menu/lib/menus/slide'));

const Hamburger = () => {
  const [open, setOpen] = useState(false);

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
      <Suspense fallback={<></>}>
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
      </Suspense>
    </div>
  );
};

export default Hamburger;
