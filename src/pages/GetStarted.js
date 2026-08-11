import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import { stats } from '../data/stats';
import ContactForm from '../components/Contact/ContactForm';

const topLogos = [
  { name: 'a major Hong Kong bank', file: 'bochk.png' },
  { name: 'HSBC', file: 'hsbc.png' },
  { name: 'Hong Kong Jockey Club', file: 'hkjc.svg' },
  { name: 'Chow Tai Fook', file: 'ctf.png' },
  { name: 'a major Hong Kong utility', file: 'clp.png' },
  { name: 'a global advertising group', file: 'publicis.png' },
];

const statCards = [
  { number: stats.professionalsTrained.number, label: stats.professionalsTrained.label },
  { number: stats.organizations.number, label: 'Organizations' },
  { number: stats.oneOnOnes.number, label: stats.oneOnOnes.label },
];

const metaDescription = [
  'Book a free discovery call for corporate AI training in Hong Kong.',
  `${stats.professionalsTrained.number} professionals trained,`,
  `${stats.oneOnOnes.number} one-on-one sessions.`,
].join(' ');

const faqs = [
  {
    q: 'What makes this different from other AI training?',
    a: 'Behavior change focus \u2014 workshops use your team\u2019s actual workflows, not generic demos. '
      + 'Participants report saving 5-8 hours per week after the program.',
  },
  {
    q: 'Can training be customized for our industry?',
    a: 'Every engagement starts with a discovery call. Workshop exercises use your actual work '
      + 'scenarios. Delivered across banking, retail, engineering, education, and professional services.',
  },
  {
    q: 'How do I get started?',
    a: 'Fill out the form above and I\u2019ll reply within 24 hours with a recommended next step. '
      + 'No commitment, no sales pitch.',
  },
];

const GetStarted = () => (
  <Main
    title="Get Started"
    description={metaDescription}
    hideNav
    canonicalUrl={`${SITE_URL}/get-started`}
    ogTitle="Get Started | AI Training for Your Team"
    ogDescription="Book a free discovery call. Corporate AI workshops delivered in English and Cantonese across Hong Kong and Asia-Pacific."
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/get-started`}
    ogType="website"
    twitterTitle="Get Started | AI Training for Your Team"
    twitterDescription="Book a free discovery call. Corporate AI workshops delivered in English and Cantonese."
    twitterImage={DEFAULT_OG_IMAGE}
  >
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <article className="post get-started field-notes-content" id="get-started">
      {/* Minimal header — logo only, links back to main site */}
      <header className="get-started__header">
        <div className="content-narrow">
          <Link to="/" className="get-started__logo">
            Sam Wong
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="get-started__hero">
        <div className="content-narrow">
          {/* Single-expression text: adjacent text nodes break react-snap hydration (#418) */}
          <h1>
            {'AI Training That Actually Changes '}
            <em className="fn-highlight">How Your Team Works</em>
          </h1>
          <p>
            Workshops, coaching, and adoption programs designed around your
            team&rsquo;s real workflows. Based in Hong Kong, delivered across
            Asia-Pacific in English and Cantonese.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="get-started__stats">
        <div className="content-narrow">
          <div className="stats-bar">
            {statCards.map((s) => (
              <div key={s.label} className="stat-item fn-receipt">
                <span className="stat-item__number fn-receipt__number">{s.number}</span>
                <span className="fn-receipt__leader" aria-hidden="true" />
                <span className="stat-item__label fn-receipt__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client logos */}
      <section className="get-started__logos">
        <div className="content-narrow">
          <p className="get-started__logos-label">Trusted by</p>
          <ul className="get-started__logos-list">
            {topLogos.map(({ name, file }) => (
              <li key={name}>
                <img
                  src={`/images/clients/${file}`}
                  alt={name}
                  loading="lazy"
                  className="get-started__client-logo"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact Form — the core conversion point */}
      <section className="get-started__form-section section-padding">
        <div className="content-narrow">
          <ContactForm initialInterest="Corporate Training" placement="get_started" />
        </div>
      </section>

      {/* Single testimonial */}
      <section className="get-started__testimonial">
        <div className="content-narrow">
          <blockquote className="fn-card">
            <p>
              &ldquo;Finally, AI training that&rsquo;s actually useful!&rdquo;
            </p>
            <footer>
              <cite>Banking Professional, a major Hong Kong bank</cite>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Mini FAQ */}
      <section className="get-started__faq section-padding">
        <div className="content-narrow">
          <h2>Common Questions</h2>
          {faqs.map((item) => (
            <div key={item.q} className="get-started__faq-item fn-entry">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Floating WhatsApp — landing page has hideNav so Main's button is skipped */}
      <a
        href="https://wa.me/85264315177"
        className="floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message me on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Minimal footer */}
      <footer className="get-started__footer">
        <div className="content-narrow">
          <p>
            <Link to="/">hyperfocusam.com</Link>
            {' \u00B7 '}
            <a href="mailto:sam@adaptig.com">sam@adaptig.com</a>
            {' \u00B7 '}
            <a
              href="https://wa.me/85264315177"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </footer>
    </article>
  </Main>
);

export default GetStarted;
