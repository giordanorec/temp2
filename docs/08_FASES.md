# 08 — Fases

O projeto avanca em fases com criterio de saida explicito. Cada fase
fecha com commit, update em `DECISOES.md`, e checkpoint com o usuario.

## Fase 0 — Discovery

- [x] Perguntas de objetivo, publico, escopo, stack.
- [x] Decisoes principais tomadas (stack, time, hospedagem).
- [x] Nome do projeto: RECIFE-NANTES.

## Fase 1 — Especificacao

- [x] `docs/00_OBJETIVO.md` a `docs/10_PRIMEIROS_PASSOS.md` preenchidos.
- [x] `docs/DECISOES.md` com a decisao inicial.

## Fase 2 — Definicao do time

- [ ] `.claude/agents/arquiteto.md` + especialistas escolhidos.

## Fase 3 — Setup

- [ ] Estrutura de pastas.
- [ ] Configuracao do stack (Next.js, Tailwind, NextAuth, R2).
- [ ] Scripts de orquestracao em `scripts/`.
- [ ] **Smoke test** validando stack ponta a ponta.
- [ ] Commit inicial + push pro repo GitHub.

**Criterio de saida**: `npm install && npm run dev` funciona; pagina
inicial renderiza o mapa (mesmo que com dados mock).

## Fase 4 — MVP Mapa de Atores

1. Mapa visual com atores de ambos os lados
2. Conexoes visiveis entre atores
3. Filtro por lado (Recife/Nantes), setor, tipo
4. Pagina de detalhe do ator

## Fase 5 — Auth + Upload

1. Login via Google (NextAuth)
2. Termo de consentimento LGPD
3. Area de upload pro Cloudflare R2
4. Listagem de arquivos enviados

## Fase 6 — Diretorio + Busca

1. Listagem completa de atores com busca
2. Filtros avancados
3. Perfil detalhado do ator

## Fase 7 — Agenda + Comunicacao

1. Timeline de eventos/missoes
2. Area de comunicacao assincrona entre membros

## Fase 8 — Polish + Producao

1. Responsividade mobile
2. Performance (Lighthouse >90)
3. Testes e2e
4. Documentacao de uso
