
# Claude Code Mastery: Hooks & Guardrails -- Making AI Safe

Last month, my AI agent almost sent a client invoice to the wrong person.

Not a test. Not a hypothetical. A real invoice, real dollar amounts, addressed to the wrong client email. The agent had the right attachment, the right subject line, the right body text. It just picked the wrong recipient from a list of recent contacts.

My PreToolUse hook caught it. The policy engine compared the outbound email against its rules, found that user approval was missing, and blocked the send. I got a denial message instead of a "sent" confirmation. Reviewed the draft, spotted the wrong address, fixed it, approved it manually. Total time lost: twelve seconds. Total damage: zero.

That one save justified the entire hooks system I had spent a weekend building.

This is Part 3 of the Claude Code Mastery series. [Part 1](/blog/claude-code-mastery-part-1-getting-started) covered CLAUDE.md as your AI's operating system. [Part 2](/blog/claude-code-mastery-part-2-skills-memory) covered memory architecture. This one is about the part most people skip entirely: making autonomous AI safe enough to trust with real business operations.

## The Trust Problem

Here is the uncomfortable truth about autonomous AI agents. They are useful precisely because they act without asking. And they are dangerous for the same reason.

If your agent can send emails, modify files, post messages, and query databases -- which mine does, daily -- then every tool call is a live round. There is no sandbox. There is no undo button on a sent email. The "move fast and break things" philosophy does not apply when your agent has access to your Gmail, your WhatsApp, and your client database.

Most Claude Code users have zero guardrails. They rely on the model's judgment alone. That works fine for code generation. It does not work when the agent is managing client communications for a business that trains over 10,000 professionals across six countries.

I needed a "trust but verify" model. Hooks gave me that.

## What Are Hooks?

Hooks are shell commands or HTTP calls that execute in response to Claude Code lifecycle events. Think of them as middleware for your AI agent. They sit between the agent's intent and the agent's action, and they can observe, modify, or block what happens.

Claude Code supports several hook types:

- **PreToolUse** -- fires before a tool executes. Can approve or block.
- **PostToolUse** -- fires after a tool executes. Can inspect output.
- **Stop** -- fires when the session is about to end. Can prevent exit.
- **InstructionsLoaded** -- fires at session start. Can inject context.
- **Notification** -- fires on agent notifications.
- **SubagentStart / SubagentStop** -- fires when sub-agents spin up or shut down.

You configure them in `.claude/settings.json`. Each hook specifies an event type, an optional matcher (to target specific tools), and the action -- either a shell command or an HTTP endpoint.

## PreToolUse: The Email That Never Sent

This is the hook that saved me. Here is the actual configuration from my `settings.json`:

```json
{
  "PreToolUse": [
    {
      "matcher": "mcp__google_workspace__send_gmail_message",
      "hooks": [
        {
          "type": "http",
          "url": "http://localhost:18924/hooks/PreToolUse",
          "timeout": 5
        }
      ]
    }
  ]
}
```

Every time Claude Code is about to send an email through Google Workspace, this hook fires first. It sends the tool name and all its parameters to my local policy server. The server evaluates two rules:

**Rule 1: Sender validation.** The email must come from `sam@adaptig.com`. Not my personal email, not a test account. If the agent somehow picks the wrong sender, the call is blocked with: "Wrong sender account. Must use sam@adaptig.com."

**Rule 2: User approval.** The server parses the conversation transcript looking for explicit approval keywords -- "send it," "go ahead," "confirmed," "lgtm." If I have not approved the send in the conversation, the tool call is denied with: "Outbound email requires explicit user approval. Present the draft first."

The policy configuration in `config.yaml` looks like this:

```yaml
policies:
  - event: PreToolUse
    matcher: mcp__google_workspace__send_gmail_message
    rules:
      - field: tool_input.user_google_email
        equals: "sam@adaptig.com"
        on_fail: deny
        reason: "Wrong sender account. Must use sam@adaptig.com"
      - check: user_approval
        approval_keywords:
          - "approved"
          - "send it"
          - "go ahead"
          - "yes"
          - "confirmed"
          - "lgtm"
          - "looks good"
        on_fail: deny
        reason: "Outbound email requires explicit user approval."
```

Same pattern for WhatsApp messages. Same pattern for file sends. Every outbound communication goes through approval.

## Building the HTTP Hooks Server

The hooks point to a FastAPI server running at `localhost:18924`. It is not a microservice architecture exercise. It is 163 lines of Python that might be the most important code in my entire system.

The server receives the hook payload -- session ID, tool name, tool input parameters, transcript path -- and runs it through a policy engine. The policy engine loads rules from YAML configuration, matches them against the incoming event, and returns a decision: `{"decision": "allow"}` or `{"decision": "deny", "reason": "..."}`.

Every decision gets logged to a SQLite database at `store/hooks.db`. I can audit exactly which tool calls were blocked, which were approved, and why. When I reviewed the logs after the first month, I found 14 blocked sends. Three were legitimate catches -- wrong recipient, wrong sender, missing approval. Eleven were false positives from me forgetting to say "send it" before the agent tried to fire. I tuned the approval keywords and the false positive rate dropped to near zero.

Rate limiting is built in too. Gmail sends are capped at 20 per hour with a 10-second cooldown between calls. Not because I send that many emails, but because a runaway loop in an autonomous agent could burn through your daily send quota in minutes.

The server auto-starts via macOS LaunchAgent. When my machine boots, the hooks server is already running before I open Claude Code. No manual step, no chance of forgetting.

## Stop Hook: Memory Enforcement

The Stop hook solves a different problem. Not safety -- discipline.

My agent manages memory files for every active client -- status updates, action items, contact details, conversation history. If a session involves client work and the agent exits without updating those memory files, context is lost. The next session starts cold.

```json
{
  "Stop": [
    {
      "hooks": [
        {
          "type": "prompt",
          "prompt": "Before ending this session, check: Did this conversation involve any client work? If YES, verify that the relevant Memory files were updated. If they were NOT updated, do NOT end the session yet -- update them now."
        }
      ]
    }
  ]
}
```

This is a prompt-type hook, not an HTTP hook. It injects a prompt into the agent's context right before shutdown. The agent evaluates whether memory write-back is needed and either updates the files or confirms nothing changed. It cannot skip this step. The hook fires every time.

Since deploying this, I have not lost session context once. Before the hook, it happened weekly.

## InstructionsLoaded: The Two-Second Init

The InstructionsLoaded hook fires at session start. Mine injects a lightweight initialization prompt:

1. Read the last 15 lines of the worklog (what happened last session)
2. Check the priority todos for anything overdue
3. Greet me with a one-liner: last action, urgent items, what should we focus on

This takes about two seconds. It does not load the entire memory system -- that would burn tokens on context I might not need. It loads just enough to resume momentum.

The difference between opening Claude Code to a blank prompt versus opening it to "Last session: sent a client invoice. You have 2 items due today. What would you like to focus on?" is the difference between a tool and an assistant.

## PostToolUse: Silent Defense

I run a prompt injection defender as a PostToolUse hook. It scans the output of every Read, WebFetch, and Bash call for suspicious patterns -- instructions embedded in fetched content that try to manipulate the agent's behavior.

```bash
uv run ~/.claude/hooks/prompt-injection-defender/post-tool-defender.py
```

It checks for context manipulation attempts, authority claims, persona injection, and obfuscated payloads. When it finds something, it flags it with a severity level and recommends caution. It does not block the tool call -- PostToolUse hooks cannot retroactively block -- but it injects a warning into the agent's context.

This matters more than most people realize. If your agent fetches a webpage or reads a file from an untrusted source, that content enters the context window. A well-crafted injection in that content could redirect the agent's behavior. The defender does not make this impossible, but it makes it visible.

## Start Here

If you take one thing from this post: add a PreToolUse hook to your email sending tool. One hook. One rule. Require explicit approval before any outbound message.

That is fifteen minutes of setup. It protects against the single highest-consequence failure mode in an autonomous agent: sending the wrong thing to the wrong person.

You can layer complexity later -- HTTP servers, policy engines, audit logs, rate limiters. But the foundation is simple: **never let your agent act on high-stakes operations without a checkpoint.**

The hooks system I have described here is 163 lines of policy engine, a YAML config file, and a few entries in `settings.json`. It runs silently, adds less than 100ms of latency per tool call, and has caught three mistakes that would have been genuinely embarrassing.

Autonomous AI with guardrails is an employee who never forgets to double-check.

Next in the series: [Part 4 -- Agent Teams](/blog/claude-code-mastery-part-4-agent-teams), where I cover multi-agent collaboration, sub-agent delegation, and what happens when your AI agents start working with each other. It gets weird. In a good way.

---

*I train companies across six countries on AI adoption that actually sticks. If you are building with Claude Code and want to compare notes, connect with me on [LinkedIn](https://www.linkedin.com/in/sam-ai-agent/).*
