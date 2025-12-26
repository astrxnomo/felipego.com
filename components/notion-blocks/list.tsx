"use client"

import type { RichText as RichTextType } from "@/lib/notion/types"
import { RichText } from "./rich-text"

interface ListItemProps {
  richText: RichTextType[]
  children?: React.ReactNode
}

export function BulletedListItem({ richText, children }: ListItemProps) {
  return (
    <li className="text-muted-foreground">
      <RichText richText={richText} />
      {children && <ul className="ml-6 list-disc space-y-2">{children}</ul>}
    </li>
  )
}

export function NumberedListItem({ richText, children }: ListItemProps) {
  return (
    <li className="text-muted-foreground">
      <RichText richText={richText} />
      {children && <ol className="ml-6 list-decimal space-y-2">{children}</ol>}
    </li>
  )
}
