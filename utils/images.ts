import { notion } from '@/lib/notion'
import { put } from '@vercel/blob'
import fetch from 'node-fetch' // Ensure fetch is available in your environment

export const isNotionUrl = (url: string): boolean => {
  return (
    url.startsWith('https://prod-files-secure.s3.us-west-2.amazonaws.com') ||
    url.startsWith('https://s3.us-west-2.amazonaws.com')
  )
}

export async function uploadToVercelBlob (url: string, filename: string): Promise<string> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch image from URL: ${url}`)
    }
    const buffer = await response.buffer()
    const { url: blobUrl } = await put(filename, buffer, {
      access: 'public',
      contentType: 'image/webp' // Adjust the content type as needed
    })
    return blobUrl
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error)
    return url // Return original URL if upload fails
  }
}

export async function processImageUrl (url: string, id: string, prefix: string): Promise<string> {
  if (isNotionUrl(url)) {
    const newUrl = await uploadToVercelBlob(url, `${prefix}-${id}.webp`)
    try {
      await notion.pages.update({
        page_id: id,
        properties: {
          img: {
            files: [
              {
                name: `${prefix}-${id}.webp`,
                external: {
                  url: newUrl
                }
              }
            ]
          }
        }
      })
      console.log(`Updated image URL: ${newUrl} for page ID: ${id}`)
    } catch (error) {
      console.error(`Error updating Notion page ID ${id}:`, error)
    }
    return newUrl
  }
  console.log(`Image URL for page ID ${id} is an external URL: ${url}`)
  return url
}
