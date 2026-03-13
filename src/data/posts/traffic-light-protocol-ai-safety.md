# The Traffic Light Protocol: How I Teach AI Safety in 15 Minutes

Every AI workshop I deliver hits the same wall within the first ten minutes. Someone raises their hand and asks: "But what about data security?"

It does not matter whether I am training bankers, jewelry designers, HR professionals, or engineers. The question always comes. And until it is answered, nobody moves. People will not experiment with a tool they believe could get them fired.

After training over 10,000 professionals across industries, I have landed on a framework that consistently breaks through this wall in under fifteen minutes. I call it the Traffic Light Protocol.

## Why Policies Fail and Frameworks Stick

Most organizations handle AI safety with a document. A 30-page acceptable use policy that nobody reads. Or worse, a blanket ban that pushes usage underground.

I have seen both approaches fail at scale. At a 1,530-person banking program, the compliance team had produced detailed AI guidelines. Well-written, legally sound, completely ignored. Participants told me they did not read it because they assumed it would just say "don't use AI."

The problem is not the content. The problem is the format. People do not internalize policy documents. They internalize mental models.

## The Three Colors

The Traffic Light Protocol classifies all workplace data into three categories. Everyone already knows what red, yellow, and green mean. That is the entire point.

### Red: Never Enter Into External AI Tools

This is non-negotiable. Red data must never be pasted, uploaded, or described in any external AI tool.

Examples vary by industry, but the pattern is consistent:
- **Banking:** Client names, account numbers, transaction records, HKID numbers, internal system screenshots
- **Retail:** Customer purchase history with PII, supplier pricing agreements, unreleased product designs
- **HR:** Employee performance reviews with names, salary data, disciplinary records
- **Healthcare:** Patient records, diagnostic data, prescription history

The key word is "external." Many organizations have internal AI tools with appropriate data handling. Red data is specifically about public-facing tools like ChatGPT, Claude, or Gemini.

### Yellow: Requires Anonymization First

Yellow is where most real work lives, and where most mistakes happen. This data is internal and non-public, but can be used with AI if properly anonymized.

Examples:
- Internal process documents (remove team names, project codes)
- Meeting minutes (strip names, use "Team Lead" instead of "Sarah")
- Performance metrics (aggregate, never individual)
- Draft communications (remove client-specific references)

I teach a simple test: "If this text appeared on a public website, would anyone be embarrassed or harmed?" If yes, it needs anonymization before it touches an AI tool.

### Green: Safe to Use Freely

Green data is publicly available information. This is where people should be spending most of their AI experimentation time.

Examples:
- Published annual reports and press releases
- Industry research and market data
- Regulatory guidelines and public policy documents
- General knowledge questions and skill-building prompts

When I show this category, I watch the room relax. Most professionals have been avoiding AI entirely because they assumed everything they work with is off-limits. Seeing that a large portion of their information tasks involve green data gives them permission to start.

## The 3-Second Check

The framework only works if it is fast. I teach people to run a three-second mental check before every AI interaction:

1. Does this contain names, account numbers, or PII? **Red. Stop.**
2. Is this internal but could be anonymized? **Yellow. Anonymize first.**
3. Is this publicly available or completely fictional? **Green. Proceed.**

Three seconds. No policy document required.

## What Happens in the Room

I have now used this framework with banking professionals, jewelry designers at Chow Tai Fook, HR teams running Pioneer Programs, engineers at Arup, and tourism executives. The reaction is remarkably consistent.

Before the Traffic Light: arms crossed, skeptical faces, questions about risk. The room feels defensive.

After the Traffic Light: people start nodding. Within five minutes they are suggesting their own examples. "So our quarterly board pack would be yellow, but the published financials would be green?" Exactly.

At a 500-person webinar, I ran a live poll asking participants to classify five scenarios. The accuracy rate was above 90 percent on the first attempt. No prior training, no policy document, just three colors and common sense.

## Why It Works

The Traffic Light Protocol works because it replaces anxiety with a decision framework. Most AI safety training tells people what they cannot do. This tells people what they can do, with clear boundaries.

Three specific design choices make it effective:

1. **Universal metaphor.** Everyone on the planet knows traffic lights. Zero explanation needed for the mental model itself.
2. **Action-oriented.** Each color maps to a specific action: stop, modify, or proceed. There is no ambiguity about what to do next.
3. **Permissive by default.** By showing green first in practice exercises, people realize they have more safe territory than they assumed. This shifts the emotional baseline from fear to confidence.

## Building On the Foundation

The Traffic Light is the first fifteen minutes. But it sets the tone for everything that follows. Once people feel safe, they experiment. Once they experiment, they discover real use cases. Once they discover real use cases, behavior changes.

In the banking program, post-workshop surveys showed that participants who understood the data classification system were significantly more likely to report using AI tools in their daily work one month later. Safety was not a barrier to adoption. It was the enabler.

If you are designing AI training for your organization, start here. Not with prompting techniques. Not with tool demos. Start with making people feel safe. The Traffic Light Protocol takes fifteen minutes and changes the entire trajectory of what follows.

---

*I write about what I learn from training thousands of professionals on AI adoption. Connect with me on [LinkedIn](https://www.linkedin.com/in/samwonghk/) for more.*
