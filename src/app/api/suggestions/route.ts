import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import * as db from "@/lib/db"

export async function GET() {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  const suggestions = await db.getSuggestions()
  return NextResponse.json({ suggestions })
}

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { id, status, note } = await req.json()

  if (status === "approved") {
    const suggestions = await db.getSuggestions("pending")
    const suggestion = suggestions.find((s) => s.id === id)
    if (suggestion) {
      const data = suggestion.data
      if (suggestion.type === "new_actor") {
        await db.createActor(data as unknown as Parameters<typeof db.createActor>[0], suggestion.submitted_by as string)
      } else if (suggestion.type === "new_connection") {
        await db.createConnection(data as unknown as Parameters<typeof db.createConnection>[0], suggestion.submitted_by as string)
      }
    }
  }

  await db.reviewSuggestion(id, status, session.user.id, note)
  return NextResponse.json({ ok: true })
}
