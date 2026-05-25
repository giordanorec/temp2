# 10 — Primeiros passos (Fase 3 — Setup)

Roteiro executado pelo Arquiteto (ou pelo `devops-installer` quando ja
spawnado).

## Passo 1. Git + estrutura de pastas

```bash
mkdir -p .claude/agents docs specs reports memory status logs scripts
mkdir -p data src/app src/components src/lib src/types public tests
```

## Passo 2. Stack

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app \
  --src-dir --import-alias "@/*" --no-turbopack
npm install next-auth@beta @aws-sdk/client-s3 d3 lucide-react
npm install -D vitest @types/d3
```

## Passo 3. Configuracoes

- `next.config.ts` — config padrao Next.js
- `tailwind.config.ts` — extend com cores do projeto
- `src/lib/auth.ts` — config NextAuth (Google provider)
- `src/lib/r2.ts` — client S3 pra Cloudflare R2
- `.env.local` — secrets (GOOGLE_CLIENT_ID, R2_ACCESS_KEY, etc)

## Passo 4. Smoke test

```bash
npm run build && npm run start
# Verificar: pagina inicial renderiza sem erros
```

## Passo 5. Primeiro commit + repo remoto

```bash
git add -A
git commit -m "feat: scaffold inicial"
```

(Repo ja existe: giordanorec/temp2)

## Passo 6. Spawn dos agentes

```bash
for agente in frontend-dev pipeline-dev devops-installer qa-tester; do
    scripts/spawn.sh "$agente"
done
```

## Passo 7. Abrir dashboard

```bash
scripts/open_dashboard.sh
```

## Passo 8. Entrar na Fase 4

Arquiteto escreve `specs/F4-mapa-atores.md` e despacha frontend-dev +
pipeline-dev em paralelo.
