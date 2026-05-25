import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { sql } from "@vercel/postgres"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false
      const { rows } = await sql`SELECT id FROM users WHERE email = ${user.email}`
      if (rows.length === 0) {
        await sql`
          INSERT INTO users (email, name, image, role)
          VALUES (${user.email}, ${user.name ?? null}, ${user.image ?? null}, 'visitor')
        `
      } else {
        await sql`
          UPDATE users SET name = ${user.name ?? null}, image = ${user.image ?? null}, updated_at = NOW()
          WHERE email = ${user.email}
        `
      }
      return true
    },
    async session({ session }) {
      if (session.user?.email) {
        const { rows } = await sql`
          SELECT id, role, lgpd_consent_at FROM users WHERE email = ${session.user.email}
        `
        if (rows[0]) {
          session.user.id = rows[0].id
          session.user.role = rows[0].role
          session.user.lgpdConsentAt = rows[0].lgpd_consent_at
        }
      }
      return session
    },
  },
})
