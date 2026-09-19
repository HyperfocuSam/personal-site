// Server-side bot defences shared by /api/form-token and /api/contact.
//
// Why this file exists (funnel digests 2026-09-06 and 2026-09-13): every
// contact-form mail that reached sam@adaptig.com in early September was spam,
// and PostHog recorded ZERO `contact_form_started` / `contact_form_submitted`
// for the same period. The bots POST `/api/contact` directly and never run the
// page's JavaScript, so the React honeypot in ContactForm.js never gets a
// chance to matter and the front-end instrumentation never fires. Any defence
// that lives in the React component is, by construction, invisible to them.
// The check therefore has to be here.
//
// Naming: Vercel does not turn `api/_*.js` into a route — an underscore-prefixed
// file is bundled only as a dependency of the handlers that require it. That is
// what lets contact.js and form-token.js share one implementation of the token
// without a package.json (the build ships no dependencies; see api/contact.js).
//
// Env:
//   CONTACT_FORM_SECRET  optional. HMAC key for the form token. Falls back to
//                        RESEND_API_KEY so this needs no new Vercel setting to
//                        work — set it separately if the Resend key is ever
//                        rotated independently of live form tokens.

const crypto = require('crypto');

const TOKEN_VERSION = 'v1';

// A human reads the page, types a name, an email and a few sentences. Three
// seconds is far below the fastest plausible human and far above what a script
// that mints a token and immediately posts will wait for.
const MIN_TOKEN_AGE_MS = 3000;

// Long enough that someone can leave the tab open over lunch and still submit.
const MAX_TOKEN_AGE_MS = 2 * 60 * 60 * 1000;

const secret = () => process.env.CONTACT_FORM_SECRET || process.env.RESEND_API_KEY || '';

const sign = (payload) => crypto.createHmac('sha256', secret()).update(payload).digest('base64url');

const issueToken = (now = Date.now()) => {
  const nonce = crypto.randomBytes(9).toString('base64url');
  const payload = `${TOKEN_VERSION}.${now}.${nonce}`;
  return `${payload}.${sign(payload)}`;
};

// Constant-time compare that tolerates length mismatch without throwing, which
// crypto.timingSafeEqual does on unequal buffers.
const sameSignature = (a, b) => {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
};

// Single-use enforcement, best effort. A Vercel Node function keeps its module
// scope across invocations on a warm instance, so a token replayed within
// seconds — the shape a scripted flood takes — is caught. A cold instance or a
// second concurrent instance will not see it. This is a speed bump on top of
// the signature and the age window, never the primary check. No KV, no Redis:
// the deploy ships no dependencies.
const seenNonces = new Map();
const NONCE_CACHE_MAX = 5000;

const sweep = (map, now) => {
  map.forEach((expiry, key) => {
    if (expiry <= now) map.delete(key);
  });
};

const consumeNonce = (nonce, now = Date.now()) => {
  if (seenNonces.size > NONCE_CACHE_MAX) sweep(seenNonces, now);
  if (seenNonces.size > NONCE_CACHE_MAX) seenNonces.clear();
  if (seenNonces.has(nonce) && seenNonces.get(nonce) > now) return false;
  seenNonces.set(nonce, now + MAX_TOKEN_AGE_MS);
  return true;
};

// Returns { ok: true } or { ok: false, reason }. `reason` is for logs only —
// telling a bot exactly which check it failed is free tuning feedback.
const verifyToken = (token, now = Date.now(), { singleUse = true } = {}) => {
  if (!secret()) return { ok: false, reason: 'not_configured' };
  const raw = String(token || '').trim();
  if (!raw) return { ok: false, reason: 'missing' };

  const parts = raw.split('.');
  if (parts.length !== 4) return { ok: false, reason: 'malformed' };

  const [version, ts, nonce, signature] = parts;
  if (version !== TOKEN_VERSION) return { ok: false, reason: 'bad_version' };
  if (!/^\d{10,16}$/.test(ts)) return { ok: false, reason: 'malformed' };
  if (!sameSignature(sign(`${version}.${ts}.${nonce}`), signature)) {
    return { ok: false, reason: 'bad_signature' };
  }

  const age = now - Number(ts);
  // Negative age = a token minted in the future, i.e. a forged timestamp on a
  // leaked secret or a badly skewed clock. Treat it as expired, not as fresh.
  if (age < 0) return { ok: false, reason: 'expired' };
  if (age < MIN_TOKEN_AGE_MS) return { ok: false, reason: 'too_fast' };
  if (age > MAX_TOKEN_AGE_MS) return { ok: false, reason: 'expired' };

  if (singleUse && !consumeNonce(nonce, now)) return { ok: false, reason: 'replayed' };

  return { ok: true };
};

// Vercel puts the real client address in x-real-ip and first in
// x-forwarded-for. Both are set by the platform's proxy, so a client cannot
// spoof them here, but fall back to the socket rather than trusting a header
// we did not expect.
const clientIp = (req) => {
  const real = String((req.headers && req.headers['x-real-ip']) || '').trim();
  if (real) return real;
  const forwarded = String((req.headers && req.headers['x-forwarded-for']) || '');
  const first = forwarded.split(',')[0].trim();
  if (first) return first;
  return (req.socket && req.socket.remoteAddress) || 'unknown';
};

// Fixed-window counter, same warm-instance caveat as the nonce cache above.
// It cannot stop a distributed flood; it stops one script hammering one route.
const buckets = new Map();
const BUCKET_MAX = 5000;

const rateLimit = (key, { windowMs, max }, now = Date.now()) => {
  if (buckets.size > BUCKET_MAX) sweep(buckets, now);
  if (buckets.size > BUCKET_MAX) buckets.clear();
  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: max - 1, retryAfter: 0 };
  }
  existing.count += 1;
  if (existing.count > max) {
    return { ok: false, remaining: 0, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
  }
  return { ok: true, remaining: max - existing.count, retryAfter: 0 };
};

// Exported so tests can reset between cases; production never calls it.
const resetGuardState = () => {
  buckets.clear();
  seenNonces.clear();
};

module.exports = {
  TOKEN_VERSION,
  MIN_TOKEN_AGE_MS,
  MAX_TOKEN_AGE_MS,
  issueToken,
  verifyToken,
  clientIp,
  rateLimit,
  resetGuardState,
};
