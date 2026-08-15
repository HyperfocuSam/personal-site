
# Claude Code Mastery: Agent Teams & Automation -- Your AI Workforce

I have nine agents. They run seven cron jobs. My blog publishes itself every Monday without me touching a keyboard. My morning briefing lands on WhatsApp in Cantonese at 8:30 AM, five days a week, with calendar conflicts flagged and overdue items ranked by severity. When a client mentions a name in an email, the system loads that person's entire history before I even read the thread.

One agent is useful. A team of specialists is a different category of thing entirely.

This is Part 4 of the Claude Code Mastery series. [Part 1](/blog/claude-code-mastery-part-1-getting-started) covered getting started with CLAUDE.md. [Part 2](/blog/claude-code-mastery-part-2-skills-memory) covered memory and skills. [Part 3](/blog/claude-code-mastery-part-3-hooks-guardrails) covered hooks and guardrails. This one is about what happens when you stop thinking of AI as a single assistant and start thinking of it as a team.

## Why One Agent Breaks Down

For the first three months of building Ada, I ran everything through a single agent. One context window. One set of instructions. It worked until it didn't.

The breaking point was a Tuesday morning. I asked Ada to prepare for a client meeting: pull the latest email thread, check the client's invoice status, review my calendar for conflicts, and draft a brief. Four tasks. The agent executed them sequentially. It loaded the email MCP, queried the inbox, then loaded the calendar MCP, then read the memory file, then started drafting. By the time it finished, the context window was stuffed with 80,000 tokens of intermediate results. The draft was mediocre because the agent was spending more tokens managing its own context than thinking about the output.

The fix was not a better prompt. It was architecture.

## What Are Agent Teams?

Agent Teams is an experimental feature in Claude Code that lets you run multiple agents simultaneously, each with their own context window and specialization. You enable it with one environment variable:

```
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

Each agent is a markdown file in `.claude/agents/` with a frontmatter block defining its name, description, model, and color. The body contains the agent's system instructions -- its personality, scope boundaries, available tools, and operating procedures.

```markdown
---
name: comms-agent
description: "Handles all communication tasks: drafting and sending
  emails via Gmail, managing WhatsApp messages, client follow-ups..."
model: inherit
color: blue
---

You are the **Communications Agent** for Ada...

## Brand Voice Guidelines
## Email Templates
## Scope Boundary
```

The description field matters more than it looks. Claude Code uses it for routing -- when you give the coordinator a task, it reads agent descriptions to decide which specialist to delegate to. Write a bad description and your tasks go to the wrong agent.

## The Nine-Agent Roster

Here is every agent I run, what it does, and when it fires.

| Agent | Domain | Triggers |
|-------|--------|----------|
| **ada-executive-assistant** | Lead orchestrator, routing, memory | Multi-step tasks, ambiguous requests |
| **comms-agent** | Email, WhatsApp, follow-ups | draft, reply, send, follow-up |
| **scheduler-agent** | Calendar, meetings, ICS files | meeting, schedule, availability |
| **docs-agent** | Proposals, invoices, presentations | proposal, invoice, report, handout |
| **research-agent** | Web research, competitive intel | research, look up, analyze, trends |
| **memory-agent** | Brain digestion, memory consolidation | digest brain, process memory |
| **workshop-agent** | Workshop content, translation | workshop, translation, TTT, trainer |
| **inbox-triage-agent** | Read-only inbox analysis | inbox, triage, what did I miss |
| **mascot-video-agent** | Full video production pipeline | mascot, animated video, episode |

Each agent has its own MCP server assignments. The comms-agent gets Google Workspace and WhatsApp. The research-agent gets Firecrawl and Exa. The inbox-triage-agent gets Google Workspace but is explicitly read-only -- it can never send, draft, or modify emails. Scope boundaries are not suggestions. They are hard constraints written into each agent's instructions.

The coordinator -- ada-executive-assistant -- has a delegation matrix baked into its system prompt. When I say "draft an invoice for a client," it does not try to do it itself. It reads the matrix, sees that document generation maps to docs-agent, and delegates. The coordinator's job is routing and synthesis, not execution.

## Parallel vs. Sequential: The Architecture Decision

This is where agent teams earn their keep.

**Parallel execution** is for tasks with no dependencies. "Prepare for my meeting with a global advertising group" spawns three agents simultaneously:

- research-agent pulls background intel on the client
- comms-agent surfaces the last five email exchanges
- memory-agent loads the full client history from curated memory

Three agents, three independent context windows, three results arriving within seconds of each other. The coordinator synthesizes them into a single brief. Total wall-clock time: roughly what one agent would take to do one of those tasks.

**Sequential execution** is for pipelines. "Draft and send a proposal to Kelly about AI training" runs in order:

1. research-agent gathers client context and competitive positioning
2. docs-agent takes that output and generates the proposal
3. comms-agent takes the proposal and drafts the delivery email

Each agent's output feeds the next. You cannot draft a proposal before you have the research. You cannot draft the email before you have the proposal. The coordinator manages the handoff.

The rule is simple: if steps don't depend on each other, run them in parallel. If they do, run them in sequence. The coordinator figures this out from the task description. I do not need to specify the execution mode. But writing clear task descriptions helps -- "prepare for a meeting" implies parallel; "draft then send" implies sequential.

## Cron Jobs: Automation Without Supervision

*Editor's note (July 2026): the autonomous publishing pipeline and morning-briefing jobs described below have been paused since early July 2026; posts now go through a review gate.*

Agent teams become transformative when you combine them with scheduled execution. Here are the seven cron jobs that run my business while I sleep.

| Job | Schedule | What It Does |
|-----|----------|-------------|
| **morning-briefing.sh** | Weekdays 8:30 AM | Pulls calendar + overdue items + client statuses. Sends a WhatsApp ping in Cantonese. Full dashboard saved to Craft. |
| **blog-content-scan.sh** | Mondays 10 AM | Scans worklogs, client files, X bookmarks for blog topics. Picks one. Drafts it. Publishes it. No review gate. |
| **blog-nudge.sh** | Thursdays 10 AM | Health check on blog publishing. Catches failed Monday publishes. Gmail fallback if WhatsApp is down. |
| **bookmark-digest.sh** | Daily 9 PM | Aggregates X/Twitter bookmarks by theme into a digest. |
| **stale-check.sh** | Mondays 9 AM | Identifies todos idle more than 14 days. Flags stale items. |
| **rotate-worklogs.sh** | 1st of month | Archives worklogs older than one month to keep the active file under 15KB. |
| **backup-game-data.sh** | Scheduled | Backs up gamification layer data. |

The morning briefing is the one I notice most. Every weekday at 8:30 AM, before I have opened my laptop, my phone buzzes with a WhatsApp message from Ada:

```
Ada 早晨提醒 03/23:

今日:
- 14:00 client call

要跟進:
- [OVERDUE] CTF 發票 — 逾期26日
- [DUE SOON] a client 工作坊 — 3日後

Full briefing 喺 Craft.
```

Calendar events cross-referenced with client memory. Meetings flagged with [PREP NEEDED] if the related client has unfinished todos. The full dashboard goes to a Craft document. The WhatsApp message is just the highlights. Two systems, two levels of detail, zero manual effort.

The blog pipeline is the most aggressive. Auto-publish mode. Every Monday, the script scans 30 days of worklogs, client files, digested transcripts, and X bookmark clusters. It picks a topic, drafts a post, runs it through my Content DNA voice calibration, and publishes directly to hyperfocusam.com. `git push` plus `npm run deploy`. No review gate. I authorized that in March 2026 after three months of reviewing every draft and finding I changed less than 5% of the output each time.

## Cost-Aware Model Selection

Running nine agents sounds expensive. It is not, if you are deliberate about model selection.

Each agent inherits the parent model by default (`model: inherit`), but the coordinator applies cost-aware routing:

- **Haiku** for simple searches, file exploration, and status checks. Cheapest. Fast. Good enough for "find this file" or "what's in this directory."
- **Sonnet** for routine operations: email drafting, memory updates, calendar management. The workhorse. 90% of tasks land here.
- **Opus** for complex planning, multi-step reasoning, and nuanced writing. Proposals. Blog posts. Multi-client synthesis. The tasks where quality directly impacts revenue.

The rule: never use Opus for something Sonnet can handle. Never use Sonnet for something Haiku can handle. Token cost scales roughly 10x between tiers. Getting the routing right is the difference between a $50/month AI system and a $500/month one for similar output quality.

## How to Start: One Agent, Not Nine

I want to be clear about something. I did not build nine agents in a weekend. The system evolved over months. The first three months were a single agent. Then I split out comms-agent because email handling was polluting every other task's context window. Then docs-agent, because invoice formatting is a specialized skill that benefits from persistent templates. Then research-agent, because web scraping tools are heavy and I didn't want them loaded for simple email tasks.

If you are starting today, here is what I would do:

1. Start with a single CLAUDE.md (Parts [1](/blog/claude-code-mastery-part-1-getting-started) and [2](/blog/claude-code-mastery-part-2-skills-memory) of this series)
2. Add hooks for your highest-risk tool calls ([Part 3](/blog/claude-code-mastery-part-3-hooks-guardrails))
3. When you notice one category of task bloating your context window -- email, research, documents -- split that into your first specialist agent
4. Add one cron job: the morning briefing. It takes 20 minutes to set up and changes how you start every day.
5. Scale from there based on what you actually need, not what sounds impressive on a blog post

The architecture I have described is not theoretical. It runs my business across 20+ client engagements, 13 countries, and three business entities. It processes meeting recordings, generates invoices, publishes blog posts, and sends morning briefings in Cantonese. It cost me roughly 200 hours to build over four months. It saves me roughly 15 hours per week now.

Those numbers compound. The system gets better because the memory gets richer. The agents get more accurate because the skills get more refined. The cron jobs catch more edge cases because the worklogs record more patterns.

Next in the series: Part 5, where I pull everything together into a complete blueprint -- CLAUDE.md, memory, skills, hooks, agents, and cron -- with a starter template you can fork and customize. The full stack, one repo.

---

*I train companies across 13 countries on AI adoption that actually sticks. If you are building with Claude Code and want to compare notes, connect with me on [LinkedIn](https://www.linkedin.com/in/sam-ai-agent/).*
