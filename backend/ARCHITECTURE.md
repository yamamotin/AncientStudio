# AncientStudio Backend — Arquitetura (Monólito Modular por Domínios + Eventos/Filas)

Este documento descreve a arquitetura consolidada em `backend/` para o servidor técnico do portfólio AncientStudio, projetada sob o padrão **Monólito Modular por Domínios orientado a Eventos/Filas + Gateway/BFF**, compatível com **Python 3.10 e 3.11+**, livre de simulações mascaradas e preparada para evolução incremental até múltiplas réplicas.

> **Nota sobre servidores no repositório:**
> - `backend/` é o backend principal **FastAPI** (serviços reais, contratos tipados em `/api/v1`, segurança HMAC/API Key com escopos, cache, filas/workers e integração n8n).
> - `api/server.py` (na raiz) permanece apenas como host estático legado sem dependências usado pelo `Dockerfile` raiz atual da Vercel até a virada final de infraestrutura, preservando os contratos de CI existentes.
> - `ascii-engine-module/` é um módulo gráfico WebGL2/ECS isolado e não é acoplado nem modificado pelo backend.

---

## 1. Estrutura de Diretórios

```text
backend/
├── __init__.py                        # Garante resolução dual de imports (app.* e backend.app.*)
├── ARCHITECTURE.md                    # Documentação arquitetural e roadmap de fases
├── pyproject.toml                     # Ruff (target py310) + Pytest (markers unit/integration)
├── requirements.txt                   # Dependências de runtime
├── requirements-dev.txt               # Dependências de lint e testes
├── app/
│   ├── main.py                        # Factory create_app(), singletons de estado, middlewares e static mount
│   ├── core/                          # Infraestrutura transversal
│   │   ├── time.py                    # Utilitários UTC compatíveis com Python 3.10 e 3.11+
│   │   ├── config.py                  # Settings centralizado (pydantic-settings) + trava anti-segredos dev em prod
│   │   ├── errors.py                  # Exceções semânticas de domínio + RFC 7807 (problem+json)
│   │   ├── logging.py                 # ContextVar de X-Correlation-ID + formatter estruturado JSON
│   │   └── security.py                # HMAC-SHA256, ApiKeyVerifier + Scopes, sanitização, guarda SSRF e Rate Limiter
│   ├── cache/                         # Camada unificada de Cache + Idempotência
│   │   ├── base.py                    # Protocolo CacheBackend e telemetria CacheStats
│   │   ├── memory.py                  # InMemoryTTLCache thread-safe com clock monotônico e evicção LRU limitada
│   │   └── idempotency.py             # IdempotencyStore construído sobre CacheBackend (sem duplicar TTL/locks)
│   ├── queue/                         # Mensageria interna, Eventos de Domínio e Filas Assíncronas
│   │   ├── models.py                  # JobEnvelope, JobStatus, RetryPolicy, DomainEvent, QueueMetrics
│   │   ├── base.py                    # Protocolo JobQueue + EventBus assíncrono pub/sub
│   │   └── memory.py                  # InMemoryJobQueue com deduplicação idempotente, backoff e Dead-Letter Queue
│   ├── workers/                       # Execução assíncrona desacoplada
│   │   └── runner.py                  # WorkerRegistry (topic -> handler) + AsyncWorkerRunner com propagação de correlation_id
│   ├── domains/                       # Contextos Delimitados (Bounded Contexts)
│   │   ├── gateway/                   # BFF, manifesto de capacidades e Gateway Fiscal (HMAC + reconciliação + idempotência)
│   │   ├── etl/                       # Pipeline real de leitura/normalização contábil sobre datasets em disco
│   │   ├── automation_n8n/            # Cliente HTTP real para webhooks/execuções n8n + catálogo de workflows versionados
│   │   ├── scraping/                  # Contratos, portas de extração, guarda SSRF e despacho assíncrono de scrapers
│   │   ├── ai_workflows/              # Catálogo e contratos de workflows operacionais de IA (sem console RAG nesta etapa)
│   │   └── pipelines_simulator/       # Descoberta real de targets do monorepo e contratos do Live CI/CD & Docker Simulator
│   ├── api/
│   │   ├── deps.py                    # Injeção de dependências FastAPI e autorização por escopos
│   │   └── v1/                        # Roteadores HTTP finos por domínio agregados em router.py
│   └── data/
│       └── ledger.csv                 # Dataset financeiro real consumido pelo domínio ETL
└── tests/
    ├── conftest.py                    # Fixtures determinísticas compartilhadas
    ├── unit/                          # Testes isolados (compatibilidade 3.10+, core/security, cache/idempotência, filas/DLQ)
    └── integration/                   # Testes HTTP ponta a ponta de contratos /api/v1 com TestClient e MockTransport
```

---

## 2. Fronteiras de Módulos e Decisões de Consolidação

1. **Eliminação de Camadas Horizontais Duplicadas (`schemas/` e `services/` antigos)**:
   - Os contratos Pydantic e regras de negócio foram consolidados dentro de cada domínio em `app/domains/<dominio>/`, evitando dispersão entre pastas globais e mantendo coesão alta por contexto.
2. **Unificação de Cache e Idempotência (`app/cache/`)**:
   - `IdempotencyStore` deixou de manter estrutura própria de dicionário/locks/TTL e passou a delegar armazenamento atômico (`get_or_set`) ao `CacheBackend` sob namespace `idempotency:`. Ao conectar Redis na Fase 2, tanto cache de domínio quanto idempotência passam a ser distribuídos automaticamente.
3. **Segurança Centralizada (`app/core/security.py`)**:
   - Verificação constante (`hmac.compare_digest`) de chaves de API com escopos (`Scope`), assinaturas HMAC de payloads brutos, sanitização de identificadores/textos, proteção contra SSRF em URLs externas (`validate_public_http_url`) e base de rate limiting (`SlidingWindowRateLimiter`).
4. **Fluxo Assíncrono Orientado a Filas (`app/queue/` + `app/workers/`)**:
   ```text
   Cliente HTTP ──► Router /api/v1/<domínio>
                       │ (valida schema, escopo, SSRF e idempotência)
                       ▼
                  Domain Service ──► JobQueue.enqueue(topic, payload, correlation_id)
                       │                     │
                       ◄── 202 Accepted ─────┘ (retorna job_id imediatamente)
                                             │
                                             ▼
                                    AsyncWorkerRunner.process_one()
                                       ├── Sucesso ──► JobStatus.COMPLETED (persiste resultado)
                                       └── Falha ────► attempts <= max_retries ?
                                                        ├── Sim ──► JobStatus.RETRYING (backoff exponencial)
                                                        └── Não ──► JobStatus.DEAD_LETTER (inspecionável em /api/v1/jobs/dead-letters)
   ```

---

## 3. Roadmap das Próximas Fases de Implementação

1. **Fase 2 — Filas/Workers Distribuídos + Cache/Segurança Avançados**:
   - Adaptador Redis para `CacheBackend` e `JobQueue` (mantendo fallback local `InMemory*` para desenvolvimento/CI sem dependências externas).
   - Ciclo de vida `lifespan` do FastAPI gerenciando pool de workers em background, middleware ativo de rate limiting por rota/IP/API Key e headers de segurança HTTP.
2. **Fase 3 — Web Scrapers Reais + Workflows de IA + Automações n8n Reais**:
   - Implementação concreta de `PageFetcherPort` (`httpx` com limites de payload, timeout, retry e respeito a `Content-Type`) e extratores HTML/metadados/sitemap registrados no `WorkerRegistry` (`scraping.extract`).
   - Implementação de adaptadores reais para `StructuredInferencePort` com validação estrita de schema JSON e execução multi-etapas em `ai_workflows.execute`.
   - Workflows adicionais versionados em `infra/n8n/workflows/` integrados a eventos do `EventBus` e callbacks assinados.
3. **Fase 4 — Live CI/CD & Docker Pipeline Simulator + Suíte Completa de Testes**:
   - Implementação dos inspetores reais (`PipelineStageInspectorPort`) auditando manifestos, AST/lint, Dockerfiles e artefatos dos targets do repositório (`backend-api`, `ascii-engine`, `portfolio-static`) via `pipelines.simulate`, com streaming/telemetria estruturada por estágio e testes de carga/resiliência.
4. **Fase 5 (Última) — Console RAG**:
   - Indexação vetorial/lexical sobre a base técnica real do portfólio e documentação arquitetural, pipeline de recuperação com citações verificáveis e integração com o console interativo.
