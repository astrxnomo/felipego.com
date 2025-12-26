"use client"

import type { RichText as RichTextType } from "@/lib/notion/types"
import { RichText } from "./rich-text"

interface QuoteBlockProps {
  richText: RichTextType[]
  children?: React.ReactNode
}

export function QuoteBlock({ richText, children }: QuoteBlockProps) {
  return (
    <blockquote className="border-primary/50 bg-muted/50 my-6 border-l-4 py-4 pr-4 pl-6 italic">
      <p className="text-muted-foreground">
        <RichText richText={richText} />
      </p>
      {children}
    </blockquote>
  )
}
