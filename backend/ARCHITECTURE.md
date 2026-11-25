# AncientStudio Backend — Arquitetura (Monólito Modular por Domínios + Eventos/Filas)

Este documento descreve a arquitetura consolidada em `backend/` (Fases 1, 2 e 3 entregues), projetada sob o padrão **Monólito Modular por Domínios orientado a Eventos/Filas + Gateway/BFF**, compatível com **Python 3.10 e 3.11+**, livre de simulações mascaradas e pronta para execução distribuída com Redis e workers concorrentes.

> **Nota sobre servidores no repositório:**
> - `backend/` é o backend principal **FastAPI** (serviços reais, contratos tipados em `/api/v1`, segurança HMAC/API Key com escopos, rate limiting por cota, headers de segurança HTTP, cache/idempotência Redis+Memória, filas/workers no ciclo `lifespan`, scrapers reais, workflows multi-etapas de IA e integração n8n).
> - `api/server.py` (na raiz) permanece apenas como host estático legado usado pelo `Dockerfile` raiz atual da Vercel até a virada final de infraestrutura, preservando os contratos de CI existentes.
> - `ascii-engine-module/` é um módulo gráfico WebGL2/ECS isolado e não é acoplado nem modificado pelo backend.

---

## 1. Estrutura de Diretórios Atualizada

```text
backend/
├── __init__.py                        # Garante resolução dual de imports (app.* e backend.app.*)
├── ARCHITECTURE.md                    # Documentação arquitetural e estado das fases
├── pyproject.toml                     # Ruff (target py310) + Pytest (markers unit/integration)
├── requirements.txt                   # FastAPI, Uvicorn, Pydantic v2, HTTPX, Redis
├── requirements-dev.txt               # Pytest + Ruff
├── app/
│   ├── main.py                        # Factory create_app(), lifespan (AsyncWorkerRunner), middlewares e EventBus bridge
│   ├── core/
│   │   ├── time.py                    # Utilitários UTC compatíveis com Python 3.10 e 3.11+
│   │   ├── config.py                  # Settings centralizado (Redis, Workers, Rate Limit, Scraping, AI, n8n)
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
│   │   └── pipelines_simulator/       # Descoberta real de targets do monorepo e contratos do Live CI/CD Simulator
│   ├── api/
│   │   ├── deps.py                    # Injeção de dependências FastAPI e autorização por escopos
│   │   └── v1/                        # Roteadores HTTP finos por domínio agregados em router.py
│   └── data/
│       └── ledger.csv                 # Dataset financeiro real consumido pelo domínio ETL
└── tests/
    ├── conftest.py                    # Fixtures determinísticas compartilhadas
    ├── unit/                          # Testes unitários (compat 3.10+, security, Redis/Memory cache & queue, scrapers, IA)
    └── integration/                   # Testes HTTP/lifespan ponta a ponta (/api/v1, rate limit, headers, workers, n8n)
```

---

## 2. Entregas das Fases 2 e 3

### Fase 2 — Filas/Workers Distribuídos + Cache/Segurança
- **Adaptadores Redis com Fallback Automático (`create_cache_backend` & `create_job_queue`):**
  - `RedisTTLCache` utiliza `SET key payload EX ttl NX` para atomicidade entre múltiplas réplicas e serialização JSON tipada restrita ao namespace `app.*` (zero uso de `pickle`).
  - `RedisJobQueue` persiste jobs em Hashes, fila pronta em Lists, agendamentos de retry com backoff em Sorted Sets (`ZADD`/`ZRANGEBYSCORE`) e falhas exauridas em lista `dlq`, fazendo fallback automático para `InMemory*` quando `REDIS_URL` não está definido ou indisponível em ambiente local/CI (`REDIS_FALLBACK_TO_MEMORY=true`).
- **Ciclo `lifespan` do FastAPI:**
  - Inicia automaticamente o pool concorrente do `AsyncWorkerRunner` no startup da aplicação e drena/cancela todas as tasks de forma limpa no shutdown.
- **Rate Limiting por Escopo/IP & Políticas HTTP (`app/core/middleware.py`):**
  - Cotas diferenciadas por tier (`anonymous` por IP, `authenticated` por chave operacional e `admin`), expondo `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` e `X-RateLimit-Scope` em cada resposta de API e `429 problem+json` + `Retry-After` ao exceder.
  - `SecurityHeadersMiddleware` aplica `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `Cache-Control: no-store` e `Content-Security-Policy` restritiva nas rotas `/api/*`.

### Fase 3 — Web Scrapers + Workflows de IA + Automações n8n Reais
- **Web Scrapers (`app/domains/scraping/`):**
  - `HttpxPageFetcher` realiza streaming com teto estrito de bytes (`SCRAPER_MAX_RESPONSE_BYTES`), validação de `Content-Type`, retries exponenciais em falhas transitórias (`429/502/503/504`) e validação SSRF manual em **cada salto de redirecionamento HTTP**.
  - Extratores concretos (`StructuredMetadataExtractor`, `HttpStaticExtractor`, `SitemapXmlExtractor` protegido contra DTD/XXE) registrados no worker `scraping.extract`, com cache automático e emissão de `scraping.document.extracted` no `EventBus`.
- **Workflows de IA Multi-Etapas (`app/domains/ai_workflows/`):**
  - `OpenAICompatibleInferenceAdapter` integra endpoints reais `/chat/completions` (OpenAI, vLLM, Red Hat OpenShift AI, Ollama) com `response_format={"type": "json_object"}`.
  - `AIWorkflowService.execute_workflow_job` executa pré-processamento determinístico de domínio (Etapa 1) seguido de inferência estruturada validada estritamente via schemas Pydantic (`AnomalyTriageOutput`, `EntityExtractionOutput`, `IncidentClassificationOutput`) na Etapa 2, publicando `ai_workflows.run.completed` no `EventBus`.
- **Automações n8n Expandidas (`infra/n8n/workflows/` + `app/domains/automation_n8n/`):**
  - Três workflows reais versionados: `invoice-enrichment.json`, `scraping-postprocess.json` e `ai-anomaly-alert.json`.
  - Ponte automática `EventBus -> JobQueue` disparando workflows n8n deduplicados a partir de eventos reais de domínio, além de endpoint autenticado via HMAC (`POST /api/v1/workflows/callbacks/{workflow_id}`) para recepção idempotente de callbacks de execução do n8n.

---

## 3. Próximas Fases do Roadmap

1. **Fase 4 — Live CI/CD & Docker Pipeline Simulator + Testes Completos:**
   - Implementar inspetores reais (`PipelineStageInspectorPort`) para `backend-api`, `ascii-engine` e `portfolio-static` no worker `pipelines.simulate`, com auditoria real de manifestos/Dockerfiles/artefatos, RCA estruturado e suíte completa de resiliência.
2. **Fase 5 (Última) — Console RAG:**
   - Indexação e recuperação sobre a base documental/código real do repositório com citações verificáveis (mantido intencionalmente fora do escopo até a última etapa).
