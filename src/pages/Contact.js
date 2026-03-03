import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Main from '../layouts/Main';
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
    >
      <article className="post" id="contact">
        <header>
          <div className="title">
            <h2>
              <Link to="/contact">Contact</Link>
            </h2>
            <p>Let us Connect</p>
          </div>
        </header>

        <p>
          Whether you are interested in corporate AI training, 1-1 coaching, speaking engagements,
          or just want to have a conversation about AI, I would love to hear from you.
        </p>

        <ContactForm initialInterest={initialInterest} />

        <h3>Prefer a direct message?</h3>
        <div className="email-at">
          <p>Drop me a message at:</p>
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
          <li><strong>Corporate Training</strong> - AI workshops for your organization</li>
          <li><strong>1-1 Coaching</strong> - Personalized AI learning sessions</li>
          <li><strong>Speaking</strong> - Keynotes and workshop facilitation</li>
          <li><strong>Consulting</strong> - AI strategy and implementation guidance</li>
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
