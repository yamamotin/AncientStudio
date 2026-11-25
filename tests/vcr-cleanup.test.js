'use strict';

const { mkdtempSync, readFileSync, rmSync } = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { assert, includesAll } = require('./helpers/assert');

const {
  DEFAULT_KEEP_COUNT,
  DEFAULT_REPOSITORY,
  DEFAULT_PROJECT,
  cleanToken,
  redactSecrets,
  parseBoolean,
  parseKeepCount,
  parseCliArgs,
  planRetention,
  extractJsonDocument,
  createCliAdapter,
  createApiAdapter,
  runCleanup
} = require('../scripts/vcr-cleanup');

const root = path.resolve(__dirname, '..');
const workflow = readFileSync(path.join(root, '.github/workflows/vcr-cleanup.yml'), 'utf8');
const ciCdWorkflow = readFileSync(path.join(root, '.github/workflows/ci-cd.yml'), 'utf8');
const docs = readFileSync(path.join(root, 'docs/vcr-cleanup.md'), 'utf8');

test('VCR cleanup workflow uses filtered triggers without deployment_status spam', () => {
  assert.equal(DEFAULT_KEEP_COUNT, 3);
  assert.equal(DEFAULT_REPOSITORY, 'dockerfile');
  assert.equal(DEFAULT_PROJECT, 'ancientstudio');

  includesAll(workflow, [
    'name: VCR Image Retention Cleanup',
    'workflow_run:',
    'CI/CD — backend, Docker and deploy',
    'types: [completed]',
    'branches: [main]',
    'workflow_call:',
    'schedule:',
    'cron:',
    'workflow_dispatch:',
    'dry_run:',
    'permissions:',
    'contents: read',
    'concurrency:',
    'cancel-in-progress: false',
    "github.event.workflow_run.conclusion == 'success'",
    "github.event.workflow_run.head_branch == 'main'",
    'secrets.VERCEL_TOKEN',
    'secrets.VERCEL_ORG_ID || vars.VERCEL_ORG_ID',
    'secrets.VERCEL_PROJECT_ID || vars.VERCEL_PROJECT_ID',
    'ALLOW_MISSING_TOKEN:',
    'node scripts/vcr-cleanup.js'
  ]);

  // Must NOT trigger on intermediate deployment_status events or premature raw push.
  assert.doesNotMatch(workflow, /^\s*deployment_status\s*:/m);
  assert.doesNotMatch(workflow, /^\s*push\s*:/m);
});

test('ci-cd workflow invokes vcr-cleanup after workflow_dispatch deploy on main', () => {
  includesAll(ciCdWorkflow, [
    'vcr-cleanup:',
    'needs: deploy',
    "github.event_name == 'workflow_dispatch'",
    "github.ref == 'refs/heads/main'",
    'uses: ./.github/workflows/vcr-cleanup.yml',
    'allow_missing_token: true',
    'secrets: inherit'
  ]);
});

test('planRetention strictly keeps indices [0..2] and removes [3..] newest-first', () => {
  const images = [
    { id: 'img_oldest', createdAt: '2026-11-20T10:00:00.000Z', tags: ['v1'] },
    { id: 'img_newest', createdAt: '2026-11-25T10:00:00.000Z', tags: ['latest'] },
    // Historical deployment metadata must NOT pin surplus images beyond index [2].
    {
      id: 'img_fourth',
      createdAt: '2026-11-22T10:00:00.000Z',
      status: 'ready',
      deployments: [{ id: 'dpl_old', state: 'READY' }]
    },
    { id: 'img_second', createdAt: '2026-11-24T10:00:00.000Z', tags: ['v4'] },
    { id: 'img_fifth', createdAt: '2026-11-21T10:00:00.000Z', tags: ['v2'] },
    { id: 'img_third', createdAt: '2026-11-23T10:00:00.000Z', tags: ['v3'] },
    // Duplicate page-boundary item should be deduplicated.
    { id: 'img_second', createdAt: '2026-11-24T10:00:00.000Z', tags: ['v4'] }
  ];

  const plan = planRetention(images, 3);
  assert.equal(plan.total, 6);
  assert.deepEqual(
    plan.keep.map((i) => [i.rank, i.id]),
    [
      [0, 'img_newest'],
      [1, 'img_second'],
      [2, 'img_third']
    ]
  );
  assert.deepEqual(
    plan.remove.map((i) => [i.rank, i.id]),
    [
      [3, 'img_fourth'],
      [4, 'img_fifth'],
      [5, 'img_oldest']
    ]
  );
});

test('runCleanup exits cleanly without deletions when image count is <= 3', async () => {
  for (const count of [0, 1, 2, 3]) {
    let deleteCalls = 0;
    const logs = [];
    const items = Array.from({ length: count }, (_, idx) => ({
      id: `img_${idx + 1}`,
      createdAt: `2026-11-2${idx + 1}T00:00:00.000Z`
    }));

    const result = await runCleanup({
      adapter: {
        name: 'mock',
        async listImages() {
          return items;
        },
        async deleteImage() {
          deleteCalls += 1;
        }
      },
      keepCount: 3,
      logger: (line) => logs.push(line)
    });

    assert.equal(result.status, 'noop');
    assert.equal(result.exitCode, 0);
    assert.equal(result.kept.length, count);
    assert.equal(result.deleted.length, 0);
    assert.equal(deleteCalls, 0);
    assert.ok(logs.some((line) => line.includes('Nothing to delete')));
  }
});

test('runCleanup deletes only [3..] in live mode and logs WOULD_DELETE in dry-run mode', async () => {
  const fixture = [
    { id: 'img_1', manifestDigest: 'sha256:111111111111aaaa', createdAt: 1700001000 },
    { id: 'img_2', manifestDigest: 'sha256:222222222222bbbb', createdAt: 1700002000 },
    { id: 'img_3', manifestDigest: 'sha256:333333333333cccc', createdAt: 1700003000 },
    { id: 'img_4', manifestDigest: 'sha256:444444444444dddd', createdAt: 1700004000 },
    { id: 'img_5', manifestDigest: 'sha256:555555555555eeee', createdAt: 1700005000 }
  ];

  const tmpDir = mkdtempSync(path.join(os.tmpdir(), 'vcr-summary-'));
  const summaryFile = path.join(tmpDir, 'summary.md');

  try {
    const dryDeleted = [];
    const dryLogs = [];
    const dryResult = await runCleanup({
      adapter: {
        name: 'mock',
        async listImages() {
          return fixture;
        },
        async deleteImage(img) {
          dryDeleted.push(img.id);
        }
      },
      dryRun: true,
      keepCount: 3,
      summaryPath: summaryFile,
      logger: (msg) => dryLogs.push(msg)
    });

    assert.equal(dryResult.status, 'dry-run');
    assert.equal(dryDeleted.length, 0, 'dry-run must never call deleteImage');
    assert.deepEqual(dryResult.kept.map((i) => i.id), ['img_5', 'img_4', 'img_3']);
    assert.deepEqual(dryResult.deleted.map((i) => i.id), ['img_2', 'img_1']);
    assert.ok(dryLogs.some((l) => l.includes('KEEP [0] id=img_5')));
    assert.ok(dryLogs.some((l) => l.includes('WOULD_DELETE [3] id=img_2')));
    assert.ok(dryLogs.some((l) => l.includes('WOULD_DELETE [4] id=img_1')));

    const liveDeleted = [];
    const liveLogs = [];
    const liveResult = await runCleanup({
      adapter: {
        name: 'mock',
        async listImages() {
          return fixture;
        },
        async deleteImage(img) {
          liveDeleted.push(img.id);
        }
      },
      dryRun: false,
      keepCount: 3,
      summaryPath: summaryFile,
      logger: (msg) => liveLogs.push(msg)
    });

    assert.equal(liveResult.status, 'pruned');
    assert.deepEqual(liveResult.kept.map((i) => i.id), ['img_5', 'img_4', 'img_3']);
    assert.deepEqual(liveDeleted, ['img_2', 'img_1']);
    assert.ok(liveLogs.some((l) => l.includes('DELETE [3] id=img_2')));
    assert.ok(liveLogs.some((l) => l.includes('DELETE [4] id=img_1')));

    const summaryContent = readFileSync(summaryFile, 'utf8');
    includesAll(summaryContent, ['VCR Image Retention Cleanup', '[0] img_5', '[3] img_2']);
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('runCleanup continues deleting remaining surplus images if one deletion fails', async () => {
  const attempted = [];
  const warnings = [];
  const fixture = [
    { id: 'img_5', createdAt: 5000 },
    { id: 'img_4', createdAt: 4000 },
    { id: 'img_3', createdAt: 3000 },
    { id: 'img_2_locked', createdAt: 2000 },
    { id: 'img_1_deletable', createdAt: 1000 }
  ];

  await assert.rejects(
    () =>
      runCleanup({
        adapter: {
          name: 'mock',
          async listImages() {
            return fixture;
          },
          async deleteImage(img) {
            attempted.push(img.id);
            if (img.id === 'img_2_locked') {
              throw new Error('HTTP 409 image currently locked');
            }
          }
        },
        keepCount: 3,
        logger: () => {},
        warnLogger: (msg) => warnings.push(msg)
      }),
    (err) => err.code === 'VCR_DELETE_FAILED' && /img_2_locked/.test(err.message)
  );

  assert.deepEqual(attempted, ['img_2_locked', 'img_1_deletable']);
  assert.equal(warnings.length, 1);
});

test('createCliAdapter paginates with --next, never passes token in argv, and deletes [3..]', async () => {
  const calls = [];
  const envSnapshots = [];
  const adapter = createCliAdapter({
    token: '  "vcp_secret_token_999\n"  ',
    scope: 'team_3I0m4Qd129KEjCoB5ZSXlXrB',
    project: 'ancientstudio',
    repository: 'dockerfile',
    vercelBin: 'vercel',
    execFileImpl: async (bin, args, opts) => {
      calls.push({ bin, args });
      envSnapshots.push(opts.env.VERCEL_TOKEN);
      if (args.includes('ls')) {
        assert.ok(!args.includes('--cursor'), 'must use --next rather than deprecated --cursor');
        const hasNext = args.includes('--next');
        if (!hasNext) {
          return {
            stdout:
              'Vercel CLI 66.6.0\n' +
              JSON.stringify({
                images: [
                  { id: 'img_a', createdAt: '2026-11-25T05:00:00Z' },
                  { id: 'img_b', createdAt: '2026-11-24T05:00:00Z' }
                ],
                pagination: { next: 'cursor_page_2' }
              })
          };
        }
        return {
          stdout: JSON.stringify({
            images: [
              { id: 'img_c', createdAt: '2026-11-23T05:00:00Z' },
              { id: 'img_d', createdAt: '2026-11-22T05:00:00Z' }
            ],
            pagination: { next: null }
          })
        };
      }
      if (args.includes('delete')) {
        return { stdout: '{"deleted":true}' };
      }
      throw new Error(`Unexpected command: ${args.join(' ')}`);
    }
  });

  const res = await runCleanup({
    adapter,
    keepCount: 3,
    dryRun: false,
    logger: () => {}
  });

  assert.equal(res.total, 4);
  assert.deepEqual(res.kept.map((i) => i.id), ['img_a', 'img_b', 'img_c']);
  assert.deepEqual(res.deleted.map((i) => i.id), ['img_d']);
  assert.equal(calls.length, 3);
  assert.equal(envSnapshots[0], 'vcp_secret_token_999');

  for (const call of calls) {
    assert.ok(!call.args.join(' ').includes('vcp_secret_token_999'), 'token must never be in argv');
  }
  assert.ok(calls[1].args.includes('--next'));
  assert.ok(calls[2].args.includes('delete'));
  assert.ok(calls[2].args.includes('img_d'));
  assert.ok(calls[2].args.includes('--yes'));
});

test('createApiAdapter discovers Northstar team when VERCEL_ORG_ID is omitted and handles 404 delete', async () => {
  const requests = [];
  const adapter = createApiAdapter({
    token: 'vcp_api_token_abc123\r\n',
    scope: '',
    project: 'ancientstudio',
    repository: 'dockerfile',
    apiBase: 'https://api.vercel.com',
    fetchImpl: async (url, init) => {
      requests.push({ method: init.method, url, auth: init.headers.Authorization });
      const parsed = new URL(url);

      // Simulate Northstar token where unscoped /v9/projects/ancientstudio returns 404
      if (parsed.pathname === '/v9/projects/ancientstudio' && !parsed.searchParams.get('teamId')) {
        return {
          ok: false,
          status: 404,
          text: async () => JSON.stringify({ error: { message: 'Project not found' } })
        };
      }
      if (parsed.pathname === '/v2/user') {
        return {
          ok: true,
          status: 200,
          text: async () => JSON.stringify({ user: { id: 'uid_1', defaultTeamId: null } })
        };
      }
      if (parsed.pathname === '/v2/teams') {
        return {
          ok: true,
          status: 200,
          text: async () =>
            JSON.stringify({
              teams: [{ id: 'team_3I0m4Qd129KEjCoB5ZSXlXrB', slug: 'yamah1337-7674' }]
            })
        };
      }
      if (
        parsed.pathname === '/v9/projects/ancientstudio' &&
        parsed.searchParams.get('teamId') === 'team_3I0m4Qd129KEjCoB5ZSXlXrB'
      ) {
        return {
          ok: true,
          status: 200,
          text: async () =>
            JSON.stringify({
              id: 'prj_AeJPwi2sV6piaskbKcyRd7vyCJwJ',
              accountId: 'team_3I0m4Qd129KEjCoB5ZSXlXrB'
            })
        };
      }
      if (init.method === 'GET' && parsed.pathname === '/v1/vcr/repository/dockerfile/images') {
        assert.equal(parsed.searchParams.get('teamId'), 'team_3I0m4Qd129KEjCoB5ZSXlXrB');
        assert.equal(parsed.searchParams.get('projectId'), 'prj_AeJPwi2sV6piaskbKcyRd7vyCJwJ');
        return {
          ok: true,
          status: 200,
          text: async () =>
            JSON.stringify({
              images: [
                { id: 'img_1', createdAt: '2026-11-21T00:00:00Z' },
                { id: 'img_2', createdAt: '2026-11-22T00:00:00Z' },
                { id: 'img_3', createdAt: '2026-11-23T00:00:00Z' },
                { id: 'img_4', createdAt: '2026-11-24T00:00:00Z' },
                { id: 'img_5', createdAt: '2026-11-25T00:00:00Z' }
              ],
              nextCursor: null
            })
        };
      }
      if (init.method === 'DELETE' && parsed.pathname.endsWith('/img_1')) {
        return { ok: false, status: 404, text: async () => '{"error":{"message":"Not found"}}' };
      }
      if (init.method === 'DELETE') {
        return { ok: true, status: 200, text: async () => '{"deleted":true}' };
      }
      throw new Error(`Unexpected URL: ${url}`);
    }
  });

  const result = await runCleanup({
    adapter,
    keepCount: 3,
    dryRun: false,
    logger: () => {}
  });

  assert.equal(result.status, 'pruned');
  assert.deepEqual(result.kept.map((i) => i.id), ['img_5', 'img_4', 'img_3']);
  assert.deepEqual(result.deleted.map((i) => i.id), ['img_2', 'img_1']);
  assert.equal(requests[0].auth, 'Bearer vcp_api_token_abc123');
});

test('auto backend falls back from failing CLI to REST API seamlessly', async () => {
  const warnings = [];
  const result = await runCleanup({
    token: 'vcp_fallback_test_token',
    backend: 'auto',
    hasCliImpl: () => true,
    cliAdapter: {
      name: 'cli',
      async listImages() {
        throw new Error('CLI failed with vcp_fallback_test_token');
      }
    },
    apiAdapter: {
      name: 'api',
      async listImages() {
        return [
          { id: 'img_4', createdAt: 4000 },
          { id: 'img_3', createdAt: 3000 },
          { id: 'img_2', createdAt: 2000 },
          { id: 'img_1', createdAt: 1000 }
        ];
      },
      async deleteImage() {}
    },
    keepCount: 3,
    logger: () => {},
    warnLogger: (msg) => warnings.push(msg)
  });

  assert.equal(result.backend, 'api');
  assert.equal(result.status, 'pruned');
  assert.deepEqual(result.deleted.map((i) => i.id), ['img_1']);
  assert.equal(warnings.length, 1);
  assert.ok(!warnings[0].includes('vcp_fallback_test_token'), 'warning must redact token');
  assert.ok(warnings[0].includes('[REDACTED]'));
});

test('missing VERCEL_TOKEN fails on manual runs and skips cleanly when allowMissingToken=true', async () => {
  await assert.rejects(
    () => runCleanup({ token: '', allowMissingToken: false, logger: () => {} }),
    (err) => err.code === 'MISSING_VERCEL_TOKEN' && /VERCEL_TOKEN/.test(err.message)
  );

  const warnings = [];
  const skipped = await runCleanup({
    token: '   ',
    allowMissingToken: true,
    logger: () => {},
    warnLogger: (msg) => warnings.push(msg)
  });
  assert.equal(skipped.status, 'skipped-no-token');
  assert.equal(skipped.exitCode, 0);
  assert.ok(warnings.some((w) => w.includes('VERCEL_TOKEN')));
});

test('helpers sanitize tokens, redact secrets, and validate CLI flags', () => {
  assert.equal(cleanToken('  "vcp_abc123\r\n" '), 'vcp_abc123');
  assert.equal(
    redactSecrets('Auth Bearer mySecret999 failed with --token=mySecret999', ['mySecret999']),
    'Auth Bearer [REDACTED] failed with --token=[REDACTED]'
  );

  assert.equal(parseBoolean('true'), true);
  assert.equal(parseBoolean('0', true), false);
  assert.equal(parseKeepCount('3'), 3);
  assert.throws(() => parseKeepCount('0'), /Invalid KEEP_COUNT/);
  assert.throws(() => parseKeepCount('3.5'), /Invalid KEEP_COUNT/);
  assert.throws(() => parseKeepCount('abc'), /Invalid KEEP_COUNT/);

  const cli = parseCliArgs([
    '--dry-run',
    '--allow-missing-token',
    '--keep',
    '3',
    '--repository=dockerfile',
    '--backend=api'
  ]);
  assert.equal(cli.dryRun, true);
  assert.equal(cli.allowMissingToken, true);
  assert.equal(cli.keepCount, '3');
  assert.equal(cli.repository, 'dockerfile');
  assert.equal(cli.backend, 'api');

  const doc = extractJsonDocument('Notice banner\n{"images":[{"id":"img_1"}]}');
  assert.equal(doc.images[0].id, 'img_1');
  assert.match(docs, /VERCEL_TOKEN/);
  assert.match(docs, /team_3I0m4Qd129KEjCoB5ZSXlXrB/);
  assert.match(docs, /prj_AeJPwi2sV6piaskbKcyRd7vyCJwJ/);
});
