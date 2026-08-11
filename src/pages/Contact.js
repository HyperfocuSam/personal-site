import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import EmailLink from '../components/Contact/EmailLink';
import ContactIcons from '../components/Contact/ContactIcons';
import ContactForm from '../components/Contact/ContactForm';
import ScrollReveal from '../components/ScrollReveal';

const interestByQuery = {
  corporate: 'Corporate Training',
  coaching: '1-1 Coaching',
  speaking: 'Speaking',
  trainer: 'Become an Adaptig Trainer',
  other: 'Other',
};

const Contact = () => {
  const { search } = useLocation();
  const initialInterest = useMemo(() => {
    const params = new URLSearchParams(search);
    const interest = params.get('interest');
    if (!interest) {
      return 'Corporate Training';
    }
    return interestByQuery[interest.toLowerCase()] || 'Corporate Training';
  }, [search]);

  return (
    <Main
      title="Contact"
      description="Contact Sam Wong for AI training, workshops, coaching, and speaking engagements. Email: sam@adaptig.com"
      canonicalUrl={`${SITE_URL}/contact`}
      ogTitle="Contact | Sam Wong"
      ogDescription="Get in touch for AI training, workshops, coaching, and speaking engagements."
      ogImage={DEFAULT_OG_IMAGE}
      ogUrl={`${SITE_URL}/contact`}
      ogType="website"
      twitterTitle="Contact | Sam Wong"
      twitterDescription="Get in touch for AI training, workshops, coaching, and speaking engagements."
      twitterImage={DEFAULT_OG_IMAGE}
      hreflangTags={[
        { lang: 'en', href: `${SITE_URL}/contact` },
        { lang: 'x-default', href: `${SITE_URL}/contact` },
      ]}
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Sam Wong',
            url: `${SITE_URL}/contact`,
            mainEntity: {
              '@type': 'Person',
              name: 'Sam Wong',
              email: 'sam@adaptig.com',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                email: 'sam@adaptig.com',
                areaServed: ['Hong Kong', 'Asia-Pacific', 'Global'],
                availableLanguage: ['English', 'Cantonese', 'Mandarin'],
              },
            },
          })}
        </script>
      </Helmet>
      <article className="post field-notes-content" id="contact">
        {/* Dark hero */}
        <header className="page-hero">
          <div className="content-narrow">
            <div className="title">
              <h1>
                <Link to="/contact">Contact</Link>
              </h1>
              <p>Let&apos;s find the right next step</p>
            </div>
          </div>
        </header>

        {/* Contact form */}
        <section className="section-base section-padding">
          <div className="content-narrow">
            <ScrollReveal variant="fade-up">
              <p>
                Whether you need team training, one-on-one coaching,
                speaking support, or trainer recruitment details,
                share your situation and I&apos;ll guide you to
                the best option.
              </p>

              <ContactForm initialInterest={initialInterest} />

              {/* Single-expression text: adjacent text nodes break react-snap hydration (#418) */}
              <p>
                {'Or '}
                <a
                  href="https://wa.me/85264315177"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp us
                </a>.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Other contact methods */}
        <section className="section-sunken section-padding">
          <div className="content-narrow">
            <h3>Prefer a direct message?</h3>
            <div className="email-at">
              <p>Email me directly:</p>
              <EmailLink />
            </div>

            <h3>Quick Response via WhatsApp</h3>
            {/* Single-expression text: adjacent text nodes break react-snap hydration (#418) */}
            <p>
              {'For faster responses, reach me on '}
              <a
                href="https://wa.me/85264315177"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>.
            </p>
          </div>
        </section>

        {/* What I help with + social */}
        <section className="section-base section-padding">
          <div className="content-narrow">
            <ScrollReveal variant="fade-up-long">
              <h3>What I Can Help With</h3>
            </ScrollReveal>
            <ScrollReveal variant="fade-up-long" stagger={120}>
              <div className="card-grid cols-2">
                <div className="card fn-card">
                  <h4>Corporate Training</h4>
                  <p>Team workshops and adoption programs</p>
                </div>
                <div className="card fn-card">
                  <h4>1-1 Coaching</h4>
                  <p>Personalized support for your own workflow</p>
                </div>
                <div className="card fn-card">
                  <h4>Speaking</h4>
                  <p>Keynotes, briefings, and event sessions</p>
                </div>
                <div className="card fn-card">
                  <h4>Trainer Recruitment</h4>
                  <p>Joining the Adaptig trainer network</p>
                </div>
              </div>
            </ScrollReveal>

            <h3>Connect on Social</h3>
            <ContactIcons />

            <p style={{ marginTop: '2em' }}>
              <em>Based in Hong Kong, available globally and across Asia-Pacific.</em>
            </p>
          </div>
        </section>
      </article>
    </Main>
  );
};

export default Contact;
