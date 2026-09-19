# The Traffic Light Protocol: How I Teach AI Safety in 15 Minutes

Every workshop I run hits the same wall inside ten minutes. A hand goes up: "But what about data security?" It has happened with bankers, with [jewelry designers at Chow Tai Fook](/blog/ctf-ai-design-thinking-workshop-2026), with [engineers at Arup](/blog/arup-ai-lunch-learn), with HR teams, with teachers. Until the question is answered the room does not move, because nobody experiments with a tool they think could get them fired.

Somewhere past the 10,000th professional I settled on the version I now use everywhere, and it takes fifteen minutes.

I should say where the colors come from, because I get credited for them and they are not mine. The traffic light comes out of privacy guidance that predates any of these tools, and most compliance teams I meet already have some version of it written down somewhere. What I built is the fifteen-minute version that survives contact with a room of people who have not read the document.

## Why the document loses to the metaphor

At a [program for 1,530 staff at a major Hong Kong bank](/blog/1500-banking-professionals-ai-adoption), the compliance team had produced proper AI guidelines. Well written, legally sound, and ignored. When I asked why, the answer was not that it was too long. People assumed it said "don't use AI," so reading it could only cost them something.

That is the pattern everywhere. A thirty-page acceptable use policy is a reference document — nobody runs it in their head at 4pm with a deadline. A blanket ban is worse, because it pushes the same behavior onto personal phones where nobody can see it. What people can hold is a mental model with three states and an action attached to each.

## Red, yellow, green

**Red: never goes into an external AI tool.** Client names, account numbers, HKID numbers, transaction records, salary and performance data, patient records, unreleased designs, internal system screenshots. The word doing the work is "external." Plenty of companies have an internal tool with the data handling already sorted; red is about the public ones.

**Yellow: anonymize first.** Internal and non-public, usable once the identifying parts come out. Process documents with the team names stripped. Meeting minutes where the individuals become "the team lead." Metrics aggregated instead of per person. Draft communications with the client references removed. The test I give is one sentence: if this text appeared on a public website tomorrow, would anyone be embarrassed or harmed? If yes, it is yellow, and it needs work before it touches anything.

**Green: use it freely.** Published reports, press releases, regulatory guidelines, industry research, general questions, anything invented for practice. This is the category that changes the mood in the room. Most people have been treating everything they touch as red, and seeing how much of their week is actually green is what gives them permission to start.

## The three-second check

The framework only earns its place if it runs faster than the hesitation it replaces. Before anything goes into a tool, three questions. Does this contain names, account numbers or personal data? Red, stop. Could it do its job with the identifying parts taken out? Yellow, do that first. Is it published, or invented? Green, go.

Three seconds, no document. In practice the check gets internalized somewhere in the first session, and after that people argue about the edge cases themselves. I have watched a finance team work out on their own that the quarterly board pack is yellow while the published financials are green, which is the moment the protocol stops being mine and starts being theirs.

## What it does not do

It does not draw the line. Someone with authority still has to decide where red starts for that company, and where nobody has decided, I am teaching a mental model with no policy behind it. At [a Hong Kong food manufacturer](/blog/food-company-ai-workshops-three-batches) the IT lead had set the boundaries before I arrived: Copilot as the tool, research and drafting fine, anything touching customer data, P&L figures or employee records stays offline. That constraint sounds like it limits the training. It removed a month of arguments and it is why the sessions went anywhere.

The zones also move by industry, and the tiering is easier to teach in some rooms than others. When I ran the first session of a [24-month program at HKCT](/blog/when-a-school-commits-to-24-months-of-ai), the yellow zone was wider than in banking and the cost of getting red wrong was more personal, because red there is a named student. Assignment briefs, fine. Student records, never. Exam content, obviously not. Same three colors, a different map.

And I cannot tell you it makes adoption stick on its own. What I can tell you is what happens inside the fifteen minutes: arms uncross, and within five minutes people are proposing their own examples instead of waiting for permission. That is the part that has to happen before [any of the rest of it works](/blog/why-ai-training-doesnt-stick), which is why it goes before the prompting, before the tool demo, before anything else on the agenda. If you are building AI training for your own company and wondering where to start, it costs you fifteen minutes.
