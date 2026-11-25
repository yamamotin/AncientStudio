#!/usr/bin/env bash
# Full agent pipeline for a green PR:
#   checks -> conflict resolution -> merge -> delete branch -> dispatch deploys.
# No PR approval is attempted: GitHub rejects self-approval, and this repository
# does not require reviews to merge.
set -euo pipefail

REPO="${REPO:-${GITHUB_REPOSITORY:-yamamotin/AncientStudio}}"
REQUESTED_HEAD="${HEAD_SHA:-}"
PR_NUMBER="${PR_NUMBER:-}"
REQUIRED_CHECKS="${REQUIRED_CHECKS:-verify,test,Ruff + pytest,Docker build}"
WAIT_SECONDS="${WAIT_SECONDS:-900}"
DRY_RUN="${DRY_RUN:-0}"
MAX_RESOLVE_ATTEMPTS="${MAX_RESOLVE_ATTEMPTS:-3}"
MAX_READY_ATTEMPTS="${MAX_READY_ATTEMPTS:-20}"
PROTECTED_BRANCHES="${PROTECTED_BRANCHES:-main,dev/portfolio,dev/engine}"
DEPLOY_WORKFLOWS="${DEPLOY_WORKFLOWS:-pages.yml,ci-cd.yml}"

export GH_REPO="$REPO"
export GH_PROMPT_DISABLED=1

if [ -z "${GH_TOKEN:-}" ] && [ -z "${GITHUB_TOKEN:-}" ]; then
  echo "GH_TOKEN (or GITHUB_TOKEN) is required." >&2
  exit 2
fi
export GH_TOKEN="${GH_TOKEN:-$GITHUB_TOKEN}"

log() { printf '%s\n' "$*"; }
pr_field() { gh api "repos/$REPO/pulls/$PR_NUMBER" --jq "$1"; }
main_sha() { gh api "repos/$REPO/git/ref/heads/main" --jq '.object.sha'; }

is_protected() {
  local branch="$1"
  case ",$PROTECTED_BRANCHES," in
    *",$branch,"*) return 0 ;;
    *) return 1 ;;
  esac
}

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

if [ -z "$PR_NUMBER" ]; then
  if [ -z "$REQUESTED_HEAD" ]; then
    echo "HEAD_SHA or PR_NUMBER is required." >&2
    exit 2
  fi
  PR_NUMBER=$(gh api "repos/$REPO/commits/$REQUESTED_HEAD/pulls?per_page=100" \
    --jq '[.[] | select(.state == "open" and .base.ref == "main") | .number][0] // empty')
fi

if [ -z "$PR_NUMBER" ]; then
  log "No open PR against main for ${REQUESTED_HEAD:-PR $PR_NUMBER}; nothing to do."
  exit 0
fi

state=$(pr_field '.state')
base=$(pr_field '.base.ref')
draft=$(pr_field '.draft')
head_repo=$(pr_field '.head.repo.full_name // ""')

if [ "$state" != "open" ] || [ "$base" != "main" ] || [ "$draft" != "false" ]; then
  log "Skipping #$PR_NUMBER: state=$state base=$base draft=$draft."
  exit 0
fi

if [ -n "$head_repo" ] && [ "$head_repo" != "$REPO" ]; then
  log "Skipping #$PR_NUMBER: fork PRs are not auto-merged ($head_repo)."
  exit 0
fi

# ---------------------------------------------------------------------------
# 1) Wait for every required check on the exact head SHA.
# ---------------------------------------------------------------------------
wait_for_checks() {
  local sha="$1"
  local deadline=$((SECONDS + WAIT_SECONDS))
  local report summary

  while :; do
    gh api "repos/$REPO/commits/$sha/check-runs?per_page=100" > "$tmp/checks.json"

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
      READY)
        CHECK_RESULT=READY
        return 0
        ;;
      FAIL)
        CHECK_RESULT=FAIL
        return 1
        ;;
      *)
        if (( SECONDS >= deadline )); then
          CHECK_RESULT=TIMEOUT
          return 1
        fi
        sleep 20
        ;;
    esac
  done
}

# ---------------------------------------------------------------------------
# 2) Resolve a conflicting PR by merging main into the PR branch via the
#    official "update branch" API (no local rewrite of user changes).
# ---------------------------------------------------------------------------
resolve_branch() {
  local expected="$1"
  if [ "$DRY_RUN" = "1" ]; then
    log "DRY_RUN: would update PR #$PR_NUMBER branch from main (expected=$expected)."
    return 0
  fi
  if ! gh api -X PUT "repos/$REPO/pulls/$PR_NUMBER/update-branch" \
      -F expected_head_sha="$expected" >/dev/null; then
    echo "::error::Could not auto-resolve #$PR_NUMBER from main (real conflict or stale SHA)." >&2
    return 1
  fi
  log "Updated #$PR_NUMBER from main; re-running required checks on the new head."
}

resolve_attempts=0
ready_attempts=0
while :; do
  if [ "$(pr_field '.state')" = "MERGED" ]; then
    log "PR #$PR_NUMBER is already merged; another helper run owns cleanup/deploy."
    exit 0
  fi

  head_sha=$(pr_field '.head.sha')
  head_ref=$(pr_field '.head.ref')

  if [ -n "$REQUESTED_HEAD" ] && [ "$head_sha" != "$REQUESTED_HEAD" ] && [ "$resolve_attempts" -eq 0 ]; then
    log "Skipping #$PR_NUMBER: head moved from $REQUESTED_HEAD to $head_sha before resolution."
    exit 0
  fi

  if ! wait_for_checks "$head_sha"; then
    if [ "$CHECK_RESULT" = "FAIL" ]; then
      echo "::error::Required checks failed for #$PR_NUMBER ($head_sha). Not merging." >&2
    else
      echo "::error::Timed out waiting for required checks on #$PR_NUMBER ($head_sha)." >&2
    fi
    exit 1
  fi

  IFS=$'\t' read -r mergeable merge_state pr_head <<<"$(gh pr view "$PR_NUMBER" \
    --json mergeable,mergeStateStatus,headRefOid \
    --jq '[.mergeable, .mergeStateStatus, .headRefOid] | @tsv')"

  if [ "$mergeable" = "MERGEABLE" ] && [ "$merge_state" = "CLEAN" ]; then
    if [ "$pr_head" != "$head_sha" ]; then
      log "PR #$PR_NUMBER changed while checks were running ($pr_head). Re-evaluating."
      REQUESTED_HEAD=""
      continue
    fi
    break
  fi

  if { [ "$mergeable" = "CONFLICTING" ] || [ "$merge_state" = "DIRTY" ]; } \
      && [ "$resolve_attempts" -lt "$MAX_RESOLVE_ATTEMPTS" ]; then
    resolve_branch "$pr_head"
    resolve_attempts=$((resolve_attempts + 1))
    REQUESTED_HEAD=""
    sleep 10
    continue
  fi

  ready_attempts=$((ready_attempts + 1))
  if [ "$ready_attempts" -ge "$MAX_READY_ATTEMPTS" ]; then
    echo "::error::PR #$PR_NUMBER still blocked ($mergeable/$merge_state) after resolution attempts." >&2
    exit 1
  fi
  log "PR #$PR_NUMBER not ready yet: mergeable=$mergeable state=$merge_state."
  sleep 10
done

if [ "$DRY_RUN" = "1" ]; then
  log "DRY_RUN: would merge #$PR_NUMBER ($head_sha), delete $head_ref and dispatch $DEPLOY_WORKFLOWS."
  exit 0
fi

# ---------------------------------------------------------------------------
# 3) Merge, delete the PR branch, then dispatch both deploy workflows.
#    GITHUB_TOKEN merges do NOT emit push workflow runs, so workflow_dispatch
#    is required to guarantee Pages and Vercel pipelines execute.
# ---------------------------------------------------------------------------
old_main=$(main_sha)
if ! gh pr merge "$PR_NUMBER" --merge; then
  # GitHub can answer "Merge already in progress" for a merge that succeeded.
  # Verify the final state instead of aborting and skipping cleanup/deploy.
  merged=0
  for _ in 1 2 3 4 5 6 7 8 9 10; do
    [ "$(pr_field '.state')" = "MERGED" ] && { merged=1; break; }
    sleep 3
  done
  if [ "$merged" -ne 1 ]; then
    echo "::error::Merge of #$PR_NUMBER failed; skipping cleanup and deploys." >&2
    exit 1
  fi
  log "GitHub reported a merge race, but #$PR_NUMBER is MERGED."
fi
log "Merged #$PR_NUMBER ($head_sha) into main."

merged_main="$old_main"
for _ in 1 2 3 4 5 6 7 8 9 10; do
  merged_main=$(main_sha)
  [ "$merged_main" != "$old_main" ] && break
  sleep 3
done
log "main=$merged_main"

if is_protected "$head_ref"; then
  log "Protected branch '$head_ref' kept."
elif gh api -X DELETE "repos/$REPO/git/refs/heads/$head_ref" >/dev/null 2>&1; then
  log "Deleted merged branch '$head_ref'."
else
  log "Merged branch '$head_ref' was already deleted or could not be removed."
fi

for workflow in $(printf '%s' "$DEPLOY_WORKFLOWS" | tr ',' ' '); do
  [ -n "$workflow" ] || continue
  if gh workflow run "$workflow" --ref main -f sha="$merged_main" >/dev/null; then
    log "Dispatched $workflow for $merged_main."
  else
    echo "::error::Failed to dispatch $workflow for $merged_main." >&2
    exit 1
  fi
done
