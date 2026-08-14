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
//                   are live in Resend, and only then add a lead auto-reply.

const RESEND_API = 'https://api.resend.com/emails';

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

  // Honeypot, same contract Formspree had: a filled _gotcha is a bot, and bots
  // get a convincing success so they don't retry. They outnumbered humans on
  // this form 97 attempts to 11.
  if (field(body, '_gotcha', 100)) return succeed(req, res);

  if (!name || !message || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please fill in name, a valid email, and a message.' });
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

  return succeed(req, res);
};
