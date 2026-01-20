import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EmailCapture = ({ compact, source }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // Basic email validation
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      // For now, we'll use a simple form submission
      // This can be replaced with Mailchimp, ConvertKit, or any email service
      const formData = new FormData();
      formData.append('email', email);
      formData.append('source', source || 'website');

      // Simulate success for now - replace with actual form endpoint
      // Example: await fetch('https://your-form-endpoint.com/subscribe', { method: 'POST', body: formData });

      setStatus('success');
      setMessage('Check your inbox for the AI Prompt Guide!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className={`email-capture email-capture--success ${compact ? 'email-capture--compact' : ''}`}>
        <p className="email-capture__message email-capture__message--success">
          {message}
        </p>
        <a
          href="/downloads/ai-prompt-guide.pdf"
          className="button"
          download
        >
          Download Now
        </a>
      </div>
    );
  }

  return (
    <form
      className={`email-capture ${compact ? 'email-capture--compact' : ''}`}
      onSubmit={handleSubmit}
    >
      <div className="email-capture__input-group">
        <input
          type="email"
          className="email-capture__input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          aria-label="Email address"
        />
        <button
          type="submit"
          className="button email-capture__button"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending...' : 'Get Free Guide'}
        </button>
      </div>
      {status === 'error' && (
        <p className="email-capture__message email-capture__message--error">
          {message}
        </p>
      )}
      <p className="email-capture__privacy">
        No spam, ever. Unsubscribe anytime.
      </p>
    </form>
  );
};

EmailCapture.propTypes = {
  compact: PropTypes.bool,
  source: PropTypes.string,
};

EmailCapture.defaultProps = {
  compact: false,
  source: 'website',
};

export default EmailCapture;
