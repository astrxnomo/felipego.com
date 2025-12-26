import { generateHeadingId, getPlainText } from "@/lib/utils"
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { notion } from "./client"
import type { TransformedBlock } from "./types"

export async function fetchPageBlocks(
  pageId: string,
): Promise<TransformedBlock[]> {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    })

    const blocks = await Promise.all(
      (response.results as BlockObjectResponse[]).map((block) =>
        transformBlock(block),
      ),
    )

    return blocks.filter((b): b is TransformedBlock => b !== null)
  } catch (error) {
    console.error(`Error fetching blocks for ${pageId}:`, error)
    return []
  }
}

async function transformBlock(
  block: BlockObjectResponse,
): Promise<TransformedBlock | null> {
  const base: TransformedBlock = { id: block.id, type: block.type, content: {} }

  if (block.has_children) {
    base.children = await fetchBlockChildren(block.id)
  }

  const data = (block as any)[block.type]

  switch (block.type) {
    case "paragraph":
    case "quote":
      base.content = { richText: data.rich_text, color: data.color }
      return base

    case "heading_1":
    case "heading_2":
    case "heading_3": {
      const text = getPlainText(data.rich_text)
      base.content = {
        richText: data.rich_text,
        text,
        id: generateHeadingId(text),
        isToggleable: data.is_toggleable,
        color: data.color,
      }
      return base
    }

    case "bulleted_list_item":
    case "numbered_list_item":
      base.content = { richText: data.rich_text, color: data.color }
      return base

    case "to_do":
      base.content = {
        richText: data.rich_text,
        checked: data.checked,
        color: data.color,
      }
      return base

    case "code":
      base.content = {
        code: getPlainText(data.rich_text),
        language: data.language,
        caption: data.caption,
      }
      return base

    case "callout":
      base.content = {
        richText: data.rich_text,
        icon: data.icon,
        color: data.color,
      }
      return base

    case "divider":
      return base

    case "image":
    case "video":
    case "file": {
      let url = data.type === "external" ? data.external.url : data.file.url
      if (data.type === "file") {
        url = await regenerateNotionUrl(block.id, block.type)
      }
      base.content = {
        url,
        caption: data.caption,
        type: data.type,
        ...(block.type === "file" && { name: data.name }),
      }
      return base
    }

    case "bookmark":
      base.content = { url: data.url, caption: data.caption }
      return base

    default:
      return null
  }
}

async function fetchBlockChildren(
  blockId: string,
): Promise<TransformedBlock[]> {
  try {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
    })

    const blocks = await Promise.all(
      (response.results as BlockObjectResponse[]).map((block) =>
        transformBlock(block),
      ),
    )

    return blocks.filter((b): b is TransformedBlock => b !== null)
  } catch (error) {
    console.error(`Error fetching children for ${blockId}:`, error)
    return []
  }
}

async function regenerateNotionUrl(
  blockId: string,
  blockType: string,
): Promise<string> {
  try {
    const block = (await notion.blocks.retrieve({ block_id: blockId })) as any
    if (block.type === blockType) {
      const content = block[blockType]
      return content.type === "file" ? content.file.url : content.external.url
    }
    return ""
  } catch (error) {
    console.error(`Error regenerating URL for ${blockId}:`, error)
    return ""
  }
}
