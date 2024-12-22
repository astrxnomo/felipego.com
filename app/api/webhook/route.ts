import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

const VERCEL_DEPLOY_HOOK = process.env.VERCEL_DEPLOY_HOOK_NOTION_UPDATE

export async function POST (request: Request) {
  try {
    const body = await request.json()

    // Log the webhook payload for debugging
    console.log('Received webhook from Notion:', body)

    // Revalidate the entire site
    revalidatePath('/')

    // Trigger a new deployment on Vercel
    if (VERCEL_DEPLOY_HOOK) {
      const response = await fetch(VERCEL_DEPLOY_HOOK, { method: 'POST' })
      if (response.ok) {
        console.log('Successfully triggered Vercel deployment')
      } else {
        console.error('Failed to trigger Vercel deployment:', await response.text())
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
