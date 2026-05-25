# Curadoria de Stack Frontend — Next.js (2025-2026)

Referencia curada para projetos Next.js com padrao Apple de qualidade.
Pesquisada em maio/2026. Usar como checklist ao iniciar novos projetos.

---

## INSTALAR SEMPRE (core de qualquer projeto Next.js moderno)

```bash
# UI + Design System
npm install class-variance-authority clsx tailwind-merge lucide-react
# shadcn/ui: npx shadcn@latest init (instala componentes sob demanda)

# Dark mode + Toasts
npm install next-themes sonner

# Formularios
npm install react-hook-form @hookform/resolvers zod

# Estado global leve
npm install zustand

# Animacoes
npm install motion
npm install -D tailwindcss-animate

# Analytics + Performance (free na Vercel)
npm install @vercel/analytics @vercel/speed-insights

# Acessibilidade
npm install -D eslint-plugin-jsx-a11y
```

### Por que cada um

| Pacote | Justificativa | Tamanho |
|---|---|---|
| **shadcn/ui** | Gold standard 2026. Radix UI + Tailwind. 94k+ stars. Code ownership (copy/paste, nao dependencia). | ~0 (copia codigo) |
| **next-themes** | Dark mode sem flash. Padrao universal Next.js. | ~2KB |
| **sonner** | Toasts. Padrao shadcn. 11.5k stars, 7M+ downloads/semana. | ~3KB |
| **react-hook-form** | Forms performaticos. Nao re-renderiza tudo. | ~9KB |
| **@hookform/resolvers** | Ponte Zod <-> react-hook-form. | ~2KB |
| **zod** | Validacao de schemas. Compartilha client+server. | ~13KB |
| **zustand** | Estado global. Zero boilerplate. | ~3KB |
| **motion** | Animacoes declarativas. Ex-Framer Motion. 6M+ downloads/semana. | ~30KB |
| **tailwindcss-animate** | Micro-animacoes CSS. Complementa Motion. | ~1KB |
| **class-variance-authority** | Variantes de componentes (tipo styled-components, mas Tailwind). | ~2KB |
| **clsx + tailwind-merge** | Merge de classes sem conflito. Essencial com shadcn. | ~2KB |
| **lucide-react** | Icones limpos e consistentes. | tree-shakeable |
| **@vercel/analytics** | Traffic analytics. Free na Vercel. | ~1KB |
| **@vercel/speed-insights** | Core Web Vitals reais. Free. | ~1KB |
| **eslint-plugin-jsx-a11y** | Lint de acessibilidade em build time. | dev only |

### Tipografia

Usar `next/font/google` com **Geist** (sans + mono). NAO instalar o pacote
npm `geist` — eh redundante.

```typescript
import { Geist, Geist_Mono } from "next/font/google"
```

---

## INSTALAR SOB DEMANDA (quando a feature for construida)

### Visualizacao de grafos/redes

```bash
npm install cytoscape react-cytoscapejs
npm install -D @types/cytoscape
```

**Cytoscape.js** > D3 para grafos de atores/conexoes. Tem layouts
force-directed prontos, algoritmos de graph theory, pan/zoom nativo.
D3 eh low-level demais pra esse caso.

Alternativas por escala:
- <500 nos: **Cytoscape.js** (recomendado)
- 500-5k nos: **React Flow** (se for editor drag-and-drop)
- 10k+ nos: **Sigma.js** (WebGL)

### Mapas geograficos

```bash
npm install leaflet react-leaflet
npm install -D @types/leaflet
```

**Leaflet** com OpenStreetMap: 100% free, leve, suficiente para markers.
MapLibre GL (fork open-source do Mapbox): melhor visual, mais setup.
Mapbox GL: 50k loads/mes free, mas licenca proprietaria.

### Upload de arquivos

```bash
npm install react-dropzone
```

Headless drag-and-drop. Voce estiliza (combina com shadcn). Combinar
com presigned URLs do S3/R2.

### Rate limiting (API routes)

```bash
npm install @upstash/ratelimit @upstash/redis
```

Serverless, funciona na edge. Free tier: 10k commands/dia.

### Email transacional

```bash
npm install resend @react-email/components
```

Resend: 3k emails/mes free. Templates em JSX via React Email.

### Storage S3-compatible (Cloudflare R2, AWS S3, etc)

```bash
npm install @aws-sdk/client-s3
```

---

## NAO INSTALAR (overkill ou redundante em 2026)

| Pacote | Motivo |
|---|---|
| **next-seo** | Metadata API nativa do Next.js substitui |
| **next-pwa** | Abandonado. Se precisar PWA, usar **Serwist** (`@serwist/next`) |
| **plaiceholder** | Sem manutencao. Usar `sharp` direto (ja transitive dep do Next) |
| **Radix Themes** | Redundante se usar shadcn/ui (que ja wrapa Radix) |
| **Park UI / DaisyUI / HeroUI** | Ecossistemas menores que shadcn |
| **Material UI / Chakra UI** | Pesados, opinados. Tailwind + shadcn > |
| **GSAP** | Motion cobre 99% dos casos. GSAP so pra scroll-driven pesado |
| **Prisma / Drizzle** | Se nao tiver banco relacional |
| **PostHog** | Vercel Analytics basta ate ~1k users |
| **Chromatic / Percy** | Playwright screenshots basta |
| **Biome** (migracao) | ESLint funciona. Biome eh mais rapido mas nao tem regras Next.js-specific ainda. Migrar quando tiver. |
| `geist` (npm) | Redundante com `next/font/google` |
| `d3` | Overkill pra grafos simples. Cytoscape.js resolve melhor. |

---

## SETUP RECOMENDADO (layout raiz)

```typescript
// src/app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "sonner"
import "./globals.css"

// fonts, metadata...

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

---

## FONTES DE PESQUISA

- npm trends (downloads semanais comparados)
- GitHub stars e issues abertos
- Documentacao oficial de cada lib
- shadcn/ui docs e ecossistema
- Vercel blog e docs
- Context7 library benchmarks

---

*Ultima atualizacao: 2026-05-25*
*Pesquisa feita via Claude Code com agente de pesquisa web.*
