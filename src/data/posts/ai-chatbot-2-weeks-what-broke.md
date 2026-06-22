# I Built an AI Chatbot in 2 Weeks. Here's What Broke on Turn 3.

A client needed an AI-powered advisory chatbot. Not a wrapper around ChatGPT -- a multi-agent system with crisis detection, personalized routing, and a knowledge base of 137 Hong Kong schools. They needed it fast.

I built it in two weeks. With zero employees. My team was me and a stack of AI agents.

This is not a success story about speed. This is about what actually breaks when you ship an AI product built by one person and a fleet of coding agents.

## The Turn-3 Crash

The chatbot worked perfectly for two turns. On the third message, it died.

The error message was generic: "Sorry, there was a problem processing your request." No stack trace in the user-facing response. Just silence.

The root cause took me an hour to find. The system used a `MaxLengthGuardrail` set to 5,000 characters -- a safety measure to prevent users from pasting entire documents into the chat. Reasonable enough. But the guardrail wasn't checking the user's message. It was checking the *assembled context* -- the full payload that includes conversation history, system prompts, agent routing metadata, and the user's message combined.

By turn three, the assembled context exceeded 5,000 characters. The guardrail triggered. Every conversation died on turn three or four.

The fix was six lines of code: extract the user's actual message before running the length check. But finding it required understanding the difference between what the user sends and what the framework assembles behind the scenes.

This is the gap that no "build a chatbot in 10 minutes" tutorial prepares you for.

## The One-Person Development Model

Here's how you ship a multi-agent chatbot with no engineering team.

**Phase 0 is manual.** I spent two days learning the framework (Agno Agent OS) deeply enough to make architecture decisions. Which agents handle which conversation modes. How routing works. Where guardrails sit in the pipeline. AI agents can execute code, but they cannot make foundational architecture decisions. If you skip this, you get a fast-built system that collapses under its own weight.

**Each phase gets a self-contained brief.** I write a spec that includes scope, existing code patterns, file paths, and a verification checklist. The coding agent reads the spec, reads the codebase, executes, and verifies. I review the output. Then the next phase begins.

The workflow looks like this:

1. I decide what to build.
2. My coordinator agent translates intent into a technical spec with concrete pass/fail criteria.
3. A coding agent executes the spec autonomously.
4. I review, approve, and commit.
5. Next phase starts from a clean, known state.

Two phases got the core system running: multi-agent routing across three conversation modes (crisis detection, school advisory, general parenting), a 137-school knowledge base, streaming responses, and user authentication.

The bottleneck was never coding speed. It was specification clarity. When the brief was precise -- including hex codes for design tokens, framework API references, and examples of existing patterns -- the agent delivered clean code. When the brief was vague, the agent invented its own conventions, creating inconsistency I had to untangle later.

## The Inherited Codebase Problem

Before I rebuilt this system, there was an existing codebase. Three repositories, 167,000 lines of code, built by a previous development team. The client needed to understand what they had before deciding what to build next.

I ran a security audit. Eighteen findings. Seven critical.

The critical findings included hardcoded API keys committed directly to the repository -- not in environment variables, not in a secrets manager, in the source code. One repository contained Apple .p8 private keys for push notification services, also committed to version control. Anyone with repository access had production credentials.

The handover score: 3 out of 10. The AI backend -- the actual brain of the system -- wasn't even included in the handover. Three repositories delivered, and the most important one was missing.

This is why "we already have an AI chatbot" doesn't mean what most people think it means. Having code is not having a product. Having a product is not having a secure product. And having a secure product is not having one that works past turn three.

## What "Two Weeks" Actually Looks Like

Day 1-2: Learning the framework. Reading documentation. Making architecture decisions that the AI cannot make for me.

Day 3: Writing the Phase 1 spec. Detailed enough that a coding agent can execute it without asking questions.

Day 4-5: Phase 1 execution and review. Core agents, routing logic, knowledge base, guardrails.

Day 6: Writing the Phase 2 spec. Personalization features, family profiles, response preferences.

Day 7-8: Phase 2 execution. Deployment to production. Then the turn-3 crash.

Day 9: Debugging. The guardrail fix. A missing Dockerfile line that would have crashed the backend on any deployment.

Day 10-14: Testing, iteration, the security audit of the previous codebase, and preparing the executive summary that explained all of this to non-technical stakeholders.

Two weeks is real. But "two weeks" includes two days of learning, two days of spec writing, one day of debugging a six-line fix, and only about four days of actual AI-assisted coding.

## The Spec Clarity Bottleneck

The single biggest lesson: AI agents code fast, but garbage specs produce garbage fast.

When I told the coding agent to "implement the school advisor feature," it produced something that technically worked but used different naming conventions than the rest of the codebase, missed the existing design tokens, and created three new utility files that duplicated existing functions.

When I told it to "implement the school advisor feature using the `AdvisorAgent` class pattern from `agents/base.py`, the color tokens from `styles/tokens.ts`, and the streaming pattern from the crisis agent implementation" -- it produced clean, consistent code on the first attempt.

The difference isn't the AI's capability. It's the spec's precision.

## What This Means

You can build production AI products as a one-person team. The tooling exists. The frameworks are mature enough. The coding agents are capable enough.

But the work hasn't disappeared. It has shifted. From writing code to writing specs. From debugging syntax to debugging architecture. From managing engineers to managing context.

The chatbot crashed on turn three. Not because the AI failed. Because the guardrail was guarding the wrong thing.

---

*I write about building AI products and training enterprises to adopt them. If this landed, I'm on [LinkedIn](https://linkedin.com/in/sam-ai-agent).*
