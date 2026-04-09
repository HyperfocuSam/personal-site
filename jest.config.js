const config = {
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest',
    '^.+\\.md$': 'markdown-to-jsx',
  },
  // Auto-load test environment mocks (matchMedia, IntersectionObserver,
  // ResizeObserver) before any test file runs. This project uses `npx jest`
  // directly instead of `react-scripts test`, so the CRA convention of
  // auto-loading src/setupTests.js does NOT apply — it must be wired here.
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};

module.exports = config;
