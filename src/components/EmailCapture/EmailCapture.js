import React from 'react';
import PropTypes from 'prop-types';

const EmailCapture = ({
  title,
  blurb,
}) => (
  <section className="email-capture">
    <h3>{title}</h3>
    <p>{blurb}</p>
    <div className="email-capture__controls">
      <a
        href="mailto:sam@adaptig.com?subject=Inquiry%20from%20hyperfocusam.com"
        className="button email-capture__submit"
      >
        Email Me
      </a>
      <a
        href="https://wa.me/85264315177"
        target="_blank"
        rel="noopener noreferrer"
        className="button button--outline email-capture__submit"
      >
        WhatsApp
      </a>
    </div>
  </section>
);

EmailCapture.propTypes = {
  title: PropTypes.string,
  blurb: PropTypes.string,
};

EmailCapture.defaultProps = {
  title: 'Stay in the loop',
  blurb: 'Occasional insights on AI adoption. No spam, no hype.',
};

export default EmailCapture;
