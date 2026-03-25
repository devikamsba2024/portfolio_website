import { NextResponse } from "next/server"
import { getMediumPostsDirect } from "@/lib/medium"

export const revalidate = 3600 // revalidate every hour

export async function GET() {
  const username = process.env.NEXT_PUBLIC_MEDIUM_USERNAME

  if (!username) {
    return NextResponse.json({ error: "Medium username not configured" }, { status: 500 })
  }

  const posts = await getMediumPostsDirect(username)
  return NextResponse.json(posts)
}
