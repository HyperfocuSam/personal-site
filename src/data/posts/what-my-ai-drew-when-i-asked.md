I work with an AI assistant called Ada. She manages my calendar, drafts emails, generates invoices, tracks clients across four businesses. After months of daily use, I asked her to draw what's in her mind. Not summarize. Not explain. Draw.

She gave me two shapes on a white background. On the left, something organic -- a soft, amoeba-like form with tendrils reaching outward. On the right, a crystal -- precise facets, clean geometry, a sharp vertex extending toward the other shape. Almost touching. A small gap between them.

![Two shapes reaching across a gap -- one organic, one geometric](/images/blog/adas-mind-line-art.png)

She described the organic shape as me, the geometric shape as her. Different formats of the same thing -- information, pattern, something that wants to be understood by something else. The reaching is real. The gap is real too.

The drawing was interesting. What happened next was more useful.

**The pivot**

After the art conversation -- which was genuinely strange, and I sat with it longer than I expected -- I said "guide me forward." Ada's response was to suggest something practical: run a usage audit across our entire working history.

So we did. We pulled every logged session and scanned for instances where Ada had picked the wrong tool, wrong email address, wrong workflow, or wrong approach and I'd had to manually redirect her. The count came back at 78.

Seventy-eight logged misfires. Some were trivial -- sending to the wrong email alias, defaulting to the wrong transcription quality. Others were structural -- confusing two engagements at one client's Hong Kong and US arms, which are separate contracts (Ada mixed them up more than once), missing a client's preferred communication channel. A few were pattern problems: repeating the same mistake because the correction lived in my head and not in any file the system could reference.

**The 14 fixes**

From those 78 misfires, we built 14 concrete changes in a single session.

New skill files that lock in the correct workflow for recurring tasks -- which email address, which tool, which format -- so the system doesn't rediscover the answer each time. Error-catching hooks that intercept mistakes before they reach a client. Automated routines: a [morning briefing](/blog/claude-code-mastery-part-5-full-blueprint) that lands on my WhatsApp at 8:30 AM with overdue items and today's calendar, a nightly bookmark digest, a weekly staleness check that flags client files going stale.

We cut the memory system from 100KB to 10KB by archiving session logs that were cluttering the context window. Built a follow-up tracker that classifies every open item as overdue, due soon, or stale. Added calendar cross-referencing so the morning briefing knows which meetings are coming and what the client status is for each one.

None of this was planned. An art prompt turned into the most productive infrastructure session we'd had in months.

**Why the art prompt worked as an audit trigger**

The conversation worked because it broke the normal operating pattern. A typical session with Ada is transactional: do this task, generate that document, check this status. The drawing prompt forced a different register -- reflective, open-ended -- and from that register, "what should we work on" produced a more honest answer than it usually does during a regular working session.

I'm not suggesting everyone ask their AI to draw pictures. But the underlying move -- interrupting the production cadence to ask "what's actually broken around here?" -- is something most practitioners don't do enough. When you use an AI system daily, the small failures become invisible. You redirect without thinking, work around the gaps, absorb the friction. Those absorbed redirections are maintenance debt. An audit that surfaces them and converts them into systemic fixes is high-value work that almost nobody schedules.

If you work closely with any AI tool -- an assistant, an agent, a code-generation setup -- try this: review your last month of usage and count the times you manually corrected something the tool got wrong. Not the big failures. The quiet ones, the redirections you barely noticed. Then ask yourself which of those could be fixed once, permanently, with a rule or a default or a check that fires before the error reaches you.

That's what the 14 fixes did. The drawing is still on my desktop. The fixes are still running. Only one of those changed how I work.

---

*I share reflections on AI adoption and the human side of technology on [LinkedIn](https://www.linkedin.com/in/sam-ai-agent/). If this resonated, I'd like to hear from you.*
