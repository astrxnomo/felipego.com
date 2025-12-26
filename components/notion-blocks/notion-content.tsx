"use client"

import type { TransformedBlock } from "@/lib/notion/types"
import { BookmarkBlock } from "./bookmark"
import { CalloutBlock } from "./callout"
import { CodeBlockComponent } from "./code"
import { HeadingBlock } from "./heading"
import { ImageBlock } from "./image"
import { BulletedListItem, NumberedListItem } from "./list"
import { ParagraphBlock } from "./paragraph"
import { QuoteBlock } from "./quote"
import { TodoBlock } from "./todo"

interface NotionContentProps {
  blocks: TransformedBlock[]
  className?: string
}

export function NotionContent({ blocks, className = "" }: NotionContentProps) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        No content available
      </div>
    )
  }

  const grouped: React.ReactNode[] = []
  let i = 0

  while (i < blocks.length) {
    const block = blocks[i]
    const isList =
      block.type === "bulleted_list_item" || block.type === "numbered_list_item"

    if (isList) {
      const items: TransformedBlock[] = [block]
      const listType = block.type
      i++

      while (i < blocks.length && blocks[i].type === listType) {
        items.push(blocks[i])
        i++
      }

      const ListTag = listType === "bulleted_list_item" ? "ul" : "ol"
      const ItemComponent =
        listType === "bulleted_list_item" ? BulletedListItem : NumberedListItem

      grouped.push(
        <ListTag
          key={items[0].id}
          className={`my-3.5 ml-6 space-y-2 ${listType === "bulleted_list_item" ? "list-disc" : "list-decimal"}`}
        >
          {items.map((item) => (
            <ItemComponent key={item.id} richText={item.content.richText}>
              {item.children?.map((child) => renderBlock(child))}
            </ItemComponent>
          ))}
        </ListTag>,
      )
    } else {
      grouped.push(renderBlock(block))
      i++
    }
  }

  return <div className={className}>{grouped}</div>
}

function renderBlock(block: TransformedBlock): React.ReactNode {
  const children = block.children?.map((child) => renderBlock(child))

  switch (block.type) {
    case "paragraph":
      return (
        <ParagraphBlock key={block.id} richText={block.content.richText}>
          {children}
        </ParagraphBlock>
      )

    case "heading_1":
      return (
        <HeadingBlock
          key={block.id}
          level={1}
          richText={block.content.richText}
          id={block.content.id}
        >
          {children}
        </HeadingBlock>
      )

    case "heading_2":
      return (
        <HeadingBlock
          key={block.id}
          level={2}
          richText={block.content.richText}
          id={block.content.id}
        >
          {children}
        </HeadingBlock>
      )

    case "heading_3":
      return (
        <HeadingBlock
          key={block.id}
          level={3}
          richText={block.content.richText}
          id={block.content.id}
        >
          {children}
        </HeadingBlock>
      )

    case "to_do":
      return (
        <TodoBlock
          key={block.id}
          richText={block.content.richText}
          checked={block.content.checked}
        >
          {children}
        </TodoBlock>
      )

    case "code":
      return (
        <CodeBlockComponent
          key={block.id}
          code={block.content.code}
          language={block.content.language}
          caption={block.content.caption}
        />
      )

    case "quote":
      return (
        <QuoteBlock key={block.id} richText={block.content.richText}>
          {children}
        </QuoteBlock>
      )

    case "callout":
      return (
        <CalloutBlock
          key={block.id}
          richText={block.content.richText}
          icon={block.content.icon}
        >
          {children}
        </CalloutBlock>
      )

    case "divider":
      return <hr key={block.id} className="border-border my-8 border-t" />

    case "image":
      return (
        <ImageBlock
          key={block.id}
          url={block.content.url}
          caption={block.content.caption}
        />
      )

    case "video":
      return (
        <div
          key={block.id}
          className="my-8 aspect-video overflow-hidden rounded-lg"
        >
          <iframe
            src={block.content.url}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )

    case "bookmark":
      return (
        <BookmarkBlock
          key={block.id}
          url={block.content.url}
          caption={block.content.caption}
        />
      )

    default:
      console.warn(`Unsupported block type: ${block.type}`)
      return null
  }
}
