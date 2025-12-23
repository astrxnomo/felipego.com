import { promises as fs } from "fs"
import path from "path"

export async function downloadImage(
  imageUrl: string,
  category: string,
  name: string,
  pageId: string,
): Promise<string> {
  if (!imageUrl?.trim()) return ""

  // Return non-Notion URLs as-is
  if (
    !imageUrl.startsWith(
      "https://prod-files-secure.s3.us-west-2.amazonaws.com",
    ) &&
    !imageUrl.startsWith("https://file.notion.so")
  ) {
    return imageUrl
  }

  try {
    // Create output directory
    const outputDir = path.join(process.cwd(), "public", "notion-media")
    await fs.mkdir(outputDir, { recursive: true })

    // Use pageId for unique filename (replaces old images)
    const extension =
      imageUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)/i)?.[1] || "jpg"
    const fileName = `${pageId}.${extension}`
    const filePath = path.join(outputDir, fileName)

    // Delete old files with the same pageId but different extensions
    const possibleExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"]
    for (const ext of possibleExtensions) {
      const oldFilePath = path.join(outputDir, `${pageId}.${ext}`)
      try {
        await fs.unlink(oldFilePath)
      } catch {
        // File doesn't exist, ignore
      }
    }

    // Download image
    const response = await fetch(imageUrl)
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`)

    const buffer = await response.arrayBuffer()
    await fs.writeFile(filePath, Buffer.from(buffer))

    return `/notion-media/${fileName}`
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Download error:", error.message)
    } else {
      console.error("Download error:", error)
    }
    return imageUrl
  }
}
