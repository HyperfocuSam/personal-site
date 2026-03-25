# Redesign: ampcode.com-Inspired Aesthetic Overhaul

**Date:** 2026-03-25
**Approach:** Full aesthetic overhaul via SCSS (Approach B)
**Scope:** 8-10 SCSS files, 0 JS files, 1 minor JSX change (hero split)

## Design Direction

Editorial, sharp, authoritative. Monochrome restraint with scarce amber accents. Massive serif typography with extreme scale contrast. Clean surfaces, generous spacing, quiet interactions. Inspired by ampcode.com's aesthetic: the typography drama, the monochrome palette, the spacious composition.

## 1. Palette

Shift from "warm study at dusk" to "editorial monochrome with scarce amber."

| Token | Old | New |
|---|---|---|
| ink | #0f1729 | #0c0c0c |
| ink-deep | #0a0f1c | #050505 |
| ink-light | #2d3b5e | #1a1a1a |
| ink-lighter | #4a5578 | #2a2a2a |
| surface-base | #f6f4f0 | #fafaf9 |
| surface-raised | #faf8f5 | #ffffff |
| surface-sunken | #edeae4 | #f2f2f0 |
| surface-overlay | rgba(250,248,245,0.97) | rgba(255,255,255,0.97) |
| text-primary | #1a1d2b | #0c0c0c |
| text-body | #3d3f4e | #3a3a3a |
| text-secondary | #6b6d7a | #8a8a8a |
| amber | #c8965a | #c8965a (unchanged) |
| border-subtle | #e5e2db | #e8e8e8 |
| border-strong | #d1cdc4 | #d0d0d0 |
| shadow-color | navy-tinted | rgba(0,0,0,0.06) |

Amber appears on exactly 3 elements: nav CTA, hero CTA, email subscribe button.

## 2. Typography

Dramatic editorial scale. DM Serif Display stays (no font swap needed).

| Element | Old | New |
|---|---|---|
| h1 | clamp(1.85rem, ..., 2.5rem) | clamp(2.5rem, 2rem + 3vw, 4.5rem) |
| h2 | clamp(1.4rem, ..., 1.75rem) | clamp(1.75rem, 1.5rem + 1.5vw, 2.75rem) |
| h3 | 1.5rem | 1.65rem |
| Hero h1 (main) | 5.25rem | clamp(3rem, 2rem + 5vw, 6rem) |
| Hero subline (new) | n/a | clamp(1.5rem, 1rem + 2vw, 2.5rem) italic |
| Section titles | 3.5rem | clamp(2.75rem, 2rem + 3.5vw, 5rem) |
| Body | 1.0625rem | 1.0625rem (unchanged) |
| Heading line-height | 1.2-1.3 | 1.05-1.15 |
| Heading letter-spacing | -0.02em | -0.03em |
| Heading font-weight | 800 | 700 |

Hero split: "I help teams adopt AI" at 6rem max, "in ways that actually stick." as italic subline at ~40% size.

## 3. Surfaces, Textures, Spacing

| Element | Old | New |
|---|---|---|
| Grain overlay | SVG noise | Remove entirely |
| Section backgrounds | surface-base + surface-warm | surface-base + surface-sunken only |
| Section spacing | 6rem / 3rem | 6.5rem / 3.5rem |
| Card hover lift | translateY(-2px) | translateY(-1px) |
| Card hover shadow | shadow-lg | shadow-md |
| Shadows | Navy-tinted, 8-12% | Neutral black, 3-7% |
| Nav glassmorphism | Keep | Keep |
| Border radius | Already sharp | Unchanged |

## 4. Components

**Nav:** Keep glassmorphism + amber CTA. Simplify link hover to opacity transition.
**Buttons:** Primary = ink bg. Remove hover translateY. Amber only on 3 CTAs.
**Cards:** Subtler hover. Blog card left-border goes monochrome (border-subtle).
**Footer:** Inherits new palette. No structural changes.
**Email capture:** Keep dark band. Subscribe button = amber accent.

## Execution Order

1. `_vars.scss` — palette, shadows, font kerning/weights
2. `_typography.scss` — heading scale, line-heights
3. `_textures.scss` — remove grain, remove section-warm
4. `_home.scss` — hero split sizing, section-title scale
5. `_card.scss` — reduce hover lift/shadow
6. `_button.scss` — remove hover lift, inherit tokens
7. `_header.scss` — simplify link hover
8. `_footer.scss` — verify inheritance
9. `_email-capture.scss` — amber subscribe button
10. Hero JSX — wrap subline in span (1 component change)

## Verification

After each file: `npm start` + Playwright screenshot of localhost:3000.
Check: hero readability on mobile, amber CTA visibility, tonal consistency.
