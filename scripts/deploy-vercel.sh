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

# The guard that would have caught the 2026-08-06 → 08-15 fork.
# Two lanes write to this repo: Cursor agents merge PRs into origin/main, and
# this machine builds and deploys. Deploying is a LOCAL step, so a merged PR
# reaches the live site only if someone pulled it first. Nobody did for nine
# days — 22 commits sat on origin/main, including two finished blog posts that
# 404'd on the live site while their PRs showed green.
# Deploying behind origin is how content silently never ships; deploying ahead
# of it puts something live that no branch on GitHub can reproduce.
# Override with ALLOW_UNSYNCED=1 for a deliberate hotfix.
if [ "${ALLOW_UNSYNCED:-0}" != "1" ] && git rev-parse --git-dir >/dev/null 2>&1; then
  git fetch origin --quiet || echo "  (warning: could not reach origin — sync unverified)" >&2
  behind=$(git rev-list --count HEAD..origin/main 2>/dev/null || echo 0)
  ahead=$(git rev-list --count origin/main..HEAD 2>/dev/null || echo 0)
  if [ "$behind" -gt 0 ]; then
    echo "✗ $behind commit(s) on origin/main are NOT in this build." >&2
    echo "  Merged PRs would not reach the live site. Run: git pull --no-rebase" >&2
    echo "  git log --oneline HEAD..origin/main" >&2
    exit 1
  fi
  if [ "$ahead" -gt 0 ]; then
    echo "✗ $ahead local commit(s) are not on origin/main." >&2
    echo "  Push first so the live site matches a branch someone else can rebuild:" >&2
    echo "    git push origin main" >&2
    exit 1
  fi
  echo "✓ in sync with origin/main"
fi

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

# --scope is not optional, even though the project link above already names the
# org. Without it `vercel deploy --prod` returns {"status":"error","reason":
# "deploy_failed","message":"Not authorized"} while `vercel whoami`, the project
# GET and the deployments list all succeed with the same token — so it reads as
# an auth outage rather than a missing flag. Hit for real on 2026-08-15.
# The slug is the personal scope the login can actually see; `vercel teams ls`
# prints it. The team_ id in project.json is the project's accountId and stays.
npx vercel deploy build --yes --scope hyperfocusams-projects-dabaf648 "$@"
