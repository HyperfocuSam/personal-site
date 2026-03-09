# Visual Redesign: hyperfocusam.com

**Date:** 2026-03-09
**Status:** Approved
**Approach:** SCSS Overhaul (Approach A) — rewrite styling and restructure layout while preserving React components, routing, SEO, and react-snap pre-rendering.

---

## Design Direction

**B/C blend:** Thought leader with modern creative execution. The site should feel like a personality-driven professional who fills rooms and whose ideas spread, executed with the visual taste of a modern creative professional. Reference sites: Sahil Lavingia, Julie Zhuo, Ali Abdaal.

**Atmosphere:** "Warm study at dusk" — deep navy sections feel like evening, warm parchment sections feel like aged paper under lamplight, amber accents feel like brass fixtures.

---

## Design System

### Color Palette

**Primary (Ink)**
| Token | Value | Usage |
|-------|-------|-------|
| `ink` | `#0f1729` | Deepest navy. Hero backgrounds, footer, nav |
| `ink-mid` | `#1e2a45` | Card overlays on dark sections, gradient midpoints |
| `ink-light` | `#2d3b5e` | Hover states on dark surfaces |

**Warm Accent**
| Token | Value | Usage |
|-------|-------|-------|
| `amber` | `#c8965a` | Primary accent. Links, testimonial accents, stat highlights, active nav |
| `amber-light` | `#d4a96e` | Hover/glow states |
| `amber-subtle` | `rgba(200, 150, 90, 0.12)` | Background tint for accent boxes |

**Surfaces (layered depth system)**
| Token | Value | Usage |
|-------|-------|-------|
| `surface-base` | `#f6f4f0` | Page background. Warm parchment |
| `surface-raised` | `#faf8f5` | Cards, floating content areas |
| `surface-overlay` | `#ffffff` | Form inputs, dropdowns, highest elevation |
| `surface-sunken` | `#edeae4` | Recessed areas, alternate section bands |

**Text**
| Token | Value | Usage |
|-------|-------|-------|
| `text-primary` | `#1a1d2b` | Headings |
| `text-body` | `#3d3f4e` | Body copy |
| `text-secondary` | `#6b6d7a` | Dates, metadata |
| `text-on-dark` | `#e8e6e1` | Text on ink backgrounds |
| `text-on-dark-muted` | `#9a9ba8` | Secondary text on dark backgrounds |

**Borders**
| Token | Value | Usage |
|-------|-------|-------|
| `border-subtle` | `#e5e2db` | Card borders, section dividers |
| `border-strong` | `#d0cdc5` | Emphasis borders, form focus |

**Texture layer:**
- Subtle CSS noise grain overlay on `surface-base` at 0.03-0.05 opacity
- Hero gradients: `linear-gradient(135deg, #0f1729 0%, #1e2a45 50%, #172038 100%)`
- Warm shadows using `rgba(15, 23, 41, 0.08)` (navy-tinted, not pure black)
- Alternating `surface-base` / `surface-sunken` bands for section rhythm

### Typography

Replace Raleway + Source Sans Pro with **Inter** (single family).

| Role | Weight | Size | Style |
|------|--------|------|-------|
| Page title / Hero | 700 | 44px desktop, 32px mobile | Normal case, -0.02em tracking |
| Section headings (h2) | 600 | 28px | Normal case |
| Sub-headings (h3, h4) | 600 | 22px / 18px | Normal case |
| Body text | 400 | 17px | 1.75 line-height |
| Metadata / labels | 500 | 13px | Uppercase, 0.08em tracking |
| Code | JetBrains Mono 400 | 15px | -- |

Add `"Noto Sans TC"` to font stack for Chinese pages.

**Uppercase rule:** Only for small labels and metadata (category tags, section overlines, stat labels). Never for headings.

### Spacing (8px grid)

`xs`: 4px, `sm`: 8px, `md`: 16px, `lg`: 24px, `xl`: 32px, `2xl`: 48px, `3xl`: 64px, `4xl`: 96px, `section`: 96px

### Border Radius

Cards: 8px, Buttons: 6px, Small avatars: 50%, Large photos: 12px, Inputs: 6px

### Shadows (warm, navy-tinted)

- `shadow-sm`: `0 1px 2px rgba(15, 23, 41, 0.05)`
- `shadow-md`: `0 4px 12px rgba(15, 23, 41, 0.08)`
- `shadow-lg`: `0 8px 24px rgba(15, 23, 41, 0.12)`

---

## Layout Architecture

### Structural Change

**Kill the sidebar.** Replace the `flex-direction: row-reverse` two-column layout with a full-width, section-based layout.

**Current:** `#wrapper > [Navigation + #main + SideBar]`
**New:** `#wrapper > [Navigation + #main + Footer]`

Remove `SideBar.js` component from `Main.js`. Create new `Footer.js` component.

### Navigation

- Full-width, `ink` background, sticky on scroll
- "Sam Wong" left (Inter 600, normal case), links right (Inter 400)
- Active page: `amber` underline (2px)
- On scroll: `backdrop-filter: blur(8px)`, subtle bottom shadow
- Mobile: animated hamburger icon, slide-in panel from right
- Height: 64px desktop, 56px mobile

### Content Width System

| Zone | Max-width | Usage |
|------|-----------|-------|
| `content-narrow` | 720px | Blog body, about prose |
| `content-standard` | 960px | Service cards, forms |
| `content-wide` | 1200px | Card grids, case studies |
| `full-bleed` | 100vw | Heroes, CTA bands, footer |

### Footer

Three-column layout on `ink` background:
1. Logo/name + tagline + brief bio
2. Quick links (Services, About, Blog, Media, Contact)
3. Social links + email

Bottom bar: copyright + "Built in Hong Kong". Subtle `amber-subtle` top border.

### Sidebar Content Redistribution

| Current sidebar element | New location |
|------------------------|--------------|
| Profile photo | Homepage hero (large), blog author card, footer (small) |
| Name + email | Navigation (name), footer (email) |
| About blurb | Footer column 1 |
| CTA button | Page-specific contextual CTAs |
| Social icons | Footer, contact page |
| Copyright | Footer bottom bar |

---

## Component System

### Buttons (3 tiers)

| Type | Appearance | Hover | Usage |
|------|-----------|-------|-------|
| Primary | `ink` bg, `text-on-dark` text, 6px radius | `amber` bg, `ink` text, 0.3s | Main CTA per page |
| Secondary | Transparent, `ink` 1.5px border | `ink` fill, `text-on-dark` text | Supporting actions |
| Ghost | No border, `amber` text | Subtle underline | Inline links |

### Cards

- `surface-raised` bg, `border-subtle` 1px, `shadow-sm` rest / `shadow-md` hover
- 8px radius, 24px padding
- `translateY(-2px)` lift on hover

### Testimonial Block

- `surface-sunken` background band
- Large decorative curly quote in `amber` at 48px
- Quote in Inter 400 italic, 18px
- Attribution: name Inter 600, title Inter 400 `text-secondary`

### Stats Component

- `surface-sunken` background, full content width
- Numbers: Inter 700, 36px, `amber`
- Labels: Inter 500, 13px, uppercase, `text-secondary`
- 4-across desktop, 2x2 mobile

### Section Rhythm

Alternating `surface-base` / `surface-sunken` bands replace explicit `<hr>` dividers:
```
[Hero -- ink/dark]
[Content -- surface-base]
[Social proof -- surface-sunken]
[Content -- surface-base]
[CTA band -- ink/dark]
[Footer -- ink/dark]
```

---

## Page Designs

### Homepage

1. **Hero** (full-bleed `ink` gradient): Large headline left ("I help organizations adopt AI in ways that actually stick."), professional photo right with subtle `amber` radial glow. Two CTAs. Stat bar floating at bottom edge, overlapping into next section.
2. **Trusted By Leaders** (surface-base): Overline label, featured testimonial, client logos/names row.
3. **What I Actually Do** (surface-sunken): Three service cards on `surface-raised`.
4. **Featured Case Studies** (surface-base): Three-card wide grid with blog post images.
5. **Where I Work** (surface-base): Adaptig + DotAI descriptions.
6. **Start Here** (surface-sunken): Three conversion path cards.
7. **Newsletter** (ink band): Email capture with `amber` subscribe button.
8. **Footer** (ink).

### About

1. **Hero** (ink, editorial): "About Me" heading + subtitle.
2. **Content** (surface-base, `content-narrow`): Professional photo near top. Prose sections with Inter 600 normal-case headings.
3. **What I Believe** (surface-sunken): Four principle cards, 2x2 grid.
4. **Testimonials** (surface-sunken band): Two testimonials side by side.
5. **CTA band** (ink): Service + Contact buttons.

### Services

1. **Hero** (ink): Heading, subtitle, three anchor pill buttons.
2. **For Organizations** (surface-base): Social proof line, three service cards, testimonial, CTA.
3. **For Individuals** (surface-sunken): Coaching tiers as three cards (Discovery/Standard/Premium). Premium gets `amber` top border accent.
4. **For Trainers** (surface-base): TTT section, testimonial, CTA.

### Blog

1. **Hero** (ink, compact): Heading, subtitle, language filter pills.
2. **Featured Post** (surface-base): Large card, image left + content right.
3. **Post Grid** (surface-base): Three-column card grid. Category tags as `amber-subtle` pills.
4. **Author Card + Newsletter** (surface-sunken band).

### Blog Post

1. **Header** (surface-base): Category pill, title Inter 700 36px, date + read time. Featured image below, full-width, 12px radius.
2. **Body** (`content-narrow` 720px): Inter 400 17px, 1.75 line-height. Blockquotes with `amber` left border + `surface-sunken` bg.
3. **Bottom zone**: Share buttons, author card, trainer banner, newsletter, related posts (3 cards), prev/next nav.

### Media

Visual update to existing structure: card containers for episodes, `surface-sunken` for "As Seen On" badge, `amber` timestamps, ink CTA band at bottom.

### Media Kit

Minimal changes: update color tokens to `ink`/`amber`, update typography to Inter. Keep inline React styles approach.

### Clients

1. **Hero** (ink): "Clients" heading.
2. **Logo band** (surface-sunken): Client logos/names in grayscale, hover-to-color.
3. **Case Studies** (surface-base): Blog post card grid.

### Contact

1. **Hero** (ink): "Let's find the right next step" heading + intro.
2. **Form** (surface-base, `content-standard`): Clean inputs on `surface-overlay`, `amber` focus ring, primary submit button.
3. **Supporting info** (surface-sunken): Two columns — help topics + direct contact.

### Chinese Pages

Same visual design as English counterparts. Add `"Noto Sans TC"` to font stack.

---

## Technical Scope

### SCSS Files to Rewrite (~15-20)
- `libs/_vars.scss` — new color tokens, font definitions, spacing scale
- `base/_page.scss` — background color, base font
- `base/_typography.scss` — Inter, heading styles, body text
- `layout/_wrapper.scss` — kill sidebar flex, full-width flow
- `layout/_header.scss` — dark sticky nav
- `layout/_sidebar.scss` — remove entirely
- `layout/_footer.scss` — new three-column dark footer
- `layout/_main.scss` — content width system
- `components/_button.scss` — three-tier button system
- `components/_post.scss` — card-based post styling
- `components/_mini-post.scss` — updated card grid
- `components/_testimonials.scss` — new testimonial block
- `components/_form.scss` — updated input styling
- `components/_box.scss` — stats component
- `components/_section.scss` — section rhythm system
- `components/_email-capture.scss` — dark band newsletter
- `pages/_home.scss` — hero, section bands
- `pages/_blog.scss` — featured post, grid updates

### New SCSS Files (~3-4)
- `components/_card.scss` — unified card system
- `components/_stats.scss` — dedicated stats component
- `layout/_hero.scss` — hero section patterns
- `base/_textures.scss` — grain overlay, gradient utilities

### JS Components to Modify (~8-10)
- `layouts/Main.js` — remove SideBar, add Footer
- `components/Template/Navigation.js` — dark nav, new markup
- `components/Template/Hamburger.js` — animated hamburger
- `pages/Index.js` — hero section, restructured layout
- `pages/About.js` — remove sidebar-dependent layout
- `pages/Services.js` — section bands
- `pages/Blog.js` — featured post layout
- `pages/Contact.js` — restructured form layout
- `pages/Clients.js` — add logo section

### New JS Components (~3-4)
- `components/Template/Footer.js` — new footer
- `components/Home/HeroSection.js` — homepage hero
- `components/Home/StatsBar.js` — floating stats component
- (Optional) `components/Common/Card.js` — shared card component

### Files to Remove
- Sidebar references from `Main.js` (component stays for potential future use but is not rendered)

### Preserved (no changes)
- All routing (`App.js`, route definitions)
- All SEO work (Helmet configs, canonical URLs, hreflang, structured data)
- react-snap pre-rendering
- Blog post data files
- All data files (`services.js`, `testimonials.js`, etc.)
- `public/index.html` (SEO meta, analytics)
- `public/robots.txt`, `public/llms.txt`, `public/llms-full.txt`
- Sitemap generation

---

## Constraints

- No new build dependencies (no Tailwind, no CSS modules migration)
- Must work with react-snap pre-rendering
- Must preserve all bilingual routing
- Must maintain WCAG AA contrast ratios (especially `amber` on `ink`, `text-body` on `surface-base`)
- Google Fonts: replace `Source+Sans+Pro:400,700|Raleway:400,800,900` with `Inter:400;500;600;700` and add `Noto+Sans+TC:400;700` for Chinese pages
