import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const SUBSTACK_URL = 'https://wongsam.substack.com/api/v1/free?noRedirect=true';

const EmailCapture = ({
  title,
  blurb,
}) => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(SUBSTACK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          first_url: window.location.href,
          first_referrer: document.referrer,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        if (window.posthog) {
          window.posthog.capture('newsletter_subscribed', { source: window.location.pathname });
        }
      } else {
        setError('Could not subscribe. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }, [email]);

  return (
    <section className="email-capture">
      <h3>{title}</h3>
      <p>{blurb}</p>

      {submitted ? (
        <div className="email-capture__success">
          <p>Check your email to confirm your subscription.</p>
        </div>
      ) : (
        <>
          <form className="email-capture__form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="email-capture__input"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="button email-capture__submit"
              disabled={submitting}
            >
              {submitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {error && (
            <p className="email-capture__error">{error}</p>
          )}
          <a
            href="https://wa.me/85264315177"
            target="_blank"
            rel="noopener noreferrer"
            className="email-capture__whatsapp"
          >
            Or message me on WhatsApp
          </a>
        </>
      )}
    </section>
  );
};

EmailCapture.propTypes = {
  title: PropTypes.string,
  blurb: PropTypes.string,
};

EmailCapture.defaultProps = {
  title: 'Stay in the loop',
  blurb: 'Occasional insights on AI adoption. No spam, no hype.',
};

export default EmailCapture;
