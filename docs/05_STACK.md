# 05 — Stack

## Linguagem principal

TypeScript — escolhida por ser o padrao do ecossistema Next.js/Vercel,
com tipagem estatica que ajuda na manutencao.

## Runtime

- Node 20+ (LTS, suportado pela Vercel)

## Framework / libs principais

- **Next.js 16 (App Router)**: framework full-stack, SSG/SSR, API routes
- **React 19**: UI components
- **NextAuth.js v5**: autenticacao (Google provider)
- **Tailwind CSS 4**: estilizacao rapida e consistente
- **shadcn/ui**: componentes acessiveis e bonitos (Radix UI + Tailwind)
- **Motion** (ex-Framer Motion): animacoes suaves estilo Apple
- **Geist** (via next/font/google): tipografia (sans + mono)
- **tailwindcss-animate**: animacoes CSS via Tailwind
- **class-variance-authority (cva)**: variantes de componentes
- **clsx + tailwind-merge**: utilidades de classes
- **Cytoscape.js + react-cytoscapejs**: mapa de rede (atores/conexoes)
- **Zod**: validacao de schemas JSON
- **react-hook-form + @hookform/resolvers**: formularios
- **zustand**: estado global leve
- **next-themes**: dark mode
- **sonner**: toasts/notificacoes
- **react-dropzone**: upload drag-and-drop
- **@aws-sdk/client-s3**: client S3-compatible para Cloudflare R2
- **Lucide React**: icones
- **@vercel/analytics**: analytics free
- **@vercel/speed-insights**: Core Web Vitals

## Testes

- **Playwright**: testes e2e (cross-browser + visual regression)
- **Vitest**: testes unitarios

## Acessibilidade

- **eslint-plugin-jsx-a11y**: lint estatico de a11y
- **Radix UI** (via shadcn): ARIA, keyboard nav, focus management

## A instalar quando necessario

- **leaflet + react-leaflet**: mapa geografico Recife/Nantes
- **@upstash/ratelimit + @upstash/redis**: rate limiting
- **resend + @react-email/components**: emails transacionais

## Qualidade

- Lint: ESLint (config Next.js)
- Format: Prettier
- Pre-commit: validacao de schema JSON

## Ordem de preferencia ao adicionar deps novas

1. Ja instalado? Use.
2. Stdlib resolve? Use.
3. Biblioteca madura (>1k stars, updates recentes, tipos bons)? OK, mas
   passa pelo DevOps.
4. Biblioteca obscura? Discuta com Arquiteto antes.

## O que NAO entra (veto)

- **ORMs (Prisma, Drizzle)**: nao ha banco relacional
- **APIs de IA em runtime**: processamento eh offline
- **Frameworks CSS pesados (Material UI, Chakra)**: Tailwind basta
- **Servicos pagos**: tudo deve caber no free tier
