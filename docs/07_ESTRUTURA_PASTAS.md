# 07 — Estrutura de pastas

```
recife-nantes/
├── .claude/agents/           # system prompts dos agentes
├── CLAUDE.md                 # descricao do projeto
├── README.md                 # visao pro usuario final
├── .gitignore
├── docs/                     # documentacao viva
│   ├── 00_OBJETIVO.md a 10_PRIMEIROS_PASSOS.md
│   └── DECISOES.md           # log cronologico
├── specs/                    # tickets do Arquiteto
├── reports/                  # respostas dos especialistas
│   └── <feature>/<agente>.md
├── memory/                   # memoria persistente (NAO versionado)
│   └── <agente>/MEMORY.md
├── status/                   # NAO versionado
│   └── <agente>.json         # idle / working / human_driving
├── logs/                     # NAO versionado
│   └── <agente>/current.log
├── sessions.json             # NAO versionado (agente -> session_id)
├── scripts/                  # orquestracao multi-agente
├── data/                     # dados estaticos (JSON)
│   ├── actors.json
│   ├── connections.json
│   ├── events.json
│   └── sectors.json
├── src/
│   ├── app/                  # Next.js App Router (pages, layouts)
│   │   ├── (public)/         # rotas publicas (mapa, diretorio, agenda)
│   │   ├── (auth)/           # rotas autenticadas (upload, perfil)
│   │   └── api/              # API routes (auth, upload)
│   ├── components/           # componentes React
│   │   ├── map/              # visualizacao do mapa de atores
│   │   ├── directory/        # listagem/busca de atores
│   │   └── ui/               # componentes genericos
│   ├── lib/                  # logica compartilhada
│   │   ├── auth.ts           # config NextAuth
│   │   ├── r2.ts             # client Cloudflare R2
│   │   └── data.ts           # leitura dos JSONs
│   └── types/                # interfaces TypeScript
├── public/                   # assets estaticos
├── tests/                    # testes unitarios (Vitest)
├── next.config.ts
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

## Regra de ouro

**Um agente, uma pasta principal.** Sem sobreposicao. Contratos entre
pastas sao documentados em `docs/01_ARQUITETURA.md` e reforcados em
`specs/<feature>.md`.
