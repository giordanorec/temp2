"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  MapPin,
  Search,
  User,
  Building2,
  Briefcase,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Actor } from "@/types"
import actorsData from "../../../data/actors.json"

const actors = actorsData as Actor[]

const TYPE_ICONS = {
  person: User,
  institution: Building2,
  company: Briefcase,
  association: Users,
}

const TYPE_LABELS = {
  person: "Pessoa",
  institution: "Instituição",
  company: "Empresa",
  association: "Associação",
}

export default function DiretorioPage() {
  const [search, setSearch] = useState("")
  const [filterSide, setFilterSide] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return actors
      .filter((a) => {
        if (filterSide && a.side !== filterSide) return false
        if (search) {
          const q = search.toLowerCase()
          return (
            a.name.toLowerCase().includes(q) ||
            (a.role?.toLowerCase().includes(q) ?? false) ||
            (a.description?.toLowerCase().includes(q) ?? false) ||
            a.sectors.some((s) => s.includes(q))
          )
        }
        return true
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [search, filterSide])

  const recife = filtered.filter((a) => a.side === "recife")
  const nantes = filtered.filter((a) => a.side === "nantes")

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <MapPin className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight text-lg">
              RECIFE-NANTES
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="/mapa" className="hover:text-foreground transition-colors">
              Mapa
            </Link>
            <span className="text-foreground font-medium">Diretório</span>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Diretório</h1>
          <p className="text-muted-foreground">
            {actors.length} atores da cooperação Recife-Nantes
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nome, papel, setor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex gap-2">
            {[
              { value: null, label: "Todos" },
              { value: "recife", label: "Recife" },
              { value: "nantes", label: "Nantes" },
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() => setFilterSide(opt.value)}
                className={cn(
                  "rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                  filterSide === opt.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {(!filterSide || filterSide === "recife") && recife.length > 0 && (
          <section className="mb-10">
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              Recife ({recife.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recife.map((actor) => (
                <ActorCard key={actor.id} actor={actor} />
              ))}
            </div>
          </section>
        )}

        {(!filterSide || filterSide === "nantes") && nantes.length > 0 && (
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <span className="h-3 w-3 rounded-full bg-blue-500" />
              Nantes ({nantes.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nantes.map((actor) => (
                <ActorCard key={actor.id} actor={actor} />
              ))}
            </div>
          </section>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p>Nenhum ator encontrado.</p>
          </div>
        )}
      </main>
    </div>
  )
}

function ActorCard({ actor }: { actor: Actor }) {
  const Icon = TYPE_ICONS[actor.type]
  return (
    <Link
      href={`/ator/${actor.id}`}
      className="group flex gap-4 rounded-xl border border-border p-4 hover:bg-secondary/50 transition-colors"
    >
      <div
        className={cn(
          "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
          actor.side === "recife"
            ? "bg-emerald-100 text-emerald-700"
            : "bg-blue-100 text-blue-700"
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <h3 className="font-medium text-sm group-hover:text-primary transition-colors truncate">
          {actor.name}
        </h3>
        <p className="text-xs text-muted-foreground truncate">
          {TYPE_LABELS[actor.type]}
          {actor.role ? ` · ${actor.role}` : ""}
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          {actor.sectors.slice(0, 3).map((s) => (
            <span
              key={s}
              className="inline-flex rounded-full bg-secondary px-2 py-0.5 text-[10px]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
