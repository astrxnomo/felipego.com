import { storage } from "@/lib/appwrite"
import { notion } from "@/lib/notion"

const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT

if (!BUCKET_ID || !PROJECT_ID || !ENDPOINT) {
  throw new Error("Appwrite environment variables missing")
}

export async function exportImage(
  imageUrl: string,
  prefix: string,
  name: string,
  pageId: string,
): Promise<string> {
  if (!imageUrl?.trim()) return ""

  if (
    imageUrl.startsWith(
      "https://prod-files-secure.s3.us-west-2.amazonaws.com",
    ) ||
    imageUrl.startsWith("https://file.notion.so")
  ) {
  } else {
    return imageUrl
  }

  try {
    const response = await fetch(imageUrl)
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`)

    const blob = await response.blob()

    try {
      await storage.deleteFile(BUCKET_ID!, pageId)
    } catch (e: any) {
      if (e?.code !== 404 && e?.response?.code !== 404) throw e
    }

    const fileName = `${prefix}-${name
      .replace(/[^a-z0-9\-_.]/gi, "_")
      .toLowerCase()}`
    const file = new File([blob], fileName, { type: blob.type || "image/jpeg" })

    await storage.createFile(BUCKET_ID!, pageId, file)

    const publicUrl = `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${pageId}/view?project=${PROJECT_ID}`

    updateNotionImageUrl(pageId, publicUrl)

    return publicUrl
  } catch (error: any) {
    console.error("Upload error:", error.message)
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
  } catch (error: any) {
    console.error("Notion update error:", error.message)
    return false
  }
}
