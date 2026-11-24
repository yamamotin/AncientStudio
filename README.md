# Eron Terminal — portfólio técnico interativo

Single-page, sem frameworks e sem build: HTML, CSS e um pouco de JavaScript puro com estética de terminal Linux. Inclui banner ASCII, simulador de CI/CD com um caminho de falha e RCA, playground de APIs em abas, bloco de stack estilo `neofetch` e console de comandos (`help`, `skills`, `experience`, `projects`, `contact`, `cv`, `clear`). Tudo o que aparece nos simuladores é fictício e sinalizado como tal.

Para editar, altere `index.html` (textos e ordem das seções), `assets/css/style.css` (variáveis no topo) e os módulos em `assets/js/`. Os currículos enviados pelo Eron estão em `assets/cv/`, e o JetBrains Mono usado localmente está em `assets/fonts/` com sua licença OFL — nada é carregado de CDNs.

Abra `index.html` diretamente para ver a versão em modo sim. Para usar a API Python real (endpoints `/api/v1/health`, `/api/v1/extract`, `/api/v1/invoices/parse`, `/api/v1/pipeline/run` e `/api/v1/logs`), rode `python3 api/server.py` e abra `http://localhost:8000`; o status muda para `API ONLINE`. Testes automatizados de backend e segurança: `python3 -m unittest discover -s tests -p "test_*.py" -v`. Com Docker: `docker build -t eron-terminal . && docker run -p 8000:8000 eron-terminal`.

Publicação e CI/CD: `.github/workflows/ci.yml` executa typecheck/build do motor 3D (`ascii-engine-module`), garante sincronia do bundle `assets/js/vendor/ascii-realms-bundle.js` e roda a suíte `unittest` da API Python. `.github/workflows/pages.yml` publica em `https://yamamotin.github.io/AncientStudio/` o mesmo commit de `main` que a Vercel constrói via `Dockerfile` (`https://ancientstudio.vercel.app/`).

O palco `[ ASCII REALMS // SCENE ]` acopla o motor WebGL2 3D desacoplado (`ascii-engine-module` -> `assets/js/vendor/ascii-realms-bundle.js`) via `assets/js/engine-adapter.js` (`window.ASCIIRealms`), renderizando em tempo real o santuário com lago reflexivo, iluminação dinâmica com bloom, sombras, DoF e presets (`outpost`, `terminal`, `cargo`). Já a seção `[ STACK // NEOFETCH ]` usa `assets/js/neofetch.js` para raycasting 3D em tempo real do pinguim Tux acompanhando o cursor do mouse.
