'use strict';

const assert = require('node:assert/strict');

/** Assert every substring appears in the given source text. */
function includesAll(source, fragments, message) {
  for (const fragment of fragments) {
    assert.ok(source.includes(fragment), `${message || 'missing fragment'}: ${fragment}`);
  }
}

module.exports = { assert, includesAll };
