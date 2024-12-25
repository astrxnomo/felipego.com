import { put, del, list } from '@vercel/blob'
import { notion } from '@/lib/notion'

export async function handleImageUpload (imageUrl: string, prefix: string, title: string, pageId: string): Promise<string> {
  if (!imageUrl) {
    console.log('Image URL is null or undefined')
    return imageUrl
  }

  if (!imageUrl.startsWith('https://prod-files-secure.s3.us-west-2.amazonaws.com')) {
    console.log(`Invalid image URL or external: ${imageUrl}`)
    return imageUrl
  }

  try {
    const response = await fetch(imageUrl)
    if (!response.ok) {
      console.error(`Failed to fetch image: ${imageUrl}`)
      return imageUrl
    }

    const blob = await response.blob()
    const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    const imageName = `${prefix}-${sanitizedTitle}.webp`

    // Delete old image if it exists
    const { blobs } = await list({ prefix: `${prefix}-` })
    const oldBlob = blobs.find(b => b.pathname.startsWith(`${prefix}-${sanitizedTitle}`))
    if (oldBlob) {
      console.log(`Deleted old image: ${oldBlob.pathname}`)
      await del(oldBlob.url)
    }

    // Upload new image
    const { url } = await put(imageName, blob, { access: 'public' })
    console.log(`Uploaded image: ${imageName}`)

    // Update Notion with new image URL
    await updateNotionImageUrl(pageId, url)
    console.log(`Updated image URL for page ${pageId}`)

    return url
  } catch (error) {
    console.error(`Error handling image: ${String(error)}`)
    return imageUrl
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
