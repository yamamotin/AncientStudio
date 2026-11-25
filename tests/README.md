# Test base (Node's built-in test runner + Python suites)

Zero external JS test framework dependencies and no build step required:
`node --test tests/*.test.js` runs every frontend, engine, i18n, and CI/CD contract suite.

```text
tests/
├── helpers/              # reusable assertions / fixtures
├── auto-merge.test.js    # permanent merge -> resolve-conflicts -> delete-branch -> redeploy invariants
├── ci.test.js            # GitHub Pages, Vercel parity, and workflow trigger contracts
├── engine.test.js        # AsciiSceneEngine facade, ECS, modes (day/night/rain), and per-object outline API
├── i18n.test.js          # pt-br / en dictionary parity and translation coverage
├── static.test.js        # static site invariants (local assets, sections, no external trackers/CDNs)
├── ui.test.js            # hero left-margin portrait, page brightness (110%), scene buttons, inert Tux stage
└── test_api.py           # legacy api/server.py unittest suite for root Dockerfile compatibility
```

Backend Modular Monolith suites live in `backend/tests/` (`cd backend && pytest` + `ruff check .`).
Every suite runs automatically on pull requests and pushes to `main` via `.github/workflows/pr-tests.yml`, `.github/workflows/ci.yml`, and `.github/workflows/ci-cd.yml`.
