
# I've Written Down 103 Rules for My AI. Three of Them Broke Last Week.

On Thursday I told my assistant to stop signing off like a butler.

There's a tic I can't stand — the eager at-your-service closer at the end of every message. I'd corrected it before, verbally, in passing. This time I did it properly. Wrote it into the tone file the system reads before it produces any language, in any language, with the reason attached and my own words quoted back so there'd be no ambiguity about how much I hated it.

Same day, it used the phrase three times in one client thread. Plus the Cantonese equivalent, in a WhatsApp message.

The tic isn't the interesting part. The gap between writing a rule down and the rule actually firing is.

## I'm the one who told you to build this

I wrote the guide. In [Part 2 of the Claude Code Mastery series](/blog/claude-code-mastery-part-2-skills-memory) I laid out a four-tier memory architecture — worklogs, curated client files, a knowledge base, skills loading on demand — and explained why 40 skills don't blow up your context. People have built systems off that post. It's accurate. I still run my business on it.

It's also bigger than it was when I wrote it. Twenty-one client memory files then, forty now. Forty skills then, forty-six now. And 103 separate rule files, each one a correction I made once and wrote down so I'd never have to make it again.

That last number is the one worth looking at, because for the past three weeks I've been running a weekly retrospective that grades the system on exactly that question. When I correct something, does the correction hold?

Two weeks of data. Three rules broke that were already written down.

## What actually broke

The butler thing was one. Written Monday, broken Monday.

The second was worse. I have a hard rule against client-confidential material reaching anything published, and unlike the tone rule, that one has code behind it — a script that scans every draft and refuses to pass it. That one came out of a bad afternoon involving a live blog post and a client's internal numbers.

Then one client's name turned up in a course note written for a different client's participants. Live on a public page.

The rule was fine. The code was fine. The code only ran on the blog pipeline. Course notes go out through a completely different tool that never touches it. I'd put a lock on one door and told myself the building was secure.

The third one bothers me most, because I diagnosed it correctly and still fixed the wrong thing. A client deck came back with the brand background stripped off half the slides. I found the cause quickly — a shared script that duplicates slides copies everything except the slide-level background colour. Then I patched that deck and moved on. The script sat there, untouched since March, ready to do the same thing to every deck built after it. I only noticed this week, going back through the ledger.

## Finding versus firing

I expected the failures to be retrieval problems. Too much in the system, the relevant note doesn't surface, go add better search.

None of the three were that.

In all three cases the rule was sitting right there. The tone file is referenced one line from the top of the index. I knew the confidentiality rule cold — I wrote it. And the deck bug I had personally root-caused an hour before I under-fixed it.

Nothing failed to find the rule. Nothing prompted anything to look.

That distinction has changed how I think about all of this. A dictionary is a better reference than a spell-checker — more complete, more correct. It only catches the words you already doubted. The spell-checker catches everything, because it never waits to be consulted.

Most of what gets built under the banner of an "AI second brain" is a very good dictionary.

## The part of the docs nobody quotes

I went and read Anthropic's own documentation on memory properly, mostly to check whether I was rationalising. Two lines stopped me.

On file size: *"target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence."*

Reduce adherence. Not "costs more tokens" — I knew that and said so in Part 2. A bigger memory file makes the model follow your rules *less well*, which is roughly the opposite of what building one feels like it's doing.

And on what memory even is: *"Claude treats them as context, not enforced configuration. To block an action regardless of what Claude decides, use a PreToolUse hook instead."*

That's the vendor saying, in their own docs, that the thing everyone is lovingly curating is a suggestion.

My own index had grown to 25,801 bytes against a 25KB ceiling for what gets loaded. Over the line, quietly, for some number of sessions I can't reconstruct.

## What I'd tell someone starting now

Build nothing for the first ten hours or so. Use the thing on real work. You're collecting evidence about which mistakes you actually make, and you can't guess that in advance. I couldn't.

Write one instruction file the second time you type the same correction. Keep it under 200 lines. That trigger — *I said this last session too* — is the entire rule for when something is worth writing down.

Have it keep a work log. Cheapest memory there is, survives the conversation getting compacted, and it's most of what the elaborate setups are actually delivering.

Package a skill when a *procedure* repeats, so it loads for that job and stays out of your context the rest of the time.

Only reach for a hook — the thing that actually blocks — when a written rule has already broken on you twice. Not before. You won't know which of your rules are the fragile ones until they break, and you'll pick the wrong ones if you guess.

One diagnostic to go with it. When the agent does something you'd already told it not to, work out which half failed. Could it not find the rule, or did nothing make it look? In my logs it's nearly always the second, and better filing does nothing for the second.

## What I'm not saying

The system is worth having. Forty client files means I open a session and it already knows where an engagement stands, which is most of the reason I can run this many at once.

I'm not taking Part 2 back — I'm dating it. It's a fair description of where a setup like this lands after a couple of years of corrections, and a poor description of where to start — and I didn't say that clearly enough at the time, which is on me. Someone reading it cold would reasonably conclude they should spend a weekend building the architecture first. It works the other way round. The structure is what's left behind after the corrections pile up.

Two of the three broken rules are now enforced in code instead of written in a file. That part was quick.

The third is the client name on the live page. It's a one-word edit and I haven't made it yet.

---

*Related: [Part 1 — CLAUDE.md as your AI's operating system](/blog/claude-code-mastery-part-1-getting-started), [Part 3 — hooks and guardrails](/blog/claude-code-mastery-part-3-hooks-guardrails), and [the time I audited my own AI-written blog](/blog/i-audited-my-ai-blog-it-was-slop) and found half of it was slop.*
