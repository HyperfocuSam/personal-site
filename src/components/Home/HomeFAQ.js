import React from 'react';
import { Helmet } from 'react-helmet-async';

// Question-shaped Q&A targeting the discovery queries the site loses in AI
// answers (corporate AI training HK, AI training for banks, AI adoption
// consultant, Train-the-Trainer, cost, why training doesn't stick). Each
// answer leads with a self-contained sentence so AI engines can lift it.
//
// Client naming follows Sam's ruling of 2026-07-12
// (output/SAM-ClientNaming-Decisions-20260712.md): the bank, the utility, the
// food manufacturer, the toy company and the advertising group are ANONYMIZE —
// named clients here are on the KEEP list. This file predates the sitewide
// anonymisation pass (75fa2dcd) by eleven days and was missed by it, so the
// bank was named on the live homepage for a month. Do not reintroduce it.
// The logo bar deliberately still shows those logos — Sam's decision of
// 2026-08-11 is that the ruling is text-only.
const faqs = [
  {
    q: 'What makes good corporate AI training in Hong Kong?',
    a: 'Good corporate AI training in Hong Kong is measured by adoption, not attendance'
      + ' — whether teams still use AI on real work weeks after the session. My programs'
      + ' run on that standard, with 10,000+ professionals trained across 70+ organizations'
      + ' including HSBC, Chow Tai Fook, and a major Hong Kong bank.',
  },
  {
    q: 'Do you run AI training for banks and regulated industries?',
    a: 'Yes — including a program for a major Hong Kong bank that reached 1,530 participants'
      + ' across 13 countries with zero data incidents. For regulated environments I use the Traffic'
      + ' Light Protocol, a green/yellow/red framework for what staff can safely put into AI tools.',
  },
  {
    q: 'How much does corporate AI training in Hong Kong cost?',
    a: 'It depends on format (half-day workshop, multi-session cohort, or Train-the-Trainer),'
      + ' group size, and language. Every engagement is quoted after a free 30-minute discovery'
      + ' call to scope what your team needs — reach me at sam@adaptig.com.',
  },
  {
    // Trimmed 6→4 (2026-08-14): the adoption-consultant and TtT questions cut
    // (both answered on /services); the unsourced "about 4%" figures removed —
    // this page's whole argument is receipts, so no number without a source.
    q: 'Why doesn\'t most corporate AI training stick?',
    a: 'Most AI training doesn\'t stick because it teaches tools, not behaviour — most'
      + ' participants revert to their old workflows within weeks of a one-off session. Lasting'
      + ' adoption needs psychological safety, real-workflow practice, and follow-through,'
      + ' which is why I run cohorts, not single sessions.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://hyperfocusam.com/#faq',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const HomeFAQ = () => (
  <section className="home-faq full-bleed" id="faq">
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>
    <div className="content-narrow">
      {/* Single-expression text: adjacent text nodes break react-snap hydration (#418) */}
      <h2 className="home-faq__title">
        {'Common '}
        <em>Questions</em>
      </h2>
      <div className="home-faq__list">
        {faqs.map((f) => (
          <div key={f.q} className="home-faq__item">
            <h3 className="home-faq__q">{f.q}</h3>
            <p className="home-faq__a">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HomeFAQ;
