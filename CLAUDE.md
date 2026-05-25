# RECIFE-NANTES

Plataforma web de suporte a cooperacao institucional entre Recife e Nantes.

## Objetivo

Mapear atores (pessoas, instituicoes, empresas) de ambos os lados, visualizar
conexoes entre eles, consolidar documentos e facilitar comunicacao entre as
delegacoes. Deploy publico na Vercel.

Ver `docs/00_OBJETIVO.md` para detalhes.

## Como reler o contexto

Ordem de leitura:
1. `~/.claude/CLAUDE.md` (regras globais, se existir)
2. Este arquivo
3. `docs/DECISOES.md` (log cronologico)
4. `docs/00_OBJETIVO.md` ate `docs/10_PRIMEIROS_PASSOS.md`

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS 4
- NextAuth.js v5 (Google provider)
- Cloudflare R2 (uploads)
- Dados: JSON em `data/` (atualizado manualmente via Claude Code)
- Deploy: Vercel free tier

## Como rodar

```bash
npm install
npm run dev
# http://localhost:3000
```

## Multi-agente

- `sessions.json` — map agente -> session_id
- `scripts/open_dashboard.sh` — abre grade tmux
- `scripts/spawn.sh <agente>` — cria sessao
- `scripts/drive.sh <agente> "<prompt>"` — manda prompt em background
- `scripts/take_over.sh <agente>` — humano assume
