# What Nobody Tells You About Building Agentic AI

Everyone is building chatbots. I am building agent systems.

The difference is not marketing. It is architectural. A chatbot takes input, returns output. An agent system has specialists that route by topic, memory that persists across sessions, tools that execute real actions, and a UI that shows the user what is happening behind the scenes.

I recently built one from scratch. Four specialist agents. A team router that analyzes every message and delegates to the right expert. Persistent memory that extracts facts about each user and carries them forward. Streaming UI that shows routing decisions, tool calls, and durations in real time.

Here is what I learned that the agent framework docs do not cover.

## Agents are easy. Agent teams are hard.

A single agent with tools and memory works out of the box. Give it instructions, connect a model, done. The moment you introduce a team -- a router that delegates to specialists -- everything changes.

The router has its own personality. It wants to answer questions itself instead of delegating. It needs to be told, repeatedly, in multiple phrasings, that its only job is to route. "ALWAYS delegate. NEVER answer directly. Even for greetings." Three variations of the same instruction. LLMs need redundancy to follow routing constraints reliably.

This is the first thing nobody warns you about: **orchestration is a prompt engineering problem, not an architecture problem.**

## Memory is the killer feature -- if you share it

The moment an AI remembers something you said last week, the experience shifts. It stops being a tool and starts being an advisor. Users notice immediately.

But memory only works if every agent in your system reads and writes to the same store. If your finance agent extracts a fact and your wellness agent cannot see it, you have four chatbots pretending to be one system. Shared state across agents is trivial to implement and easy to forget.

**The product insight: users do not care which agent answered. They care that the system remembers.**

## Agentic UX is not about the answer

The biggest upgrade I made was not to the agents. It was to the frontend.

When I started forwarding structured events -- which agent picked up the message, which tools it called, how long each step took -- the entire experience changed. Users could see the routing decision, watch a web search spin for 2.3 seconds, see the handoff from router to specialist. Activity chips. Duration badges. Agent labels.

It stopped feeling like a chatbot and started feeling like a team working for you.

Most agent frameworks give you streaming text. That is the minimum. The real product is in surfacing the process: the delegation, the tool usage, the reasoning chain. When users can see the machinery, they trust it more. Not less.

**Show the work. Agentic AI is not magic. It is visible competence.**

## Guardrails encode cultural assumptions

I built input validation that rejected short responses as errors. Anything under 10 characters got flagged. Reasonable in English, where even a simple answer is a full sentence.

In Cantonese, a perfectly valid response is three characters. The guardrail was killing good replies and users saw empty bubbles with no explanation.

This extends beyond character counts. Prompt injection detectors trained on English flag normal Chinese sentence patterns. PII detectors misfire on different phone number formats. Every validation rule carries cultural assumptions baked in from its training data.

**If you are building for multilingual users, every guardrail is guilty until proven innocent.**

## The 80/20 of agent frameworks

Agent frameworks give you 80% for free. Model integration, tool calling, memory extraction, session persistence, streaming -- all handled. You can have a working agent in 50 lines of code.

The other 20% is where the product lives. Session replay that actually works for multi-agent conversations. Encoding that survives round-trips through different storage layers. Error states that tell the user what happened instead of showing nothing. Streaming proxies that classify a dozen event types and reassemble them for the frontend.

Nobody ships the 80%. Everyone ships the 20%.

## What I actually believe about agentic AI

Agents are not a feature. They are an architecture. The moment you have routing, memory, tools, and specialist delegation, you are not building a chatbot anymore. You are building a system that reasons about who should handle what, remembers what it has learned, and takes real actions.

The frameworks make the architecture accessible. The product work -- the UX, the edge cases, the cultural assumptions -- that is still on you.

And that is where the craft is.

---

*Sam Wong builds agentic AI systems and trains companies on AI adoption across 6 countries. Connect on [LinkedIn](https://www.linkedin.com/in/samwong-ai/).*
