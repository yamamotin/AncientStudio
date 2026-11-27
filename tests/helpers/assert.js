'use strict';

const assert = require('node:assert/strict');

/** Assert every substring appears in the given source text. */
function includesAll(source, fragments, message) {
  for (const fragment of fragments) {
    assert.ok(source.includes(fragment), `${message || 'missing fragment'}: ${fragment}`);
  }
}

/** Assert two numbers are within an optional epsilon tolerance. */
assert.AlmostEqual = function almostEqual(a, b, eps = 1e-3) {
  assert.ok(Math.abs(a - b) <= eps, `Expected ${a} ≈ ${b}`);
};

module.exports = { assert, includesAll };
