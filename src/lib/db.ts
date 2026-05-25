import { sql } from "@vercel/postgres"
import type { Actor, Connection, Sector } from "@/types"

export async function getActors(): Promise<Actor[]> {
  const { rows } = await sql`
    SELECT id, name, side, type, sectors, institution, role, description,
           contact, tags, photo_url as "photoUrl"
    FROM actors ORDER BY name
  `
  return rows as Actor[]
}

export async function getActor(id: string): Promise<Actor | null> {
  const { rows } = await sql`
    SELECT id, name, side, type, sectors, institution, role, description,
           contact, tags, photo_url as "photoUrl"
    FROM actors WHERE id = ${id}
  `
  return (rows[0] as Actor) ?? null
}

export async function getConnections(): Promise<Connection[]> {
  const { rows } = await sql`
    SELECT id, from_actor as "from", to_actor as "to", type, label, since
    FROM connections ORDER BY created_at
  `
  return rows as Connection[]
}

export async function getActorConnections(actorId: string): Promise<Connection[]> {
  const { rows } = await sql`
    SELECT id, from_actor as "from", to_actor as "to", type, label, since
    FROM connections WHERE from_actor = ${actorId} OR to_actor = ${actorId}
  `
  return rows as Connection[]
}

export async function getSectors(): Promise<Sector[]> {
  const { rows } = await sql`SELECT id, name, description FROM sectors ORDER BY name`
  return rows as Sector[]
}

export async function getConnectedActors(actorId: string): Promise<Actor[]> {
  const { rows } = await sql`
    SELECT DISTINCT a.id, a.name, a.side, a.type, a.sectors, a.institution,
           a.role, a.description, a.contact, a.tags, a.photo_url as "photoUrl"
    FROM actors a
    JOIN connections c ON (c.from_actor = a.id OR c.to_actor = a.id)
    WHERE (c.from_actor = ${actorId} OR c.to_actor = ${actorId})
      AND a.id != ${actorId}
  `
  return rows as Actor[]
}

export async function createActor(actor: Omit<Actor, "connections">, userId?: string) {
  await sql`
    INSERT INTO actors (id, name, side, type, sectors, institution, role, description, contact, tags, photo_url, created_by)
    VALUES (${actor.id}, ${actor.name}, ${actor.side}, ${actor.type},
            ${actor.sectors as unknown as string}, ${actor.institution ?? null}, ${actor.role ?? null},
            ${actor.description ?? null}, ${JSON.stringify(actor.contact ?? {})},
            ${actor.tags as unknown as string ?? []}, ${actor.photoUrl ?? null}, ${userId ?? null})
  `
}

export async function updateActor(id: string, data: Partial<Actor>) {
  const sets: string[] = []
  if (data.name !== undefined) sets.push(`name = '${data.name}'`)
  if (data.side !== undefined) sets.push(`side = '${data.side}'`)
  if (data.type !== undefined) sets.push(`type = '${data.type}'`)
  if (data.role !== undefined) sets.push(`role = '${data.role}'`)
  if (data.description !== undefined) sets.push(`description = '${data.description}'`)

  await sql.query(`UPDATE actors SET ${sets.join(", ")}, updated_at = NOW() WHERE id = $1`, [id])
}

export async function deleteActor(id: string) {
  await sql`DELETE FROM actors WHERE id = ${id}`
}

export async function createConnection(conn: Connection, userId?: string) {
  await sql`
    INSERT INTO connections (id, from_actor, to_actor, type, label, since, created_by)
    VALUES (${conn.id}, ${conn.from}, ${conn.to}, ${conn.type}, ${conn.label ?? null}, ${conn.since ?? null}, ${userId ?? null})
  `
}

export async function deleteConnection(id: string) {
  await sql`DELETE FROM connections WHERE id = ${id}`
}

export async function getUploads(actorId?: string) {
  if (actorId) {
    const { rows } = await sql`
      SELECT u.*, us.name as uploader_name
      FROM uploads u LEFT JOIN users us ON u.uploaded_by = us.id
      WHERE u.actor_id = ${actorId} ORDER BY u.created_at DESC
    `
    return rows
  }
  const { rows } = await sql`
    SELECT u.*, us.name as uploader_name
    FROM uploads u LEFT JOIN users us ON u.uploaded_by = us.id
    ORDER BY u.created_at DESC LIMIT 100
  `
  return rows
}

export async function createUpload(data: {
  filename: string; r2Key: string; mimeType: string;
  sizeBytes: number; description?: string; actorId?: string; userId?: string
}) {
  await sql`
    INSERT INTO uploads (filename, r2_key, mime_type, size_bytes, description, actor_id, uploaded_by)
    VALUES (${data.filename}, ${data.r2Key}, ${data.mimeType}, ${data.sizeBytes},
            ${data.description ?? null}, ${data.actorId ?? null}, ${data.userId ?? null})
  `
}

export async function getSuggestions(status = "pending") {
  const { rows } = await sql`
    SELECT s.*, u.name as submitter_name, u.email as submitter_email
    FROM suggestions s LEFT JOIN users u ON s.submitted_by = u.id
    WHERE s.status = ${status} ORDER BY s.created_at DESC
  `
  return rows
}

export async function createSuggestion(data: {
  type: string; targetId?: string; data: unknown; userId: string
}) {
  await sql`
    INSERT INTO suggestions (type, target_id, data, submitted_by)
    VALUES (${data.type}, ${data.targetId ?? null}, ${JSON.stringify(data.data)}, ${data.userId})
  `
}

export async function reviewSuggestion(id: string, status: "approved" | "rejected", reviewerId: string, note?: string) {
  await sql`
    UPDATE suggestions SET status = ${status}, reviewed_by = ${reviewerId},
    review_note = ${note ?? null}, reviewed_at = NOW() WHERE id = ${id}
  `
}

export async function getUserByEmail(email: string) {
  const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`
  return rows[0] ?? null
}

export async function setUserRole(userId: string, role: string) {
  await sql`UPDATE users SET role = ${role}, updated_at = NOW() WHERE id = ${userId}`
}

export async function setLgpdConsent(userId: string) {
  await sql`UPDATE users SET lgpd_consent_at = NOW(), updated_at = NOW() WHERE id = ${userId}`
}

export async function getAllUsers() {
  const { rows } = await sql`SELECT id, email, name, image, role, lgpd_consent_at, created_at FROM users ORDER BY created_at DESC`
  return rows
}
