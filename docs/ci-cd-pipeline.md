# CI/CD & Docker pipeline — painel real, cache e segurança frontend

Documento de referência da seção `[ LIVE CI/CD & DOCKER PIPELINE ]` do portfólio.
Cobre (1) a arquitetura real dos workflows do repositório, (2) o resumo executivo
orientado ao cliente e o detalhamento colapsável, (3) como o frontend consome os
metadados públicos do GitHub Actions, (4) cache e rate-limit, (5) os controles de
segurança aplicados no cliente e (6) como validar tudo localmente.

Versão renderizada (é o alvo do link `[ documentação técnica ]` do portfólio):
`docs/ci-cd-pipeline.html`. O Markdown continua sendo a fonte.

> **Escopo:** somente metadados públicos, somente leitura. Nenhum token, segredo ou
> credencial é embutido, solicitado ou enviado pelo frontend.
>
> **Contratos preservados:** `ascii-engine-module/`, `assets/js/ascii-engine.bundle.js`
> e `assets/js/engine-adapter.js` não foram alterados. O valor interno
> `mode: 'playground'` do adapter é contrato da engine 3D e continua igual; o que saiu do
> portfólio foi apenas o texto “Playground” de títulos, rótulos e metadados.

---

## 1. Arquitetura real dos workflows

Os dados exibidos no painel vêm dos workflows versionados em `.github/workflows/`.

| Workflow | Arquivo | O que executa |
| --- | --- | --- |
| `CI — Backend, ASCII 3D Engine & Portfolio Integrity` | `ci.yml` | Node 22 + Python 3.11, `npm ci`/`typecheck`/`build`/`build:portfolio` da engine, verificação do bundle `assets/js/ascii-engine.bundle.js` (não vazio e sem diff), `node --test tests/*.test.js` e `python3 -m unittest discover -s tests -p "test_*.py"`. |
| `CI/CD — backend, Docker and deploy` | `ci-cd.yml` | `ruff check .` + `pytest` em `backend/`, build da imagem `infra/docker/Dockerfile` e deploy de produção na Vercel (quando os secrets existem). |
| `Deploy static site to GitHub Pages` | `pages.yml` | Publica o artefato estático no GitHub Pages e executa a checagem de paridade `Pages × Vercel` **não bloqueante** (`scripts/verify-pages-parity.sh`). |
| `PR tests` | `pr-tests.yml` | Suíte modular rápida em pull requests (`node --check`, `node --test`). |
| `Auto-merge verified PRs` | `auto-merge.yml` | Aplica a ordem permanente `merge (resolve-conflicts) → delete-branch → redeploy`, disparando `pages.yml` e `ci-cd.yml` com o SHA exato. |
| `VCR Image Retention Cleanup` | `vcr-cleanup.yml` | Retenção automatizada das **3 imagens mais recentes** `dockerfile` no Vercel Container Registry (VCR), via `scripts/vcr-cleanup.js` (CLI `vercel vcr` ou REST API), com modo `dry_run`, agendamento diário e gatilho após o CI/CD. |

Observações de infraestrutura:

- O `Dockerfile` da raiz continua servindo `api/server.py` na hospedagem atual da Vercel;
  `infra/docker/Dockerfile` empacota o backend FastAPI completo.
- A limpeza do VCR existe justamente porque o registro tem limite de imagens
  (`repository has reached the maximum allowed number of images`), falha que já bloqueou
  builds de produção. Detalhes em [`vcr-cleanup.md`](./vcr-cleanup.md).

## 2. Como o frontend consome os dados públicos

Arquivo: `assets/js/pipeline.js` (exposto como `TP.pipeline`).

Somente dois endpoints públicos, sem autenticação:

```text
GET https://api.github.com/repos/yamamotin/AncientStudio/actions/runs?per_page=10
GET https://api.github.com/repos/yamamotin/AncientStudio/actions/workflows
```

- `Accept: application/vnd.github+json` e `X-GitHub-Api-Version: 2022-11-28`.
- `credentials: 'omit'`, `cache: 'no-store'`, `referrerPolicy: 'no-referrer'`,
  `mode: 'cors'`.
- Nenhum header `Authorization` existe no arquivo.
- `actions/workflows` é consultado no máximo uma vez por dia (24 h, nomes e paths mudam
  pouco); `actions/runs` respeita o TTL de 5 minutos.
- Busca até 10 execuções, renderiza no máximo 6 (`TP.pipeline.config.maxRuns`).

Campos exibidos por execução, todos verificáveis no GitHub:

| Campo | Origem na API | Renderização |
| --- | --- | --- |
| Nome do workflow | `name` | texto |
| Branch | `head_branch` | texto |
| Commit curto | `head_sha` (7 primeiros caracteres) | texto/wait |
| Status/conclusão | `status`, `conclusion` | selo (`success`, `failure`, `in_progress`, …) |
| Duração | `run_started_at` → `updated_at` | `Xs` ou `Xm Ys` |
| Timestamp | `updated_at` | `YYYY-MM-DD HH:MM UTC` |
| Número do run | `run_number` | `#N` |
| Link do run | `html_url` | no máximo **um** link allowlisted, na documentação técnica |

## 3. Cache, rate-limit e fallback informativo

- **TTL de dados:** `300000 ms` (5 minutos) em `localStorage` sob a chave
  `tp.gh-actions.v1`. Se o storage estiver bloqueado (`file://`, modo privado, cota
  cheia) o estado continua em memória — o painel nunca depende do storage.
- **Cache defensivo:** o conteúdo lido do storage é re-sanitizado com `sanitizeRuns()`
  antes de renderizar, então um cache adulterado não injeta URL ou campo inválido.
- **Rate-limit não autenticado:** 60 requisições/hora por IP. O painel lê
  `x-ratelimit-remaining` e `x-ratelimit-reset`; abaixo de 10 restantes a cota aparece
  na linha de status, e um `403`/`429` mostra a mensagem de limite com o horário de
  renovação.
- **Fallback informativo:** em falha de rede, timeout ou rate-limit, o painel mantém os
  últimos dados em cache (marcados como cache, com a idade em segundos) e informa quando
  a API volta a responder. Links externos por execução não existem mais: a única URL
  externa do painel é o link allowlisted da última execução, dentro da documentação
  técnica, e a referência `https://github.com/yamamotin/AncientStudio/actions` no
  `<noscript>`.
- **Timeout:** `AbortController` com 8 s por requisição; o timer é sempre limpo no
  `finally`. A mesma regra vale para o resto do frontend: 10 s em `/api/v1`
  (`api-client.js`), 5 s no probe `api-status.json`, 4 s no dicionário i18n — nenhuma
  chamada `fetch` fica sem limite de tempo.
- **Anti-flood:** `state.loading` impede requisições concorrentes, o botão fica
  desabilitado com `aria-busy="true"` durante a chamada e existe um cooldown de 4 s entre
  tentativas manuais (clique duplo ou repetido não gera tráfego extra).

## 4. Monitor compacto orientado ao cliente

A seção deixou de ser uma lista de links e virou uma **tela de monitoramento compacta**:

- **Resumo executivo sempre visível** (`#pipeline-summary`, quatro cartões preenchidos
  apenas com dados reais da API): última execução (`status · HH:MM UTC`), confiabilidade
  (`sucessos/concluídas · %`), higiene das imagens Docker (última execução do
  `vcr-cleanup.yml`, política das 3 imagens mais recentes) e quantidade de workflows
  monitorados.
- **Sem links repetidos por item:** cada linha da lista mostra nome, selo de status,
  branch, SHA curto, duração e timestamp. O `[ abrir run ]` de cada execução e o botão
  `[ open actions ]` foram removidos; sobrou apenas `[ atualizar ]`.
- **Ruído interno filtrado:** execuções do `Auto-merge verified PRs` e conclusões
  `skipped`/`cancelled` não entram no resumo nem na lista. Quando algo é filtrado, a nota
  `#pipeline-filter-note` explica o critério (`pipeline.filtersNote`).
- **Detalhamento colapsável:** o corpo (`#pipeline-body`) guarda a lista de execuções, a
  nota de filtro, o `<noscript>` e o bloco `[ documentação técnica ]`. O painel abre
  recolhido (`data-collapsed="true"`) para não empurrar o resto do portfólio.
- **Sem fabricação de dados:** o cliente nunca inventa status, imagens ou contagens; se a
  API não responde, os cartões mostram o último valor carregado ou `—`.

A mesma política de altura compacta vale para as seções altas do portfólio que não são o
palco 3D: `#pipeline` e `#gateway` abrem recolhidas e `#stack`, que é curta, abre expandida.
O mecanismo é único: `[data-collapsible]` + `[data-collapse-toggle]` + `.collapse-body`.

**Exceção deliberada — `#scene`:** a cena 3D é o ativo visual principal e fica **sempre
montada e expandida**. Ela não tem `data-collapsible`, não tem botão de recolher/expandir e
não tem `#scene-body` recortável; por isso o `engine-adapter.js` monta o palco assim que a
seção entra no viewport, sem depender de um clique para "abrir". Os controles da cena
continuam intactos: barra de fonte/célula (slider + leitura em px, sem o antigo botão
`[ restaurar ]`), presets `[ Dia ]`, `[ Noite ]`, `[ Chuva ]` (padrão), `[ pause ]`,
`[ tela cheia ]` e zoom por scroll do mouse.

**Exceção deliberada — `#stack` (STACK // NEOFETCH):** a seção do pinguim também fica
**sempre expandida**: não tem `data-collapsible`, `data-collapsed`, botão de recolher nem
`collapse-body`, então o palco Tux e a tabela de specs ficam visíveis sem interação. Só
`#pipeline` e `#gateway` continuam recolhíveis.

**Campos das APIs:** todos os inputs da seção de APIs começam **vazios** — sem
`placeholder` e sem `value` padrão (inclusive o CPF de exemplo, que não existe mais no
markup). A validação continua: `maxlength`/`min`/`max`/`inputmode`, `data-sensitive` nos
campos sigilosos, o guard local `FIELD_REQUIRED` (422 no card da própria API, campo focado
com `aria-invalid`) e a validação mod-11/módulo-97 no cliente e no servidor.

| Peça | Papel |
| --- | --- |
| `data-collapsible` / `data-collapsed` | marca a seção e o estado inicial |
| `[data-collapse-toggle][aria-controls]` | botão `[ expandir ]` / `[ recolher ]` com `aria-expanded` |
| `.collapse-body` | corpo limitado por `max-height` + gradiente; **nunca** `display:none` |
| `body.inert` | remove foco/ordem de tabulação do conteúdo recolhido |
| `TP.collapse` (`assets/js/main.js`) | aplica estado, traduz o rótulo e reage a `tp:languagechange` |

Detalhes de implementação relevantes:

- Recolher uma seção **não** destrói nem remede a cena 3D quando ela está envolvida: o
  mecanismo só recorta por `max-height`, mantém o contrato público (`engine-adapter.js`,
  `ascii-engine.bundle.js`) e o `ResizeObserver` do adapter válido. A cena em si nunca é
  envolvida — ver a exceção abaixo.
- O fullscreen da cena não mexe mais no mecanismo de colapso: desde que a seção passou a
  ser sempre expandida, não existe clamp para suspender.
- Rótulos traduzidos em pt-br **e** en (`common.expand` / `common.collapse`), presentes nos
  dois JSON e no dicionário embutido `BUNDLED`.

## 5. Segurança no cliente

### 5.1 Zero segredos

- Nenhum `GITHUB_TOKEN`, `VERCEL_TOKEN`, chave de API ou credencial em `assets/js/**`,
  `index.html` ou dicionários.
- A chamada é pública: `credentials: 'omit'` e nenhum header de autorização.
- A chave de API digitada na UI (`#workflow-token`) é `type="password"`,
  `autocomplete="new-password"`, marcada com `data-sensitive="true"`, **nunca** é gravada
  em storage e é apagada em `pagehide` e em `visibilitychange` → `hidden`
  (`initSensitiveInputs()` em `assets/js/main.js`).
- O formulário público de consulta PROJUDI (Gateway → ETL/Integrações) recebe um CPF
  validado por mod-11. Esse campo é `data-sensitive="true"`, sem `autocomplete`, sem
  `spellcheck`, e a regra é genérica: nenhum `input[data-sensitive]` é gravado em
  storage, todos são limpos em `pagehide`/aba oculta e ficam mascarados quando fora de
  foco (`input[data-sensitive]:not(:focus) { -webkit-text-security: disc }`). O valor só
  viaja no corpo da própria requisição para `/api/v1/projudi/*`, nunca é ecoado no painel
  de resposta nem no console. A máscara definitiva de exibição LGPD
  (`***.456.789-**`) é aplicada no servidor.
- O popup de CAPTCHA (`assets/js/captcha.js`) só aceita `https:` de hosts da allowlist
  (`consulta.tjpr.jus.br`, `www.tjpr.jus.br`, `www.google.com`, `www.recaptcha.net`...):
  `javascript:`, `data:`, `http:` e credenciais embutidas são descartados antes de qualquer
  `href`. Nenhum frame remoto é embutido (`frame-src 'none'`), todo texto entra por
  `textContent` (zero `innerHTML`), e o token/cookie de sessão são apagados do DOM ao fechar
  o diálogo, ao expirar o desafio e em `pagehide`. O token resolvido também é mascarado
  (`captcha_token=***`) no rótulo de rota do painel de resposta.
- O runner fictício saiu do cliente: `TP.api.runPipeline` foi removido e o painel nunca
  dispara builds. O endpoint `POST /api/v1/pipeline/run` continua existindo apenas no
  backend legado, com seus próprios testes, sem uso pela interface.

### 5.2 Proteção contra XSS e injeção de DOM

- Toda renderização usa `document.createElement` + `textContent`. Não existe
  `innerHTML`, `outerHTML`, `insertAdjacentHTML` ou `document.write` com dado externo.
- `text(value, max)` coage qualquer valor a string, remove caracteres de controle e
  marcas de direção Unicode (`\u202a`–`\u202e`, `\u200b`–`\u200f`), normaliza espaços e
  limita o tamanho (96 caracteres por padrão; 72 para nomes).
- `safeRunUrl()` é uma allowlist estrita:
  `^https://github.com/yamamotin/AncientStudio/actions/runs/\d{1,20}$`. Qualquer outro
  valor — `javascript:`, outro repositório, path traversal, host da API — retorna string
  vazia e o link simplesmente não é criado.
- `sanitizeRun()` só aceita `status`/`conclusion` no formato `[a-z_]{3,24}`, SHA
  hexadecimal e timestamps ISO `YYYY-MM-DDTHH:MM:SSZ`; o resto é descartado.
- Todo elemento externo criado recebe `target="_blank"` + `rel="noopener noreferrer"`.
  O link da última execução (`#pipeline-last-run-link`) fica `hidden` até existir uma URL
  que passe na allowlist; sem URL válida, `href`, `target` e `rel` são removidos.

### 5.3 CSP e higiene de requisições

`index.html` declara, via `<meta http-equiv="Content-Security-Policy">`:

```text
default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self';
style-src 'self'; img-src 'self' data:; font-src 'self';
connect-src 'self' https://api.github.com; form-action 'self'; frame-src 'none'
```

- Sem `unsafe-inline` e sem `unsafe-eval`: não há script inline, o CSS é externo e o
  bundle da engine não usa `eval`/`new Function`.
- `connect-src` limita as chamadas de rede ao próprio site (`/api/v1`, `api-status.json`)
  e ao host público do GitHub.
- `<meta name="referrer" content="strict-origin-when-cross-origin">` evita vazar a URL
  completa do portfólio em navegações externas.
- **Decisão consciente:** não foi criado `vercel.json` com headers de segurança, para não
  alterar a configuração de deploy do projeto (o ambiente Vercel é usado apenas para
  verificação). Headers HTTP definitivos ficam no middleware do backend
  (`backend/app/core/middleware.py`); a CSP em `<meta>` já vale para GitHub Pages e
  Vercel sem tocar em infraestrutura.
- `rel="noopener noreferrer"` em todos os links externos do HTML (LinkedIn, Actions,
  documentação).

## 6. Documentação: por que existe um HTML

O link `[ documentação técnica ]` apontava para `docs/ci-cd-pipeline.md`. Servidores
estáticos (`api/server.py` na Vercel e o Pages) entregam `.md` como
`text/markdown`/`text/plain`: o navegador baixa o arquivo ou mostra texto cru, sem índice,
sem tabelas. Não havia router JS nem renderer de Markdown no cliente — interceptar o link
não resolveria nada.

Correção aplicada em duas partes:

1. **Formato:** `docs/ci-cd-pipeline.html` é uma renderização estática, autocontida (css
   inline, sem script, sem dependência externa) do mesmo conteúdo, versionada junto com o
   Markdown. O link do painel (`#pipeline-doc-link`) aponta para `docs/ci-cd-pipeline.html`,
   um caminho relativo que funciona em `file://`, no GitHub Pages (`/AncientStudio/docs/...`)
   e na Vercel. A página inclui um link de volta para o Markdown fonte no GitHub.
2. **Empacotamento:** `docs/` não era publicado em nenhum dos dois hosts — o staging do
   Pages copiava só `index.html robots.txt sitemap.xml api-status.json assets` e o
   `Dockerfile` usado pela Vercel copiava apenas `assets` e `api`. Agora `pages.yml` copia
   `docs` para `_site` (com `test -f _site/docs/ci-cd-pipeline.html`) e o `Dockerfile` faz
   `COPY docs ./docs` (com `test -f ./docs/ci-cd-pipeline.html`), então o mesmo caminho
   relativo resolve nos três ambientes.

## 7. Validação do artefato `_site/` (deploy do Pages)

O staging e a verificação do artefato saíram do YAML e viraram o script versionado
`scripts/build-pages-site.sh`, chamado por um único passo (`Stage and verify static
artifact`) do `pages.yml`:

```bash
./scripts/build-pages-site.sh                        # stage + verify em _site/
SITE_DIR=/tmp/_site ./scripts/build-pages-site.sh    # artefato alternativo
SKIP_STAGE=1 SITE_DIR=/tmp/_site ./scripts/build-pages-site.sh   # re-verifica o existente
```

O script copia apenas arquivos de navegador (`index.html robots.txt sitemap.xml
api-status.json assets docs`), grava `_site/build.txt` com o `DEPLOY_SHA` **conferido depois**
e valida cada exigência com tamanho mínimo por arquivo (`index.html`, CSS, JS, bundle,
dicionários i18n, currículos, fonte WOFF2, os três arquivos de `assets/draco/`, o modelo
3D e o doc HTML). Cada falha é anunciada como anotação `::error file=<caminho>::<motivo>`,
seguida de `::error::Pages artifact incomplete`, então o run aponta o arquivo exato —
nunca um `exit code 1` anônimo.

O caminho do modelo 3D **não** é hardcoded: o script lê o `./assets/models/*.glb` de
`assets/js/engine-adapter.js`, exige que ele exista, tenha entre 1 MiB e 20 MiB e seja o
**único** `*.glb` em `_site/assets/models`. Foi essa checagem que faltava quando o commit
`965e49b` renomeou o export para `cena_final.glb` (66 MiB, texturas PNG/JPEG): a página
passou a pedir um arquivo inexistente, o passo antigo morria em `test -s
_site/assets/models/cena_completa.glb` sem dizer qual arquivo era, e o deploy do Pages
(`DEPLOY_SHA: 965e49b`) falhou com `exit code 1`. O modelo foi reencodado (Draco + WebP
`1024px`, `15.18 MiB`) e voltou ao nome canônico `assets/models/cena_completa.glb`, com a
textura nova da `FuturisticGirl` preservada (`FuturisticGirl_Mat`).

Regressões cobertas por teste: `tests/ci.test.js` executa o script de verdade em um diretório
temporário (artefato completo ⇒ exit 0) e, removendo o `.glb`, exige exit ≠ 0 com
`::error file=assets/models/cena_completa.glb::missing from _site`; `tests/static.test.js`
garante que o modelo citado no adapter existe, é binário e é o único da pasta.

## 8. Validação geral

```bash
node --check assets/js/*.js
node --test tests/*.test.js
python3 -m unittest discover -s tests -p "test_*.py" -v
npx html-validate index.html
```

Cobertura específica do painel em `tests/pipeline-panel.test.js`:

1. endpoints/TTL/timeout/cooldown exatos (`TP.pipeline.config`);
2. ausência de credenciais, presença de `AbortController`, `credentials: 'omit'` e
   ausência de `innerHTML`;
3. allowlist de URL e sanitização de payload hostil (URL inválida, status inválido,
   caractere nulo, nome longo);
4. cálculo de duração e validação de timestamps;
5. títulos das seções e proibição de `playground|simulator|simulador|sandbox` em pt-br/en;
6. política CSP e `referrer` no `index.html`;
7. ausência de links por execução (`pipeline.runLink` / `pipeline.openActions`), presença
   do resumo executivo e do controle de recolher/expandir nas seções recolhíveis — e
   ausência total desse controle na cena 3D (`tests/engine.test.js`);
8. paridade das novas chaves i18n (`common.expand`, `common.collapse`,
   `pipeline.summary.*`) entre pt-br, en e o dicionário embutido.

---

## English summary

The `[ LIVE CI/CD & DOCKER PIPELINE ]` section replaced the old fake simulator. It reads
only public, read-only GitHub Actions metadata for `yamamotin/AncientStudio`
(`/actions/runs?per_page=6` and `/actions/workflows`), renders workflow name, branch,
short SHA, status/conclusion, duration, UTC timestamp and the direct run link, and never
sends credentials (`credentials: 'omit'`, no `Authorization`).

The section is now a compact, collapsible monitoring screen: an always-visible executive
summary (latest run, reliability, Docker image hygiene, monitored workflows) plus a
filtered run list inside a collapsed body, with a single `[ refresh ]` action and an
`[ expand ]` / `[ collapse ]` control translated in every locale. Per-run `[ open run ]`
links and the `[ open actions ]` button were removed on purpose. The 3D scene section is
the documented exception: it is always mounted and expanded, with no collapse control, so
the engine never waits for an expand gesture.

The technical documentation link now opens `docs/ci-cd-pipeline.html`, a self-contained
static rendering served correctly by GitHub Pages and Vercel (raw `.md` was being
downloaded as plain text). The Markdown file remains the source.

A five-minute `localStorage` cache (validated again on read), an 8 s `AbortController`
timeout, an in-flight lock plus a 4 s cooldown protect both the visitor and the public API
rate limit; failures degrade to cached data plus a direct link to the Actions page.

All external values are coerced to bounded, control-character-free strings and inserted
with `createElement`/`textContent`; `href` is allowed only when it matches
`https://github.com/yamamotin/AncientStudio/actions/runs/<id>`, and external links use
`rel="noopener noreferrer"`. A `<meta>` CSP restricts scripts, styles, fonts and images to
`'self'` and network access to `'self'` plus `https://api.github.com`. No `vercel.json`
was added, deliberately avoiding deployment-config changes.
