import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import * as db from "@/lib/db"

export async function GET() {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  const users = await db.getAllUsers()
  return NextResponse.json({ users })
}

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { userId, role } = await req.json()
  if (!["visitor", "member", "admin"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 })
  }

  await db.setUserRole(userId, role)
  return NextResponse.json({ ok: true })
}
