import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import OptimizedImage from '../components/Template/OptimizedImage';
import ClientLogoBar from '../components/Home/ClientLogoBar';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';

const { PUBLIC_URL } = process.env;

const workshops = [
  {
    title: 'AI Awareness Workshop',
    duration: 'Half-day (3-4 hours)',
    audience: 'All staff',
    description:
      'Lower the fear, build confidence, and give every team member'
      + ' a practical starting point with AI tools.',
    outcomes: [
      'Understand what AI can and cannot do',
      'Try 3-5 AI tools hands-on with real work tasks',
      'Leave with a personal AI action plan',
    ],
  },
  {
    title: 'AI Productivity Workshop',
    duration: 'Full-day (6-7 hours)',
    audience: 'Teams and departments',
    description:
      'Move beyond awareness into daily usage. Teams redesign their'
      + ' actual workflows with AI integrated at each step.',
    outcomes: [
      'Map current workflows and identify AI opportunities',
      'Build and test AI-assisted workflows live',
      'Measure time saved (avg. 5-8 hours/week per participant)',
    ],
  },
  {
    title: 'AI Pioneer Program',
    duration: '6 sessions over 6 weeks',
    audience: '10-20 selected champions',
    description:
      'A cohort-based program that turns curious employees into'
      + ' internal AI champions who drive adoption across the organization.',
    outcomes: [
      'Deep AI fluency across multiple tools and use cases',
      'Real projects completed with measurable outcomes',
      'Internal champion network that sustains adoption',
    ],
  },
  {
    title: 'AI x Design Thinking Hackathon',
    duration: 'Full-day or 2-day',
    audience: 'Cross-functional teams',
    description:
      'Fuse creative problem-solving with AI prototyping. Teams'
      + ' build working solutions to real business challenges in a single session.',
    outcomes: [
      'Solve a real business problem with AI in one day',
      'Working prototype to present to leadership',
      'Cross-team collaboration and innovation culture',
    ],
  },
];

const industries = [
  {
    name: 'Banking & Finance',
    clients: 'Bank of China (Hong Kong), HSBC',
    example:
      '1,530 participants across 13 countries. 9.2/10 satisfaction.',
    caseStudy: '/blog/bochk-banking-ai-training',
  },
  {
    name: 'Retail & Luxury',
    clients: 'Chow Tai Fook, Playmates Toys, FAO Schwarz',
    example:
      '3 repeat engagements with Chow Tai Fook. Design thinking + AI.',
    caseStudy: '/blog/ctf-ai-design-thinking-workshop-2026',
  },
  {
    name: 'Engineering & Energy',
    clients: 'Arup, CLP',
    example:
      'AI lunch-and-learn format for engineering professionals.',
    caseStudy: '/blog/clp-ai-agent-automation',
  },
  {
    name: 'Education',
    clients: 'PolyU, HKCT',
    example:
      'Faculty AI integration and student-facing workshops.',
    caseStudy: '/blog/hkct-ai-education-workshop',
  },
  {
    name: 'Tourism & Hospitality',
    clients: 'Hong Kong Jockey Club, China Travel Service',
    example:
      'Management-level AI training for service transformation.',
    caseStudy: '/blog/cts-tourism-ai-training',
  },
  {
    name: 'Professional Services',
    clients: 'Publicis Groupe, YPO',
    example:
      'Executive briefings and global leadership events.',
    caseStudy: null,
  },
];

const caseStudies = [
  {
    title: 'Bank of China (Hong Kong)',
    metric: '1,530 participants across 13 countries',
    insight: 'Developed the Traffic Light Protocol for data sensitivity.'
      + ' Spending the first 20 minutes on safety accelerated adoption.',
    link: '/blog/bochk-banking-ai-training',
  },
  {
    title: 'Garden Group — AI Pioneer Program',
    metric: '19 HR professionals, 6 sessions, 5-8 hours saved per week',
    insight: 'Proved that multi-session cohorts outperform one-off workshops'
      + ' for lasting behavior change.',
    link: '/blog/how-to-design-ai-pioneer-program',
  },
  {
    title: 'Chow Tai Fook — AI x Design Thinking',
    metric: '3 repeat engagements with the world\'s largest jewelry retailer',
    insight: 'Cross-functional teams competed to create Go-To-Market campaigns'
      + ' using AI tools in a hackathon format.',
    link: '/blog/ctf-ai-design-thinking-workshop-2026',
  },
  {
    title: 'HKCT — 400 Educators',
    metric: 'Skepticism to experimentation in 75 minutes',
    insight: 'Introduced the AI Three-Part Framework to move an entire'
      + ' faculty from resistance to experimentation in a single session.',
    link: '/blog/hkct-ai-education-workshop',
  },
];

const methodologies = [
  {
    name: 'Traffic Light Protocol',
    description: 'A data sensitivity framework for regulated industries.'
      + ' Green (public info), Yellow (internal, strip identifiers),'
      + ' Red (PII, full stop). Designed for instant decision-making.',
    link: '/blog/traffic-light-protocol-ai-safety',
  },
  {
    name: 'AI Pioneer Model',
    description: 'Train 10-20 curious, influential people deeply over weeks.'
      + ' They become internal champions who pull the rest of the'
      + ' organization forward. Scales faster than top-down mandates.',
    link: '/blog/how-to-design-ai-pioneer-program',
  },
  {
    name: '70/30 Human-AI Split',
    description: 'Humans retain 70% ownership of thinking and decisions.'
      + ' AI handles 30% — first drafts, data synthesis, formatting.'
      + ' Prevents over-reliance while maximizing productivity gains.',
    link: '/blog/bochk-banking-ai-training',
  },
  {
    name: 'AI Maturity Model',
    description: 'A 4-stage framework: Awareness, Experimentation,'
      + ' Integration, Transformation. 80% of companies are stuck at'
      + ' Stage 1. The Pioneer Model moves them to Stage 2.',
    link: '/blog/ai-maturity-trap-stuck-stage-one',
  },
];

const faqItems = [
  {
    q: 'How much does corporate AI training cost in Hong Kong?',
    a: 'Pricing depends on format, duration, team size, and'
      + ' customization level. Half-day awareness workshops,'
      + ' full-day productivity sessions, and multi-week Pioneer'
      + ' Programs are all available. Contact for a custom quote.'
      + ' Some programs may qualify for TVP or other Hong Kong'
      + ' government funding schemes.',
  },
  {
    q: 'Are workshops available in Cantonese?',
    a: 'Yes. Sam delivers workshops in both English and Cantonese.'
      + ' Materials can be provided in English, Traditional Chinese,'
      + ' or bilingual formats. Most Hong Kong corporate clients'
      + ' prefer Cantonese delivery with English materials.',
  },
  {
    q: 'What makes this different from other AI training providers?',
    a: 'Three things: (1) Behavior change focus — workshops are'
      + ' designed around your team\'s actual workflows, not generic'
      + ' demos. (2) Practitioner-led — Sam uses AI daily in his own'
      + ' work and brings real examples. (3) Outcome measurement —'
      + ' participants report saving 5-8 hours per week after the'
      + ' Pioneer Program.',
  },
  {
    q: 'Can training be customized for our industry?',
    a: 'Every corporate engagement starts with a discovery call to'
      + ' understand your team\'s roles, tools, compliance'
      + ' requirements, and goals. Workshop exercises use your actual'
      + ' work scenarios — not textbook examples. Sam has delivered'
      + ' across banking, retail, engineering, education, tourism,'
      + ' and professional services.',
  },
  {
    q: 'How do I get started?',
    a: 'Book a free 30-minute discovery call to discuss your team\'s'
      + ' needs. No commitment, no sales pitch — just a conversation'
      + ' about whether training is the right next step for your'
      + ' organization.',
  },
  {
    q: 'Do you offer training outside Hong Kong?',
    a: 'Yes. Through Adaptig, Sam has a global trainer network'
      + ' spanning North America, Latin America, Europe, and'
      + ' Asia-Pacific. In-person and virtual formats available.'
      + ' Bank of China engagement covered 13 countries.',
  },
];

const CorporateTraining = () => (
  <Main
    title="Corporate AI Training - Hong Kong"
    description={
      'Corporate AI training and workshops in Hong Kong.'
      + ' Enterprise workshops, prompt engineering training,'
      + ' and AI adoption programs delivered in English and'
      + ' Cantonese. 10,000+ professionals trained, 9.2/10'
      + ' satisfaction. Bank of China, HSBC, Chow Tai Fook,'
      + ' CLP, and 70+ organizations served.'
    }
    canonicalUrl={`${SITE_URL}/corporate-ai-training-hong-kong`}
    ogTitle="Corporate AI Training in Hong Kong | Sam Wong"
    ogDescription={
      'Enterprise AI workshops and training programs in Hong Kong.'
      + ' 10,000+ professionals trained, 9.2/10 satisfaction.'
      + ' Delivered in English and Cantonese.'
    }
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/corporate-ai-training-hong-kong`}
    ogType="website"
    twitterTitle="Corporate AI Training in Hong Kong | Sam Wong"
    twitterDescription={
      'Enterprise AI workshops and training programs in Hong Kong.'
      + ' 10,000+ professionals trained across 70+ organizations.'
    }
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/corporate-ai-training-hong-kong` },
      { lang: 'zh-Hant', href: `${SITE_URL}/zh/corporate-ai-training-hong-kong` },
      { lang: 'x-default', href: `${SITE_URL}/corporate-ai-training-hong-kong` },
    ]}
  >
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'Sam Wong - Corporate AI Training Hong Kong',
          url: `${SITE_URL}/corporate-ai-training-hong-kong`,
          image: `${SITE_URL}/images/Sam.png`,
          description:
            'Corporate AI training and workshops in Hong Kong.'
            + ' Enterprise workshops, coaching, and Train-the-Trainer'
            + ' programs delivered in English and Cantonese.',
          areaServed: ['Hong Kong', 'Asia-Pacific', 'Global'],
          serviceType: [
            'Corporate AI Training',
            'AI Workshops',
            'Prompt Engineering Training',
            'ChatGPT Training for Companies',
            'Microsoft Copilot Training',
            'Enterprise AI Adoption',
            'AI Change Management Training',
            'Train-the-Trainer AI Certification',
          ],
          knowsLanguage: ['English', 'Cantonese', 'Mandarin'],
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Hong Kong',
            addressCountry: 'HK',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '9.2',
            bestRating: '10',
            ratingCount: '1500',
          },
          provider: {
            '@type': 'Person',
            name: 'Sam Wong',
            url: SITE_URL,
            jobTitle: 'AI Training Specialist',
          },
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a,
            },
          })),
        })}
      </script>
    </Helmet>

    <article className="post" id="corporate-training">
      {/* Hero */}
      <header className="page-hero">
        <div className="content-standard">
          <div className="title">
            <h1 style={{ fontSize: '2rem', margin: 0 }}>
              Corporate AI Training in Hong Kong
            </h1>
            <p>
              Practical workshops that turn AI curiosity
              into daily habits your team actually keeps.
            </p>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="section-base">
        <div className="stats-floating content-standard">
          <div className="stats-bar">
            <div className="stat-item">
              <span className="stat-item__number">10,000+</span>
              <span className="stat-item__label">
                Professionals Trained
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-item__number">9.2/10</span>
              <span className="stat-item__label">
                Avg. Satisfaction
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-item__number">70+</span>
              <span className="stat-item__label">
                Organizations Served
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-item__number">13</span>
              <span className="stat-item__label">
                Countries Reached
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Client logos */}
      <ClientLogoBar />

      {/* Why section */}
      <section className="section-base section-padding">
        <div className="content-narrow">
          <h2>The Problem With Most AI Training</h2>
          <p>
            Most corporate AI training fails because it teaches tools,
            not habits. Your team attends a workshop, tries ChatGPT for
            a week, then goes back to doing things the old way. The
            training checked a box. It didn&rsquo;t change behavior.
          </p>
          <p>
            My approach is different. Every workshop starts from your
            team&rsquo;s actual workflows — the emails they write, the
            reports they build, the decisions they make. We redesign
            those workflows with AI integrated at each step. The result
            is behavior change that sticks because it&rsquo;s tied to
            real work, not hypothetical demos.
          </p>
        </div>
      </section>

      {/* Workshop photo */}
      <div className="full-bleed photo-band">
        <OptimizedImage
          src={`${PUBLIC_URL}/images/services/corporate-training.jpeg`}
          alt="Corporate AI workshop in Hong Kong"
          loading="lazy"
        />
      </div>

      {/* Workshop formats */}
      <section className="section-sunken section-padding">
        <div className="content-standard">
          <h2>Workshop Formats</h2>
          <p>
            Every format is customized to your industry, team size,
            and goals. Delivered in English or Cantonese.
          </p>
          <div className="card-grid cols-2" style={{ marginTop: '2rem' }}>
            {workshops.map((w) => (
              <div key={w.title} className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.25rem' }}>{w.title}</h3>
                <p style={{
                  fontSize: '0.85em',
                  opacity: 0.7,
                  marginBottom: '1rem',
                }}
                >
                  {w.duration}
                  {' '}
                  &middot;
                  {' '}
                  {w.audience}
                </p>
                <p>{w.description}</p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.2rem' }}>
                  {w.outcomes.map((o) => (
                    <li key={o} style={{ marginBottom: '0.4rem', fontSize: '0.9em' }}>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry experience */}
      <section className="section-base section-padding">
        <div className="content-standard">
          <h2>Industry Experience</h2>
          <p>
            Workshop content is customized to your industry&rsquo;s
            workflows, compliance requirements, and use cases.
          </p>
          <div className="card-grid cols-3" style={{ marginTop: '2rem' }}>
            {industries.map((ind) => (
              <div key={ind.name} className="card" style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                  {ind.name}
                </h3>
                <p style={{ fontSize: '0.85em', opacity: 0.8 }}>
                  {ind.clients}
                </p>
                <p style={{ fontSize: '0.85em', marginTop: '0.5rem' }}>
                  {ind.example}
                </p>
                {ind.caseStudy && (
                  <Link
                    to={ind.caseStudy}
                    style={{
                      fontSize: '0.8em',
                      marginTop: '0.75rem',
                      display: 'inline-block',
                    }}
                  >
                    Read case study &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/clients" className="button button--outline">
              View All Clients
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-warm section-padding">
        <div className="content-narrow">
          <h2>How It Works</h2>
          <div style={{ marginTop: '1.5rem' }}>
            <h3>1. Discovery Call (Free, 30 min)</h3>
            <p>
              We discuss your team&rsquo;s current AI usage,
              pain points, and goals. No commitment, no sales pitch.
            </p>
            <h3 style={{ marginTop: '1.5rem' }}>
              2. Custom Workshop Design
            </h3>
            <p>
              I design the workshop around your team&rsquo;s actual
              workflows, tools, and compliance requirements. You
              review and approve before we proceed.
            </p>
            <h3 style={{ marginTop: '1.5rem' }}>3. Delivery</h3>
            <p>
              In-person or virtual. English or Cantonese. Half-day
              to multi-week programs. Your team leaves with workflows
              they can use on Monday morning.
            </p>
            <h3 style={{ marginTop: '1.5rem' }}>
              4. Follow-Through
            </h3>
            <p>
              Post-workshop support to ensure adoption sticks.
              Pioneer Programs include weekly check-ins and real
              project coaching.
            </p>
          </div>
        </div>
      </section>

      {/* Named methodologies */}
      <section className="section-sunken section-padding">
        <div className="content-standard">
          <h2>Signature Methodologies</h2>
          <p>
            Frameworks developed through real engagements, not
            textbooks. Each one solves a specific adoption problem.
          </p>
          <div className="card-grid cols-2" style={{ marginTop: '2rem' }}>
            {methodologies.map((m) => (
              <div key={m.name} className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                  {m.name}
                </h3>
                <p style={{ fontSize: '0.9em', lineHeight: '1.7' }}>
                  {m.description}
                </p>
                <Link
                  to={m.link}
                  style={{
                    fontSize: '0.8em',
                    marginTop: '0.75rem',
                    display: 'inline-block',
                  }}
                >
                  See it in action &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial highlight */}
      <section className="section-base section-padding">
        <div className="content-narrow" style={{ textAlign: 'center' }}>
          <blockquote className="pull-quote" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <p>
              &ldquo;Finally, AI training that&rsquo;s actually
              useful!&rdquo;
            </p>
            <footer style={{ fontSize: '0.9em', marginTop: '0.5rem' }}>
              — Banking Professional, Bank of China (Hong Kong)
              <br />
              <span style={{ fontSize: '0.85em', opacity: 0.7 }}>
                9.2/10 satisfaction across 1,530 participants
              </span>
            </footer>
          </blockquote>
          <Link
            to="/testimonials"
            className="button button--outline"
            style={{ marginTop: '1.5rem' }}
          >
            Read More Testimonials
          </Link>
        </div>
      </section>

      {/* Featured case studies */}
      <section className="section-sunken section-padding">
        <div className="content-standard">
          <h2>Featured Case Studies</h2>
          <p>
            Real engagements, real numbers, real lessons. Each case
            study is a detailed writeup from a specific client
            engagement.
          </p>
          <div className="card-grid cols-2" style={{ marginTop: '2rem' }}>
            {caseStudies.map((cs) => (
              <Link
                key={cs.title}
                to={cs.link}
                className="card"
                style={{
                  padding: '1.5rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                }}
              >
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>
                  {cs.title}
                </h3>
                <p style={{
                  fontSize: '0.85em',
                  opacity: 0.7,
                  marginBottom: '0.75rem',
                }}
                >
                  {cs.metric}
                </p>
                <p style={{ fontSize: '0.9em', lineHeight: '1.7' }}>
                  {cs.insight}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Government funding */}
      <section className="section-warm section-padding">
        <div className="content-narrow">
          <h2>Hong Kong Government AI Training Support</h2>
          <p>
            The 2026-27 Budget earmarked HK$50 million for AI
            literacy and established a Committee on AI+ chaired by
            the Financial Secretary. While most measures target
            public awareness rather than corporate training, several
            funding paths are available:
          </p>
          <ul style={{ marginTop: '1rem', lineHeight: '2' }}>
            <li>
              <strong>BUD Fund</strong> &mdash; Up to HK$150,000 per
              company for technology adoption, including AI training
              and implementation projects.
            </li>
            <li>
              <strong>Upskill Hong Kong (ERB)</strong> &mdash; The
              Employees Retraining Board is adding AI application
              courses to its curriculum for employed workers.
            </li>
            <li>
              <strong>RTTP</strong> &mdash; The Re-industrialisation
              and Technology Training Programme subsidizes up to 2/3
              of training costs for technology-related programs.
            </li>
          </ul>
          <p style={{ marginTop: '1rem' }}>
            Don&rsquo;t wait for government programs to be fully
            rolled out. Companies that invest in structured AI
            training now will have a 12-18 month head start.
          </p>
          <Link
            to="/blog/hk-2026-budget-ai-training"
            style={{ fontSize: '0.9em' }}
          >
            Read the full analysis: What the HK$50M AI Budget
            Actually Means &rarr;
          </Link>
        </div>
      </section>

      {/* Why training fails — thought leadership */}
      <section className="section-base section-padding">
        <div className="content-narrow">
          <h2>Why Most Corporate AI Training Fails</h2>
          <p>
            Most AI training teaches tools instead of workflows.
            Your team attends a workshop, tries ChatGPT for a week,
            then goes back to doing things the old way. The training
            checked a box but didn&rsquo;t change behavior.
          </p>
          <p>
            After 180+ workshops, the pattern is clear: one-off
            sessions produce awareness, not adoption. People forget
            70% of new information within 24 hours. The fix
            isn&rsquo;t better content &mdash; it&rsquo;s a
            different structure.
          </p>
          <p>
            The{' '}
            <Link to="/blog/how-to-design-ai-pioneer-program">
              Pioneer Program model
            </Link>
            {' '}works because it&rsquo;s built around change
            management principles: workflow-first exercises, weekly
            accountability, and internal champions who sustain
            adoption after the trainer leaves.
          </p>
          <Link
            to="/blog/why-ai-training-doesnt-stick"
            style={{ fontSize: '0.9em' }}
          >
            Read more: Why AI Training Doesn&rsquo;t Stick (And
            What Actually Works) &rarr;
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-sunken section-padding">
        <div className="content-narrow">
          <h2>Frequently Asked Questions</h2>
          {faqItems.map((item) => (
            <div
              key={item.q}
              style={{ marginBottom: '1.5rem' }}
            >
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                {item.q}
              </h3>
              <p style={{ fontSize: '0.9em', lineHeight: '1.7' }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-base section-padding">
        <div className="content-narrow" style={{ textAlign: 'center' }}>
          <h2>Ready to Train Your Team?</h2>
          <p>
            Book a free 30-minute discovery call. No commitment —
            just a conversation about what AI training could look
            like for your organization.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '1.5rem',
          }}
          >
            <a
              href="mailto:sam@adaptig.com?subject=Corporate%20AI%20Training%20Inquiry"
              className="button"
            >
              Email Me
            </a>
            <a
              href="https://wa.me/85264315177"
              target="_blank"
              rel="noopener noreferrer"
              className="button button--outline"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
      <p className="lang-toggle">
        <Link to="/zh/corporate-ai-training-hong-kong">
          &#x4E2D;&#x6587;&#x7248;&#x672C;
        </Link>
      </p>
    </article>
  </Main>
);

export default CorporateTraining;
