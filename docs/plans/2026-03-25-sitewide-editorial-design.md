# Site-Wide Editorial Extension

## Context
The homepage was redesigned with an ampcode-inspired editorial layout: massive centered serif typography, single-column flow, breathing scroll reveals, generous spacing, and warm cream palette with dark ink contrast bands. This design extends that treatment to all 12 English pages.

## Design Rules
1. Page hero: massive fluid serif title, subtitle, surface-base bg
2. Section rhythm: alternate surface-base / surface-sunken, one dark ink band per page
3. Typography: fluid clamp() scale from $type map
4. Motion: ScrollReveal fade-up-long on all major sections
5. Spacing: 6rem+ vertical section padding
6. Width: content-narrow (720px) for reading, content-wide (1200px) for grids

## Execution
- Layer 1: Global base styles (typography, spacing, page hero, section utilities)
- Layer 2: Shared components (TestimonialCard, ServiceGroup, Button, blog cards)
- Layer 3: Per-page layout adjustments (12 pages)
- Chinese pages: deferred to follow-up
