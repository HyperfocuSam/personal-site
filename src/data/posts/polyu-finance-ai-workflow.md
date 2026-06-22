# How PolyU's Finance Team Built an AI Workflow That Actually Works

In May, I worked with Hong Kong Polytechnic University's Finance Office on something different from a standard AI workshop. They weren't looking for a one-day introduction to ChatGPT. They wanted a sustainable workflow - something their team could actually use every day within the constraints of a public institution.

University finance isn't a typical corporate function. The volumes are high - endless purchase orders, reimbursement claims, reconciliation reports. The compliance requirements are strict. And the consequences of errors are visible. Any AI solution needed to respect these realities, not ignore them.

## Why Strategy Before Training

Most AI training starts with tools. Here's ChatGPT. Here's Copilot. Let me show you what they can do.

I've learned that approach rarely sticks in regulated environments. The first question isn't "what can AI do?" It's "what are the guardrails?"

So before any training sessions, we held a strategy workshop with the Finance Office leadership. The goal: understand their actual workflows, identify where AI could add value without adding risk, and establish principles that would guide everything that followed.

What emerged was a framework we called "ACE" - three non-negotiable requirements for any AI application in their context:

- **Accuracy**: Financial data cannot afford hallucinations or approximations
- **Compliance**: Every process must align with university policies and audit requirements
- **Efficiency**: The workflow should demonstrably save time, or it's not worth the adoption cost

![The ACE framework - Accuracy, Compliance, Efficiency](/images/blog/polyu-ace-framework.jpeg)

This wasn't just a nice acronym. It became the filter for every AI use case we explored. If a proposed application couldn't satisfy all three criteria, it didn't make the cut.

## Where AI Fit (and Where It Didn't)

With the ACE framework as our guide, certain applications became obvious:

**Data processing and reconciliation** - The finance team handles massive volumes of routine transactions. AI could automate first-pass verification, flagging anomalies for human review rather than requiring manual checking of every line item.

**Document summarization** - Meeting notes, policy documents, vendor contracts. AI could extract key points and deadlines, reducing the cognitive load of information processing.

**Compliance checking** - Cross-referencing actions against internal guidelines. AI could serve as a real-time reference tool, surfacing relevant policies when processing requests.

What we explicitly excluded: anything involving external-facing financial communications, sensitive personnel data, or decisions that required institutional judgment. The boundaries were as important as the applications.

## The Shift I Observed

The most meaningful change wasn't in the workflows themselves - it was in how the team approached problems.

In the early sessions, questions were tool-focused: "How do I use this feature?" "What prompt should I write?" The team members were learning AI as a new skill, with the hesitation that comes from unfamiliar territory.

By the later sessions, the questions had changed: "Could we apply this to our quarterly reporting process?" "What if we built a prompt template for vendor communications?"

The team had shifted from thinking about AI as a tool they were using to thinking about their workflows as systems they could optimize. They weren't just adopting AI - they were becoming process designers.

One team member started documenting prompt templates for common finance tasks. Another began mapping which processes could benefit from automation. This self-directed exploration is what [sustainable adoption](/blog/how-to-design-ai-pioneer-program) looks like.

## The Takeaway

AI adoption in regulated environments requires a different playbook than generic corporate training.

Start with strategy, not tools. Establish clear principles that respect institutional constraints. Then design workflows that meet those principles - rather than retrofitting compliance onto exciting demos.

The ACE framework was specific to PolyU's Finance Office, but the approach generalizes: understand your non-negotiables first, then find where AI can operate within them. That's how you [build something that lasts beyond the training session](/blog/why-ai-training-doesnt-stick).

---

*If you're navigating AI adoption in a compliance-heavy environment and want to discuss approaches, feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/sam-ai-agent/).*

---

*I design and deliver [corporate AI training programs](/services) for teams across Hong Kong and Asia-Pacific. See my full range of [training services](/corporate-ai-training-hong-kong).*
