# Retenção Automática de Imagens no Vercel Container Registry (VCR)

Este documento descreve a automação de limpeza de imagens do repositório **`dockerfile`** no **Vercel Container Registry (VCR)** do projeto **`ancientstudio`**, garantindo que **no máximo as 3 imagens mais recentes** (`[0]`, `[1]`, `[2]`) permaneçam armazenadas e todas as excedentes (`[3..]`) sejam removidas.

---

## Arquitetura

| Componente | Caminho | Papel |
|---|---|---|
| Workflow GitHub Actions | `.github/workflows/vcr-cleanup.yml` | Dispara após sucesso do CI/CD na `main`, por `workflow_call` pós-redeploy do auto-merge, a cada 6 horas (`schedule`) e manualmente (`workflow_dispatch`). |
| Integração pós-deploy | `.github/workflows/ci-cd.yml` (`job: vcr-cleanup`) | Invoca `vcr-cleanup.yml` via `workflow_call` em execuções `workflow_dispatch` na `main` (fluxo acionado por `auto-merge.yml` com `GITHUB_TOKEN`, que não emite novo `workflow_run`). |
| Script de retenção | `scripts/vcr-cleanup.js` | Node.js puro (zero dependências externas). Suporta `auto` (CLI oficial `vercel vcr` com fallback automático para a API REST `/v1/vcr/repository/...`), `cli` e `api`. |
| Suíte de testes | `tests/vcr-cleanup.test.js` | Testes unitários e de integração validando gatilhos do workflow, ordenação estrita `[0..2]` vs `[3..]`, paginação `--next`, modo `DRY_RUN`, resolução de escopo/time, ausência de `VERCEL_TOKEN` e redação de segredos. |

---

## Regra Estrita de Retenção (`KEEP_COUNT = 3`)

1. Lista todas as imagens do repositório `dockerfile` (paginando até 100 itens por página via `--next` na CLI ou `cursor` na API REST, com deduplicação por `id` e proteção contra cursores repetidos).
2. Normaliza timestamps (`ISO-8601`, Unix segundos ou Unix milissegundos) e ordena **estritamente da mais recente (`[0]`) para a mais antiga (`[N - 1]`)**, com desempate determinístico por `id`.
3. **Preserva apenas os índices `[0]`, `[1]` e `[2]`** (`KEEP [0..2]`).
4. **Remove todas as imagens a partir do índice `[3]`** (`DELETE [3..]` em modo real, ou `WOULD_DELETE [3..]` em `DRY_RUN=true`).
5. **Cenário com `<= 3` imagens** (`0`, `1`, `2` ou `3`): nenhuma exclusão é feita e o processo encerra de forma limpa com código `0`.
6. **Tratamento de falhas e higiene de segredos**:
   - Caso a exclusão de uma imagem excedente retorne `HTTP 404` (já removida), o script trata de forma idempotente; falhas reais são registradas por imagem sem interromper a tentativa nas demais excedentes, encerrando ao final com código `1` se houver erro pendente.
   - `VERCEL_TOKEN` nunca é passado via argumentos de linha de comando (`argv`), tem quebras de linha/aspas higienizadas antes de compor headers HTTP e é mascarado (`[REDACTED]`) em qualquer mensagem de erro.

---

## Gatilhos do Workflow (`.github/workflows/vcr-cleanup.yml`)

Para evitar execuções redundantes em estados intermediários de deploy (`pending`, `queued`, `in_progress`, `inactive`) ou em deploys de `github-pages`/PRs, o workflow **não utiliza** `deployment_status:` sem filtro nem `push:` prematuro:

1. **`workflow_run`**: dispara somente quando `CI/CD — backend, Docker and deploy` conclui na branch `main` (`branches: [main]`) com `conclusion == 'success'`.
2. **`workflow_call`**: chamado pelo job `vcr-cleanup` em `.github/workflows/ci-cd.yml` após o job `deploy` em execuções `workflow_dispatch` na `main` (cobrindo merges automáticos via `auto-merge.yml`).
3. **`schedule`** (`17 */6 * * *`): varredura periódica a cada 6 horas para limpar imagens criadas por builds de Preview ou deploys diretos na Vercel.
4. **`workflow_dispatch`**: execução manual sob demanda com parâmetros `dry_run` (`true`/`false`), `keep` (padrão `"3"`), `repository` (padrão `"dockerfile"`), `project` (padrão `"ancientstudio"`) e `backend` (`auto` | `cli` | `api`).

---

## Segredos e Variáveis no GitHub Actions

Configure em **Settings → Secrets and variables → Actions → Repository secrets** (nível do repositório, para que tanto `ci-cd.yml` quanto `vcr-cleanup.yml` tenham acesso):

| Nome | Tipo | Obrigatório? | Valor / Descrição para `ancientstudio` |
|---|---|---|---|
| `VERCEL_TOKEN` | Repository Secret | **Sim** | Token de acesso da conta Vercel (`Account Settings → Tokens`) com escopo sobre o time do projeto `ancientstudio`. |
| `VERCEL_ORG_ID` | Repository Secret *(ou Variable)* | Recomendado | `team_3I0m4Qd129KEjCoB5ZSXlXrB` (Team ID Northstar do projeto; se omitido, o backend REST descobre automaticamente via `/v2/user` e `/v2/teams`). |
| `VERCEL_PROJECT_ID` | Repository Secret *(ou Variable)* | Opcional | `prj_AeJPwi2sV6piaskbKcyRd7vyCJwJ` (ou `"ancientstudio"`, padrão automático). |
| `VCR_REPOSITORY` | Repository Variable | Opcional | `"dockerfile"` (padrão automático). |

### Comportamento quando `VERCEL_TOKEN` não está configurado
- **Execuções automáticas** (`workflow_run`, `workflow_call`, `schedule`): emite `::warning::` e resumo detalhado em `$GITHUB_STEP_SUMMARY` (`SKIPPED_NO_TOKEN`) instruindo a configuração do secret, encerrando com código `0` para não quebrar pipelines de código.
- **Execução manual (`workflow_dispatch`) ou local via CLI**: falha explicitamente com código `2` (`MISSING_VERCEL_TOKEN`) e `::error::`, evitando falso positivo silencioso.

---

## Uso Local e Simulação (`dry_run`)

```bash
# 1. Simulação segura (lista KEEP [0..2] e WOULD_DELETE [3..] sem excluir nada)
VERCEL_TOKEN="..." \
VERCEL_ORG_ID="team_3I0m4Qd129KEjCoB5ZSXlXrB" \
VERCEL_PROJECT_ID="prj_AeJPwi2sV6piaskbKcyRd7vyCJwJ" \
node scripts/vcr-cleanup.js --dry-run

# 2. Execução real retendo apenas as 3 imagens mais recentes
VERCEL_TOKEN="..." \
VERCEL_ORG_ID="team_3I0m4Qd129KEjCoB5ZSXlXrB" \
VERCEL_PROJECT_ID="prj_AeJPwi2sV6piaskbKcyRd7vyCJwJ" \
node scripts/vcr-cleanup.js

# 3. Forçar backend REST API direto (sem depender do pacote global `vercel`)
VERCEL_TOKEN="..." node scripts/vcr-cleanup.js --backend api --dry-run
```
