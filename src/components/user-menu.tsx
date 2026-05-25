"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { LogIn, LogOut, Shield, User } from "lucide-react"
import Link from "next/link"

export function UserMenu() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="h-8 w-8 rounded-full bg-secondary animate-pulse" />
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity"
      >
        <LogIn className="h-3 w-3" />
        Entrar
      </button>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {session.user.role === "admin" && (
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Shield className="h-3 w-3" />
          Admin
        </Link>
      )}
      <div className="flex items-center gap-2">
        {session.user.image ? (
          <img
            src={session.user.image}
            alt=""
            className="h-7 w-7 rounded-full"
          />
        ) : (
          <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center">
            <User className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        )}
        <span className="text-xs text-muted-foreground hidden sm:block">
          {session.user.name?.split(" ")[0]}
        </span>
      </div>
      <button
        onClick={() => signOut()}
        className="p-1 rounded-md hover:bg-secondary transition-colors"
        title="Sair"
      >
        <LogOut className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
    </div>
  )
}
