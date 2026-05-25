# Handoff: Adicionar curadoria de stack ao plugin multiagentes-giordano

## Contexto

Durante o projeto RECIFE-NANTES, fizemos uma curadoria exaustiva (pesquisa
web, npm trends, GitHub stars, Context7 benchmarks) de qual stack frontend
instalar em projetos Next.js modernos (2025-2026). O resultado esta em
`docs/CURADORIA_STACK_2026.md` neste repo.

## O que fazer no repo `giordanorec/multiagentes-giordano`

### 1. Adicionar template de curadoria

Copiar `docs/CURADORIA_STACK_2026.md` para:

```
templates/docs/CURADORIA_STACK.md
```

Adaptar para ser generico (remover referencias especificas ao RECIFE-NANTES).
Manter como referencia viva — atualizar a cada 6 meses.

### 2. Integrar no fluxo de `/multiagente-init`

Na Fase 1 (Especificacao), quando o stack escolhido for **Next.js**,
copiar automaticamente `CURADORIA_STACK.md` para `docs/` do projeto.

No `commands/multiagente-init.md`, adicionar apos a copia dos templates:

```markdown
Se o stack escolhido incluir Next.js, copie tambem:
- `$PLUGIN_ROOT/templates/docs/CURADORIA_STACK.md` -> `docs/CURADORIA_STACK.md`
```

### 3. Adicionar checklist ao agente `devops-installer`

No `agents/devops-installer.md`, adicionar secao:

```markdown
## Stack check

Antes de finalizar o setup, consulte `docs/CURADORIA_STACK.md` (se existir)
e verifique que todos os pacotes "INSTALAR SEMPRE" estao no `package.json`.
Reporte qualquer pacote faltante no seu report.
```

### 4. Adicionar ao agente `asset-designer`

No `agents/asset-designer.md`, adicionar referencia:

```markdown
## Referencia de design

Consulte `docs/CURADORIA_STACK.md` para a lista curada de ferramentas
de design (shadcn/ui, Motion, Geist, etc). Use essas como base.
```

### 5. Criar curadoria para outros stacks (futuro)

O mesmo formato pode ser replicado para:
- **Python (FastAPI + Jinja/HTMX)** — curadoria equivalente
- **Mobile (React Native / Expo)** — curadoria equivalente
- **Backend-only (Node/Python)** — curadoria equivalente

Cada um vive em `templates/docs/CURADORIA_STACK_<NOME>.md`.

---

## Pacotes curados (resumo rapido)

### Sempre instalar (Next.js)
- shadcn/ui, next-themes, sonner, react-hook-form, @hookform/resolvers,
  zod, zustand, motion, tailwindcss-animate, cva, clsx, tailwind-merge,
  lucide-react, @vercel/analytics, @vercel/speed-insights,
  eslint-plugin-jsx-a11y

### Sob demanda
- cytoscape (grafos), leaflet (mapas), react-dropzone (upload),
  @upstash/ratelimit (rate limiting), resend (email)

### Nao instalar
- next-seo, next-pwa, plaiceholder, Material UI, Chakra, GSAP,
  PostHog (ate ~1k users), Chromatic/Percy, geist (npm)

---

## Como usar este handoff

1. Abrir uma sessao no repo `giordanorec/multiagentes-giordano`
2. Passar este arquivo como contexto
3. Pedir: "Implemente as mudancas descritas neste handoff"

Ou manualmente: copiar os trechos acima para os arquivos indicados.
