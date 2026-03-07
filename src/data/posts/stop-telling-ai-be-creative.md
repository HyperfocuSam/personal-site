
# Stop Telling AI to 'Be Creative': What 35 Prompting Strategies Actually Reveal

A Wharton research team tested 35 different prompting strategies and confirmed something I've been teaching in every workshop for two years: telling an AI to "be creative" is the least effective thing you can do.

This matters because I see it constantly. In prompt engineering training sessions, the first thing most participants type is some variation of "be creative" or "think outside the box." It's the workplace equivalent of a manager telling their team to "just innovate." It sounds productive. It produces nothing.

## Why Vague Instructions Fail

Large language models don't have inspiration. They have probability distributions. When you say "be creative," you're giving the model zero constraints, which paradoxically produces the most generic output. The model defaults to the statistical average of everything it's seen -- which is, by definition, the opposite of creative.

When I [trained HKJC's management trainees on prompt engineering](/blog/hkjc-mt-ai-training), we used a three-layer framework: precision, structure, then context. Not once did we tell the AI to "be creative." Instead, we gave it specific constraints that forced interesting outputs.

## What the Research Actually Shows

The strategies that work share a common pattern: they add structure, not freedom. The most effective approaches include:

**Role assignment.** "You are a luxury brand strategist analyzing the Gen Z jewelry market" outperforms "analyze the jewelry market" every time. At [Chow Tai Fook's workshop](/blog/ctf-ai-design-thinking-workshop-2026), we took this further with JSON prompt templates -- structured objects where designers fill in parameters like style, material, lighting angle, and mood. Beginners who struggled with open-ended prompting produced consistent, high-quality outputs within minutes.

**Constraint-based prompting.** "Generate 5 taglines under 6 words each, using alliteration, for a retirement savings app" beats "write creative taglines." Constraints are the scaffolding that enables creativity, not the cage that limits it.

**Iterative refinement.** The best prompters don't write one prompt. They write a first draft, evaluate the output, and adjust. This is the skill that separates someone who's "tried ChatGPT" from someone who's integrated AI into their workflow.

## What I Teach Instead of "Be Creative"

In my corporate prompt engineering workshops, I teach three principles:

**1. Specificity beats inspiration.** Replace adjectives with numbers. Instead of "write a detailed report," say "write a 500-word report with 3 sections, each containing one data point and one recommendation."

**2. Structure beats freedom.** Give the model a format. A table. A JSON object. A template with blanks to fill. The output quality jumps immediately because the model knows exactly what shape the answer should take.

**3. Context beats cleverness.** Paste in your actual data, your actual constraints, your actual audience. A mediocre prompt with real context outperforms a brilliant prompt with no context every single time.

The Wharton study validated what practitioners have known: the art of prompting isn't about finding magic words. It's about being precise about what you actually need. That's a trainable skill, and most organizations haven't started teaching it.
