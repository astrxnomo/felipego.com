"use client"

import type { RichText as RichTextType } from "@/lib/notion/types"
import { RichText } from "./rich-text"

interface ParagraphBlockProps {
  richText: RichTextType[]
  children?: React.ReactNode
}

export function ParagraphBlock({ richText, children }: ParagraphBlockProps) {
  return (
    <div>
      <p className="text-muted-foreground mt-2">
        <RichText richText={richText} />
      </p>
      {children}
    </div>
  )
}
