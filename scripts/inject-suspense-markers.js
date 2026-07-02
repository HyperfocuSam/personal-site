/* eslint-disable no-console */
/**
 * Post-react-snap step: wrap each prerendered page's root content in React 18
 * Suspense boundary markers (<!--$--> ... <!--/$-->).
 *
 * Why: App.js wraps all routes in <Suspense>. React 18's hydrateRoot can only
 * hydrate a Suspense boundary when the server HTML contains the dehydrated
 * boundary comment markers that real SSR (renderToString) emits. react-snap
 * snapshots a client render, which has no markers, so hydration failed on
 * every route (React #418/#423) and the whole app fell back to client
 * rendering. Injecting the markers makes the baked HTML hydrate cleanly.
 * Verified against react/react-dom 18.3 UMD in isolation (2026-07-01).
 *
 * NOTE: requires reactSnap.minifyHtml.removeComments=false (package.json) so
 * nothing downstream strips the markers.
 */
const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const OPEN_TAG = '<div id="root">';

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const full = path.join(dir, entry.name);
  if (entry.isDirectory()) return walk(full);
  return entry.name.endsWith('.html') ? [full] : [];
});

let injected = 0;
let skipped = 0;

walk(BUILD_DIR).forEach((file) => {
  const html = fs.readFileSync(file, 'utf8');
  const i = html.indexOf(OPEN_TAG);
  if (i === -1) { skipped += 1; return; }
  const contentStart = i + OPEN_TAG.length;
  const firstScript = html.indexOf('<script', contentStart);
  const contentEnd = html.lastIndexOf('</div>', firstScript === -1 ? html.length : firstScript);
  if (contentEnd <= contentStart) { skipped += 1; return; }
  const content = html.slice(contentStart, contentEnd);
  if (!content.trim() || content.startsWith('<!--$-->')) { skipped += 1; return; }
  const out = `${html.slice(0, contentStart)}<!--$-->${content}<!--/$-->${html.slice(contentEnd)}`;
  fs.writeFileSync(file, out);
  injected += 1;
});

console.log(`inject-suspense-markers: injected=${injected} skipped=${skipped}`);
if (injected === 0) {
  console.error('inject-suspense-markers: nothing injected — check build output');
  process.exit(1);
}
