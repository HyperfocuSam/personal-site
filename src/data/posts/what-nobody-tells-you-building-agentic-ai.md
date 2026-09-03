# What Nobody Tells You About Building Agentic AI

The guardrail I was proudest of was quietly killing good replies. I had built input validation that flagged anything under 10 characters as an error -- reasonable in English, where even a short answer is a full sentence. In Cantonese, a perfectly valid reply is three characters. Users were seeing empty bubbles with no explanation, and nothing in the framework docs had warned me.

That gap -- between what the docs cover and what building an agent system actually teaches you -- is what this post is about. A chatbot takes input, returns output. An agent system has specialists that route by topic, memory that persists across sessions, tools that execute real actions, and a UI that shows the user what is happening behind the scenes.

I recently built one from scratch. Four specialist agents. A team router that analyzes every message and delegates to the right expert. Persistent memory that extracts facts about each user and carries them forward. Streaming UI that shows routing decisions, tool calls, and durations in real time.

Here is [what I learned](/blog/ai-agents-knowledge-work-field-notes) that the agent framework docs do not cover.

## Agents are easy. Agent teams are hard.

A single agent with tools and memory works out of the box. Give it instructions, connect a model, done. The moment you introduce [a team -- a router that delegates to specialists](/blog/claude-code-mastery-part-4-agent-teams) -- everything changes.

The router has its own personality. It wants to answer questions itself instead of delegating. It needs to be told, repeatedly, in multiple phrasings, that its only job is to route. "ALWAYS delegate. NEVER answer directly. Even for greetings." Three variations of the same instruction. LLMs need redundancy to follow routing constraints reliably.

This is the first thing nobody warns you about: getting the orchestration right turned out to be prompt engineering work, not architecture work.

## Memory is the killer feature -- if you share it

The moment an AI remembers something you said last week, the experience shifts. It stops being a tool and starts being an advisor. Users notice immediately.

But memory only works if every agent in your system reads and writes to the same store. If your finance agent extracts a fact and your wellness agent cannot see it, you have four chatbots pretending to be one system. Shared state across agents is trivial to implement and easy to forget.

Nobody who tested the system ever asked which agent had answered. They noticed when it remembered them, and they noticed when it did not.

## Agentic UX is not about the answer

The biggest upgrade I made was not to the agents. It was to the frontend.

When I started forwarding structured events -- which agent picked up the message, which tools it called, how long each step took -- the entire experience changed. Users could see the routing decision, watch a web search spin for 2.3 seconds, see the handoff from router to specialist. Activity chips. Duration badges. Agent labels.

It stopped feeling like a chatbot and started feeling like a team working for you.

Most agent frameworks give you streaming text. That is the minimum. The real product is in surfacing the process: the delegation, the tool usage, the reasoning chain. When users can see the machinery, they trust it more. Not less. My default now is to surface every step the system takes.

## Guardrails encode cultural assumptions

The three-character problem I opened with extends far beyond response length. Prompt injection detectors trained on English flag normal Chinese sentence patterns. PII detectors misfire on different phone number formats. Every validation rule carries cultural assumptions baked in from its training data.

If you are building for multilingual users, every guardrail is guilty until proven innocent.

## The 80/20 of agent frameworks

Agent frameworks give you 80% for free. Model integration, tool calling, memory extraction, session persistence, streaming -- all handled. You can have a working agent in 50 lines of code.

The other 20% is where the product lives. Session replay that actually works for multi-agent conversations. Encoding that survives round-trips through different storage layers. Error states that tell the user what happened instead of showing nothing. Streaming proxies that classify a dozen event types and reassemble them for the frontend.

The framework got me a working demo in an afternoon. Everything my testers actually complained about lived in that last 20%.

## What I actually believe about agentic AI

Agents are not a feature. They are an architecture. The moment you have routing, memory, tools, and specialist delegation, you are not building a chatbot anymore. You are building a system that reasons about who should handle what, remembers what it has learned, and takes real actions.

The frameworks make the architecture accessible. The product work -- the UX, the edge cases, the cultural assumptions -- that is still on you.

---
