// Real testimonials curated from DotAI Academy feedback surveys and corporate training engagements
// Attribution: "Course + date" for academy (anonymous survey data), "Role — Company" for corporate

const testimonialData = {
  // Aggregate stats for the hero section
  stats: {
    satisfaction: '9.2/10',
    satisfactionSource: 'Bank of China (Hong Kong)',
    participantsServed: '1,500+',
    enterpriseClients: '70+',
  },

  // Quotes that specifically mention Sam or his teaching approach
  aboutSam: [
    {
      quote:
        'I absolutely loved this lesson — very useful! Sam did a fantastic job explaining NotebookLM '
        + 'using a real-life example, making it easy to understand since we encounter similar situations '
        + 'all the time.',
      attribution: 'Participant — AI x Audio-to-Text Workshop, Feb 2025',
      category: 'academy',
      featured: true,
    },
    {
      quote:
        'Sam is deeply experienced and professional. The way he teaches vibe coding, Stripe integration, '
        + 'and website deployment — he knows the full stack inside out. 100% recommend this course!',
      attribution: 'Participant — AI Agent & No-Code Lv 2, Sep 2025',
      category: 'academy',
      featured: true,
    },
    {
      quote:
        'Sam explains things so clearly. I love this kind of computer-lab style class where you '
        + 'practice hands-on and actually remember what you learned.',
      attribution: 'Participant — AI x Audio-to-Text Workshop, Mar 2025',
      category: 'academy',
    },
    {
      quote:
        'Sam\'s teaching approach goes from shallow to deep, taking care of students at different levels.',
      attribution: 'Participant — AI Agent & No-Code Lv 2, Sep 2025',
      category: 'academy',
    },
    {
      quote:
        'Sam breaks down complex content with structure and analogy — '
        + 'you can tell he genuinely cares about making AI accessible.',
      attribution: 'Participant — AI Agent & No-Code Lv 5, Jul 2025',
      category: 'academy',
    },
    {
      quote:
        'I was impressed that Sam tested a brand-new AI tool (Gemini 3.0) overnight and shared it '
        + 'with us the next morning. Every cohort brings fresh knowledge and a new thinking framework.',
      attribution: 'Participant — No-Code Workshop Lv 1, Nov 2025',
      category: 'academy',
      featured: true,
    },
  ],

  // DotAI Academy program feedback (not specifically about Sam)
  academy: [
    {
      quote:
        'Both instructors did a great job of delivering compelling content. People always come first.',
      attribution: 'Participant — DotAI Academy, May 2025',
      category: 'academy',
    },
    {
      quote:
        'Very comprehensive and practical experience sharing with hands-on '
        + 'in-class exercises using AI tools.',
      attribution: 'Participant — DotAI Academy, Jul 2025',
      category: 'academy',
    },
    {
      quote:
        'The instructors\' passion, knowledge and experience in AI, and their '
        + 'selflessness to share with participants.',
      attribution: 'Participant — DotAI Academy, Sep 2025',
      category: 'academy',
    },
    {
      quote:
        'Practical session with clear explanations from the tutor. The classroom setup was excellent.',
      attribution: 'Participant — No-Code Workshop Lv 1, Nov 2025',
      category: 'academy',
    },
    {
      quote:
        'The 5-part SEO automation blog workflow was amazing. It felt like real work, '
        + 'not a textbook exercise. The patience and step-by-step guidance made all the difference.',
      attribution: 'Participant — AI x Marketing Automation, Dec 2025',
      category: 'academy',
    },
    {
      quote:
        'Vibe coding section was crystal clear, well-structured class overall.',
      attribution: 'Participant — DotAI Academy, Jul 2025',
      category: 'academy',
    },
  ],

  // Corporate training client feedback
  corporate: [
    {
      quote:
        'Finally, AI training that\'s actually useful!',
      attribution: 'Banking Professional — Bank of China (Hong Kong)',
      category: 'corporate',
      featured: true,
      stat: '9.2/10 satisfaction across 1,500+ participants in 13 countries',
    },
    {
      quote:
        'The workshop transformed how our teams think about AI — from abstract concept '
        + 'to practical tool they can use on Monday morning.',
      attribution: 'Training Department — Fortune 500 Financial Institution',
      category: 'corporate',
    },
    {
      quote:
        'Hands-on exercises with different AI models made the session immediately applicable '
        + 'to our daily work.',
      attribution: 'Participant — Hong Kong 200 Leadership Workshop, Jul 2025',
      category: 'corporate',
    },
    {
      quote:
        'Thank you for the practical sharing and for sharing your vision and experience '
        + 'with others in the field. Very encouraging.',
      attribution: 'Participant — DotAI Executive Webinar, Apr 2025',
      category: 'corporate',
    },
  ],
};

export default testimonialData;
