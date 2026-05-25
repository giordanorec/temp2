# 09 — Riscos

## R1. Dados desatualizados

**Risco**: base de atores fica defasada porque o reprocessamento eh manual.

**Mitigacao**: estabelecer cadencia minima (ex: mensal). Area de upload
incentiva membros a enviarem info atualizada. `DECISOES.md` registra cada
reprocessamento.

## R2. Free tier estourado

**Risco**: Vercel ou Cloudflare R2 ultrapassam limites do free tier.

**Mitigacao**: monitorar uso. Vercel: 100GB bandwidth/mes (muito pra um
site pequeno). R2: 10GB storage (suficiente pra documentos). Se estourar,
migrar uploads grandes pra Google Drive (link externo).

## R3. Consentimento LGPD incompleto

**Risco**: usuarios acessam funcionalidades sem aceitar termo.

**Mitigacao**: middleware NextAuth bloqueia rotas protegidas. Termo eh
obrigatorio no primeiro login. Sem aceite, sem acesso a upload.

## R4. Dados pessoais expostos

**Risco**: informacoes de contato visiveis publicamente sem consentimento.

**Mitigacao**: dados de contato (email, telefone) so visiveis pra usuarios
autenticados. Navegacao publica mostra apenas nome, instituicao e lado.

## R5. Dependencia de um unico mantenedor

**Risco**: so Giordano sabe mexer no codigo.

**Mitigacao**: documentacao clara em `docs/`. Mariana como segundo
mantenedor em formacao. Codigo simples (JSON + Next.js).

---

## Riscos comuns em projetos multi-agente persistente

- **Dois agentes tocam a mesma coisa** — mitigacao: `01_ARQUITETURA.md`
  define divisao explicita; Arquiteto revisa specs antes de despachar
  e rejeita sobreposicao.
- **Concorrencia humano vs Arquiteto** — `drive.sh` respeita `status/`
  `human_driving`; `take_over.sh` seta e resseta.
- **Sessoes crescendo demais** — Arquiteto roda `/compact` pos-feature;
  memoria principal mora em `memory/`, nao no history.
- **Gargalo no Arquiteto** — specs bem escritas deixam especialistas
  rodarem autonomos mais tempo; reports em lote.
