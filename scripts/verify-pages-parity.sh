#!/usr/bin/env bash
# Compare the SHA served by GitHub Pages with the SHA served by Vercel and main.
set -euo pipefail

PAGES_URL="${PAGES_URL:-https://yamamotin.github.io/AncientStudio}"
VERCEL_URL="${VERCEL_URL:-https://ancientstudio.vercel.app}"

pages_sha=$(curl -fsSL "$PAGES_URL/build.txt" | tr -d '[:space:]')
vercel_sha=$(curl -fsSL "$VERCEL_URL/api/v1/build" \
  | python3 -c 'import json,sys; print(json.load(sys.stdin).get("sha", ""))')

printf 'pages=%s\nvercel=%s\n' "$pages_sha" "$vercel_sha"

if [ -z "$pages_sha" ] || [ -z "$vercel_sha" ]; then
  echo 'PARITY UNKNOWN: one of the hosts did not return a SHA.' >&2
  exit 2
fi

if [ "$pages_sha" != "$vercel_sha" ]; then
  echo "PARITY FAILED: pages=$pages_sha vercel=$vercel_sha" >&2
  exit 1
fi

echo 'PARITY OK'

if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  main_sha=$(git rev-parse origin/main 2>/dev/null || git rev-parse main)
  printf 'main=%s\n' "$main_sha"
  [ "$pages_sha" = "$main_sha" ] && echo 'PAGES MATCHES MAIN' || echo 'PAGES DIFFERS FROM LOCAL MAIN'
fi
