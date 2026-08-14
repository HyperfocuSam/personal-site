#!/usr/bin/env bash
#
# Deploy the LOCALLY PRERENDERED build/ to Vercel.
#
# Why not let Vercel build it: react-snap pins puppeteer ^1.8.0 (resolves to
# 1.20.0 — a 2019 Chromium) and the entire SEO/GEO value of this site is the
# static HTML it produces. `npm run build` alone does NOT prerender; only
# `npm run predeploy` does. If Chromium fails to launch in a build container,
# the build still "succeeds" and ships an empty SPA shell to every crawler —
# a silent, total loss that looks green in CI. So we upload the same artifact
# we verify locally, exactly as `npm run deploy` does for GitHub Pages.
#
#   ./scripts/deploy-vercel.sh            → preview deployment
#   ./scripts/deploy-vercel.sh --prod     → production
#
set -euo pipefail
cd "$(dirname "$0")/.."

if [ ! -f build/index.html ]; then
  echo "✗ no build/ — run: npm run predeploy" >&2
  exit 1
fi

# The guard that makes shipping an un-prerendered build structurally impossible.
# These strings only exist in HTML that React actually rendered; an SPA shell
# has an empty <div id="root">.
fail=0
check() {
  if ! grep -q "$2" "$1" 2>/dev/null; then
    echo "✗ $1 is not prerendered (missing: $2)" >&2
    fail=1
  fi
}
check build/about/index.html "Quick Version"
check build/services/index.html "For Organizations"
# Sentinel = the current hero H1 (redesign 2026-08-14). Update it whenever
# the headline changes, or this guard refuses a perfectly good build.
check build/index.html "I train the people who train AI"
routes=$(find build -type f -name index.html | wc -l | tr -d ' ')
if [ "$routes" -lt 100 ]; then
  echo "✗ only $routes prerendered routes, expected ~121 — react-snap probably hung" >&2
  fail=1
fi
[ "$fail" -eq 0 ] || { echo "REFUSING TO DEPLOY." >&2; exit 1; }
echo "✓ $routes routes prerendered"

# Vercel reads BOTH vercel.json and the project link from the deployment root,
# which is build/ — and `npm run build` rimrafs build/ every time. Without the
# link written here the CLI sees an unlinked directory and silently creates a
# BRAND NEW project named after the folder ("build"), deploying there instead.
# That happened on 2026-08-12: the domain stayed pinned to an older deployment
# on the real project while three --prod deploys landed on the decoy, so the
# live site served pre-consolidation content with none of the redirects.
cp vercel.json build/vercel.json
# Serverless functions live in api/ at the repo root, but Vercel only sees the
# deployment root (build/), so they must travel with the artifact. The contact
# form posts to /api/contact — shipping a build without it is the 88-day dead
# form all over again, hence the hard check.
cp -R api build/api
[ -f build/api/contact.js ] || { echo "✗ build/api/contact.js missing after copy" >&2; exit 1; }
mkdir -p build/.vercel
cat > build/.vercel/project.json <<'JSON'
{"projectId":"prj_LqDvQEsJZ5TbghrByKKat7dGyNpv","orgId":"team_HfeGEAmmbft7JYl4UZ4ILErY","projectName":"hyperfocusam"}
JSON
trap 'rm -rf build/vercel.json build/.vercel build/api' EXIT

npx vercel deploy build --yes "$@"
