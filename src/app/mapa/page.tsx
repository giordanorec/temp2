"use client"

import { useState, useMemo } from "react"
import { NetworkGraph } from "@/components/map/network-graph"
import { ActorPanel } from "@/components/map/actor-panel"
import { MapPin, Filter, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { Actor } from "@/types"
import actorsData from "../../../data/actors.json"
import connectionsData from "../../../data/connections.json"
import sectorsData from "../../../data/sectors.json"

const actors = actorsData as Actor[]

export default function MapaPage() {
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null)
  const [selectedSide, setSelectedSide] = useState<string | null>(null)
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const connectedActors = useMemo(() => {
    if (!selectedActor) return []
    const conns = (connectionsData as { from: string; to: string }[]).filter(
      (c) => c.from === selectedActor.id || c.to === selectedActor.id
    )
    const connIds = conns.map((c) =>
      c.from === selectedActor.id ? c.to : c.from
    )
    return actors.filter((a) => connIds.includes(a.id))
  }, [selectedActor])

  const hasFilters = selectedSide || selectedSector || selectedType

  const stats = useMemo(() => {
    const recife = actors.filter((a) => a.side === "recife").length
    const nantes = actors.filter((a) => a.side === "nantes").length
    return { total: actors.length, recife, nantes, connections: connectionsData.length }
  }, [])

  return (
    <div className="flex flex-col h-screen bg-background font-sans">
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 z-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <MapPin className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight">RECIFE-NANTES</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
            <span className="text-foreground font-medium">Mapa</span>
            <Link href="/diretorio" className="hover:text-foreground transition-colors">
              Diretório
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex-1 flex flex-col relative overflow-hidden">
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between border-b border-border/30 bg-background">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{stats.total} atores</span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {stats.recife} Recife
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              {stats.nantes} Nantes
            </span>
            <span>{stats.connections} conexões</span>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
              hasFilters
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            <Filter className="h-3 w-3" />
            Filtros
            {hasFilters && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedSide(null)
                  setSelectedSector(null)
                  setSelectedType(null)
                }}
                className="ml-1"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="px-4 sm:px-6 py-3 border-b border-border/30 bg-secondary/30 flex flex-wrap gap-4 animate-fade-in">
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                Lado
              </p>
              <div className="flex gap-1.5">
                {[
                  { value: null, label: "Todos" },
                  { value: "recife", label: "Recife" },
                  { value: "nantes", label: "Nantes" },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedSide(opt.value)}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs transition-colors",
                      selectedSide === opt.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border hover:bg-secondary"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                Tipo
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {[
                  { value: null, label: "Todos" },
                  { value: "person", label: "Pessoas" },
                  { value: "institution", label: "Instituições" },
                  { value: "company", label: "Empresas" },
                  { value: "association", label: "Associações" },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedType(opt.value)}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs transition-colors",
                      selectedType === opt.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border hover:bg-secondary"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                Setor
              </p>
              <div className="flex gap-1.5 flex-wrap">
                <button
                  onClick={() => setSelectedSector(null)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs transition-colors",
                    !selectedSector
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border border-border hover:bg-secondary"
                  )}
                >
                  Todos
                </button>
                {(sectorsData as { id: string; name: string }[]).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSector(s.id)}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs transition-colors",
                      selectedSector === s.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border hover:bg-secondary"
                    )}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 relative p-2">
          <NetworkGraph
            actors={actors}
            connections={connectionsData as { id: string; from: string; to: string; type: string; label?: string }[]}
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
