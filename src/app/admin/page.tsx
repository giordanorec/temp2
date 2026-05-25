"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  MapPin, Users, FileText, Bell, Shield, Check, X, UserPlus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

type Tab = "users" | "suggestions" | "uploads"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const [tab, setTab] = useState<Tab>("users")
  const [users, setUsers] = useState<Record<string, unknown>[]>([])
  const [suggestions, setSuggestions] = useState<Record<string, unknown>[]>([])
  const [uploads, setUploads] = useState<Record<string, unknown>[]>([])

  const fetchData = useCallback(async () => {
    const [u, s, up] = await Promise.all([
      fetch("/api/users").then((r) => r.json()),
      fetch("/api/suggestions").then((r) => r.json()),
      fetch("/api/uploads").then((r) => r.json()),
    ])
    setUsers(u.users || [])
    setSuggestions(s.suggestions || [])
    setUploads(up.uploads || [])
  }, [])

  useEffect(() => {
    if (session?.user?.role === "admin") fetchData()
  }, [session, fetchData])

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen text-muted-foreground">Carregando...</div>
  }

  if (session?.user?.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-muted-foreground">
        <Shield className="h-12 w-12" />
        <p>Acesso restrito a administradores.</p>
        <Link href="/" className="text-sm underline">Voltar ao inicio</Link>
      </div>
    )
  }

  const changeRole = async (userId: string, role: string) => {
    await fetch("/api/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    })
    toast.success(`Papel atualizado para ${role}`)
    fetchData()
  }

  const reviewSuggestion = async (id: string, status: "approved" | "rejected") => {
    await fetch("/api/suggestions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    })
    toast.success(status === "approved" ? "Sugestao aprovada" : "Sugestao rejeitada")
    fetchData()
  }

  const tabs = [
    { id: "users" as Tab, label: "Usuarios", icon: Users, count: users.length },
    { id: "suggestions" as Tab, label: "Sugestoes", icon: Bell, count: suggestions.length },
    { id: "uploads" as Tab, label: "Uploads", icon: FileText, count: uploads.length },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <MapPin className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight">RECIFE-NANTES</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/mapa" className="hover:text-foreground transition-colors">Mapa</Link>
            <span className="text-foreground font-medium flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" /> Admin
            </span>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-6 py-8 w-full">
        <h1 className="text-2xl font-bold tracking-tight mb-6">Painel Admin</h1>

        <div className="flex gap-2 mb-6 border-b border-border">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                tab === t.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">{t.count}</span>
            </button>
          ))}
        </div>

        {tab === "users" && (
          <div className="space-y-2">
            {users.map((u) => (
              <div key={u.id as string} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium text-sm">{u.name as string || "Sem nome"}</p>
                  <p className="text-xs text-muted-foreground">{u.email as string}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={u.role as string}
                    onChange={(e) => changeRole(u.id as string, e.target.value)}
                    className="rounded-md border border-border bg-background px-3 py-1.5 text-xs"
                  >
                    <option value="visitor">Visitante</option>
                    <option value="member">Membro</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            ))}
            {users.length === 0 && (
              <p className="text-center py-8 text-muted-foreground text-sm">
                Nenhum usuario registrado ainda.
              </p>
            )}
          </div>
        )}

        {tab === "suggestions" && (
          <div className="space-y-2">
            {suggestions.map((s) => (
              <div key={s.id as string} className="rounded-lg border border-border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">
                      {s.type as string}
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      por {s.submitter_name as string || s.submitter_email as string}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => reviewSuggestion(s.id as string, "approved")}
                      className="inline-flex items-center gap-1 rounded-md bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-medium hover:bg-emerald-200 transition-colors"
                    >
                      <Check className="h-3 w-3" /> Aprovar
                    </button>
                    <button
                      onClick={() => reviewSuggestion(s.id as string, "rejected")}
                      className="inline-flex items-center gap-1 rounded-md bg-red-100 text-red-700 px-3 py-1 text-xs font-medium hover:bg-red-200 transition-colors"
                    >
                      <X className="h-3 w-3" /> Rejeitar
                    </button>
                  </div>
                </div>
                <pre className="text-xs bg-secondary rounded-md p-3 overflow-x-auto">
                  {JSON.stringify(s.data, null, 2)}
                </pre>
              </div>
            ))}
            {suggestions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Nenhuma sugestao pendente.</p>
              </div>
            )}
          </div>
        )}

        {tab === "uploads" && (
          <div className="space-y-2">
            {uploads.map((u) => (
              <div key={u.id as string} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium text-sm">{u.filename as string}</p>
                  <p className="text-xs text-muted-foreground">
                    {u.uploader_name as string} · {Math.round((u.size_bytes as number) / 1024)}KB · {u.mime_type as string}
                  </p>
                </div>
                {typeof u.description === "string" && u.description && (
                  <p className="text-xs text-muted-foreground max-w-xs truncate">{u.description}</p>
                )}
              </div>
            ))}
            {uploads.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Nenhum arquivo enviado ainda.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
