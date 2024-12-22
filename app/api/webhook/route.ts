import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

// Deploy Hook URL from Vercel
const DEPLOY_HOOK_URL = process.env.VERCEL_DEPLOY_HOOK_NOTION_UPDATE

export async function POST (request: Request) {
  try {
    const body = await request.json()

    // Log the webhook payload for debugging
    console.log('Received webhook from Notion:', body)

    // Revalidate the entire site
    revalidatePath('/')

    // Trigger a new deployment on Vercel using the Deploy Hook URL
    console.log('Attempting to trigger Vercel deployment with URL:', DEPLOY_HOOK_URL)
    try {
      if (!DEPLOY_HOOK_URL) {
        throw new Error('DEPLOY_HOOK_URL is not defined')
      }

      const response = await fetch(DEPLOY_HOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log('Vercel deployment response status:', response.status)
      const responseText = await response.text()
      console.log('Vercel deployment response body:', responseText)

      if (response.ok) {
        console.log('Successfully triggered Vercel deployment')
      } else {
        console.error('Failed to trigger Vercel deployment:', responseText)
      }
    } catch (error) {
      console.error('Error triggering Vercel deployment:', error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
