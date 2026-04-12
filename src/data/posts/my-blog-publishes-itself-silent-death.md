# My Blog Publishes Itself. It Died Silent for 3 Weeks.

I built an autonomous blog pipeline. Every Monday at 10 AM, an AI agent scans my client work from the past 30 days, picks the best topic, writes a draft in my voice, publishes it to my website, cross-posts to Substack, and sends me a WhatsApp notification in Chinese. No human in the loop.

It worked for months. 47 posts. Case studies, methodology breakdowns, Claude Code tutorials. The pipeline was the most reliable part of my content operation.

Then it stopped. For three weeks, nothing published. No error notification. No alert. No indication that anything was wrong. The system reported success every single run.

## What Happened

The pipeline runs as a macOS LaunchAgent -- a scheduled script that fires every Monday. The script wraps the Claude Code CLI in a `timeout` command to prevent runaway sessions:

```bash
timeout 600 claude -p "This is Ada's autonomous blog pipeline..."
```

One problem: macOS does not ship GNU `timeout`. It is part of `coreutils`, which you install via Homebrew. At some point between March 16 and March 23, I added the timeout wrapper to the script. I tested it in my terminal, where `coreutils` was in my PATH. It worked.

But `launchd` does not inherit your shell PATH. When the cron fired, it hit:

```
timeout: command not found
```

And exited. With exit code 0. Because in bash, a "command not found" on the first command in a pipeline does not propagate as a failure by default. The script continued to the final line:

```bash
echo "=== Blog scan finished (exit: 0) ==="
```

Every Monday for three weeks, the script started, failed in under one second, reported success, and went back to sleep.

## Why I Did Not Notice

Three independent factors stacked up:

**The exit code lied.** LaunchAgent checks exit codes. Exit 0 means success. The system thought everything was fine.

**No notification on success.** The WhatsApp notification only fires after a successful publish. No publish means no notification. But silence was the normal state for a Monday where no good topic was found -- the pipeline legitimately skips some weeks. So no notification was not a signal.

**Interactive sessions masked the gap.** During those three weeks, I published four posts manually during interactive Claude Code sessions. The blog was getting new content. I just did not notice the autonomous pipeline was dead because I was doing the work myself.

## The Fix

Three changes, each addressing one failure mode:

**1. Switch to `gtimeout`.** Homebrew installs GNU utilities with a `g` prefix on macOS. The correct command is `gtimeout`, not `timeout`. Installed coreutils and updated both scripts.

**2. Add a preflight check that fails loud.**

```bash
for cmd in gtimeout claude; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "PREFLIGHT FAIL: $cmd not found" >&2
    terminal-notifier -title "Ada Blog Pipeline" \
      -message "PREFLIGHT FAIL: $cmd missing" -sound Basso
    exit 1
  fi
done
```

If any dependency is missing, the script exits with code 1 (not 0) and fires a native macOS notification. The notification is the "cannot fail" channel -- it does not depend on WhatsApp, email, or any external service.

**3. Exit 1, not exit 0.** The preflight uses `exit 1` so launchd marks the run as a failure. `launchctl list` now shows the correct exit status.

## What This Taught Me About Autonomous Systems

The failure mode was not "the code broke." The failure mode was "the code broke silently and reported success." That is worse than a crash. A crash gets your attention. A silent success that is actually a silent failure can run for weeks.

Three principles I now follow for any autonomous pipeline:

**Preflight your dependencies.** Do not assume the runtime environment matches your development environment. Check every external command before you use it. Fail at the start, not in the middle.

**Fail loud, not quiet.** Exit code 0 should mean "I actually did the thing," not "I did not crash." If the pipeline did not produce output, that is a failure. Treat it as one.

**Build a notification for absence, not just presence.** I got a WhatsApp when a post published. I should have also gotten one when a Monday passed without a publish. Silence should be a signal, not the default.

The pipeline has been running clean since the fix. Tomorrow is Monday. We will see.

---

*This is part of a series on building AI-powered automation with Claude Code. Previous: [Claude Code Mastery: The Full Blueprint](/blog/claude-code-mastery-part-5-full-blueprint).*
