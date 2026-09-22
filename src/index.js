import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App, { preloadRouteChunk } from './App';

// See https://reactjs.org/docs/strict-mode.html
const StrictApp = () => (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const rootElement = document.getElementById('root');

// hydrate is required by react-snap. The current route's lazy chunk MUST be
// preloaded first: hydrating while the chunk is pending renders the Suspense
// fallback against the fully-baked HTML and fails hydration on every route
// (React #418/#423). See lazyRoute/preloadRouteChunk in App.js.
if (rootElement.hasChildNodes()) {
  preloadRouteChunk(window.location.pathname)
    .catch(() => {}) // hydrate anyway; worst case is the old fallback path
    .then(() => {
      hydrateRoot(rootElement, <StrictApp />, {
        // React 18 reports a RECOVERABLE hydration error (#418 text mismatch,
        // #423 fell back to client render) through `reportError()` when the
        // browser has it. That surfaces in DevTools/puppeteer as an UNCAUGHT
        // page error, and react-snap treats any `pageerror` as fatal: it sets
        // shuttingDown and silently drops every route still in the queue. On
        // the 2019 Chromium react-snap bundles there is no `reportError`, so
        // React fell back to console.error and the crawl survived; on any
        // modern Chrome the same recoverable error aborts the prerender after
        // ~10 routes. Handling it here keeps the report (as a warning) without
        // raising a global error. It does not hide anything: React still
        // discards the mismatched server HTML and re-renders on the client.
        onRecoverableError: (error, errorInfo) => {
          // eslint-disable-next-line no-console
          console.warn('[hydration] recoverable error', error, errorInfo);
        },
      });
    });
} else {
  const root = createRoot(rootElement);
  root.render(<StrictApp />);
}
