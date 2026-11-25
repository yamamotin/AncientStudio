# Arquitetura consolidada — Frontend + Engine 3D + Backend Python + n8n + CI/CD

Este documento consolida a arquitetura entregue no monorepo `AncientStudio` em `2026-11-25`, abrangendo a SPA estática de terminal, o módulo gráfico 3D `ascii-engine-module/`, o backend FastAPI em **Monólito Modular orientado a Eventos/Filas** (Fases 1 a 5 completas em `backend/`), as automações n8n e o pipeline permanente de CI/CD e publicação dupla (GitHub Pages + Vercel).

## 1. Estrutura de diretórios

```text
AncientStudio/
├── index.html                         # SPA estática de terminal, hooks data-i18n
├── assets/
│   ├── css/style.css                  # Layout, retrato no hero, modos de cena e brilho
│   ├── js/
│   │   ├── core.js                    # Helpers, prefers-reduced-motion
│   │   ├── i18n.js                    # Alternância pt-br ↔ en sem reload + dicionário embutido
│   │   ├── api-client.js              # Integração real com /api/v1 (ETL, Gateway, n8n, Pipelines, RAG)
│   │   ├── main.js                    # Composição de UI, fullscreen, brilho e carregamento diferido
│   │   ├── pipeline.js / api.js / console.js / neofetch.js
│   │   ├── engine-adapter.js          # Ponte entre a SPA e o bundle WebGL2/ECS
│   │   └── ascii-engine.bundle.js     # Bundle IIFE gerado a partir de ascii-engine-module/
│   ├── img/eron-portrait-ascii.png    # Retrato local responsivo
│   ├── i18n/{pt-br,en}.json           # Dicionários sincronizados (paridade de chaves testada)
│   ├── cv/                            # PDFs autorizados (PT-BR e EN)
│   └── fonts/                         # JetBrains Mono self-hosted (zero CDN)
│
├── ascii-engine-module/               # Motor 3D WebGL2/ECS isolado (TypeScript strict + Three.js)
│   ├── src/                           # Core, ECS, World, Entities, Shaders (PCF, water, objectOutline), VFX
│   ├── demo/                          # Demo standalone de desenvolvimento
│   └── integration-entry.ts           # Fachada pública exportada para o bundle do portfólio
│
├── backend/                           # Monólito Modular FastAPI (Fases 1 a 5 entregues, Python 3.10+)
│   ├── ARCHITECTURE.md                # Documentação detalhada das camadas e domínios do backend
│   ├── app/
│   │   ├── main.py                    # create_app(), lifespan (AsyncWorkerRunner), middlewares e EventBus
│   │   ├── core/                      # time (UTC 3.10+), config, errors (problem+json), logging, security, middleware
│   │   ├── cache/                     # CacheBackend, InMemoryTTLCache, RedisTTLCache (sem pickle), IdempotencyStore
│   │   ├── queue/                     # JobQueue, EventBus, InMemoryJobQueue, RedisJobQueue (ZSET retries + DLQ)
│   │   ├── workers/                   # WorkerRegistry + AsyncWorkerRunner concorrente
│   │   ├── domains/
│   │   │   ├── gateway/               # BFF (/capabilities) e Gateway Fiscal (HMAC + idempotência + EventBus)
│   │   │   ├── etl/                   # Normalização e consulta paginada sobre ledger.csv com cache
│   │   │   ├── automation_n8n/        # Catálogo (3 workflows), N8NClient, EventBus bridge e callbacks HMAC
│   │   │   ├── scraping/              # HttpxPageFetcher (streaming cap + SSRF por redirect) e 3 extratores
│   │   │   ├── ai_workflows/          # OpenAICompatibleInferenceAdapter + pipelines multi-etapas tipados
│   │   │   ├── pipelines_simulator/   # RepositoryStageInspector (AST, Dockerfiles, bundles) + RCA verificável
│   │   │   └── rag_console/           # Indexação híbrida BM25 + vetorial densa (RRF) e citações SHA-256
│   │   ├── api/
│   │   │   ├── deps.py                # Providers de DI e autorização por escopos (X-API-Key)
│   │   │   └── v1/                    # health, gateway, etl, workflows, jobs, scraping, ai_workflows, pipelines, rag
│   │   └── data/ledger.csv            # Dataset financeiro real consumido pelo domínio ETL
│   ├── tests/{unit,integration}/      # 66 testes pytest (unitários, E2E, resiliência e carga concorrente)
│   ├── pyproject.toml                 # Ruff (py310) + Pytest (strict markers)
│   ├── requirements.txt
│   └── requirements-dev.txt
│
├── infra/
│   ├── docker/Dockerfile              # Imagem hardened do backend FastAPI (usuário não-root + healthcheck)
│   └── n8n/workflows/                 # Workflows versionados (invoice-enrichment, scraping-postprocess, ai-anomaly-alert)
│
├── .github/workflows/
│   ├── ci.yml                         # Matriz completa (backend, engine 3D e integridade do portfólio)
│   ├── ci-cd.yml                      # Ruff, pytest, Docker build e deploy
│   ├── pr-tests.yml                   # Testes modulares Node (node --test)
│   ├── pages.yml                      # Publicação no GitHub Pages + verificação não-bloqueante de paridade
│   └── auto-merge.yml                 # Merge verificado -> exclusão da branch -> dispatch explícito de deploys
│
├── docs/
│   ├── architecture.md                # Este documento
│   ├── changelog-2026-11-25.md        # Registro consolidado das entregas de 2026-11-25
│   ├── cicd-auto-merge.md             # Pipeline permanente merge -> delete-branch -> redeploy
│   ├── engine-integration.md          # Contrato de integração da engine ASCII 3D
│   └── pages-recovery.md              # Diagnóstico e paridade GitHub Pages ↔ Vercel
│
├── scripts/
│   ├── auto-merge-verified.sh         # Automação verificada de merge, limpeza de branch e redeploy
│   └── verify-pages-parity.sh         # Sonda de paridade SHA com cache-busting
├── docker-compose.yml                 # Subida local de api + n8n com segredos obrigatórios via .env
├── .env.example                       # Variáveis documentadas e higienizadas (sem credenciais reais)
├── Dockerfile                         # Host estático legado usado na Vercel atual (api/server.py)
└── tests/                             # 47 testes Node (contratos estáticos, UI, i18n, CI e engine) + 6 unittest
```

## 2. Responsabilidades por trilha

### Frontend e Engine 3D

- `pt-br` é o idioma primário, com paridade total de chaves entre `assets/i18n/pt-br.json`, `en.json` e o dicionário embutido em `assets/js/i18n.js` para funcionamento inclusive via `file://`.
- Hero apresenta o retrato em cartão à esquerda abaixo de `ERON YAMAMOTO`, alinhando cargo, localização e ações (`[github]`, `[ curriculo-pt-br ]`, `[ curriculo-en ]`); no footer, o controle de **brilho da página** opera com padrão `110%` (`100%–130%`).
- `[ ASCII REALMS // SCENE ]` expõe três modos unificados (`[ Dia ]`, `[ Noite ]`, `[ Com chuva ]`) sobre o cenário cyberpunk em camadas com sombras PCF, vento ECS e carregamento diferido do bundle; `[ STACK // NEOFETCH ]` mantém o pinguim 3D girando continuamente em `yaw`, isolado de eventos de mouse/toque.
- `ascii-engine-module/` expõe também a API sob demanda de contorno por objeto (`setObjectOutline`, `clearObjectOutline`, `getObjectOutlineState`), ainda reservada para futura ativação visual no frontend.
- `assets/js/api-client.js` executa chamadas HTTP reais para `/api/v1` (health, build, ETL, gateway fiscal, workflows n8n, simulador de pipelines e console RAG), sem respostas simuladas.

### Backend FastAPI (Fases 1 a 5)

- **Fundação, Cache, Filas e Segurança (Fases 1 e 2):** `create_app()` gerencia `AsyncWorkerRunner` via `lifespan`, aplica `CorrelationIdMiddleware`, `SecurityHeadersMiddleware` e `RateLimitMiddleware` por tier (`anonymous`, `authenticated`, `admin` com cabeçalhos `X-RateLimit-*`), usa `RedisTTLCache` (codec JSON/Pydantic restrito a `app.*`, zero `pickle`) e `RedisJobQueue` (`ZSET` delayed retries + Dead-Letter Queue) com fallback automático para memória, e bloqueia segredos `dev-only-*` / `change-me` fora de ambientes locais/teste.
- **Gateway Fiscal e ETL:** `POST /api/v1/gateway/invoices/parse` valida HMAC-SHA256 em tempo constante + `Idempotency-Key` (`201` / `200` / `409`) e publica `gateway.invoice.accepted` no `EventBus`; `POST /api/v1/gateway/invoices/submit` assina no servidor para chamadas do browser; `/api/v1/etl/*` processa `ledger.csv` com cache transparente.
- **Scrapers, IA Multi-Etapas e n8n (Fase 3):** `HttpxPageFetcher` impõe limite estrito de bytes em streaming, retries e validação SSRF em cada salto de redirecionamento HTTP para 3 extratores reais no tópico `scraping.extract`; `AIWorkflowService` combina pré-processamento determinístico com `OpenAICompatibleInferenceAdapter` validado por schemas Pydantic no tópico `ai_workflows.execute`; `N8NAutomationService` conecta eventos de domínio aos 3 workflows JSON em `infra/n8n/workflows/` e valida callbacks HMAC em `POST /api/v1/workflows/callbacks/{workflow_id}`.
- **Live CI/CD & Docker Pipeline Simulator (Fase 4):** `RepositoryStageInspector` executa auditorias reais e contidas em `repo_root` sobre `backend-api` (AST Python 3.10+, topologia `pytest`, hardening de `infra/docker/Dockerfile`), `ascii-engine` (`package.json`, `tsconfig.json` strict, SHA-256 e fachada do bundle) e `portfolio-static` (assets HTML, paridade i18n, zero-CDN/trackers, `.env.example` e guarda contra `COPY . .`), gerando telemetria por estágio e **RCA verificável** em `GET /api/v1/pipelines/runs/{job_id}`.
- **Console Técnico RAG (Fase 5):** `RAGConsoleService` indexa documentação (`*.md`), código real do backend via AST (`class`/`def` com linhas exatas), módulos TypeScript da engine, clientes JS e workflows CI/CD, combinando **Okapi BM25** + vetores densos L2-normalizados (`LocalSubwordVectorEmbedder` ou `OpenAICompatibleEmbeddingAdapter`) via **Reciprocal Rank Fusion (RRF)**, citações `[1]..[k]` com verificação `verified_on_disk` por SHA-256 da fatia de linhas e endpoints `/api/v1/rag/{index/status,index/rebuild,search,query,sources/{chunk_id}}`.

### Infra e CI/CD

- Ordem permanente automatizada em `scripts/auto-merge-verified.sh` e `.github/workflows/auto-merge.yml`: **`merge` (com `resolve-conflicts`) → `delete-branch` → `redeploy`** (`pages.yml` e `ci-cd.yml` disparados com `sha` exato + deploy de produção na Vercel).
- O `Dockerfile` da raiz permanece servindo `api/server.py` na hospedagem atual da Vercel até a virada final de infraestrutura, enquanto `infra/docker/Dockerfile` empacota o backend FastAPI completo.

## 3. Estado verificado (2026-11-25)

- **Backend FastAPI:** Fases 1 a 5 concluídas, **`66 passed` no `pytest`** (`33` unitários + `33` integração/resiliência/carga concorrente) e `ruff check .` sem avisos.
- **Contratos do Repositório e Engine 3D:** **`47/47` testes em `node --test tests/*.test.js`** e **`6/6` testes em `unittest` (`tests/test_api.py`)**.
- **Histórico detalhado do dia:** consulte [`docs/changelog-2026-11-25.md`](changelog-2026-11-25.md) e [`backend/ARCHITECTURE.md`](../backend/ARCHITECTURE.md).
