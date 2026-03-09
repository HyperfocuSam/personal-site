import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import EmailLink from '../components/Contact/EmailLink';
import ContactIcons from '../components/Contact/ContactIcons';
import ContactForm from '../components/Contact/ContactForm';

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
    >
      <article className="post" id="contact">
        <header>
          <div className="title">
            <h2>
              <Link to="/contact">Contact</Link>
            </h2>
            <p>Let&apos;s find the right next step</p>
          </div>
        </header>

        <p>
          Whether you need team training, one-on-one coaching, speaking support, or trainer
          recruitment details, share your situation and I&apos;ll guide you to the best option.
        </p>

        <ContactForm initialInterest={initialInterest} />

        <h3>Prefer a direct message?</h3>
        <div className="email-at">
          <p>Email me directly:</p>
          <EmailLink />
        </div>

        <h3>Quick Response via WhatsApp</h3>
        <p>
          For faster responses, reach me on{' '}
          <a href="https://wa.me/85264315177" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>.
        </p>

        <h3>What I Can Help With</h3>
        <ul>
          <li><strong>Corporate Training</strong> - Team workshops and adoption programs</li>
          <li><strong>1-1 Coaching</strong> - Personalized support for your own workflow</li>
          <li><strong>Speaking</strong> - Keynotes, briefings, and event sessions</li>
          <li><strong>Trainer Recruitment</strong> - Joining the Adaptig trainer network</li>
        </ul>

        <h3>Connect on Social</h3>
        <ContactIcons />

        <br />
        <p>
          <em>Based in Hong Kong, available globally and across Asia-Pacific.</em>
        </p>
      </article>
    </Main>
  );
};

export default Contact;
