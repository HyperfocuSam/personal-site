# ampcode-Inspired Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete the editorial monochrome aesthetic shift inspired by ampcode.com. Most of the design (palette, typography scale, shadows, radius) was already implemented in Phase 4-7. This plan covers the remaining gaps.

**Architecture:** SCSS-only changes (5 files) + 0 JS changes. The token cascade in `_vars.scss` propagates most changes automatically.

**Tech Stack:** SCSS (Create React App build), self-hosted Inter + DM Serif Display fonts.

---

### Task 1: Update _vars.scss — remaining token refinements

**Files:**
- Modify: `src/static/css/libs/_vars.scss:1-2,36-37,88,98,100`

**Step 1: Update file comment and remaining tokens**

```scss
// Design System: hyperfocusam.com
// Atmosphere: "Editorial monochrome — confident restraint"
```

Update these specific values only:

```scss
// Line 36-37: Bump section spacing
section-spacing: 6.5rem,
section-spacing-small: 3.5rem,

// Line 88: Darken ink-deep
ink-deep: #050505,

// Line 98: Add whisper of warmth to surface-base
surface-base: #fafaf9,

// Line 100: Semi-transparent overlay
surface-overlay: rgba(255, 255, 255, 0.97),
```

**Step 2: Verify build**

Run: `cd /Users/sam/personal-site && npm run build 2>&1 | tail -5`
Expected: Build succeeds, no SCSS errors.

**Step 3: Commit**

```bash
cd /Users/sam/personal-site && git add src/static/css/libs/_vars.scss && git commit -m "design: refine tokens — warmer surface-base, deeper ink, editorial spacing"
```

---

### Task 2: Update _typography.scss — bump h3 size

**Files:**
- Modify: `src/static/css/base/_typography.scss:103`

**Step 1: Change h3 font-size**

```scss
h3 {
  font-size: 1.65rem;
  line-height: 1.2;
}
```

**Step 2: Commit**

```bash
cd /Users/sam/personal-site && git add src/static/css/base/_typography.scss && git commit -m "design: bump h3 to 1.65rem"
```

---

### Task 3: Update _header.scss — fix scrolled state colors

**Files:**
- Modify: `src/static/css/layout/_header.scss:27-30`

**Step 1: Replace navy-tinted glass with near-black glass**

The scrolled state still uses the old navy `rgba(15, 23, 41, ...)`. Update to match the monochrome palette:

```scss
&.scrolled {
  background-color: rgba(12, 12, 12, 0.92);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
}
```

**Step 2: Commit**

```bash
cd /Users/sam/personal-site && git add src/static/css/layout/_header.scss && git commit -m "design: update header glass to monochrome"
```

---

### Task 4: Update _email-capture.scss — amber subscribe button + remove hover lift

**Files:**
- Modify: `src/static/css/components/_email-capture.scss:96-106`

**Step 1: Change submit button to amber and remove translateY**

Replace the `&__submit` styles. The subscribe button becomes the third amber accent in the design:

```scss
&__submit {
  margin: 0;
  text-decoration: none;
  display: inline-block;
  border-radius: map-get($radius, md);
  font-weight: _font(weight-bold);
  font-size: 1rem;
  padding: 0.85em 2em;
  min-width: 140px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.25s $ease-out, box-shadow 0.2s $ease-out-snappy, color 0.2s $ease-out-snappy;
  background-color: _palette(amber);
  color: _palette(ink);
  border: 2px solid _palette(amber);

  &:hover {
    background-color: _palette(amber-light);
    border-color: _palette(amber-light);
    box-shadow: map-get($shadow, md);
    color: _palette(ink);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @include breakpoint(small) {
    width: 100%;
  }
}
```

**Step 2: Commit**

```bash
cd /Users/sam/personal-site && git add src/static/css/components/_email-capture.scss && git commit -m "design: amber subscribe button, remove hover lift"
```

---

### Task 5: Update _home.scss — reduce remaining hover lifts

**Files:**
- Modify: `src/static/css/pages/_home.scss`

**Step 1: Reduce hover translateY values**

Find and update these hover effects:

- `.help-card:hover` (line ~263): `translateY(-2px)` → `translateY(-1px)`
- `.home-case-studies__card:hover` (line ~408-409): `translateY(-3px)` → `translateY(-1px)`
- `.revenue-path-cta__card:hover` (line ~508-509): `translateY(-2px)` → `translateY(-1px)`
- `.work-card:hover` (line ~734): `translateY(-4px)` → `translateY(-1px)`

**Step 2: Commit**

```bash
cd /Users/sam/personal-site && git add src/static/css/pages/_home.scss && git commit -m "design: reduce all hover lifts to -1px"
```

---

### Task 6: Visual verification

**Step 1: Start dev server and screenshot**

```bash
cd /Users/sam/personal-site && npm start
```

**Step 2: Verify in browser or via Playwright**

Check:
- [ ] Hero: text readability, subline styling, amber CTAs visible
- [ ] Nav: glassmorphism works on scroll, amber CTA button present
- [ ] Section spacing: slightly more breathing room than before
- [ ] Email capture: amber subscribe button on dark background
- [ ] Card hovers: subtle -1px lift, not jarring
- [ ] Mobile: responsive layout holds, hero readable at small sizes

---

## Summary of Actual Changes

| File | Change | Lines touched |
|---|---|---|
| `_vars.scss` | Comment, ink-deep, surface-base, surface-overlay, section-spacing | ~6 lines |
| `_typography.scss` | h3 size bump | 1 line |
| `_header.scss` | Scrolled state navy → monochrome | 3 lines |
| `_email-capture.scss` | Submit button white → amber, remove hover lift | ~15 lines |
| `_home.scss` | Reduce 4 hover translateY values | 4 lines |

**Total: 5 files, ~29 lines changed, 0 JS changes.**

The site was already 90% aligned from the previous Phase 4-7 redesign.
