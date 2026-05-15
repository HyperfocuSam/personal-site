/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import App from '../App';

describe('renders the app', () => {
  const jsonMock = jest.fn(() => Promise.resolve({}));
  const textMock = jest.fn(() => Promise.resolve(''));
  global.fetch = jest.fn(() => Promise.resolve({
    json: jsonMock,
    text: textMock,
  }));
  window.scrollTo = jest.fn();

  let container;

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    await act(async () => {
      await ReactDOM.createRoot(container).render(<App />);
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
    jest.clearAllMocks();
  });

  it('should render the app', async () => {
    expect(document.body).toBeInTheDocument();
  });

  it('should render a Sam Wong title', async () => {
    // Title format has drifted over time ("Sam Wong | AI Training Specialist"
    // → "Sam Wong | AI Training Specialist - Hong Kong" etc.). Match on the
    // stable parts (Sam Wong + AI Training) instead of an exact string.
    expect(document.title).toMatch(/Sam Wong/);
    expect(document.title).toMatch(/AI Training/i);
  });

  // Navigation tests — use href-based selectors instead of :nth-child so
  // the tests don't break when the nav is reordered. Title assertions match
  // on the route name case-insensitively instead of exact strings.
  // Mirrors src/data/routes.js (non-index entries that render inside
  // `nav.links`). `/book` lives in its own `.nav-cta` block, not `nav.links`,
  // so it's covered by the CTA's own test surface rather than here.
  const navRoutes = [
    { path: '/about', titlePattern: /about/i },
    { path: '/services', titlePattern: /services/i },
    { path: '/blog', titlePattern: /blog/i },
    { path: '/contact', titlePattern: /contact/i },
  ];

  navRoutes.forEach(({ path, titlePattern }) => {
    it(`can navigate to ${path}`, async () => {
      expect.assertions(3);
      // Nav links render with trailing slash in the href
      const link = document.querySelector(
        `#header nav.links a[href="${path}/"], #header nav.links a[href="${path}"]`,
      );
      expect(link).toBeInTheDocument();
      await act(async () => {
        await link.click();
      });
      expect(document.title).toMatch(titlePattern);
      // Pathname may or may not have trailing slash depending on router config
      expect(window.location.pathname.replace(/\/$/, '')).toBe(path);
    });
  });
});
