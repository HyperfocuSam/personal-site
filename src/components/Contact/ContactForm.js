import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_FORMSPREE_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID';

const interestOptions = [
  'Corporate Training',
  '1-1 Coaching',
  'Speaking',
  'Become an Adaptig Trainer',
  'Other',
];

const ContactForm = ({ actionUrl, initialInterest }) => {
  const [interest, setInterest] = useState(initialInterest);

  useEffect(() => {
    if (interestOptions.includes(initialInterest)) {
      setInterest(initialInterest);
    } else {
      setInterest('Corporate Training');
    }
  }, [initialInterest]);

  return (
    <section className="contact-form-section">
      <h3>Let&apos;s talk</h3>
      <p>Share what you are working on. I&apos;ll get back to you soon.</p>
      <form className="contact-form" action={actionUrl} method="POST">
        <label className="contact-form__field" htmlFor="name">
          <span className="contact-form__field-label">Name</span>
          <input id="name" name="name" type="text" autoComplete="name" required />
        </label>

        <label className="contact-form__field" htmlFor="email">
          <span className="contact-form__field-label">Email</span>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </label>

        <label className="contact-form__field" htmlFor="interest">
          <span className="contact-form__field-label">Interest</span>
          <div className="select-wrapper">
            <select
              id="interest"
              name="interest"
              value={interest}
              onChange={(event) => setInterest(event.target.value)}
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
          <span className="contact-form__field-label">Message</span>
          <textarea
            id="message"
            name="message"
            rows="6"
            required
            placeholder="Tell me your goals, context, and what support you are looking for."
          />
        </label>

        <input type="hidden" name="_subject" value="New inquiry from hyperfocusam.com" />

        <ul className="actions">
          <li>
            <button type="submit" className="button contact-form__submit">
              Send Message
            </button>
          </li>
        </ul>
      </form>
    </section>
  );
};

ContactForm.propTypes = {
  actionUrl: PropTypes.string,
  initialInterest: PropTypes.string,
};

ContactForm.defaultProps = {
  actionUrl: process.env.REACT_APP_FORMSPREE_ENDPOINT || DEFAULT_FORMSPREE_ENDPOINT,
  initialInterest: 'Corporate Training',
};

export default ContactForm;
