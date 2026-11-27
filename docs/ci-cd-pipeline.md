# CI/CD & Docker pipeline — painel real, cache e segurança frontend

Documento de referência da seção `[ LIVE CI/CD & DOCKER PIPELINE ]` do portfólio.
Cobre (1) a arquitetura real dos workflows do repositório, (2) como o frontend consome
os metadados públicos do GitHub Actions, (3) cache e rate-limit, (4) os controles de
segurança aplicados no cliente e (5) como validar tudo localmente.

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
GET https://api.github.com/repos/yamamotin/AncientStudio/actions/runs?per_page=6
GET https://api.github.com/repos/yamamotin/AncientStudio/actions/workflows
```

- `Accept: application/vnd.github+json` e `X-GitHub-Api-Version: 2022-11-28`.
- `credentials: 'omit'`, `cache: 'no-store'`, `referrerPolicy: 'no-referrer'`,
  `mode: 'cors'`.
- Nenhum header `Authorization` existe no arquivo.
- `actions/workflows` é consultado no máximo uma vez por dia (24 h, nomes e paths mudam
  pouco); `actions/runs` respeita o TTL de 5 minutos.

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
| Link do run | `html_url` | `<a>` apenas se passar na allowlist |

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
  últimos dados em cache (marcados como cache, com a idade em segundos) e sempre oferece
  o link direto `https://github.com/yamamotin/AncientStudio/actions`.
- **Timeout:** `AbortController` com 8 s por requisição; o timer é sempre limpo no
  `finally`. A mesma regra vale para o resto do frontend: 10 s em `/api/v1`
  (`api-client.js`), 5 s no probe `api-status.json`, 4 s no dicionário i18n — nenhuma
  chamada `fetch` fica sem limite de tempo.
- **Anti-flood:** `state.loading` impede requisições concorrentes, o botão fica
  desabilitado com `aria-busy="true"` durante a chamada e existe um cooldown de 4 s entre
  tentativas manuais (clique duplo ou repetido não gera tráfego extra).

## 4. Segurança no cliente

### 4.1 Zero segredos

- Nenhum `GITHUB_TOKEN`, `VERCEL_TOKEN`, chave de API ou credencial em `assets/js/**`,
  `index.html` ou dicionários.
- A chamada é pública: `credentials: 'omit'` e nenhum header de autorização.
- A chave de API digitada na UI (`#workflow-token`) é `type="password"`,
  `autocomplete="new-password"`, marcada com `data-sensitive="true"`, **nunca** é gravada
  em storage e é apagada em `pagehide` e em `visibilitychange` → `hidden`
  (`initSensitiveInputs()` em `assets/js/main.js`).
- Não existe campo de CPF/documento na UI atual. A regra de mascaramento e
  não-persistência é genérica (`input[data-sensitive]`), então qualquer campo sensível
  futuro já nasce mascarado, sem `autocomplete` do navegador e sem escrita em storage.
- O runner fictício saiu do cliente: `TP.api.runPipeline` foi removido e o painel nunca
  dispara builds. O endpoint `POST /api/v1/pipeline/run` continua existindo apenas no
  backend legado, com seus próprios testes, sem uso pela interface.

### 4.2 Proteção contra XSS e injeção de DOM

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

### 4.3 CSP e higiene de requisições

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

## 5. Validação

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
6. política CSP e `referrer` no `index.html`.

---

## English summary

The `[ LIVE CI/CD & DOCKER PIPELINE ]` section replaced the old fake simulator. It reads
only public, read-only GitHub Actions metadata for `yamamotin/AncientStudio`
(`/actions/runs?per_page=6` and `/actions/workflows`), renders workflow name, branch,
short SHA, status/conclusion, duration, UTC timestamp and the direct run link, and never
sends credentials (`credentials: 'omit'`, no `Authorization`).

A five-minute `localStorage` cache (validated again on read), an 8 s `AbortController`
timeout, an in-flight lock plus a 4 s cooldown protect both the visitor and the public API
rate limit; failures degrade to cached data plus a direct link to the Actions page.

All external values are coerced to bounded, control-character-free strings and inserted
with `createElement`/`textContent`; `href` is allowed only when it matches
`https://github.com/yamamotin/AncientStudio/actions/runs/<id>`, and external links use
`rel="noopener noreferrer"`. A `<meta>` CSP restricts scripts, styles, fonts and images to
`'self'` and network access to `'self'` plus `https://api.github.com`. No `vercel.json`
was added, deliberately avoiding deployment-config changes.
