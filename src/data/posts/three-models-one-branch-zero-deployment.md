# Three models, one branch, zero deployment

Last week I wrote that AI made me a manager, not a better maker. This is what the job looked like last night.

I found a plugin called fable-advisor through a [tweet from Dan McAteer](https://x.com/daniel_mac8/status/2074946233823641751). It's open source, MIT-licensed, and it implements what the author calls the "architect pattern" for Claude Code. The idea is simple in description and strange in practice: your main session runs the most capable model available — Claude Fable 5 — but that model never writes a single line of implementation code. It only writes specs, routes work, and issues verdicts. The actual typing goes to cheaper models from other vendors: Grok 4.5 via xAI's CLI, GPT-5.5 via OpenAI's Codex CLI. Each lane gets a five-part contract — objective, files, interfaces, constraints, verification — and goes to work.

I pointed it at my own website.

## The recon pass

Before anything got changed, read-only agents fanned out in parallel: a code audit, live screenshots of the deployed site, a Lighthouse run. Scores came back 97 performance, 93 accessibility, 96 best practices, 100 SEO. Decent numbers. But the audit still surfaced real debt underneath them — hard-coded animation values, orphaned components, dead images, contrast failures on amber text.

## Four bugs that never existed

This is the part I keep thinking about. Before any implementation lane started, the architect model ran an advisor consult — a read-only second-opinion pass over its own specs. It caught four errors:

Blog markdown titles would have produced two h1 tags per page. Prerendering a /stats page would have violated a known hydration constraint on the site — the right move was deleting the page entirely, not prerendering it. A colour-contrast fix needed the design token split into two separate tokens, or the fix would have broken every other use of the same amber. And a dead-image purge had to match by filename, not just by directory, or it would have missed references and deleted images still in use.

Four bugs killed at the spec stage. No code written, no diff to revert, no debugging. The cheapest possible place to catch them.

## Two lanes, one branch

Grok 4.5 took one set of tasks: replaced 12 hard-coded animation values with motion tokens, converted px font sizes, fixed the mobile theme colour, made blog posts sort by date, deleted 3 orphaned components, fixed a mobile viewport overflow.

GPT-5.5 took another: enforced one h1 per route, deleted the /stats page, darkened amber text to meet WCAG contrast using the token split the advisor demanded, deleted 26 dead images — 19MB off the repo — and moved the site's headline stats into a single source-of-truth file so numbers can't drift between pages.

Both ran in parallel on the same branch. One commit at the end: 75 files changed, +167 insertions, −668 deletions. The site got better by getting smaller.

## What broke

The Grok CLI in one permission mode silently did nothing — exit code 0, looked successful, zero files changed. The lesson is procedural and boring: never trust an agent's exit code, always read the diff.

Codex hit its usage limit during the first smoke test of the evening. The plugin reports the lane as unavailable rather than silently substituting another model, which is the correct behaviour. The lane came back later in the night, but the failure mode matters — a worker can vanish mid-shift.

And verification before calling it done: all 96 routes prerendered, a hydration scan matched the production baseline exactly, zero mobile overflow, one h1 per route confirmed. That part worked.

## The punchline

None of it is deployed. The branch sits unmerged. Three model families did the typing, the recon, even caught each other's spec bugs — but the decision of what actually ships is still the one job that didn't get delegated.

The most expensive model in the stack never wrote a line of code. Its entire output was judgment: what to fix, in what order, with what constraints. The two cheaper models did all the typing. And the person — me — did the thing that looks the least like work: reading diffs, deciding what stays, and not merging yet.

A net-negative diff as the measure of a good night. I'll take it.

---

*Plugin: [fable-advisor](https://github.com/DannyMac180/fable-advisor) by Dan McAteer (MIT). Found via his [post on X](https://x.com/daniel_mac8/status/2074946233823641751).*

*More on how I actually work with AI agents — on LinkedIn.*
