import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_BUTTONDOWN_ACTION = 'https://buttondown.com/api/emails/embed-subscribe/REPLACE_WITH_YOUR_USERNAME';

const EmailCapture = ({
  actionUrl,
  source,
  title,
  blurb,
}) => (
  <section className="email-capture">
    <h3>{title}</h3>
    <p>{blurb}</p>
    <form className="email-capture__form" action={actionUrl} method="post" target="_blank">
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="embed" value="1" />
      <div className="email-capture__controls">
        <label htmlFor={`email-capture-${source}`} className="email-capture__field">
          <span className="email-capture__label">Email</span>
          <input
            id={`email-capture-${source}`}
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </label>
        <button type="submit" className="button email-capture__submit">
          Subscribe
        </button>
      </div>
    </form>
  </section>
);

EmailCapture.propTypes = {
  actionUrl: PropTypes.string,
  source: PropTypes.string,
  title: PropTypes.string,
  blurb: PropTypes.string,
};

EmailCapture.defaultProps = {
  actionUrl: process.env.REACT_APP_BUTTONDOWN_ACTION_URL || DEFAULT_BUTTONDOWN_ACTION,
  source: 'website',
  title: 'Stay in the loop',
  blurb: 'Occasional insights on AI adoption. No spam, no hype.',
};

export default EmailCapture;
