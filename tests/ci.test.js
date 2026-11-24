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

test('Pages artifact root is verified before deploy', () => {
  includesAll(pages, [
    'Verify static artifact root',
    'test -f _site/index.html',
    'assets/i18n/pt-br.json',
    'assets/js/api-client.js'
  ]);
});

test('backend CI workflow keeps the root Dockerfile and Vercel flow intact', () => {
  const ci = readFileSync(path.join(root, '.github/workflows/ci-cd.yml'), 'utf8');
  includesAll(ci, ['ruff check .', 'pytest', 'infra/docker/Dockerfile', 'VERCEL_TOKEN']);
  const dockerfile = readFileSync(path.join(root, 'Dockerfile'), 'utf8');
  assert.match(dockerfile, /api\/server\.py/);
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
