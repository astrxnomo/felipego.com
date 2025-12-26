"use client"

import type { RichText as RichTextType } from "@/lib/notion/types"
import { RichText } from "./rich-text"

interface CalloutBlockProps {
  richText: RichTextType[]
  icon?:
    | { type: "emoji"; emoji: string }
    | { type: "external"; external: { url: string } }
  children?: React.ReactNode
}

export function CalloutBlock({ richText, icon, children }: CalloutBlockProps) {
  const emoji = icon?.type === "emoji" ? icon.emoji : "💡"

  return (
    <div className="bg-muted/50 border-primary/50 my-6 flex gap-3 rounded-lg border-l-4 p-4">
      <span className="shrink-0 text-2xl">{emoji}</span>
      <div className="flex-1">
        <RichText richText={richText} />
        {children}
      </div>
    </div>
  )
}
