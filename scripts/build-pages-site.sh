#!/usr/bin/env bash
# Stage the browser-facing static site into `_site/` and verify the artifact.
#
# Used by `.github/workflows/pages.yml`. Every requirement is reported per file, and a
# missing or empty file fails the step with a GitHub `::error file=...` annotation, so a
# broken deploy always names the exact artefact instead of an anonymous exit code 1.
#
# Usage:
#   ./scripts/build-pages-site.sh              # _site/ inside the repo root
#   SITE_DIR=/tmp/_site ./scripts/build-pages-site.sh
#   DEPLOY_SHA=abc123 ./scripts/build-pages-site.sh
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE="${SITE_DIR:-$ROOT/_site}"
DEPLOY_SHA="${DEPLOY_SHA:-$(git -C "$ROOT" rev-parse HEAD 2>/dev/null || echo unknown)}"

cd "$ROOT" || exit 1

# ---------------------------------------------------------------------------
# 1. Stage only browser-facing files. `api/` and `Dockerfile` stay out of Pages, so
#    the static asset set is identical on both hosts (relative paths only).
#    `docs/` ships with the site so `docs/ci-cd-pipeline.html` resolves on Pages.
# ---------------------------------------------------------------------------
STAGE=(index.html robots.txt sitemap.xml api-status.json assets docs)
for entry in "${STAGE[@]}"; do
  if [ ! -e "$ROOT/$entry" ]; then
    echo "::error file=$entry::$entry is missing from the repository, cannot stage it"
    exit 1
  fi
done

if [ "${SKIP_STAGE:-0}" = "1" ]; then
  # Re-verify an artifact that is already staged (local debugging / CI re-checks).
  echo "SKIP_STAGE=1: verifying the existing $SITE without re-staging"
  [ -d "$SITE" ] || { echo "::error::$SITE does not exist, cannot verify it"; exit 1; }
else
  rm -rf "$SITE"
  mkdir -p "$SITE"
  if ! cp -R "${STAGE[@]}" "$SITE/"; then
    echo "::error::staging into $SITE failed (cp -R ${STAGE[*]})"
    exit 1
  fi
  printf '%s\n' "$DEPLOY_SHA" >"$SITE/build.txt"
fi

# ---------------------------------------------------------------------------
# 2. Resolve the 3D scene URL from the adapter instead of hardcoding it: if the model
#    is ever renamed again, this script verifies the file the browser actually fetches.
# ---------------------------------------------------------------------------
MODEL="$(grep -oE "\./assets/models/[A-Za-z0-9_.-]+\.glb" assets/js/engine-adapter.js | head -1 | sed 's|^\./||')"
if [ -z "${MODEL:-}" ]; then
  echo "::error file=assets/js/engine-adapter.js::no ./assets/models/*.glb reference found in the adapter"
  exit 1
fi

fail=0

# require_file <path relative to _site> [min_bytes] [max_bytes]
require_file() {
  local rel="$1" min="${2:-1}" max="${3:-0}"
  local abs="$SITE/$rel" size=0

  if [ ! -e "$abs" ]; then
    echo "::error file=$rel::missing from _site — the staging step did not copy it"
    fail=1
    return
  fi
  if [ ! -f "$abs" ]; then
    echo "::error file=$rel::not a regular file in _site (directory or symlink)"
    fail=1
    return
  fi

  size="$(wc -c <"$abs" | tr -d ' ')"
  if [ "$size" -lt "$min" ]; then
    echo "::error file=$rel::empty or truncated in _site (${size} bytes, expected at least ${min})"
    fail=1
    return
  fi
  if [ "$max" -gt 0 ] && [ "$size" -gt "$max" ]; then
    echo "::error file=$rel::too large for a Pages artifact (${size} bytes, limit ${max})"
    fail=1
    return
  fi

  printf '  ok  %-58s %12s bytes\n' "$rel" "$size"
}

echo "Verifying Pages artifact in $SITE (commit ${DEPLOY_SHA:-unknown}, model ${MODEL})"

require_file index.html 1024
require_file build.txt 7
require_file api-status.json 2
require_file robots.txt 16
require_file sitemap.xml 64
require_file docs/ci-cd-pipeline.html 1024
require_file docs/ci-cd-pipeline.md 1024
require_file assets/css/style.css 1024
require_file assets/js/main.js 1024
require_file assets/js/api-client.js 1024
require_file assets/js/api.js 1024
require_file assets/js/engine-adapter.js 1024
require_file assets/js/i18n.js 1024
require_file assets/js/ascii-engine.bundle.js 262144
require_file assets/i18n/pt-br.json 1024
require_file assets/i18n/en.json 1024
require_file assets/cv/Eron_Yamamoto_Curriculo_BR_Pleno.pdf 10240
require_file assets/cv/Eron_Yamamoto_Resume_EN.pdf 10240
require_file assets/fonts/jetbrains-mono-latin-400-normal.woff2 10240
require_file "$MODEL" 1048576 20971520  # >= 1 MiB and <= 20 MiB (Draco + WebP pipeline)
require_file assets/draco/draco_decoder.js 10240
require_file assets/draco/draco_decoder.wasm 10240
require_file assets/draco/draco_wasm_wrapper.js 10240

# build.txt must carry the commit being deployed, otherwise Pages serves a stale stamp.
if [ -f "$SITE/build.txt" ]; then
  staged_sha="$(tr -d '[:space:]' <"$SITE/build.txt")"
  if [ "$staged_sha" != "$DEPLOY_SHA" ]; then
    echo "::error file=build.txt::deployed sha '${staged_sha}' does not match DEPLOY_SHA '${DEPLOY_SHA}'"
    fail=1
  fi
fi

# Exactly one scene model: an orphan export (e.g. a renamed duplicate) must not ship.
model_count="$(find "$SITE/assets/models" -maxdepth 1 -type f -name '*.glb' 2>/dev/null | wc -l | tr -d ' ')"
if [ "$model_count" != "1" ]; then
  echo "::error file=assets/models::expected exactly 1 .glb in _site/assets/models, found ${model_count}"
  fail=1
fi

if [ "$fail" -ne 0 ]; then
  echo "::error::Pages artifact incomplete — fix the entries listed above before deploying"
  exit 1
fi

file_count="$(find "$SITE" -type f | wc -l | tr -d ' ')"
echo "Pages artifact root OK (${file_count} files, $(du -sh "$SITE" | cut -f1), sha ${DEPLOY_SHA})"
