import { sites } from "@/lib/appwrite"
import { NextResponse } from "next/server"
import { VCSDeploymentType } from "node-appwrite"

const NOTION_WEBHOOK_KEY = process.env.NOTION_WEBHOOK_KEY
const APPWRITE_SITE_ID = process.env.APPWRITE_SITE_ID!

export async function POST(request: Request) {
  try {
    const notionSecret = request.headers.get("X-Notion-Secret")

    if (!notionSecret || notionSecret !== NOTION_WEBHOOK_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const redeploy = await sites.createVcsDeployment(
      APPWRITE_SITE_ID,
      VCSDeploymentType.Branch,
      "main",
      true,
    )

    return NextResponse.json(
      { success: true, deploy: redeploy },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
