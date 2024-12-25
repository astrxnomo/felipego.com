import { put, del, list } from '@vercel/blob'
import { notion } from '@/lib/notion'

export async function handleImageUpload (imageUrl: string, prefix: string, title: string, pageId: string): Promise<string> {
  try {
    const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    const imageName = `${prefix}-${sanitizedTitle}.webp`

    // Check if the image already exists in Vercel Blob
    const { blobs } = await list({ prefix: `${prefix}-` })
    const existingBlob = blobs.find(b => b.pathname === imageName)

    // If the Notion URL is empty or invalid, it means the image was removed from Notion
    if (!imageUrl || !imageUrl.startsWith('https://prod-files-secure.s3.us-west-2.amazonaws.com')) {
      if (existingBlob) {
        // If there's an existing blob but no valid Notion URL, delete the blob
        await del(existingBlob.url)
        console.log(`Deleted orphaned blob: ${existingBlob.pathname}`)
      }
      return '' // Return empty string as there's no valid image
    }

    // If the image exists in Vercel Blob and the Notion URL is still valid, use the existing blob
    if (existingBlob) {
      console.log(`Using existing image from Vercel Blob: ${existingBlob.pathname}`)
      return existingBlob.url
    }

    // At this point, we know we need to upload a new image
    const response = await fetch(imageUrl)
    if (!response.ok) {
      console.error(`Failed to fetch image from Notion: ${imageUrl}`)
      return ''
    }

    const blob = await response.blob()

    // Delete any old versions of this image (if title changed, for example)
    const oldBlobs = blobs.filter(b => b.pathname.startsWith(`${prefix}-`) && b.pathname !== imageName)
    for (const oldBlob of oldBlobs) {
      await del(oldBlob.url)
      console.log(`Deleted old image: ${oldBlob.pathname}`)
    }

    // Upload new image to Vercel Blob
    const { url } = await put(imageName, blob, { access: 'public' })
    console.log(`Uploaded new image to Vercel Blob: ${imageName}`)

    // Update Notion with new image URL
    await updateNotionImageUrl(pageId, url)
    console.log(`Updated image URL for page ${pageId} in Notion`)

    return url
  } catch (error) {
    console.error(`Error handling image: ${String(error)}`)
    return ''
  }
}

export async function updateNotionImageUrl (pageId: string, newUrl: string) {
  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        img: {
          files: [
            {
              type: 'external',
              name: 'Updated Image',
              external: {
                url: newUrl
              }
            }
          ]
        }
      }
    })
    console.log(`Updated Notion image URL for page ${pageId}`)
  } catch (error) {
    console.error(`Error updating Notion image URL: ${String(error)}`)
  }
}
