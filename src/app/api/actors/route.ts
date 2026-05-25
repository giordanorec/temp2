import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import * as db from "@/lib/db"

export async function GET() {
  const actors = await db.getActors()
  const connections = await db.getConnections()
  return NextResponse.json({ actors, connections })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const data = await req.json()

  if (session.user.role === "admin") {
    await db.createActor(data, session.user.id)
    return NextResponse.json({ ok: true })
  }

  if (session.user.role === "member") {
    await db.createSuggestion({
      type: "new_actor",
      data,
      userId: session.user.id,
    })
    return NextResponse.json({ ok: true, pending: true })
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 })
}
