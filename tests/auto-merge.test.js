'use strict';

const { readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { assert, includesAll } = require('./helpers/assert');

const root = path.resolve(__dirname, '..');
const read = (relative) => readFileSync(path.join(root, relative), 'utf8');

const workflow = read('.github/workflows/auto-merge.yml');
const helper = read('scripts/auto-merge-verified.sh');
const pages = read('.github/workflows/pages.yml');
const ciCd = read('.github/workflows/ci-cd.yml');
const ci = read('.github/workflows/ci.yml');
const prTests = read('.github/workflows/pr-tests.yml');
const docs = read('docs/cicd-auto-merge.md');

test('auto-merge workflow watches all test workflows and dispatches manually', () => {
  includesAll(workflow, [
    'workflow_run:',
    'types: [completed]',
    'CI — Backend, ASCII 3D Engine & Portfolio Integrity',
    'CI/CD — backend, Docker and deploy',
    'PR tests',
    'workflow_dispatch:'
  ]);
});

test('auto-merge has explicit write permissions and no approval step', () => {
  includesAll(workflow, [
    'contents: write',
    'pull-requests: write',
    'checks: read',
    'actions: write',
    'scripts/auto-merge-verified.sh'
  ]);
  assert.doesNotMatch(workflow, /pr review\s+.*approve|gh pr review/i);
});

test('helper merges only after checks and resolves conflicts via update-branch', () => {
  includesAll(helper, [
    'verify,test,Ruff + pytest,Docker build',
    'head_sha',
    'SUMMARY\\tREADY',
    'MERGEABLE',
    'CLEAN',
    'update-branch',
    'gh pr merge',
    '--merge'
  ]);
  assert.match(helper, /conclusion != "SUCCESS"/);
  assert.doesNotMatch(helper, /pr review\s+.*approve|gh pr review/i);
});

test('agent pipeline deletes the merged branch and dispatches both deploys', () => {
  includesAll(helper, [
    'PROTECTED_BRANCHES',
    'dev/portfolio',
    'dev/engine',
    'git/refs/heads',
    'DEPLOY_WORKFLOWS',
    'pages.yml,ci-cd.yml',
    'gh workflow run',
    '--ref main',
    '-f sha=',
    'Merge already in progress',
    'skipping cleanup and deploys',
    'already merged'
  ]);
});

test('Pages workflow uses official actions with explicit permissions and environment', () => {
  includesAll(pages, [
    'pages: write',
    'id-token: write',
    'contents: read',
    'environment:',
    'name: github-pages',
    'actions/configure-pages@v5',
    'actions/upload-pages-artifact@v3',
    'actions/deploy-pages@v4',
    '?v=$DEPLOY_SHA',
    'workflow_dispatch:',
    'DEPLOY_SHA'
  ]);
});

test('Pages artifact root includes parity SHA and browser assets', () => {
  includesAll(pages, [
    'test -f _site/index.html',
    'test -f _site/build.txt',
    'test -f _site/assets/css/style.css',
    'test -f _site/assets/js/engine-adapter.js',
    'test -f _site/assets/js/ascii-engine.bundle.js',
    'test -f _site/assets/cv/Eron_Yamamoto_Curriculo_BR_Pleno.pdf'
  ]);
});

test('CI workflows are manually dispatchable', () => {
  includesAll(ci, ['workflow_dispatch:', 'permissions:', 'contents: read']);
  includesAll(prTests, ['workflow_dispatch:', 'permissions:', 'contents: read']);
});

test('both deploy workflows accept an exact SHA from the auto-merge helper', () => {
  includesAll(pages, ['sha:', 'description: "Exact commit to publish', 'ref: ${{ env.DEPLOY_SHA }}']);
  includesAll(ciCd, [
    'sha:',
    'description: "Exact commit to build/deploy',
    'ref: ${{ env.DEPLOY_SHA }}',
    "github.event_name == 'workflow_dispatch'",
    'github.ref == \'refs/heads/main\''
  ]);
});

test('docs explain the one-time GitHub settings still outside the repository', () => {
  includesAll(docs, [
    'Settings → Pages → Build and deployment',
    'GitHub Actions',
    'Settings → Environments → github-pages',
    'Settings → Actions → General → Workflow permissions',
    'Read and write permissions',
    'Required reviews'
  ]);
});
