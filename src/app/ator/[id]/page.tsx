import { notFound } from "next/navigation"
import Link from "next/link"
import {
  MapPin,
  User,
  Building2,
  Briefcase,
  Users,
  ArrowLeft,
  ExternalLink,
  Globe,
  Mail,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Actor, Connection } from "@/types"
import actorsData from "../../../../data/actors.json"
import connectionsData from "../../../../data/connections.json"

const actors = actorsData as Actor[]
const connections = connectionsData as Connection[]

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

export function generateStaticParams() {
  return actors.map((a) => ({ id: a.id }))
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return params.then(({ id }) => {
    const actor = actors.find((a) => a.id === id)
    return {
      title: actor
        ? `${actor.name} | RECIFE-NANTES`
        : "Ator não encontrado",
    }
  })
}

export default async function AtorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const actor = actors.find((a) => a.id === id)
  if (!actor) notFound()

  const Icon = TYPE_ICONS[actor.type]

  const actorConnections = connections.filter(
    (c) => c.from === actor.id || c.to === actor.id
  )

  const connectedActors = actorConnections
    .map((c) => {
      const otherId = c.from === actor.id ? c.to : c.from
      const other = actors.find((a) => a.id === otherId)
      return other ? { actor: other, connection: c } : null
    })
    .filter(Boolean) as { actor: Actor; connection: Connection }[]

  const institution = actor.institution
    ? actors.find((a) => a.id === actor.institution)
    : null

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
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
            <Link
              href="/diretorio"
              className="hover:text-foreground transition-colors"
            >
              Diretório
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <Link
          href="/diretorio"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao diretório
        </Link>

        <div className="flex items-start gap-5 mb-8">
          <div
            className={cn(
              "h-16 w-16 rounded-2xl flex items-center justify-center shrink-0",
              actor.side === "recife"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-blue-100 text-blue-700"
            )}
          >
            <Icon className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {actor.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
              <span>{TYPE_LABELS[actor.type]}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    actor.side === "recife" ? "bg-emerald-500" : "bg-blue-500"
                  )}
                />
                {actor.side === "recife" ? "Recife" : "Nantes"}
              </span>
              {actor.role && (
                <>
                  <span>·</span>
                  <span>{actor.role}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {actor.description && (
              <section>
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Sobre
                </h2>
                <p className="text-foreground leading-relaxed">
                  {actor.description}
                </p>
              </section>
            )}

            {institution && (
              <section>
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Instituição
                </h2>
                <Link
                  href={`/ator/${institution.id}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-border p-3 hover:bg-secondary/50 transition-colors"
                >
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">{institution.name}</span>
                </Link>
              </section>
            )}

            {connectedActors.length > 0 && (
              <section>
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Conexões ({connectedActors.length})
                </h2>
                <div className="space-y-3">
                  {connectedActors.map(({ actor: ca, connection }) => {
                    const CaIcon = TYPE_ICONS[ca.type]
                    return (
                      <Link
                        key={ca.id}
                        href={`/ator/${ca.id}`}
                        className="flex items-center gap-4 rounded-xl border border-border p-4 hover:bg-secondary/50 transition-colors"
                      >
                        <div
                          className={cn(
                            "h-9 w-9 rounded-lg flex items-center justify-center shrink-0",
                            ca.side === "recife"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-blue-100 text-blue-700"
                          )}
                        >
                          <CaIcon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm truncate">
                            {ca.name}
                          </p>
                          {connection.label && (
                            <p className="text-xs text-muted-foreground truncate">
                              {connection.label}
                            </p>
                          )}
                        </div>
                        <span className="text-[10px] rounded-full bg-secondary px-2 py-0.5 shrink-0">
                          {connection.type}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6">
            {actor.sectors.length > 0 && (
              <section>
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Setores
                </h2>
                <div className="flex flex-wrap gap-2">
                  {actor.sectors.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-secondary px-3 py-1 text-xs"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {actor.tags && actor.tags.length > 0 && (
              <section>
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {actor.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {actor.contact && (
              <section>
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Contato
                </h2>
                <div className="space-y-2">
                  {actor.contact.website && (
                    <a
                      href={actor.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                      {actor.contact.website.replace(/^https?:\/\//, "")}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {actor.contact.email && (
                    <a
                      href={`mailto:${actor.contact.email}`}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      {actor.contact.email}
                    </a>
                  )}
                </div>
              </section>
            )}

            <Link
              href={`/mapa`}
              className="block w-full text-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Ver no mapa
            </Link>
          </aside>
        </div>
      </main>
    </div>
  )
}
