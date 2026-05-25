import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import * as db from "@/lib/db"

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export async function GET() {
  const session = await auth()
  if (!session?.user || session.user.role === "visitor") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  const uploads = await db.getUploads()
  return NextResponse.json({ uploads })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role === "visitor") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  if (!session.user.lgpdConsentAt) {
    return NextResponse.json({ error: "LGPD consent required" }, { status: 403 })
  }

  const { filename, contentType, size, description, actorId } = await req.json()

  if (size > 50 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 50MB)" }, { status: 400 })
  }

  const key = `uploads/${Date.now()}-${filename}`

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET!,
    Key: key,
    ContentType: contentType,
  })

  const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 600 })

  await db.createUpload({
    filename,
    r2Key: key,
    mimeType: contentType,
    sizeBytes: size,
    description,
    actorId,
    userId: session.user.id,
  })

  return NextResponse.json({ presignedUrl, key })
}
