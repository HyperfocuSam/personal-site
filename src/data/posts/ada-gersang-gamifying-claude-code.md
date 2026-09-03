# I Built an RTK-Style Strategy Game on Top of My AI Workflow

I spend most of my working hours inside Claude Code. My AI assistant Ada handles emails, invoices, client tracking, document generation — [the full operational stack across four businesses](/blog/claude-code-mastery-part-5-full-blueprint). [Over 200 sessions, 438 hours logged](/blog/what-my-ai-drew-when-i-asked). At some point I started wondering: what if all that work was also a game?

Not a productivity gamification app. Not a points system. A proper Romance of the Three Kingdoms-style strategy game where my real work generates real stats.

So I built it.

## What Is Ada Gersang

Ada Gersang (gersang means "arid" in Malay — a nod to the classic Korean MMORPG) is a gamification layer that sits on top of Claude Code's hook system. Every tool call, every session, every email sent and document generated gets logged to a SQLite database. That data feeds into a stats engine that computes five attributes for each agent in my squad:

- **Leadership (CMD)** — session management, delegation, planning
- **Warfare (WAR)** — code execution, system operations, deployment
- **Intelligence (INT)** — research, analysis, knowledge retrieval
- **Politics (POL)** — email, messaging, client communication
- **Charisma (CHA)** — document creation, presentations, creative output

The stats aren't arbitrary. They're computed from actual tool usage patterns in my daily work.

## The Squad

Every good strategy game needs a roster. Mine has six:

| Name | Role | Title |
|------|------|-------|
| Sam | Warlord | The player character. Stats set manually — because the boss decides his own ratings. |
| Ada | 1st General | Primary AI assistant. Highest overall stats. She runs the operation. |
| Sage | Strategist | Research and deep analysis agent. High intelligence, low charisma. |
| Envoy | Diplomat | Communications agent. Handles email drafting and WhatsApp. |
| Chronicler | Scribe | Documentation agent. Writes reports, proposals, workshop materials. |
| Tactician | Advisor | Workshop design and planning. Balanced mid-range stats. |

Each mercenary's stats reflect their actual utility in my workflow, computed from real tool usage data in the hooks database.

## RTK11-Style Named Skills

This was the design decision I'm most pleased with. Early on, I made the mistake of showing skills as numeric stat bars — essentially duplicating the five-stat display. It looked wrong immediately. Skills aren't stats. They're discrete abilities you either have or you don't.

So I borrowed from Koei's Romance of the Three Kingdoms XI, which handles this beautifully. Named skills like "Fire God" or "Divine Calculator" that you earn through specific conditions. Each skill has three tiers:

- **Learned (I)** — you've used the tools enough to show competence
- **Proficient (II)** — regular, sustained usage
- **Mastered (III)** — heavy, consistent usage over time

The 11 skills map to tool usage clusters:

| Skill | Domain | Key Tools |
|-------|--------|-----------|
| Diplomat | Communication | Gmail, WhatsApp, Slack |
| Scout | Research | Web search, Exa, scraping |
| Oracle | Analysis | File reading, data processing |
| Commander | Operations | Bash, system commands |
| Engineer | Building | Code writing, file creation |
| Chancellor | Strategy | Calendar, task management |
| Scheduler | Time Mgmt | Calendar events, scheduling |
| Merchant | Finance | Invoices, spreadsheets |
| Scribe | Documentation | Craft, Google Docs, markdown |
| Architect | Design | Presentations, images, Figma |
| Herald | Broadcasting | Social media, notifications |

Ada currently holds Diplomat III, Oracle III, and Commander II. Sage has Oracle III and Scout II. The skills update automatically from the hooks database — no manual tracking.

## Fractional Growth From Real Work

The growth system went through two iterations in a single session. First version: +1 stat point per qualifying session. Way too fast. Within a week every agent would be maxed out.

Second version: fractional growth between +0.1 and +0.5 per session, scaling with tool usage intensity. The formula:

```
delta = 0.1 + 0.4 * min(1.0, (usage_ratio - 1) / 4)
```

At threshold usage, you get +0.1. At 5x threshold, you cap at +0.5. That means roughly 20 heavy work sessions to see a single visible stat point increase. The decimal is hidden in the UI — you just see the integer — but the accumulation happens internally. Slow enough to feel meaningful, fast enough to notice over weeks.

The growth proposals appear in the UI as accept/reject decisions, just like RTK's level-up system. You review what changed this session and decide whether to apply it.

## The Technical Stack

The whole thing runs on infrastructure I'd already built for a different purpose. Earlier that same day, I'd built an HTTP hooks server for Ada — a FastAPI service that intercepts Claude Code tool calls for policy enforcement (blocking unsanctioned emails, requiring approval before sending WhatsApp messages). That server already logged every tool call to SQLite.

Adding the game layer meant:
- New API endpoints on the existing hooks server (`/mercenaries`, `/stat-proposals`)
- A pixel-art UI panel (HTML + vanilla JS) styled after classic JRPG stat screens
- Stat override system so I can manually adjust any character's base stats
- Named skill computation from tool usage clusters

No new infrastructure. No new databases. Just new endpoints on a server that was already running and a UI that reads from them.

## What I Learned

Building this in a single session with Ada revealed something I keep seeing in my enterprise AI training work: the best AI integrations don't start from scratch. They layer onto existing workflows.

The plan was an audit logging server for policy enforcement; the game emerged because the data was already there. Every tool call was already being logged. Every session was already being tracked. The gamification layer was just a new lens on existing telemetry.

This is the same pattern I teach in workshops: don't build an "AI project." Find the workflow you're already doing, find the data you're already generating, and ask what becomes possible when you make it visible.

## What's Next

The game is playable but early. A few things I want to build:

- **Campaign mode** — monthly objectives tied to real business goals. "Close 3 new clients" or "Deliver 5 workshops" as in-game quests with stat rewards.
- **Event system** — special encounters triggered by real-world milestones. Landing a new client triggers a recruitment event. Delivering a workshop triggers a battle sequence.
- **Inter-agent synergy** — bonus effects when certain agents work together on the same task, like RTK's combo skills.
- **Historical log** — a timeline view showing stat progression over months, tied to actual business outcomes.
- **Pixel art portraits** — proper character sprites for each squad member instead of placeholder blocks.

The repo is live on GitHub. Seven commits deep, 328KB total. No client data, no recordings, no secrets — just game code.

---
