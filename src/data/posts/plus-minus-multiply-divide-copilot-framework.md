# Plus, Minus, Multiply, Divide: A Cheat Sheet for Teaching Copilot

At 1am the night before a Finance and Purchasing workshop, I scrapped the pack I'd just finished. The team had spent the evening building a Demo 1 to Demo 4 invoice-and-PO arc. Solid material. Technically correct. I couldn't sleep on it because I knew the room.

Finance people don't need a Copilot demo. They've seen the feature tour. What they need is permission to use it without feeling like they're guessing every prompt. This is part of [why I teach Copilot, not ChatGPT](/blog/why-i-teach-copilot-not-chatgpt) — the tool is already in their workflow. The Demo 1 to Demo 4 arc gave them workflows. It didn't give them a way to think.

So I rewrote it around four arithmetic operations. Plus, minus, multiply, divide. By 6am the deck was different, the datasets were regenerated, the prompts were re-cut. The workshop ran at 10. I don't know yet if I would do this again the same way, but the framework survived the panic, which is usually a sign it's load-bearing.

## Why arithmetic

Most non-technical adopters fail at Copilot for the same two reasons. They don't know what to give it (Plus), and they don't know what to take away (Minus). The fancier moves — agents, custom instructions — only make sense once the basic give-and-take is clean.

Arithmetic works because it's portable. You can hold four operators in your head while you're three weeks into a project, post-meeting, mildly stressed. Frameworks with five Cs and seven pillars die the moment the room exits. Plus, minus, multiply, divide doesn't.

## Plus: the upload button is doing more work than you think

The first move is just: give Copilot context it doesn't have. The upload button. The paste. The screenshot.

Three hands-on tasks in the workshop, on three different shapes of data. An MTR commute log (180 rows, daily-life data, low stakes, just to break the "is it allowed to see this?" tension). A P&L by department (36 rows, the kind of thing a finance team actually opens at month-end). A multi-warehouse inventory file (110 rows, with mooncakes near expiry, sourdough running low, nut biscuits sitting too long).

Same operator, three shapes of source. The lesson is structural: Plus is not about typing better prompts. It's about deciding what Copilot needs to see before you ask. When the room realises a 3-line prompt with the right file attached beats a 30-line prompt with no file, they stop optimising the wrong end.

## Minus: most Copilot disappointment comes from too much, not too little

The flip side is harder to teach because it looks like nothing. You take context away.

Two paired exercises in the workshop, same prompt, two versions of the same data. The full sales file: 5,200 rows, 44 columns, three years of transactions. The clean version: 240 rows, 6 columns, last quarter only. Same question. The full version comes back vague or wrong. The clean version surfaces that sourdough is the 58% margin leader and Hong Kong Island outsells Kowloon two-to-one.

Then a forecast file with 580 deleted-but-still-present rows hidden in the dataset (a real pattern from messy export pipelines). The full version hallucinates. The clean version gives a +12% sourdough YoY and a Q2 nut-biscuit dip. The point lands without me saying it: Copilot has a context window, and you can starve it by feeding it too much.

This is the move most internal training skips. They teach prompting; they don't teach pruning. The disappointment rate stays high.

## Multiply: an agent is just a saved chain of moves

Multiply is where most people freeze, because the word "agent" has been overused into uselessness. I treat it operationally: an agent is a Plus and a Minus you've already decided on, plus a fixed output shape, saved so you don't have to re-explain them.

In front of the room, I live-build a Receipt Reading Agent. Five fictional Hong Kong receipts (a cha chaan teng, a supermarket run, a smudged taxi receipt, a SF Express slip, an office-supplies bundle). The agent's job: read each receipt, output a JSON object with fields a Hong Kong accountant would actually want — date, vendor, total, GST, category, payment method, suggested ledger code. The same prompt, every time, with the same output shape.

The room sees that an agent isn't a robot. It's a deliberate decision to stop repeating yourself. The second agent — a raw-material research agent that pulls F&B ingredient pricing from the last 30 days with three sources required — extends the same principle to web search. Multiply is the operator that turns one good prompt into a hundred uses.

## Divide: custom instructions are the cheapest win

Divide is the least dramatic move and the highest return. You carve out a default behaviour so you stop having to specify it. Five templates in the workshop: finance briefing condenser, purchasing negotiation prep, audit-trail discipline, risk-flag preference, report length cap.

I install one of them live in front of the room — the report length cap. Future prompts come back at the requested length without anyone asking. The whole room sees the time tax of restating preferences disappear in one paste.

If a Finance team installs three custom instructions and never touches anything else, they get most of the value. Almost no one teaches this because it looks too simple to bill for.

## What I'd cut next time

Two things, honestly.

The 21-billion-hours-on-Excel opening stat lands hard, but I'm not sure it's the right hook for a Finance audience that already lives in Excel — they don't need to be sold on the size of the problem, they need to be sold on the size of the move. The number works because it's astonishing, but astonishment is not the same as relevance. Next time I'd try the Garden-specific version (which we sized at around 1,125 hours a day across their team) and lose the global stat.

The Magic Moment beat in the middle — a Copilot-makes-a-chart moment between Minus and Multiply — was something I added as insurance against the room going flat. It worked. But if the room is already alive, it's three minutes I'd reclaim. The fallback discipline I built in (口訣: Magic Moment is the first thing cut when running late, Session 2 capture is never cut) survives this critique.

## What didn't break

The arithmetic framework survives because it's not pretending to be more than it is. Four moves. Two prompt-layer (Plus, Minus) and two configuration-layer (Multiply, Divide). You can hold all four in your head during a real workflow, three weeks after the workshop, on a Tuesday when no one is watching.

That's the test I care about. Did the framework outlast the room? It is the same question behind [why most AI training doesn't stick](/blog/why-ai-training-doesnt-stick). I'll know in three weeks when I'm back for Session 2 and the participants either talk about their actual work in these terms, or they don't. If they don't, the operators were the wrong ones, and I'll find out what should have replaced them.

The 1am rewrite was probably right. But "probably right" is all I can give you until the people who sat in the room use it without me there.
