import { put, del, list } from '@vercel/blob'
import { notion } from '@/lib/notion'

export async function handleImageUpload (imageUrl: string, prefix: string, title: string, pageId: string): Promise<string> {
  try {
    const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    const imageName = `${prefix}-${sanitizedTitle}.webp`

    // Check if the image already exists in Vercel Blob
    const { blobs } = await list({ prefix: `${prefix}-` })
    const existingBlob = blobs.find(b => b.pathname === imageName)
    const oldBlob = blobs.find(b => b.pathname.startsWith(`${prefix}-${sanitizedTitle}`))

    if (existingBlob) {
      // If the image exists in Vercel Blob, use that URL
      console.log(`Using existing image from Vercel Blob: ${existingBlob.pathname}`)
      return existingBlob.url
    }

    // If the image doesn't exist in Vercel Blob, check if it's a valid Notion URL
    if (imageUrl?.startsWith('https://prod-files-secure.s3.us-west-2.amazonaws.com')) {
      const response = await fetch(imageUrl)
      if (!response.ok) {
        console.error(`Failed to fetch image from Notion: ${imageUrl}`)
        return ''
      }

      const blob = await response.blob()

      // Delete old image if it exists
      if (oldBlob) {
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
    } else {
      // If it's not a valid Notion URL and doesn't exist in Vercel Blob, return empty string
      console.log(`Invalid image URL for ${title}: ${imageUrl}`)
      return ''
    }
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
