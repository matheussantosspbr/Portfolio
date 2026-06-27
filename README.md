<div align="center">

# 🪪 Portfólio Pessoal

**Site de apresentação profissional com um backend mínimo, propositalmente enxuto e bem defendido.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Node%2024-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## ✨ Visão geral

O **frontend é o próprio site** — sobre, skills, experiência, projetos, certificações e contato — construído com componentes React sobre o **App Router do Next.js**.

O **backend resolve um único problema**: receber o formulário de contato com segurança. Expõe **um endpoint** (`POST /api/send-message`) que aplica proteções anti-abuso e dispara um e-mail transacional via **Resend**.

> O design é deliberadamente assimétrico: a superfície de backend é pequena, mas **bem defendida**. Não há banco de dados, sessão ou autenticação — só entrega de e-mail protegida.

---

## 🛠️ Tecnologias

| Categoria | Stack |
|---|---|
| **Framework** | Next.js 16 (App Router, modo `standalone`) |
| **UI** | React 19 · Tailwind CSS 4 |
| **Linguagem** | TypeScript 5 |
| **E-mail** | Resend (template `contact`) |
| **CAPTCHA** | Cloudflare Turnstile (invisível, opcional) |
| **Lint + Format** | Biome (substitui ESLint/Prettier) |
| **Testes** | Vitest |
| **Runtime / Deploy** | Node 24 (Alpine) · Docker · Nginx |

---

## 🧱 Arquitetura

```
src/
├── app/                          # App Router (rotas, layout, páginas)
│   └── api/send-message/route.ts # handler fino: guard → parse → anti-abuso → ação → resposta
├── server/                       # backend server-only (fora da árvore de rotas)
│   ├── security/                 # acesso + anti-abuso (guard, rate-limit, origin, api-key, honeypot, turnstile)
│   ├── contact/                  # regra de negócio: validação + envio via Resend
│   └── http/                     # utilitário de request (getClientIp)
├── components/                   # componentes React do site
├── layout/                       # Header, Footer, Layout
└── tests/                        # testes Vitest, espelhando src/
```

### 🔐 Fluxo da requisição (`POST /api/send-message`)

A requisição atravessa **camadas de defesa**, cada uma um módulo coeso e isolado:

```
rate-limit  →  origem / API key  →  honeypot  →  Turnstile  →  validação  →  envio (Resend)
   429              403 / 401         200 🤫       403           400            200 ✅
```

1. **`withApiGuard`** — rate-limit por IP (fixed-window, padrão `5 / 60s`), depois origem (frontend) **ou** API key (server-to-server).
2. **Honeypot** — bot detectado → `200` silencioso, sem revelar a defesa.
3. **Turnstile** — verificado se habilitado por env (falha → `403`).
4. **`sendContactMessage`** — valida os campos e envia via Resend, retornando um resultado discriminado que o handler mapeia para HTTP.

---

## 🎯 Princípios de design

- **🔒 Falha fechada** — sem env configurada, as checagens de segurança **negam** por padrão. Segurança nunca depende de "esquecer de bloquear".
- **🧅 Defesa em camadas** — cada proteção é um módulo isolado e coeso.
- **📜 Contrato estável** — códigos de erro, status HTTP e shapes de resposta **não mudam sem intenção explícita**.
- **🌐 Frontend não tem segredo** — uma key no browser não é secreta; a proteção do formulário é por **allowlist de origem**.
- **⚖️ SOLID/DRY proporcionais** — um endpoint não pede camadas pesadas. A divisão é por **responsabilidade**, não por dogma.
- **🔌 Interfaces no lugar de acoplamento** — o rate-limiter é uma `interface` trocável (memória → Redis) sem tocar no handler.

---

## 🚀 Deploy

```
Internet ──► Nginx (80/443, TLS) ──► app1 ─┐
                                            ├─ réplicas Next.js (standalone, :3000)
                                    └─► app2 ┘
```

- **Build** Next.js em modo `standalone`, empacotado em imagem **Docker multi-stage** (`deps → builder → runner`), rodando como usuário não-root com `HEALTHCHECK`.
- **Duas réplicas** (`app1`, `app2`) atrás de **Nginx** como reverse proxy / load balancer e terminação TLS.
- **Deploy rolling, sem downtime** — atualiza uma réplica de cada vez, esperando ficar `healthy` antes da próxima (`scripts/deploy.sh`).
- **CI/CD** — em `push` para `master`, conecta no VPS via SSH, faz `git pull --ff-only` e executa o rolling deploy.

---

## 💻 Como rodar

```bash
npm install            # instala dependências
cp .env.example .env   # configure as variáveis (ver abaixo)
npm run dev            # http://localhost:3000
```

### Variáveis de ambiente

| Variável | Obrigatória | Função |
|---|:---:|---|
| `RESEND_API_KEY` | ✅ | Autentica o envio de e-mail no Resend. |
| `RESEND_EMAIL_TO` | ✅ | Destinatário do contato. |
| `API_KEY` | — | Habilita consumidores server-to-server via `x-api-key`. |
| `TURNSTILE_SECRET_KEY` | — | Ativa a verificação Turnstile no servidor. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | — | Site key do widget Turnstile (público). |

### Produção (Docker)

```bash
docker compose up -d --build   # sobe app1, app2 e nginx
./scripts/deploy.sh            # rolling deploy (rebuild + troca réplica a réplica)
```

---

## 📋 Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Build de produção (`standalone`) |
| `npm start` | Roda o build |
| `npm run lint` | Lint + organização de imports (Biome) |
| `npm run format` | Formata o código (Biome) |
| `npm test` | Testes (Vitest) |
| `npm run test:watch` | Testes em watch |

---

## 🤖 Uso de IA no desenvolvimento

Este projeto foi desenvolvido com **assistência de IA** (Claude Code, da Anthropic), usada como par de programação em arquitetura, camadas de segurança, infraestrutura e testes. **Toda saída de IA passou por revisão humana** antes do merge — a decisão de design e a responsabilidade final são do mantenedor.

---

<div align="center">

Feito por **Matheus Santos** · Licença [MIT](LICENSE)

</div>
