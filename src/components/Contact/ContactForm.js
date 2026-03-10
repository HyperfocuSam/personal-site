import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const interestOptions = [
  'Corporate Training',
  '1-1 Coaching',
  'Speaking',
  'Become an Adaptig Trainer',
  'Other',
];

const ContactForm = ({ initialInterest }) => {
  const [interest, setInterest] = useState(initialInterest);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (interestOptions.includes(initialInterest)) {
      setInterest(initialInterest);
    } else {
      setInterest('Corporate Training');
    }
  }, [initialInterest]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[${interest}] Inquiry from ${name}`,
    );
    const body = encodeURIComponent(
      `Hi Sam,\n\n${message}\n\n---\n`
      + `Name: ${name}\nEmail: ${email}\n`
      + `Interest: ${interest}`,
    );
    window.location.href = (
      `mailto:sam@adaptig.com?subject=${subject}&body=${body}`
    );
  }, [interest, name, email, message]);

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

        <ul className="actions">
          <li>
            <button
              type="submit"
              className="button contact-form__submit"
            >
              Send Message
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
