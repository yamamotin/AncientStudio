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
  "detail": "A Consulta Pública do PROJUDI TJPR exige validação reCAPTCHA (g-recaptcha-response) ou sessão autenticada ativa.",
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
  "popup": {
    "mode": "recaptcha",
    "challenge_id": "cap_9f4b2c8e1d7a6054b3e12f9a",
    "provider": "recaptcha",
    "prompt_label": "Resolva o desafio Google reCAPTCHA exigido pelo portal oficial.",
    "expected_param": "captcha_token",
    "accepted_params": ["captcha_token", "captcha_solution"],
    "challenge_param": "challenge_id",
    "session_param": "session_cookie",
    "response_field": "g-recaptcha-response",
    "session_initialized": true,
    "image_data_uri": null,
    "image_mime_type": null,
    "image_endpoint": null,
    "site_key": "6Lc...",
    "challenge_url": "https://consulta.tjpr.jus.br/projudi_consulta/processo/consultaPublica.do?actionType=iniciar",
    "expires_at": "2026-11-25T15:05:00Z"
  },
  "challenge_data": {
    "provider": "recaptcha",
    "response_field": "g-recaptcha-response",
    "http_method": "POST",
    "action_url": "https://consulta.tjpr.jus.br/projudi_consulta/processo/consultaPublica.do?actionType=pesquisar",
    "site_key": "6Lc...",
    "callback": "executaRecaptchaPBC_actre_consulta_publica",
    "image_url": null,
    "image_mime_type": null,
    "image_base64": null,
    "image_data_uri": null,
    "prompt_label": null
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
  "ttl_seconds": 300,
  "instructions": [
    "1. Acesse o formulário público em https://consulta.tjpr.jus.br/projudi_consulta/processo/consultaPublica.do?actionType=iniciar ...",
    "2. Resolva o desafio recaptcha público do TJPR ...",
    "3. Reenvie a requisição para '/api/v1/projudi/processos/consulta' (ou 'POST /api/v1/captcha/resolve') informando 'challenge_id' e 'captcha_token'..."
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

> **Compatibilidade com CSP (`img-src 'self' data:`):** quando o portal de origem apresenta CAPTCHA de imagem vinculado à sessão HTTP, o `CaptchaChallengeStore` baixa a imagem usando o mesmo `Cookie` (`JSESSIONID` / WAF) no momento da emissão do desafio e entrega `challenge_data.image_data_uri` em Base64, permitindo renderização imediata no popup sem violar a Content Security Policy.
>
> **Proteção LGPD no `consulta_payload`:** parâmetros sensíveis (como `cpf`) permanecem armazenados apenas em memória no `CaptchaChallengeStore` do servidor (TTL de 300s) para retomada automática por `challenge_id`; no JSON devolvido ao navegador, o campo `cpf` bruto é omitido em favor de `cpf_mascarado`.

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
