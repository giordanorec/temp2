# DECISOES.md — log cronologico vivo

Cada entrada eh **uma decisao nao-trivial** com contexto. Preencher **no
mesmo commit** que materializa a decisao.

Formato: `## YYYY-MM-DD — titulo curto` + secoes *Contexto*, *Decisao*,
*Por que / alternativas*, *Consequencias*.

---

## 2026-05-25 — Inicio do projeto RECIFE-NANTES

### Contexto

Existe uma cooperacao ativa entre Recife e Nantes envolvendo prefeituras,
universidades (UFPE, UNICAP, Nantes Universite), organizacoes (ARIES,
SAMOA, ADN Ouest, Porto Digital, CESAR, etc.) e empresas de varios setores
(tecnologia, industria criativa, saude). Informacoes estao dispersas em
Google Drive, internet e arquivos locais. Falta uma plataforma centralizada
pra mapear atores, consolidar documentos e facilitar conexoes.

### Decisao

- **Escopo**: mapa de atores + diretorio + upload de docs + busca + agenda +
  comunicacao. MVP = mapa visual de atores e conexoes.
- **Stack**: Next.js 15 (App Router) + TypeScript + Tailwind CSS + NextAuth
- **Dados**: JSON no repo (atualizado manualmente via Claude Code)
- **Storage**: Cloudflare R2 (10GB free) para uploads
- **Auth**: NextAuth.js com Google provider + termo LGPD
- **Deploy**: Vercel free tier (.vercel.app)
- **Time de agentes**: arquiteto + frontend-dev + pipeline-dev +
  devops-installer + qa-tester
- **Compliance**: LGPD (consentimento no login). Sem compliance setorial.

### Por que / alternativas

- **Supabase descartado**: usuario ja esgotou free tier com outros projetos.
- **Vercel Blob descartado**: usuario ja utiliza em outros projetos.
- **JSON no repo vs banco relacional**: dados sao atualizados manualmente e
  com pouca frequencia; JSON versionado no git eh mais simples e gratuito.
- **Cloudflare R2**: 10GB free, zero egress, S3-compatible. Alternativas
  consideradas: Uploadthing (2GB), Firebase Storage (5GB), Google Drive.
- **Next.js na Vercel**: usuario ja tem 27 projetos la, conhece o fluxo.

### Consequencias

- Atualizacao da base depende de reprocessamento manual (nao eh real-time).
- Upload de arquivos limitado a 10GB total (Cloudflare R2 free).
- Sem dominio proprio por enquanto.
- Dois mantenedores (Giordano + futuramente Mariana).

---
