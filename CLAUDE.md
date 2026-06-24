# CLAUDE.md

Guia para humanos e agentes trabalharem neste repositório.

## Visão geral

Portfólio pessoal (site) com um backend mínimo: **um único endpoint**
`POST /api/send-message` que recebe o formulário de contato, aplica proteções
anti-abuso e dispara um e-mail via Resend. O frontend é o site em si
(componentes React + App Router).

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5**
- **Resend 6** — envio de e-mail transacional (template `contact`)
- **Cloudflare Turnstile** — CAPTCHA invisível (opcional, ativado por env)
- **Biome 2.2** — lint + format (substitui ESLint/Prettier)
- **Vitest 4** — testes unitários
- **Tailwind CSS 4** — estilos

> **Atenção:** este Next.js pode divergir do que você conhece. APIs, convenções
> e estrutura de arquivos mudam entre versões. Antes de escrever código que toca
> em APIs do framework, leia o guia relevante em `node_modules/next/dist/docs/`.
> Ex.: o antigo `middleware.ts` foi renomeado para `proxy.ts` nesta versão.

## Comandos

```bash
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção
npm start        # roda o build
npm run lint     # biome check (lint + organize imports)
npm run format   # biome format --write
npm test         # vitest run (uma vez)
npm run test:watch
```

## Princípios adotados

- **SOLID/DRY proporcionais ao tamanho.** O backend tem um endpoint; portanto,
  **sem** camadas pesadas (controller/service/repository/DTO). A divisão é por
  **responsabilidade**, não por dogma.
- **SRP no route handler.** O `route.ts` orquestra HTTP; regra de negócio e
  segurança vivem em módulos próprios.
- **Falha fechada na segurança.** Sem env configurada, as checagens negam por
  padrão (API key, turnstile).
- **Contrato da API é estável.** Códigos de erro, status e shapes não mudam sem
  intenção explícita.
- **Comentário só explica o "porquê".** Nada que apenas repita o código.

## Arquitetura

```
src/
  app/                         # App Router (rotas, layout, páginas)
    api/send-message/route.ts  # handler fino: guard → parse → anti-abuso → ação → resposta
    layout.tsx  page.tsx  links/
  server/                      # backend server-only (FORA da árvore de rotas)
    security/                  # acesso + anti-abuso (coeso)
      guard.ts                 # withApiGuard: orquestra rate-limit + origin/api-key
      rate-limit.ts            # fixed-window em memória (interface troca p/ Redis)
      origin.ts                # allowlist de Origin/Referer (proteção do frontend)
      api-key.ts               # validação x-api-key (consumidores server-to-server)
      honeypot.ts              # campo-isca anti-bot
      turnstile.ts             # verificação Cloudflare Turnstile
    contact/
      send-contact-message.ts  # ação de negócio: validação (presença) + envio Resend
    http/
      client-ip.ts             # getClientIp (x-forwarded-for / x-real-ip)
  components/                  # componentes React do site
  layout/                      # Header, Footer, Layout
  styles/                      # globals.css (Tailwind)
  tests/                       # TODOS os testes (vitest), espelhando src/
```

### Lógica da organização

- **`src/server/` e não `src/lib/`** — `lib/` é para utilitários genéricos e
  reutilizáveis. As proteções (honeypot, turnstile, guard…) têm **lógica de
  segurança própria do domínio**; não são libs. Ficam sob `server/`.
- **`src/server/` e não dentro de `app/api/`** — a árvore do App Router é para
  **roteamento** (route/page/layout). Módulos de apoio ali poluiriam esse
  significado. `server/` é uma fronteira de backend explícita.
- **`security/ · contact/ · http/`** — única divisão que se paga aqui: controle
  de acesso/anti-abuso, regra de negócio, e utilitário de request. Mais camadas
  seria over-engineering para um endpoint.
- **`tests/` único** — todos os testes em um lugar; o glob do Vitest é
  `src/**/*.test.ts`.

### Fluxo da requisição (`POST /api/send-message`)

1. `withApiGuard` — rate-limit por IP; depois origin (frontend) **ou** API key.
2. Parse do body; honeypot (bot → 200 silencioso).
3. Turnstile, se habilitado (falha → 403).
4. `sendContactMessage` — valida presença e envia via Resend; retorna resultado
   discriminado que o handler mapeia para HTTP.

## Convenções de código

- **Imports:** no código de app, alias `@/*` → `src/*` (ex.:
  `@/server/security/guard`). Nos testes, **caminhos relativos** (o Vitest não
  resolve o alias). Biome organiza os imports automaticamente (`organizeImports`).
- **Formatação:** Biome, 2 espaços. Rode `npm run format` antes de commitar.
- **Testes:** em `src/tests/`, um arquivo por módulo, nome `*.test.ts`.
- **Segurança:** ler env via `process.env` dentro do módulo; nunca expor segredo
  ao cliente (uma key no browser não é secreta — por isso a checagem de origem).
- **Variáveis de ambiente:** ver `.env.example`. `API_KEY`, `TURNSTILE_SECRET_KEY`,
  `RESEND_API_KEY`, `RESEND_EMAIL_TO`.

## Boundaries

- **Sempre:** rodar `npm test` e `npm run lint` antes de commitar; usar `git mv`
  ao mover arquivos; manter os contratos da API.
- **Perguntar antes:** mudar dependências, alterar contrato/validação da API,
  renomear endpoints.
- **Nunca:** commitar segredos, afrouxar/remover testes para "passar", expor
  chave secreta ao frontend.
