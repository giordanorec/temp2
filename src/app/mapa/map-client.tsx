"use client"

import { useState, useMemo } from "react"
import { NetworkGraph } from "@/components/map/network-graph"
import { ActorPanel } from "@/components/map/actor-panel"
import type { Actor, Connection, Sector } from "@/types"
import { Filter, RotateCcw, MapPin } from "lucide-react"
import Link from "next/link"

interface MapClientProps {
  actors: Actor[]
  connections: Connection[]
  sectors: Sector[]
}

export function MapClient({ actors, connections, sectors }: MapClientProps) {
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null)
  const [selectedSide, setSelectedSide] = useState<string | null>(null)
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const connectedActors = useMemo(() => {
    if (!selectedActor) return []
    const connectedIds = new Set<string>()
    connections.forEach((c) => {
      if (c.from === selectedActor.id) connectedIds.add(c.to)
      if (c.to === selectedActor.id) connectedIds.add(c.from)
    })
    return actors.filter((a) => connectedIds.has(a.id))
  }, [selectedActor, connections, actors])

  const hasFilters = selectedSide || selectedSector || selectedType

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-full mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <MapPin className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight">RECIFE-NANTES</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/mapa" className="text-foreground font-medium">Mapa</Link>
            <Link href="/diretorio" className="hover:text-foreground transition-colors">Diretório</Link>
          </nav>
        </div>
      </header>

      <div className="flex-1 flex flex-col">
        <div className="px-6 py-3 flex items-center gap-3 border-b border-border/50">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-secondary transition-colors"
          >
            <Filter className="h-3.5 w-3.5" />
            Filtros
          </button>

          {hasFilters && (
            <button
              onClick={() => {
                setSelectedSide(null)
                setSelectedSector(null)
                setSelectedType(null)
              }}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Limpar
            </button>
          )}

          <div className="flex items-center gap-4 ml-auto text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              Recife
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-blue-500" />
              Nantes
            </span>
          </div>
        </div>

        {showFilters && (
          <div className="px-6 py-3 border-b border-border/50 flex flex-wrap gap-4 bg-secondary/30 animate-fade-in">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Lado
              </label>
              <select
                value={selectedSide || ""}
                onChange={(e) => setSelectedSide(e.target.value || null)}
                className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
              >
                <option value="">Todos</option>
                <option value="recife">Recife</option>
                <option value="nantes">Nantes</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Setor
              </label>
              <select
                value={selectedSector || ""}
                onChange={(e) => setSelectedSector(e.target.value || null)}
                className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
              >
                <option value="">Todos</option>
                {sectors.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Tipo
              </label>
              <select
                value={selectedType || ""}
                onChange={(e) => setSelectedType(e.target.value || null)}
                className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
              >
                <option value="">Todos</option>
                <option value="person">Pessoa</option>
                <option value="institution">Instituição</option>
                <option value="company">Empresa</option>
                <option value="association">Associação</option>
              </select>
            </div>
          </div>
        )}

        <div className="flex-1 relative p-4">
          <NetworkGraph
            actors={actors}
            connections={connections}
            selectedSide={selectedSide}
            selectedSector={selectedSector}
            selectedType={selectedType}
            onSelectActor={setSelectedActor}
          />
          <ActorPanel
            actor={selectedActor}
            connectedActors={connectedActors}
            onClose={() => setSelectedActor(null)}
          />
        </div>
      </div>
    </div>
  )
}
