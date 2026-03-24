import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import ContactForm from '../components/Contact/ContactForm';

const topLogos = [
  { name: 'Bank of China (Hong Kong)', file: 'bochk.png' },
  { name: 'HSBC', file: 'hsbc.png' },
  { name: 'Hong Kong Jockey Club', file: 'hkjc.svg' },
  { name: 'Chow Tai Fook', file: 'ctf.png' },
  { name: 'CLP', file: 'clp.png' },
  { name: 'Publicis Groupe', file: 'publicis.png' },
];

const stats = [
  { number: '10,000+', label: 'Professionals Trained' },
  { number: '70+', label: 'Organizations' },
  { number: '9.2/10', label: 'Satisfaction' },
];

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
    description="Book a free discovery call for corporate AI training in Hong Kong. 10,000+ professionals trained, 9.2/10 satisfaction."
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
    <article className="post get-started" id="get-started">
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
          <h1>
            AI Training That Actually Changes
            {' '}
            <em>How Your Team Works</em>
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
            {stats.map((s) => (
              <div key={s.label} className="stat-item">
                <span className="stat-item__number">{s.number}</span>
                <span className="stat-item__label">{s.label}</span>
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
          <ContactForm initialInterest="Corporate Training" />
        </div>
      </section>

      {/* Single testimonial */}
      <section className="get-started__testimonial">
        <div className="content-narrow">
          <blockquote>
            <p>
              &ldquo;Finally, AI training that&rsquo;s actually useful!&rdquo;
            </p>
            <footer>
              <cite>Banking Professional, Bank of China (Hong Kong)</cite>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Mini FAQ */}
      <section className="get-started__faq section-padding">
        <div className="content-narrow">
          <h2>Common Questions</h2>
          {faqs.map((item) => (
            <div key={item.q} className="get-started__faq-item">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

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
              onClick={() => {
                if (window.gtag) {
                  window.gtag('event', 'click', {
                    event_category: 'outbound',
                    event_label: 'whatsapp',
                    transport_type: 'beacon',
                  });
                }
              }}
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
