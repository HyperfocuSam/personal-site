# What Happens When a Toy Company Takes AI Seriously

I trained the Hong Kong team at Playmates Toys across two sessions in January and February 2026. The engagement was small -- 10 to 12 participants per session, mixed executives and operations staff, 3.5 hours each afternoon at their Kwun Tong office. No massive auditorium. No 500-person webinar. Just a room of people who make decisions about one of the most recognizable toy brands in Asia, trying to figure out what AI actually means for their work.

That smallness turned out to be the most important feature of the entire engagement.

## The Setup

Playmates Toys is publicly listed, with separate HK and US operations. The Hong Kong team approached us through a referral in late 2025. Their initial concerns were standard: data security anxiety, tool confusion (they were already using Microsoft Copilot through their enterprise license but had no structured approach), and a boss with a very specific personal interest that needed addressing before anything else could proceed.

We structured the engagement as Tier 1 -- what I call the "Magic Show" format. Two sessions designed to build general awareness and executive buy-in, not hands-on skill building. Session one on January 6 focused on AI trends in Hong Kong, multimodal capabilities, and the demo that would determine whether Tier 2 ever happened. Session two on February 9 covered practical productivity workflows for the broader staff.

The total fee for both sessions was USD 4,250, which included a 15% partnership launch discount. I mention this because pricing transparency matters. Too many training providers hide behind "contact us for a quote" when the real question organizations have is straightforward: what does this cost, and is it worth it?

## The Gardening Demo That Closed the Deal

Before I could teach anyone anything about prompt engineering or data safety, I had to solve a landscaping problem.

The boss at Playmates had a specific interest: he wanted to see AI applied to garden design. Could you take a photo of existing planters, add reference images of specific flowers, and generate a visualization of what the redesigned garden would look like? This wasn't a toy industry use case. It was a personal curiosity. But it was also the gate through which every subsequent training dollar would pass.

I used Google AI Studio with Gemini's image generation capabilities -- what we internally call Nano Banana Pro -- to demonstrate the workflow. Upload a photo, provide reference images, annotate where you want changes, and generate. The output was not perfect, but it was good enough to demonstrate the concept of iterative visual prompting with reference images.

The boss smiled. Tier 2 workshops for Marketing, Design, and Finance were approved in principle the same day.

This is a pattern I see repeatedly in corporate AI training. The person who controls the budget rarely cares about the same things as the people who will use the tools daily. You have to address the decision-maker's curiosity first, on their terms, before the organization gives you permission to do the actual work. I have written about this dynamic in the context of [executive versus staff training gaps](ai-maturity-trap-stuck-stage-one) -- the interests diverge, and a good trainer bridges both.

## What I Actually Taught

### Session 1 (January 6): The Trend Landscape

The first session was deliberately not a tool tutorial. With a small executive audience, I focused on three things:

**AI trends specific to Hong Kong.** Not Silicon Valley hype. What tools are Hong Kong professionals actually adopting, what regulatory environment exists under PCPD guidelines, and what does the local competitive landscape look like for companies that delay.

**Multimodal demonstrations.** I showed NotebookLM processing audio into structured summaries, Google AI Studio generating and editing images from references, and DeepSeek handling cultural and literary content in Chinese. The goal was breadth, not depth -- showing that AI is not just a chatbot for writing emails.

**The gardening demo.** As described above. This was the emotional climax of a session designed more for persuasion than education.

### Session 2 (February 9): The Productivity Toolkit

The second session shifted to practical application. By this point, management had bought in and the audience expanded to include operations and general staff. I built the session around a framework I use across all my corporate workshops: three core skills for effective AI use.

**Role Setup.** Tell the AI who it should be. "You are an operations coordinator at a Hong Kong toy manufacturer who manages supplier relationships across Asia" produces fundamentally different output than "write me an email." I demonstrated this with a progressive exercise -- the same email task attempted four times, each version adding one more skill. The difference between the first and last version was stark enough that participants could see the value without me explaining it.

**Structured Format.** Control the output shape. Bullet points, word limits, specific sections. Most people accept whatever the AI gives them on the first try. Teaching them to specify format in the prompt -- "keep under 120 words, include 3 bullet points, end with a deadline" -- immediately elevated the quality of their outputs.

**Follow-Up Iteration.** The first draft is never the final product. I showed how to refine within a conversation: "Make it more urgent," "Add a line about scheduling a call," "Give me both English and Traditional Chinese versions." This is where participants had their real breakthrough moment -- realizing that AI is a conversation, not a one-shot query.

Every example used toy industry context. Supplier delay emails referenced order numbers that looked real. Research queries asked about EU packaging regulations for toy manufacturers exporting from Hong Kong. Meeting prep scenarios involved cross-departmental product launch reviews. When the content mirrors someone's actual Tuesday afternoon, [adoption follows naturally](/blog/why-ai-training-doesnt-stick).

## Data Safety as an Accelerator

I spent a deliberate segment on data security, using what I call the [traffic light protocol](/blog/traffic-light-protocol-ai-safety). The core message was simple: free tools like Gemini and Perplexity are fine for general queries and public information, but confidential company data -- financials, client lists, unreleased product specs -- should only go into enterprise Copilot, which stays within their Microsoft 365 environment.

The golden rule I gave them: if you would not post it on a public notice board, do not paste it into a free AI tool.

This was not a throwaway compliance slide. Playmates had raised data security as a primary concern from the very first meeting in October 2025. Addressing it early and with a clear, memorable framework removed the anxiety that was blocking experimentation. People who feel safe try more things.

## Why Small Groups Work

Most of my engagements are larger. Bank of China was 1,530 participants. [Chow Tai Fook fills conference rooms](/blog/ctf-ai-design-thinking-workshop-2026). The Playmates sessions had 10 to 12 people in each.

The small format changed the dynamic in ways I want to be honest about:

**I could read the room in real time.** When someone looked skeptical, I noticed and adjusted. When the energy dropped, I pivoted to a live demo. In a 500-person webinar, you are performing. In a 12-person room, you are conversing.

**Questions were immediate and specific.** "Can I use this to draft tenant renewal letters in Chinese?" "What happens if I paste our sales data into the free version?" These are not questions people ask in large groups. They are the questions that determine whether someone actually uses AI the following Monday.

**The gardening demo was possible.** In a large session, I would never spend 10 minutes on a single person's niche interest. In this room, that niche interest belonged to the person who signs the checks. The format allowed me to serve the individual while teaching the group.

The tradeoff is obvious: small groups are expensive per participant. The economics only work when the participants are senior enough that their adoption creates downstream impact. At Playmates, training 12 decision-makers who then champion AI adoption across the organization is worth more than training 100 staff members who need permission to change anything.

## What Happened Next

Tier 1 was invoiced and paid. As of March 2026, we are in discussions about Tier 2 -- department-specific workshops for Marketing/Design and Finance, each a half-day hands-on format at an external training center. The Marketing workshop was originally planned for post-Chinese New Year; the Finance team is unavailable until April due to year-end closing cycles.

The engagement also validated something I have been refining in my approach: the [tool-agnostic teaching method](/blog/why-i-teach-copilot-not-chatgpt). I did not teach "how to use ChatGPT." I taught how to communicate with AI systems using transferable skills -- role setup, structured output, iterative refinement. When the tools change (and they will change), the skills remain.

---

*I run AI adoption training for corporate teams across Hong Kong and Asia. If your organization is exploring AI training -- whether for 12 people or 1,200 -- I would be glad to talk through what a practical engagement looks like. See my [corporate AI training services](/services) or see my [corporate AI training services](/services) or connect with me on [LinkedIn](https://www.linkedin.com/in/sam-ai-agent/).*
