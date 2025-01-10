import { notion } from "@/lib/notion"
import { del, list, put } from "@vercel/blob"

export async function exportImage(
  imageUrl: string,
  prefix: string,
  title: string,
  pageId: string,
): Promise<string> {
  if (!imageUrl) {
    console.log("Image URL is null or undefined")
    return ""
  }

  // Check if the image is hosted on Notion
  if (
    !imageUrl.startsWith("https://prod-files-secure.s3.us-west-2.amazonaws.com")
  ) {
    return imageUrl
  }

  try {
    const response = await fetch(imageUrl)
    if (!response.ok) {
      console.error(`Failed to fetch image: ${imageUrl}`)
      return imageUrl
    }

    const blob = await response.blob()
    const sanitizedTitle = title.replace(/[^a-z0-9]/gi, "_").toLowerCase()
    const imageName = `${prefix}/${sanitizedTitle}.webp`

    // Check for existing image with the same name
    const { blobs } = await list({ prefix: `${prefix}/` })
    const existingImg = blobs.find((img) => img.pathname === imageName)

    if (existingImg) {
      console.log(`Deleting existing image: ${existingImg.pathname}`)
      await del(existingImg.url)
    }

    // Upload new image
    const { url } = await put(imageName, blob, { access: "public" })
    console.log(`Uploaded image in Blob: ${imageName}`)

    // Update Notion with new image URL
    await updateNotionImageUrl(pageId, url)

    return url
  } catch (error) {
    console.error(
      `Error proccesing image: ${imageUrl}, Error: ${String(error)}`,
    )
    return imageUrl
  }
}

async function updateNotionImageUrl(pageId: string, newUrl: string) {
  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        img: {
          files: [
            {
              type: "external",
              name: "Updated Image",
              external: {
                url: newUrl,
              },
            },
          ],
        },
      },
    })
    console.log(`Updated Notion image URL: ${newUrl}`)
  } catch (error) {
    console.error(`Error updating Notion image URL: ${String(error)}`)
  }
}
