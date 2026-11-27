'use strict';

const { readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { assert, includesAll } = require('./helpers/assert');

const root = path.resolve(__dirname, '..');
const pages = readFileSync(path.join(root, '.github/workflows/pages.yml'), 'utf8');
const pr = readFileSync(path.join(root, '.github/workflows/pr-tests.yml'), 'utf8');

test('Pages workflow deploys on pushes to main', () => {
  assert.match(pages, /push:\s*\n\s*branches:\s*\[main\]/);
  includesAll(pages, ['actions/upload-pages-artifact@v3', 'actions/deploy-pages@v4']);
});

test('post-deploy parity check is present and explicitly non-blocking', () => {
  includesAll(pages, [
    'needs: deploy',
    'continue-on-error: true',
    '/build.txt',
    '/api/v1/build',
    'Versions diverged'
  ]);
  assert.match(pages, /::warning::Versions diverged/);
});

test('PR workflow runs the modular test base', () => {
  includesAll(pr, ['pull_request:', 'node --test tests/*.test.js', 'node --check']);
});

test('Pages artifact is staged and verified by the versioned script', () => {
  const script = readFileSync(path.join(root, 'scripts/build-pages-site.sh'), 'utf8');

  // The workflow stays thin: one step, one script, artifact path unchanged.
  includesAll(pages, [
    'Stage and verify static artifact',
    'chmod +x scripts/build-pages-site.sh',
    './scripts/build-pages-site.sh',
    'path: _site'
  ]);
  assert.doesNotMatch(pages, /test -[fs] _site\/index\.html/, 'inline test -f chain replaced by the script');

  includesAll(script, [
    'index.html robots.txt sitemap.xml api-status.json assets docs',
    'cp -R "${STAGE[@]}" "$SITE/"',
    "$SITE/build.txt",
    'docs/ci-cd-pipeline.html',
    'assets/css/style.css',
    'assets/i18n/pt-br.json',
    'assets/i18n/en.json',
    'assets/js/api-client.js',
    'assets/js/engine-adapter.js',
    'assets/js/ascii-engine.bundle.js',
    'assets/cv/Eron_Yamamoto_Curriculo_BR_Pleno.pdf',
    'assets/cv/Eron_Yamamoto_Resume_EN.pdf',
    'assets/fonts/jetbrains-mono-latin-400-normal.woff2',
    'assets/draco/draco_decoder.js',
    'assets/draco/draco_decoder.wasm',
    'assets/draco/draco_wasm_wrapper.js'
  ]);

  // Regression guard: a renamed scene model used to break the deploy with a bare exit 1.
  // The model path comes from the adapter and every failure is named explicitly.
  includesAll(script, [
    'assets/models/[A-Za-z0-9_.-]+\\.glb',
    'assets/js/engine-adapter.js',
    'require_file "$MODEL"',
    '::error file=$rel::missing from _site',
    '::error file=$rel::empty or truncated in _site',
    'expected exactly 1 .glb in _site/assets/models'
  ]);
  assert.match(script, /set -uo pipefail/);
});

test('Pages staging script produces a complete artifact and names the failing file', () => {
  const { execFileSync } = require('node:child_process');
  const { existsSync, rmSync, statSync, unlinkSync } = require('node:fs');
  const os = require('node:os');

  const site = path.join(os.tmpdir(), `ancientstudio-pages-${process.pid}`);
  const scriptPath = path.join(root, 'scripts/build-pages-site.sh');
  const env = { ...process.env, DEPLOY_SHA: 'deadbeefdeadbeefdeadbeefdeadbeefdeadbeef', SITE_DIR: site };

  try {
    rmSync(site, { recursive: true, force: true });
    const out = execFileSync('bash', [scriptPath], { cwd: root, env, encoding: 'utf8' });
    assert.match(out, /Pages artifact root OK/);
    assert.doesNotMatch(out, /::error/);

    for (const rel of [
      'index.html',
      'build.txt',
      'assets/models/cena_completa.glb',
      'assets/js/ascii-engine.bundle.js',
      'assets/draco/draco_decoder.wasm'
    ]) {
      const full = path.join(site, rel);
      assert.ok(existsSync(full), `staged ${rel}`);
      assert.ok(statSync(full).size > 0, `staged ${rel} is non-empty`);
    }

    // Negative path: a model that was renamed/missing must fail and name the file.
    unlinkSync(path.join(site, 'assets/models/cena_completa.glb'));
    let failed = null;
    try {
      execFileSync('bash', [scriptPath], {
        cwd: root,
        env: { ...env, SKIP_STAGE: '1' },
        encoding: 'utf8',
        stdio: 'pipe'
      });
    } catch (error) {
      failed = error;
    }
    assert.ok(failed, 'verification must fail when the scene model is absent');
    const log = `${failed.stdout || ''}${failed.stderr || ''}`;
    assert.match(log, /::error file=assets\/models\/cena_completa\.glb::missing from _site/);
    assert.match(log, /Pages artifact incomplete/);
  } finally {
    rmSync(site, { recursive: true, force: true });
  }
});

test('backend CI workflow keeps the root Dockerfile and Vercel flow intact', () => {
  const ci = readFileSync(path.join(root, '.github/workflows/ci-cd.yml'), 'utf8');
  includesAll(ci, ['ruff check .', 'pytest', 'infra/docker/Dockerfile', 'VERCEL_TOKEN']);
  const dockerfile = readFileSync(path.join(root, 'Dockerfile'), 'utf8');
  assert.match(dockerfile, /api\/server\.py/);
  includesAll(dockerfile, [
    'COPY assets ./assets',
    'COPY docs ./docs',
    './docs/ci-cd-pipeline.html',
    './assets/models/cena_completa.glb',
    './assets/draco/draco_decoder.wasm'
  ]);
});

test('Pages parity helper is versioned and non-blocking by design', () => {
  const { readFileSync } = require('node:fs');
  const helper = readFileSync(path.join(root, 'scripts/verify-pages-parity.sh'), 'utf8');
  includesAll(helper, [
    'PAGES_URL',
    'VERCEL_URL',
    '/build.txt',
    '/api/v1/build',
    '?v=$cache_key',
    'PARITY OK'
  ]);
});
