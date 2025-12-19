import { BUCKET_ID, ENDPOINT, PROJECT_ID, getStorage } from "@/lib/appwrite"
import { notion } from "@/lib/notion/client"

export async function exportImage(
  imageUrl: string,
  prefix: string,
  name: string,
  pageId: string,
): Promise<string> {
  if (!imageUrl?.trim()) return ""

  // Only process Notion-hosted images
  if (
    !imageUrl.startsWith(
      "https://prod-files-secure.s3.us-west-2.amazonaws.com",
    ) &&
    !imageUrl.startsWith("https://file.notion.so")
  ) {
    return imageUrl
  }

  // Skip if Appwrite is not configured
  if (!BUCKET_ID || !ENDPOINT || !PROJECT_ID) {
    console.warn("Appwrite not configured, skipping image export")
    return imageUrl
  }

  const storage = getStorage()

  try {
    const response = await fetch(imageUrl)
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`)

    const blob = await response.blob()

    // Try to delete existing file
    try {
      await storage.deleteFile(BUCKET_ID, pageId)
    } catch (e: unknown) {
      const err = e as { code?: number; response?: { code?: number } }
      if (err?.code !== 404 && err?.response?.code !== 404) throw e
    }

    const fileName = `${prefix}-${name
      .replace(/[^a-z0-9\-_.]/gi, "_")
      .toLowerCase()}`
    const file = new File([blob], fileName, { type: blob.type || "image/jpeg" })

    await storage.createFile(BUCKET_ID, pageId, file)

    const publicUrl = `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${pageId}/view?project=${PROJECT_ID}`

    await updateNotionImageUrl(pageId, publicUrl)

    return publicUrl
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Upload error:", error.message)
    } else {
      console.error("Upload error:", error)
    }
    return imageUrl
  }
}

export async function updateNotionImageUrl(
  pageId: string,
  newUrl: string,
): Promise<boolean> {
  if (!pageId || !newUrl) return false

  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        img: {
          files: [
            {
              type: "external",
              name: "Updated Image",
              external: { url: newUrl },
            },
          ],
        },
      },
    })
    return true
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Notion update error:", error.message)
    } else {
      console.error("Notion update error:", error)
    }
    return false
  }
}
