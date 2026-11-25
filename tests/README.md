# Test base (Node's built-in test runner + Python suites)

Zero external JS test framework dependencies and no build step required:
`node --test tests/*.test.js` runs every frontend, engine, i18n, VCR retention, and CI/CD contract suite.

```text
tests/
├── helpers/              # reusable assertions / fixtures
├── auto-merge.test.js    # permanent merge -> resolve-conflicts -> delete-branch -> redeploy invariants
├── ci.test.js            # GitHub Pages, Vercel parity, and workflow trigger contracts
├── engine.test.js        # AsciiSceneEngine facade, ECS, modes (day/night/rain), and per-object outline API
├── i18n.test.js          # pt-br / en dictionary parity, translation coverage, and real /api/v1 client checks
├── static.test.js        # static site invariants (local assets, sections, no external trackers/CDNs)
├── ui.test.js            # hero left-margin portrait, page brightness (130%), scene buttons, inert Tux stage
├── vcr-cleanup.test.js   # VCR "dockerfile" 3-image retention, dry-run, CLI/REST backends, and secret redaction
└── test_api.py           # legacy api/server.py unittest suite (6 tests) for root Dockerfile compatibility
```

Backend Modular Monolith suites (Phases 1–5: 66 `unit` and `integration` tests covering Redis/in-memory cache & queues, resilience/load bursts, live CI/CD & Docker pipeline inspectors + RCA, and hybrid/vector Console RAG) live in `backend/tests/` (`cd backend && pytest` + `ruff check .`).
Every suite runs automatically on pull requests and pushes to `main` via `.github/workflows/pr-tests.yml`, `.github/workflows/ci.yml`, and `.github/workflows/ci-cd.yml`.
