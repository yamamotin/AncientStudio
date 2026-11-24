# GitHub Pages 404 — diagnóstico e recuperação (atualizado)

## Estado atual

O repositório `yamamotin/AncientStudio` agora é **público**:

```bash
gh api repos/yamamotin/AncientStudio \
  --jq '{private,visibility,has_pages,default_branch}'
# {"private":false,"visibility":"public","has_pages":false,"default_branch":"main"}
```

Tornar o repositório público removeu o bloqueio de visibilidade/plano, mas **ainda não cria nem habilita o site do Pages**. Evidências reais:

```bash
gh api repos/yamamotin/AncientStudio/pages
# HTTP 404: {"message":"Not Found"}

gh api -X PUT repos/yamamotin/AncientStudio/pages \
  --input - <<'JSON'
{"build_type":"workflow","source":{"branch":"main","path":"/"}}
JSON
# HTTP 403: Resource not accessible by integration
```

Ou seja: o token de integração não tem permissão para ativar o Pages por API. O último passo é de configuração no painel do repositório, mas agora é executável porque o bloqueio de visibilidade não existe mais.

## Diagnóstico do 404

- `has_pages: false` e `GET /pages` com 404: não existe site do Pages configurado.
- Consequência real no CI: as execuções `45484368524`, `45495502318` e `45495982085` falham exatamente em `Run actions/configure-pages@v5`; `Stage static site` e `Verify static artifact root` passam, mas `upload-pages-artifact`, `deploy` e `verify-parity` ficam pulados.
- Antes disso, a execução `45469829169` para `2b65476` terminou com sucesso e o site respondia. Portanto o código do workflow e o artefato estão íntegros; o que mudou foi a configuração/habilitação do Pages no repositório.

## Workflow verificado em `main`

`.github/workflows/pages.yml` foi conferido diretamente em `origin/main` e está íntegro:

1. `push` em `main` + `workflow_dispatch`.
2. Permissões: `contents: read`, `pages: write`, `id-token: write`.
3. `build`:
   - checkout;
   - `cp -R index.html robots.txt sitemap.xml api-status.json assets _site/`;
   - `printf '%s\n' "$GITHUB_SHA" > _site/build.txt`;
   - verificação explícita de `_site/index.html`, `_site/build.txt`, dicionários i18n e `api-client.js`;
   - `actions/configure-pages@v5`;
   - `actions/upload-pages-artifact@v3` com `path: _site`.
4. `deploy`: `needs: build`, environment `github-pages`, `actions/deploy-pages@v4`.
5. `verify-parity`: `needs: deploy`, `continue-on-error: true`, compara `build.txt` do Pages com `/api/v1/build` da Vercel; divergência é aviso, nunca falha o deploy.

Não há `basePath` problemático: todos os caminhos são relativos; o bundle Vite escreve diretamente em `assets/js/ascii-engine.bundle.js`. A URL do projeto já é `/AncientStudio/`. O `Dockerfile` da raiz e o deploy da Vercel não são alterados.

## Configuração atual no GitHub (única pendência real)

1. Abra **Settings → Pages → Build and deployment**.
2. Em **Source**, selecione **GitHub Actions** (não `Deploy from a branch`).
3. Confirme que o branch mostrado é `main` e o path é `/` quando solicitado.
4. Abra **Settings → Environments → `github-pages`**:
   - o environment deve existir e estar visível;
   - se houver **Required reviewers** ou **Wait timer**, remova-os ou configure os revisores — o job `deploy` usa `environment: github-pages` e pode ficar preso aguardando aprovação;
   - não é necessário nenhum secret adicional: o `GITHUB_TOKEN` do workflow já tem `pages: write` e `id-token: write`.
5. Rode o workflow:

```bash
gh workflow run "Deploy static site to GitHub Pages" --ref main
gh run watch "$(gh run list --workflow=pages.yml --limit 1 --json databaseId --jq '.[0].databaseId')" --interval 10
```

Quando `configure-pages@v5` passar, `upload-pages-artifact`, `deploy` e `verify-parity` devem executar.

## Validação após o deploy

```bash
PAGES_URL=https://yamamotin.github.io/AncientStudio
VERCEL_URL=https://ancientstudio.vercel.app

pages_sha=$(curl -fsSL "$PAGES_URL/build.txt" | tr -d '[:space:]')
vercel_sha=$(curl -fsSL "$VERCEL_URL/api/v1/build" \
  | python3 -c 'import json,sys; print(json.load(sys.stdin).get("sha",""))')
main_sha=$(git rev-parse origin/main)

printf 'pages=%s\nvercel=%s\nmain=%s\n' "$pages_sha" "$vercel_sha" "$main_sha"

test -n "$pages_sha" && test "$pages_sha" = "$vercel_sha" && echo 'PARITY OK'
test "$pages_sha" = "$main_sha" && echo 'PAGES MATCHES MAIN'
```

Um helper versionado com a mesma lógica está em `scripts/verify-pages-parity.sh`.
