# Mudanças de 2026-11-25

Este registro consolida o trabalho entregue hoje nas trilhas de CI/CD, frontend/UI,
engine 3D e backend. O estado de `main` imediatamente antes deste commit de
documentação era `7d5d2a3c09417f8ed9cfc01a47be19d4e350d2c4`.

## 1. CI/CD — merge sem intervenção e deploy garantido (PRs #16 a #21)

- Diagnóstico: merges feitos pelo `GITHUB_TOKEN` **não geram evento `push`**, então
  `pages.yml` e o job de deploy da Vercel não eram disparados. O Pages ficou preso
  em `df9cb70` enquanto a Vercel já estava atualizada.
- Correções em `.github/workflows/pages.yml`, `.github/workflows/ci-cd.yml`,
  `.github/workflows/auto-merge.yml` e `scripts/auto-merge-verified.sh`:
  - `workflow_dispatch` com input `sha` nos dois workflows de deploy;
  - `actions: write` para permitir `gh workflow run` após o merge;
  - espera dos checks exatos (`verify`, `test`, `Ruff + pytest`, `Docker build`);
  - resolução técnica de conflitos com `PUT /pulls/{n}/update-branch` + rechecagem;
  - tratamento da resposta transitória `Merge already in progress`;
  - exclusão da branch mesclada, preservando `main`, `dev/portfolio` e `dev/engine`.
- **Ordem permanente do agente:** `merge` (com `resolve-conflicts` nesta fase) →
  `delete-branch` → `redeploy`. A ordem está marcada no helper, testada e
  documentada em `docs/cicd-auto-merge.md`.
- Verificação real: PRs #16 a #21 mesclados pelo fluxo automático, com runs de
  `pages.yml` e `ci-cd.yml` disparados por `workflow_dispatch` e SHAs iguais no
  `build.txt` do Pages e em `/api/v1/build` da Vercel.

## 2. Frontend / UI (PRs #14, #20, #24 e #28)

- Foto/retrato adicionado em `assets/img/eron-portrait-ascii.png` e posicionado no
  hero como cartão vertical à esquerda, abaixo de `ERON YAMAMOTO`, servindo de
  margem para cargo, localização e ações. No mobile o cartão empilha alinhado à
  mesma margem do texto.
- `[ STACK // NEOFETCH ]` mantém apenas o pinguim e as linhas textuais definidas.
  O pinguim gira somente em `yaw`, de forma contínua, sem pitch, sem medidor e sem
  reação a mouse/pointer/toque (`pointer-events: none` no palco).
- Seletor antigo de presets substituído por três botões de um único cenário:
  `[ Dia ]`, `[ Noite ]`, `[ Com chuva ]`, ligados apenas a `scene.setPreset()`.
  Nenhum preset antigo (`sanctuary`, `dawn`, `storm`, `emerald`) permanece na UI.
- Controle de contraste substituído por **brilho da página**, padrão `110%`
  (`--page-brightness: 1.1`), faixa `100%–130%`, ajuste em tempo real e
  persistência em `localStorage`. O filtro é removido do `#scene` em fullscreen.
- A integração da função de contorno do engine no pinguim **foi deliberadamente
  adiada**; a API da engine já existe, mas o frontend ainda não a consome.

## 3. Engine 3D — trilha do Agente 2 (PRs #22, #26 e #27)

- Cenário cyberpunk em camadas, blend de detalhes cerca de 35% mais leve e ECS de
  vento com pan por toque.
- Ferramentas `SceneComposerKit`, `SceneDepthRig` e `EntityBlueprintRegistry` para
  composição de cenas/entidades.
- Modos de cena unificados (Dia/Noite/Com chuva), sombras de rua PCF e remoção das
  emendas da grade ASCII.
- API de contorno **por objeto**, sob demanda: `setObjectOutline()`,
  `clearObjectOutline()` e `getObjectOutlineState()`, com `highlightColor`,
  `thickness`, `intensity`, `opacity` e `enabled`. Não é um pós-processo global e
  não foi aplicada ao pinguim nesta data.

## 4. Backend — trilha completa do Monólito Modular (PRs #23, #25 e fechamento Fases 4 e 5)

- **Fase 1 (PR #23):** consolidação do monólito modular orientado a eventos em `backend/app/{core,cache,queue,workers,domains,api}`, compatibilidade estrita com Python 3.10+ (`app.core.time`), contratos de erro RFC 7807 (`problem+json`), rastreamento `X-Correlation-ID`, Gateway Fiscal com HMAC/idempotência e ETL sobre `ledger.csv`.
- **Fase 2 (PR #25):** `RedisTTLCache` (`SET ... EX ... NX` atômico e serialização JSON/Pydantic segura sem `pickle`) e `RedisJobQueue` (Hashes, Lists, `ZSET` delayed retries e Dead-Letter Queue) com fallback automático para memória, orquestração concorrente de `AsyncWorkerRunner` via `lifespan`, `RateLimitMiddleware` por escopo/IP (`X-RateLimit-*`) e `SecurityHeadersMiddleware`.
- **Fase 3 (PR #25):** `HttpxPageFetcher` com limite de bytes em streaming, retries e guarda SSRF em cada salto de redirect + 3 extratores reais (`StructuredMetadataExtractor`, `HttpStaticExtractor`, `SitemapXmlExtractor` sem DTD/XXE) no tópico `scraping.extract`; `OpenAICompatibleInferenceAdapter` + `AIWorkflowService` validados por schemas Pydantic no tópico `ai_workflows.execute`; 3 workflows n8n versionados (`invoice-enrichment`, `scraping-postprocess`, `ai-anomaly-alert`), ponte `EventBus -> JobQueue` e callbacks autenticados por HMAC (`POST /api/v1/workflows/callbacks/{workflow_id}`).
- **Fase 4 (fechamento):** `RepositoryStageInspector` implementando `PipelineStageInspectorPort` no worker `pipelines.simulate` com auditorias estáticas, de AST, manifestos, bundles e Dockerfiles reais para `backend-api`, `ascii-engine` e `portfolio-static`, telemetria estruturada por estágio, **RCA verificável** (`GET /api/v1/pipelines/runs/{job_id}`) e suíte de resiliência/carga concorrente (rajada multi-worker, tempestade de idempotência, falhas transitórias, isolamento em DLQ e backpressure `503`).
- **Fase 5 — Última (fechamento):** Console Técnico RAG em `backend/app/domains/rag_console/` e `/api/v1/rag/*` (`index/status`, `index/rebuild`, `search`, `query`, `sources/{chunk_id}`) com chunking estrutural por AST/seções Markdown sobre a documentação e o código real do repositório, recuperação híbrida **Okapi BM25 + vetores densos L2-normalizados** fundidos via **Reciprocal Rank Fusion (RRF)** e citações `[1]..[k]` com verificação `verified_on_disk` por SHA-256 da fatia de linhas (além da integração em `assets/js/api-client.js`).
- Suíte do backend ampliada de 22 para **66 testes `pytest`** (`33` unitários + `33` integração/resiliência/carga), com `ruff` limpo.

## 5. Verificação consolidada

```text
node --test tests/*.test.js       -> 47/47
pytest (backend)                  -> 66 passed (33 unit + 33 integration)
python3 -m unittest (legado)      -> 6 passed
ruff check .                      -> All checks passed!
engine typecheck / build          -> OK
engine build:portfolio            -> OK
html-validate / JSON / YAML / JS  -> OK
Pages e Vercel                    -> mesmo SHA de main
```

Branches de feature/PR foram apagadas após cada merge; nenhuma configuração da
Vercel ou do GitHub foi alterada fora dos arquivos versionados do repositório.

## 6. Pendência explícita

Integrar `setObjectOutline()` ao pinguim em uma etapa futura, após validação visual
do contorno na engine. Esta documentação registra apenas a disponibilidade da API;
nenhum código de contorno foi adicionado ao frontend.

## 7. Ajuste final de UI no mesmo dia

- Removido o `<p class="hero-name">ERON YAMAMOTO</p>`: resta apenas o banner ASCII.
- O cartão da foto passou a ocupar `grid-row: 2 / span 4` com `margin-top` igual ao
  do `prompt-line`, alinhando o topo da moldura ao início do texto da direita; a
  coluna esquerda continua na mesma margem do banner.
- Brilho: padrão alterado de `110%` para `130%` e máximo de `130%` para `150%`
  (`--page-brightness: 1.3`, `value="130"`, `max="150"`). Controles de cenário e
  pinguim permanecem inalterados.

## 8. Placeholder ASCII do Neofetch

- O fallback rotacionado por raycaster em `assets/js/neofetch.js` foi substituído
  por uma arte ASCII estática de pinguim (olhos, bico e pés legíveis), exibida
  enquanto `engineActive === false` ou após falha da engine.
- Nenhum `requestAnimationFrame`, avanço de `yaw` ou listener de ponteiro existe
  no placeholder. `data-mode="engine"` / `tp:scene-mode` apenas oculta o placeholder
  via CSS; o pinguim 3D ativo mantém sua rotação horizontal original.
- API preservada: `init`, `computeFallbackGrid`, `setYaw`, `getState` e o ajuste
  adaptativo de fonte/container para desktop e mobile.

## 9. Botões de ação

- Rótulos padronizados no formato `[ termo ]`, sem `--` ou `github` colado:
  `pt-br` usa `[ contato ]` e `[ curriculo-* ]`; `en` usa `[ contact ]` e
  `[ resume-* ]`. Dicionários standalone e embutidos permanecem idênticos.
- LinkedIn corrigido para `https://www.linkedin.com/in/eron-yamamoto/`,
  inclusive no comando `contact` do console.
- Contato continua sendo um `<a>` acessível: em mobile abre `mailto:`, em
  desktop/telas não-mobile direciona para
  `https://api.whatsapp.com/send/?phone=5544920009249`. A detecção combina UA,
  `userAgentData.mobile` e media queries de ponteiro/largura, sem listeners de mouse.
