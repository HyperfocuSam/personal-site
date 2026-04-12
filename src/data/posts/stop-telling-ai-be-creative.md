
# Stop Telling AI to 'Be Creative': What 35 Prompting Strategies Actually Reveal

A Wharton research team tested 35 different prompting strategies and confirmed something I've been teaching in workshops for two years: telling an AI to "be creative" is the least effective thing you can do.

I see it constantly. In prompt engineering sessions, the first thing most participants type is "be creative" or "think outside the box." It's the workplace equivalent of a manager telling their team to "just innovate." It feels productive. It produces the statistical average of everything the model has ever seen — which is, by definition, the opposite of creative.

## What Actually Happens When You Remove Constraints

Large language models don't have inspiration. They have probability distributions. "Be creative" gives the model zero constraints, so it defaults to the most average possible output. I learned this the hard way when I was building [Ada's voice mode](/blog/i-built-voice-mode-claude-code) — I kept asking for "natural-sounding speech" and getting robotic outputs. The breakthrough was specifying exact parameters: cadence, pause length, emphasis patterns. Constraints produced the natural sound that freedom couldn't.

The Wharton findings match this perfectly. The strategies that work all add structure, not freedom.

## The Session That Changed How I Teach Prompting

At [Chow Tai Fook's design thinking workshop](/blog/ctf-ai-design-thinking-workshop-2026), I watched a jewelry designer struggle with open-ended image generation for twenty minutes. She kept typing variations of "create a beautiful ring design" and getting generic results she'd never show a client.

Then we switched to JSON prompt templates — structured objects with specific fields: style era (Art Deco), metal (rose gold), stone arrangement (channel-set), lighting (studio overhead, 45 degrees), mood (editorial). The same designer who'd been stuck produced four usable concepts in under ten minutes. She told me afterward: "I thought creativity meant less structure. It's actually more."

That's the whole insight. Constraints aren't cages. They're scaffolding.

## What I Actually Teach

I've stopped using the word "prompting" in my workshops when I can avoid it. I call it "structured input design" because it shifts the mental model from writing a request (which invites vagueness) to building a specification (which demands precision).

Specificity beats inspiration. "Write a 500-word report with 3 sections, each containing one data point and one recommendation" outperforms "write a detailed report" every single time. Not because the AI is smarter with better prompts. Because precision eliminates the guesswork.

Context beats cleverness. Pasting in your actual data, your actual constraints, your actual audience description produces better results than any prompt template you found on Twitter. A mediocre prompt with real context outperforms a brilliant prompt with no context.

And iteration matters more than either. The best prompters I've trained don't write one prompt. They write a first draft, evaluate the output against what they actually need, and adjust. That evaluation skill — knowing what's wrong with the output and being able to articulate why — is the part that can't be templated. It's judgment. And it takes practice.

The Wharton study validated what practitioners already know. The art of prompting isn't about magic words. It's about being precise about what you actually need. That's a skill most organizations haven't started teaching, and every week they wait, their teams default to "be creative" and wonder why the outputs are mediocre.

---

*I teach prompt engineering as structured input design in [corporate workshops](/services). If your team is stuck at "be creative," that's a solvable problem.*
