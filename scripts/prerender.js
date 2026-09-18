#!/usr/bin/env node
/**
 * Prerender wrapper around react-snap.
 *
 * Why this file exists (2026-09-18)
 * ---------------------------------
 * react-snap pins puppeteer ^1.8.0, which resolves to 1.20.0 and ships a 2019
 * Chromium (78.0.3882.0, revision 686378). On macOS 26 that binary segfaults
 * mid-crawl — two SIGSEGV crash reports on 2026-09-17 at 21:30 and 21:32, each
 * ~14s after launch, `EXC_BAD_ACCESS ... at 0x0` with `parentProc: node`.
 *
 * react-snap has no recovery path for a dead browser: the highland crawl stream
 * never settles, so `react-snap` hangs forever while still LISTENING on port
 * 45678 (one such process was found alive after 14h20m). Every later run then
 * dies with `EADDRINUSE :::45678`, and because react-snap creates `200.html`
 * before it binds the port, the aborted run leaves a 0-byte `build/200.html`
 * behind, which makes the run after THAT refuse outright with "200.html is
 * present in the sourceDir ... You can not run react-snap twice". One flaky
 * Chromium segfault therefore poisons the build directory permanently, and the
 * symptom you see is never the symptom you have.
 *
 * Three fixes, all here so `package.json` stays declarative:
 *   1. Drive a MODERN Chrome instead of the 2019 one (puppeteer 1.20's CDP use
 *      — navigation, request interception, evaluate — still works against it).
 *   2. Bind an EPHEMERAL free port, so a stale listener can never block a run.
 *   3. Watchdog: if the crawl stalls, exit non-zero instead of hanging, and
 *      clean up the partial 200.html so the next run starts from a sane state.
 *
 * Config still lives in the `reactSnap` key of package.json. Two settings there
 * are load-bearing and JSON cannot hold a comment, so they are explained here:
 *
 *   "concurrency": 1
 *     Modern Chrome runs headless as REAL tabs, and a background tab's
 *     requestAnimationFrame is frozen. react-helmet-async commits head tags
 *     inside a rAF (`defer` defaults to true), so at concurrency 4 the three
 *     background tabs never commit: the page keeps its body, its title and its
 *     canonical, and SILENTLY loses the page-specific JSON-LD block. Measured
 *     on this build: 25-31 of 133 pages lost their FAQPage / BlogPosting /
 *     Course / CollectionPage schema, a different set every run. Concurrency 1
 *     keeps the single open tab in the foreground and reproduces the old
 *     Chromium 78 output exactly. Concurrency 2 already loses pages. A longer
 *     `waitFor` does NOT help — a frozen rAF never fires, however long you wait.
 *
 *   "puppeteerArgs": the three backgrounding / timer-throttling --disable flags
 *     reduce, but do not remove, the same class of problem. Keep them; they are
 *     not sufficient on their own.
 *
 * Overrides: PRERENDER_CHROME=<path>, PRERENDER_TIMEOUT_MS=<ms>.
 */
const fs = require("fs");
const net = require("net");
const os = require("os");
const path = require("path");
const url = require("url");

const projectRoot = path.resolve(__dirname, "..");
const pkg = require(path.join(projectRoot, "package.json"));
const { run } = require("react-snap");

/* ------------------------------------------------------------------ chrome */

// Ordered best-first. "Chrome for Testing" is the automation build: no auto
// update under our feet, no profile, no first-run UI. Sam's daily Chrome is the
// fallback because it is the one binary certain to exist on this machine.
const chromeCandidates = () => {
  const out = [];
  if (process.env.PRERENDER_CHROME) out.push(process.env.PRERENDER_CHROME);

  const pwCache = path.join(os.homedir(), "Library/Caches/ms-playwright");
  if (fs.existsSync(pwCache)) {
    fs.readdirSync(pwCache)
      .filter(d => /^chromium-\d+$/.test(d))
      .sort((a, b) => parseInt(b.slice(9), 10) - parseInt(a.slice(9), 10))
      .forEach(d => {
        ["chrome-mac-arm64", "chrome-mac"].forEach(macDir => {
          out.push(
            path.join(
              pwCache, d, macDir,
              "Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
            ),
            path.join(
              pwCache, d, macDir,
              "Chromium.app/Contents/MacOS/Chromium"
            )
          );
        });
      });
  }

  out.push(
    "/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium"
  );
  return out;
};

const resolveChrome = () => {
  const found = chromeCandidates().find(p => p && fs.existsSync(p));
  if (!found) {
    // Falling back to puppeteer's bundled 2019 Chromium is the exact condition
    // that produced the 14-hour hang, so say so loudly rather than silently.
    console.warn(
      "⚠️  No modern Chrome found — falling back to puppeteer's bundled " +
      "Chromium 78 (2019), which segfaults intermittently on macOS 26. " +
      "Install one, or set PRERENDER_CHROME=/path/to/chrome."
    );
    return undefined;
  }
  return found;
};

/* -------------------------------------------------------------------- port */

const freePort = () =>
  new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.unref();
    srv.on("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });

/* ------------------------------------------------------------------- state */

const sourceDir = path.join(projectRoot, pkg.reactSnap.source || "build");
const stampFile = path.join(sourceDir, "200.html");

// react-snap refuses to run when 200.html exists, to stop a double run from
// prerendering already-prerendered HTML. A ZERO-byte 200.html is not that: it
// is the fingerprint of a run that died between creating the file and binding
// the port. Clear only that case; a real double run leaves a full-size file.
const clearAbortedRunMarker = () => {
  if (fs.existsSync(stampFile) && fs.statSync(stampFile).size === 0) {
    console.log("↻  clearing 0-byte build/200.html left by an aborted run");
    fs.unlinkSync(stampFile);
  }
};

/* --------------------------------------------------------------------- run */

(async () => {
  clearAbortedRunMarker();

  const executablePath = resolveChrome();
  const port = await freePort();
  const publicUrl = process.env.PUBLIC_URL || pkg.homepage;
  const timeoutMs = parseInt(process.env.PRERENDER_TIMEOUT_MS || "900000", 10);

  if (executablePath) console.log(`🌐  chrome: ${executablePath}`);
  console.log(`🔌  server port: ${port}`);

  const watchdog = setTimeout(() => {
    console.error(
      `\n✗ prerender stalled — no completion after ${Math.round(timeoutMs / 1000)}s.\n` +
      "  The browser most likely died mid-crawl. Nothing was deployed.\n" +
      "  Re-run; if it repeats, check ~/Library/Logs/DiagnosticReports for a\n" +
      "  Chrome/Chromium crash report at that timestamp."
    );
    try { clearAbortedRunMarker(); } catch (e) { /* best effort */ }
    process.exit(1);
  }, timeoutMs);

  try {
    await run({
      publicPath: publicUrl ? url.parse(publicUrl).pathname : "/",
      // react-snap's own run.js derives this from the react-scripts major and
      // passes `undefined` for anything past CRA 2 — which, because `defaults()`
      // spreads userOptions over defaultOptions, deliberately OVERRIDES the
      // "CRA1" default. Omitting the key would silently re-enable the CRA1
      // chunk rewrite and change the emitted HTML, so pass it explicitly.
      fixWebpackChunksIssue: undefined,
      ...pkg.reactSnap,
      port,
      puppeteerExecutablePath: executablePath
    });
  } catch (error) {
    clearTimeout(watchdog);
    console.error(error);
    try { clearAbortedRunMarker(); } catch (e) { /* best effort */ }
    process.exit(1);
  }
  clearTimeout(watchdog);
  // react-snap never closes the express server it started, so the process can
  // sit idle with the event loop alive after a SUCCESSFUL crawl (observed:
  // 16+ minutes). Every file react-snap writes is written synchronously, so
  // exiting here is safe — and it is what stops a finished run from looking
  // like a hung one.
  console.log("✓  prerender complete");
  process.exit(0);
})();
