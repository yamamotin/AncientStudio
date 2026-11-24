# Arquitetura proposta — frontend + backend Python + n8n + CI/CD

Este documento descreve a estrutura-alvo e registra o **esqueleto inicial já entregue** do
backend FastAPI. O módulo `ascii-engine-module/` e seus adaptadores são de propriedade do
agente dedicado de gráficos 3D e **não são alterados por este plano**.

## 1. Estrutura de diretórios

```text
AncientStudio/
├── index.html                         # SPA estática, atributos data-i18n
├── assets/
│   ├── css/style.css
│   ├── js/
│   │   ├── core.js                    # helpers, prefers-reduced-motion
│   │   ├── i18n.js                    # pt-br → en, sem rebuild
│   │   ├── api-client.js              # chamadas reais ao backend
│   │   ├── main.js                    # composição da UI
│   │   ├── pipeline.js / api.js / console.js
│   │   └── engine-adapter.js          # [agente 3D]
│   ├── i18n/
│   │   ├── pt-br.json                 # idioma primário
│   │   └── en.json                    # inglês internacional
│   ├── cv/                            # PDFs originais autorizados
│   └── fonts/                         # JetBrains Mono self-hosted
│
├── backend/                           # FastAPI modular (implementado)
│   ├── app/
│   │   ├── main.py                    # create_app(), middlewares, static mount
│   │   ├── config.py                  # pydantic-settings, segredos por env
│   │   ├── api/
│   │   │   ├── deps.py                # injeção de dependências
│   │   │   └── v1/
│   │   │       ├── router.py
│   │   │       ├── health.py          # /health, /build
│   │   │       ├── etl.py             # /etl/datasets/...
│   │   │       ├── gateway.py         # /gateway/invoices/parse
│   │   │       └── workflows.py       # /workflows/{id}/run, /runs/{id}
│   │   ├── core/
│   │   │   ├── errors.py              # problem+json + correlation id
│   │   │   ├── logging.py
│   │   │   └── security.py            # HMAC-SHA256, fingerprint
│   │   ├── schemas/                   # contratos Pydantic v2
│   │   ├── services/                  # regras de negócio, clients, idempotência
│   │   └── data/ledger.csv            # dataset real de ETL
│   ├── tests/                         # pytest, httpx MockTransport
│   ├── pyproject.toml                 # ruff + pytest
│   ├── requirements.txt
│   └── requirements-dev.txt
│
├── infra/
│   ├── docker/Dockerfile              # imagem do backend FastAPI
│   ├── n8n/workflows/                  # exports JSON versionados
│   └── README.md
│
├── .github/workflows/
│   ├── ci-cd.yml                      # ruff, pytest, docker build, deploy
│   ├── pages.yml                      # deploy estático + parity check
│   └── pr-tests.yml                   # testes estáticos do frontend
│
├── docs/
│   ├── architecture.md                # este documento
│   └── engine-integration.md          # [agente 3D]
│
├── docker-compose.yml                 # api + n8n com credenciais obrigatórias
├── .env.example
├── Dockerfile                         # legado: ainda serve o site atual na Vercel
└── tests/                             # runner nativo do Node para o frontend
```

## 2. Responsabilidades

### Frontend

- `pt-br` é o idioma primário. `assets/i18n/pt-br.json` e `en.json` contêm **todas** as
  strings de rótulos, mensagens de status, tooltips, aria-labels e respostas curtas da UI.
- `assets/js/i18n.js` lê `navigator.language`, aplica `document.documentElement.lang`,
  persiste a escolha em `localStorage` e troca os nós `[data-i18n]` sem recarregar a página.
  A transição é uma troca de texto com `opacity` curta, respeitando `prefers-reduced-motion`.
- Ações simplificadas:
  - `[github]` (sem `--`), mantendo o comportamento TODO enquanto o username não é informado;
  - currículos na ordem `[ curriculo-pt-br ]` e `[ curriculo-en ]`, apontando para
    `Eron_Yamamoto_Curriculo_BR_Pleno.pdf` e `Eron_Yamamoto_Resume_EN.pdf`.
- `api-client.js` passa a usar `/api/v1/...` de verdade; o fallback em-browser só
  permanece para execução via `file://` / GitHub Pages, explicitamente sinalizado.

### Backend FastAPI

- `create_app()` recebe `Settings`, registr correlation ID, problem+json, routers v1 e
  monta os arquivos estáticos por último (evita conflito com `/api`).
- **ETL/dados**: `GET /api/v1/etl/datasets`, `GET /api/v1/etl/datasets/{dataset}/summary`,
  `GET /api/v1/etl/datasets/{dataset}/records`. Os números são lidos de `ledger.csv` e
  normalizados (`1.250,00 → 1250.00`, `(45,50) → -45.50`).
- **Gateway**: `POST /api/v1/gateway/invoices/parse` exige `X-Signature`, `X-Timestamp` e
  `Idempotency-Key`. A assinatura é HMAC-SHA256 sobre `timestamp.sha256(body)`, comparada
  em tempo constante; a idempotência devolve `201` na criação, `200` no replay e `409` se a
  mesma chave vier com outro payload. Erros reais: `401`, `409`, `422`, `502`. `POST /api/v1/gateway/invoices/submit` assina no servidor para o browser nunca expor o segredo HMAC e usa o mesmo serviço.
- **n8n**: `POST /api/v1/workflows/{workflow_id}/run` (header `X-API-Key`) dispara o
  webhook autenticado; `GET /api/v1/workflows/runs/{execution_id}` consulta a execução pela
  REST API do n8n. Falhas upstream viram `502`, ausência vira `404`.
- `IdempotencyStore` é thread-safe e substituível por Redis quando houver múltiplas réplicas.

### Infra e CI/CD

- `docker-compose.yml` sobe `api` e `n8n`, com volume persistente, healthchecks, n8n preso
  a `127.0.0.1` e credenciais **obrigatórias** via `.env` (sem senhas padrão).
- `.github/workflows/ci-cd.yml` executa `ruff check`, `pytest`, build da imagem e deploy
  Vercel em `main` quando `VERCEL_TOKEN`, `VERCEL_ORG_ID` e `VERCEL_PROJECT_ID` existirem.
- O `Dockerfile` da raiz continua servindo o site/API legados na Vercel. A troca para a
  imagem FastAPI acontece na fase de integração, após o frontend consumir os novos endpoints.

## 3. Estado atual

- Estrutura acima criada, com backend FastAPI modular, 16 testes `pytest` passando e `ruff`
  limpo.
- `docker-compose.yml`, `infra/docker/Dockerfile`, `.env.example`, workflow de CI/CD e um
  export de workflow n8n versionado.
- UX/UI: i18n `pt-br`/`en` implementado com toggle no topbar, dicionários versionados e
  fallback embutido para `file://`; `api-client.js` usa somente `/api/v1` real.
- Pages: diagnóstico e passos de recuperação em `docs/pages-recovery.md`.
