# A calendar for people who cannot look at a calendar

I have severe ADHD. Lists make me freeze. When a calendar opens I do not see a schedule, I see a wall of things I am already behind on. Every todo app I tried asked for a project, a priority, a tag and a time before it let me write the thing down. So the thing did not get written down.

Two weeks ago I built the opposite and have used it every day since. Today it is open source: [Calendar for Real ADHD](https://github.com/HyperfocuSam/calendar-for-real-adhd).

![Log a card, it drifts, cross it out](/images/blog/calendar-for-real-adhd-demo.gif)

## What it is

One white page. One LOG button in the middle. You type what it is and which day. Nothing else is asked. The thing becomes a card that drifts gently above the button. Red means within a week. Black means this month. Grey means not yet. When it is done you cross it out and it leaves the page.

Three pages, so events, reminders and deadlines do not sit on top of each other. That is the whole feature list. No search, no tags, no sync, no account.

## Why the drifting matters

A static grid of tasks reads as a stack, and a stack reads as debt. Cards that move a few pixels never look like a list. The page stays mostly empty on purpose. When it fills up, that is the signal, not a badge count.

## The part that makes it work: an agent feeds it

I do not enter dates. My assistant reads my real calendar, my payment schedule and my task tool once a day, drops the recurring noise, and posts the dozen dates that actually matter. They just drift past.

The rules the agent follows are in the repo, in a file called AGENTS.md, and they are short. One card per real thing. Under eighty characters. Never touch where a card was dragged. Never mark anything done unless told so, about that card, in that conversation. The last rule is the one that keeps the trust.

## Run it

One Node file and one HTML file. No build, no dependencies, and the data stays in a JSON file on your machine.

```
git clone https://github.com/HyperfocuSam/calendar-for-real-adhd
cd calendar-for-real-adhd
node server.js
```

Then point your agent at AGENTS.md, or use the small `todo` command in the repo.

If a tool asks you to decide anything at the moment you are trying to write something down, it will lose to the blank page. This one asks for a day and nothing else.
