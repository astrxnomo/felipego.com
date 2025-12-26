"use client"

import type { RichText as RichTextType } from "@/lib/notion/types"
import { RichText } from "./rich-text"

interface TodoBlockProps {
  richText: RichTextType[]
  checked: boolean
  children?: React.ReactNode
}

export function TodoBlock({ richText, checked, children }: TodoBlockProps) {
  return (
    <div className="my-2">
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          checked={checked}
          readOnly
          className="mt-1 rounded"
        />
        <div className={checked ? "text-muted-foreground line-through" : ""}>
          <RichText richText={richText} />
        </div>
      </div>
      {children}
    </div>
  )
}
