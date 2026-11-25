'use strict';

const { readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { assert } = require('./helpers/assert');

const root = path.resolve(__dirname, '..');
const pt = JSON.parse(readFileSync(path.join(root, 'assets/i18n/pt-br.json'), 'utf8'));
const en = JSON.parse(readFileSync(path.join(root, 'assets/i18n/en.json'), 'utf8'));
const html = readFileSync(path.join(root, 'index.html'), 'utf8');
const i18n = readFileSync(path.join(root, 'assets/js/i18n.js'), 'utf8');
const client = readFileSync(path.join(root, 'assets/js/api-client.js'), 'utf8');

test('pt-br is the primary language and dictionaries have identical keys', () => {
  assert.deepEqual(Object.keys(pt).sort(), Object.keys(en).sort());
  assert.ok(Object.keys(pt).length > 60);
  assert.match(i18n, /normalize\(stored \|\| 'pt-br'\)/);
});

test('HTML carries data-i18n hooks for labels and attributes', () => {
  assert.match(html, /id="lang-toggle"/);
  assert.match(html, /data-i18n-attr="data-text:hero.role"/);
  assert.match(html, /data-i18n="actions.cvPt"/);
  assert.match(html, /data-i18n="actions.cvEn"/);
  assert.match(html, /data-i18n-attr="alt:hero.portraitAlt"/);
  assert.match(html, /id="workflow-token"/);
});

test('api-client performs real /api/v1 requests only', () => {
  assert.match(client, /var BASE = 'api\/v1'/);
  assert.match(client, /fetch\(BASE \+ path, init\)/);
  assert.match(client, /gateway\/invoices\/submit/);
  assert.match(client, /workflows\/runs/);
  assert.doesNotMatch(client, /simulated|fallback\(\)|local-simulation/);
});

test('no phone numbers or invented GitHub URL in i18n strings', () => {
  const joined = JSON.stringify({ pt, en });
  assert.doesNotMatch(joined, /\+\d{2}\s?\(?\d{2}/);
  assert.doesNotMatch(joined, /github\.com\//i);
});
