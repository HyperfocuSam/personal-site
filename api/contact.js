// POST /api/contact — the contact form's receiver, sending mail via Resend.
//
// This replaced Formspree on 2026-08-14. Same-origin on purpose: the form's
// fetch and native POST are both covered by `connect-src 'self'` / `form-action
// 'self'`, so the CSP-omission failure that silently ate 88 days of
// submissions (2026-05-15 → 2026-08-11) has no third-party origin left to
// forget. Deployed by scripts/deploy-vercel.sh copying api/ into build/ —
// this file must stay dependency-free (no package.json ships with the build).
//
// Env (Vercel project settings):
//   RESEND_API_KEY  required — function 500s without it, and the deploy
//                   checklist treats a live 500 here as a blocked release.
//   CONTACT_TO      default sam@adaptig.com
//   CONTACT_FROM    default "hyperfocusam.com <onboarding@resend.dev>" —
//                   Resend's shared onboarding sender, which may only deliver
//                   to the account owner's address. Switch to a verified
//                   hyperfocusam.com sender once the domain's DKIM records
//                   are live in Resend.
//   CONTACT_AUTOREPLY_FROM  unset = no auto-reply (the gate). Set it to a
//                   verified sender (e.g. "Sam Wong <hello@hyperfocusam.com>")
//                   ONLY after (a) the domain verifies in Resend and (b) Sam
//                   approved the auto-reply copy below. An auto-reply from an
//                   unverified sender would fail per-lead, silently.
//   CONTACT_FORM_SECRET  optional — HMAC key for the form token, defaults to
//                   RESEND_API_KEY. See api/_form-guard.js.
//
// Bot protection (2026-09-17). The 2026-09-06 and 2026-09-13 funnel digests
// found every contact mail that week was spam while PostHog showed zero form
// events: the bots POST this route directly and never run the page's JS. Three
// server-side gates now stand in front of Resend, in this order — per-IP rate
// limit, honeypot, and a signed token from /api/form-token that must be at
// least three seconds old. None of them can be skipped by skipping the React
// form, which was the whole problem with defending this in the component.

const { verifyToken, clientIp, rateLimit } = require('./_form-guard');

const RESEND_API = 'https://api.resend.com/emails';

// A human submits once, thinks, maybe corrects a typo and submits again. Five
// in ten minutes from one address is already generous; a script doing volume
// is nowhere near it.
const SUBMIT_RATE = { windowMs: 10 * 60 * 1000, max: 5 };

// Mirrors the client-side rule loosely; the real validation is a human reading
// the message. Length caps are abuse control, not correctness.
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const field = (body, key, max) => String((body && body[key]) || '').trim().slice(0, max);

const parseBody = (req) => {
  const raw = req.body;
  if (raw && typeof raw === 'object') return raw;
  if (typeof raw === 'string' && raw.length) {
    try { return JSON.parse(raw); } catch (_) { /* fall through */ }
    return Object.fromEntries(new URLSearchParams(raw));
  }
  return {};
};

// The native no-JS fallback POST navigates the browser here, so it must get a
// readable page back, not JSON. Bilingual because the form is.
const SUCCESS_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>Message sent — Sam Wong</title>
<style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
background:#FFF6F0;color:#0A0E23;display:grid;place-items:center;min-height:100vh;margin:0}
main{max-width:28rem;padding:2rem;text-align:center}a{color:#0A0E23}</style></head>
<body><main><h1>Message sent</h1>
<p>Thanks — your message is in my inbox. I&rsquo;ll reply within 24 hours.</p>
<p lang="zh-Hant">多謝你，訊息已送到我的收件箱，我會在 24 小時內回覆。</p>
<p><a href="/">&larr; hyperfocusam.com</a></p></main></body></html>`;

const isJsonRequest = (req) => {
  const accept = String(req.headers.accept || '');
  const type = String(req.headers['content-type'] || '');
  return accept.includes('application/json') || type.includes('application/json');
};

const succeed = (req, res) => {
  if (isJsonRequest(req)) return res.status(200).json({ ok: true });
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(SUCCESS_HTML);
};

// The native no-JS POST needs a readable page on failure too, not raw JSON —
// and it needs the mailto, because a rejected human must still have a door.
const errorPage = (message) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>Message not sent — Sam Wong</title>
<style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
background:#FFF6F0;color:#0A0E23;display:grid;place-items:center;min-height:100vh;margin:0}
main{max-width:28rem;padding:2rem;text-align:center}a{color:#0A0E23}</style></head>
<body><main><h1>Message not sent</h1>
<p>${message}</p>
<p>You can always email me directly:
<a href="mailto:sam@adaptig.com">sam@adaptig.com</a></p>
<p lang="zh-Hant">訊息未能傳送，可以直接電郵給我。</p>
<p><a href="/contact/">&larr; Back to the contact form</a></p></main></body></html>`;

// `reason` never reaches the visitor: naming the failed check is free tuning
// feedback for whoever is probing. It goes to the Vercel function log instead,
// which is the only place these rejections are observable — PostHog cannot see
// a request that never ran the page's JavaScript.
const refuse = (req, res, status, message, reason) => {
  console.warn('contact_blocked', JSON.stringify({
    reason,
    status,
    ip: clientIp(req),
    ua: String(req.headers['user-agent'] || '').slice(0, 120),
  }));
  if (isJsonRequest(req)) return res.status(status).json({ error: message });
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(status).send(errorPage(message));
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = parseBody(req);
  const name = field(body, 'name', 200);
  const email = field(body, 'email', 320);
  const interest = field(body, 'interest', 100);
  const message = field(body, 'message', 5000);
  const language = field(body, 'language', 10) === 'zh-Hant' ? 'zh-Hant' : 'en';

  // Gate 1 — rate limit, before anything else touches the body. Counts every
  // attempt including the ones the gates below reject, so a script does not get
  // unlimited free tries at guessing a token.
  const limit = rateLimit(`contact:${clientIp(req)}`, SUBMIT_RATE);
  if (!limit.ok) {
    res.setHeader('Retry-After', String(limit.retryAfter));
    return refuse(req, res, 429, 'Too many messages from this connection. Please try again shortly.', 'rate_limited');
  }

  // Gate 2 — honeypot, same contract Formspree had: a filled _gotcha is a bot,
  // and bots get a convincing success so they don't retry. They outnumbered
  // humans on this form 97 attempts to 11.
  if (field(body, '_gotcha', 100)) {
    console.warn('contact_blocked', JSON.stringify({ reason: 'honeypot', ip: clientIp(req) }));
    return succeed(req, res);
  }

  // Gate 3 — the form token. This is the one the September 2026 spam cannot
  // satisfy: it requires a prior GET of /api/form-token, holding the value, and
  // waiting. A missing token is answered honestly rather than with a fake
  // success, because a real visitor whose token fetch failed needs to see that
  // something went wrong and find the mailto on the error page.
  const token = verifyToken(field(body, '_ft', 300));
  if (!token.ok) {
    if (token.reason === 'not_configured') {
      return refuse(req, res, 500, 'Mail service not configured.', 'not_configured');
    }
    return refuse(
      req,
      res,
      403,
      'Your message could not be verified. Please reload the page and try again.',
      token.reason,
    );
  }

  if (!name || !message || !EMAIL_RE.test(email)) {
    return refuse(req, res, 400, 'Please fill in name, a valid email, and a message.', 'invalid_fields');
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Loud on purpose: a missing key must read as an outage in monitoring,
    // never as a quietly "successful" form.
    return res.status(500).json({ error: 'Mail service not configured.' });
  }

  const payload = {
    from: process.env.CONTACT_FROM || 'hyperfocusam.com <onboarding@resend.dev>',
    to: [process.env.CONTACT_TO || 'sam@adaptig.com'],
    reply_to: [email],
    subject: `[hyperfocusam.com] ${interest || 'Contact'} — ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Interest: ${interest || '(not set)'}`,
      '',
      message,
      '',
      '—',
      'Sent by the hyperfocusam.com contact form (/api/contact via Resend).',
    ].join('\n'),
  };

  let upstream;
  try {
    upstream = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    return res.status(502).json({ error: 'Mail service unreachable. Please try again.' });
  }

  if (!upstream.ok) {
    // Resend's error body is useful in logs but must not leak to the visitor.
    const detail = await upstream.text().catch(() => '');
    console.error('resend_send_failed', upstream.status, detail.slice(0, 500));
    return res.status(502).json({ error: 'Could not send your message. Please try again.' });
  }

  // Instant acknowledgment to the lead. Best-effort by design: the lead is
  // already in Sam's inbox at this point, so an auto-reply failure must never
  // turn a captured lead into a visitor-facing error.
  const autoFrom = process.env.CONTACT_AUTOREPLY_FROM;
  if (autoFrom) {
    const zh = language === 'zh-Hant';
    const autoreply = {
      from: autoFrom,
      to: [email],
      reply_to: [process.env.CONTACT_TO || 'sam@adaptig.com'],
      subject: zh ? '收到你的訊息 — Sam Wong' : 'Got your message — Sam Wong',
      text: zh
        ? [
          `${name}，你好：`,
          '',
          '多謝你的訊息，已經收到，我會在 24 小時內回覆。',
          '',
          '如果比較急，有兩個快一點的方法：',
          '預約通話：https://hyperfocusam.com/book/',
          'WhatsApp：https://wa.me/85264315177',
          '',
          'Sam Wong',
          'hyperfocusam.com',
          '',
          '（這是自動確認信；下一封回覆會由我本人發出。）',
        ].join('\n')
        : [
          `Hi ${name},`,
          '',
          "Thanks for reaching out — your message has arrived and I'll reply within 24 hours.",
          '',
          "If it's time-sensitive, two faster doors:",
          'Book a call: https://hyperfocusam.com/book/',
          'WhatsApp: https://wa.me/85264315177',
          '',
          'Sam Wong',
          'hyperfocusam.com',
          '',
          '(This is an automatic confirmation; the reply you get next will be from me.)',
        ].join('\n'),
    };
    try {
      const ack = await fetch(RESEND_API, {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(autoreply),
      });
      if (!ack.ok) console.error('autoreply_failed', ack.status, (await ack.text().catch(() => '')).slice(0, 300));
    } catch (err) {
      console.error('autoreply_failed', String(err).slice(0, 300));
    }
  }

  return succeed(req, res);
};
