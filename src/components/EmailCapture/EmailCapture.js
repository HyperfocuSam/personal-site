import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const SUBSTACK_URL = 'https://wongsam.substack.com/api/v1/free?noRedirect=true';

const EmailCapture = ({
  title,
  blurb,
  leadMagnet,
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
        const event = leadMagnet ? 'lead_magnet_downloaded' : 'newsletter_subscribed';
        if (window.posthog) {
          window.posthog.capture(event, {
            source: window.location.pathname,
            ...(leadMagnet && { magnet: leadMagnet.title }),
          });
        }
      } else {
        setError('Could not subscribe. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }, [email, leadMagnet]);

  const buttonLabel = leadMagnet ? 'Get the Playbook' : 'Subscribe';
  const buttonLabelBusy = leadMagnet ? 'Sending...' : 'Subscribing...';

  return (
    <section className={`email-capture${leadMagnet ? ' email-capture--magnet' : ''}`}>
      <h3>{title}</h3>
      <p>{blurb}</p>

      {submitted ? (
        <div className="email-capture__success">
          {leadMagnet ? (
            <>
              <a
                href={leadMagnet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="button email-capture__download"
              >
                Download: {leadMagnet.title}
              </a>
              <p>Also check your email to confirm your subscription.</p>
            </>
          ) : (
            <p>Check your email to confirm your subscription.</p>
          )}
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
              {submitting ? buttonLabelBusy : buttonLabel}
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
  leadMagnet: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
};

EmailCapture.defaultProps = {
  title: 'Stay in the loop',
  blurb: 'Occasional insights on AI adoption. No spam, no hype.',
  leadMagnet: null,
};

export default EmailCapture;
