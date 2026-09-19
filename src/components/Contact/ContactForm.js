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

// Same-origin on purpose (see api/contact.js): with the receiver on our own
// /api/contact there is no third-party origin for the CSP to forget — the
// omission that silently ate every submission for 88 days in 2026.
// The Formspree rollback was retired on 2026-08-15 along with its CSP entries,
// after the Resend path was exercised end to end through both the English and
// the Chinese form and both messages were confirmed delivered.
const CONTACT_ENDPOINT = '/api/contact';

// Mints the signed token /api/contact now demands on every submission. Added
// 2026-09-17 after the funnel digests found every September contact mail was
// spam with zero matching PostHog events — the bots POST /api/contact directly
// and never run this file, so the honeypot below never saw them. Requiring a
// token forces a prior GET from a client that keeps the value and waits.
// Same-origin, so `connect-src 'self'` already covers it and the CSP needs no
// new entry (see the note in public/index.html about why that matters).
const TOKEN_ENDPOINT = '/api/form-token';

// Mirrors MIN_TOKEN_AGE_MS in api/_form-guard.js. The client waits out the
// remainder itself rather than letting a fast submit come back 403.
const MIN_TOKEN_AGE_MS = 3000;

const fetchToken = async () => {
  if (typeof fetch !== 'function') return '';
  // react-snap prerenders every route with this user agent and no /api routes
  // behind its static server, so the request would only ever be a 404 warning
  // in the build log. Same guard the analytics bootstrap in index.html uses.
  if (typeof navigator !== 'undefined' && navigator.userAgent === 'ReactSnap') return '';
  try {
    const res = await fetch(TOKEN_ENDPOINT, { headers: { Accept: 'application/json' } });
    if (!res.ok) return '';
    const data = await res.json();
    return typeof data.token === 'string' ? data.token : '';
  } catch {
    return '';
  }
};

// Token shape is `v1.<ms>.<nonce>.<sig>`; the timestamp is plaintext on purpose
// so the client can tell how long it still has to wait. NaN for anything else,
// which reads as "do not wait" and lets the server be the one to refuse it.
const tokenAgeMs = (token) => {
  const ts = Number(String(token || '').split('.')[1]);
  return Number.isFinite(ts) ? Date.now() - ts : NaN;
};

const sleep = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });

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

  // Distinguishes "the browser refused the request" from "the mail service was
  // down". Between 2026-05-15 and 2026-08-11 the site's own CSP silently ate
  // every submission for 88 days; the failure was indistinguishable from a
  // flaky network. A same-origin endpoint makes a connect-src violation nearly
  // impossible, but the tripwire stays: if it ever fires, PostHog gets
  // `csp_blocked` instead of a lie about the visitor's connection.
  useEffect(() => {
    const onViolation = (e) => {
      if ((e.blockedURI || '').includes('/api/contact')) {
        cspBlockedRef.current = true;
      }
    };
    document.addEventListener('securitypolicyviolation', onViolation);
    return () => document.removeEventListener('securitypolicyviolation', onViolation);
  }, []);

  // api/contact.js discards any submission where a field named `_gotcha`
  // arrives non-empty (same contract Formspree had). It matters because bots
  // have outnumbered humans on this form 97 attempts to 11 — and unlike the
  // old free tier there is no monthly quota left for them to burn through.
  const gotchaRef = useRef(null);

  // The DOM node carries the token for the native no-JS POST; the ref carries
  // it for the fetch path. Written imperatively rather than through state:
  // a hidden input whose value arrives after the prerendered HTML is exactly
  // the hydration mismatch (React #418) this file has been bitten by before.
  const tokenNodeRef = useRef(null);
  const tokenRef = useRef('');

  const storeToken = useCallback((value) => {
    tokenRef.current = value || '';
    if (tokenNodeRef.current) tokenNodeRef.current.value = tokenRef.current;
  }, []);

  useEffect(() => {
    let cancelled = false;
    // public/index.html mints one as soon as a prerendered contact page loads,
    // so the clock is already running before React hydrates — and so the form
    // still works if the bundle never hydrates at all. Await that request
    // rather than firing a second one; on a client-side navigation to the
    // contact page there is no bootstrap and this fetches its own.
    const pending = (typeof window !== 'undefined' && window.__hfFormTokenPromise) || null;
    const source = pending ? Promise.resolve(pending).catch(() => '') : fetchToken();
    source.then((value) => { if (!cancelled) storeToken(value || ''); });
    return () => { cancelled = true; };
  }, [storeToken]);

  // Tokens are single-use server-side, so every attempt burns one — including
  // an attempt that failed on a 502. Without this, a retry after any error
  // would be refused as a replay.
  const refreshToken = useCallback(() => {
    storeToken('');
    fetchToken().then(storeToken);
  }, [storeToken]);

  const readyToken = useCallback(async () => {
    let value = tokenRef.current;
    if (!value) {
      value = await fetchToken();
      storeToken(value);
    }
    if (!value) return '';
    const age = tokenAgeMs(value);
    const wait = Number.isFinite(age) ? MIN_TOKEN_AGE_MS - age : 0;
    // Capped: a clock-skewed client must not sit here forever.
    if (wait > 0) await sleep(Math.min(wait, MIN_TOKEN_AGE_MS) + 250);
    return value;
  }, [storeToken]);

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
      const formToken = await readyToken();
      const res = await fetch(CONTACT_ENDPOINT, {
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
          // Drives the auto-reply's language server-side; the value is the
          // page's language prop, so /contact and /zh/contact differ.
          language,
          // Read straight off the DOM node: a bot that fills the field never
          // dispatches React's onChange, so component state would miss it.
          _gotcha: (gotchaRef.current && gotchaRef.current.value) || '',
          _ft: formToken,
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
        // 403 is the bot gate refusing this submission. Worth its own reason so
        // a spike of humans tripping it is visible instead of being filed as a
        // generic server error.
        track('contact_form_failed', {
          reason: res.status === 403 ? 'blocked' : 'server',
          status: res.status,
        });
        refreshToken();
      }
    } catch {
      setError(t.errorNetwork);
      track('contact_form_failed', {
        reason: cspBlockedRef.current ? 'csp_blocked' : 'network',
        status: 0,
      });
      refreshToken();
    } finally {
      setSubmitting(false);
    }
  }, [interest, name, email, message, placement, t, readyToken, refreshToken]);

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
          hydrated. Covered by `form-action 'self'` in the CSP; the endpoint
          answers a native POST with a readable HTML confirmation page. */}
      <form
        className="contact-form fn-card"
        action={CONTACT_ENDPOINT}
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

        {/* Carries the page language into the native no-JS POST. Rendered
            unconditionally with a per-page-constant value — hydration-safe. */}
        <input type="hidden" name="language" value={language} />

        {/* The form token for the native no-JS POST. Uncontrolled and empty in
            the prerendered HTML — its value is written imperatively by the
            effect above, or by the bootstrap in public/index.html if the React
            bundle never hydrates. A controlled value here would prerender as
            a stale token and mismatch on hydration. */}
        <input type="hidden" name="_ft" ref={tokenNodeRef} />

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
