# AncientStudio Backend — Arquitetura Completa (Fases 1 a 5)

Este documento descreve a arquitetura consolidada em `backend/` (Fases 1 a 5 entregues), projetada sob o padrão **Monólito Modular por Domínios orientado a Eventos/Filas + Gateway/BFF**, compatível com **Python 3.10 e 3.11+**, livre de simulações mascaradas e equipada com adaptadores Redis/Memória, workers concorrentes, inspetores reais de CI/CD & Docker e Console Técnico RAG híbrido/vetorial.

> **Nota sobre servidores no repositório:**
> - `backend/` é o backend principal **FastAPI** (`/api/v1`, segurança HMAC/API Key por escopos, rate limiting por cota, headers de segurança HTTP, cache/idempotência Redis+Memória, filas/workers no `lifespan`, ETL, scrapers reais, workflows multi-etapas de IA, integração n8n, Live CI/CD & Docker Simulator e Console RAG).
> - `api/server.py` (na raiz) permanece apenas como host estático legado usado pelo `Dockerfile` raiz atual da Vercel até a virada final de infraestrutura, preservando todos os contratos de CI existentes.
> - `ascii-engine-module/` é um módulo gráfico WebGL2/ECS isolado e não é acoplado nem modificado pelo backend.

---

## 1. Estrutura de Diretórios Consolidada

```text
backend/
├── __init__.py                        # Garante resolução dual de imports (app.* e backend.app.*)
├── ARCHITECTURE.md                    # Documentação arquitetural consolidada (Fases 1 a 5)
├── pyproject.toml                     # Ruff (target py310) + Pytest (markers unit/integration)
├── requirements.txt                   # FastAPI, Uvicorn, Pydantic v2, HTTPX, Redis
├── requirements-dev.txt               # Pytest + Ruff
├── app/
│   ├── main.py                        # Factory create_app(), lifespan (AsyncWorkerRunner), middlewares e EventBus bridge
│   ├── core/
│   │   ├── time.py                    # Utilitários UTC compatíveis com Python 3.10 e 3.11+
│   │   ├── config.py                  # Settings centralizado (Redis, Workers, Rate Limit, Scraping, AI, n8n, Pipelines, RAG)
│   │   ├── errors.py                  # Exceções semânticas de domínio + RFC 7807 (problem+json)
│   │   ├── logging.py                 # ContextVar de X-Correlation-ID + formatter estruturado JSON
│   │   ├── security.py                # HMAC-SHA256, ApiKeyVerifier + Scopes, sanitização, guarda SSRF e Rate Limiter
│   │   └── middleware.py              # RateLimitMiddleware por escopo/IP (X-RateLimit-*) + SecurityHeadersMiddleware
│   ├── cache/
│   │   ├── base.py                    # Protocolo CacheBackend e telemetria CacheStats
│   │   ├── memory.py                  # InMemoryTTLCache thread-safe com clock monotônico e evicção LRU limitada
│   │   ├── redis_backend.py           # RedisTTLCache (SET EX NX atômico + codec JSON/Pydantic seguro sem pickle) + fallback
│   │   └── idempotency.py             # IdempotencyStore unificado sobre CacheBackend (Memória ou Redis)
│   ├── queue/
│   │   ├── models.py                  # JobEnvelope, JobStatus, RetryPolicy, DomainEvent, QueueMetrics
│   │   ├── base.py                    # Protocolo JobQueue + EventBus assíncrono pub/sub
│   │   ├── memory.py                  # InMemoryJobQueue com deduplicação idempotente, backoff e Dead-Letter Queue
│   │   └── redis_queue.py             # RedisJobQueue (hashes, listas, ZSET delayed retries e DLQ) + fallback automático
│   ├── workers/
│   │   └── runner.py                  # WorkerRegistry + AsyncWorkerRunner gerenciado pelo lifespan do FastAPI
│   ├── domains/
│   │   ├── gateway/                   # BFF, telemetria de backends ativos e Gateway Fiscal (HMAC + EventBus)
│   │   ├── etl/                       # Pipeline real sobre ledger.csv com cache transparente
│   │   ├── automation_n8n/            # N8NClient + catálogo (3 workflows) + EventBus bridge + callbacks HMAC assinados
│   │   ├── scraping/                  # HttpxPageFetcher (streaming cap, retries, SSRF em redirects) + 3 extratores reais
│   │   ├── ai_workflows/              # OpenAICompatibleInferenceAdapter + pipelines multi-etapas validados por schema
│   │   ├── pipelines_simulator/       # RepositoryStageInspector (AST, manifestos, Dockerfiles, bundles) + RCA verificável
│   │   └── rag_console/               # Indexador híbrido BM25 + vetores densos (RRF), citações SHA-256 e Console Técnico
│   ├── api/
│   │   ├── deps.py                    # Injeção de dependências FastAPI e autorização por escopos
│   │   └── v1/                        # Roteadores HTTP finos por domínio agregados em router.py
│   └── data/
│       └── ledger.csv                 # Dataset financeiro real consumido pelo domínio ETL
└── tests/
    ├── conftest.py                    # Fixtures determinísticas compartilhadas
    ├── unit/                          # Suítes unitárias (compat 3.10+, security, Redis/Memory, scrapers, IA, pipelines, RAG)
    └── integration/                   # Suítes ponta a ponta, resiliência/carga concorrente e contratos HTTP /api/v1
```

---

## 2. Resumo Técnico por Fase

### Fase 1 — Fundação do Monólito Modular + Gateway/BFF + ETL
- Estrutura limpa em `core/`, `cache/`, `queue/`, `workers/`, `domains/` e `api/v1/` com contratos RFC 7807 (`application/problem+json`), rastreamento `X-Correlation-ID` e compatibilidade estrita com Python 3.10+.

### Fase 2 — Filas/Workers Distribuídos + Cache/Segurança
- `RedisTTLCache` (`SET ... EX ... NX`, codec JSON/Pydantic restrito a `app.*`, zero `pickle`) e `RedisJobQueue` (Hashes, Lists, `ZSET` delayed retries e DLQ) com fallback automático para memória.
- `lifespan` do FastAPI orquestrando `AsyncWorkerRunner`, `RateLimitMiddleware` por escopo/IP (`anonymous`, `authenticated`, `admin`) e `SecurityHeadersMiddleware`.

### Fase 3 — Web Scrapers + Workflows de IA + Automações n8n
- `HttpxPageFetcher` com limite estrito de bytes em streaming, validação SSRF por salto de redirect e extratores `StructuredMetadataExtractor`, `HttpStaticExtractor` e `SitemapXmlExtractor` (sem DTD/XXE).
- `OpenAICompatibleInferenceAdapter` + `AIWorkflowService` validando saídas estruturadas via Pydantic e ponte automática `EventBus -> JobQueue -> n8n` com callbacks HMAC (`POST /api/v1/workflows/callbacks/{workflow_id}`).

### Fase 4 — Live CI/CD & Docker Pipeline Simulator + Resiliência/Carga
- `RepositoryStageInspector` implementa `PipelineStageInspectorPort` no tópico `pipelines.simulate`, executando auditorias reais e contidas em `repo_root` para:
  - `backend-api`: parsing AST completo de `backend/app` e `backend/tests` (guarda Python 3.10 `datetime.UTC`, zero `pickle`, limites de linha), topologia `pytest` + workflow CI e hardening de `infra/docker/Dockerfile` (tag pinada, `USER` não-root, `HEALTHCHECK`, `EXPOSE`, exec-form `CMD`, ausência de segredos em `ENV` e existência real das fontes `COPY`).
  - `ascii-engine`: validação de `package.json`, `tsconfig.json` (`strict: true`), árvore TypeScript e integridade SHA-256 + símbolos exportados em `assets/js/ascii-engine.bundle.js`.
  - `portfolio-static`: verificação HTML de assets locais, paridade de chaves `pt-br.json`/`en.json`, política zero-CDN/zero-trackers, higiene de `.env.example` e guarda contra `COPY . .` no `Dockerfile` raiz.
- Gera telemetria estruturada por estágio (`StageTelemetryReport`), **RCA verificável** (`PipelineRootCauseAnalysis` com `root_cause_code`, arquivos afetados, passos de remediação e evidências) consultável em `GET /api/v1/pipelines/runs/{job_id}` e eventos `pipelines.run.completed` / `pipelines.run.failed`.

### Fase 5 — Console Técnico RAG (Indexação Híbrida/Vetorial + Citações Verificáveis)
- **Chunking Estrutural do Repositório Real (`app/domains/rag_console/corpus.py`):**
  - Indexa documentação arquitetural (`*.md`), código Python real via AST (`class`/`def` com linhas exatas `start_line..end_line`), módulos TypeScript da engine, clientes JS e manifestos CI/CD/Docker/n8n, calculando `content_sha256` canônico de cada fatia de linhas.
- **Recuperação Híbrida BM25 + Vetorial Densa (`embeddings.py` + `retriever.py`):**
  - Combina índice invertido **Okapi BM25** (tokenizador técnico que decompõe `camelCase`, `snake_case` e acentuação PT-BR/EN) com vetores densos L2-normalizados (`LocalSubwordVectorEmbedder` por projeção aleatória assinada de unigramas, bigramas e 4-gramas de caracteres, ou `OpenAICompatibleEmbeddingAdapter` em `/embeddings`) fundidos por **Reciprocal Rank Fusion (RRF)**.
- **Citações Verificáveis em Disco e Endpoints Dedicados (`/api/v1/rag/*`):**
  - Cada citação (`[1]`, `[2]`, ...) expõe `source_path`, `start_line`, `end_line`, `content_sha256` e flag `verified_on_disk` recalculada contra o arquivo real em disco (detectando imediatamente qualquer adulteração pós-indexação).
  - Endpoints: `GET /api/v1/rag/index/status`, `POST /api/v1/rag/index/rebuild` (síncrono ou assíncrono no worker `rag.reindex`), `POST /api/v1/rag/search`, `POST /api/v1/rag/query` (`extractive-grounded` ou `llm-grounded` com validação estrita de IDs citados) e `GET /api/v1/rag/sources/{chunk_id}`.

### Fase 6 — Conectores de Dados Públicos, Fiscal/Classif, Orçamento Municipal em BRL & PROJUDI Real (`/api/v1/{bcb,siscomex,transparencia,projudi}`)
- Compartilha o pacote desacoplado `api/connectors/` (`ConnectorTTLCache` monotônico thread-safe, `HttpTransport` com captura de cookies `JSESSIONID` e decodificação automática UTF-8/ISO-8859-1, validadores mod-11 de CPF/CNPJ e CNJ 20 dígitos, mascaramento LGPD) entre o monólito FastAPI (`backend/app/api/v1/{bcb,siscomex,transparencia,projudi}.py`) e o host Python da raiz (`api/server.py`).
- **PROJUDI TJPR Real (Zero Mocks):** raspagem real sobre `consulta.tjpr.jus.br/projudi_consulta/` (`table.resultTable` + `#navigator`), exigindo `captcha_token` (`g-recaptcha-response`) / `session_cookie` do usuário e retornando RFC 7807 `422` (`CAPTCHA_REQUIRED`) sem jamais gerar processos fictícios.
- **Transparência Municipal em BRL (`R$`):** agrega PIB total e per capita (IBGE `5938` + Pesquisas), receitas realizadas e despesas empenhadas/liquidadas/pagas (Tesouro Nacional Siconfi `DCA-Anexo I-C` e `I-D`), bens declarados e prestação de contas eleitoral (TSE `DivulgaCandContas` 2024) e transferências federais (CGU opcional).
- **Siscomex Classif Integrado:** combina Nomenclatura NCM com herança hierárquica de ancestrais, Soluções de Consulta da Receita Federal (SIJUT2 COSIT/COANA) e Sugestões técnicas para classificar termos comerciais como `"GPU"` (`8471.80.00`, `8471.50.90`, `8542.31.90`). Contratos completos em [`../docs/api-reference.md`](../docs/api-reference.md).
