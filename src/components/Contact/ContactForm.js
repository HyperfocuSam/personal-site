import React, {
  useEffect, useState, useCallback, useRef,
} from 'react';
import PropTypes from 'prop-types';

import { track, identifyLead } from '../../utils/track';

// The VALUE is always English and never translated — it is what lands in Sam's
// inbox and what `interest` reports in the funnel, so a Chinese enquiry has to
// be filterable alongside an English one. Only the label changes.
const interestOptions = [
  { value: 'Corporate Training', en: 'Corporate Training', zh: '企業培訓' },
  { value: '1-1 Coaching', en: '1-1 Coaching', zh: '一對一教練' },
  { value: 'Speaking', en: 'Speaking', zh: '演講邀請' },
  { value: 'Become an Adaptig Trainer', en: 'Become an Adaptig Trainer', zh: '成為 Adaptig 導師' },
  { value: 'Other', en: 'Other', zh: '其他' },
];
const interestValues = interestOptions.map((o) => o.value);

const COPY = {
  en: {
    heading: 'Tell me what you need',
    intro: 'Share your goals, current context, and timeline. I will reply with a recommended next step.',
    name: 'Name',
    email: 'Email',
    interest: 'Interest',
    message: 'Message',
    placeholder: 'Tell me your goals, context, and what support you are looking for.',
    send: 'Send Message',
    sending: 'Sending...',
    sentTitle: 'Message sent',
    sentBody: (n) => `Thanks, ${n}. I'll reply within 24 hours.`,
    errorServer: 'Something went wrong. Please try again.',
    errorNetwork: 'Network error. Please check your connection and try again.',
    privacy: 'Your message comes straight to my inbox. I use PostHog and Google Analytics to see how this site gets used.',
  },
  'zh-Hant': {
    heading: '講講你需要甚麼',
    intro: '講一下你的目標、目前的情況和時間表，我會回覆一個建議的下一步。',
    name: '姓名',
    email: '電郵',
    interest: '想了解',
    message: '訊息',
    placeholder: '講一下你的目標、背景，以及你想要甚麼支援。',
    send: '傳送訊息',
    sending: '傳送中...',
    sentTitle: '訊息已傳送',
    sentBody: (n) => `多謝你，${n}。我會在 24 小時內回覆。`,
    errorServer: '出了點問題，請再試一次。',
    errorNetwork: '網絡錯誤，請檢查連線後再試。',
    privacy: '你的訊息會直接送到我的收件箱。我用 PostHog 和 Google Analytics 了解這個網站的使用情況。',
  },
};

const FORMSPREE_URL = 'https://formspree.io/f/mwvrrwbe';

const ContactForm = ({ initialInterest, placement, language }) => {
  const t = COPY[language] || COPY.en;
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
    if (interestValues.includes(initialInterest)) {
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

  // Formspree discards any submission where a field named `_gotcha` arrives
  // non-empty, so this needs no server-side work. It matters because bots have
  // outnumbered humans on this form 97 attempts to 11, and Formspree's free
  // tier caps at 50 submissions/month — a quota rejection returns non-OK and
  // would look exactly like the 88-day CSP outage that already cost a lead.
  const gotchaRef = useRef(null);

  const noteStarted = useCallback((e) => {
    // A bot filling the honeypot must not register as a started form; these
    // funnel numbers only just became trustworthy.
    if (e && e.target && e.target.name === '_gotcha') return;
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
          name,
          email,
          interest,
          message,
          // Read straight off the DOM node: a bot that fills the field never
          // dispatches React's onChange, so component state would miss it.
          _gotcha: (gotchaRef.current && gotchaRef.current.value) || '',
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
        setError(data.error || t.errorServer);
        track('contact_form_failed', { reason: 'server', status: res.status });
      }
    } catch {
      setError(t.errorNetwork);
      track('contact_form_failed', {
        reason: cspBlockedRef.current ? 'csp_blocked' : 'network',
        status: 0,
      });
    } finally {
      setSubmitting(false);
    }
  }, [interest, name, email, message, placement, t]);

  if (submitted) {
    return (
      <section className="contact-form-section">
        <div className="contact-form__success">
          <h3>{t.sentTitle}</h3>
          <p>{t.sentBody(name)}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="contact-form-section">
      <h3>{t.heading}</h3>
      <p>{t.intro}</p>
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
        {/* Honeypot. Rendered unconditionally and hidden in CSS — a
            conditionally-rendered node here is exactly how react-snap
            hydration (React #418) breaks, and this file has been bitten
            before. Off-screen rather than display:none so bots that skip
            hidden inputs still fill it. */}
        <input
          ref={gotchaRef}
          type="text"
          name="_gotcha"
          className="contact-form__gotcha"
          tabIndex="-1"
          autoComplete="off"
          aria-hidden="true"
        />

        <label className="contact-form__field" htmlFor="name">
          <span className="contact-form__field-label">{t.name}</span>
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
          <span className="contact-form__field-label">{t.email}</span>
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
          <span className="contact-form__field-label">{t.interest}</span>
          <div className="select-wrapper">
            <select
              id="interest"
              name="interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              required
            >
              {interestOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {language === 'zh-Hant' ? option.zh : option.en}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label className="contact-form__field" htmlFor="message">
          <span className="contact-form__field-label">{t.message}</span>
          <textarea
            id="message"
            name="message"
            rows="6"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.placeholder}
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
              {submitting ? t.sending : t.send}
            </button>
          </li>
        </ul>
      </form>
      <p className="contact-form__privacy">{t.privacy}</p>
    </section>
  );
};

ContactForm.propTypes = {
  initialInterest: PropTypes.string,
  // Which surface this instance is rendered on, so /contact, /zh/contact and
  // the /get-started lander stay separable in the funnel.
  placement: PropTypes.string,
  language: PropTypes.oneOf(['en', 'zh-Hant']),
};

ContactForm.defaultProps = {
  initialInterest: 'Corporate Training',
  placement: 'contact_page',
  language: 'en',
};

export default ContactForm;
