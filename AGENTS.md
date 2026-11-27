# AGENTS.md — diretivas para agentes de código

Diretivas permanentes para qualquer agente (Arena, Copilot, Claude, Cursor, etc.) que
trabalhe neste repositório. Elas complementam o `README.md` e os docs em `docs/`; em caso
de conflito, **estas regras de fluxo de trabalho vêm primeiro**.

## 1. Ao iniciar uma tarefa

1. `git status` — garantir árvore limpa (ou entender o que está pendente).
2. `git fetch --all --prune` e sincronizar com a `main` **antes de ler ou alterar código**:
   - `git pull` (ou `git merge --ff-only origin/main`) na branch ativa;
   - se a `main` avançou, incorporar as mudanças de outros agentes e **resolver conflitos
     com segurança** — nunca descartar alterações de outros agentes e nunca `--force`.
3. Trabalhar **somente na branch ativa da sessão**. Não criar, renomear nem trocar de
   branch.

## 2. AO TERMINAR TODA TAREFA (obrigatório)

Executar, nesta ordem, sem perguntar se pode:

1. **Validar** — `node --check assets/js/*.js`, `node --test tests/*.test.js`,
   `python3 -m unittest discover -s tests -p "test_*.py" -v` e, quando o HTML/CSS mudar,
   `npx html-validate@9 index.html`. Atualizar/adicionar testes para o que mudou.
2. **Commitar** — `git add -A && git commit -m "..."` (mensagem no padrão
   `tipo(escopo): resumo` + corpo com o que mudou e por quê).
3. **Publicar a branch** — `git push -u origin HEAD`.
4. **Fazer o merge na `main`**:
   - caminho rápido: `git fetch origin main` → `git merge-base --is-ancestor origin/main HEAD`
     → `git push origin HEAD:main` (fast-forward);
   - se a `main` já avançou: `git merge origin/main` na branch ativa, **resolver os
     conflitos**, rodar a validação novamente e só então `git push origin HEAD:main`;
   - se o repositório/ambiente exigir integração por pull request, abra o PR da branch de
     trabalho e mescle-o (`gh pr merge <n> --merge|--squash`), confirmando o merge antes de
     seguir. A regra é sempre **integrar na `main` ao final da tarefa**.
5. **Apagar a working branch no remoto** — `git push origin --delete <branch-de-trabalho>`
   depois que o merge na `main` estiver publicado e confirmado. O clone local mantém a
   branch da sessão (um checkout ativo não pode ser apagado); exclua também a branch local
   apenas quando isso for permitido e seguro no ambiente da sessão.
6. **Confirmar a entrega** — checar os workflows (`gh run list`) e o deploy (Pages/Vercel,
   produção `READY`/`PROMOTED` do commit publicado) e relatar: resultado do `git pull`,
   arquivos lidos/criados/modificados, cada alteração e os comandos com seus resultados.

Se instruções explícitas mais recentes, regras do ambiente, falhas nas verificações ou
proteções do repositório impedirem alguma etapa, **não contorne essas restrições**: informe
o que ficou pendente e por quê.

### Proibições absolutas

- Nunca `git push --force` / `--force-with-lease`, nunca reescrever histórico publicado.
- Nunca apagar, renomear ou mover a raiz do repositório, `.git/`, a branch `main` ou o
  diretório `.github/`.
- Nunca commitar segredos, tokens, CPF ou dados pessoais; `.env` fica fora do Git.
- Nunca alterar `ascii-engine-module/` sem necessidade explícita (o bundle em
  `assets/js/ascii-engine.bundle.js` é gerado lá).

## 3. Regras de produto já estabelecidas (não regredir)

- Cena 3D **sempre ativa e expandida** (`#scene` sem `data-collapsible`, sem botão de
  recolher), com zoom por scroll e slider de fonte/célula; o preset padrão é **chuva**
  (`[ Chuva ]`), o reflexo é **fixo em 100%** (o slider de reflexo foi removido) e o botão
  `[ restaurar ]` não existe.
- `[ STACK // NEOFETCH ]` (`#stack`) **sempre expandida**, sem toggle; o pinguim fica fixo
  em `4px` com contorno mais claro.
- Campos da seção de APIs abrem **vazios** (sem `placeholder`, sem `value` padrão),
  mantendo rótulos e validação (constraints + guard local `FIELD_REQUIRED` 422).
- O CPF (`#projudi-cpf`) é um campo **visível** (`type="text"`, `inputmode="numeric"`,
  `maxlength="14"`, `autocomplete="off"`): nunca `type="password"` nem máscara visual. O
  mascaramento (`[data-mask]` + `text-security`) fica só para segredos reais (X-API-Key e
  tokens de CAPTCHA); o CPF segue sem persistência e é apagado ao esconder a aba.
- `[ STACK // NEOFETCH ]` usa o cenário de **gelo da Antártida**: parede `#D6EAF6`, piso de
  neve `#F2FAFF` (`MascotStageBuilder` + `#penguin-stage`) e tinta polar escura `#0E2A3C`
  no fallback ASCII, sempre com contraste alto para o Tux.
- Popup de CAPTCHA compacto, com a **imagem do desafio** acima do campo
  (`captcha_image`/`image_data_uri`/`image_base64`/`image_endpoint`/`image_url`), sem
  redirecionar para o portal oficial; nada de tokens/CPF persistidos ou ecoados.
- Respostas contextuais por API (uma ativa por vez, limpa ao trocar de API), console
  interativo logo após as APIs, brilho 50%–100% no topo, toggle de idioma pt-br/en e o link
  `https://github.com/yamamotin`.
- Segurança no cliente: DOM seguro (`textContent`/`createElement`), `AbortController`,
  allowlist estrita de URLs/hosts, `credentials: 'omit'`.
