import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const interestOptions = [
  'Corporate Training',
  '1-1 Coaching',
  'Speaking',
  'Become an Adaptig Trainer',
  'Other',
];

const FORMSPREE_URL = 'https://formspree.io/f/mwvrrwbe';

const ContactForm = ({ initialInterest }) => {
  const [interest, setInterest] = useState(initialInterest);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (interestOptions.includes(initialInterest)) {
      setInterest(initialInterest);
    } else {
      setInterest('Corporate Training');
    }
  }, [initialInterest]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name, email, interest, message,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        if (window.posthog) {
          window.posthog.capture('contact_form_submitted', { interest });
        }
        if (window.gtag) {
          window.gtag('event', 'generate_lead', {
            event_category: 'contact',
            event_label: interest,
            value: 1,
          });
        }
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }, [interest, name, email, message]);

  if (submitted) {
    return (
      <section className="contact-form-section">
        <div className="contact-form__success">
          <h3>Message sent</h3>
          <p>
            Thanks, {name}. I&apos;ll reply within 24 hours.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="contact-form-section">
      <h3>Tell me what you need</h3>
      <p>
        Share your goals, current context, and timeline.
        I will reply with a recommended next step.
      </p>
      <form
        className="contact-form"
        onSubmit={handleSubmit}
      >
        <label className="contact-form__field" htmlFor="name">
          <span className="contact-form__field-label">Name</span>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="contact-form__field" htmlFor="email">
          <span className="contact-form__field-label">Email</span>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="contact-form__field" htmlFor="interest">
          <span className="contact-form__field-label">
            Interest
          </span>
          <div className="select-wrapper">
            <select
              id="interest"
              name="interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              required
            >
              {interestOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label className="contact-form__field" htmlFor="message">
          <span className="contact-form__field-label">
            Message
          </span>
          <textarea
            id="message"
            name="message"
            rows="6"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              'Tell me your goals, context, and what '
              + 'support you are looking for.'
            }
          />
        </label>

        {error && (
          <div className="contact-form__error">
            <p>{error}</p>
          </div>
        )}

        <ul className="actions">
          <li>
            <button
              type="submit"
              className="button contact-form__submit"
              disabled={submitting}
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </li>
        </ul>
      </form>
    </section>
  );
};

ContactForm.propTypes = {
  initialInterest: PropTypes.string,
};

ContactForm.defaultProps = {
  initialInterest: 'Corporate Training',
};

export default ContactForm;
