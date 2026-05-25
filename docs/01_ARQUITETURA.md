# 01 — Arquitetura

## Principio central

App Next.js com dados estaticos (JSON no repo) + autenticacao leve (NextAuth)
+ storage externo (Cloudflare R2) para uploads. Deploy na Vercel. A base de
dados dos atores eh atualizada manualmente via Claude Code — nao ha banco
relacional em runtime.

## Diagrama

```
+------------------+       +-------------------+       +----------------+
|   Browser        |       |   Vercel          |       | Cloudflare R2  |
|   (Next.js SSR/  | <---> |   (Next.js app)   | <---> | (uploads)      |
|    client)       |       |   API Routes      |       |                |
+------------------+       +-------------------+       +----------------+
                                    |
                                    v
                           +-------------------+
                           |  JSON files       |
                           |  (repo /data)     |
                           |  atores, conexoes |
                           +-------------------+
                                    ^
                                    |
                           +-------------------+
                           |  Claude Code      |
                           |  (reprocessamento |
                           |   periodico)      |
                           +-------------------+
```

## Por que essa arquitetura e nao outras

**Alternativa A**: Banco relacional (Supabase/Postgres) — descartada porque
usuario ja esgotou free tier do Supabase e nao quer custos.

**Alternativa B** (escolhida): JSON no repo + Cloudflare R2 — zero custo,
dados versionados no git, deploy simples na Vercel, storage generoso (10GB
free). Atualizacao da base eh feita via commits no repo.

## Divisao de trabalho por agente

| Agente | Pasta/arquivos de responsabilidade |
|---|---|
| `arquiteto` | `docs/`, `specs/`, `CLAUDE.md`, decisoes de arquitetura |
| `frontend-dev` | `src/app/`, `src/components/` (logica e estrutura) |
| `asset-designer` | `src/styles/`, `public/`, design system, paleta, animacoes |
| `pipeline-dev` | `src/lib/`, `data/`, `scripts/` de processamento |
| `dba` | `data/`, schemas Zod, scripts de validacao/migracao |
| `devops-installer` | config raiz (`next.config.*`, `package.json`, CI/CD) |
| `mobile-dev` | PWA (manifest, service worker), responsividade |
| `qa-tester` | `tests/`, `e2e/`, Playwright |

Sem sobreposicao: cada pasta pertence a **um** agente. Contratos entre
pastas sao documentados em `specs/`.

## Contratos de interface

### Dados dos atores (JSON)

```typescript
interface Actor {
  id: string;
  name: string;
  side: "recife" | "nantes";
  type: "person" | "institution" | "company";
  sector?: string;
  institution?: string;
  role?: string;
  connections: string[]; // IDs de outros atores
  description?: string;
  contact?: { email?: string; phone?: string; linkedin?: string };
}
```

### Upload metadata

```typescript
interface UploadedFile {
  id: string;
  filename: string;
  uploadedBy: string;
  uploadedAt: string; // ISO date
  r2Key: string;
  mimeType: string;
  size: number;
  description?: string;
}
```

Mudancas na interface exigem update em `specs/` e em `docs/DECISOES.md`.
