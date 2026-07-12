import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import OptimizedImage from '../components/Template/OptimizedImage';
import EmailCapture from '../components/EmailCapture/EmailCapture';
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
    a: 'Corporate training typically runs HKD 15,000–50,000 per'
      + ' session or day, depending on format and depth — contact me'
      + ' for a scoped quote. Half-day awareness workshops, full-day'
      + ' productivity sessions, and multi-week Pioneer Programs are'
      + ' all available. Some programs may qualify for TVP or other'
      + ' Hong Kong government funding schemes.',
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

    <article className="post field-notes-content" id="corporate-training">
      {/* Hero — primary CTA */}
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
          <p className="corporate-hero-cta">
            <Link to="/book" className="button">
              Book a Free Discovery Call
            </Link>
            {' '}
            <a
              href="https://wa.me/85264315177"
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
            >
              WhatsApp us
            </a>
          </p>
        </div>
      </header>

      {/* Stats */}
      <section className="section-base">
        <div className="stats-floating content-standard">
          <div className="stats-bar">
            <div className="stat-item fn-receipt">
              <span className="stat-item__number fn-receipt__number">10,000+</span>
              <span className="fn-receipt__leader" aria-hidden="true" />
              <span className="stat-item__label fn-receipt__label">
                Professionals Trained
              </span>
            </div>
            <div className="stat-item fn-receipt">
              <span className="stat-item__number fn-receipt__number">9.2/10</span>
              <span className="fn-receipt__leader" aria-hidden="true" />
              <span className="stat-item__label fn-receipt__label">
                Avg. Satisfaction
              </span>
            </div>
            <div className="stat-item fn-receipt">
              <span className="stat-item__number fn-receipt__number">70+</span>
              <span className="fn-receipt__leader" aria-hidden="true" />
              <span className="stat-item__label fn-receipt__label">
                Organizations Served
              </span>
            </div>
            <div className="stat-item fn-receipt">
              <span className="stat-item__number fn-receipt__number">13</span>
              <span className="fn-receipt__leader" aria-hidden="true" />
              <span className="stat-item__label fn-receipt__label">
                Countries Reached
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Client logos */}
      <ClientLogoBar />

      {/* Why — merged problem + thought-leadership (same thesis, denser) */}
      <section className="section-base section-padding">
        <div className="content-narrow">
          <h2>Why Most Corporate AI Training Fails</h2>
          <p>
            Most corporate AI training fails because it teaches tools,
            not habits. Your team attends a workshop, tries ChatGPT for
            a week, then goes back to doing things the old way. The
            training checked a box. It didn&rsquo;t change behavior.
          </p>
          <p>
            After training 10,000+ professionals across 70+
            organizations, the pattern is clear: one-off
            sessions produce awareness, not adoption. People forget
            70% of new information within 24 hours. The fix
            isn&rsquo;t better content &mdash; it&rsquo;s a
            different structure.
          </p>
          <p>
            My approach starts from your team&rsquo;s actual workflows
            — the emails they write, the reports they build, the
            decisions they make. We redesign those workflows with AI
            integrated at each step. Behavior change sticks because
            it&rsquo;s tied to real work, not hypothetical demos.
          </p>
          {/* Single-expression text: adjacent text nodes break react-snap hydration (#418) */}
          <p>
            {'The '}
            <Link to="/blog/how-to-design-ai-pioneer-program">
              Pioneer Program model
            </Link>
            {' works because it’s built around change management principles:'
              + ' workflow-first exercises, weekly accountability, and internal'
              + ' champions who sustain adoption after the trainer leaves.'}
          </p>
          <p>
            <Link to="/blog/why-ai-training-doesnt-stick">
              Read more: Why AI Training Doesn&rsquo;t Stick (And What Actually Works) →
            </Link>
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
          <div className="corporate-dense-list">
            {workshops.map((w) => (
              <article key={w.title} className="fn-entry corporate-dense-entry corporate-workshop-entry">
                <h3>{w.title}</h3>
                <p className="corporate-dense-meta">
                  {/* Single expression: adjacent text nodes break react-snap hydration (#418) */}
                  {`${w.duration} · ${w.audience}`}
                </p>
                <p>{w.description}</p>
                <ul className="corporate-outcome-list">
                  {w.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Proof: industries + case studies (same thesis — denser single section) */}
      <section className="section-base section-padding">
        <div className="content-standard">
          <h2>Industry Experience</h2>
          <p>
            Workshop content is customized to your industry&rsquo;s
            workflows, compliance requirements, and use cases.
          </p>
          <div className="card-grid cols-3 corporate-dense-grid">
            {industries.map((ind) => (
              <div key={ind.name} className="fn-entry corporate-dense-entry">
                <h3>{ind.name}</h3>
                <p className="corporate-dense-meta">{ind.clients}</p>
                <p>{ind.example}</p>
                {ind.caseStudy && (
                  <Link to={ind.caseStudy}>
                    Read case study →
                  </Link>
                )}
              </div>
            ))}
          </div>
          <p className="corporate-inline-link">
            <Link to="/clients">View all clients →</Link>
          </p>

          <h2 className="corporate-section-subhead">Featured Case Studies</h2>
          <p>
            Real engagements, real numbers, real lessons. Each case
            study is a detailed writeup from a specific client
            engagement.
          </p>
          <div className="card-grid cols-2 corporate-dense-grid">
            {caseStudies.map((cs) => (
              <Link
                key={cs.title}
                to={cs.link}
                className="fn-entry corporate-dense-entry corporate-case-card"
              >
                <h3>{cs.title}</h3>
                <p className="corporate-dense-meta">{cs.metric}</p>
                <p>{cs.insight}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery process + methodologies + nested proof quote */}
      <section className="section-sunken section-padding">
        <div className="content-standard">
          <h2>How It Works</h2>
          <ol className="corporate-steps">
            <li>
              <strong>Discovery Call (Free, 30 min).</strong>
              {' We discuss your team’s current AI usage, pain points,'
                + ' and goals. No commitment, no sales pitch.'}
            </li>
            <li>
              <strong>Custom Workshop Design.</strong>
              {' I design the workshop around your team’s actual'
                + ' workflows, tools, and compliance requirements. You'
                + ' review and approve before we proceed.'}
            </li>
            <li>
              <strong>Delivery.</strong>
              {' In-person or virtual. English or Cantonese. Half-day'
                + ' to multi-week programs. Your team leaves with workflows'
                + ' they can use on Monday morning.'}
            </li>
            <li>
              <strong>Follow-Through.</strong>
              {' Post-workshop support to ensure adoption sticks.'
                + ' Pioneer Programs include weekly check-ins and real'
                + ' project coaching.'}
            </li>
          </ol>

          <h2 className="corporate-section-subhead">Signature Methodologies</h2>
          <p>
            Frameworks developed through real engagements, not
            textbooks. Each one solves a specific adoption problem.
          </p>
          <div className="card-grid cols-2 corporate-dense-grid">
            {methodologies.map((m) => (
              <div key={m.name} className="fn-entry corporate-dense-entry">
                <h3>{m.name}</h3>
                <p>{m.description}</p>
                <Link to={m.link}>See it in action →</Link>
              </div>
            ))}
          </div>
          {/* Compact quote row — copy unchanged; single-expression text for hydration */}
          <blockquote className="fn-entry corporate-compact-quote">
            <p>
              &ldquo;Finally, AI training that&rsquo;s actually useful!&rdquo;
            </p>
            <footer>
              — Banking Professional, Bank of China (Hong Kong)
              <span className="fn-stamp fn-stamp--verified">
                9.2/10 satisfaction across 1,530 participants
              </span>
            </footer>
          </blockquote>
          <p className="corporate-inline-link">
            <Link to="/testimonials">Read more testimonials →</Link>
          </p>
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
          <ul className="corporate-funding-list">
            <li>
              <strong>BUD Fund</strong> &mdash; Up to HK$7 million
              cumulative per company, with fast-track Easy BUD
              applications capped at HK$150,000 each, for technology
              adoption including AI training and implementation
              projects.
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
          <p>
            Don&rsquo;t wait for government programs to be fully
            rolled out. Companies that invest in structured AI
            training now will have a 12-18 month head start.
          </p>
          <p>
            <Link to="/blog/hk-2026-budget-ai-training">
              Read the full analysis: What the HK$50M AI Budget Actually Means →
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-sunken section-padding">
        <div className="content-narrow">
          <h2>Frequently Asked Questions</h2>
          {faqItems.map((item) => (
            <div
              key={item.q}
              className="fn-entry corporate-faq-entry"
            >
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lead Magnet */}
      <EmailCapture
        title="Free: AI Pioneer Program Playbook"
        blurb="The 6-session structure, champion selection checklist, 3-3-3 Habit Framework, and measurement template. Enter your email to download."
        leadMagnet={{
          title: 'AI Pioneer Program Playbook (PDF)',
          url: '/downloads/ai-pioneer-program-playbook.pdf',
        }}
      />

      {/* Closing primary CTA */}
      <section className="section-base section-padding corporate-closing-cta">
        <div className="content-narrow">
          <h2>Ready to Train Your Team?</h2>
          <p>
            Book a free 30-minute discovery call. No commitment —
            just a conversation about what AI training could look
            like for your organization.
          </p>
          <p>
            <Link to="/book" className="button">
              Book a Free Discovery Call
            </Link>
          </p>
          <p className="corporate-closing-alt">
            {'Or '}
            <a href="mailto:sam@adaptig.com?subject=Corporate%20AI%20Training%20Inquiry">
              email me
            </a>
            {' / '}
            <a
              href="https://wa.me/85264315177"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            .
          </p>
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
