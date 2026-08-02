# Design pipeline — one token source, three surfaces

Wired 2026-08-02. How the brand system flows between design tools and this
repo, so a colour is changed in ONE place and lands everywhere.

## The map

```
Ada colors-fonts.md            ← canonical HUMAN source (the brand ruling)
        │  (Ada keeps these in step by hand — they are the same 16 colours)
        ▼
Figma "Sam Wong — Brand System"  ← canonical MACHINE source for core colours
  (file key t8UgKr1GrFadEwZNSGOx1d, collections Sam/Primitives·Scale·Semantic)
        │ snapshot (figma-tokens.json)
        ▼
scripts/sync-figma-tokens.mjs  → src/static/css/libs/_tokens.figma.generated.scss
        │ merged LAST over $palette in libs/_vars.scss — Figma wins for the
        │ 22 core colour keys; derived tokens (washes, dark steps) stay
        ▼
this site (SCSS → CRA build → react-snap → GitHub Pages)

Magic Patterns DS "Sam Wong — Personal Brand"
  (ds-5e1ff794-eed3-442a-b19b-7df170313959)
  = the COMPONENT playground: design/preview new sections there against the
    same tokens (its tailwind.config.js mirrors the brand hex), then port
    approved designs into this repo by hand. It does not feed the build.
```

## The loop (who edits what)

- **Change a core brand colour** → edit the variable in Figma → refresh
  `figma-tokens.json` (Ada extracts via the Figma MCP, or Tokens Studio) →
  `node scripts/sync-figma-tokens.mjs` → commit. The generated partial is
  never edited by hand.
- **Change a derived value** (alpha washes, dark-surface steps, on-accent
  text) → edit `$samwong-arsenal-v1` in `libs/_vars.scss` directly.
- **Design a new section/component** → build it in the Magic Patterns design
  system against the brand tokens → Sam approves the preview → port to this
  repo (SCSS + JSX) → CI publishes.
- **Figma handoff for professional design work** → the Brand System file's
  variables ARE the tokens; point any designer (or figma-generate-library
  work) at that file, not at hex values in chat.

## Guardrails

- `sync-figma-tokens.mjs` fails loudly if the snapshot is missing a mapped
  token — the COLOR_MAP in that script is the single Figma-name → SCSS-key
  contract. Edit the map when a token is added or renamed.
- The three sources must not drift: colors-fonts.md (human), Figma
  (machine/core), Magic Patterns tailwind config (components). All three
  carry brand v1.0 as of 2026-08-02. If they disagree, colors-fonts.md wins
  and the others get corrected to it.
- Brand rules that no tool enforces (one red per viewport, no shadows, flat
  hierarchy) live in colors-fonts.md and the MP DS `rules/brand-dna.md`.
