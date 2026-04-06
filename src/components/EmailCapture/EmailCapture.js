import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const SUBSTACK_SUBSCRIBE_URL = 'https://wongsam.substack.com/subscribe';

const EmailCapture = ({
  title,
  blurb,
  leadMagnet,
  variant,
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const event = leadMagnet ? 'lead_magnet_downloaded' : 'newsletter_subscribed';
    if (window.posthog) {
      window.posthog.capture(event, {
        source: window.location.pathname,
        ...(leadMagnet && { magnet: leadMagnet.title }),
      });
    }
    if (window.gtag) {
      window.gtag('event', 'sign_up', {
        event_category: 'newsletter',
        method: leadMagnet ? 'lead_magnet' : 'substack',
      });
    }

    window.open(
      `${SUBSTACK_SUBSCRIBE_URL}?email=${encodeURIComponent(email)}`,
      '_blank',
      'noopener,noreferrer',
    );
    setSubmitted(true);
  }, [email, leadMagnet]);

  const buttonLabel = leadMagnet ? 'Get the Playbook' : 'Subscribe';

  return (
    <section className={`email-capture${leadMagnet ? ' email-capture--magnet' : ''}${variant === 'dark' ? ' email-capture--dark' : ''}`}>
      <h3>{title}</h3>
      <p>{blurb}</p>

      {submitted ? (
        <div className="email-capture__success">
          {leadMagnet && (
            <a
              href={leadMagnet.url}
              target="_blank"
              rel="noopener noreferrer"
              className="button email-capture__download"
            >
              Download: {leadMagnet.title}
            </a>
          )}
          <p>Complete your subscription in the Substack tab that just opened.</p>
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
            >
              {buttonLabel}
            </button>
          </form>
          <a
            href="https://wa.me/85264315177"
            target="_blank"
            rel="noopener noreferrer"
            className="email-capture__whatsapp"
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
  variant: PropTypes.string,
};

EmailCapture.defaultProps = {
  title: 'Stay in the loop',
  blurb: 'Occasional insights on AI adoption. No spam, no hype.',
  leadMagnet: null,
  variant: 'default',
};

export default EmailCapture;
