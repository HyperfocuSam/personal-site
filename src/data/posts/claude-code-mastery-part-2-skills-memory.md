
# Claude Code Mastery: Skills & Memory — Teaching AI to Remember

Every AI tool you've ever used has the same problem. You spend 45 minutes getting it to understand your workflow, your preferences, your constraints. You close the window. You open it the next day. It has forgotten everything.

I call this the goldfish problem. And it's the single biggest reason most people give up on AI assistants after a week.

I run my entire business through Claude Code — client invoices, workshop prep, blog publishing, meeting follow-ups across 20+ active client engagements. If Claude forgot everything between sessions, I'd spend more time re-explaining context than actually working. That's not a productivity tool. That's a very expensive autocomplete.

So I built a memory system. Four tiers, 40+ skills, and the whole thing loads in under 5,000 tokens at startup. Here's exactly how.

## Part 1 Recap: CLAUDE.md Is Just the Beginning

In [Part 1](/blog/claude-code-mastery-part-1-claude-md) of this series, I covered how CLAUDE.md acts as your AI's instruction manual — the persistent configuration file that survives every session restart. If you haven't read it, start there.

But CLAUDE.md is tier zero. It tells Claude *who it is* and *what rules to follow*. It doesn't tell Claude what happened yesterday, which client is overdue on an invoice, or how to publish a blog post to your specific site. For that, you need memory and skills.

## The Four-Tier Memory Architecture

Here's the system I actually use. Not a theoretical framework — the exact files sitting in my repo right now.

### Tier 1: Session Working Memory

This is the current conversation. Ephemeral. Gone when the session ends. Every AI tool has this, and only this, by default. It's useful but it's not memory. It's a notepad you throw away every night.

### Tier 2: Worklogs

File: `Memory/memory_worklogs.md`. Every meaningful action gets logged here before I see a response. The schema is rigid:

```
## 2026-03-23 | Domain: Playmates US | Action: Drafted reply | Outcome: Sent for review | Next: Sam to reply all
```

One line tells me when, what domain, what happened, and what's next. The file gets rotated monthly to stay under 15KB. Old entries get archived, not deleted. The constraint matters — if the file grows unchecked, Claude spends tokens reading irrelevant history from two months ago.

This is the chronological backbone. When I open a new session, Claude reads the last 10 entries automatically. Instant continuity without me saying a word.

### Tier 3: Curated Memory

Twenty-one files following the pattern `Memory/memory_*.md` — one per client, one per major domain. `memory_adaptig_garden.md`. `memory_playmates_toys_hk.md`. `memory_dorich.md`. Each one has a status header at the top: current engagement phase, last invoice, outstanding deliverables, key contacts.

The key behavior: when I mention a client name in conversation, Claude auto-loads that client's memory file before responding. I don't ask it to. It just does, because CLAUDE.md tells it to.

This is the Agno pattern — retrieval on mention. No manual context loading. No "let me remind you about Garden." I say "Garden" and Claude already knows we're in Batch 2, that the Top Management workshop is confirmed, and that invoice GARDEN-2026-003 for HKD 63K has been sent.

There's also `memory_people.md` — a cross-client contacts directory. 41 people indexed. When someone says "check with Joanne," Claude looks up Joanne Chan, finds she's the HKCT contact, and loads the HKCT memory file. Two hops. Zero friction.

### Tier 4: Knowledge Base

`Knowledge/*.md` — reusable patterns promoted from the worklogs when they appear three or more times. Lessons learned, SOPs, brand voice rules, proven workflows.

The promotion threshold matters. If I correct the same mistake twice, it goes into `Knowledge/lessons.md` as a guardrail. If a workflow succeeds five times, it gets promoted to a formal SOP. This isn't aspirational — Claude actively proposes these promotions:

> "This is the third time you've asked me to format invoices with the Animo Technology Limited header. Should I capture this as a Knowledge entry?"

Yes. Always yes. That's how the system gets smarter without me maintaining it.

## Skills: Procedural Memory That Scales

Memory tells Claude what happened and what it knows. Skills tell Claude *how to do things*. They're modular, folder-based capabilities sitting in `.claude/skills/`. I have 40 of them right now. Here's why that number doesn't break anything.

### The Progressive Disclosure Pattern

Every skill has three layers:

**Level 1 — Metadata.** Name and one-line description. About 100 tokens per skill. This is all that loads at startup. For 40 skills, that's roughly 4,000 tokens. Claude sees a menu of everything it can do without actually loading any of the instructions.

**Level 2 — Instructions.** The full workflow. Under 5,000 tokens each. Only loaded when the task matches. If I'm not publishing a blog post, the `personal-blog` skill stays dormant.

**Level 3 — Resources.** Templates, scripts, reference files. Effectively unlimited size. Loaded as needed within a skill's workflow.

This is why 40 skills don't cause context bloat. The startup cost is 4K tokens for the full menu. Everything else is on-demand.

### A Real Skill: `personal-blog`

Here's the actual folder structure:

```
.claude/skills/personal-blog/
└── SKILL.md          # Level 2: full publishing workflow
```

And here's what the SKILL.md contains (simplified):

```markdown
---
name: personal-blog
description: Create and publish blog posts to hyperfocusam.com
---

## Workflow
1. Draft in `output/Blog/drafts/{slug}.md`
2. Copy to `/Users/sam/personal-site/src/data/posts/`
3. Update index.js (add entry at TOP of array)
4. git add, commit, pull --rebase, push, npm run deploy
5. Cross-post to Substack (full content, not teaser)
```

Five steps. Specific paths. Specific commands. No ambiguity. When I say "write a blog post about the Garden workshop," Claude knows exactly where to draft it, where to copy it, how to update the index, and how to deploy. I don't explain this every session. I explained it once, in the skill file.

### Other Skills Worth Mentioning

Forty skills sounds like a lot. Some highlights to show the range:

- **`magic-moment`** — builds interactive HTML demos for corporate clients. Sam's most-praised skill.
- **`deck-design`** — generates presentation slides using AI image generation with brand reference images.
- **`workshop-translation`** — localizes workshop materials across languages.
- **`task-notification`** — sends completion alerts via WhatsApp or native macOS notifications as fallback.
- **`memory-management`** — meta-skill that maintains the memory system itself.
- **`video-recolor`** — AI-powered product recoloring in existing video footage.

Each one follows the same pattern: metadata at startup, instructions on demand, resources when needed.

## Pattern Detection: The System That Improves Itself

The memory architecture isn't static. Built into the CLAUDE.md instructions are three detection triggers:

1. **3+ similar actions** in recent worklogs — propose a Knowledge entry
2. **2+ similar mistakes** — add to lessons.md as a guardrail
3. **5+ successful executions** of the same workflow — auto-promote to a formal SOP

This is the part most people miss when they think about AI memory. It's not just about remembering what happened. It's about recognizing patterns in what happened and crystallizing them into reusable knowledge.

The practical effect: my system in March 2026 is meaningfully smarter than my system in January 2026. Not because the model improved — because the memory layer accumulated better patterns.

## What This Actually Looks Like in Practice

Monday morning. I open Claude Code. Before I type anything, it's already loaded:

- The last 10 worklog entries (who I was working with, what's pending)
- Today's deadlines from the todo file
- A one-line acknowledgment of where we left off

I type: "Follow up with Joanne about the HKCT training on March 27."

Claude doesn't ask who Joanne is. It doesn't ask what HKCT is. It doesn't ask about the training. It already loaded `memory_people.md`, found Joanne Chan under HKCT, loaded `memory_hkct.md`, and knows this is the AI Learning Community engagement at HKD 240K over 24 months with the first training on March 27.

It drafts the email. It uses the `email-drafting` skill for tone and formatting. It sends via `sam@adaptig.com` through the Google Workspace integration. It logs the action to worklogs. It updates the HKCT memory file with the follow-up timestamp.

One sentence from me. Six coordinated actions from the system.

That's what memory and skills buy you. Not a chatbot that remembers your name. A system that operates like a colleague who's been working with you for months.

## What's Next: Part 3 — Hooks

In Part 3, I'll cover Claude Code's hooks system — the event-driven automation layer that makes all of this run without manual intervention. How session lifecycle hooks auto-load context. How pre-tool-use hooks enforce safety policies. How I built an audit trail that catches every external action before it happens.

Memory tells Claude what it knows. Skills tell Claude how to act. Hooks tell Claude when to act — and when to stop.

If it's not in memory.md, it remembered nothing.

---

*[Connect with me on LinkedIn](https://www.linkedin.com/in/hyperfocusam/) for more on building AI systems that actually work.*
