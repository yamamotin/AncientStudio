# Suítes de Teste da Raiz (Node nativo + Python unittest)

Estrutura modular executada automaticamente em PRs e pushes para `main` (`.github/workflows/pr-tests.yml` e `.github/workflows/ci.yml`), sem dependências externas de runner:

```text
tests/
├── helpers/            # Asserções reutilizáveis para as suítes Node
├── auto-merge.test.js  # Invariantes da ordem permanente (merge -> delete-branch -> redeploy) e workflows
├── ci.test.js          # Contratos de publicação do GitHub Pages, paridade SHA e Dockerfile raiz
├── engine.test.js      # Fachada pública, ECS, Tux 3D, modos Dia/Noite/Chuva, sombras PCF e contorno por objeto
├── i18n.test.js        # Paridade pt-br/en, hooks data-i18n e cliente real /api/v1 sem simulações
├── static.test.js      # Caminhos relativos seguros para file://, seções obrigatórias e zero trackers/CDN
├── ui.test.js          # Fullscreen, retrato no hero, modos de cena, brilho (110%) e rotação autônoma do Tux
└── test_api.py         # Contratos legados do servidor estático api/server.py (python3 -m unittest)
```

Os testes do backend FastAPI modular (66 testes `unit` e `integration`, incluindo resiliência/carga, simulador de pipelines e Console RAG) residem em `backend/tests/` e são executados com `cd backend && pytest` e `ruff check .`.
