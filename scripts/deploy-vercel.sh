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
check build/index.html "Love for the"
routes=$(find build -type f -name index.html | wc -l | tr -d ' ')
if [ "$routes" -lt 100 ]; then
  echo "✗ only $routes prerendered routes, expected ~121 — react-snap probably hung" >&2
  fail=1
fi
[ "$fail" -eq 0 ] || { echo "REFUSING TO DEPLOY." >&2; exit 1; }
echo "✓ $routes routes prerendered"

# Vercel reads vercel.json from the deployment root, which is build/.
cp vercel.json build/vercel.json
trap 'rm -f build/vercel.json' EXIT

npx vercel deploy build --yes "$@"
