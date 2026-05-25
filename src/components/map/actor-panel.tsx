"use client"

import type { Actor } from "@/types"
import {
  User,
  Building2,
  Briefcase,
  Users,
  ExternalLink,
  X,
  MapPin,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface ActorPanelProps {
  actor: Actor | null
  connectedActors: Actor[]
  onClose: () => void
}

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

const SIDE_LABELS = {
  recife: "Recife",
  nantes: "Nantes",
}

export function ActorPanel({ actor, connectedActors, onClose }: ActorPanelProps) {
  if (!actor) return null

  const Icon = TYPE_ICONS[actor.type]

  return (
    <div className="absolute top-4 right-4 w-80 max-h-[calc(100%-2rem)] overflow-y-auto rounded-xl border border-border bg-card shadow-lg animate-fade-in">
      <div className="sticky top-0 bg-card border-b border-border p-4 flex items-start justify-between">
        <div className="flex items-center gap-3 min-w-0">
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
            <h3 className="font-semibold text-sm truncate">{actor.name}</h3>
            <p className="text-xs text-muted-foreground">
              {TYPE_LABELS[actor.type]} · {SIDE_LABELS[actor.side]}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-secondary transition-colors shrink-0"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {actor.role && (
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Papel
            </p>
            <p className="text-sm">{actor.role}</p>
          </div>
        )}

        {actor.description && (
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Sobre
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {actor.description}
            </p>
          </div>
        )}

        {actor.sectors.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Setores
            </p>
            <div className="flex flex-wrap gap-1.5">
              {actor.sectors.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {connectedActors.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Conexões ({connectedActors.length})
            </p>
            <div className="space-y-1.5">
              {connectedActors.map((ca) => (
                <div
                  key={ca.id}
                  className="flex items-center gap-2 text-sm p-1.5 rounded-md hover:bg-secondary transition-colors"
                >
                  <MapPin
                    className={cn(
                      "h-3 w-3 shrink-0",
                      ca.side === "recife"
                        ? "text-emerald-500"
                        : "text-blue-500"
                    )}
                  />
                  <span className="truncate">{ca.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {actor.contact?.website && (
          <a
            href={actor.contact.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            {actor.contact.website.replace(/^https?:\/\//, "")}
          </a>
        )}

        <Link
          href={`/ator/${actor.id}`}
          className="block w-full text-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Ver perfil completo
        </Link>
      </div>
    </div>
  )
}
