# I Built a Voice Mode for Claude Code Because I Can't Read

I can read. Obviously. But staring at a wall of terminal output after 10 hours of coding -- that's a different kind of reading. The kind where your eyes glaze over, you re-read the same paragraph three times, and then you just type "ok" and hope Claude got it right.

I have ADHD. Long text output from AI coding assistants is genuinely hard for me. Not the content -- the format. A 400-word response with code blocks, bullet points, and markdown headers is information-dense but attention-hostile. My brain wants to skim. Claude Code deserves better than skimming.

So I built a voice mode. (I've also used Claude Code to [rebuild my entire site's SEO in a single session](/blog/seo-rebuild-one-day-claude-code) -- the same co-pilot dynamic, different problem.)

## What It Does

When I finish a conversation in Claude Code, the last response gets spoken aloud. That's it. The plugin reads the session transcript, strips the markdown formatting, and sends clean text to a TTS engine.

The default uses macOS `say` -- zero setup, zero API keys, zero dependencies. If you want better voices, you can switch to OpenAI TTS or MiniMax (which supports timber blending, letting you mix voice profiles for a custom sound).

Here's how the text adaptation works. Claude's markdown output:

```
## Getting Started
- Install with `pip install requests`
- Check the config at `/Users/sam/projects/my-app/config/settings.yaml`
```

Becomes spoken text:

> "Section: Getting Started. First: Install with pip install requests. Next: Check the config at config/settings.yaml."

Code blocks get replaced with "I've included a code block here." Tables become "Here's a table with 3 rows." URLs are stripped, link text kept. Long file paths get shortened. It sounds natural instead of robotic.

## Why a Plugin

Claude Code has a plugin system that supports hooks -- scripts that fire on specific events. The Stop hook fires when a conversation ends. Perfect timing for "read back what you just said."

The architecture is deliberately simple:

1. **Flag file** (`~/.claude-voice/enabled`) -- the hook checks if this file exists. If not, it exits immediately. Zero overhead when disabled.
2. **Transcript parser** -- reads the JSONL session transcript backwards to find the last assistant message. No API calls, no LLM tokens consumed.
3. **Text adapter** -- converts markdown to speech-friendly text. Regex-based, handles all the common patterns.
4. **TTS engine** -- provider pattern with three backends. `say` works offline, cloud providers optional.
5. **Fire-and-forget** -- speech launches as a background process. The hook never blocks Claude Code from exiting.

The whole thing is about 500 lines of Python with zero required dependencies.

## The ADHD Thing

I don't bring up ADHD for sympathy points. I bring it up because developer tools are designed for neurotypical attention spans, and that's a design choice worth questioning.

Think about how much information Claude Code outputs in a typical session. Hundreds of lines. Code diffs, explanations, next steps, caveats. If you can sustain focus on all of that in a monospace terminal font, good for you. I can't always do that, especially late in the day.

Audio changes the dynamic completely. I can listen to Claude's explanation while reviewing the code diff on screen. Stepping away from the desk stops costing the key points. I can catch things I would have skimmed past.

This isn't about laziness. It's about meeting your brain where it is.

## Install It

```bash
git clone https://github.com/hyperfocusam/claude-voice ~/.claude/plugins/claude-voice
```

One command. Voice mode activates using macOS `say` by default. Type `/voice off` if you want to disable it, `/voice status` to check config.

If you want higher quality voices, set `OPENAI_API_KEY` and switch providers in `~/.claude-voice/config.yaml`:

```yaml
provider: openai
openai:
  voice: nova
```

The repo is MIT-licensed. PRs welcome -- especially for new providers, better text adaptation patterns, or Linux audio playback improvements.

## What I Learned

Building this took about an hour. Most of that was the text adaptation -- figuring out what markdown patterns sound terrible when read aloud and writing regex to fix them. Tables were the worst. Nobody wants to hear pipe characters.

The insight I keep coming back to: accessibility features aren't just for people with disabilities. They're for everyone at their worst moment. You don't need ADHD to benefit from hearing a summary of a 500-line response. You just need to be tired, or distracted, or multitasking.

If you use Claude Code and you've ever caught yourself skimming past an important caveat -- try voice mode. Your ears might catch what your eyes missed.

---
