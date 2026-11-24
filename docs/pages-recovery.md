# GitHub Pages 404 — diagnóstico e recuperação (resolvido)

## Estado atual

O repositório `yamamotin/AncientStudio` é público e o site do Pages está **habilitado e publicado**:

```bash
gh api repos/yamamotin/AncientStudio \
  --jq '{private,visibility,has_pages,default_branch}'
# {"private":false,"visibility":"public","has_pages":true,"default_branch":"main"}

gh api repos/yamamotin/AncientStudio/pages \
  --jq '{status,build_type,html_url,public,source}'
# {"status":"built","build_type":"workflow","html_url":"https://yamamotin.github.io/AncientStudio/","public":true,"source":{"branch":"main","path":"/"}}
```

A configuração correta em **Settings → Pages → Build and deployment** é:

- **Source:** `GitHub Actions`
- Branch: `main`
- Path: `/`

O environment `github-pages` existe, usa `main` como único branch permitido e não tem required reviewers nem wait timer:

```bash
gh api repos/yamamotin/AncientStudio/environments/github-pages/deployment-branch-policies \
  --jq '.branch_policies[].name'
# main
```

## Causa raiz do 404

Antes da habilitação, `has_pages` era `false` e `GET /repos/yamamotin/AncientStudio/pages` retornava 404. Consequentemente, `actions/configure-pages@v5` falhava com:

```text
HttpError: Not Found
Get Pages site failed. Please verify that the repository has Pages enabled and
configured to build using GitHub Actions...
```

As execuções `45484368524`, `45495502318`, `45495982085` e `45498148487` falharam exatamente nesse passo, depois de `Stage static site` e `Verify static artifact root` terem passado.

A tentativa de habilitar o Pages por API falhou com `403 Resource not accessible by integration`. Além disso, `configure-pages@v5 --enablement true` exige um PAT ou GitHub App com `administration:write` + `pages:write`; o `GITHUB_TOKEN` do workflow não serve. Portanto, a seleção do Source no painel foi o único ajuste necessário fora do código.

## Correção confirmada

Após Source = GitHub Actions, o run manual `45499594209` (commit `0baeee6`) terminou:

```text
build           success
deploy          success
verify-parity   success
```

E os dois hosts passaram a servir o mesmo SHA:

```text
https://yamamotin.github.io/AncientStudio/build.txt
https://ancientstudio.vercel.app/api/v1/build
→ 0baeee6305df9463dd1e2af22abf31c6ace2bc60
```

## Workflow auditado em `main`

`.github/workflows/pages.yml` está íntegro e usa o fluxo oficial:

1. `push` em `main` + `workflow_dispatch`.
2. Permissões explícitas: `contents: read`, `pages: write`, `id-token: write`.
3. `build`: checkout, staging em `_site/`, `build.txt` com `$GITHUB_SHA`, verificação da raiz, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`.
4. `deploy`: `needs: build`, `environment: github-pages`, `actions/deploy-pages@v4`.
5. `verify-parity`: `needs: deploy`, `continue-on-error: true`, compara `build.txt` com `/api/v1/build` da Vercel.

Não há problema de `basePath`: os caminhos são relativos e o bundle Vite escreve diretamente em `assets/js/ascii-engine.bundle.js`. A Vercel continua usando o `Dockerfile` da raiz; `ci-cd.yml` constrói somente `infra/docker/Dockerfile`.

## Validação após o deploy

```bash
PAGES_URL=https://yamamotin.github.io/AncientStudio
VERCEL_URL=https://ancientstudio.vercel.app

pages_sha=$(curl -fsSL "$PAGES_URL/build.txt" | tr -d '[:space:]')
vercel_sha=$(curl -fsSL "$VERCEL_URL/api/v1/build" \
  | python3 -c 'import json,sys; print(json.load(sys.stdin).get("sha",""))')
main_sha=$(git rev-parse origin/main)

printf 'pages=%s\nvercel=%s\nmain=%s\n' "$pages_sha" "$vercel_sha" "$main_sha"

test "$pages_sha" = "$vercel_sha" && echo 'PARITY OK'
test "$pages_sha" = "$main_sha" && echo 'PAGES MATCHES MAIN'
```

Ou:

```bash
./scripts/verify-pages-parity.sh
```

Configurações adicionais de CI/CD e auto-merge estão em `docs/cicd-auto-merge.md`.
