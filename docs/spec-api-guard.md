# Spec: API Guard (validação de API key, checagem de origem e rate limit)

> Status: **APROVADA** — decisões fechadas (ver "Decisões"). PLAN e TASKS abaixo
> aguardando OK para IMPLEMENT.

## Decisões (fecham as Open Questions)

1. **Deploy:** Docker em uma VPS — processo único de longa duração. Logo, o
   rate limit usa **store in-memory** (sem Redis). A interface fica plugável
   apenas como porta de saída para um futuro multi-container.
2. **Limite `send-message`:** 5 req / 60s por IP.
3. **Allowlist de origens** via env `ALLOWED_ORIGINS` (CSV). Default:
   `https://matheussantos.tech,https://www.matheussantos.tech` +
   `http://localhost:3000` em dev.
4. **Testes:** adicionar **Vitest** (aprovado).
5. **Formulário:** ligar o form ao `/api/send-message` via `fetch` same-origin
   (substitui o `mailto:`), com estados de loading/sucesso/erro.

## Objetivo

Proteger as route handlers em `src/app/api/*` contra abuso, adicionando uma
camada de proteção reutilizável que faz:

1. **Rate limit por IP** — limita requisições por janela de tempo.
2. **Checagem de origem** (Origin/Referer allowlist) — proteção real para o
   frontend same-origin (browser).
3. **Validação de API key** (`x-api-key` vs env `API_KEY`) — opcional por rota,
   destinada a consumidores externos / server-to-server.

**Usuário/consumidor:** hoje, apenas o próprio frontend (browser, same-origin).
A `/api/send-message` será o primeiro endpoint protegido.

**Sucesso =** requisições legítimas do frontend passam; requisições de outras
origens ou acima do limite recebem resposta de erro padronizada (`401`/`403`/`429`)
sem quebrar o endpoint existente.

### Nota de honestidade técnica (decisão registrada)

Como o único consumidor é o **browser same-origin**, uma API key embutida no JS
do cliente **não é secreta** — qualquer pessoa a lê no DevTools. Portanto:

- A proteção **real** do frontend é a **checagem de origem + rate limit**.
- A **validação de API key** é implementada conforme pedido, mas fica
  **configurável por rota** (`requireApiKey`). As rotas chamadas pelo browser
  usam origem; a API key fica pronta para um consumidor externo futuro e
  **nunca** deve ser embutida no código do cliente.

## Tech Stack

- Next.js **16.2.9** (App Router, route handlers) — runtime Node.js
- React 19.2.4 / TypeScript 5
- Biome 2.2.0 (lint/format)
- Sem banco de dados. Rate limit com **store plugável** (in-memory por padrão)
- ⚠️ Em Next 16, `middleware.ts` foi renomeado para `proxy.ts`. **Não usaremos
  `proxy.ts`** para esta feature (a doc desaconselha estado em memória no proxy
  e recomenda validar dentro das route handlers).

## Commands

```
Dev:    npm run dev
Build:  npm run build
Lint:   npm run lint          # biome check
Format: npm run format        # biome format --write
```

> Não há runner de testes instalado hoje. Ver "Testing Strategy".

## Project Structure

```
src/app/api/                  → route handlers (backend)
src/app/api/send-message/     → endpoint que será protegido (primeiro)
src/lib/api/                  → NOVO: utilitários de proteção compartilhados
  ├─ rate-limit.ts            → limiter plugável (in-memory por padrão)
  ├─ origin.ts                → checagem de Origin/Referer contra allowlist
  ├─ api-key.ts               → validação de x-api-key
  └─ guard.ts                 → withApiGuard(): orquestra os 3 acima
docs/spec-api-guard.md        → esta spec
```

## Code Style

Padrão do projeto (2 espaços, aspas duplas, sem ponto e vírgula opcional do
Biome). Funções puras e tipadas; respostas de erro padronizadas.

```ts
// src/lib/api/guard.ts
import { type NextRequest, NextResponse } from "next/server";

export interface GuardOptions {
  /** exige header x-api-key === env API_KEY (default: false) */
  requireApiKey?: boolean;
  /** máximo de requisições por janela (default: 5) */
  limit?: number;
  /** tamanho da janela em ms (default: 60_000) */
  windowMs?: number;
}

/** Retorna NextResponse de erro se bloqueado, ou null se liberado. */
export async function withApiGuard(
  request: NextRequest,
  options: GuardOptions = {},
): Promise<NextResponse | null> {
  // 1) rate limit  2) origem  3) api key (se requireApiKey)
  // ...
  return null;
}
```

Uso na route handler:

```ts
export async function POST(request: NextRequest) {
  const blocked = await withApiGuard(request, { limit: 5, windowMs: 60_000 });
  if (blocked) return blocked;
  // ...lógica existente
}
```

## Testing Strategy

- **Hoje não há framework de teste** instalado. Proposta (em "Ask first"):
  adicionar **Vitest** para testar a lógica pura (`rate-limit`, `origin`,
  `api-key`) — são funções determinísticas e fáceis de cobrir.
- Sem aprovação para Vitest, a verificação será **manual via `curl`** + um
  checklist documentado (origem inválida → 403; sem key quando exigida → 401;
  acima do limite → 429; requisição válida → 200).
- Cobertura-alvo (se Vitest): 100% nas 3 funções puras de `src/lib/api`.

## Boundaries

- **Always:** rodar `npm run lint` e `npm run build` antes de concluir; manter o
  comportamento atual de `/api/send-message` para requisições legítimas; usar os
  aliases `@/*`; respostas de erro em JSON no mesmo formato já usado
  (`{ error: "CODE" }`).
- **Ask first:** adicionar dependências (Vitest, Upstash/Redis client);
  criar `proxy.ts`; mudar o formato das respostas de erro existentes; alterar
  variáveis de ambiente em produção.
- **Never:** commitar segredos (`API_KEY`, chaves Resend); logar IPs/payloads
  sensíveis; remover validações existentes; desabilitar o endpoint.

## Success Criteria

1. `POST /api/send-message` de **mesma origem** e dentro do limite → `200`
   (comportamento atual preservado).
2. Requisição de **origem não permitida** → `403 { error: "ORIGIN_NOT_ALLOWED" }`.
3. Acima do limite (ex.: 6ª req em 60s do mesmo IP) → `429 { error: "RATE_LIMITED" }`
   com header `Retry-After`.
4. Em rota com `requireApiKey: true`, sem/`x-api-key` errada →
   `401 { error: "INVALID_API_KEY" }`.
5. A lógica de rate limit fica isolada atrás de uma interface que permite trocar
   o store (memória → Redis) **sem alterar as route handlers**.
6. `npm run lint` e `npm run build` passam.

## Open Questions

1. **Plataforma de deploy** (Vercel/serverless vs Node server/Docker)? Assumido
   store **in-memory plugável**. Se for serverless, será preciso plugar Redis
   (ex.: Upstash) — fica como follow-up, não bloqueia esta entrega.
2. **Valores de rate limit** para `send-message` — proposto **5 req / 60s por IP**.
   Confirmar.
3. **Allowlist de origens** — proposto: `https://matheussantos.tech` (+ subdomínio
   www) em produção e `http://localhost:3000` em dev, via env
   `ALLOWED_ORIGINS` (CSV). Confirmar o domínio.
4. **Adicionar Vitest?** (recomendado) ou ficar em verificação manual via `curl`?
5. Hoje o formulário usa `mailto:` e **não chama** `/api/send-message`. Devo
   também **ligar o formulário ao endpoint** (fetch same-origin), ou só proteger
   o endpoint e manter o `mailto:` por enquanto?

> Todas as Open Questions acima foram resolvidas — ver seção "Decisões".

---

## Plan

**Ordem de implementação** (dependências primeiro). Verificação ao fim de cada fase.

### Fase A — Fundação (lib pura, sem tocar em rotas)
- A1. `src/lib/api/rate-limit.ts` — limiter in-memory (fixed-window por IP) atrás
  de uma interface `RateLimiter`. Função `getClientIp(request)` (lê
  `x-forwarded-for` / `x-real-ip`, importante atrás do proxy do Docker/VPS).
- A2. `src/lib/api/origin.ts` — `isAllowedOrigin(request)` lendo `ALLOWED_ORIGINS`.
- A3. `src/lib/api/api-key.ts` — `isValidApiKey(request)` comparando `x-api-key`
  com `process.env.API_KEY` (comparação tempo-constante).
- **Verificação:** `npm run lint` + testes Vitest das 3 funções passam.

### Fase B — Orquestrador
- B1. `src/lib/api/guard.ts` — `withApiGuard(request, options)` que aplica, em
  ordem: rate limit → origem → api key (se `requireApiKey`). Retorna
  `NextResponse` de erro ou `null`.
- **Verificação:** testes de `withApiGuard` (mock de request) cobrindo 200/403/429/401.

### Fase C — Aplicar no endpoint
- C1. Envolver `POST /api/send-message` com `withApiGuard(request, { limit: 5, windowMs: 60_000 })`.
- **Verificação:** `curl` manual (origem inválida→403, flood→429, válida→200) + build.

### Fase D — Ligar o formulário (UX)
- D1. `Contact.tsx`: trocar `mailto:` por `fetch("/api/send-message", …)` com
  loading/sucesso/erro e tratamento de `429`.
- **Verificação:** envio real em dev; lint + build.

### Riscos & mitigação
- **IP atrás de proxy:** em Docker/VPS o IP real vem em `x-forwarded-for`. Mitigar
  com `getClientIp` robusto; documentar que o reverse proxy precisa repassar o header.
- **Reinício do container zera contadores:** aceitável para anti-abuso simples
  (in-memory). Documentado; Redis é o caminho se virar multi-container.
- **Quebrar o fluxo atual:** Fase C preserva a lógica Resend existente; guard só
  adiciona checagens antes.

### Setup de testes
- Adicionar Vitest + script `test`. Config mínima Node env. Sem jsdom (lógica pura).

## Tasks

- [ ] **T1 — Setup Vitest**
  - Acceptance: `npm test` roda; um teste smoke passa.
  - Verify: `npm test`
  - Files: `package.json`, `vitest.config.ts`, `src/lib/api/__tests__/smoke.test.ts`

- [ ] **T2 — rate-limit.ts + getClientIp**
  - Acceptance: `consume(key)` retorna `{ allowed, remaining, retryAfter }`;
    bloqueia após N na janela; `getClientIp` lê `x-forwarded-for`.
  - Verify: `npm test` (casos: dentro do limite, estoura, reset por janela)
  - Files: `src/lib/api/rate-limit.ts`, `src/lib/api/__tests__/rate-limit.test.ts`

- [ ] **T3 — origin.ts**
  - Acceptance: `isAllowedOrigin` true p/ origem na allowlist, false caso contrário;
    lê `ALLOWED_ORIGINS`.
  - Verify: `npm test`
  - Files: `src/lib/api/origin.ts`, `src/lib/api/__tests__/origin.test.ts`

- [ ] **T4 — api-key.ts**
  - Acceptance: `isValidApiKey` true só com `x-api-key` === `API_KEY`; comparação
    tempo-constante; false se env ausente.
  - Verify: `npm test`
  - Files: `src/lib/api/api-key.ts`, `src/lib/api/__tests__/api-key.test.ts`

- [ ] **T5 — guard.ts (withApiGuard)**
  - Acceptance: aplica ordem rate→origem→key; retorna 429/403/401 corretos ou null.
  - Verify: `npm test`
  - Files: `src/lib/api/guard.ts`, `src/lib/api/__tests__/guard.test.ts`

- [ ] **T6 — Proteger /api/send-message**
  - Acceptance: handler chama `withApiGuard` antes da lógica Resend; resposta de
    erro padronizada; sucesso preservado.
  - Verify: `curl` (403/429/200) + `npm run build`
  - Files: `src/app/api/send-message/route.ts`

- [ ] **T7 — Ligar formulário ao endpoint**
  - Acceptance: `Contact.tsx` envia via `fetch`; estados loading/sucesso/erro;
    trata 429 com mensagem amigável.
  - Verify: envio em dev; `npm run lint` + `npm run build`
  - Files: `src/components/Contact.tsx`

- [ ] **T8 — Docs `.env`**
  - Acceptance: `.env.example` com `API_KEY`, `ALLOWED_ORIGINS` (e Resend já
    existentes); README/spec citam o header `x-forwarded-for` no reverse proxy.
  - Verify: revisão manual
  - Files: `.env.example`, `docs/spec-api-guard.md`

## Adendo — Anti-bot (escopo adicional aprovado)

Proteção contra bots no formulário de contato: **honeypot + Cloudflare Turnstile**.

- **Honeypot:** campo escondido (`website`). Se vier preenchido → bot → backend
  responde `200` falso **sem enviar** (não sinaliza detecção). Sempre ativo.
- **Turnstile:** CAPTCHA invisível. Só **exigido quando configurado**
  (`TURNSTILE_SECRET_KEY` presente). Sem token válido → `403 TURNSTILE_FAILED`.
  Frontend renderiza o widget só se `NEXT_PUBLIC_TURNSTILE_SITE_KEY` existir.
  `.env.example` usa as **test keys** oficiais da Cloudflare (funcionam em dev).
- **Fix de bug pré-existente:** a rota retornava erro com **HTTP 200**
  (`{ error, status: 500 }` no corpo). Corrigido para `{ status: 500 }` real,
  pois o formulário usa `res.ok` para decidir sucesso/erro.

- [ ] **T9 — Honeypot** — `src/lib/api/honeypot.ts` + campo escondido no form +
  checagem na rota. Verify: `npm test` + `curl` (campo preenchido → 200 sem envio).
- [ ] **T10 — Turnstile** — `src/lib/api/turnstile.ts` (siteverify) + widget no
  form + checagem na rota. Verify: `npm test` + `curl` (sem token → 403; com token
  de teste → passa).
