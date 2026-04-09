// Jest setup — loaded automatically by Create React App before any test runs.
// Mocks browser APIs that JSDOM does not implement so React components that
// query them at render time don't crash.

// matchMedia polyfill — required by ScrollReveal and any theme/media-query
// hook. Returns a non-matching stub for every query.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated but still referenced by some libs
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// IntersectionObserver polyfill — required by any lazy-load or scroll-reveal
// pattern that hooks into element visibility.
window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: jest.fn(() => []),
}));

// ResizeObserver polyfill — some UI libs call this at mount time.
window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
