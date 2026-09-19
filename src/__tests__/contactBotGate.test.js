/**
 * @jest-environment jsdom
 *
 * jsdom, not node: setupFilesAfterEach loads src/setupTests.js for every suite
 * and it touches `window` at module scope. The handlers under test only use
 * node builtins, so the environment is incidental here.
 *
 * What this guards: the 2026-09-06 and 2026-09-13 funnel digests found that
 * every contact mail reaching sam@adaptig.com was spam while PostHog recorded
 * zero form events — the bots POST /api/contact directly and never run the
 * React form. These cases are written against the handler, the same way those
 * bots reach it, so a regression that "only" breaks the server-side gate still
 * fails here.
 */

const guard = require('../../api/_form-guard');
const contact = require('../../api/contact');
const formToken = require('../../api/form-token');

const mockRes = () => {
  const res = {
    statusCode: 0, body: null, headers: {}, ended: false,
  };
  res.setHeader = (k, v) => { res.headers[k.toLowerCase()] = v; };
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (payload) => { res.body = payload; res.ended = true; return res; };
  res.send = (payload) => { res.body = payload; res.ended = true; return res; };
  return res;
};

const jsonReq = (body, headers = {}) => ({
  method: 'POST',
  headers: { 'content-type': 'application/json', accept: 'application/json', ...headers },
  body,
  socket: { remoteAddress: '203.0.113.9' },
});

// A token minted `ageMs` ago, so a test does not have to sleep three seconds.
const agedToken = (ageMs) => guard.issueToken(Date.now() - ageMs);

const humanBody = (token) => ({
  name: 'Alex Chan',
  email: 'alex@example.com',
  interest: 'Corporate Training',
  message: 'We have 40 managers and want a half-day AI workshop in November.',
  language: 'en',
  _ft: token,
});

beforeEach(() => {
  guard.resetGuardState();
  process.env.CONTACT_FORM_SECRET = 'test-secret-for-the-form-token';
  // Absent on purpose in most cases: the mail send is not what is under test,
  // and a real Resend call must never happen from the suite.
  delete process.env.RESEND_API_KEY;
});

describe('form token', () => {
  it('mints a token over GET and refuses other methods', async () => {
    const res = mockRes();
    await formToken({ method: 'GET', headers: {}, socket: {} }, res);
    expect(res.statusCode).toBe(200);
    expect(typeof res.body.token).toBe('string');
    expect(res.body.token.split('.')).toHaveLength(4);
    expect(res.headers['cache-control']).toMatch(/no-store/);

    const bad = mockRes();
    await formToken({ method: 'POST', headers: {}, socket: {} }, bad);
    expect(bad.statusCode).toBe(405);
  });

  it('accepts a token of plausible human age', () => {
    expect(guard.verifyToken(agedToken(10000))).toEqual({ ok: true });
  });

  it('rejects a missing, forged, too-fast, expired or replayed token', () => {
    expect(guard.verifyToken('').reason).toBe('missing');
    expect(guard.verifyToken('v1.1757000000000.abc.notasignature').reason).toBe('bad_signature');

    const tampered = agedToken(10000).split('.');
    tampered[1] = String(Date.now());
    expect(guard.verifyToken(tampered.join('.')).reason).toBe('bad_signature');

    expect(guard.verifyToken(agedToken(500)).reason).toBe('too_fast');
    expect(guard.verifyToken(agedToken(3 * 60 * 60 * 1000)).reason).toBe('expired');
    expect(guard.verifyToken(guard.issueToken(Date.now() + 60000)).reason).toBe('expired');

    const once = agedToken(10000);
    expect(guard.verifyToken(once).ok).toBe(true);
    expect(guard.verifyToken(once).reason).toBe('replayed');
  });
});

describe('POST /api/contact', () => {
  it('refuses a bot-style POST that carries no token', async () => {
    const res = mockRes();
    await contact(jsonReq(humanBody(undefined)), res);
    expect(res.statusCode).toBe(403);
    expect(res.body.error).toMatch(/could not be verified/i);
    // The rejection reason must not travel back to the sender — naming the
    // failed check is free tuning feedback for whoever is probing.
    expect(JSON.stringify(res.body)).not.toMatch(/missing|signature|too_fast/);
  });

  it('refuses a token minted and used in the same instant', async () => {
    const res = mockRes();
    await contact(jsonReq(humanBody(guard.issueToken())), res);
    expect(res.statusCode).toBe(403);
  });

  it('lets a human-paced submission through to the mail send', async () => {
    process.env.RESEND_API_KEY = 're_test_key';
    const calls = [];
    global.fetch = async (url, init) => {
      calls.push({ url, body: JSON.parse(init.body) });
      return { ok: true, status: 200, text: async () => '' };
    };

    const res = mockRes();
    await contact(jsonReq(humanBody(agedToken(9000))), res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe('https://api.resend.com/emails');
    expect(calls[0].body.to).toEqual(['sam@adaptig.com']);
    expect(calls[0].body.text).toContain('40 managers');
    delete global.fetch;
  });

  it('still swallows a filled honeypot with a fake success and no mail', async () => {
    const calls = [];
    global.fetch = async () => { calls.push(1); return { ok: true, text: async () => '' }; };
    const res = mockRes();
    await contact(jsonReq({ ...humanBody(agedToken(9000)), _gotcha: 'http://spam.example' }), res);
    expect(res.statusCode).toBe(200);
    expect(calls).toHaveLength(0);
    delete global.fetch;
  });

  it('rate-limits one address after five attempts', async () => {
    const attempt = async () => {
      const res = mockRes();
      await contact(jsonReq(humanBody(agedToken(9000)), { 'x-real-ip': '198.51.100.7' }), res);
      return res;
    };
    const codes = [];
    for (let i = 0; i < 6; i += 1) {
      // Sequential on purpose: the limiter counts attempts in order.
      // eslint-disable-next-line no-await-in-loop
      codes.push((await attempt()).statusCode);
    }
    expect(codes[5]).toBe(429);
    expect(codes.filter((c) => c === 429)).toHaveLength(1);
  });

  it('answers the native no-JS POST with HTML, not JSON', async () => {
    const res = mockRes();
    await contact({
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded', accept: 'text/html' },
      body: 'name=Bot&email=bot%40example.com&message=hello',
      socket: { remoteAddress: '203.0.113.11' },
    }, res);
    expect(res.statusCode).toBe(403);
    expect(res.headers['content-type']).toMatch(/text\/html/);
    expect(res.body).toContain('mailto:sam@adaptig.com');
  });
});
