#!/usr/bin/env bash
# Merge an open PR into main only after every required check is SUCCESS for its
# exact head SHA. No PR approval is attempted: GitHub rejects self-approval,
# and this repository does not require reviews to merge.
set -euo pipefail

REPO="${REPO:-${GITHUB_REPOSITORY:-yamamotin/AncientStudio}}"
HEAD_SHA="${HEAD_SHA:-}"
PR_NUMBER="${PR_NUMBER:-}"
REQUIRED_CHECKS="${REQUIRED_CHECKS:-verify,test,Ruff + pytest,Docker build}"
WAIT_SECONDS="${WAIT_SECONDS:-900}"
DRY_RUN="${DRY_RUN:-0}"

export GH_REPO="$REPO"
export GH_PROMPT_DISABLED=1

if [ -z "${GH_TOKEN:-}" ] && [ -z "${GITHUB_TOKEN:-}" ]; then
  echo "GH_TOKEN (or GITHUB_TOKEN) is required." >&2
  exit 2
fi
export GH_TOKEN="${GH_TOKEN:-$GITHUB_TOKEN}"

log() { printf '%s\n' "$*"; }

if [ -z "$PR_NUMBER" ]; then
  if [ -z "$HEAD_SHA" ]; then
    echo "HEAD_SHA or PR_NUMBER is required." >&2
    exit 2
  fi
  PR_NUMBER=$(gh api "repos/$REPO/commits/$HEAD_SHA/pulls?per_page=100" \
    --jq '[.[] | select(.state == "open" and .base.ref == "main") | .number][0] // empty')
fi

if [ -z "$PR_NUMBER" ]; then
  log "No open PR against main for ${HEAD_SHA:-PR $PR_NUMBER}; nothing to merge."
  exit 0
fi

state=$(gh api "repos/$REPO/pulls/$PR_NUMBER" --jq '.state')
base=$(gh api "repos/$REPO/pulls/$PR_NUMBER" --jq '.base.ref')
draft=$(gh api "repos/$REPO/pulls/$PR_NUMBER" --jq '.draft')
head_sha=$(gh api "repos/$REPO/pulls/$PR_NUMBER" --jq '.head.sha')
head_repo=$(gh api "repos/$REPO/pulls/$PR_NUMBER" --jq '.head.repo.full_name // ""')

if [ "$state" != "open" ] || [ "$base" != "main" ] || [ "$draft" != "false" ]; then
  log "Skipping #$PR_NUMBER: state=$state base=$base draft=$draft."
  exit 0
fi

if [ -n "$head_repo" ] && [ "$head_repo" != "$REPO" ]; then
  log "Skipping #$PR_NUMBER: fork PRs are not auto-merged ($head_repo)."
  exit 0
fi

if [ -n "$HEAD_SHA" ] && [ "$head_sha" != "$HEAD_SHA" ]; then
  log "Skipping #$PR_NUMBER: head moved from $HEAD_SHA to $head_sha."
  exit 0
fi

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

deadline=$((SECONDS + WAIT_SECONDS))
while :; do
  gh api "repos/$REPO/commits/$head_sha/check-runs?per_page=100" > "$tmp/checks.json"

  report=$(python3 - "$tmp/checks.json" "$REQUIRED_CHECKS" <<'PY'
import json
import sys

path, required_arg = sys.argv[1], sys.argv[2]
required = [name.strip() for name in required_arg.split(",") if name.strip()]
with open(path, encoding="utf-8") as handle:
    data = json.load(handle)

latest = {}
for run in data.get("check_runs", []):
    name = run.get("name")
    if not name:
        continue
    stamp = run.get("completed_at") or run.get("started_at") or ""
    if name not in latest or stamp > latest[name][0]:
        latest[name] = (stamp, run)

bad = {"FAILURE", "CANCELLED", "TIMED_OUT", "ACTION_REQUIRED", "STARTUP_FAILURE", "SKIPPED", "NEUTRAL"}
failed, pending = [], []
for name in required:
    run = latest.get(name, ("", {}))[1]
    conclusion = str(run.get("conclusion") or "PENDING").upper()
    print(f"{name}\t{conclusion}")
    if conclusion in bad:
        failed.append(name)
    elif conclusion != "SUCCESS":
        pending.append(name)

if failed:
    print("SUMMARY\tFAIL")
elif pending:
    print("SUMMARY\tWAIT")
else:
    print("SUMMARY\tREADY")
PY
)
  printf '%s\n' "$report"

  summary=$(printf '%s\n' "$report" | sed -n 's/^SUMMARY\t//p')
  case "$summary" in
    READY) break ;;
    FAIL)
      echo "::error::Required checks failed for #$PR_NUMBER ($head_sha). Not merging." >&2
      exit 1
      ;;
    *)
      if (( SECONDS >= deadline )); then
        echo "::error::Timed out waiting for required checks on #$PR_NUMBER ($head_sha)." >&2
        exit 1
      fi
      sleep 20
      ;;
  esac
done

for _ in 1 2 3 4 5; do
  IFS=$'\t' read -r mergeable merge_state pr_head <<<"$(gh pr view "$PR_NUMBER" \
    --json mergeable,mergeStateStatus,headRefOid \
    --jq '[.mergeable, .mergeStateStatus, .headRefOid] | @tsv')"

  if [ "$mergeable" = "MERGEABLE" ] && [ "$merge_state" = "CLEAN" ]; then
    break
  fi
  log "PR #$PR_NUMBER not ready yet: mergeable=$mergeable state=$merge_state."
  sleep 10
done

if [ "$mergeable" != "MERGEABLE" ] || [ "$merge_state" != "CLEAN" ]; then
  log "PR #$PR_NUMBER still has merge blockers ($mergeable/$merge_state); leaving it open."
  exit 0
fi

if [ "$pr_head" != "$head_sha" ]; then
  log "PR #$PR_NUMBER changed while checks were running ($pr_head). Not merging a stale SHA."
  exit 0
fi

if [ "$DRY_RUN" = "1" ]; then
  log "DRY_RUN: would merge #$PR_NUMBER ($head_sha) with 'gh pr merge --merge'."
  exit 0
fi

gh pr merge "$PR_NUMBER" --merge
log "Merged #$PR_NUMBER ($head_sha) into main."
