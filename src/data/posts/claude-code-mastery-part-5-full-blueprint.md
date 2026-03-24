
# Claude Code Mastery: The Full Blueprint -- My Actual System

I have ADHD. Not the "I get distracted sometimes" kind. The diagnosed, medicated, still-forgetting-what-I-promised-a-client-yesterday kind. Executive function challenges -- what to do next, what did I commit to, where did I leave off -- are not occasional inconveniences. They are the operating conditions of my professional life.

I manage eight active client engagements across four business entities. I train over 10,000 professionals in six countries. I publish a bilingual blog, maintain a content pipeline, and run an AI voice agent. I do all of this from a single terminal window, through a system I built over five months on top of Claude Code.

This is Part 5 -- the finale of the Claude Code Mastery series. In [Part 1](/blog/claude-code-mastery-part-1-getting-started) I showed you CLAUDE.md. In [Part 2](/blog/claude-code-mastery-part-2-skills-memory) I showed you memory and skills. In [Part 3](/blog/claude-code-mastery-part-3-hooks-guardrails) I showed you hooks and guardrails. In [Part 4](/blog/claude-code-mastery-part-4-agent-teams) I showed you agent teams and automation.

Now I am going to show you the whole thing. Every file, every connection, every lesson I learned the hard way. This is the system you see after version 12. Versions 1 through 11 had embarrassing failures.

## The Complete Architecture

Here is the actual file tree. Not a diagram. Not a conceptual model. The real directory structure sitting on my machine right now.

```
Ada/
├── CLAUDE.md                        # Project brain (Part 1)
├── .clinerules/                     # Constitution & operating rules
│   ├── ada.md                       # Instruction receipt protocol
│   ├── agent.md                     # 5-tier learning architecture
│   ├── skills.md                    # Skill reference
│   └── response-format.md           # Response footer format
├── .claude/
│   ├── settings.json                # Hooks, permissions, env vars
│   ├── agents/                      # 9 agent definitions (Part 4)
│   ├── skills/                      # 40+ skills (Part 2)
│   └── docs/                        # Agent routing, MCP setup, invoices
├── Memory/                          # 4-tier memory system (Part 2)
│   ├── memory_worklogs.md           # Tier 2: chronological actions
│   ├── memory_todos.md              # Active tasks
│   ├── memory_people.md             # 41-person contact directory
│   ├── memory_<client>.md           # Per-client status files
│   └── digested/                    # Processed meeting recordings
├── Knowledge/                       # Tier 4: reusable patterns
│   ├── insights.md                  # What works
│   ├── lessons.md                   # What failed
│   └── sam-content-dna.md           # Voice reference for all content
├── scripts/
│   ├── hooks/                       # HTTP hooks server (Part 3)
│   │   ├── server.py                # FastAPI @ localhost:18924
│   │   ├── policy.py                # Policy evaluation engine
│   │   └── config.yaml              # Policy rules
│   └── cron/                        # 7 automated jobs (Part 4)
└── output/                          # Generated files, flat structure
```

Every piece maps to a part of this series. CLAUDE.md is Part 1. Memory and skills are Part 2. The hooks server is Part 3. Agent definitions and cron jobs are Part 4. What Part 5 adds is the wiring -- how these pieces talk to each other, and why the order matters.

## How the Pieces Connect

A session is not a conversation. It is a lifecycle with defined stages, and each stage activates different parts of the system.

**Session start.** The InstructionsLoaded hook fires. It reads the last 15 lines of my worklog and checks the priority todo file. Before I type a single character, Claude already knows: last session I sent the Garden invoice, there are two items due today, and the HKCT training is in four days. Two seconds. Under 500 tokens.

**Task assignment.** I type something. CLAUDE.md provides the project context -- golden rules, business entities, communication style. If the task is complex or multi-domain, Agent Teams routes it to a specialist. The content agent handles blog drafts. The client-ops agent handles invoices. The research agent handles analysis. Each specialist has its own context window, its own instructions, and access to the relevant subset of skills.

**Execution.** The specialist agent reads the relevant Memory files -- client status, contact directory, past interactions. It picks the matching skill and follows its workflow. Results go to `output/` in the flat naming convention I insist on: `CLIENT-Description-YYYYMMDD.ext`. No subfolders. Everything findable by filename.

**Safety layer.** PreToolUse hooks validate sensitive operations before they execute. The policy engine checks sender addresses, requires approval keywords for outbound emails, enforces rate limits. PostToolUse hooks scan incoming content for prompt injection. Every decision is logged to SQLite.

**Memory write-back.** After the task completes, the worklog gets a new entry. Client memory files get updated if status changed. The response footer confirms what was logged -- this is not optional, the system enforces it.

**Session end.** The Stop hook fires. It checks whether client work happened in this session and blocks exit until memory files are updated. Since deploying this hook, I have not lost session context once. Before it, I lost context weekly.

**Overnight.** Seven cron jobs run on schedule. The morning briefing compiles my day at 8:30 AM. The blog content scanner runs Mondays at 10 AM and auto-publishes approved drafts. The bookmark digest runs at 9 PM. The stale check runs Monday mornings to flag memory files that have not been updated in over two weeks. The worklog rotation runs on the first of each month.

That is the full data flow. One sentence from me becomes six coordinated actions across memory, skills, hooks, and cron -- and I do not have to think about any of it.

## The Continuous Learning Protocol

The memory system is not a static archive. It is a living organism with promotion rules.

Every meaningful action gets logged to the worklog. That is Tier 2. The schema is rigid: date, domain, action, outcome, next step. One line tells me everything I need to resume context.

When a client's status changes -- new invoice sent, deliverable completed, engagement phase shifted -- the relevant `memory_<client>.md` file gets updated. That is Tier 3. Twenty-one curated files, each with a status header at the top.

The interesting part is what happens at Tier 4. The system watches for patterns:

- Three or more similar actions in the worklogs trigger a proposal: "Should I capture this as a Knowledge entry?"
- Two or more similar mistakes trigger an automatic addition to `lessons.md`.
- Five or more successful executions of the same workflow get promoted to a formal SOP.

This is not aspirational design. It is running code. In three months, the Knowledge base has accumulated 47 entries -- brand voice rules, invoice formatting standards, deployment checklists, client communication patterns. Each one emerged from repeated actions, not from me sitting down to write documentation.

The system in March is measurably smarter than the system in January. Not because the model improved. Because the memory layer got denser.

## What This Actually Costs

I will be honest about money because most people writing about AI tools are not.

Claude Code runs on API credits. My monthly spend varies between $150 and $300 USD depending on workload. Heavy weeks with multiple client deliverables, agent team sessions, and content generation push toward the upper end. Routine weeks with email, follow-ups, and memory maintenance sit around $150.

Three decisions cut that cost significantly:

**Model selection.** Not every task needs the most capable model. Simple file searches and exploration use Haiku. Routine operations -- email drafting, memory updates, status checks -- use Sonnet. Complex planning, multi-client synthesis, nuanced writing -- that gets Opus. The difference between running everything on Opus versus using tiered model selection is roughly 60% of total spend.

**Progressive disclosure on skills.** Loading all 40 skills at full detail would burn approximately 200,000 tokens of context per session. The three-layer system -- metadata at startup, instructions on demand, resources when needed -- brings the startup cost to about 4,000 tokens. That is an 80% reduction in context overhead.

**Agent Teams sparingly.** Agent Teams are token-intensive by design -- each sub-agent gets its own context window. I use them for complex multi-domain tasks, not for "check my email." A poorly scoped agent team session can cost $8-12 in a single conversation. A well-scoped one costs $2-3 and saves me an hour of manual coordination.

Does the system pay for itself? The math is straightforward. I bill clients between HKD 800 and HKD 2,000 per hour. If the system saves me 10 hours per month -- and it saves considerably more than that through automated email drafting, instant client context recall, blog publishing pipelines, and reduced mistakes via hooks -- it pays for itself several times over.

The real cost is not the API spend. It is the five months of iteration time to get here.

## What to Build First

If you are starting from zero, do not build my system. Build the first layer and let the rest emerge from actual need.

**Week 1: CLAUDE.md.** Five minutes. Immediate value. Write your project snapshot, three golden rules, and one communication preference. You will feel the difference in your first session.

**Week 2: Auto-memory.** Claude Code has a built-in memory feature that writes to `~/.claude/memory`. Turn it on. Use it for a week. Notice what it remembers and what it forgets. This teaches you what a custom memory system needs to solve.

**Week 3: Your first skill.** Pick the one task you repeat most often. For me it was publishing blog posts. Write the exact steps in a SKILL.md file. Specific paths, specific commands, no ambiguity. Thirty minutes of setup eliminates thirty minutes of re-explanation every time you do that task.

**Month 2: A PreToolUse hook on email.** This is the single highest-value safety investment. Fifteen minutes of setup. One rule: require explicit approval before any outbound message. The day this hook catches its first mistake, you will understand why guardrails matter more than features.

**Month 2-3: A real memory system.** Start with worklogs -- one file, one-line entries, chronological. After two weeks of worklogs, you will see which topics need their own curated files. Create those files. Add a rule in CLAUDE.md to auto-load them on mention.

**Month 3-4: Your first agent definition.** By now you have enough skills and enough memory to make delegation meaningful. Define a specialist agent for your most complex workflow. Give it a focused instruction set and access to the relevant skills.

**Month 4+: Cron jobs.** These come last because they require a stable system underneath. A cron job that triggers a blog scan is useless if the blog publishing skill does not work reliably yet.

This order is not arbitrary. It is the order I actually built things in, minus the six detours into features I thought I needed and did not.

## The ADHD Operating System

I did not build this system because I am organized. I built it because I am not.

ADHD means my working memory is unreliable. I forget what I promised a client two days ago. I lose track of which engagement is in which phase. I start a session, get pulled into something urgent, and forget what I was originally doing. These are not character flaws. They are how my brain works.

The system compensates for every one of these:

**The InstructionsLoaded hook is my "where was I?" button.** Every session starts with automatic context. I do not have to remember where I left off. The worklog tells me.

**The memory system is external working memory.** I do not have to remember that Garden is in Batch 2, that the invoice was HKD 63K, that the Top Management workshop is confirmed. It is in `memory_adaptig_garden.md`. Claude loads it the moment I say "Garden."

**The follow-up tracker is automatic nagging.** My `/followups` command classifies every open todo as OVERDUE, DUE SOON, WAITING, or STALE. I do not have to maintain a mental list of commitments. The system maintains it and flags what needs attention.

**Cron jobs are things that happen even when I forget.** The morning briefing compiles my day whether I remember to check or not. The blog scanner publishes approved content whether I remember to deploy or not. The stale check flags neglected client files whether I remember to review them or not.

**The Stop hook is a non-negotiable exit check.** My tendency is to finish a task and immediately move on, forgetting to update the records. The hook blocks that. Session cannot end until memory is current.

Every component of this system exists because I failed at something without it. The memory system exists because I forgot client commitments. The hooks exist because I almost sent wrong emails. The cron jobs exist because I forgot to publish things I had already written. The Stop hook exists because I kept losing context between sessions.

I am not selling a productivity framework. I am describing a prosthetic for executive function. It works because it was built by someone who actually needs it.

## Mistakes and What Did Not Work

The system you see now is version 12. Here is a selection from versions 1 through 11.

**Over-engineering early.** I built 40 skills before 10 were needed. The first month, I was so excited about the skill system that I created skills for tasks I do twice a year. Most of them sat untouched. The lesson: build a skill the third time you do a task, not the first.

**Memory files growing unchecked.** My worklog hit 102KB before I noticed. Claude was spending thousands of tokens reading entries from two months ago that had zero relevance to today's work. I built monthly rotation after that. Active file stays under 15KB. Old entries get archived. The constraint is the feature.

**Trust calibration on auto-publish.** The blog auto-publish pipeline took three months of guardrail building before I was comfortable turning it on. First version: no approval gate, no content checking. It published a draft with placeholder text to my live site. I saw it 20 minutes later because a friend messaged me. Now the pipeline has content validation, a decision column in the pipeline spreadsheet, and a nudge cron that catches failed publishes on Thursdays.

**Token costs from Agent Teams.** The first time I used Agent Teams for a simple email task, it cost $11. Eleven dollars for one email. Each sub-agent spun up its own context window, loaded the full memory system, and then one of them re-read files the other had already processed. I added model selection rules -- Haiku for search, Sonnet for routine, Opus for complex -- and the average agent team session dropped to $2-3.

**The game that became real.** I built an RTK-style strategy game as a [fun side project](/blog/ada-gersang-gamifying-claude-code) to gamify my Claude Code usage. It was supposed to be a joke. Then I started actually checking the dashboard between sessions. Then I started optimizing my workflow to earn more XP. Then I realized the game had become a genuine motivational tool for someone with ADHD who responds to visible progress bars better than abstract todo lists. Not a mistake exactly, but not what I planned either.

**The voice agent latency problem.** I built a [live voice mode](/blog/i-built-voice-mode-claude-code) using ElevenLabs and Claude as the backend. It worked beautifully in demos. In production, the latency was too high -- ElevenLabs aborts after about one second of silence, and Claude's response time exceeded that. I had to switch to Gemini Flash as the live inference model and keep Claude as a background knowledge layer. The system works now, but the architecture is uglier than I wanted.

I share these not because failure stories are fashionable. I share them because the polished version of this system -- the one I described in Parts 1 through 4 -- can make it look like I knew what I was doing from the start. I did not. I learned what to build by building the wrong thing repeatedly.

## The Full Picture

Here is what a mature AI operating system looks like, after five months of iteration, stated plainly:

It is a 200-line configuration file that tells the AI who it is. It is 21 memory files that tell the AI what it knows about each client. It is 40 skills that tell the AI how to do specific tasks. It is a 163-line policy server that prevents the AI from doing dangerous things. It is 7 cron jobs that make things happen on schedule. It is 9 agent definitions that let the AI delegate to specialists. And it is a continuous learning protocol that makes the whole thing smarter every week.

None of these components is individually impressive. A CLAUDE.md file is a markdown document. A skill is a folder with a text file. The hooks server is a weekend project. The cron jobs are bash scripts.

What makes the system work is not any single piece. It is the fact that every piece connects to every other piece, and the connections were shaped by five months of actual use. The memory system feeds the skills. The skills produce outputs that get logged to memory. The hooks enforce safety on everything. The cron jobs keep the system alive when I am not looking. The agents coordinate across all of it.

Most people use Claude Code as a fancy terminal. That is fine. It is genuinely good at that. But if you keep using it, and you keep solving the same problems -- context loss, repeated mistakes, forgotten follow-ups, manual coordination -- you will eventually build something that looks like this. Not because you planned it. Because each problem demands a solution, and the solutions accumulate into a system.

I did not set out to build an AI operating system. I set out to send a client email without forgetting the attachment. Then I needed to remember what I promised them last week. Then I needed to not send invoices to the wrong person. Then I needed the blog to publish itself. Then I needed agents that could work together.

Five months. Twelve versions. One terminal window.

If it is not in the system, it does not exist. And that is exactly why the system works.

---

*This is the final post in the Claude Code Mastery series. Parts [1](/blog/claude-code-mastery-part-1-getting-started), [2](/blog/claude-code-mastery-part-2-skills-memory), [3](/blog/claude-code-mastery-part-3-hooks-guardrails), and [4](/blog/claude-code-mastery-part-4-agent-teams) cover each component in detail. Connect with me on [LinkedIn](https://www.linkedin.com/in/samwonghk/) if you are building your own system -- I genuinely want to see what other people come up with.*
