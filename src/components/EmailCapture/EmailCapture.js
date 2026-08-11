import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { track, identifyLead } from '../../utils/track';

const SUBSTACK_SUBSCRIBE_URL = 'https://wongsam.substack.com/subscribe';

const EmailCapture = ({
  title,
  blurb,
  caption,
  leadMagnet,
  variant,
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    // Always newsletter_subscribed here, magnet or not. lead_magnet_downloaded
    // now fires from the actual PDF anchor in the success state below, so it
    // means "opened the PDF" rather than "asked for it" — the magnet funnel is
    // two real steps instead of one event standing in for both.
    //
    // outcome: 'handoff' is deliberate. This opens Substack in a new tab and
    // the site never learns whether the subscribe completed, so the event must
    // not be read as a confirmed subscriber.
    track('newsletter_subscribed', {
      source: window.location.pathname,
      outcome: 'handoff',
      ...(leadMagnet && { magnet: leadMagnet.title }),
    });
    identifyLead(email, { identified_via: 'newsletter' });

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
      {caption && <p className="email-capture__caption">{caption}</p>}
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
  caption: PropTypes.string,
  leadMagnet: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  variant: PropTypes.string,
};

EmailCapture.defaultProps = {
  title: 'Stay in the loop',
  blurb: 'Occasional insights on AI adoption. No spam, no hype.',
  caption: '',
  leadMagnet: null,
  variant: 'default',
};

export default EmailCapture;
