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
