"use client"

import type { RichText as RichTextType } from "@/lib/notion/types"
import { getPlainText } from "@/lib/utils"

interface BookmarkBlockProps {
  url: string
  caption?: RichTextType[]
}

export function BookmarkBlock({ url, caption }: BookmarkBlockProps) {
  const title = caption && caption.length > 0 ? getPlainText(caption) : url

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="border-border hover:bg-muted/50 my-4 block rounded-lg border p-4 transition-colors"
    >
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">🔗</span>
        <span className="text-foreground underline decoration-dotted decoration-[1.5px] underline-offset-5 hover:opacity-80">
          {title}
        </span>
      </div>
    </a>
  )
}
