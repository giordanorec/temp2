import { sql } from "@vercel/postgres"
import actors from "../data/actors.json"
import connections from "../data/connections.json"
import sectors from "../data/sectors.json"

async function seed() {
  console.log("Seeding sectors...")
  for (const s of sectors) {
    await sql`
      INSERT INTO sectors (id, name, description)
      VALUES (${s.id}, ${s.name}, ${s.description ?? null})
      ON CONFLICT (id) DO NOTHING
    `
  }

  console.log("Seeding actors...")
  for (const a of actors) {
    await sql`
      INSERT INTO actors (id, name, side, type, sectors, institution, role, description, contact, tags, photo_url)
      VALUES (${a.id}, ${a.name}, ${a.side}, ${a.type},
              ${a.sectors as unknown as string}, ${a.institution ?? null},
              ${a.role ?? null}, ${a.description ?? null},
              ${JSON.stringify(a.contact ?? {})},
              ${a.tags as unknown as string ?? []},
              ${(a as Record<string, unknown>).photoUrl as string ?? null})
      ON CONFLICT (id) DO NOTHING
    `
  }

  console.log("Seeding connections...")
  for (const c of connections) {
    await sql`
      INSERT INTO connections (id, from_actor, to_actor, type, label, since)
      VALUES (${c.id}, ${c.from}, ${c.to}, ${c.type}, ${c.label ?? null}, ${c.since ?? null})
      ON CONFLICT (id) DO NOTHING
    `
  }

  console.log("Done!")
}

seed().catch(console.error)
