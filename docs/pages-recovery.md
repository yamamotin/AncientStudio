# GitHub Pages 404 — diagnóstico e recuperação

## Diagnóstico real

- `gh api repos/yamamotin/AncientStudio` retorna **`has_pages: false`**: o site do Pages está desativado no repositório. É por isso que `https://yamamotin.github.io/AncientStudio/` responde 404 mesmo com o workflow `Deploy static site to GitHub Pages` tendo concluído com sucesso para `2b65476`.
- O workflow de Pages está correto: ele faz checkout de `main`, copia `index.html`, `robots.txt`, `sitemap.xml`, `api-status.json` e `assets/` para a **raiz** de `_site/`, grava `build.txt` com `$GITHUB_SHA` e publica esse artefato via `actions/deploy-pages@v4`.
- O `Dockerfile` da raiz e o fluxo da Vercel não são afetados: o Pages usa somente o artefato `_site/`; a Vercel continua usando o container da raiz. `ci-cd.yml` só constrói `infra/docker/Dockerfile` e faz deploy na Vercel quando os secrets existem.

## Para voltar ao ar

1. No GitHub: **Settings → Pages → Build and deployment**.
2. Em **Source**, selecione **GitHub Actions** (não `Deploy from a branch`).
3. Confirme que o environment `github-pages` está habilitado no repositório.
4. Faça merge deste trabalho em `main` (ou execute `gh workflow run "Deploy static site to GitHub Pages" --ref main`).
5. O job `verify-parity` compara `build.txt` do Pages com `GET https://ancientstudio.vercel.app/api/v1/build`; divergência gera aviso e nunca falha o deploy.

Após o redeploy, `https://yamamotin.github.io/AncientStudio/build.txt` deve conter o mesmo SHA de `main`.
