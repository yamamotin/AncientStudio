#!/usr/bin/env node
'use strict';

/**
 * Vercel Container Registry (VCR) retention automation for AncientStudio.
 *
 * Keeps strictly the N most recent images (default & minimum: 3 -> indices [0], [1], [2])
 * in the target VCR repository ("dockerfile") of project "ancientstudio", deleting
 * only surplus images starting at index 3.
 *
 * Supports two execution backends:
 *   - "cli": Vercel CLI (`vercel vcr image ls` / `vercel vcr image delete --yes`)
 *   - "api": Vercel REST API (`/v1/vcr/repository/{repo}/images`)
 *
 * Security invariants:
 *   - Never logs or echoes VERCEL_TOKEN; passes token to Vercel CLI via environment
 *     variables (never on process argv) and redacts credentials from all outputs.
 *   - Enforces keepCount >= 3 and verifies top-3 protection right before deletion.
 *   - Refuses to delete anything if any image has a missing or invalid timestamp.
 */

const { execFile } = require('node:child_process');
const { appendFileSync } = require('node:fs');
const { promisify } = require('node:util');

const execFileAsync = promisify(execFile);

const DEFAULT_PROJECT = 'ancientstudio';
const DEFAULT_REPOSITORY = 'dockerfile';
const MIN_PROTECTED_IMAGES = 3;
const DEFAULT_PAGE_LIMIT = 100;
const MAX_PAGINATION_PAGES = 50;
const VERCEL_API_BASE = 'https://api.vercel.com';

class VcrCleanupError extends Error {
  constructor(message, { code = 'VCR_ERROR', exitCode = 1 } = {}) {
    super(message);
    this.name = 'VcrCleanupError';
    this.code = code;
    this.exitCode = exitCode;
  }
}

function redactSecrets(input, secrets = []) {
  let text = String(input ?? '');
  for (const secret of secrets) {
    if (typeof secret === 'string' && secret.trim().length >= 4) {
      text = text.split(secret).join('[REDACTED]');
      text = text.split(encodeURIComponent(secret)).join('[REDACTED]');
    }
  }
  text = text.replace(/(Authorization:\s*Bearer\s+)[^\s"']+/gi, '$1[REDACTED]');
  text = text.replace(/(--token(?:=|\s+))[^\s"']+/gi, '$1[REDACTED]');
  return text;
}

function parseBooleanFlag(value) {
  if (typeof value === 'boolean') return value;
  if (value === undefined || value === null || value === '') return false;
  const normalized = String(value).trim().toLowerCase();
  return ['1', 'true', 'yes', 'on'].includes(normalized);
}

function parseCliArgs(argv = [], env = process.env) {
  const options = {
    repository: env.VCR_REPOSITORY || DEFAULT_REPOSITORY,
    project: env.VERCEL_PROJECT_ID || env.VCR_PROJECT || DEFAULT_PROJECT,
    scope: env.VERCEL_ORG_ID || env.VERCEL_TEAM_ID || env.VCR_SCOPE || '',
    token: env.VERCEL_TOKEN || '',
    keepCount: env.VCR_KEEP_COUNT !== undefined && env.VCR_KEEP_COUNT !== ''
      ? Number(env.VCR_KEEP_COUNT)
      : MIN_PROTECTED_IMAGES,
    dryRun: parseBooleanFlag(env.DRY_RUN),
    backend: (env.VCR_BACKEND || 'auto').trim().toLowerCase(),
    vercelBin: env.VERCEL_BIN || 'vercel',
    apiBaseUrl: (env.VERCEL_API_BASE_URL || VERCEL_API_BASE).replace(/\/+$/, ''),
    help: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const nextValue = () => {
      if (i + 1 >= argv.length) {
        throw new VcrCleanupError(`Missing value for option ${arg}`, {
          code: 'INVALID_ARGS',
          exitCode: 2
        });
      }
      i += 1;
      return argv[i];
    };

    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--dry-run' || arg === '-n') {
      options.dryRun = true;
    } else if (arg === '--apply') {
      options.dryRun = false;
    } else if (arg === '--repository' || arg === '-r') {
      options.repository = nextValue();
    } else if (arg.startsWith('--repository=')) {
      options.repository = arg.slice('--repository='.length);
    } else if (arg === '--project' || arg === '-p') {
      options.project = nextValue();
    } else if (arg.startsWith('--project=')) {
      options.project = arg.slice('--project='.length);
    } else if (arg === '--scope' || arg === '-S') {
      options.scope = nextValue();
    } else if (arg.startsWith('--scope=')) {
      options.scope = arg.slice('--scope='.length);
    } else if (arg === '--keep' || arg === '-k') {
      options.keepCount = Number(nextValue());
    } else if (arg.startsWith('--keep=')) {
      options.keepCount = Number(arg.slice('--keep='.length));
    } else if (arg === '--backend' || arg === '-b') {
      options.backend = nextValue().trim().toLowerCase();
    } else if (arg.startsWith('--backend=')) {
      options.backend = arg.slice('--backend='.length).trim().toLowerCase();
    } else {
      throw new VcrCleanupError(`Unknown argument: ${arg}`, {
        code: 'INVALID_ARGS',
        exitCode: 2
      });
    }
  }

  return options;
}

function validateOptions(options) {
  if (!options.repository || !String(options.repository).trim()) {
    throw new VcrCleanupError('Repository name must not be empty.', {
      code: 'INVALID_ARGS',
      exitCode: 2
    });
  }
  if (!options.project || !String(options.project).trim()) {
    throw new VcrCleanupError('Project name or ID must not be empty.', {
      code: 'INVALID_ARGS',
      exitCode: 2
    });
  }
  if (!Number.isInteger(options.keepCount) || options.keepCount < MIN_PROTECTED_IMAGES) {
    throw new VcrCleanupError(
      `Invalid keepCount (${options.keepCount}): retention must be an integer >= ${MIN_PROTECTED_IMAGES} so the 3 newest images are never deleted.`,
      { code: 'INVALID_RETENTION', exitCode: 2 }
    );
  }
  if (!['auto', 'cli', 'api'].includes(options.backend)) {
    throw new VcrCleanupError(
      `Invalid backend "${options.backend}". Expected one of: auto, cli, api.`,
      { code: 'INVALID_ARGS', exitCode: 2 }
    );
  }
  if (!options.token || !String(options.token).trim()) {
    throw new VcrCleanupError(
      'Missing VERCEL_TOKEN environment variable. Configure VERCEL_TOKEN with access to project "ancientstudio".',
      { code: 'MISSING_TOKEN', exitCode: 2 }
    );
  }
}

function parseTimestampMs(rawValue, imageId) {
  if (rawValue === undefined || rawValue === null || rawValue === '') {
    throw new VcrCleanupError(
      `Refusing to prune images: image "${imageId}" is missing a creation timestamp.`,
      { code: 'MISSING_TIMESTAMP', exitCode: 1 }
    );
  }

  if (typeof rawValue === 'number' && Number.isFinite(rawValue)) {
    // Normalize Unix seconds vs milliseconds
    return rawValue < 1e11 ? Math.trunc(rawValue * 1000) : Math.trunc(rawValue);
  }

  const text = String(rawValue).trim();
  if (/^\d+$/.test(text)) {
    const numeric = Number(text);
    if (Number.isFinite(numeric)) {
      return numeric < 1e11 ? Math.trunc(numeric * 1000) : Math.trunc(numeric);
    }
  }

  const parsed = Date.parse(text);
  if (Number.isNaN(parsed)) {
    throw new VcrCleanupError(
      `Refusing to prune images: image "${imageId}" has an unparseable timestamp ("${text}").`,
      { code: 'INVALID_TIMESTAMP', exitCode: 1 }
    );
  }
  return parsed;
}

function normalizeImageRecord(raw, originalIndex) {
  if (!raw || typeof raw !== 'object') {
    throw new VcrCleanupError(
      `Invalid image record at index ${originalIndex}: expected object.`,
      { code: 'INVALID_IMAGE_RECORD', exitCode: 1 }
    );
  }
  const id = String(raw.id || raw.imageId || '').trim();
  if (!id) {
    throw new VcrCleanupError(
      `Invalid image record at index ${originalIndex}: missing image id.`,
      { code: 'MISSING_IMAGE_ID', exitCode: 1 }
    );
  }
  const rawTimestamp = raw.createdAt ?? raw.pushedAt ?? raw.updatedAt;
  const createdAtMs = parseTimestampMs(rawTimestamp, id);

  return {
    id,
    createdAtMs,
    createdAtIso: new Date(createdAtMs).toISOString(),
    manifestDigest: raw.manifestDigest || raw.digest || null,
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
    status: raw.status ? String(raw.status) : 'unknown',
    kind: raw.kind ? String(raw.kind) : 'image',
    sizeInBytes: typeof raw.sizeInBytes === 'number' ? raw.sizeInBytes : null,
    originalIndex
  };
}

function sortImagesNewestFirst(rawImages) {
  if (!Array.isArray(rawImages)) {
    throw new VcrCleanupError('Expected images list to be an array.', {
      code: 'INVALID_IMAGE_LIST',
      exitCode: 1
    });
  }

  const deduplicated = [];
  const seenIds = new Set();
  for (let i = 0; i < rawImages.length; i += 1) {
    const normalized = normalizeImageRecord(rawImages[i], i);
    if (!seenIds.has(normalized.id)) {
      seenIds.add(normalized.id);
      deduplicated.push(normalized);
    }
  }

  return deduplicated.sort((a, b) => {
    if (b.createdAtMs !== a.createdAtMs) {
      return b.createdAtMs - a.createdAtMs;
    }
    if (a.originalIndex !== b.originalIndex) {
      return a.originalIndex - b.originalIndex;
    }
    return b.id.localeCompare(a.id);
  });
}

function planRetention(rawImages, keepCount = MIN_PROTECTED_IMAGES) {
  if (!Number.isInteger(keepCount) || keepCount < MIN_PROTECTED_IMAGES) {
    throw new VcrCleanupError(
      `keepCount must be an integer >= ${MIN_PROTECTED_IMAGES} (received ${keepCount}).`,
      { code: 'INVALID_RETENTION', exitCode: 2 }
    );
  }

  const sorted = sortImagesNewestFirst(rawImages);
  const toKeep = sorted.slice(0, keepCount);
  const toDelete = sorted.slice(keepCount);

  assertRetentionSafety(sorted, toKeep, toDelete, keepCount);

  return {
    total: sorted.length,
    keepCount,
    sorted,
    toKeep,
    toDelete
  };
}

function assertRetentionSafety(sorted, toKeep, toDelete, keepCount) {
  if (keepCount < MIN_PROTECTED_IMAGES) {
    throw new VcrCleanupError(
      `Safety invariant violated: keepCount (${keepCount}) < ${MIN_PROTECTED_IMAGES}.`,
      { code: 'SAFETY_INVARIANT', exitCode: 1 }
    );
  }

  if (sorted.length <= MIN_PROTECTED_IMAGES && toDelete.length > 0) {
    throw new VcrCleanupError(
      `Safety invariant violated: attempted to delete images when total (${sorted.length}) <= ${MIN_PROTECTED_IMAGES}.`,
      { code: 'SAFETY_INVARIANT', exitCode: 1 }
    );
  }

  const protectedTopThreeIds = new Set(
    sorted.slice(0, MIN_PROTECTED_IMAGES).map((img) => img.id)
  );
  const keepIds = new Set(toKeep.map((img) => img.id));
  const oldestKeptMs = toKeep.length > 0 ? toKeep[toKeep.length - 1].createdAtMs : Infinity;

  for (const candidate of toDelete) {
    if (protectedTopThreeIds.has(candidate.id) || keepIds.has(candidate.id)) {
      throw new VcrCleanupError(
        `Safety invariant violated: protected image "${candidate.id}" appeared in deletion set.`,
        { code: 'SAFETY_INVARIANT', exitCode: 1 }
      );
    }
    if (candidate.createdAtMs > oldestKeptMs) {
      throw new VcrCleanupError(
        `Safety invariant violated: candidate "${candidate.id}" (${candidate.createdAtIso}) is newer than kept image.`,
        { code: 'SAFETY_INVARIANT', exitCode: 1 }
      );
    }
  }
}

function formatBytes(bytes) {
  if (typeof bytes !== 'number' || !Number.isFinite(bytes) || bytes < 0) {
    return '-';
  }
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB', 'TB'];
  let value = bytes / 1024;
  let unitIdx = 0;
  while (value >= 1024 && unitIdx < units.length - 1) {
    value /= 1024;
    unitIdx += 1;
  }
  return `${value.toFixed(1)} ${units[unitIdx]}`;
}

function formatShortDigest(digest) {
  if (!digest) return '-';
  return String(digest).replace(/^sha256:/, '').slice(0, 12);
}

async function fetchVercelJson(fetchImpl, url, { method = 'GET', token, secrets = [] }) {
  let response;
  try {
    response = await fetchImpl(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
  } catch (err) {
    throw new VcrCleanupError(
      `Network error communicating with Vercel API: ${redactSecrets(err.message || err, secrets)}`,
      { code: 'NETWORK_ERROR', exitCode: 1 }
    );
  }

  const rawBody = await response.text();
  let parsed = null;
  if (rawBody) {
    try {
      parsed = JSON.parse(rawBody);
    } catch {
      parsed = null;
    }
  }

  if (!response.ok) {
    const apiMessage = redactSecrets(
      parsed?.error?.message || parsed?.message || rawBody || `HTTP ${response.status}`,
      secrets
    );
    const apiCode = parsed?.error?.code || parsed?.code || `HTTP_${response.status}`;
    if (response.status === 401 || response.status === 403) {
      throw new VcrCleanupError(
        `Vercel authentication/authorization failed (${response.status} ${apiCode}): ${apiMessage}`,
        { code: 'AUTH_ERROR', exitCode: 1 }
      );
    }
    const err = new VcrCleanupError(
      `Vercel API error (${response.status} ${apiCode}): ${apiMessage}`,
      { code: apiCode, exitCode: 1 }
    );
    err.httpStatus = response.status;
    throw err;
  }

  return parsed ?? {};
}

/**
 * Resolves `{ teamId, projectId, projectName }` when VERCEL_ORG_ID (`scope`) is omitted.
 * VCR endpoints require both `teamId` and `projectId` (or `--scope` + `--project` in Vercel CLI).
 */
async function resolveProjectScope({
  project,
  scope,
  token,
  apiBaseUrl = VERCEL_API_BASE,
  fetchImpl = globalThis.fetch
}) {
  const secrets = [token];

  if (scope) {
    const projectUrl = `${apiBaseUrl}/v9/projects/${encodeURIComponent(project)}?teamId=${encodeURIComponent(scope)}`;
    // If scope is a slug instead of team_..., try teamSlug fallback if teamId fails with 400/404.
    try {
      const data = await fetchVercelJson(fetchImpl, projectUrl, { token, secrets });
      return {
        teamId: data.accountId || scope,
        projectId: data.id || project,
        projectName: data.name || project
      };
    } catch (err) {
      if (!scope.startsWith('team_') && (err.httpStatus === 400 || err.httpStatus === 404)) {
        const slugUrl = `${apiBaseUrl}/v9/projects/${encodeURIComponent(project)}?slug=${encodeURIComponent(scope)}`;
        const data = await fetchVercelJson(fetchImpl, slugUrl, { token, secrets });
        return {
          teamId: data.accountId || scope,
          projectId: data.id || project,
          projectName: data.name || project
        };
      }
      throw err;
    }
  }

  // No explicit VERCEL_ORG_ID: query teams accessible to this token and locate the project.
  const teamsData = await fetchVercelJson(
    fetchImpl,
    `${apiBaseUrl}/v2/teams?limit=100`,
    { token, secrets }
  );
  const teams = Array.isArray(teamsData.teams) ? teamsData.teams : [];

  for (const team of teams) {
    if (!team?.id) continue;
    const url = `${apiBaseUrl}/v9/projects/${encodeURIComponent(project)}?teamId=${encodeURIComponent(team.id)}`;
    try {
      const data = await fetchVercelJson(fetchImpl, url, { token, secrets });
      return {
        teamId: data.accountId || team.id,
        projectId: data.id || project,
        projectName: data.name || project
      };
    } catch (err) {
      if (err.httpStatus === 404) {
        continue;
      }
      throw err;
    }
  }

  // Fallback to personal account lookup if no team matched.
  const directData = await fetchVercelJson(
    fetchImpl,
    `${apiBaseUrl}/v9/projects/${encodeURIComponent(project)}`,
    { token, secrets }
  );
  if (!directData.accountId) {
    throw new VcrCleanupError(
      `Could not determine Vercel team/org ID for project "${project}". Set VERCEL_ORG_ID explicitly.`,
      { code: 'MISSING_SCOPE', exitCode: 1 }
    );
  }
  return {
    teamId: directData.accountId,
    projectId: directData.id || project,
    projectName: directData.name || project
  };
}

function createRestApiAdapter({
  token,
  project,
  scope,
  apiBaseUrl = VERCEL_API_BASE,
  fetchImpl = globalThis.fetch
}) {
  const secrets = [token];
  let resolvedPromise = null;

  const getScope = () => {
    if (!resolvedPromise) {
      resolvedPromise = resolveProjectScope({
        project,
        scope,
        token,
        apiBaseUrl,
        fetchImpl
      });
    }
    return resolvedPromise;
  };

  return {
    name: 'api',
    async listAllImages(repository) {
      const target = await getScope();
      const allImages = [];
      const seenCursors = new Set();
      let cursor = null;

      for (let page = 0; page < MAX_PAGINATION_PAGES; page += 1) {
        const query = new URLSearchParams({
          teamId: target.teamId,
          projectId: target.projectId,
          limit: String(DEFAULT_PAGE_LIMIT)
        });
        if (cursor) {
          query.set('cursor', cursor);
        }
        const url = `${apiBaseUrl}/v1/vcr/repository/${encodeURIComponent(repository)}/images?${query.toString()}`;
        let payload;
        try {
          payload = await fetchVercelJson(fetchImpl, url, { token, secrets });
        } catch (err) {
          if (err.httpStatus === 404) {
            return { images: [], repositoryMissing: true, target };
          }
          throw err;
        }

        const pageImages = Array.isArray(payload.images) ? payload.images : [];
        allImages.push(...pageImages);

        const nextCursor = payload.nextCursor ?? payload.pagination?.next ?? null;
        if (!nextCursor) {
          break;
        }
        if (seenCursors.has(nextCursor)) {
          throw new VcrCleanupError(
            `Detected repeated pagination cursor "${nextCursor}" while listing VCR images.`,
            { code: 'PAGINATION_LOOP', exitCode: 1 }
          );
        }
        seenCursors.add(nextCursor);
        cursor = nextCursor;
      }

      return { images: allImages, repositoryMissing: false, target };
    },

    async deleteImage(repository, imageId) {
      const target = await getScope();
      const query = new URLSearchParams({
        teamId: target.teamId,
        projectId: target.projectId
      });
      const url = `${apiBaseUrl}/v1/vcr/repository/${encodeURIComponent(repository)}/images/${encodeURIComponent(imageId)}?${query.toString()}`;
      await fetchVercelJson(fetchImpl, url, { method: 'DELETE', token, secrets });
      return { imageId, repository, deleted: true };
    }
  };
}

function parseCliJsonPayload(stdout, stderr, secrets) {
  const trimmed = String(stdout ?? '').trim();
  if (!trimmed) {
    throw new VcrCleanupError(
      `Vercel CLI returned empty JSON output.${stderr ? ` Stderr: ${redactSecrets(stderr, secrets)}` : ''}`,
      { code: 'CLI_INVALID_JSON', exitCode: 1 }
    );
  }
  try {
    return JSON.parse(trimmed);
  } catch {
    // Extract trailing JSON object if CLI emitted informational lines before JSON.
    const firstBrace = trimmed.indexOf('{');
    const lastBrace = trimmed.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      try {
        return JSON.parse(trimmed.slice(firstBrace, lastBrace + 1));
      } catch {
        // Fall through to structured error below.
      }
    }
    throw new VcrCleanupError(
      `Failed to parse Vercel CLI JSON output: ${redactSecrets(trimmed.slice(0, 400), secrets)}`,
      { code: 'CLI_INVALID_JSON', exitCode: 1 }
    );
  }
}

function createCliAdapter({
  token,
  project,
  scope,
  vercelBin = 'vercel',
  apiBaseUrl = VERCEL_API_BASE,
  execFileImpl = execFileAsync,
  fetchImpl = globalThis.fetch,
  baseEnv = process.env
}) {
  const secrets = [token];
  let resolvedScopePromise = null;

  const ensureScope = async () => {
    if (scope) {
      return { teamId: scope, projectId: project, projectName: project };
    }
    if (!resolvedScopePromise) {
      resolvedScopePromise = resolveProjectScope({
        project,
        scope: '',
        token,
        apiBaseUrl,
        fetchImpl
      });
    }
    return resolvedScopePromise;
  };

  const runVercelCli = async (args) => {
    try {
      return await execFileImpl(vercelBin, args, {
        env: {
          ...baseEnv,
          VERCEL_TOKEN: token,
          FORCE_COLOR: '0',
          NO_COLOR: '1',
          CI: '1'
        },
        maxBuffer: 10 * 1024 * 1024
      });
    } catch (err) {
      const combined = redactSecrets(
        [err.stdout, err.stderr, err.message].filter(Boolean).join('\n').trim(),
        secrets
      );
      if (/not_found|repository.*not found|404/i.test(combined) && !/project.*not found|PROJECT_NOT_FOUND/i.test(combined)) {
        const notFoundErr = new VcrCleanupError(combined, { code: 'REPOSITORY_NOT_FOUND', exitCode: 1 });
        notFoundErr.repositoryNotFound = true;
        throw notFoundErr;
      }
      if (/not_authorized|unauthorized|forbidden|invalid token|401|403/i.test(combined)) {
        throw new VcrCleanupError(
          `Vercel CLI authentication/authorization failed: ${combined}`,
          { code: 'AUTH_ERROR', exitCode: 1 }
        );
      }
      throw new VcrCleanupError(
        `Vercel CLI command failed: ${combined}`,
        { code: 'CLI_ERROR', exitCode: 1 }
      );
    }
  };

  return {
    name: 'cli',
    async listAllImages(repository) {
      const target = await ensureScope();
      const allImages = [];
      const seenCursors = new Set();
      let cursor = null;

      for (let page = 0; page < MAX_PAGINATION_PAGES; page += 1) {
        const args = [
          'vcr',
          'image',
          'ls',
          repository,
          '--json',
          '--limit',
          String(DEFAULT_PAGE_LIMIT),
          '--project',
          target.projectId,
          '--scope',
          target.teamId,
          '--non-interactive',
          '--no-color'
        ];
        if (cursor) {
          args.push('--next', cursor);
        }

        let stdout;
        let stderr;
        try {
          ({ stdout, stderr } = await runVercelCli(args));
        } catch (err) {
          if (err.repositoryNotFound) {
            return { images: [], repositoryMissing: true, target };
          }
          throw err;
        }

        const payload = parseCliJsonPayload(stdout, stderr, secrets);
        const pageImages = Array.isArray(payload.images) ? payload.images : [];
        allImages.push(...pageImages);

        const nextCursor = payload.nextCursor ?? payload.pagination?.next ?? null;
        if (!nextCursor) {
          break;
        }
        if (seenCursors.has(nextCursor)) {
          throw new VcrCleanupError(
            `Detected repeated pagination cursor "${nextCursor}" while listing VCR images via CLI.`,
            { code: 'PAGINATION_LOOP', exitCode: 1 }
          );
        }
        seenCursors.add(nextCursor);
        cursor = nextCursor;
      }

      return { images: allImages, repositoryMissing: false, target };
    },

    async deleteImage(repository, imageId) {
      const target = await ensureScope();
      const args = [
        'vcr',
        'image',
        'delete',
        repository,
        imageId,
        '--yes',
        '--json',
        '--project',
        target.projectId,
        '--scope',
        target.teamId,
        '--non-interactive',
        '--no-color'
      ];
      const { stdout, stderr } = await runVercelCli(args);
      if (String(stdout ?? '').trim()) {
        return parseCliJsonPayload(stdout, stderr, secrets);
      }
      return { imageId, repository, deleted: true };
    }
  };
}

async function isVercelCliInstalled(vercelBin, execFileImpl = execFileAsync) {
  try {
    await execFileImpl(vercelBin, ['--version'], { timeout: 10000 });
    return true;
  } catch {
    return false;
  }
}

function buildStepSummaryMarkdown({
  project,
  repository,
  backendName,
  dryRun,
  plan,
  deletedIds,
  repositoryMissing
}) {
  const modeLabel = dryRun ? 'DRY-RUN (no deletions executed)' : 'APPLY';
  const lines = [
    '### Vercel Container Registry (VCR) Cleanup',
    '',
    `- **Project:** \`${project}\``,
    `- **Repository:** \`${repository}\``,
    `- **Backend:** \`${backendName}\``,
    `- **Mode:** \`${modeLabel}\``,
    `- **Retention Policy:** Keep **${plan.keepCount}** newest images (\`[0..${plan.keepCount - 1}]\`)`,
    `- **Total Found:** \`${plan.total}\` | **Kept:** \`${plan.toKeep.length}\` | **${dryRun ? 'Would Delete' : 'Deleted'}:** \`${dryRun ? plan.toDelete.length : deletedIds.length}\``,
    ''
  ];

  if (repositoryMissing || plan.total === 0) {
    lines.push('_No images currently stored in repository._', '');
    return lines.join('\n');
  }

  lines.push(
    '| Index | Action | Image ID | Created (UTC) | Status | Size | Tags |',
    '|---:|---|---|---|---|---|---|'
  );
  plan.sorted.forEach((img, idx) => {
    const isKeep = idx < plan.keepCount;
    const action = isKeep ? 'KEEP' : dryRun ? 'WOULD_DELETE' : 'DELETE';
    const tags = img.tags.length > 0 ? img.tags.join(', ') : '<none>';
    lines.push(
      `| \`[${idx}]\` | **${action}** | \`${img.id}\` | \`${img.createdAtIso}\` | \`${img.status}\` | ${formatBytes(img.sizeInBytes)} | \`${tags}\` |`
    );
  });
  lines.push('');
  return lines.join('\n');
}

async function runCleanup(rawOptions, deps = {}) {
  const options = { ...rawOptions };
  validateOptions(options);

  const secrets = [options.token].filter(Boolean);
  const logger = deps.logger || ((line) => process.stdout.write(`${redactSecrets(line, secrets)}\n`));
  const execFileImpl = deps.execFileImpl || execFileAsync;
  const fetchImpl = deps.fetchImpl || globalThis.fetch;

  let adapter = deps.adapter || null;
  if (!adapter) {
    let selectedBackend = options.backend;
    if (selectedBackend === 'auto') {
      selectedBackend = (await isVercelCliInstalled(options.vercelBin, execFileImpl))
        ? 'cli'
        : 'api';
    }
    adapter = selectedBackend === 'cli'
      ? createCliAdapter({
        token: options.token,
        project: options.project,
        scope: options.scope,
        vercelBin: options.vercelBin,
        apiBaseUrl: options.apiBaseUrl,
        execFileImpl,
        fetchImpl
      })
      : createRestApiAdapter({
        token: options.token,
        project: options.project,
        scope: options.scope,
        apiBaseUrl: options.apiBaseUrl,
        fetchImpl
      });
  }

  const modeLabel = options.dryRun ? 'DRY-RUN' : 'APPLY';
  logger(
    `[vcr-cleanup] Starting VCR cleanup | project="${options.project}" | repository="${options.repository}" | backend=${adapter.name} | keep=${options.keepCount} | mode=${modeLabel}`
  );

  const { images, repositoryMissing } = await adapter.listAllImages(options.repository);
  const plan = planRetention(images, options.keepCount);

  if (repositoryMissing || plan.total === 0) {
    logger(
      `[vcr-cleanup] Repository "${options.repository}" has 0 images. Retention limit (${options.keepCount}) satisfied; nothing to delete.`
    );
    writeGitHubStepSummary({
      summaryPath: deps.stepSummaryPath ?? process.env.GITHUB_STEP_SUMMARY,
      project: options.project,
      repository: options.repository,
      backendName: adapter.name,
      dryRun: options.dryRun,
      plan,
      deletedIds: [],
      repositoryMissing
    });
    return {
      mode: modeLabel,
      backend: adapter.name,
      total: 0,
      keptIds: [],
      candidateDeleteIds: [],
      deletedIds: []
    };
  }

  logger(
    `[vcr-cleanup] Inspection plan (sorted newest -> oldest, total=${plan.total}):`
  );
  plan.sorted.forEach((img, index) => {
    const keep = index < plan.keepCount;
    const actionLabel = keep
      ? 'KEEP        '
      : options.dryRun
        ? 'WOULD_DELETE'
        : 'DELETE      ';
    const tags = img.tags.length > 0 ? img.tags.join(',') : '<none>';
    logger(
      `  [${index}] ${actionLabel} id=${img.id}  created=${img.createdAtIso}  digest=${formatShortDigest(img.manifestDigest)}  status=${img.status}  size=${formatBytes(img.sizeInBytes)}  tags=${tags}`
    );
  });

  const keptIds = plan.toKeep.map((img) => img.id);
  const candidateDeleteIds = plan.toDelete.map((img) => img.id);

  if (plan.toDelete.length === 0) {
    logger(
      `[vcr-cleanup] Retention satisfied: found ${plan.total} image(s) (<= ${plan.keepCount}). Preserving [${keptIds.join(', ')}]; no deletions needed.`
    );
    writeGitHubStepSummary({
      summaryPath: deps.stepSummaryPath ?? process.env.GITHUB_STEP_SUMMARY,
      project: options.project,
      repository: options.repository,
      backendName: adapter.name,
      dryRun: options.dryRun,
      plan,
      deletedIds: [],
      repositoryMissing: false
    });
    return {
      mode: modeLabel,
      backend: adapter.name,
      total: plan.total,
      keptIds,
      candidateDeleteIds: [],
      deletedIds: []
    };
  }

  if (options.dryRun) {
    logger(
      `[vcr-cleanup] DRY-RUN complete: keeping ${keptIds.length} image(s) [${keptIds.join(', ')}]; would delete ${candidateDeleteIds.length} image(s) [${candidateDeleteIds.join(', ')}].`
    );
    writeGitHubStepSummary({
      summaryPath: deps.stepSummaryPath ?? process.env.GITHUB_STEP_SUMMARY,
      project: options.project,
      repository: options.repository,
      backendName: adapter.name,
      dryRun: true,
      plan,
      deletedIds: [],
      repositoryMissing: false
    });
    return {
      mode: modeLabel,
      backend: adapter.name,
      total: plan.total,
      keptIds,
      candidateDeleteIds,
      deletedIds: []
    };
  }

  // Re-verify top-3 protection right before executing destructive calls.
  assertRetentionSafety(plan.sorted, plan.toKeep, plan.toDelete, plan.keepCount);

  const deletedIds = [];
  const failures = [];

  for (let i = 0; i < plan.toDelete.length; i += 1) {
    const img = plan.toDelete[i];
    const absoluteIndex = plan.keepCount + i;
    logger(`[vcr-cleanup] Deleting [${absoluteIndex}] id=${img.id} (${img.createdAtIso})...`);
    try {
      await adapter.deleteImage(options.repository, img.id);
      deletedIds.push(img.id);
      logger(`[vcr-cleanup] Deleted [${absoluteIndex}] id=${img.id}.`);
    } catch (err) {
      const safeMsg = redactSecrets(err.message || err, secrets);
      failures.push({ id: img.id, message: safeMsg });
      logger(`[vcr-cleanup] ERROR deleting [${absoluteIndex}] id=${img.id}: ${safeMsg}`);
    }
  }

  writeGitHubStepSummary({
    summaryPath: deps.stepSummaryPath ?? process.env.GITHUB_STEP_SUMMARY,
    project: options.project,
    repository: options.repository,
    backendName: adapter.name,
    dryRun: false,
    plan,
    deletedIds,
    repositoryMissing: false
  });

  if (failures.length > 0) {
    throw new VcrCleanupError(
      `Completed with ${failures.length} deletion error(s) out of ${plan.toDelete.length} surplus image(s); kept [${keptIds.join(', ')}], deleted [${deletedIds.join(', ')}].`,
      { code: 'PARTIAL_DELETE_FAILURE', exitCode: 1 }
    );
  }

  logger(
    `[vcr-cleanup] Cleanup complete: kept ${keptIds.length} newest image(s) [${keptIds.join(', ')}] and deleted ${deletedIds.length} surplus image(s) [${deletedIds.join(', ')}].`
  );

  return {
    mode: modeLabel,
    backend: adapter.name,
    total: plan.total,
    keptIds,
    candidateDeleteIds,
    deletedIds
  };
}

function writeGitHubStepSummary({
  summaryPath,
  project,
  repository,
  backendName,
  dryRun,
  plan,
  deletedIds,
  repositoryMissing
}) {
  if (!summaryPath) return;
  try {
    const markdown = buildStepSummaryMarkdown({
      project,
      repository,
      backendName,
      dryRun,
      plan,
      deletedIds,
      repositoryMissing
    });
    appendFileSync(summaryPath, `${markdown}\n`, 'utf8');
  } catch {
    // Non-fatal if summary file is unwritable outside GitHub Actions.
  }
}

function printHelp(write = (msg) => process.stdout.write(`${msg}\n`)) {
  write(`Usage: node scripts/vcr-cleanup.js [options]

Maintains at most the 3 newest images in Vercel Container Registry (VCR)
repository "dockerfile" for project "ancientstudio", deleting older images
starting at index 3.

Options:
  -r, --repository <name>   VCR repository name (default: "dockerfile")
  -p, --project <name|id>   Vercel project name or ID (default: "ancientstudio")
  -S, --scope <orgId|slug>  Vercel team/org ID or slug (env: VERCEL_ORG_ID)
  -k, --keep <count>        Images to retain, minimum 3 (default: 3)
  -b, --backend <mode>      "auto" | "cli" | "api" (default: "auto")
  -n, --dry-run             Inspect and log KEEP / WOULD_DELETE without deleting
      --apply               Execute deletions (default unless DRY_RUN=1)
  -h, --help                Show this help message

Environment variables:
  VERCEL_TOKEN              Required. Vercel API/CLI token (never logged)
  VERCEL_ORG_ID             Optional. Team ID (auto-discovered if omitted)
  VERCEL_PROJECT_ID         Optional. Project ID or name (default: ancientstudio)
  DRY_RUN                   Optional. Set "1" or "true" for dry-run mode`);
}

async function main(argv = process.argv.slice(2), env = process.env) {
  const secrets = [env.VERCEL_TOKEN].filter(Boolean);
  try {
    const options = parseCliArgs(argv, env);
    if (options.help) {
      printHelp();
      return 0;
    }
    await runCleanup(options);
    return 0;
  } catch (err) {
    const exitCode = typeof err?.exitCode === 'number' ? err.exitCode : 1;
    const safeMessage = redactSecrets(err?.message || String(err), secrets);
    process.stderr.write(`[vcr-cleanup] ERROR: ${safeMessage}\n`);
    return exitCode;
  }
}

if (require.main === module) {
  main().then((code) => {
    process.exitCode = code;
  });
}

module.exports = {
  DEFAULT_PROJECT,
  DEFAULT_REPOSITORY,
  MIN_PROTECTED_IMAGES,
  VcrCleanupError,
  redactSecrets,
  parseCliArgs,
  validateOptions,
  parseTimestampMs,
  sortImagesNewestFirst,
  planRetention,
  assertRetentionSafety,
  resolveProjectScope,
  createRestApiAdapter,
  createCliAdapter,
  runCleanup,
  main
};
