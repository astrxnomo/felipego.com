import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

const VERCEL_DEPLOY_HOOK_NOTION_UPDATE = process.env.VERCEL_DEPLOY_HOOK_NOTION_UPDATE
const NOTION_WEBHOOK_KEY = process.env.NOTION_WEBHOOK_KEY

export async function POST (request: Request) {
  try {
    const notionSecret = request.headers.get('X-Notion-Secret')

    if (!notionSecret || notionSecret !== NOTION_WEBHOOK_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await request.json()
    revalidatePath('/')

    if (VERCEL_DEPLOY_HOOK_NOTION_UPDATE) {
      const response = await fetch(VERCEL_DEPLOY_HOOK_NOTION_UPDATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Error triggering deployment on Vercel')
      }
    } else {
      throw new Error('VERCEL_DEPLOY_HOOK_NOTION_UPDATE is not defined')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
