import { NextResponse } from "next/server"
import { VCSDeploymentType } from "node-appwrite"

import { sites } from "@/lib/appwrite"

const NOTION_WEBHOOK_KEY = process.env.NOTION_WEBHOOK_KEY
const APPWRITE_SITE_ID = process.env.APPWRITE_SITE_ID!

export async function POST(request: Request) {
  try {
    const notionSecret = request.headers.get("X-Notion-Secret")
    console.log("Received X-Notion-Secret:", notionSecret)

    if (!notionSecret || notionSecret !== NOTION_WEBHOOK_KEY) {
      console.log("Unauthorized request")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const redeploy = await sites.createVcsDeployment(
      APPWRITE_SITE_ID,
      VCSDeploymentType.Branch,
      "main",
      true,
    )
    console.log("Redeploy result:", redeploy)

    return NextResponse.json(
      { success: true, deploy: redeploy },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error in redeploy endpoint:", error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
