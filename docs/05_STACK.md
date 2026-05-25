# 05 — Stack

## Linguagem principal

TypeScript — escolhida por ser o padrao do ecossistema Next.js/Vercel,
com tipagem estatica que ajuda na manutencao.

## Runtime

- Node 20+ (LTS, suportado pela Vercel)

## Framework / libs principais

- **Next.js 15 (App Router)**: framework full-stack, SSG/SSR, API routes
- **React 19**: UI components
- **NextAuth.js v5**: autenticacao (Google provider)
- **Tailwind CSS 4**: estilizacao rapida e consistente
- **D3.js ou vis-network**: visualizacao do mapa de atores/conexoes
- **@aws-sdk/client-s3**: client S3-compatible para Cloudflare R2
- **Lucide React**: icones

## Testes

- **Vitest**: testes unitarios
- **Playwright**: testes e2e (se necessario)

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
