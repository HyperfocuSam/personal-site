import React, {
  useEffect, useState, useCallback, useRef,
} from 'react';
import PropTypes from 'prop-types';

import { track, identifyLead } from '../../utils/track';

const interestOptions = [
  'Corporate Training',
  '1-1 Coaching',
  'Speaking',
  'Become an Adaptig Trainer',
  'Other',
];

const FORMSPREE_URL = 'https://formspree.io/f/mwvrrwbe';

const ContactForm = ({ initialInterest, placement }) => {
  const [interest, setInterest] = useState(initialInterest);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Refs, not state: a re-render during hydration is how React #418 happens,
  // and this codebase has paid for that lesson several times over.
  const startedRef = useRef(false);
  const cspBlockedRef = useRef(false);

  useEffect(() => {
    if (interestOptions.includes(initialInterest)) {
      setInterest(initialInterest);
    } else {
      setInterest('Corporate Training');
    }
  }, [initialInterest]);

  // Distinguishes "the browser refused the request" from "Formspree was down".
  // Between 2026-05-15 and 2026-08-11 the site's own CSP omitted formspree.io
  // and silently ate every submission for 88 days; the failure was
  // indistinguishable from a flaky network. This listener makes the next
  // occurrence self-reporting.
  useEffect(() => {
    const onViolation = (e) => {
      if ((e.blockedURI || '').includes('formspree.io')) {
        cspBlockedRef.current = true;
      }
    };
    document.addEventListener('securitypolicyviolation', onViolation);
    return () => document.removeEventListener('securitypolicyviolation', onViolation);
  }, []);

  const noteStarted = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    track('contact_form_started', { interest, placement });
  }, [interest, placement]);

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
        track('contact_form_submitted', { interest, placement });
        identifyLead(email, {
          name,
          interest,
          identified_via: 'contact_form',
        });
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Something went wrong. Please try again.');
        track('contact_form_failed', { reason: 'server', status: res.status });
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
      track('contact_form_failed', {
        reason: cspBlockedRef.current ? 'csp_blocked' : 'network',
        status: 0,
      });
    } finally {
      setSubmitting(false);
    }
  }, [interest, name, email, message, placement]);

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
      {/* action/method are a no-JS fallback only: handleSubmit calls
          preventDefault, so a native POST happens solely when React never
          hydrated. Requires formspree.io in the CSP form-action directive. */}
      <form
        className="contact-form fn-card"
        action={FORMSPREE_URL}
        method="POST"
        onSubmit={handleSubmit}
        onChange={noteStarted}
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
      <p className="contact-form__privacy">
        Your message comes straight to my inbox. I use PostHog and Google
        Analytics to see how this site gets used.
      </p>
    </section>
  );
};

ContactForm.propTypes = {
  initialInterest: PropTypes.string,
  // Which surface this instance is rendered on, so /contact and the
  // /get-started lander stay separable in the funnel.
  placement: PropTypes.string,
};

ContactForm.defaultProps = {
  initialInterest: 'Corporate Training',
  placement: 'contact_page',
};

export default ContactForm;
