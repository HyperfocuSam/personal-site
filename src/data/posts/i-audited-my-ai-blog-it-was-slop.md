
# I Audited My AI-Managed Blog. Half the Posts Were Slop.

Two weeks ago I wrote about how my [autonomous blog pipeline died silent for three weeks](/blog/my-blog-publishes-itself-silent-death). I fixed the infrastructure, got it running again, and felt good about myself. Problem solved. System restored.

Then I actually read the posts.

Not skimmed. Read. Start to finish, the way a stranger would find them through search. And the thing I noticed made me more uncomfortable than the pipeline outage: a lot of what my AI assistant had published on my behalf didn't sound like me. It sounded like a well-trained language model writing about someone who trains people on AI.

## What AI Slop Actually Looks Like When It's Yours

I know what AI-generated content looks like — I teach people to spot it in my workshops. The tells are predictable: hedging language, filler transitions, everything structured in threes, neat conclusions that resolve too cleanly. I coach enterprise teams to evaluate AI output critically and not accept the first draft.

Apparently I wasn't doing that with my own blog.

I pulled up eight posts and ran them against my own content DNA — a voice reference document I built from 17 Threads posts and 30 blog articles to capture how I actually write. The diagnosis was immediate. Five of eight commentary posts had the same problems:

Every single one followed a three-point structure. Three reasons AI training fails. Three things that actually work. Three principles for better prompting. Real thinking doesn't come in threes. It comes in messy, uneven chunks. The triple-point format is the AI equivalent of a PowerPoint template — it looks organized, but it's a tell.

The filler transitions were everywhere. "Here's the thing." "Here's the pattern." "This matters because." I don't talk like that. Nobody talks like that. Those phrases exist because the model needs a bridge between paragraphs and defaults to the most generic one available.

And the closings. Eight posts ended with the same sentence: "I help enterprise teams navigate AI adoption through workshops, coaching, and pioneer programs." Word for word. Eight times. A human would never write the same sign-off on eight different essays. But an AI optimizing for "professional CTA" will converge on the same phrasing every time.

## Where My Voice Was and Where It Wasn't

The posts that actually sounded like me had something the others didn't: a moment where I was wrong, surprised, or moved. In the post about [Ada drawing what's in her mind](/blog/what-my-ai-drew-when-i-asked), I wrote "I cried watching it. I'm not embarrassed to say that." In the pipeline postmortem, I admitted the failure was entirely my own and showed the actual terminal output. Those posts have rough edges. Unanswered questions. Things that don't resolve neatly.

The commentary posts had none of that. They were opinions without stakes. Correct but impersonal. Every claim supported, every section balanced, every conclusion tidy. Reading them felt like reading a consultant's newsletter, not a person's blog.

My content DNA document has a formula for this:

```
SAM_CONTENT = (
    SPECIFIC_EXPERIENCE + CONTRARIAN_REFRAME + NAMED_TOOLS
    + VULNERABILITY_ANCHOR + PHILOSOPHICAL_CLOSER
) - HYPE - EMOJIS - VAGUENESS
```

The AI-generated posts were hitting the first three ingredients and missing the last two entirely. Specific experience, yes. Named tools, yes. No hype, yes. But no vulnerability. No philosophical weight. The machine could mimic my surface — direct, specific, no buzzwords — but couldn't replicate the part underneath where I'm uncertain, uncomfortable, or genuinely surprised.

## What I Changed

I rewrote the pipeline prompt. The original instruction was 14 words: "Write the full blog post in Sam's voice: direct, specific numbers, no hype, educational." That's a description of the surface. It tells the model what I sound like but not how I think.

The new prompt is 250 words of rules about what NOT to do. No three-point structures. No filler transitions. No generic section headers like "What Actually Works" or "The Takeaway." No identical closings. Every post needs at least one rough edge — an admission of uncertainty, something I got wrong, a question I can't answer yet. And every post needs at least two of what I call the paradox tensions that make my writing mine: enterprise credibility alongside personal vulnerability, technical depth alongside human philosophy.

Then I rewrote six posts by hand. The IT department post got a new section called "The Part I Still Get Wrong" where I admit a VPN issue at Chow Tai Fook that I should have caught. The CEO-learns-to-code post lost its three celebrity quote opener and got a real story about my co-founder building a prototype in two hours. The skill formation post got an admission that I've been applying the 70/30 ratio to learners when I probably shouldn't be.

I also killed every instance of the boilerplate closing across the entire blog. Fourteen posts. Each one now has a sign-off that could only belong to that specific essay.

## The Part That Bothers Me

I'm an AI trainer who teaches people to evaluate AI output critically. I run workshops on prompt engineering and quality assessment. And I let my own AI publish dozens of posts without applying the same standards I teach my clients.

The pipeline was working exactly as designed. The problem wasn't the automation. It was that I'd automated the wrong thing. I automated "publish content" when I should have automated "publish content that sounds like a human wrote it because a human is accountable for it."

I don't think this is just my problem. Every company using AI to generate content — marketing copy, reports, proposals, blog posts — is facing the same question: does this sound like us, or does it sound like everyone? Because AI's default output is, by statistical definition, the average of everything it's trained on. And the average is nobody's voice.

The pipeline runs every Monday. Tomorrow is Monday. I'll be reading what it publishes.

---

*This is the sequel to [My Blog Publishes Itself. It Died Silent for 3 Weeks](/blog/my-blog-publishes-itself-silent-death). The infrastructure is fixed. Now the voice is fixed. We'll see which one holds.*
