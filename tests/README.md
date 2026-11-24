# Test base (Node's built-in test runner)

Modular structure for future automated PR checks. No test framework dependency and no
build step: `node --test tests/*.test.js` runs every `tests/**/*.test.js` file.

```
tests/
├── helpers/            # reusable assertions / fixtures for future suites
├── static.test.js      # static site invariants (paths, sections, no trackers)
└── engine.test.js      # public facade contract and config presets
```

Every test added under this folder runs automatically in the `test` job of
`.github/workflows/pr-tests.yml` on pull requests and pushes to `main`.
