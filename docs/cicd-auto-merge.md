# CI/CD sem revisão manual de PR

## Como funciona

Os workflows continuam disparando automaticamente:

| Workflow | Gatilhos |
|---|---|
| `pages.yml` | `push` em `main`, `workflow_dispatch` |
| `ci-cd.yml` | `pull_request`, `push` em `main`, `workflow_dispatch` |
| `ci.yml` | `pull_request` para `main`, `push` em `main`/`arena/**`, `workflow_dispatch` |
| `pr-tests.yml` | `pull_request`, `push` em `main`, `workflow_dispatch` |
| `auto-merge.yml` | `workflow_run` completando nos três workflows de teste + `workflow_dispatch` |

`auto-merge.yml` chama `scripts/auto-merge-verified.sh`, que executa o fluxo completo:

1. encontra o PR aberto contra `main` pelo SHA exato do commit;
2. ignora PRs de fork, drafts e commits que mudaram depois do check;
3. espera que **todos** os checks exigidos estejam `SUCCESS`: `verify`, `test`, `Ruff + pytest`, `Docker build`;
4. recusa `FAILURE`, `SKIPPED`, `CANCELLED`, `TIMED_OUT` e `ACTION_REQUIRED`;
5. se o PR estiver `CONFLICTING`/`DIRTY`, chama `PUT /pulls/<n>/update-branch` para mesclar `main` na branch do PR sem reescrever alterações, e reaplica os checks no novo SHA;
6. confirma `MERGEABLE` / `CLEAN` e executa `gh pr merge <n> --merge`;
7. apaga a branch mesclada via API (`main`, `dev/portfolio` e `dev/engine` são protegidas);
8. dispara `pages.yml` e `ci-cd.yml` com `workflow_dispatch` e o SHA exato do merge.

Não há aprovação automática: o GitHub impede aprovar o próprio PR (`Review Can not approve your own pull request`) e uma branch protection com required reviews continuaria bloqueando o merge. O merge é feito pelo `GITHUB_TOKEN`, que tem `pull-requests: write` concedido explicitamente no workflow.

## Por que o deploy parou após merges automáticos

GitHub **não inicia novos workflow runs** para eventos gerados pelo `GITHUB_TOKEN` (a exceção é `workflow_dispatch`/`repository_dispatch`). Assim, quando o auto-merge mesclava um PR, o push resultante em `main` não disparava `pages.yml` nem o job de deploy da Vercel: o Pages ficou preso em `df9cb70` enquanto a Vercel, que usa webhook Git próprio, já estava em `9e22e14`.

A correção é o passo 8 acima: depois de mesclar e apagar a branch, o helper dispara explicitamente os dois workflows de deploy pelo SHA do merge. Ambos aceitam o input `sha` e fazem checkout/commit exato, então não há corrida com um push posterior. O `auto-merge.yml` concede `actions: write` ao `GITHUB_TOKEN`, sem o qual `gh workflow run` falha com 403 após o merge.

Se duas execuções do helper observarem o mesmo PR, a que perder a corrida vê o estado `MERGED` e sai sem duplicar limpeza ou deploy. O fluxo completo é verificado com um PR de validação: após os checks, o próprio `auto-merge.yml` mescla, apaga a branch e dispara os dois deploys sem intervenção humana.

A Vercel também é publicada pelo GitHub Action `ci-cd.yml` quando `VERCEL_TOKEN`, `VERCEL_ORG_ID` e `VERCEL_PROJECT_ID` existem; sem esses secrets, o job registra `notice` e a integração Git nativa da Vercel continua fazendo o deploy.

## Configurações exatas no GitHub

### Settings → Pages → Build and deployment

- **Source:** `GitHub Actions` (não `Deploy from a branch`).
- Branch do site: `main`; path: `/`.
- Verificação atual:

```bash
gh api repos/yamamotin/AncientStudio/pages \
  --jq '{status,build_type,html_url,public,source}'
# {"status":"built","build_type":"workflow","html_url":"https://yamamotin.github.io/AncientStudio/","public":true,"source":{"branch":"main","path":"/"}}
```

`actions/configure-pages@v5` falha com `HttpError: Not Found` quando o Pages não está habilitado. O parâmetro `enablement: true` **não** resolve com `GITHUB_TOKEN` — a documentação da action exige PAT ou GitHub App com `administration:write` + `pages:write`. Por isso a seleção do Source no painel é o único passo de configuração do Pages.

### Settings → Environments → github-pages

- **Deployment branches:** `main` apenas (verificado pela API).
- **Required reviewers:** nenhum; **Wait timer:** `0`. Se houver revisores obrigatórios, o job `deploy` fica parado e o deploy deixa de ser automático.
- Nenhum secret é necessário: o workflow já declara `pages: write` e `id-token: write`.

```bash
gh api repos/yamamotin/AncientStudio/environments/github-pages \
  --jq '{protection_rules,wait_timer,deployment_branch_policy}'
gh api repos/yamamotin/AncientStudio/environments/github-pages/deployment-branch-policies \
  --jq '.branch_policies[].name'
# main
```

### Settings → Actions → General → Workflow permissions

- Marque **Read and write permissions**.
- Deixe **Allow GitHub Actions to create and approve pull requests** desmarcado — este fluxo não cria nem aprova PRs.
- Os workflows também declaram `permissions:` explícitas; isso mantém o pipeline funcional mesmo que a organização altere o padrão.

### Settings → Branches → main

- Não configure **Required reviews**: isso reintroduziria aprovação humana e o auto-merge não conseguiria avançar.
- Se quiser exigir checks no branch protection, use exatamente: `verify`, `test`, `Ruff + pytest`, `Docker build`. O helper já espera por eles antes de mesclar.

### Settings → General → Pull Requests

- Opcional: marque **Allow auto-merge**. O workflow usa `gh pr merge --merge` diretamente e não depende dessa opção.

## Confirmando um run verde na main

```bash
git fetch origin main --prune
git rev-parse origin/main

gh run list --workflow=pages.yml --limit 1 \
  --json databaseId,headSha,status,conclusion \
  --jq '.[] | [.databaseId, .headSha, .status, .conclusion] | @tsv'

run_id=$(gh run list --workflow=pages.yml --limit 1 --json databaseId --jq '.[0].databaseId')
gh run view "$run_id" --json jobs \
  --jq '.jobs[] | [.name, .conclusion] | @tsv'
```

Saída esperada:

```text
build       success
deploy      success
verify-parity   success
```

## Confirmando publicação e paridade

```bash
PAGES_URL=https://yamamotin.github.io/AncientStudio
VERCEL_URL=https://ancientstudio.vercel.app
main_sha=$(git rev-parse origin/main)

# O "?v=$main_sha" evita que as CDNs devolvam um SHA antigo em cache.
curl -fsSL "$PAGES_URL/build.txt?v=$main_sha"
curl -fsSL "$VERCEL_URL/api/v1/build?v=$main_sha"

./scripts/verify-pages-parity.sh
```

Os três SHAs precisam ser iguais a `git rev-parse origin/main`. O helper imprime:

```text
pages=<sha>
vercel=<sha>
PARITY OK
main=<sha>
PAGES MATCHES MAIN
```

Evidência real após a habilitação do Pages: run `45499594209` terminou com `build`, `deploy` e `verify-parity` em `success`, e ambos os hosts serviram `0baeee6305df9463dd1e2af22abf31c6ace2bc60`.
