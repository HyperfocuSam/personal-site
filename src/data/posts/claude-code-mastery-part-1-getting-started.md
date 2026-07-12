
# Claude Code Mastery: From Zero to Your First Agent

When I first opened Claude Code, I thought it was just another terminal. A chatbox with a darker color scheme. I typed a question, got an answer, and thought: okay, so it's ChatGPT for people who like monospace fonts.

Three months later it runs my entire business. Four companies, 70+ client engagements, invoices, emails, meeting transcripts, a blog, a voice agent, and a strategy game that tracks my productivity like a Three Kingdoms RPG. All from a terminal window I almost closed on day one.

This is Part 1 of a series on how I actually use Claude Code -- not the marketing version, not the "10 prompts to boost your productivity" version, but the real system I've built over 438 hours of sessions. If you've been curious about Claude Code but haven't started, or you installed it and thought "now what?" -- this is for you.

## Why Claude Code Is Not ChatGPT

The first thing to understand is what Claude Code is not. It's not a chatbox. It's not a browser tab you type questions into. It's not Cursor with fewer features.

Claude Code is a workspace. It lives in your terminal. It can read your files, write new ones, search your codebase, run shell commands, and interact with external services. When you give it a task, it doesn't just tell you what to do -- it does it, right there, in your actual project directory.

ChatGPT gives you advice. Cursor gives you autocomplete. Claude Code gives the AI hands.

That distinction matters more than any feature comparison. The moment you stop thinking of it as "a chat with an AI" and start thinking of it as "an agent that can operate my computer," everything changes.

## Installation: Five Minutes, No Excuses

```bash
npm install -g @anthropic-ai/claude-code
```

That's it. One command. You need Node.js 18+ and an Anthropic API key. Run `claude` in your terminal, authenticate, and you're in.

The first time I launched it, I spent 20 minutes poking around before I understood what I was looking at. The interface is minimal -- a prompt, a conversation history, and tool calls rendered inline. No sidebar. No file tree. No buttons. Just you and a very capable agent waiting for instructions.

If that sounds intimidating, good. It means you're paying attention to what this actually is.

## The Mental Model: Tools, Not Chat

Here's the reframe that changed everything for me. Claude Code doesn't "chat" with you. It uses tools. Six of them matter immediately:

- **Read** -- reads any file on your machine
- **Write** -- creates or overwrites files
- **Edit** -- modifies specific lines in existing files
- **Bash** -- runs shell commands
- **Glob** -- finds files by pattern
- **Grep** -- searches file contents

When you ask Claude Code to "fix the bug in my login page," it doesn't give you a code snippet to copy-paste. It calls Glob to find the relevant files. Calls Read to understand the code. Calls Grep to search for related patterns. Calls Edit to make the fix. Calls Bash to run the tests. Then tells you what it did.

You're not prompting a chatbot. You're directing an agent with real capabilities. The quality of your instructions matters, but in a fundamentally different way than prompt engineering for ChatGPT. You're describing work, not crafting magic words.

## Plan Mode: Think Before You Act

Claude Code has two modes that most people don't realize exist. In normal mode, it reads, writes, and executes immediately. In plan mode -- triggered with `shift+tab` -- it thinks through the approach before touching anything.

I use plan mode for anything non-trivial. "Plan how you'd refactor this authentication flow." "Plan the migration from SQLite to Postgres." "Plan the deployment pipeline for this frontend."

The output is a structured plan you can review, modify, and then execute. It's the difference between telling someone "go fix the kitchen" and "tell me what you'd do to the kitchen, then I'll say go."

For my work -- where a wrong edit to a client invoice template could send the wrong numbers to a real person -- plan mode is not optional. It's the default.

## CLAUDE.md: Your Project's Brain

This is where Claude Code stops being a tool and starts being a system.

Every project can have a `CLAUDE.md` file at its root. Claude Code reads this file at the start of every session. It's not a README. It's not documentation for humans. It's the operating manual for your AI agent.

Here's a sanitized version of what mine actually looks like:

```markdown
# CLAUDE.md

## Project Snapshot
Ada is an executive-assistant agent for Sam Wong across DotAI, Adaptig, Loopem, and Voice2Story.

## Golden Rules
1. Follow the user request; ask one short question if ambiguous.
2. Never assert facts without confirmation or a dated source.
3. Use the matching skill when a task fits.
4. Log meaningful actions before responding.
5. No emojis, concise narrative paragraphs.

## Agent Team Architecture
See `.claude/docs/AGENT_ROUTING.md` for delegation rules.
Agent Teams enabled via CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1.

## Continuous Learning Protocol
Every meaningful action: log to worklogs BEFORE responding.
```

That file is 200+ lines in production. It contains business context, client databases, communication rules, error handling policies, and integration configurations. Every time I start a session, Claude Code loads it and operates within those constraints.

This is the real unlock. Without CLAUDE.md, Claude Code is a smart assistant with amnesia. With it, Claude Code is a team member who remembers the rules.

## Your First Real Task

Forget "hello world." Here's what I'd actually do on day one.

Pick a real file in a real project. Something with a bug, or something that needs a small refactor. Open Claude Code in that directory and type:

```
Look at src/components/LoginForm.tsx. There's a bug where the error
message doesn't clear after a successful retry. Fix it.
```

Watch what happens. Claude Code will Read the file. Understand the component structure. Identify the state management issue. Edit the specific lines. Then explain what it changed and why.

The terminal output looks something like this: a series of tool calls -- `Read src/components/LoginForm.tsx`, `Edit src/components/LoginForm.tsx (lines 42-47)` -- followed by a summary. No copy-pasting. No switching tabs. No "here's the code, go put it in the right place."

That experience -- watching an AI actually fix a bug in your codebase, in the right file, at the right line -- is the moment most people stop thinking of this as a toy.

## MCP: Where It Gets Dangerous

MCP stands for Model Context Protocol. It's a standard that lets Claude Code connect to external services -- Google Calendar, Gmail, Slack, databases, APIs, browser automation, anything with an MCP server.

I currently have 15+ MCP integrations running. Claude Code can read my email, check my calendar, send WhatsApp messages, create documents in Craft, search the web, control a headless browser, and interact with client management tools. All from the same terminal.

I'm not going to deep-dive MCP in Part 1. But I mention it here because understanding that MCP exists changes how you think about Claude Code from the start. This isn't a code editor with AI. It's an operating system for AI agents.

## What Comes Next

This is Part 1 of the Claude Code Mastery series. Here's what's ahead:

- **Part 2: Skills and Memory** -- how to give Claude Code persistent knowledge, reusable skills, and the ability to learn from past sessions
- **Part 3: Hooks & Guardrails** -- making AI safe to automate: PreToolUse validation, prompt injection scanning, and a policy engine
- **Part 4: Agent Teams & Automation** -- your AI workforce: delegation rules, parallel execution, and cost-aware model selection

If you've read my posts on [building a voice mode for Claude Code](/blog/i-built-voice-mode-claude-code) or [turning it into an RTK-style strategy game](/blog/ada-gersang-gamifying-claude-code), you've already seen what the endpoint looks like. This series is the path from zero to there.

The gap between "I installed Claude Code" and "Claude Code runs my business" is not talent or technical skill. It's a mental model shift. Tools, not chat. Systems, not prompts. And a CLAUDE.md file that tells your agent who it is.

If it's not in CLAUDE.md, it remembers nothing.

---

*I train organizations on AI adoption and build agent systems for my own business. Connect with me on [LinkedIn](https://www.linkedin.com/in/sam-ai-agent/).*
