# AGENTS.md — hyperfocusam.com Personal Site

## Project Overview

React personal website for Sam Wong (hyperfocusam.com). Deployed to GitHub Pages from the `main` branch via GitHub Actions (`.github/workflows/github-pages.yml`). No TypeScript — JavaScript only. Uses react-snap for static pre-rendering.

## Commands

- **Dev server:** `npm start`
- **Build:** `npm run build` (runs `prebuild` scripts for sitemap + llms.txt, then `react-scripts build`)
- **Deploy:** push to `main` → GitHub Actions runs `npm run predeploy` (build + react-snap, wrapped in a 5x retry for react-snap flakiness) and publishes to GitHub Pages. (The local `npm run deploy` gh-pages script is legacy, not the live path.)
- **Lint:** `npm run lint`
- **Test:** `npm test`
- **Optimize images:** `npm run optimize-images`

## Architecture

- **Framework:** React 18 with Create React App (react-scripts 5)
- **Routing:** react-router-dom v6 (BrowserRouter)
- **Styling:** SCSS (`src/static/css/main.scss`), Sass compiler
- **Icons:** FontAwesome via `@fortawesome/react-fontawesome`
- **Pre-rendering:** react-snap (runs at predeploy, config in package.json `reactSnap`)
- **SEO:** react-helmet-async, auto-generated sitemap and llms.txt via prebuild scripts
- **Dates:** dayjs
- **Markdown:** markdown-to-jsx (used for blog posts and about page)
- **i18n:** Separate `Zh*` page components for Traditional Chinese (`/zh/*` routes)

## Directory Structure

```
src/
├── App.js              # Route definitions (all pages lazy-loaded)
├── index.js            # Entry point
├── components/         # Reusable UI components (Blog/, Contact/, Home/, Resume/, etc.)
├── data/               # Content and config data
│   ├── posts/          # Blog post markdown files
│   ├── resume/         # Resume section data
│   ├── stats/          # Stats data
│   ├── routes.js       # Navigation route config
│   ├── seo.js          # SEO metadata
│   └── *.js            # Other data files (services, projects, testimonials, contact)
├── layouts/Main.js     # Main layout wrapper (nav, footer, helmet)
├── pages/              # Page-level components (one per route)
└── static/             # Static assets (CSS, images)
scripts/                # Build-time scripts (sitemap, llms.txt, image optimization)
public/                 # CRA public directory
```

## Code Conventions

- **JavaScript only** — no TypeScript.
- **ESLint:** Airbnb config with `@babel/eslint-parser`. Run `npm run lint` before committing.
- **Components:** Arrow function components (`const Foo = () => ...`). Enforced by eslint rule `react/function-component-definition`.
- **Prop validation:** `prop-types` package (not TypeScript).
- **File naming:** PascalCase for components/pages, camelCase for data files.
- **Lazy loading:** All page components are lazy-loaded in `App.js` via `React.lazy()`.
- **Data-driven content:** Site content lives in `src/data/` — edit data files rather than hardcoding into components.
- **Chinese pages:** Prefixed with `Zh` (e.g., `ZhAbout.js`) and routed under `/zh/*`.

## Deployment

- **Platform:** GitHub Pages, deployed from `main` via GitHub Actions (`.github/workflows/github-pages.yml`)
- **Trigger:** every push to `main` (or manual `workflow_dispatch`) runs `retry npm run predeploy` (5x retry) then `actions/deploy-pages`
- **Config:** `vercel.json` is NOT honored on GitHub Pages — it only applies if the site moves to Vercel. GitHub Pages serves no custom HTTP headers, so security headers (HSTS/X-Frame-Options/Permissions-Policy) would require fronting the site with Cloudflare.
- **Pre-rendering:** react-snap generates static HTML at build time (configured in package.json under `reactSnap`; any route not reachable by link-crawl must be added to `reactSnap.include` or it 404s)
- **Node:** >=16.x required

## Testing

- **Framework:** Jest with `@testing-library/react`
- **Config:** `jest.config.js` and `babel.config.js` at project root
- **Run:** `npm test`
- **Location:** `src/__tests__/`
