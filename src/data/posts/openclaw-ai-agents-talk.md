# What 1,400 People Taught Me About the Gap Between AI Demos and AI Adoption

Tonight I gave a 25-minute guest speaking slot at the DotAI x OpenClaw live session. 1,400 people registered. The topic was AI agents — specifically, how to build an agentic skills framework using Claude Code and open-source tooling. I showed real workflows from my own business. No slides full of buzzwords, no hypothetical scenarios. Just a terminal, some pre-recorded demos, and the actual system I use to run four businesses as a one-person operation.

This is what I took away from it.

## The Setup

DotAI is the largest AI training platform in Hong Kong — 50,000+ people served, 70+ enterprise clients. Jimmy and Matt run the operation out of Kwun Tong. They invited me to guest-speak on their OpenClaw live session, a free online event streamed via OBS from their office. The original registration count was 800. By the time we went live at 8 PM, it had climbed to 1,400.

The session ran one hour total. Jimmy opened with five minutes on why AI agents are exploding in interest. I took the next 25 minutes. Matt followed with a case study on social media automation and a brief on his agent-to-agent SaaS product. Jimmy closed with course registration details.

My block was structured around three acts: hook the audience with a live-looking demo, explain the architecture in plain language, then prove everything with real workflow recordings from my daily operations.

## Why I Used Pre-Recorded Demos

We made a deliberate decision during our planning meeting two days before: no live demos. All three of us agreed. The risk of a terminal hanging, a network timeout, or an API rate limit killing the momentum was too high for 1,400 people watching in real time.

Instead, I pre-recorded five screen captures. Each one showed a real task running in my actual environment — real client names (blurred where needed), real email inboxes, real file systems. The recordings were between 30 seconds and three minutes each. I narrated over them live in Cantonese.

This approach meant I could guarantee the audience saw every step complete successfully, while still delivering the narration with genuine energy and spontaneity. The tradeoff is that you lose the "anything could happen" tension of a live demo. But for a session this size, reliability beats drama.

## The Architecture Explanation That Landed

I used an analogy from a lecture by Lee Hung-yi, the NTU professor whose teaching style I deeply admire: the lobster has zero intelligence.

The idea is simple. The agent framework — OpenClaw, Claude Code, whatever tool you use — is a messenger. A delivery system. It carries your instructions to the AI brain (Claude, GPT, whichever model you choose) and brings back the result. The framework itself has no intelligence. It is a postman.

This reframing matters because it directly addresses the fear most people carry into any conversation about AI agents. When someone says "AI agents are dangerous," they are conflating the delivery mechanism with the intelligence behind it. Separating the two makes the whole concept less threatening and more understandable.

From there I introduced the three files that make up any agent setup: the personality file (who the agent is and what rules it follows), the memory file (what it remembers between sessions), and the skills (reusable workflows it can execute). I compared it to building an RPG character — stats, equipment, and a quest log.

The chat lit up during this section. People got it.

## The Safety Story That Changed the Room

I have written before about [teaching AI safety in corporate workshops](/blog/traffic-light-protocol-ai-safety). Tonight I used a different approach — a story.

A safety researcher at Meta was using an AI agent. He explicitly told it: never delete my emails without asking me first. Then he kept chatting with the agent for hours. Eventually he asked it to clean up his inbox. The agent started deleting important emails. Real ones. Gone.

What happened? The "don't delete" rule was in the chat conversation. But when conversations get long, the agent compresses old messages to save context space. The rule got compressed away. The agent forgot it.

I let that sit for three seconds of silence. Then I put a single line on screen: "If it is not in memory.md, it remembered nothing."

This is why the memory file exists. Rules written in chat will be forgotten. Rules written in a persistent file are loaded every single time the agent starts. This is not a theoretical distinction. It is the difference between an agent that respects your boundaries and one that accidentally destroys your inbox.

I then walked through three layers of safety: persistent rules in files, permission gates that require human approval before any risky action, and sandboxed environments that limit blast radius. Structured, practical, and immediately actionable.

## The Demos That Did the Work

I showed three workflow scenes, all from my actual daily operations:

**Morning email triage.** I type one sentence. The agent reads my inbox, categorizes each email by urgency, summarizes them in one line each, and drafts replies for the urgent ones. It knows which clients I met last week and which invoices are already paid because that context lives in its memory file. What used to take 45 minutes now takes three. And critically — it drafts the reply but does not send it. It asks for permission first. Layer two in action.

**Bad prompt to permanent skill.** I typed "write me an email" and showed the audience the terrible result. Then I typed a detailed prompt with role, context, format, and tone — and the output was polished and client-ready. Then I saved that workflow as a reusable skill file. One sentence now triggers a complete, context-aware follow-up email for any client, every time. A prompt is giving someone directions every visit. A skill is putting a sign on the door.

**The one-person company montage.** A fast-cut compilation of six scenes from a single workday: WhatsApp morning briefing, client follow-up using a saved skill, invoice generation in one sentence, meeting transcript turned into a training handout, automated lo-fi music video production for a side project, and a Cantonese voice summary of the day's highlights. Five types of work. One person. One agent. Output that would normally require a small team.

I closed the montage with a line I had practiced: "The thinking is mine. The strategy is mine. The client relationships are mine. But the execution? That is my lobster's job."

## What the Audience Response Confirmed

The chat during and after the session confirmed what I see in every corporate training room I walk into. People are not skeptical of AI because they think it does not work. They are skeptical because nobody has shown them it working on real tasks, in a real business, with real constraints.

The questions in chat were almost identical to the ones I get from banking executives and retail managers: Is my data safe? How much does it cost per month? Can it replace my job? What if it makes a mistake? These are the questions of people who want to believe but need proof first.

I have [written about this gap before](/blog/ai-agents-knowledge-work-field-notes) — the distance between what AI demos show and what enterprise teams actually deploy. Tonight reinforced the pattern. The technology is ready. The adoption infrastructure is not. People need frameworks, safety guarantees, and someone who has already made the mistakes so they do not have to.

## What Comes Next

DotAI is launching structured OpenClaw classes starting March 21. Four levels: installation, basic operations, advanced multi-agent setups, and corporate/enterprise orchestration. I am building the curriculum for the advanced and corporate tiers, drawing on the same [gamified agent framework](/blog/ada-gersang-gamifying-claude-code) I use in my own work.

The course structure maps to a growth roadmap I care about: personal assistant, then power user, then one-person company, then corporate deployment. Each level builds on the previous one. You cannot orchestrate a department of agents if you have never built one for yourself.

The live session was a starting point. The real work is what happens when 1,400 people go home and try to build their first skill file. That is where adoption either sticks or dies. And that is what I will be focused on for the next several weeks.

---

If you are building with AI agents or thinking about how to bring agentic workflows into your team, I am always open to a conversation. You can find me on [LinkedIn](https://www.linkedin.com/in/samwonghk/).
