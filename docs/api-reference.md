# Referência de API — Conectores Públicos, Fiscal/NCM, Transparência Municipal e PROJUDI TJPR

Esta referência documenta os endpoints públicos `/api/v1/*` implementados no pacote desacoplado `api/connectors/` e expostos de forma idêntica tanto pelo monólito modular **FastAPI** (`backend/app/main.py`) quanto pelo servidor **Python stdlib** (`api/server.py`, utilizado no `Dockerfile` da Vercel).

---

## 1. PROJUDI (TJPR) — Raspagem Pública Real (Zero Mocks)

- **Portal oficial alvo:** `https://consulta.tjpr.jus.br/projudi_consulta/`
  - Frameset inicial: `frameset#frameSetTeste` -> `frame#mainFrame` (`/projudi_consulta/processo/consultaPublica.do?actionType=iniciar`)
  - Formulário Struts: `form#buscaProcessoForm` -> `POST /projudi_consulta/processo/consultaPublica.do?actionType=pesquisar`
- **Política estrita sem dados sintéticos:** nenhum endpoint do PROJUDI gera processos fictícios, partes inventadas ou movimentações de sandbox (`compliance.dados_sinteticos_ou_mock = false`).
- **Fronteira de CAPTCHA / Controle de Acesso:** o portal de Consulta Pública do TJPR exige validação humana Google reCAPTCHA (`g-recaptcha-response`, callback `executaRecaptchaPBC_actre_consulta_publica`) vinculada ao cookie `JSESSIONID` da sessão HTTP.
  - Sem `captcha_token` (ou `session_cookie` autenticado), a API retorna **HTTP `422 Unprocessable Entity`** (`application/problem+json`) com `"code": "CAPTCHA_REQUIRED"`, `site_key` extraída em tempo real do DOM do TJPR, `portal_url`, `form_url` e `instructions`.
  - Se o portal do TJPR estiver indisponível ou expirar o timeout, a API retorna **HTTP `503 Service Unavailable`** com `"code": "PROJUDI_UPSTREAM_UNAVAILABLE"` — jamais dados falsos.
- **Conformidade LGPD:** CPFs (`***.444.777-**`), CNPJs (`76.***.***/0001-**`) e e-mails encontrados nas células HTML de partes e movimentações são mascarados antes da serialização e dos logs.

### `POST /api/v1/projudi/processos/consulta`

Consulta processos públicos cíveis/fazendários por CPF (11 dígitos) ou CNPJ (14 dígitos) validados por módulo 11.

**Headers opcionais:**
- `X-Projudi-Session: JSESSIONID=...`

**Corpo da requisição (`application/json`):**
```json
{
  "cpf": "111.444.777-35",
  "tribunal": "TJPR",
  "captcha_token": "<g-recaptcha-response obtido no portal consulta.tjpr.jus.br>",
  "session_cookie": "JSESSIONID=..."
}
```

**Resposta `422` quando `captcha_token` não é enviado (`CAPTCHA_REQUIRED`):**
```json
{
  "type": "about:blank",
  "title": "CAPTCHA verification required",
  "status": 422,
  "detail": "A Consulta Pública do PROJUDI TJPR exige validação reCAPTCHA (g-recaptcha-response) ou sessão autenticada ativa.",
  "code": "CAPTCHA_REQUIRED",
  "site_key": "<sitekey extraída do DOM do TJPR>",
  "portal_url": "https://consulta.tjpr.jus.br/projudi_consulta/",
  "form_url": "https://consulta.tjpr.jus.br/projudi_consulta/processo/consultaPublica.do?actionType=iniciar",
  "recaptcha_callback": "executaRecaptchaPBC_actre_consulta_publica",
  "instructions": [
    "1. Acesse o formulário público em https://consulta.tjpr.jus.br/projudi_consulta/processo/consultaPublica.do?actionType=iniciar ...",
    "2. Resolva o desafio Google reCAPTCHA público do TJPR ... para obter o token 'g-recaptcha-response'.",
    "3. Reenvie a requisição informando 'captcha_token' e opcionalmente 'session_cookie' (JSESSIONID=...)."
  ]
}
```

**Fluxo do popup no cliente (`assets/js/captcha.js`):**
1. Qualquer chamada de conector que responda `422` + `code: "CAPTCHA_REQUIRED"` abre o `<dialog id="captcha-dialog">` com `provider`, `site_key`, `portal_url`/`form_url`, `instructions` e a contagem do TTL (`expires_at`, 5 min quando ausente).
2. O portal oficial é aberto em nova aba (`rel="noopener noreferrer"`); nenhum frame remoto é embutido (`frame-src 'none'`).
3. Ao enviar, o popup devolve `{ captcha_token, session_cookie?, challenge_id? }` e o mesmo endpoint é rechamado com o corpo/query originais + essa resolução (`main.js` → `resolveCaptchaAndResend`). Um único reenvio por clique: se o portal recusar o token, a mensagem `captcha.rejected` aparece no painel em vez de reabrir o diálogo em loop.
4. Cancelar/fechar (`Esc`, botão, backdrop) e expirar o desafio produzem mensagens traduzidas (`captcha.cancelled`, `captcha.expired`); token e cookie de sessão são apagados do DOM no fechamento e em `pagehide`.
5. Só URLs `https:` de hosts da allowlist (`consulta.tjpr.jus.br`, `www.tjpr.jus.br`, `tjpr.jus.br`, `www.google.com`, `recaptcha.google.com`, `www.recaptcha.net`) são aceitas; `javascript:`, `data:`, `http:`, credenciais embutidas e hosts desconhecidos são descartados.

**Resposta `200` com `captcha_token` válido:**
Extrai diretamente `table.resultTable` (`Processo | Partes | Distribuição | Classe Processual (Assunto Principal)`) e `#navigator`, retornando `processos[]` com `numero_processo`, `classe_processual`, `assunto_principal`, `data_distribuicao`, `partes_por_polo` e `partes` (`polo: "ATIVO" | "PASSIVO" | "TERCEIRO"`).

### `GET /api/v1/projudi/processos/{numero_processo}`

Consulta detalhes e movimentações de um processo público pela numeração única CNJ de 20 dígitos (`NNNNNNN-DD.AAAA.J.TR.OOOO`).

- **Query params opcionais:** `captcha_token`, `session_cookie` (ou header `X-Projudi-Session`).
- Segue automaticamente o link de visualização do processo quando disponível na sessão pública do TJPR, extraindo `comarca`, `vara`, `situacao`, `valor_causa_brl`, `partes_por_polo` e `movimentacoes` cronológicas mascaradas.

### `POST /api/v1/projudi/processos/{numero_processo}/resumo`

Triagem determinística de fase processual, urgência/liminar, score de prioridade (`0..100`) e geração de contexto canônico SHA-256 com contrato `"status": "ready_for_llm"` para orquestração via n8n ou provedores OpenAI-compatible.
- Quando `texto_processo` ou `movimentacoes` são enviados no corpo JSON, analisa exclusivamente o corpus fornecido (`origem_dados: "corpus_fornecido_pelo_cliente"`).
- Quando nenhum texto é informado e não há processo real em cache nem `captcha_token`, retorna `422 CAPTCHA_REQUIRED`.

---

## 2. Transparência Municipal — Governança, PIB, Orçamento e Finanças Eleitorais em BRL (`R$`)

### `GET /api/v1/transparencia/municipio?cidade=Paranavaí&uf=PR`

Consolida governança municipal eleita e indicadores monetários/fiscais oficiais normalizados em Reais (`"unidade_moeda": "BRL"`):

| Bloco de Resposta | Fonte Oficial | Métricas Monetárias / Fiscais (`BRL`) |
| --- | --- | --- |
| `municipio` | IBGE Localidades v1 + TSE UE | `codigo_ibge` (7 dígitos, ex.: `4118402`), `codigo_tse` (5 dígitos resolvido dinamicamente via TSE, ex.: `77496` para Paranavaí), microrregião e mesorregião |
| `resumo_monetario` | Consolidação IBGE + Siconfi + TSE | `pib_municipal_brl`, `pib_per_capita_brl`, `receitas_realizadas_brl`, `despesas_empenhadas_brl`, `transferencias_correntes_brl`, `bens_declarados_prefeito_brl`, `limite_gastos_campanha_prefeito_brl`, `despesas_campanha_prefeito_brl` |
| `indicadores_ibge` | IBGE Agregados SIDRA `5938` (`var 37`) + Pesquisas (`47001`, `29171`, `28141`, `29749`, `29748`) | PIB municipal total convertido de Mil Reais para `BRL`, PIB per capita (`BRL`), população estimada e receitas/despesas orçamentárias anuais |
| `execucao_orcamentaria_siconfi` | Tesouro Nacional — Siconfi DCA (`DCA-Anexo I-C` e `DCA-Anexo I-D`) | `receitas_brutas_realizadas_brl`, `receitas_correntes_brl`, `impostos_taxas_contribuicoes_brl`, `transferencias_correntes_brl`, `despesas_empenhadas_brl`, `despesas_liquidadas_brl`, `despesas_pagas_brl`, `pessoal_e_encargos_empenhados_brl` |
| `financas_eleitorais_tse` | TSE `DivulgaCandContas` (`2045202024`) | Patrimônio declarado (`totalDeBens`), limite legal de gastos de campanha no 1º turno, receitas arrecadadas e despesas contratadas/pagas em `BRL` |
| `portal_transparencia_cgu` | Portal da Transparência CGU (opcional via `TRANSPARENCIA_API_KEY`) + Siconfi | Transferências federais constitucionais/legais ao município em `BRL` |
| `executivo` & `legislativo` | TSE `DivulgaCandContas` 2024 | Prefeito, Vice-Prefeito e todos os Vereadores eleitos (`ELEITO`, `ELEITO POR QP`, `ELEITO POR MÉDIA`) + distribuição partidária |

---

## 3. Portal Único Siscomex — Pesquisa Integrada Classif (Nomenclatura + Decisões + Sugestões)

### `GET /api/v1/siscomex/ncm?q=GPU&limite=10&somente_vigentes=true`

Termos comerciais modernos (como `"GPU"`, `"GPGPU"`, `"placa de vídeo"`, `"SSD NVMe"`, `"notebook"`, `"drone"`, `"inversor solar"`) muitas vezes não constam literalmente na descrição curta da folha NCM (muitas subposições residuais têm texto literal `"Outras"` ou `"Outros"`). O conector integra os **três pilares do Classif**:

1. **Nomenclatura (`resultados` / `nomenclaturas`):**
   - Consome `https://portalunico.siscomex.gov.br/classif/api/publico/nomenclatura/download/json?perfil=PUBLICO` (`Resolução Gecex nº 926/2026` / SH-2022) com contingência local em `api/data/siscomex_ncm_seed.json`.
   - Indexa a cadeia hierárquica completa (`Capítulo -> Posição -> Subposição -> Item -> Subitem`), permitindo que itens residuais (`"Em grão"`, `"Outras"`, `"Outros"`) herdem o contexto técnico integral dos códigos ancestrais.
2. **Decisões / Soluções de Consulta (`decisoes`):**
   - Consulta e faz parsing HTML em tempo real do sistema público **Normas / SIJUT2 da Receita Federal** (`https://normas.receita.fazenda.gov.br/sijut2consulta/consulta.action?tipoAtoFacet=Solu%C3%A7%C3%A3o+de+Consulta&termoBusca=...`), enriquecido com decisões publicadas verificadas da COSIT e COANA para operação offline determinística.
   - Para `q=GPU`, retorna as decisões oficiais que regem a matéria no Brasil:
     - **SC Coana nº 46/2016** -> NCM `8471.80.00` (placa de vídeo convencional com GPU e saída de vídeo para monitor);
     - **SC Cosit nº 98.081/2021** e **SC Cosit nº 98.227/2020** -> NCM `8471.50.90` (placa aceleradora / GPGPU para data center e IA sem saída de vídeo);
     - **Posição 85.42 (SH-2022)** -> NCM `8542.31.90` (circuito integrado processador gráfico avulso / chip BGA sem placa).
3. **Sugestões Técnicas & Expansão Comercial (`sugestoes` + `termos_expandidos`):**
   - Resolve sinônimos comerciais e siglas técnicas (`GPU`, `CPU`, `SSD`, `NVMe`, `RAM`, `Motherboard`, `Smartphone`, `Smartwatch`, `Drone`, `Inversor Solar`, `Notebook`) em notas orientativas não vinculantes (`carater: "orientativo_nao_vinculante"`) e códigos NCM candidatos ponderados no ranking final.

---

## 4. Banco Central do Brasil — Séries SGS & Instituições PIX

- **`GET /api/v1/bcb/indicadores?ultimos=5`:** Séries oficiais BCB Dados Abertos SGS (`432` Selic Meta COPOM, `433` IPCA variação mensal, `1` Câmbio PTAX USD/BRL venda).
- **`GET /api/v1/bcb/instituicoes?busca=Nubank&limite=20`:** Diretório Olinda de participantes PIX/STR filtrável por nome (sem acentos) ou código ISPB de 8 dígitos.
