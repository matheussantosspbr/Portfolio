# Portfólio — Matheus Santos

Portfólio pessoal de **Matheus Santos**, desenvolvedor Full Stack. Reúne projetos, estudos de caso, experiência profissional, certificações e as tecnologias que utilizo, em uma página única (single-page) com navegação por seções.

🔗 **Versão online:** _adicione aqui a URL de produção_

## 🛠️ Tecnologias

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript 5](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Biome](https://biomejs.dev) (lint + format)
- [Font Awesome](https://fontawesome.com) (ícones)

## 🚀 Começando

Pré-requisitos: **Node.js 20+** e um gerenciador de pacotes (npm, pnpm, yarn ou bun).

```bash
# instalar dependências
npm install

# rodar em desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado.

## 📜 Scripts

| Comando          | Descrição                                  |
| ---------------- | ------------------------------------------ |
| `npm run dev`    | Inicia o servidor de desenvolvimento.      |
| `npm run build`  | Gera a build de produção.                  |
| `npm run start`  | Serve a build de produção.                 |
| `npm run lint`   | Verifica o código com o Biome.             |
| `npm run format` | Formata o código com o Biome.              |

## 📁 Estrutura

```
src/
├── app/
│   ├── layout.tsx       # Layout raiz, metadata e fontes
│   ├── page.tsx         # Página principal (todas as seções)
│   └── links/page.tsx   # Página de links ("link in bio")
├── components/          # Seções e componentes de UI (About, Skills, ...)
├── layout/             # Header, Footer e Layout
└── styles/css/         # Estilos globais (Tailwind)
public/
└── assets/             # Imagens e currículo (curriculo.pdf)
```

## ✏️ Personalização

- **Projetos:** edite a lista `projects` em [src/app/page.tsx](src/app/page.tsx) seguindo o template do componente `CartProject`.
- **Conteúdo das seções:** ajuste os componentes em [src/components/](src/components/).
- **Currículo:** substitua o arquivo em `public/assets/curriculo.pdf`.
- **Metadados/SEO:** edite `metadata` em [src/app/layout.tsx](src/app/layout.tsx).
