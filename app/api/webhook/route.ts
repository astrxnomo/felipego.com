import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const NOTION_WEBHOOK_KEY = process.env.NOTION_WEBHOOK_KEY;

export async function POST(request: Request) {
  try {
    const notionSecret = request.headers.get("X-Notion-Secret");
    const pathToRevalidate = request.headers.get("X-Revalidate-Path");

    if (!notionSecret || notionSecret !== NOTION_WEBHOOK_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!pathToRevalidate) {
      return NextResponse.json(
        { error: "Missing X-Revalidate-Path header" },
        { status: 400 },
      );
    }

    await request.json();
    revalidatePath(pathToRevalidate);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
