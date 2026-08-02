// Jest setup — loaded automatically by Create React App before any test runs.
// Mocks browser APIs that JSDOM does not implement so React components that
// query them at render time don't crash.
//
// These are PLAIN functions, not jest.fn(). Create React App ships
// `resetMocks: true` (react-scripts/scripts/utils/createJestConfig.js), which
// runs before EVERY test and strips `mockImplementation` off any jest.fn().
// A jest.fn()-based polyfill therefore returns `undefined` by the time a
// component calls it — which is exactly how `window.matchMedia(...).matches`
// started throwing "Cannot read properties of undefined". Plain functions
// survive the reset. Do not "modernise" these back into jest.fn().

const noop = () => {};

// matchMedia — required by ScrollReveal and any theme/media-query hook.
// Returns a non-matching stub for every query.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: noop, // deprecated but still referenced by some libs
    removeListener: noop, // deprecated
    addEventListener: noop,
    removeEventListener: noop,
    dispatchEvent: () => false,
  }),
});

// IntersectionObserver — required by any lazy-load or scroll-reveal pattern
// that hooks into element visibility. Constructor functions rather than
// classes: `new Fn()` returns the object literal, and the repo's eslint config
// allows only one class per file.
window.IntersectionObserver = function IntersectionObserverStub() {
  return {
    observe: noop,
    unobserve: noop,
    disconnect: noop,
    takeRecords: () => [],
  };
};

// ResizeObserver — some UI libs call this at mount time.
window.ResizeObserver = function ResizeObserverStub() {
  return {
    observe: noop,
    unobserve: noop,
    disconnect: noop,
  };
};
