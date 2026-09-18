// GET /api/form-token — mints the short-lived, HMAC-signed token that
// /api/contact requires on every submission.
//
// The point is not secrecy: anyone can call this endpoint. The point is that a
// submission now has to be preceded by a separate request, at least
// MIN_TOKEN_AGE_MS earlier, from a client that kept the value. A bot that
// blind-POSTs /api/contact with a scraped field list — which is every spam
// submission in the 2026-09-06 and 2026-09-13 funnel digests — sends no token
// and is refused before Resend is ever called.
//
// Same-origin by design, like /api/contact: `connect-src 'self'` in the
// vercel.json CSP already covers it, so there is no new origin to add to the
// policy and no third-party entry for a future edit to forget. That omission
// is what silently ate 88 days of submissions in 2026.

const {
  issueToken, clientIp, rateLimit, MIN_TOKEN_AGE_MS, MAX_TOKEN_AGE_MS,
} = require('./_form-guard');

// Deliberately looser than the submit limit: one person can legitimately open
// the contact page, the /zh/ one and /get-started in a short span, and a
// reloaded tab mints a fresh token each time.
const TOKEN_RATE = { windowMs: 10 * 60 * 1000, max: 30 };

module.exports = async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // A cached token would be a shared token, and an old cached one would be an
  // expired token that fails every submit on the page it was baked into.
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const limit = rateLimit(`token:${clientIp(req)}`, TOKEN_RATE);
  if (!limit.ok) {
    res.setHeader('Retry-After', String(limit.retryAfter));
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
  }

  return res.status(200).json({
    token: issueToken(),
    // Published so the client can wait out the minimum age instead of getting
    // a 403 it would have to guess the cause of. Knowing the window does not
    // help a bot: waiting three seconds per submission is the cost itself.
    minAgeMs: MIN_TOKEN_AGE_MS,
    maxAgeMs: MAX_TOKEN_AGE_MS,
  });
};
