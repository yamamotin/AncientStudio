#!/usr/bin/env node
'use strict';

/**
 * Vercel Container Registry (VCR) retention cleanup for AncientStudio.
 *
 * Strictly retains at most the N newest images (default: 3 -> indices [0..2])
 * in the target VCR repository ("dockerfile" in project "ancientstudio") and
 * deletes every older surplus image starting at index [3].
 *
 * Zero external runtime dependencies: uses Node.js built-ins only.
 * Supports two backends:
 *   1. "cli"  — Official Vercel CLI (`vercel vcr image ls` / `vercel vcr image delete`)
 *   2. "api"  — Direct Vercel REST API (`/v1/vcr/repository/{repo}/images`)
 *   3. "auto" — Uses Vercel CLI when installed and automatically falls back to
 *               the direct Vercel REST API if CLI invocation fails.
 */

const { execFile, spawnSync } = require('node:child_process');
const { appendFileSync } = require('node:fs');
const { promisify } = require('node:util');

const execFileAsync = promisify(execFile);

const DEFAULT_KEEP_COUNT = 3;
const DEFAULT_REPOSITORY = 'dockerfile';
const DEFAULT_PROJECT = 'ancientstudio';
const DEFAULT_API_BASE = 'https://api.vercel.com';
const PAGE_LIMIT = 100;
const MAX_PAGINATION_PAGES = 100;

function cleanInput(value) {
  if (value === undefined || value === null) return '';
  let text = String(value).trim();
  if (
    (text.startsWith('"') && text.endsWith('"')) ||
    (text.startsWith("'") && text.endsWith("'"))
  ) {
    text = text.slice(1, -1).trim();
  }
  return text;
}

function cleanToken(value) {
  // Strip accidental CR/LF or surrounding quotes/spaces pasted into secrets
  // so HTTP Authorization headers never throw header-character TypeErrors.
  return cleanInput(value).replace(/[\r\n\0-\x1f\x7f]+/g, '');
}

function redactSecrets(message, secrets = []) {
  let output = String(message ?? '');
  for (const rawSecret of secrets) {
    const secret = cleanToken(rawSecret);
    if (secret && secret.length >= 4) {
      output = output.split(secret).join('[REDACTED]');
    }
    const rawTrimmed = String(rawSecret ?? '').trim();
    if (rawTrimmed && rawTrimmed.length >= 4 && rawTrimmed !== secret) {
      output = output.split(rawTrimmed).join('[REDACTED]');
    }
  }
  return output
    .replace(/Bearer\s+[A-Za-z0-9._~+/=-]+/gi, 'Bearer [REDACTED]')
    .replace(/(--token(?:=|\s+))\S+/gi, '$1[REDACTED]')
    .replace(/\bvc[pa]_[A-Za-z0-9_]+\b/g, '[REDACTED]');
}

function parseBoolean(value, fallback = false) {
  if (typeof value === 'boolean') return value;
  if (value === undefined || value === null || value === '') return fallback;
  const normalized = String(value).trim().toLowerCase();
  if (['1', 'true', 'yes', 'y', 'on'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'n', 'off'].includes(normalized)) return false;
  return fallback;
}

function parseKeepCount(value, fallback = DEFAULT_KEEP_COUNT) {
  if (value === undefined || value === null || String(value).trim() === '') {
    return fallback;
  }
  const raw = String(value).trim();
  if (!/^\d+$/.test(raw)) {
    throw new Error(`Invalid KEEP_COUNT "${value}": expected a positive integer >= 1 (default ${DEFAULT_KEEP_COUNT}).`);
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`Invalid KEEP_COUNT "${value}": expected a positive integer >= 1 (default ${DEFAULT_KEEP_COUNT}).`);
  }
  return parsed;
}

function parseCliArgs(argv) {
  const options = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--no-dry-run') {
      options.dryRun = false;
    } else if (arg === '--allow-missing-token') {
      options.allowMissingToken = true;
    } else if (arg.startsWith('--keep=')) {
      options.keepCount = arg.slice('--keep='.length);
    } else if (arg === '--keep' && i + 1 < argv.length) {
      options.keepCount = argv[++i];
    } else if (arg.startsWith('--repository=')) {
      options.repository = arg.slice('--repository='.length);
    } else if (arg === '--repository' && i + 1 < argv.length) {
      options.repository = argv[++i];
    } else if (arg.startsWith('--project=')) {
      options.project = arg.slice('--project='.length);
    } else if (arg === '--project' && i + 1 < argv.length) {
      options.project = argv[++i];
    } else if (arg.startsWith('--scope=')) {
      options.scope = arg.slice('--scope='.length);
    } else if (arg === '--scope' && i + 1 < argv.length) {
      options.scope = argv[++i];
    } else if (arg.startsWith('--backend=')) {
      options.backend = arg.slice('--backend='.length);
    } else if (arg === '--backend' && i + 1 < argv.length) {
      options.backend = argv[++i];
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else {
      throw new Error(`Unknown CLI argument: ${arg}`);
    }
  }
  return options;
}

function parseTimestamp(value) {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value === 'number' && Number.isFinite(value)) {
    // Support both Unix seconds and Unix milliseconds.
    return value < 1e12 ? Math.round(value * 1000) : Math.round(value);
  }
  const str = String(value).trim();
  if (/^\d+$/.test(str)) {
    const num = Number(str);
    if (Number.isFinite(num)) {
      return num < 1e12 ? Math.round(num * 1000) : Math.round(num);
    }
  }
  const parsed = Date.parse(str);
  return Number.isNaN(parsed) ? null : parsed;
}

function shortDigest(digest) {
  const clean = cleanInput(digest);
  if (!clean) return '-';
  if (clean.startsWith('sha256:')) {
    return `sha256:${clean.slice('sha256:'.length, 'sha256:'.length + 12)}`;
  }
  return clean.slice(0, 12);
}

/**
 * Normalizes a raw image entry returned by `vercel vcr image ls --json` or
 * the Vercel VCR REST API into a consistent shape.
 */
function normalizeImage(raw) {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Invalid VCR image entry: expected an object.');
  }

  const id = cleanInput(raw.id || raw.imageId || raw.digest || raw.manifestDigest);
  if (!id) {
    throw new Error('Invalid VCR image entry: missing image identifier (id/digest).');
  }

  const digest = cleanInput(raw.manifestDigest || raw.digest);
  const rawTimestamp =
    raw.createdAt ??
    raw.created_at ??
    raw.uploadedAt ??
    raw.pushedAt ??
    raw.updatedAt ??
    raw.created ??
    null;

  const createdAtMs = parseTimestamp(rawTimestamp);
  const tags = Array.isArray(raw.tags)
    ? raw.tags.map((t) => String(t)).filter(Boolean)
    : typeof raw.tag === 'string' && raw.tag
      ? [raw.tag]
      : [];

  const status = cleanInput(raw.status || raw.state).toLowerCase() || 'unknown';
  const sizeBytes =
    typeof raw.sizeInBytes === 'number'
      ? raw.sizeInBytes
      : typeof raw.sizeBytes === 'number'
        ? raw.sizeBytes
        : typeof raw.size === 'number'
          ? raw.size
          : null;

  return {
    id,
    digest,
    createdAtMs,
    createdAtIso: createdAtMs !== null ? new Date(createdAtMs).toISOString() : 'unknown',
    tags,
    status,
    sizeBytes,
    raw
  };
}

/**
 * Deduplicates normalized images by `id` (keeping the newest metadata if page
 * boundaries overlap during concurrent pushes) and sorts strictly newest-first.
 */
function sortImagesNewestFirst(rawImages) {
  if (!Array.isArray(rawImages)) {
    throw new Error('Expected image list to be an array.');
  }
  const byId = new Map();
  for (const item of rawImages) {
    const normalized = normalizeImage(item);
    const existing = byId.get(normalized.id);
    if (
      !existing ||
      (normalized.createdAtMs !== null &&
        (existing.createdAtMs === null || normalized.createdAtMs > existing.createdAtMs))
    ) {
      byId.set(normalized.id, normalized);
    }
  }

  return Array.from(byId.values()).sort((a, b) => {
    const aHasTime = a.createdAtMs !== null;
    const bHasTime = b.createdAtMs !== null;
    if (aHasTime && bHasTime && b.createdAtMs !== a.createdAtMs) {
      return b.createdAtMs - a.createdAtMs;
    }
    if (aHasTime !== bHasTime) {
      // Valid timestamps rank ahead of missing/unparseable timestamps.
      return aHasTime ? -1 : 1;
    }
    // Deterministic tie-breaker for identical timestamps.
    return b.id.localeCompare(a.id);
  });
}

/**
 * Strict retention planner:
 *   1. Sorts images from newest [0] to oldest [N - 1].
 *   2. Preserves strictly indices [0 .. keepCount - 1] (default [0], [1], [2]).
 *   3. Marks every image from index [keepCount] onward (default [3..]) for deletion.
 */
function planRetention(rawImages, keepCount = DEFAULT_KEEP_COUNT) {
  const keepLimit = parseKeepCount(keepCount);
  const sorted = sortImagesNewestFirst(rawImages);
  const keep = [];
  const remove = [];

  sorted.forEach((image, index) => {
    if (index < keepLimit) {
      keep.push({ ...image, rank: index, reason: `recent#${index + 1}` });
      return;
    }
    remove.push({ ...image, rank: index, reason: `surplus#${index + 1}` });
  });

  return {
    total: sorted.length,
    keepLimit,
    sorted,
    keep,
    remove
  };
}

function extractImagesFromPayload(payload) {
  if (Array.isArray(payload)) {
    return { images: payload, nextCursor: null };
  }
  if (!payload || typeof payload !== 'object') {
    throw new Error('Unexpected VCR list response: payload is not a JSON object or array.');
  }

  const list =
    (Array.isArray(payload.images) && payload.images) ||
    (Array.isArray(payload.items) && payload.items) ||
    (Array.isArray(payload.data) && payload.data) ||
    (payload.data && Array.isArray(payload.data.images) && payload.data.images) ||
    null;

  if (!list) {
    throw new Error(
      `Unexpected VCR list response keys (${Object.keys(payload).join(', ') || 'none'}): missing "images" array.`
    );
  }

  const nextCursor =
    payload.pagination?.next ??
    payload.nextCursor ??
    payload.cursor ??
    payload.data?.nextCursor ??
    null;

  return {
    images: list,
    nextCursor: nextCursor !== null && nextCursor !== undefined && String(nextCursor).trim() !== ''
      ? String(nextCursor).trim()
      : null
  };
}

function extractJsonDocument(stdout) {
  const trimmed = String(stdout || '').trim();
  if (!trimmed) {
    throw new Error('Vercel CLI returned empty output when JSON was expected.');
  }
  try {
    return JSON.parse(trimmed);
  } catch (_) {
    // Strip any leading CLI update/deprecation banners printed on stdout.
    const firstBrace = trimmed.indexOf('{');
    const firstBracket = trimmed.indexOf('[');
    const candidates = [firstBrace, firstBracket].filter((idx) => idx >= 0);
    if (candidates.length > 0) {
      const start = Math.min(...candidates);
      return JSON.parse(trimmed.slice(start));
    }
    throw new Error(`Failed to parse Vercel CLI JSON output: ${trimmed.slice(0, 240)}`);
  }
}

function hasVercelCli(vercelBin = 'vercel') {
  const probe = spawnSync(vercelBin, ['--version'], {
    stdio: 'ignore',
    timeout: 10_000
  });
  return !probe.error && probe.status === 0;
}

/**
 * Adapter 1: Official Vercel CLI (`vercel vcr image ls` / `vercel vcr image delete`).
 * Verified against `vercel@66.6.0` (`packages/cli/src/commands/vcr/image/{ls,rm}.ts`).
 */
function createCliAdapter({
  token,
  scope,
  project,
  repository,
  vercelBin = 'vercel',
  execFileImpl = execFileAsync
}) {
  const sanitizedToken = cleanToken(token);
  const cleanScope = cleanInput(scope);
  const cleanProject = cleanInput(project);
  const cleanRepo = cleanInput(repository);

  const env = {
    ...process.env,
    VERCEL_TOKEN: sanitizedToken,
    FORCE_COLOR: '0',
    NO_COLOR: '1',
    CI: '1'
  };
  if (cleanScope) {
    env.VERCEL_ORG_ID = cleanScope;
  }
  if (cleanProject) {
    env.VERCEL_PROJECT_ID = cleanProject;
  }

  function commonFlags() {
    const flags = [];
    if (cleanProject) {
      flags.push('--project', cleanProject);
    }
    if (cleanScope) {
      flags.push('--scope', cleanScope);
    }
    // Keep token strictly in env.VERCEL_TOKEN so it never appears in argv / ps.
    flags.push('--non-interactive', '--no-color');
    return flags;
  }

  async function runVercel(args) {
    try {
      const { stdout } = await execFileImpl(vercelBin, args, {
        env,
        timeout: 60_000,
        maxBuffer: 10 * 1024 * 1024
      });
      return stdout;
    } catch (error) {
      const safeStderr = redactSecrets(error?.stderr || '', [token, sanitizedToken]).trim();
      const safeStdout = redactSecrets(error?.stdout || '', [token, sanitizedToken]).trim();
      const safeMsg = redactSecrets(error?.message || 'unknown CLI error', [token, sanitizedToken]);
      const details = safeStderr || safeStdout || safeMsg;
      const safeArgs = redactSecrets(args.join(' '), [token, sanitizedToken]);
      const wrapped = new Error(`Vercel CLI failed (${vercelBin} ${safeArgs}): ${details}`);
      wrapped.code = error?.code || 'VERCEL_CLI_ERROR';
      throw wrapped;
    }
  }

  return {
    name: 'cli',
    async listImages() {
      const collected = [];
      const seenCursors = new Set();
      let cursor = null;

      for (let page = 0; page < MAX_PAGINATION_PAGES; page += 1) {
        const args = ['vcr', 'image', 'ls', cleanRepo, '--json', '--limit', String(PAGE_LIMIT)];
        if (cursor) {
          // `vercel@66.6.0` uses `--next` (`--cursor` is deprecated).
          args.push('--next', cursor);
        }
        args.push(...commonFlags());
        const stdout = await runVercel(args);
        const parsed = extractJsonDocument(stdout);
        const { images, nextCursor } = extractImagesFromPayload(parsed);
        collected.push(...images);
        if (!nextCursor || images.length === 0 || seenCursors.has(nextCursor)) {
          break;
        }
        seenCursors.add(nextCursor);
        cursor = nextCursor;
      }

      return collected;
    },
    async deleteImage(image) {
      const args = [
        'vcr',
        'image',
        'delete',
        cleanRepo,
        image.id,
        '--yes',
        '--json',
        ...commonFlags()
      ];
      await runVercel(args);
    }
  };
}

/**
 * Adapter 2: Direct Vercel REST API (`/v1/vcr/repository/{repo}/images`).
 * Matches the endpoints in `packages/cli/src/commands/vcr/utils/paths.ts`.
 */
function createApiAdapter({
  token,
  scope,
  project,
  repository,
  apiBase = DEFAULT_API_BASE,
  fetchImpl = globalThis.fetch
}) {
  if (typeof fetchImpl !== 'function') {
    throw new Error('Global fetch is unavailable; Node.js >= 18 is required for API mode.');
  }

  const sanitizedToken = cleanToken(token);
  const cleanScope = cleanInput(scope);
  const cleanProject = cleanInput(project);
  const cleanRepo = cleanInput(repository);
  const normalizedBase = cleanInput(apiBase).replace(/\/+$/, '') || DEFAULT_API_BASE;

  async function apiRequest(method, urlPath, query = {}, { allowStatuses = [] } = {}) {
    const url = new URL(`${normalizedBase}${urlPath}`);
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    }

    let response;
    try {
      response = await fetchImpl(url.toString(), {
        method,
        headers: {
          Authorization: `Bearer ${sanitizedToken}`,
          Accept: 'application/json'
        }
      });
    } catch (networkError) {
      const safeMsg = redactSecrets(networkError?.message || networkError, [token, sanitizedToken]);
      const err = new Error(`Vercel API network failure (${method} ${url.pathname}): ${safeMsg}`);
      err.code = 'VERCEL_API_NETWORK_ERROR';
      throw err;
    }

    const text = await response.text();
    let json = null;
    if (text) {
      try {
        json = JSON.parse(text);
      } catch (_) {
        json = null;
      }
    }

    if (allowStatuses.includes(response.status)) {
      return { status: response.status, ok: response.ok, data: json };
    }

    if (!response.ok) {
      const apiMessage =
        json?.error?.message ||
        json?.message ||
        text.slice(0, 240) ||
        response.statusText ||
        `HTTP ${response.status}`;
      const safeMsg = redactSecrets(apiMessage, [token, sanitizedToken]);
      const err = new Error(`Vercel API ${method} ${url.pathname} failed (${response.status}): ${safeMsg}`);
      err.status = response.status;
      err.code = json?.error?.code || `HTTP_${response.status}`;
      throw err;
    }

    return { status: response.status, ok: true, data: json };
  }

  let resolvedScopePromise = null;

  async function discoverProjectAcrossTeams(projectKey) {
    const candidateTeamIds = [];
    const seenTeams = new Set();
    const pushTeam = (id) => {
      const clean = cleanInput(id);
      if (clean && !seenTeams.has(clean)) {
        seenTeams.add(clean);
        candidateTeamIds.push(clean);
      }
    };

    const userRes = await apiRequest('GET', '/v2/user', {}, { allowStatuses: [400, 401, 403, 404] });
    if (userRes.ok && userRes.data?.user?.defaultTeamId) {
      pushTeam(userRes.data.user.defaultTeamId);
    }

    const teamsRes = await apiRequest(
      'GET',
      '/v2/teams',
      { limit: 100 },
      { allowStatuses: [400, 401, 403, 404] }
    );
    if (teamsRes.ok && Array.isArray(teamsRes.data?.teams)) {
      // Prioritize a team matching `cleanScope` by slug or id when provided.
      const sortedTeams = [...teamsRes.data.teams].sort((a, b) => {
        const aMatch = cleanScope && (a.id === cleanScope || a.slug === cleanScope) ? -1 : 0;
        const bMatch = cleanScope && (b.id === cleanScope || b.slug === cleanScope) ? -1 : 0;
        return aMatch - bMatch;
      });
      for (const team of sortedTeams) {
        pushTeam(team?.id);
      }
    }

    for (const candidateTeamId of candidateTeamIds) {
      const probe = await apiRequest(
        'GET',
        `/v9/projects/${encodeURIComponent(projectKey)}`,
        { teamId: candidateTeamId },
        { allowStatuses: [400, 403, 404] }
      );
      if (probe.ok && probe.data) {
        return {
          teamId: cleanInput(probe.data.accountId) || candidateTeamId,
          projectId: cleanInput(probe.data.id) || projectKey
        };
      }
    }

    return null;
  }

  async function resolveScope() {
    if (resolvedScopePromise) {
      return resolvedScopePromise;
    }
    resolvedScopePromise = (async () => {
      // Fast path when canonical IDs (`team_...` and `prj_...`) are already supplied.
      if (cleanScope.startsWith('team_') && cleanProject.startsWith('prj_')) {
        return { teamId: cleanScope, projectId: cleanProject };
      }

      if (!cleanProject) {
        return { teamId: cleanScope, projectId: '' };
      }

      // 1) Probe `/v9/projects/{project}` with provided `scope` (or default token scope).
      const directQuery = cleanScope
        ? cleanScope.startsWith('team_')
          ? { teamId: cleanScope }
          : { slug: cleanScope }
        : {};

      const directRes = await apiRequest(
        'GET',
        `/v9/projects/${encodeURIComponent(cleanProject)}`,
        directQuery,
        { allowStatuses: [400, 403, 404] }
      );
      if (directRes.ok && directRes.data) {
        return {
          teamId: cleanInput(directRes.data.accountId) || cleanScope,
          projectId: cleanInput(directRes.data.id) || cleanProject
        };
      }

      // 2) Fallback: discover across accessible Northstar teams (`/v2/user` + `/v2/teams`).
      const discovered = await discoverProjectAcrossTeams(cleanProject);
      if (discovered) {
        return discovered;
      }

      throw new Error(
        `Could not resolve Vercel project "${cleanProject}"${cleanScope ? ` under scope "${cleanScope}"` : ''}. ` +
          'Verify VERCEL_TOKEN permissions, VERCEL_ORG_ID (team_...), and VERCEL_PROJECT_ID (prj_... or project name).'
      );
    })();
    return resolvedScopePromise;
  }

  return {
    name: 'api',
    async listImages() {
      const { teamId, projectId } = await resolveScope();
      const collected = [];
      const seenCursors = new Set();
      let cursor = null;

      for (let page = 0; page < MAX_PAGINATION_PAGES; page += 1) {
        const { data } = await apiRequest(
          'GET',
          `/v1/vcr/repository/${encodeURIComponent(cleanRepo)}/images`,
          {
            teamId,
            projectId,
            limit: PAGE_LIMIT,
            cursor
          }
        );
        const { images, nextCursor } = extractImagesFromPayload(data || {});
        collected.push(...images);
        if (!nextCursor || images.length === 0 || seenCursors.has(nextCursor)) {
          break;
        }
        seenCursors.add(nextCursor);
        cursor = nextCursor;
      }

      return collected;
    },
    async deleteImage(image) {
      const { teamId, projectId } = await resolveScope();
      try {
        await apiRequest(
          'DELETE',
          `/v1/vcr/repository/${encodeURIComponent(cleanRepo)}/images/${encodeURIComponent(image.id)}`,
          {
            teamId,
            projectId
          }
        );
      } catch (error) {
        // 404 means the image was already removed concurrently — idempotent success.
        if (error.status === 404) {
          return;
        }
        throw error;
      }
    }
  };
}

function formatBytes(bytes) {
  if (typeof bytes !== 'number' || !Number.isFinite(bytes) || bytes < 0) {
    return '-';
  }
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MiB`;
}

function writeStepSummary(summaryPath, lines) {
  if (!summaryPath) return;
  try {
    appendFileSync(summaryPath, `${lines.join('\n')}\n`, 'utf8');
  } catch (_) {
    // Non-fatal outside GitHub Actions runners.
  }
}

function buildMissingTokenGuidance({ project, repository }) {
  return [
    `VERCEL_TOKEN is not configured for ${project}/${repository}.`,
    'Configure Repository Secrets in GitHub -> Settings -> Secrets and variables -> Actions:',
    '  - VERCEL_TOKEN (required): Vercel access token with access to the AncientStudio team/project.',
    '  - VERCEL_ORG_ID (recommended): Northstar Team ID (e.g. team_...) or team slug.',
    '  - VERCEL_PROJECT_ID (optional): Project ID (e.g. prj_...) or project name ("ancientstudio").'
  ];
}

async function runCleanup(rawOptions = {}) {
  const rawToken = rawOptions.token ?? process.env.VERCEL_TOKEN ?? '';
  const token = cleanToken(rawToken);
  const scope = cleanInput(
    rawOptions.scope ?? process.env.VERCEL_ORG_ID ?? process.env.VERCEL_TEAM_ID ?? ''
  );
  const project = cleanInput(
    rawOptions.project ??
      process.env.VERCEL_PROJECT_ID ??
      process.env.VERCEL_PROJECT ??
      DEFAULT_PROJECT
  ) || DEFAULT_PROJECT;
  const repository = cleanInput(
    rawOptions.repository ?? process.env.VCR_REPOSITORY ?? DEFAULT_REPOSITORY
  ) || DEFAULT_REPOSITORY;
  const keepCount = parseKeepCount(rawOptions.keepCount ?? process.env.KEEP_COUNT ?? DEFAULT_KEEP_COUNT);
  const dryRun = parseBoolean(rawOptions.dryRun ?? process.env.DRY_RUN, false);
  const allowMissingToken = parseBoolean(
    rawOptions.allowMissingToken ?? process.env.ALLOW_MISSING_TOKEN,
    false
  );
  const backend = cleanInput(rawOptions.backend ?? process.env.VCR_BACKEND ?? 'auto').toLowerCase() || 'auto';
  const summaryPath = rawOptions.summaryPath ?? process.env.GITHUB_STEP_SUMMARY ?? '';
  const log = rawOptions.logger || ((msg) => console.log(msg));
  const warn = rawOptions.warnLogger || ((msg) => console.warn(msg));

  if (!['auto', 'cli', 'api'].includes(backend)) {
    throw new Error(`Invalid VCR backend "${backend}": expected "auto", "cli", or "api".`);
  }

  if (!rawOptions.adapter && !token) {
    const guidanceLines = buildMissingTokenGuidance({ project, repository });
    if (allowMissingToken) {
      if (process.env.GITHUB_ACTIONS === 'true') {
        log(`::warning::${guidanceLines[0]} Automatic VCR cleanup skipped until VERCEL_TOKEN is added.`);
      }
      for (const line of guidanceLines) {
        warn(`[vcr-cleanup] WARN: ${line}`);
      }
      writeStepSummary(summaryPath, [
        '### VCR Image Retention Cleanup (Skipped — Missing `VERCEL_TOKEN`)',
        `- **Target**: \`${project}/${repository}\``,
        `- **Retention policy**: keep newest \`${keepCount}\` images (\`[0..${keepCount - 1}]\`), delete \`[${keepCount}..]\``,
        '- **Status**: `SKIPPED_NO_TOKEN` — `VERCEL_TOKEN` secret is not configured in GitHub Actions.',
        '',
        'Configure under **Settings → Secrets and variables → Actions → Repository secrets**:',
        '- `VERCEL_TOKEN` *(required)*',
        '- `VERCEL_ORG_ID` *(recommended — team ID `team_...`)*',
        '- `VERCEL_PROJECT_ID` *(optional — project ID `prj_...` or `ancientstudio`)*'
      ]);
      return {
        status: 'skipped-no-token',
        exitCode: 0,
        backend: 'none',
        project,
        repository,
        keepLimit: keepCount,
        dryRun,
        total: 0,
        kept: [],
        deleted: []
      };
    }

    writeStepSummary(summaryPath, [
      '### VCR Image Retention Cleanup (Failed — Missing `VERCEL_TOKEN`)',
      `- **Target**: \`${project}/${repository}\``,
      '- **Error**: `VERCEL_TOKEN` is required to list or delete VCR images.',
      '- Add `VERCEL_TOKEN` (plus optional `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`) in **Settings → Secrets and variables → Actions → Repository secrets**.'
    ]);
    const err = new Error(guidanceLines.join(' '));
    err.code = 'MISSING_VERCEL_TOKEN';
    throw err;
  }

  let activeAdapter = rawOptions.adapter || null;
  let rawImages = null;

  if (activeAdapter) {
    rawImages = await activeAdapter.listImages();
  } else if (backend === 'cli') {
    activeAdapter = createCliAdapter({ token, scope, project, repository });
    rawImages = await activeAdapter.listImages();
  } else if (backend === 'api') {
    activeAdapter = createApiAdapter({ token, scope, project, repository });
    rawImages = await activeAdapter.listImages();
  } else {
    // `auto`: prefer official Vercel CLI when installed, with automatic
    // fallback to the direct Vercel REST API if CLI listing fails.
    const cliAvailable =
      typeof rawOptions.hasCliImpl === 'function' ? rawOptions.hasCliImpl() : hasVercelCli();
    if (cliAvailable) {
      const cliAdapter =
        rawOptions.cliAdapter || createCliAdapter({ token, scope, project, repository });
      try {
        rawImages = await cliAdapter.listImages();
        activeAdapter = cliAdapter;
      } catch (cliError) {
        const safeCliReason = redactSecrets(cliError?.message || cliError, [rawToken, token]);
        warn(
          `[vcr-cleanup] WARN: CLI backend failed (${safeCliReason}); falling back to direct Vercel REST API.`
        );
        activeAdapter =
          rawOptions.apiAdapter || createApiAdapter({ token, scope, project, repository });
        rawImages = await activeAdapter.listImages();
      }
    } else {
      activeAdapter =
        rawOptions.apiAdapter || createApiAdapter({ token, scope, project, repository });
      rawImages = await activeAdapter.listImages();
    }
  }

  const plan = planRetention(rawImages, keepCount);

  log(
    `[vcr-cleanup] target=${project}/${repository} backend=${activeAdapter.name || backend} ` +
      `keep=${plan.keepLimit} dryRun=${dryRun} found=${plan.total}`
  );

  for (const img of plan.keep) {
    log(
      `[vcr-cleanup] KEEP [${img.rank}] id=${img.id} digest=${shortDigest(img.digest)} ` +
        `createdAt=${img.createdAtIso} size=${formatBytes(img.sizeBytes)} ` +
        `tags=${img.tags.join(',') || '-'} status=${img.status} reason=${img.reason}`
    );
  }

  if (plan.remove.length === 0) {
    log(
      `[vcr-cleanup] Nothing to delete (${plan.total} image(s) <= keep limit ${plan.keepLimit}). Exiting cleanly.`
    );
    writeStepSummary(summaryPath, [
      '### VCR Image Retention Cleanup',
      `- **Target**: \`${project}/${repository}\``,
      `- **Backend**: \`${activeAdapter.name || backend}\``,
      `- **Dry run**: \`${dryRun}\``,
      `- **Images found**: \`${plan.total}\` (keep limit: \`${plan.keepLimit}\`)`,
      '- **Result**: No surplus images to remove (`0` deleted).'
    ]);
    return {
      status: 'noop',
      exitCode: 0,
      backend: activeAdapter.name || backend,
      project,
      repository,
      keepLimit: plan.keepLimit,
      dryRun,
      total: plan.total,
      kept: plan.keep,
      deleted: []
    };
  }

  const deleted = [];
  const failures = [];

  for (const target of plan.remove) {
    if (dryRun) {
      log(
        `[vcr-cleanup] WOULD_DELETE [${target.rank}] id=${target.id} digest=${shortDigest(target.digest)} ` +
          `createdAt=${target.createdAtIso} size=${formatBytes(target.sizeBytes)} ` +
          `tags=${target.tags.join(',') || '-'} status=${target.status} reason=${target.reason}`
      );
      deleted.push(target);
      continue;
    }

    log(
      `[vcr-cleanup] DELETE [${target.rank}] id=${target.id} digest=${shortDigest(target.digest)} ` +
        `createdAt=${target.createdAtIso} size=${formatBytes(target.sizeBytes)} ` +
        `tags=${target.tags.join(',') || '-'} status=${target.status} reason=${target.reason}`
    );
    try {
      await activeAdapter.deleteImage(target);
      deleted.push(target);
    } catch (deleteError) {
      const safeReason = redactSecrets(deleteError?.message || deleteError, [rawToken, token]);
      warn(`[vcr-cleanup] ERROR deleting [${target.rank}] id=${target.id}: ${safeReason}`);
      failures.push({ image: target, message: safeReason });
    }
  }

  if (failures.length > 0) {
    writeStepSummary(summaryPath, [
      '### VCR Image Retention Cleanup (Partial/Failed Deletion)',
      `- **Target**: \`${project}/${repository}\``,
      `- **Backend**: \`${activeAdapter.name || backend}\``,
      `- **Images found**: \`${plan.total}\``,
      `- **Kept**: \`${plan.keep.length}\` (\`[0..${plan.keep.length - 1}]\`)`,
      `- **Deleted**: \`${deleted.length}\` / \`${plan.remove.length}\``,
      `- **Failed**: \`${failures.length}\` (${failures.map((f) => `\`${f.image.id}\``).join(', ')})`
    ]);
    const aggregateError = new Error(
      `Failed to delete ${failures.length} of ${plan.remove.length} surplus VCR image(s): ` +
        failures.map((f) => `${f.image.id} (${f.message})`).join('; ')
    );
    aggregateError.code = 'VCR_DELETE_FAILED';
    throw aggregateError;
  }

  log(
    `[vcr-cleanup] Completed: kept=${plan.keep.length} ${dryRun ? 'wouldDelete' : 'deleted'}=${deleted.length}.`
  );

  writeStepSummary(summaryPath, [
    '### VCR Image Retention Cleanup',
    `- **Target**: \`${project}/${repository}\``,
    `- **Backend**: \`${activeAdapter.name || backend}\``,
    `- **Dry run**: \`${dryRun}\``,
    `- **Images found**: \`${plan.total}\``,
    `- **Kept**: \`${plan.keep.length}\` (${plan.keep.map((i) => `\`[${i.rank}] ${i.id}\``).join(', ') || 'none'})`,
    `- **${dryRun ? 'Would delete' : 'Deleted'}**: \`${deleted.length}\` (${deleted.map((i) => `\`[${i.rank}] ${i.id}\``).join(', ')})`
  ]);

  return {
    status: dryRun ? 'dry-run' : 'pruned',
    exitCode: 0,
    backend: activeAdapter.name || backend,
    project,
    repository,
    keepLimit: plan.keepLimit,
    dryRun,
    total: plan.total,
    kept: plan.keep,
    deleted
  };
}

function printHelp() {
  console.log(
    [
      'Usage: node scripts/vcr-cleanup.js [options]',
      '',
      'Options:',
      `  --keep <N>            Number of most recent images to keep (default: ${DEFAULT_KEEP_COUNT})`,
      `  --repository <name>   VCR repository name (default: ${DEFAULT_REPOSITORY})`,
      `  --project <id|name>   Vercel project name or ID (default: ${DEFAULT_PROJECT})`,
      '  --scope <teamId>      Vercel team/org ID or slug (defaults to VERCEL_ORG_ID)',
      '  --backend <mode>      Backend: auto | cli | api (default: auto)',
      '  --dry-run             Simulate deletions without removing any image',
      '  --no-dry-run          Execute real deletions (default)',
      '  --allow-missing-token Exit 0 with warning if VERCEL_TOKEN is unset (CI automatic runs)',
      '  -h, --help            Show this help message'
    ].join('\n')
  );
}

async function main(argv = process.argv.slice(2)) {
  const cliOptions = parseCliArgs(argv);
  if (cliOptions.help) {
    printHelp();
    return 0;
  }
  await runCleanup(cliOptions);
  return 0;
}

if (require.main === module) {
  main().then(
    (code) => {
      process.exitCode = code;
    },
    (error) => {
      const safeMessage = redactSecrets(error?.message || String(error), [process.env.VERCEL_TOKEN]);
      if (process.env.GITHUB_ACTIONS === 'true') {
        console.error(`::error::[vcr-cleanup] ${safeMessage}`);
      } else {
        console.error(`[vcr-cleanup] ERROR: ${safeMessage}`);
      }
      process.exitCode = error?.code === 'MISSING_VERCEL_TOKEN' ? 2 : 1;
    }
  );
}

module.exports = {
  DEFAULT_KEEP_COUNT,
  DEFAULT_REPOSITORY,
  DEFAULT_PROJECT,
  cleanInput,
  cleanToken,
  redactSecrets,
  parseBoolean,
  parseKeepCount,
  parseCliArgs,
  parseTimestamp,
  normalizeImage,
  sortImagesNewestFirst,
  planRetention,
  extractImagesFromPayload,
  extractJsonDocument,
  createCliAdapter,
  createApiAdapter,
  runCleanup,
  main
};
