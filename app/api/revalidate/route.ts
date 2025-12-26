import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

const NOTION_WEBHOOK_KEY = process.env.NOTION_WEBHOOK_KEY

export async function POST(request: Request) {
  try {
    const notionSecret = request.headers.get("X-Notion-Secret")
    const pathToRevalidate = request.headers.get("X-Revalidate-Path") ?? "/"

    if (!notionSecret || notionSecret !== NOTION_WEBHOOK_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await request.json().catch(() => ({}))

    revalidatePath(pathToRevalidate, "layout")

    return NextResponse.json({
      success: true,
      revalidated: pathToRevalidate,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error("Revalidation error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    )
  }
}
