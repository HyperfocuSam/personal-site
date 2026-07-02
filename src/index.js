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
      hydrateRoot(rootElement, <StrictApp />);
    });
} else {
  const root = createRoot(rootElement);
  root.render(<StrictApp />);
}
