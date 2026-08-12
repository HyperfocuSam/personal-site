# Teaching a Utility Company the 7 Levels of AI Agents

On December 23, 2025 -- two days before Christmas -- I ran a three-hour workshop for a major Hong Kong utility, one of Hong Kong's largest utility companies. The topic was AI Agent Process Automation. The room was full of people who use Copilot daily but had never thought about what an "agent" actually means beyond the marketing buzzword.

I walked in with a 30-megabyte slide deck and a framework I'd been developing across several corporate engagements: a 7-level classification system for AI agents. Not because utility companies need to deploy Level 7 agents tomorrow, but because understanding the full landscape is the only way to make rational decisions about where to invest time and budget.

## Starting with the Right Question

I opened by asking the room: what was the number one AI-related question Hong Kongers asked in the first half of 2025? People guessed "Will AI replace humans?" and "Which AI tool is best?" Reasonable guesses. The actual answer: "Is DeepSeek's fortune-telling accurate?" The room laughed, but the point landed. The public discourse around AI is not where professionals need it to be. That gap between popular curiosity and practical utility is exactly why structured frameworks matter.

## The 7-Level Classification System

The core of the workshop was a classification system I've been refining through multiple corporate training engagements. It maps the full spectrum of what people mean when they say "AI agent," from the simplest chatbot to systems that most enterprise teams won't touch for years. It's a close cousin of the [agent adoption ladder](/blog/agent-adoption-ladder) I use to help teams figure out where to start.

**Level 0 -- Chatbot.** A basic conversational interface. You type, it responds. No memory, no tools, no context. This is what most people picture when they think of AI. I used a Chinese poetry analogy to show how these models simply predict the next character in a sequence -- sophisticated pattern matching, not understanding.

**Level 1 -- Chatbot with Memory and Tools.** Add personalization, custom instructions, and the ability to call external tools. This is ChatGPT with memory enabled, or Copilot with role settings configured. I spent significant time here because this is where most the utility team members could get immediate value. We walked through setting up custom instructions, the structural prompting framework (Role, Task, Details), and how to build a simple agent inside Copilot.

**Level 2 -- Super Agent Interface.** Platforms like Gamma or Manus that orchestrate multiple AI capabilities through a single interface. I demonstrated Gamma generating a 10-slide the utility presentation from an outline produced in Copilot. The output quality difference was visible -- these platforms choose models dynamically and have better aesthetic judgment than any single tool.

**Level 3 -- Agentic Browser Use.** AI that can actually control a web browser -- filling forms, navigating pages, executing multi-step web tasks. I showed Comet (Perplexity's browser agent) filling out a sample form. Not perfect for high-speed tasks like buying concert tickets, but genuinely useful for repetitive form filling that eats hours of administrative time.

**Level 4 -- LLM-Powered Automation.** Single-flow automations where an AI model sits inside a pipeline. Think n8n or Make.com workflows: an email arrives, AI summarizes it, the summary gets saved to Google Drive, a notification goes out. One trigger, one path, one output.

**Level 5 -- LLM-Supported Workflow Systems.** Multi-branch automation where AI handles decision points. The same email arrives, but now the system routes it differently based on AI classification -- urgent vs. routine, internal vs. external, action-required vs. FYI. This is where real process automation begins.

**Level 6 -- Self-Built Python Agent Ecosystem.** Custom agent systems built with code. I briefly showed my own setup: a main AI agent managing specialized sub-agents for different task domains. The ElevenLabs demo went further -- a the utility customer service voice agent built live in the session, using a knowledge base of the utility information and a cloned voice to answer questions verbally. This was the moment the room went quiet, in a good way.

**Level 7 -- IDE/CLI-Based Agentic Interface.** Tools like Claude Code, Gemini CLI, or Codex where the AI operates directly in a development environment with full system access. This is the bleeding edge. I showed it not because the utility needs it now, but because understanding where the ceiling is helps you plan the stairs.

## Five Hands-On Case Studies

Theory without practice is useless in corporate training. We ran five case studies, each building on the previous level:

**Case Study 1: Visual Translator Agent.** Participants built their first Copilot agent that could extract text from images and translate it into Traditional Chinese. We tested it on product labels and -- fittingly -- a the utility utility bill. The structured prompt was six lines. The result was accurate extraction and translation that would have taken a human translator 15 minutes per document.

**Case Study 2: Data Analysis Agent.** Using a sample the utility dataset with sales, social listening, and competitive data, participants built an agent that could clean messy multi-source Excel data and produce a strategic insights report. The prompt positioned the AI as a "Senior Consumer Insights Analyst" with specific output requirements: executive summary, cross-source insight matrix, ranked growth drivers, and stakeholder-ready recommendations.

**Case Study 3: Report Automation.** We designed a "Weekly Insights Automation Specialist" that could take raw performance data and produce two deliverables: a leadership-ready weekly report and a reusable mega-prompt template. The goal was cutting weekly reporting from 3-4 hours of manual compilation down to 30 minutes of review.

**Case Study 4: Presentation Planner.** Participants used AI to go from raw data to a complete 8-slide pitch storyboard, following a Situation-Complication-Question-Answer structure. The output included slide titles, key messages, chart suggestions, and speaker notes -- ready to paste into PowerPoint.

**Case Study 5: Presentation Analyzer.** The reverse operation. Upload an existing slide deck and get a standardized one-page executive summary. We tested this on a real industry report about the European toy market. The practical application for the utility: any team member could digest a 50-slide vendor presentation in two minutes.

## What a Utility Company Actually Needs

the utility doesn't need Level 7 agents. They probably won't need Level 6 for a while either. But after three hours together, the team had a clear picture of where they sit (Level 1-2), where the immediate gains are (Level 2-3), and what the roadmap looks like if they want to move toward process automation (Level 4-5).

The most impactful takeaway wasn't any single tool demo. It was the data analysis case study. When the team saw AI clean a messy dataset and produce a structured strategic report -- with proper assumptions labeling and data quality flags -- the reaction was immediate recognition. That's their Monday morning. That's the work they do every week that could be 80% faster.

I also addressed the question every enterprise audience asks: data privacy. The honest answer is nuanced. There's a difference between deleting a conversation thread on the ChatGPT interface and actually removing your data from cloud storage. We discussed what's safe to upload where, which tools have enterprise data protection, and why Copilot's position inside the Microsoft security boundary matters for a regulated utility company.

## The Bigger Pattern

This was Module 3 in a series, and the progression across modules mirrors what I see across the market. Module 1 covered AI fundamentals. Module 2 addressed practical tool usage. Module 3 -- agents and automation -- is where things get strategic. You stop asking "what can AI do?" and start asking ["which of our processes should AI own?"](/blog/ai-agents-knowledge-work-field-notes)

For the utility, the answer starts with report automation, data analysis, and document processing. Not glamorous. Not the kind of thing that makes viral demos. But for a company that keeps the lights on for millions of Hong Kong residents, reliable process improvement beats flashy demos every time.

---

*I run AI adoption workshops for enterprise teams across Hong Kong. If your organization is trying to figure out where AI agents fit in your operations, I'd welcome a conversation. See my [corporate AI training services](/services) or connect with me on [LinkedIn](https://www.linkedin.com/in/sam-ai-agent/).*
