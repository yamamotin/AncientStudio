'use strict';

const { mkdtempSync, readFileSync, rmSync, writeFileSync, chmodSync } = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const { assert, includesAll } = require('./helpers/assert');

const {
  MIN_PROTECTED_IMAGES,
  VcrCleanupError,
  redactSecrets,
  parseCliArgs,
  sortImagesNewestFirst,
  planRetention,
  createRestApiAdapter,
  createCliAdapter,
  runCleanup
} = require('../scripts/vcr-cleanup.js');

const root = path.resolve(__dirname, '..');
const workflow = readFileSync(path.join(root, '.github/workflows/vcr-cleanup.yml'), 'utf8');
const scriptPath = path.join(root, 'scripts/vcr-cleanup.js');

test('vcr-cleanup workflow configures dispatch, automatic triggers, least privilege, and secret hygiene', () => {
  includesAll(workflow, [
    'workflow_dispatch:',
    'dry_run:',
    'deployment_status:',
    'schedule:',
    'contents: read',
    'cancel-in-progress: false',
    'secrets.VERCEL_TOKEN',
    'secrets.VERCEL_ORG_ID',
    'secrets.VERCEL_PROJECT_ID',
    'VCR_KEEP_COUNT: "3"',
    'node scripts/vcr-cleanup.js'
  ]);
  assert.doesNotMatch(workflow, /echo\s+.*\$\{\{\s*secrets\./i);
  assert.doesNotMatch(workflow, /--token\s+\$\{\{\s*secrets\./i);
});

test('sortImagesNewestFirst and planRetention preserve strictly [0..2] and mark [3..] for deletion', () => {
  const unordered = [
    { id: 'img_oldest_5', createdAt: '2026-11-20T10:00:00.000Z', status: 'ready' },
    { id: 'img_third_2', createdAt: '2026-11-25T01:00:00.000Z', status: 'ready' },
    { id: 'img_newest_0', createdAt: '2026-11-25T03:50:00.000Z', status: 'ready' },
    { id: 'img_fourth_3', createdAt: '2026-11-24T18:30:00.000Z', status: 'ready' },
    { id: 'img_second_1', createdAt: '2026-11-25T02:15:00.000Z', status: 'ready' },
    { id: 'img_fifth_4', createdAt: '2026-11-22T08:00:00.000Z', status: 'ready' }
  ];

  const sorted = sortImagesNewestFirst(unordered);
  assert.deepEqual(
    sorted.map((img) => img.id),
    [
      'img_newest_0',
      'img_second_1',
      'img_third_2',
      'img_fourth_3',
      'img_fifth_4',
      'img_oldest_5'
    ]
  );

  const plan = planRetention(unordered, 3);
  assert.equal(plan.toKeep.length, 3);
  assert.deepEqual(
    plan.toKeep.map((img) => img.id),
    ['img_newest_0', 'img_second_1', 'img_third_2']
  );
  assert.deepEqual(
    plan.toDelete.map((img) => img.id),
    ['img_fourth_3', 'img_fifth_4', 'img_oldest_5']
  );
});

test('runCleanup performs zero deletions when repository has 0, 1, 2, or 3 images', async () => {
  const sample = [
    { id: 'img_a', createdAt: '2026-11-25T03:00:00Z' },
    { id: 'img_b', createdAt: '2026-11-25T02:00:00Z' },
    { id: 'img_c', createdAt: '2026-11-25T01:00:00Z' }
  ];

  for (const count of [0, 1, 2, 3]) {
    const deleted = [];
    const logs = [];
    const adapter = {
      name: 'mock',
      async listAllImages() {
        return { images: sample.slice(0, count), repositoryMissing: false };
      },
      async deleteImage(_repo, id) {
        deleted.push(id);
      }
    };

    const result = await runCleanup(
      parseCliArgs([], { VERCEL_TOKEN: 'tok_secret_value_12345' }),
      { adapter, logger: (line) => logs.push(line), stepSummaryPath: '' }
    );

    assert.equal(deleted.length, 0, `expected 0 deletions for count=${count}`);
    assert.equal(result.keptIds.length, count);
    assert.equal(result.deletedIds.length, 0);
    assert.ok(logs.some((line) => /Retention (limit|satisfied)/.test(line)));
  }
});

test('dry-run mode logs KEEP and WOULD_DELETE image IDs without executing any deletion', async () => {
  const deleted = [];
  const logs = [];
  const tmpDir = mkdtempSync(path.join(os.tmpdir(), 'vcr-summary-'));
  const summaryFile = path.join(tmpDir, 'summary.md');

  try {
    const adapter = {
      name: 'mock',
      async listAllImages() {
        return {
          images: [
            { id: 'img_4', createdAt: '2026-11-21T00:00:00Z', status: 'ready', sizeInBytes: 10485760 },
            { id: 'img_0', createdAt: '2026-11-25T00:00:00Z', status: 'ready', tags: ['latest'] },
            { id: 'img_2', createdAt: '2026-11-23T00:00:00Z', status: 'ready' },
            { id: 'img_1', createdAt: '2026-11-24T00:00:00Z', status: 'ready' },
            { id: 'img_3', createdAt: '2026-11-22T00:00:00Z', status: 'ready' }
          ],
          repositoryMissing: false
        };
      },
      async deleteImage(_repo, id) {
        deleted.push(id);
      }
    };

    const options = parseCliArgs(['--dry-run'], { VERCEL_TOKEN: 'tok_secret_value_12345' });
    const result = await runCleanup(options, {
      adapter,
      logger: (line) => logs.push(line),
      stepSummaryPath: summaryFile
    });

    assert.equal(deleted.length, 0);
    assert.deepEqual(result.keptIds, ['img_0', 'img_1', 'img_2']);
    assert.deepEqual(result.candidateDeleteIds, ['img_3', 'img_4']);
    assert.deepEqual(result.deletedIds, []);

    const joinedLogs = logs.join('\n');
    includesAll(joinedLogs, [
      '[0] KEEP',
      'id=img_0',
      '[1] KEEP',
      'id=img_1',
      '[2] KEEP',
      'id=img_2',
      '[3] WOULD_DELETE',
      'id=img_3',
      '[4] WOULD_DELETE',
      'id=img_4',
      'DRY-RUN complete'
    ]);

    const summary = readFileSync(summaryFile, 'utf8');
    includesAll(summary, ['DRY-RUN', '`img_0`', '`img_3`', 'WOULD_DELETE']);
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('safety guardrails reject keepCount < 3 and unparseable image timestamps', () => {
  assert.equal(MIN_PROTECTED_IMAGES, 3);
  assert.throws(
    () => planRetention([{ id: 'img_1', createdAt: '2026-11-25T00:00:00Z' }], 2),
    (err) => err instanceof VcrCleanupError && err.code === 'INVALID_RETENTION'
  );
  assert.throws(
    () => sortImagesNewestFirst([{ id: 'img_bad', createdAt: 'not-a-timestamp' }]),
    (err) => err instanceof VcrCleanupError && err.code === 'INVALID_TIMESTAMP'
  );
  assert.throws(
    () => sortImagesNewestFirst([{ id: 'img_missing' }]),
    (err) => err instanceof VcrCleanupError && err.code === 'MISSING_TIMESTAMP'
  );
});

test('REST API adapter auto-resolves ancientstudio scope, paginates pages, and deletes only [3..]', async () => {
  const deletedCalls = [];
  const authHeadersSeen = [];

  const mockFetch = async (url, init = {}) => {
    authHeadersSeen.push(init.headers?.Authorization || '');
    const parsed = new URL(url);

    if (parsed.pathname === '/v2/teams') {
      return new Response(JSON.stringify({ teams: [{ id: 'team_demo_123', slug: 'demo-team' }] }), {
        status: 200
      });
    }
    if (parsed.pathname === '/v9/projects/ancientstudio') {
      assert.equal(parsed.searchParams.get('teamId'), 'team_demo_123');
      return new Response(
        JSON.stringify({ id: 'prj_demo_456', name: 'ancientstudio', accountId: 'team_demo_123' }),
        { status: 200 }
      );
    }
    if (parsed.pathname === '/v1/vcr/repository/dockerfile/images' && (init.method || 'GET') === 'GET') {
      const cursor = parsed.searchParams.get('cursor');
      if (!cursor) {
        return new Response(
          JSON.stringify({
            images: [
              { id: 'img_p1_old', createdAt: '2026-11-20T00:00:00Z' },
              { id: 'img_p1_top2', createdAt: '2026-11-25T02:00:00Z' },
              { id: 'img_p1_top1', createdAt: '2026-11-25T03:00:00Z' }
            ],
            nextCursor: 'cursor_page_2'
          }),
          { status: 200 }
        );
      }
      if (cursor === 'cursor_page_2') {
        return new Response(
          JSON.stringify({
            images: [
              // Duplicate across boundary + global #3 + older image
              { id: 'img_p1_top2', createdAt: '2026-11-25T02:00:00Z' },
              { id: 'img_p2_top3', createdAt: '2026-11-25T01:00:00Z' },
              { id: 'img_p2_older', createdAt: '2026-11-21T00:00:00Z' }
            ],
            nextCursor: null
          }),
          { status: 200 }
        );
      }
    }
    if (parsed.pathname.startsWith('/v1/vcr/repository/dockerfile/images/') && init.method === 'DELETE') {
      const id = decodeURIComponent(parsed.pathname.split('/').pop());
      deletedCalls.push(id);
      return new Response(JSON.stringify({ deleted: true, imageId: id }), { status: 200 });
    }

    return new Response(JSON.stringify({ error: { message: `Unexpected ${url}` } }), { status: 500 });
  };

  const adapter = createRestApiAdapter({
    token: 'ver_secret_api_token_999',
    project: 'ancientstudio',
    scope: '',
    fetchImpl: mockFetch
  });

  const logs = [];
  const result = await runCleanup(
    parseCliArgs(['--backend', 'api'], { VERCEL_TOKEN: 'ver_secret_api_token_999' }),
    { adapter, logger: (line) => logs.push(line), stepSummaryPath: '' }
  );

  assert.ok(authHeadersSeen.every((h) => h === 'Bearer ver_secret_api_token_999'));
  assert.deepEqual(result.keptIds, ['img_p1_top1', 'img_p1_top2', 'img_p2_top3']);
  assert.deepEqual(deletedCalls, ['img_p2_older', 'img_p1_old']);
  assert.deepEqual(result.deletedIds, ['img_p2_older', 'img_p1_old']);
  assert.ok(!logs.join('\n').includes('ver_secret_api_token_999'));
});

test('CLI adapter invokes `vercel vcr image ls` and `vercel vcr image delete --yes` without leaking token on argv', async () => {
  const tmpDir = mkdtempSync(path.join(os.tmpdir(), 'fake-vercel-cli-'));
  const fakeVercel = path.join(tmpDir, 'vercel');
  const invocationsLog = path.join(tmpDir, 'invocations.jsonl');

  writeFileSync(
    fakeVercel,
    `#!/usr/bin/env node
'use strict';
const { appendFileSync } = require('node:fs');
const argv = process.argv.slice(2);
appendFileSync(${JSON.stringify(invocationsLog)}, JSON.stringify({ argv, hasEnvToken: Boolean(process.env.VERCEL_TOKEN) }) + '\\n');
if (argv.includes('--version')) {
  console.log('66.6.0');
  process.exit(0);
}
if (argv[0] === 'vcr' && argv[1] === 'image' && argv[2] === 'ls') {
  console.log(JSON.stringify({
    images: [
      { id: 'img_keep_0', createdAt: '2026-11-25T05:00:00Z', status: 'ready' },
      { id: 'img_del_3', createdAt: '2026-11-22T05:00:00Z', status: 'ready' },
      { id: 'img_keep_1', createdAt: '2026-11-25T04:00:00Z', status: 'ready' },
      { id: 'img_keep_2', createdAt: '2026-11-25T03:00:00Z', status: 'ready' }
    ],
    pagination: { next: null }
  }));
  process.exit(0);
}
if (argv[0] === 'vcr' && argv[1] === 'image' && argv[2] === 'delete') {
  const imageId = argv[4];
  console.log(JSON.stringify({ imageId, repository: argv[3], deleted: true }));
  process.exit(0);
}
process.exit(2);
`,
    'utf8'
  );
  chmodSync(fakeVercel, 0o755);

  try {
    const secretToken = 'vcp_super_secret_cli_token_777';
    const adapter = createCliAdapter({
      token: secretToken,
      project: 'ancientstudio',
      scope: 'team_org_123',
      vercelBin: fakeVercel
    });

    const logs = [];
    const result = await runCleanup(
      parseCliArgs(['--backend', 'cli', '--scope', 'team_org_123'], {
        VERCEL_TOKEN: secretToken,
        VERCEL_BIN: fakeVercel
      }),
      { adapter, logger: (line) => logs.push(line), stepSummaryPath: '' }
    );

    assert.deepEqual(result.keptIds, ['img_keep_0', 'img_keep_1', 'img_keep_2']);
    assert.deepEqual(result.deletedIds, ['img_del_3']);

    const records = readFileSync(invocationsLog, 'utf8')
      .trim()
      .split('\n')
      .map((line) => JSON.parse(line));

    assert.equal(records.length, 2);
    for (const rec of records) {
      assert.equal(rec.hasEnvToken, true, 'VERCEL_TOKEN passed via env');
      assert.ok(!rec.argv.includes('--token'), 'token flag never passed on argv');
      assert.ok(!rec.argv.join(' ').includes(secretToken), 'secret never appears in argv');
    }
    includesAll(records[0].argv.join(' '), ['vcr image ls dockerfile --json', '--project ancientstudio', '--scope team_org_123']);
    includesAll(records[1].argv.join(' '), ['vcr image delete dockerfile img_del_3 --yes --json']);
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('CLI entrypoint fails clearly on missing VERCEL_TOKEN and redacts leaked secrets on error', () => {
  const missingTokenRun = spawnSync(process.execPath, [scriptPath], {
    env: { PATH: process.env.PATH, VERCEL_TOKEN: '' },
    encoding: 'utf8'
  });
  assert.equal(missingTokenRun.status, 2);
  assert.match(missingTokenRun.stderr, /Missing VERCEL_TOKEN/);

  const leaked = 'vcp_sensitive_token_abcdef12345';
  const scrubbed = redactSecrets(
    `Request failed with Authorization: Bearer ${leaked} and raw ${leaked}`,
    [leaked]
  );
  assert.ok(!scrubbed.includes(leaked));
  assert.match(scrubbed, /\[REDACTED\]/);
});
