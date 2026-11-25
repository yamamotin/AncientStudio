# Limpeza Automática do Vercel Container Registry (VCR)

Automação que mantém **estritamente no máximo as 3 imagens mais recentes** (`[0]`, `[1]`, `[2]`) no repositório `"dockerfile"` do **Vercel Container Registry (VCR)** do projeto `"ancientstudio"`, removendo apenas as excedentes a partir do índice `3`.

## Arquivos da automação

- `.github/workflows/vcr-cleanup.yml` — workflow do GitHub Actions com execução manual (`workflow_dispatch`, incluindo opção `dry_run`), pós-deploy (`deployment_status`, `push` em `main`, conclusão do `ci-cd.yml`) e agendamento diário (`schedule`).
- `scripts/vcr-cleanup.js` — script Node.js sem dependências externas, com suporte tanto à **Vercel CLI** (`vercel vcr image ls dockerfile` / `vercel vcr image delete dockerfile <imageId> --yes`) quanto à **REST API da Vercel** (`/v1/vcr/repository/dockerfile/images`).
- `tests/vcr-cleanup.test.js` — suíte automatizada (`node --test`) cobrindo ordenação, retenção top-3, paginação, modo `dry-run`, ambos os backends (`cli` e `api`), falhas de autenticação e redação de segredos.

## Garantias de segurança

1. **Proteção imutável das 3 mais recentes**:
   - Coleta todas as páginas (`--limit 100` + cursor `--next`), deduplica por `id`, valida timestamps (`createdAt`) e ordena da **mais recente para a mais antiga**.
   - Rejeita qualquer configuração com `keepCount < 3` e aborta antes de qualquer deleção se alguma imagem vier sem timestamp válido.
   - Revalida em tempo de execução que nenhum ID em `[0..2]` está no conjunto de remoção.
2. **Inspeção / Dry-Run antes de apagar**:
   - Todo ciclo imprime o plano completo (`[0..2] KEEP` e `[3..N-1] DELETE` / `WOULD_DELETE`) e grava uma tabela resumo em `$GITHUB_STEP_SUMMARY`.
   - Com `--dry-run` (ou `DRY_RUN=1` / input `dry_run: true`), encerra com código `0` sem apagar nada.
3. **Higiene de credenciais**:
   - `VERCEL_TOKEN` é passado à Vercel CLI exclusivamente via variável de ambiente (nunca em `argv`) e qualquer ocorrência acidental em stdout/stderr é mascarada como `[REDACTED]`.

## Secrets / Variáveis necessárias no GitHub

Em **Settings → Secrets and variables → Actions → Repository secrets**:

| Secret | Obrigatório? | Descrição |
|---|---|---|
| `VERCEL_TOKEN` | **Sim** | Token da conta Vercel com acesso ao projeto `ancientstudio` e ao VCR |
| `VERCEL_ORG_ID` | Recomendado (opcional) | ID ou slug do time/organização (`team_...`). Se omitido, o script descobre automaticamente via API a partir do projeto `ancientstudio` |
| `VERCEL_PROJECT_ID` | Opcional | ID (`prj_...`) ou nome do projeto. Padrão automático: `ancientstudio` |

## Execução manual

### GitHub Actions (`workflow_dispatch`)

```bash
# Somente inspeção (dry-run):
gh workflow run vcr-cleanup.yml -f dry_run=true

# Execução real mantendo apenas as 3 imagens mais recentes:
gh workflow run vcr-cleanup.yml -f dry_run=false
```

### Localmente

```bash
# Dry-run (inspeção segura):
VERCEL_TOKEN="..." node scripts/vcr-cleanup.js --dry-run

# Aplicação real via Vercel CLI (ou --backend api para REST API direta):
VERCEL_TOKEN="..." node scripts/vcr-cleanup.js --backend cli
```
