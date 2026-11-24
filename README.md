# Eron Terminal — portfólio técnico interativo

Single-page, sem frameworks e sem build: HTML, CSS e um pouco de JavaScript puro com estética de terminal Linux. Inclui banner ASCII, simulador de CI/CD com um caminho de falha e RCA, playground de APIs em abas, bloco de stack estilo `neofetch` e console de comandos (`help`, `skills`, `experience`, `projects`, `contact`, `cv`, `clear`). Tudo o que aparece nos simuladores é fictício e sinalizado como tal.

Para editar, altere `index.html` (textos e ordem das seções), `assets/css/style.css` (variáveis no topo) e os módulos em `assets/js/`. Os currículos enviados pelo Eron estão em `assets/cv/`, e o JetBrains Mono usado localmente está em `assets/fonts/` com sua licença OFL — nada é carregado de CDNs.

Abra `index.html` diretamente para ver a versão em modo sim. Para usar a API Python real (endpoints `/api/v1/health`, `/api/v1/extract` e `/api/v1/invoices/parse`), rode `python3 api/server.py` e abra `http://localhost:8000`; o status no topo muda para `API ONLINE`. Com Docker: `docker build -t eron-terminal . && docker run -p 8000:8000 eron-terminal`.

Publicação: `.github/workflows/pages.yml` publica em `https://yamamotin.github.io/AncientStudio/` o mesmo commit de `main` que a Vercel usa. Para o workflow funcionar, em GitHub → Settings → Pages → Build and deployment → Source escolha **GitHub Actions**. A Vercel usa o `Dockerfile` (projeto `ancientstudio`, `https://ancientstudio.vercel.app/`); em modo sim as duas hospedagens entregam exatamente os mesmos arquivos relativos.

O palco `[ ASCII REALMS // SCENE ]` usa `assets/js/engine-adapter.js` como wrapper. Ele expõe `mount`, `setPaused`, `setPreset`, `destroy`, observa redimensionamento com `ResizeObserver` e mantém um fallback estático até o motor 3D da branch paralela ser carregado. O contrato esperado está em `docs/engine-integration.md`; nenhum arquivo do núcleo do motor é alterado aqui.
