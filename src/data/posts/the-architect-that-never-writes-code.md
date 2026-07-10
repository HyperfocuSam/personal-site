
# The architect that never writes code

My timeline this week is wall-to-wall model comparisons. I ran a different experiment: three models from three vendors working the same git branch, directed by a fourth model that never wrote a line of implementation code.

The result was a net-negative diff, four bugs killed before any code existed, and a branch I still haven't merged.

A plugin called fable-advisor — open source, MIT-licensed, written by Dan McAteer — implements what it calls the "architect pattern" for Claude Code. Your main session runs the most capable model available (Claude Fable 5 in my case), but that model's job is judgment, not typing. It writes specs, routes work, and issues verdicts. The actual building goes to cheaper models through CLI lanes: Grok 4.5 via xAI, GPT-5.5 via OpenAI's Codex. Each worker gets a five-part contract — objective, files, interfaces, constraints, verification — and runs in its own git worktree.

I pointed it at my personal site. Before any worker started, the architect ran an advisor consult — a read-only second-opinion pass over its own specs. It caught four errors that would have shipped as code: blog markdown producing duplicate h1 tags per page; a prerender that would have tripped a known hydration constraint; a colour-contrast fix that needed its design token split in two, or it would have broken every other use of the same amber; and a dead-image purge matching by directory instead of filename, which would have deleted images still in use. Four bugs killed at the spec stage. No code written, no diff to revert.

Then the workers ran in parallel. Grok 4.5 replaced 12 hard-coded animation values with motion tokens, converted px font sizes, fixed mobile theme colour, deleted 3 orphaned components. GPT-5.5 enforced one h1 per route, deleted 26 dead images — 19MB off the repo — and darkened amber text to meet WCAG contrast using the exact token split the advisor demanded. One commit: 75 files changed, +167 insertions, -668 deletions. The site got better by getting smaller.

Later that week I benchmarked a third worker — gpt-5.6-sol, released the same day — against GPT-5.5 and Grok 4.5. Identical frozen spec, sha256-hashed, five hard gates: scope, wiring, lint, build with snapshots, hydration against baseline. All three passed all five. My gates could not tell them apart. I sealed a blind pick across the three builds and chose C without knowing whose work it was. C turned out to be sol. It's now the default worker for that lane, mostly because it was cheapest on fresh tokens.

The orchestrator seat didn't change. I planted two traps at that level — a forbidden change dressed as routine, a fabricated completion report from a worker. The incumbent caught both and then went further: it noticed the "fabricated" report actually described real changes sitting in a sibling worktree, and completed a delegation loop the challenger couldn't. Judgment under ambiguity is still where the gap lives.

The most expensive model in the stack produced zero implementation code. Its entire output was judgment. The cheapest models did all the typing. And the person — me — did the job that looks the least like work: reading diffs and deciding not to merge yet.

Everyone is picking sides this week. I think the sides are the wrong unit of analysis. The pattern — one architect directing multiple workers, benchmarked same-day, blind-picked — is what actually changed my workflow. Models are interchangeable applicants. The orchestration is the asset.

---

*Full build writeup: [Three models, one branch, zero deployment](https://hyperfocusam.com/blog/three-models-one-branch-zero-deployment/). Plugin: [fable-advisor](https://github.com/DannyMac180/fable-advisor) by Dan McAteer (MIT).*
