# Guia de Scrapers Públicos e Resolução Interativa de CAPTCHA (`422 CAPTCHA_REQUIRED`)

Este documento especifica a arquitetura unificada de **detecção de desafios CAPTCHA**, **preservação de sessão upstream** (`JSESSIONID` / cookies WAF / campos ocultos de formulário) e **retomada de consulta real** implementada no backend Python do AncientStudio (`api/connectors/captcha.py`, `api/server.py` e `backend/app/api/v1/`).

> **Diretriz Inegociável (Zero Modo Demo / Zero Mocks):** nenhum conector ou scraper gera registros sintéticos, processos simulados ou dados fictícios antes, durante ou após o desafio CAPTCHA. Toda retomada submete a solução humana diretamente ao portal/API de origem com a mesma sessão HTTP e devolve exclusivamente os dados reais extraídos.

---

## 1. Visão Geral do Fluxo Ponta a Ponta (Round-Trip)

Qualquer scraper ou conector institucional do backend compartilha o mesmo contrato `HTTP 422 Unprocessable Entity` (`code: "CAPTCHA_REQUIRED"`):

```text
Frontend / Cliente                 Backend Python (FastAPI / stdlib)             Portal / API Oficial (TJPR, RFB, TSE, Web)
        |                                         |                                                |
        |  1. Consulta inicial (ex.: CPF/CNJ/NCM) |                                                |
        |---------------------------------------->|  2. GET bootstrap / consulta real              |
        |                                         |----------------------------------------------->|
        |                                         |  3. HTML com reCAPTCHA / hCaptcha /            |
        |                                         |     Turnstile / Imagem + Set-Cookie JSESSIONID |
        |                                         |<-----------------------------------------------|
        |                                         |  4. Salva CaptchaChallenge (TTL 300s):         |
        |                                         |     cookies, hidden inputs, action_url,        |
        |                                         |     image_data_uri e consulta_payload          |
        |  5. HTTP 422 CAPTCHA_REQUIRED           |                                                |
        |     (challenge_id, provider, site_key / |                                                |
        |      image_data_uri, session_cookie...) |                                                |
        |<----------------------------------------|                                                |
        |                                         |                                                |
   [Popup Interativo no Frontend]                 |                                                |
   Usuário resolve o desafio humano               |                                                |
        |                                         |                                                |
        |  6. Retomada: challenge_id +            |                                                |
        |     captcha_token / captcha_solution    |                                                |
        |     (no endpoint original OU em         |                                                |
        |      POST /api/v1/captcha/resolve)      |                                                |
        |---------------------------------------->|  7. Reaproveita JSESSIONID + hidden inputs     |
        |                                         |     + consulta_payload e envia POST/GET real   |
        |                                         |----------------------------------------------->|
        |                                         |  8. HTML / JSON real liberado pelo portal      |
        |                                         |<-----------------------------------------------|
        |  9. HTTP 200 OK com dados reais         |  (Consome challenge_id e aplica LGPD/cache)    |
        |<----------------------------------------|                                                |
```

---

## 2. Contrato Padronizado `HTTP 422 CAPTCHA_REQUIRED`

Sempre que uma fonte pública exige verificação humana (seja em resposta `200 OK` com formulário de desafio como o Struts do PROJUDI TJPR, seja em páginas de bloqueio WAF `401`/`403`/`422`/`429`/`503`), o backend responde com **HTTP `422`** contendo:

```json
{
  "ok": false,
  "type": "about:blank",
  "title": "CAPTCHA verification required",
  "status": 422,
  "detail": "A Consulta Pública do PROJUDI TJPR requer verificação humana (g-recaptcha-response). Resolva o desafio diretamente neste popup para concluir a consulta real.",
  "code": "CAPTCHA_REQUIRED",
  "challenge_id": "cap_9f4b2c8e1d7a6054b3e12f9a",
  "provider": "recaptcha",
  "connector": "projudi",
  "operation": "consulta_por_cpf",
  "site_key": "6Lc...",
  "challenge_url": "https://consulta.tjpr.jus.br/projudi_consulta/processo/consultaPublica.do?actionType=iniciar",
  "form_url": "https://consulta.tjpr.jus.br/projudi_consulta/processo/consultaPublica.do?actionType=iniciar",
  "portal_url": "https://consulta.tjpr.jus.br/projudi_consulta/",
  "action_url": "https://consulta.tjpr.jus.br/projudi_consulta/processo/consultaPublica.do?actionType=pesquisar",
  "session_cookie": "JSESSIONID=0001ABCDEF",
  "callback": "executaRecaptchaPBC_actre_consulta_publica",
  "recaptcha_callback": "executaRecaptchaPBC_actre_consulta_publica",
  "response_field": "g-recaptcha-response",
  "expected_param": "captcha_token",
  "accepted_params": ["captcha_token", "captcha_solution"],
  "image": "data:image/png;base64,iVBORw0KGgo...",
  "image_available": true,
  "image_source": "portal_session_servlet",
  "image_unavailable_reason": null,
  "captcha_image": "data:image/png;base64,iVBORw0KGgo...",
  "image_data_url": "data:image/png;base64,iVBORw0KGgo...",
  "image_data_uri": "data:image/png;base64,iVBORw0KGgo...",
  "image_base64": "iVBORw0KGgo...",
  "image_mime_type": "image/png",
  "image_url": "https://consulta.tjpr.jus.br/projudi_consulta/captcha.svl",
  "image_endpoint": "/api/v1/captcha/challenges/cap_9f4b2c8e1d7a6054b3e12f9a/image",
  "challenge_text": "Digite os caracteres exibidos na imagem de segurança.",
  "popup": {
    "mode": "recaptcha",
    "challenge_id": "cap_9f4b2c8e1d7a6054b3e12f9a",
    "provider": "recaptcha",
    "prompt_label": "Digite os caracteres exibidos na imagem de segurança.",
    "challenge_text": "Digite os caracteres exibidos na imagem de segurança.",
    "expected_param": "captcha_token",
    "accepted_params": ["captcha_token", "captcha_solution"],
    "challenge_param": "challenge_id",
    "session_param": "session_cookie",
    "response_field": "g-recaptcha-response",
    "session_initialized": true,
    "image": "data:image/png;base64,iVBORw0KGgo...",
    "image_available": true,
    "image_source": "portal_session_servlet",
    "image_unavailable_reason": null,
    "captcha_image": "data:image/png;base64,iVBORw0KGgo...",
    "image_data_url": "data:image/png;base64,iVBORw0KGgo...",
    "image_data_uri": "data:image/png;base64,iVBORw0KGgo...",
    "image_base64": "iVBORw0KGgo...",
    "image_mime_type": "image/png",
    "image_url": "https://consulta.tjpr.jus.br/projudi_consulta/captcha.svl",
    "image_endpoint": "/api/v1/captcha/challenges/cap_9f4b2c8e1d7a6054b3e12f9a/image",
    "site_key": "6Lc...",
    "form_url": "https://consulta.tjpr.jus.br/projudi_consulta/processo/consultaPublica.do?actionType=iniciar",
    "challenge_url": "https://consulta.tjpr.jus.br/projudi_consulta/processo/consultaPublica.do?actionType=iniciar",
    "expires_at": "2026-11-25T15:05:00Z",
    "expires_in_seconds": 300
  },
  "challenge_data": {
    "provider": "recaptcha",
    "response_field": "g-recaptcha-response",
    "http_method": "POST",
    "challenge_url": "https://consulta.tjpr.jus.br/projudi_consulta/processo/consultaPublica.do?actionType=iniciar",
    "site_key": "6Lc...",
    "callback": "executaRecaptchaPBC_actre_consulta_publica",
    "image_url": "https://consulta.tjpr.jus.br/projudi_consulta/captcha.svl",
    "image_mime_type": "image/png",
    "image_base64": "iVBORw0KGgo...",
    "image_data_uri": "data:image/png;base64,iVBORw0KGgo...",
    "image_data_url": "data:image/png;base64,iVBORw0KGgo...",
    "captcha_image": "data:image/png;base64,iVBORw0KGgo...",
    "prompt_label": "Digite os caracteres exibidos na imagem de segurança."
  },
  "consulta_payload": {
    "cpf_mascarado": "***.444.777-**",
    "tribunal": "TJPR"
  },
  "resume_endpoint": "/api/v1/projudi/processos/consulta",
  "resume_method": "POST",
  "resolve_endpoint": "/api/v1/captcha/resolve",
  "session_initialized": true,
  "expires_at": "2026-11-25T15:05:00Z",
  "expires_in_seconds": 300,
  "ttl_seconds": 300,
  "dados_sinteticos_ou_mock": false,
  "instructions": [
    "1. Visualize o desafio de segurança do PROJUDI TJPR apresentado diretamente neste popup.",
    "2. Informe a resposta/token de segurança no campo `captcha_token` (ou `captcha_solution`) sem sair do portfólio.",
    "3. Confirme o envio para '/api/v1/projudi/processos/consulta' (ou 'POST /api/v1/captcha/resolve') com `challenge_id` (preservando `session_cookie` `JSESSIONID=...`) para concluir a consulta real."
  ]
}
```

### Provedores Detectados Automaticamente (`detect_captcha_in_html`)

| `provider` | Elementos detectados no HTML de origem | `response_field` padrão | Dados entregues ao Popup |
| :--- | :--- | :--- | :--- |
| `recaptcha` | `.g-recaptcha`, `data-sitekey`, `google.com/recaptcha/api.js`, `executaRecaptcha*` | `g-recaptcha-response` | `site_key`, `callback`, `challenge_url`, `session_cookie` |
| `hcaptcha` | `.h-captcha`, `hcaptcha.com/1/api.js`, `name="h-captcha-response"` | `h-captcha-response` | `site_key`, `callback`, `challenge_url`, `session_cookie` |
| `turnstile` | `.cf-turnstile`, `challenges.cloudflare.com/turnstile`, `name="cf-turnstile-response"` | `cf-turnstile-response` | `site_key`, `callback`, `challenge_url`, `session_cookie` |
| `image` | `<img src="*captcha*">` + `<input name="*captcha*">` ou `data:image/*` | nome real do `<input>` (ex.: `codCaptcha`, `captcha_code`) | `image_data_uri` (`data:image/png;base64,...`), `image_base64`, `prompt_label`, `session_cookie` |

> **Contrato consumido pelo popup:** `assets/js/captcha.js` resolve o bitmap na ordem `image_data_uri` / `captcha_image` → `image_data_url` → `image_base64` + `image_mime_type` → `image_endpoint` (mesma origem, `/api/v1/captcha/challenges/<id>/image`) → `image_url` (apenas hosts TJPR da CSP), inclusive quando os campos aparecem aninhados em `popup`, `challenge_data` ou `extra`. O texto vem de `challenge_text` / `prompt_label`. Sem bitmap válido o popup exibe o aviso `captcha.imageUnavailable` e **nunca** reaproveita `detail`/`instructions` nem abre o portal oficial.
>
> **Compatibilidade com CSP (`img-src 'self' data:`):** quando o portal de origem apresenta CAPTCHA de imagem vinculado à sessão HTTP, o `CaptchaChallengeStore` baixa a imagem usando o mesmo `Cookie` (`JSESSIONID` / WAF) no momento da emissão do desafio e entrega `challenge_data.image_data_uri` em Base64, permitindo renderização imediata no popup sem violar a Content Security Policy.
>
> **Proteção LGPD no `consulta_payload`:** parâmetros sensíveis (como `cpf`) permanecem armazenados apenas em memória no `CaptchaChallengeStore` do servidor (TTL de 300s) para retomada automática por `challenge_id`; no JSON devolvido ao navegador, o campo `cpf` bruto é omitido em favor de `cpf_mascarado`.

> **Consulta direta sem CAPTCHA (PROJUDI TJPR):** o portal público `https://consulta.tjpr.jus.br/projudi_consulta/` **permite a consulta direta sem solucionar o widget reCAPTCHA** — a presença do widget (`div.g-recaptcha[data-sitekey]`) no HTML do formulário inicial **não** é, por si só, um sinal de que o CAPTCHA é exigido. O conector PROJUDI (`api/connectors/projudi.py`) **submete a consulta real primeiro** e só dispara o `HTTP 422 CAPTCHA_REQUIRED` quando a resposta do portal efetivamente indica um erro/desafio de CAPTCHA (mensagem de validação inválida/expirada ou formulário de desafio recusado), garantindo que não haja falso desafio nem modal travado sem imagem.

### 2.1. Diagnóstico de `"image": false`, Extração Real de Bitmaps e Limitação Técnica do Google reCAPTCHA v2

No card interativo do portfólio (`assets/js/main.js`), `resolveCaptchaAndResend` registra no painel `#projudi-output` o resumo `{ code, provider, challenge_id, image: Boolean(challenge.image), expires_at }`. Portanto, `"image": false` significa que `challenge.image` veio vazio porque nenhum bitmap real pôde ser exposto pela sessão upstream.

#### Fontes Reais de Imagem Extraídas pelo Backend (`image_available: true`)

O backend (`api/connectors/captcha.py`, `api/connectors/projudi.py` e `api/connectors/http_client.py`) extrai, normaliza e espelha toda imagem real disponível na sessão do portal de origem, preenchendo simultaneamente `image`, `captcha_image`, `image_data_url`, `image_data_uri`, `image_base64`, `image_mime_type` e `image_endpoint` (`/api/v1/captcha/challenges/{challenge_id}/image`):

1. **`portal_inline_data_uri`:** tags `<img>`, `<input type="image">`, `<object>` ou CSS `background-image: url(...)` contendo `data:image/(png|jpeg|gif|webp|bmp);base64,...` diretamente no HTML de `consultaPublica.do`.
2. **`portal_session_servlet`:** servlets e actions Struts/Java vinculados ao `JSESSIONID` (`captcha.svl`, `gerarCaptcha`, `imagemSeguranca`, `ChallengeImage`, `actionType=captcha|imagem`, atributos `data-src` / `data-captcha-src`, scripts inline ou `<img>` contextual dentro de `<form>` com input de CAPTCHA). O transporte `UrllibHttpTransport` utiliza `HTTPCookieProcessor` para preservar cookies `JSESSIONID` emitidos inclusive em redirecionamentos `302`, normaliza URLs `http://*.tjpr.jus.br` de proxy reverso para `https://` e negocia `Accept: image/png,image/jpeg,image/webp,image/gif,image/*`.
3. **`recaptcha_html_fallback`:** quando o formulário utiliza Google reCAPTCHA (`div.g-recaptcha[data-sitekey]`) e o endpoint HTML sem JavaScript `https://www.google.com/recaptcha/api/fallback?k=<site_key>` entrega `<input name="c">` + `<img class="fbc-imageselect-payload" src="/recaptcha/api2/payload?...">`, o backend baixa o JPEG/PNG real da grade/texto, envia `data:image/...;base64,...` ao popup e troca a resposta humana pelo token `g-recaptcha-response` real no `POST /recaptcha/api/fallback`.
4. **`headless_renderer` (hook opcional):** `CaptchaChallengeStore(challenge_renderer=...)` aceita um renderizador headless opcional (ex.: worker Playwright/Chromium isolado) capaz de capturar o desafio real sem alterar o contrato das rotas.

#### Limitação Técnica do Google reCAPTCHA v2 Widget (`image_available: false`)

Quando o portal `https://consulta.tjpr.jus.br/projudi_consulta/` apresenta exclusivamente o **widget JavaScript do Google reCAPTCHA v2** (`<div class="g-recaptcha" data-sitekey="...">` + `https://www.google.com/recaptcha/api.js`) e o Google desabilita o endpoint legado `/recaptcha/api/fallback` para aquela `site_key` (respondendo com a página de descontinuação `<noscript>` *"Please upgrade to a supported browser to get a reCAPTCHA challenge"*):

- O protocolo ativo do reCAPTCHA v2 (`GET /recaptcha/api2/anchor` → `POST /recaptcha/api2/reload` → `GET /recaptcha/api2/payload`) **exige a execução da máquina virtual JavaScript ofuscada BotGuard (`recaptcha__pt_br.js`) em um navegador real cuja origem `window.location.origin` seja `https://consulta.tjpr.jus.br:443`**, gerando um token criptografado de atestação de navegador (`bg`) antes que o Google libere qualquer bitmap em `/recaptcha/api2/payload`.
- Além disso, a Content Security Policy do portfólio bloqueia iframes externos (`frame-src 'none'`) e o navegador não permite forjar a origem `consulta.tjpr.jus.br` a partir de outro domínio.
- Nessa condição técnica real, **não existe bitmap HTTP estático fornecido pelo TJPR nem pelo Google** sem um navegador headless executando BotGuard. Em conformidade estrita com a política **Zero Mocks / Zero Dados Fictícios**, o backend **jamais gera imagens falsas de CAPTCHA nem processos simulados**, retornando de forma transparente:
  - `"image": null`
  - `"image_available": false`
  - `"image_source": null`
  - `"image_unavailable_reason": "RECAPTCHA_WIDGET_REQUIRES_BROWSER_ATTESTATION"`
  - `"dados_sinteticos_ou_mock": false`
- Mesmo quando `image_available` é `false`, o `challenge_id`, o `expires_at`, o `session_cookie` (`JSESSIONID=...`), os campos ocultos Struts e o `consulta_payload` permanecem integralmente preservados no `CaptchaChallengeStore`, permitindo concluir a consulta real assim que um `captcha_token` (`g-recaptcha-response`) válido ou sessão autenticada seja submetido no popup/API.

---

## 3. Como Concluir a Consulta Real Após Resolver o Popup

O frontend pode concluir a consulta real de **duas maneiras equivalentes**:

### Opção A — Endpoint Unificado `POST /api/v1/captcha/resolve` (Recomendado para Popups Genéricos)

Funciona para **qualquer** conector (`projudi`, `siscomex`, `transparencia`, `bcb` ou `scraping`), roteando automaticamente pelo `challenge_id` para o serviço e operação em andamento:

```http
POST /api/v1/captcha/resolve HTTP/1.1
Content-Type: application/json

{
  "challenge_id": "cap_9f4b2c8e1d7a6054b3e12f9a",
  "captcha_token": "<token g-recaptcha-response / h-captcha-response / cf-turnstile-response>",
  "captcha_solution": "<texto digitado caso provider='image'>",
  "session_cookie": "JSESSIONID=0001ABCDEF"
}
```

- **Resposta `200 OK`:** retorna `{ "ok": true, "data": { ...dados reais extraídos..., "captcha_resumed": true, "captcha_resolved": true, "challenge_id": "...", "connector": "...", "operation": "..." } }`.
- **Se a solução for inválida ou expirada no portal de origem:** o `challenge_id` anterior é invalidado e o backend retorna um **novo** `HTTP 422 CAPTCHA_REQUIRED` com novo `challenge_id` e `challenge_data.rejected_previous_attempt = true` (preservando os cookies atualizados da sessão).
- **Inspeção opcional de desafio ativo:** `GET /api/v1/captcha/challenges/{challenge_id}` retorna os metadados públicos do desafio enquanto o TTL estiver vigente (`404` se inexistente/consumido, `422 CAPTCHA_CHALLENGE_EXPIRED` se expirado na retomada).

### Opção B — Reenvio Direto ao Endpoint Original (`resume_endpoint` + `resume_method`)

Todos os endpoints de scrapers e conectores aceitam os parâmetros de retomada diretamente via JSON body, query string ou headers HTTP (`X-Challenge-Id`, `X-Captcha-Token`, `X-Captcha-Solution`, `X-Captcha-Session` / `X-Projudi-Session`):

1. **PROJUDI TJPR — Busca por CPF/CNPJ**
   - `POST /api/v1/projudi/processos/consulta` com `{ "challenge_id": "cap_...", "captcha_token": "..." }` (não é necessário reenviar `cpf` quando `challenge_id` está ativo)
   - `GET /api/v1/projudi/processos?challenge_id=cap_...&captcha_token=...`
2. **PROJUDI TJPR — Detalhe e Movimentações por Número CNJ**
   - `GET /api/v1/projudi/processos/{numero_processo}?challenge_id=cap_...&captcha_token=...`
3. **PROJUDI TJPR — Triagem e Resumo Determinístico (`ready_for_llm`)**
   - `POST /api/v1/projudi/processos/{numero_processo}/resumo` com `{ "challenge_id": "cap_...", "captcha_token": "..." }`
4. **Portal Único Siscomex Classif (NCM + Soluções de Consulta RFB/SIJUT2 + Sugestões)**
   - `GET /api/v1/siscomex/ncm?challenge_id=cap_...&captcha_solution=...`
5. **Transparência Municipal e Finanças Públicas em BRL (IBGE + TSE + STN Siconfi + CGU)**
   - `GET /api/v1/transparencia/municipio?challenge_id=cap_...&captcha_solution=...`
6. **Banco Central do Brasil (SGS e Participantes PIX Olinda)**
   - `GET /api/v1/bcb/indicadores?challenge_id=cap_...&captcha_solution=...`
   - `GET /api/v1/bcb/instituicoes?challenge_id=cap_...&captcha_solution=...`
7. **Web Scraper Modular SSRF-Safe (FastAPI, escopo `scraping:run`)**
   - `POST /api/v1/scraping/extract` com header `X-API-Key` e corpo `{ "url": "https://...", "strategy": "structured_metadata", "selectors": ["table.resultados tr"] }` -> em caso de bloqueio CAPTCHA na página alvo, retorna `422 CAPTCHA_REQUIRED` e conclui a extração real ao receber `{ "challenge_id": "cap_...", "captcha_solution": "..." }`.

---

## 4. Garantias de Segurança, Privacidade e Integridade

- **Reuso Estrito de Sessão (`JSESSIONID` + Hidden Form Tokens):** na retomada via `challenge_id`, o conector PROJUDI e o `CaptchaChallengeStore` reutilizam o cookie e os campos ocultos capturados no passo 1 sem abrir uma nova sessão anônima que invalidaria o token do desafio.
- **Consumo Único (`One-Time Challenge`):** assim que a consulta real é concluída com sucesso (ou substituída após rejeição pelo portal), o `challenge_id` é removido do `CaptchaChallengeStore` para impedir replay.
- **Proteção contra SSRF e Limites de Payload:** o `HttpxPageFetcher` valida todos os redirecionamentos e downloads de imagem de CAPTCHA contra IPs privados/loopback/link-local e aplica limite estrito de bytes.
- **Zero Fallback Silencioso na Retomada:** quando o cliente envia uma tentativa explícita de resolução de CAPTCHA, erros ou rejeições do portal de origem nunca são mascarados por dados estáticos — o backend valida a resposta real do portal e entrega os registros extraídos ou um novo `422 CAPTCHA_REQUIRED` / `503`.
