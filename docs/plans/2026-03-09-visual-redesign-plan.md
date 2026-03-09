# Visual Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform hyperfocusam.com from a template-based developer portfolio into a premium thought-leader site through SCSS overhaul and layout restructuring.

**Architecture:** Rewrite SCSS design tokens, typography, layout, and components while preserving React component structure, routing, SEO configs, and react-snap pre-rendering. Kill the sidebar layout, introduce full-width section-based design with dark navigation and footer.

**Tech Stack:** React 18, SCSS (Skel-based), react-helmet-async, react-snap, Google Fonts (Inter, Noto Sans TC)

**Design Doc:** `docs/plans/2026-03-09-visual-redesign-design.md`

---

## Task 1: Update Design Tokens and Font Loading

**Files:**
- Modify: `src/static/css/libs/_vars.scss`
- Modify: `public/index.html:132-134` (font links)

**Step 1: Rewrite `_vars.scss` with new design system**

Replace the entire file contents with:

```scss
// Design System: hyperfocusam.com Visual Redesign
// Atmosphere: "Warm study at dusk"

// Misc.
$misc: (
  z-index-base: 10000,
);

// Duration.
$duration: (
  menu: 0.35s,
  transition: 0.25s,
);

// Size.
$size: (
  element-height: 2.75em,
  element-margin: 2em,
  section-spacing: 6rem,
  section-spacing-small: 3rem,
  menu: 20em,
  content-narrow: 720px,
  content-standard: 960px,
  content-wide: 1200px,
  nav-height: 64px,
  nav-height-small: 56px,
);

// Font.
$font: (
  family: (
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif,
  ),
  family-fixed: (
    "JetBrains Mono",
    "Courier New",
    monospace,
  ),
  family-heading: (
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif,
  ),
  family-chinese: (
    "Noto Sans TC",
    "Inter",
    -apple-system,
    sans-serif,
  ),
  weight: 400,
  weight-medium: 500,
  weight-bold: 600,
  weight-heading: 600,
  weight-heading-bold: 700,
  weight-heading-extrabold: 700,
  kerning-heading: -0.02em,
  kerning-meta: 0.08em,
);

// Palette — "Warm study at dusk"
$palette: (
  // Ink (primary dark)
  ink: #0f1729,
  ink-mid: #1e2a45,
  ink-light: #2d3b5e,

  // Amber (warm accent)
  amber: #c8965a,
  amber-light: #d4a96e,
  amber-subtle: rgba(200, 150, 90, 0.12),

  // Surfaces (layered depth)
  surface-base: #f6f4f0,
  surface-raised: #faf8f5,
  surface-overlay: #ffffff,
  surface-sunken: #edeae4,

  // Text
  text-primary: #1a1d2b,
  text-body: #3d3f4e,
  text-secondary: #6b6d7a,
  text-on-dark: #e8e6e1,
  text-on-dark-muted: #9a9ba8,

  // Borders
  border-subtle: #e5e2db,
  border-strong: #d0cdc5,

  // Shadows (navy-tinted)
  shadow-color: rgba(15, 23, 41, 0.08),

  // Legacy mappings (for Skel compatibility — avoids breaking functions that use old keys)
  bg: #f6f4f0,
  bg-alt: #f6f4f0,
  fg: #3d3f4e,
  fg-bold: #1a1d2b,
  fg-light: #6b6d7a,
  border: #e5e2db,
  border-bg: #edeae4,
  border-alt: #d0cdc5,
  accent: #c8965a,
);

// Shadows
$shadow: (
  sm: 0 1px 2px rgba(15, 23, 41, 0.05),
  md: 0 4px 12px rgba(15, 23, 41, 0.08),
  lg: 0 8px 24px rgba(15, 23, 41, 0.12),
);

// Border radius
$radius: (
  sm: 4px,
  md: 6px,
  lg: 8px,
  xl: 12px,
  full: 50%,
);
```

**Step 2: Update Google Fonts in `public/index.html`**

Find the font link at line ~134 and replace:

Old:
```html
<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700|Raleway:400,800,900&display=swap" rel="stylesheet" />
```

New:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;700&display=swap" rel="stylesheet" />
```

**Step 3: Verify build compiles**

Run: `cd /Users/sam/personal-site && npm run build 2>&1 | tail -5`
Expected: "Compiled" (warnings OK, no errors)

**Step 4: Commit**

```bash
git add src/static/css/libs/_vars.scss public/index.html
git commit -m "feat(redesign): update design tokens — ink/amber palette, Inter font, spacing scale"
```

---

## Task 2: Base Typography and Page Background

**Files:**
- Modify: `src/static/css/base/_typography.scss`
- Modify: `src/static/css/base/_page.scss`
- Create: `src/static/css/base/_textures.scss`
- Modify: `src/static/css/main.scss` (add textures import)

**Step 1: Rewrite `_typography.scss`**

Replace entire file with:

```scss
/* Typography — Inter-based system */

body,
input,
select,
textarea {
  color: _palette(text-body);
  font-family: _font(family);
  font-size: 17px;
  font-weight: _font(weight);
  line-height: 1.75;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @include breakpoint(small) {
    font-size: 16px;
  }
}

a {
  transition: color 0.25s ease, border-bottom-color 0.25s ease;
  border-bottom: 1px solid transparent;
  color: _palette(amber);
  text-decoration: none;

  &:hover {
    border-bottom-color: _palette(amber);
    color: _palette(amber-light) !important;
  }
}

strong,
b {
  color: _palette(text-primary);
  font-weight: _font(weight-bold);
}

em,
i {
  font-style: italic;
}

p {
  margin: 0 0 _size(element-margin) 0;
}

h1, h2, h3, h4, h5, h6 {
  color: _palette(text-primary);
  font-family: _font(family-heading);
  font-weight: _font(weight-heading-bold);
  letter-spacing: _font(kerning-heading);
  line-height: 1.3;
  margin: 0 0 (_size(element-margin) * 0.5) 0;
  text-transform: none; // Kill the all-caps

  a {
    color: inherit;
    border-bottom: 0;

    &:hover {
      color: _palette(amber) !important;
    }
  }
}

h1 {
  font-size: 2.5rem;

  @include breakpoint(small) {
    font-size: 1.85rem;
  }
}

h2 {
  font-size: 1.75rem;

  @include breakpoint(small) {
    font-size: 1.4rem;
  }
}

h3 {
  font-size: 1.35rem;
}

h4 {
  font-size: 1.1rem;
}

h5 {
  font-size: 1rem;
}

h6 {
  font-size: 0.9rem;
}

// Metadata / label style — the ONLY place we use uppercase
.meta-label {
  font-size: 0.8125rem;
  font-weight: _font(weight-medium);
  letter-spacing: _font(kerning-meta);
  text-transform: uppercase;
  color: _palette(text-secondary);
}

sub {
  font-size: 0.8em;
  position: relative;
  top: 0.5em;
}

sup {
  font-size: 0.8em;
  position: relative;
  top: -0.5em;
}

blockquote {
  border-left: 3px solid _palette(amber);
  background: _palette(surface-sunken);
  font-style: italic;
  margin: 0 0 _size(element-margin) 0;
  padding: 1.25em 1.5em;
  border-radius: 0 map-get($radius, lg) map-get($radius, lg) 0;
}

code {
  background: _palette(surface-sunken);
  border: solid 1px _palette(border-subtle);
  font-family: _font(family-fixed);
  font-size: 0.9em;
  margin: 0 0.25em;
  padding: 0.2em 0.5em;
  border-radius: map-get($radius, sm);
}

pre {
  -webkit-overflow-scrolling: touch;
  font-family: _font(family-fixed);
  font-size: 0.9em;
  margin: 0 0 _size(element-margin) 0;

  code {
    display: block;
    line-height: 1.75em;
    padding: 1em 1.5em;
    overflow-x: auto;
    border-radius: map-get($radius, lg);
  }
}

hr {
  border: 0;
  border-bottom: solid 1px _palette(border-subtle);
  margin: _size(element-margin) 0;

  &.major {
    margin: (_size(element-margin) * 1.5) 0;
  }
}

.align-left { text-align: left; }
.align-center { text-align: center; }
.align-right { text-align: right; }
```

**Step 2: Update `_page.scss`**

Replace entire file with:

```scss
/* Page base */

@-ms-viewport {
  width: device-width;
}

body {
  -ms-overflow-style: scrollbar;
  background-color: _palette(surface-base);

  &.is-loading {
    *, *:before, *:after {
      animation: none !important;
      transition: none !important;
    }
  }
}

@include breakpoint(xsmall) {
  html, body {
    min-width: 320px;
  }
}
```

**Step 3: Create `_textures.scss`**

Create new file `src/static/css/base/_textures.scss`:

```scss
/* Textures — grain overlay and gradient utilities */

// Subtle grain noise overlay on the page background
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

// Hero gradient
.hero-gradient {
  background: linear-gradient(135deg, _palette(ink) 0%, _palette(ink-mid) 50%, #172038 100%);
}

// Section band backgrounds
.section-base {
  background-color: _palette(surface-base);
}

.section-sunken {
  background-color: _palette(surface-sunken);
}

.section-dark {
  background-color: _palette(ink);
  color: _palette(text-on-dark);

  h1, h2, h3, h4, h5, h6, strong, b {
    color: _palette(text-on-dark);
  }

  p, li {
    color: _palette(text-on-dark-muted);
  }

  a {
    color: _palette(amber);

    &:hover {
      color: _palette(amber-light) !important;
    }
  }
}

// Content width containers
.content-narrow {
  max-width: _size(content-narrow);
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.content-standard {
  max-width: _size(content-standard);
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.content-wide {
  max-width: _size(content-wide);
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.full-bleed {
  width: 100%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

// Section vertical padding
.section-padding {
  padding-top: _size(section-spacing);
  padding-bottom: _size(section-spacing);

  @include breakpoint(small) {
    padding-top: _size(section-spacing-small);
    padding-bottom: _size(section-spacing-small);
  }
}
```

**Step 4: Add textures import to `main.scss`**

In `src/static/css/main.scss`, after line 40 (`@import "base/typography";`), add:

```scss
@import "base/textures";
```

**Step 5: Verify build**

Run: `cd /Users/sam/personal-site && npm run build 2>&1 | tail -5`
Expected: Compiled successfully

**Step 6: Commit**

```bash
git add src/static/css/base/_typography.scss src/static/css/base/_page.scss src/static/css/base/_textures.scss src/static/css/main.scss
git commit -m "feat(redesign): rewrite typography — Inter, normal-case headings, warm surfaces, textures"
```

---

## Task 3: Layout — Kill Sidebar, New Wrapper

**Files:**
- Modify: `src/static/css/layout/_wrapper.scss`
- Modify: `src/static/css/layout/_sidebar.scss`
- Modify: `src/static/css/layout/_main.scss`
- Modify: `src/layouts/Main.js`

**Step 1: Rewrite `_wrapper.scss`**

Replace entire file with:

```scss
/* Wrapper — full-width section-based layout */

#wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: opacity 0.35s ease;
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;

  body.is-menu-visible & {
    opacity: 0.15;
  }
}
```

**Step 2: Gut `_sidebar.scss`**

Replace entire file with:

```scss
/* Sidebar — removed in redesign. File kept for SCSS import compatibility. */

#sidebar {
  display: none;
}
```

**Step 3: Rewrite `_main.scss`**

Replace entire file with:

```scss
/* Main content area */

#main {
  flex: 1;
  width: 100%;

  > article {
    width: 100%;
  }

  // Default article content gets standard width
  > article > *:not(.full-bleed):not(.section-sunken):not(.section-dark):not(.hero-gradient) {
    max-width: _size(content-wide);
    margin-left: auto;
    margin-right: auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  // Post/page header
  > article > header {
    max-width: 100%;
    padding: 0;
  }
}

// Markdown content in articles (about, blog posts)
.post.markdown {
  > section,
  > p,
  > ul,
  > ol {
    max-width: _size(content-narrow);
    margin-left: auto;
    margin-right: auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
```

**Step 4: Modify `Main.js` — remove SideBar, add Footer placeholder**

In `src/layouts/Main.js`:

Remove the SideBar import (line 7):
```js
// Remove: import SideBar from '../components/Template/SideBar';
```

Replace line 47 (`{props.fullPage ? null : <SideBar />}`) with:
```jsx
{/* Footer will be added in Task 5 */}
```

**Step 5: Verify build and check visually**

Run: `cd /Users/sam/personal-site && npm run build 2>&1 | tail -5`
Expected: Compiled (may have unused import warnings — that's fine)

**Step 6: Commit**

```bash
git add src/static/css/layout/_wrapper.scss src/static/css/layout/_sidebar.scss src/static/css/layout/_main.scss src/layouts/Main.js
git commit -m "feat(redesign): kill sidebar layout — full-width wrapper, hide sidebar"
```

---

## Task 4: Navigation — Dark Sticky Header

**Files:**
- Modify: `src/static/css/layout/_header.scss`
- Modify: `src/components/Template/Navigation.js`
- Modify: `src/components/Template/Hamburger.js`
- Modify: `src/static/css/components/_hamburger.scss`

**Step 1: Rewrite `_header.scss`**

Replace entire file with the new dark nav styling. This is a full rewrite — see design doc for nav specs: ink background, 64px height, sticky, amber active underlines, backdrop-filter on scroll.

The complete SCSS is long (~180 lines) — implement as specified in the design doc: `ink` bg, Inter font, amber underline for active, proper mobile hamburger panel.

**Step 2: Update `Navigation.js`**

Add `useLocation` hook to detect active page. Add `className="active"` to the link matching current pathname. Add a scroll listener to toggle a `scrolled` class on the header for the backdrop-filter effect.

**Step 3: Update `Hamburger.js`**

Replace the text "☰" hamburger with a proper three-bar animated hamburger using CSS. The bars should animate to an X when the menu is open.

**Step 4: Verify build and check in browser**

Run: `cd /Users/sam/personal-site && PORT=3456 npm start &`
Navigate to `http://localhost:3456` — confirm dark nav bar renders, links are visible, hamburger works on mobile viewport.

**Step 5: Commit**

```bash
git add src/static/css/layout/_header.scss src/components/Template/Navigation.js src/components/Template/Hamburger.js src/static/css/components/_hamburger.scss
git commit -m "feat(redesign): dark sticky navigation — ink bg, amber active states, animated hamburger"
```

---

## Task 5: Footer Component

**Files:**
- Create: `src/components/Template/Footer.js`
- Modify: `src/static/css/layout/_footer.scss`
- Modify: `src/layouts/Main.js` (wire up Footer)

**Step 1: Create `Footer.js`**

Three-column footer on ink background:
- Column 1: "Sam Wong" heading, "AI adoption that sticks." tagline, brief bio paragraph
- Column 2: Quick links — Services, About, Blog, Media, Clients, Contact (using react-router `Link`)
- Column 3: Social icons (reuse `ContactIcons`), email link
- Bottom bar: copyright + "Built in Hong Kong"

**Step 2: Rewrite `_footer.scss`**

Full-width ink background footer with three-column CSS grid, responsive to single column on mobile. `text-on-dark` and `text-on-dark-muted` for text. Subtle `amber-subtle` top border.

**Step 3: Wire into `Main.js`**

Import Footer and render it after `#main`:
```jsx
import Footer from '../components/Template/Footer';
// ...
<div id="main">{props.children}</div>
<Footer />
```

**Step 4: Verify build and visual check**

**Step 5: Commit**

```bash
git add src/components/Template/Footer.js src/static/css/layout/_footer.scss src/layouts/Main.js
git commit -m "feat(redesign): three-column dark footer — replaces sidebar"
```

---

## Task 6: Button System and Card System

**Files:**
- Modify: `src/static/css/components/_button.scss`
- Create: `src/static/css/components/_card.scss`
- Modify: `src/static/css/main.scss` (add card import)

**Step 1: Rewrite `_button.scss`**

Three-tier button system: `.button` (primary — ink bg), `.button-secondary` (outlined), `.button-ghost` (text only, amber). All with proper hover transitions.

**Step 2: Create `_card.scss`**

Unified card system: `.card` class with surface-raised bg, border-subtle, shadow-sm, 8px radius, 24px padding, hover lift.

**Step 3: Add card import to `main.scss`**

After the button import, add: `@import "components/card";`

**Step 4: Verify build**

**Step 5: Commit**

```bash
git add src/static/css/components/_button.scss src/static/css/components/_card.scss src/static/css/main.scss
git commit -m "feat(redesign): button tiers + card system — primary/secondary/ghost buttons, unified cards"
```

---

## Task 7: Testimonials, Stats, and Section Components

**Files:**
- Modify: `src/static/css/components/_testimonials.scss`
- Create: `src/static/css/components/_stats.scss`
- Modify: `src/static/css/components/_section.scss`
- Modify: `src/static/css/components/_box.scss`
- Modify: `src/static/css/components/_email-capture.scss`
- Modify: `src/static/css/main.scss` (add stats import)

**Step 1: Rewrite `_testimonials.scss`**

New testimonial block: surface-sunken band, large amber curly quote mark, italic quote text at 18px, attribution with name in 600 weight.

**Step 2: Create `_stats.scss`**

Stats component: numbers in Inter 700 36px amber, labels in uppercase metadata style, 4-across desktop / 2x2 mobile grid.

**Step 3: Update `_section.scss`**

Section rhythm classes: `.section-base`, `.section-sunken`, `.section-dark` with proper padding.

**Step 4: Update `_box.scss`**

Replace the thin-bordered box with the new card-style treatment.

**Step 5: Rewrite `_email-capture.scss`**

Dark ink band with amber subscribe button, input on surface-overlay.

**Step 6: Add stats import to `main.scss`**

**Step 7: Verify build**

**Step 8: Commit**

```bash
git add src/static/css/components/_testimonials.scss src/static/css/components/_stats.scss src/static/css/components/_section.scss src/static/css/components/_box.scss src/static/css/components/_email-capture.scss src/static/css/main.scss
git commit -m "feat(redesign): testimonial blocks, stats component, section rhythm, email capture"
```

---

## Task 8: Homepage Restructure

**Files:**
- Modify: `src/pages/Index.js`
- Create: `src/components/Home/HeroSection.js`
- Create: `src/components/Home/StatsBar.js`
- Modify: `src/components/Home/FeaturedCaseStudies.js`
- Modify: `src/components/Home/RevenuePathCTA.js`
- Modify: `src/static/css/pages/_home.scss`

**Step 1: Create `HeroSection.js`**

Full-bleed ink gradient hero with:
- Left: headline, subtitle, two CTA buttons
- Right: professional photo with amber radial glow
- CSS class `hero-gradient` for the background

**Step 2: Create `StatsBar.js`**

Floating stat cards component using the stats SCSS. Four stats: 10,000+ Professionals Trained, 6 Sectors, 13 Countries Reached, 9.2/10 Avg. Satisfaction.

**Step 3: Restructure `Index.js`**

Reorder homepage sections per design doc: Hero -> Stats -> Trusted By Leaders -> What I Actually Do -> Featured Case Studies -> Where I Work -> Start Here -> Newsletter -> Footer. Wrap each section in appropriate section classes (`.section-base`, `.section-sunken`, `.section-dark`).

**Step 4: Rewrite `_home.scss`**

Hero layout (two-column flex), stats bar positioning, section band backgrounds, responsive breakpoints.

**Step 5: Visual check via Playwright**

**Step 6: Commit**

```bash
git add src/pages/Index.js src/components/Home/HeroSection.js src/components/Home/StatsBar.js src/components/Home/FeaturedCaseStudies.js src/components/Home/RevenuePathCTA.js src/static/css/pages/_home.scss
git commit -m "feat(redesign): homepage — hero section, floating stats, section bands"
```

---

## Task 9: About Page

**Files:**
- Modify: `src/pages/About.js`
- Modify relevant SCSS if needed

**Step 1: Restructure About.js**

- Add dark hero section with heading + subtitle
- Wrap prose in `content-narrow` container
- Convert "What I Believe" to 2x2 card grid on `section-sunken`
- Wrap testimonials in `section-sunken` band
- Add dark CTA band at bottom

**Step 2: Verify all SEO/Helmet configs preserved**

**Step 3: Commit**

```bash
git add src/pages/About.js
git commit -m "feat(redesign): about page — dark hero, card principles, CTA band"
```

---

## Task 10: Services Page

**Files:**
- Modify: `src/pages/Services.js`
- Modify: `src/components/Services/ServiceGroup.js`

**Step 1: Add dark hero with anchor pill buttons**

**Step 2: Wrap service groups in alternating section bands**

Organizations on `section-base`, Individuals on `section-sunken`, Trainers on `section-base`. Premium coaching tier gets amber top border accent.

**Step 3: Verify anchor scroll behavior still works**

**Step 4: Commit**

```bash
git add src/pages/Services.js src/components/Services/ServiceGroup.js
git commit -m "feat(redesign): services page — dark hero, section bands, coaching tier cards"
```

---

## Task 11: Blog and Blog Post Pages

**Files:**
- Modify: `src/pages/Blog.js`
- Modify: `src/pages/Post.js`
- Modify: `src/static/css/pages/_blog.scss`
- Modify: `src/static/css/components/_post.scss`
- Modify: `src/static/css/components/_mini-post.scss`
- Modify: `src/components/Blog/AuthorCard.js`

**Step 1: Blog listing — dark compact hero, featured post card, grid cards**

**Step 2: Blog post — category pill, proper heading typography, content-narrow body, amber blockquotes**

**Step 3: Update post card styling for the new card system**

**Step 4: Update author card with new design system colors**

**Step 5: Verify bilingual posts (Chinese) render correctly**

**Step 6: Commit**

```bash
git add src/pages/Blog.js src/pages/Post.js src/static/css/pages/_blog.scss src/static/css/components/_post.scss src/static/css/components/_mini-post.scss src/components/Blog/AuthorCard.js
git commit -m "feat(redesign): blog pages — dark hero, card grid, editorial post layout"
```

---

## Task 12: Media, Clients, Contact Pages

**Files:**
- Modify: `src/pages/Media.js`
- Modify: `src/pages/Clients.js`
- Modify: `src/pages/Contact.js`
- Modify: `src/static/css/components/_form.scss`

**Step 1: Media — card containers for episodes, amber timestamps, dark CTA band**

**Step 2: Clients — dark hero, client name/logo section on surface-sunken, case study grid**

**Step 3: Contact — dark hero, restyled form (surface-overlay inputs, amber focus ring), supporting info on surface-sunken**

**Step 4: Rewrite `_form.scss`** for new input styling

**Step 5: Commit**

```bash
git add src/pages/Media.js src/pages/Clients.js src/pages/Contact.js src/static/css/components/_form.scss
git commit -m "feat(redesign): media, clients, contact pages — dark heroes, card episodes, form styling"
```

---

## Task 13: Media Kit Color Token Update

**Files:**
- Modify: `src/pages/MediaKit.js`

**Step 1: Update inline color constants**

Replace:
```js
const NAVY = '#1a1f36';
```
with:
```js
const NAVY = '#0f1729';
```

Replace gold values to match `amber` (#c8965a). Update `TEXT_DARK`, `TEXT_MID`, `TEXT_LIGHT` to match new text tokens.

**Step 2: Update font references from Raleway to Inter where applicable**

Note: MediaKit uses inline styles so it's self-contained. Only update color values and font-family strings.

**Step 3: Commit**

```bash
git add src/pages/MediaKit.js
git commit -m "feat(redesign): media kit — update color tokens to ink/amber"
```

---

## Task 14: Chinese Pages, Resume, Projects, Stats, NotFound

**Files:**
- Modify: `src/pages/ZhIndex.js`, `src/pages/ZhAbout.js`, `src/pages/ZhServices.js`, `src/pages/ZhBlog.js`, `src/pages/ZhMedia.js`
- Modify: `src/pages/Resume.js`, `src/pages/Projects.js`, `src/pages/Stats.js`, `src/pages/NotFound.js`
- Modify: `src/static/css/pages/_resume.scss`, `src/static/css/pages/_stats.scss`

**Step 1: Chinese pages — mirror structural changes from English counterparts**

Each Zh page should get the same dark hero, section banding, and CTA band treatment. Add `font-family` override to Noto Sans TC via a `.zh-page` wrapper class or inline Helmet `<html lang="zh-Hant">`.

**Step 2: Resume — update to new typography/colors**

**Step 3: Projects — update cell styling to new card system**

**Step 4: Stats — already has noindex, just update colors**

**Step 5: NotFound — brief styling update**

**Step 6: Commit**

```bash
git add src/pages/Zh*.js src/pages/Resume.js src/pages/Projects.js src/pages/Stats.js src/pages/NotFound.js src/static/css/pages/_resume.scss src/static/css/pages/_stats.scss
git commit -m "feat(redesign): Chinese pages, resume, projects, stats — design system alignment"
```

---

## Task 15: Remaining SCSS Cleanup

**Files:**
- Modify: `src/static/css/components/_image.scss`
- Modify: `src/static/css/components/_list.scss`
- Modify: `src/static/css/components/_icon.scss`
- Modify: `src/static/css/components/_blurb.scss`
- Modify: `src/static/css/components/_table.scss`
- Modify: `src/static/css/components/_author.scss`
- Modify: `src/static/css/components/_markdown.scss`
- Modify: `src/static/css/layout/_intro.scss`
- Modify: `src/static/css/layout/_menu.scss`
- Modify: `src/static/css/pages/_skills.scss`
- Modify: `src/static/css/pages/_contact.scss`
- Modify: `src/static/css/pages/_notFound.scss`

**Step 1: Scan all remaining SCSS files for hardcoded old colors, Raleway references, and uppercase heading patterns**

Replace any remaining:
- `_palette(bg)` usages that should use surface tokens
- Explicit `text-transform: uppercase` on headings
- `font-family: "Raleway"` references
- Old shadow/border patterns

**Step 2: Update `_menu.scss` for the new mobile slide-in menu**

Dark ink background, amber active states, Inter font.

**Step 3: Update `_intro.scss`**

The intro section was part of the sidebar. Either gut it or repurpose for footer.

**Step 4: Verify full build**

Run: `cd /Users/sam/personal-site && npm run build 2>&1 | tail -5`
Expected: Compiled successfully

**Step 5: Commit**

```bash
git add src/static/css/
git commit -m "feat(redesign): SCSS cleanup — remove all template-era patterns"
```

---

## Task 16: Visual Verification and Polish

**Files:** Any files needing adjustment based on visual review.

**Step 1: Start dev server and take Playwright screenshots of all pages**

Pages to verify:
- Homepage (desktop + mobile)
- About
- Services
- Blog (listing + individual post)
- Media
- Media Kit
- Clients
- Contact
- A Chinese page (ZhIndex)
- Resume

**Step 2: Check WCAG AA contrast ratios**

Critical pairs to verify:
- `amber` (#c8965a) on `ink` (#0f1729) — must be >= 4.5:1
- `text-body` (#3d3f4e) on `surface-base` (#f6f4f0) — must be >= 4.5:1
- `text-on-dark` (#e8e6e1) on `ink` (#0f1729) — must be >= 4.5:1

**Step 3: Fix any visual issues found**

Common things to look for: orphaned all-caps headings, broken spacing, misaligned content widths, mobile nav not working, footer rendering issues.

**Step 4: Final build check**

Run: `cd /Users/sam/personal-site && npm run build 2>&1 | tail -5`

**Step 5: Run react-snap to verify pre-rendering still works**

The build script should include react-snap. Verify `build/` directory has pre-rendered HTML files.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat(redesign): visual polish and accessibility fixes"
```

---

## Summary

| Task | Description | Key Files |
|------|-------------|-----------|
| 1 | Design tokens + fonts | `_vars.scss`, `index.html` |
| 2 | Typography + page base + textures | `_typography.scss`, `_page.scss`, `_textures.scss` |
| 3 | Kill sidebar, new wrapper | `_wrapper.scss`, `_sidebar.scss`, `_main.scss`, `Main.js` |
| 4 | Dark sticky navigation | `_header.scss`, `Navigation.js`, `Hamburger.js` |
| 5 | Footer component | `Footer.js`, `_footer.scss`, `Main.js` |
| 6 | Buttons + cards | `_button.scss`, `_card.scss` |
| 7 | Testimonials, stats, sections | `_testimonials.scss`, `_stats.scss`, `_section.scss` |
| 8 | Homepage restructure | `Index.js`, `HeroSection.js`, `StatsBar.js`, `_home.scss` |
| 9 | About page | `About.js` |
| 10 | Services page | `Services.js`, `ServiceGroup.js` |
| 11 | Blog + blog post | `Blog.js`, `Post.js`, `_blog.scss`, `_post.scss` |
| 12 | Media, clients, contact | `Media.js`, `Clients.js`, `Contact.js`, `_form.scss` |
| 13 | Media Kit tokens | `MediaKit.js` |
| 14 | Chinese pages + remaining pages | `Zh*.js`, `Resume.js`, `Projects.js` |
| 15 | SCSS cleanup | All remaining SCSS files |
| 16 | Visual verification + polish | Screenshot review, contrast checks |
