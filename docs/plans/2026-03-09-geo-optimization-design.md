# GEO Optimization Design — hyperfocusam.com

**Date:** 2026-03-09
**Goal:** Make Sam Wong discoverable and citable by AI search engines (ChatGPT, Perplexity, Gemini) for service discovery and thought leadership queries.

## Scope

### 1. `public/llms.txt` (NEW)
Concise (~500 word) markdown summary for AI crawlers: identity, services, frameworks, clients, links. Follows Answer.AI convention.

### 2. `public/llms-full.txt` (NEW)
Comprehensive (~2,000-3,000 word) knowledge base: full bio, detailed services, all named frameworks with definitions, case study summaries with metrics, thought leadership positions, media appearances, contact info.

### 3. FAQ Schema — Services.js
`FAQPage` JSON-LD with 6-8 Q&As derived from existing page content covering service types, typical clients, expected results, Adaptig methodology, getting started.

### 4. FAQ Schema — About.js
`FAQPage` JSON-LD with 3-4 Q&As: who Sam is, background, organizations.

### 5. SpeakableSpecification — index.html
Add to existing Person schema to flag quotable content for voice assistants and AI.

### 6. robots.txt — AI crawler permissions
Explicit Allow rules for GPTBot, ChatGPT-User, PerplexityBot, Google-Extended.

## Files

| File | Action |
|------|--------|
| `public/llms.txt` | NEW |
| `public/llms-full.txt` | NEW |
| `public/robots.txt` | Modify — add AI bot rules |
| `public/index.html` | Modify — SpeakableSpecification in Person schema |
| `src/pages/Services.js` | Modify — add FAQPage JSON-LD |
| `src/pages/About.js` | Modify — add FAQPage JSON-LD |

## Out of scope (future layers)
- Blog post entity linking (mentions/about with Wikidata URIs)
- ExpertProfile consolidation page
- Content rewriting for citation-friendly formatting
- `llms.txt` in Chinese
