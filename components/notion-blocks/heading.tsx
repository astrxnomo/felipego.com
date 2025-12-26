"use client"

import { HeadingLink } from "@/components/ui/heading-link"
import type { RichText as RichTextType } from "@/lib/notion/types"
import { RichText } from "./rich-text"

interface HeadingBlockProps {
  level: 1 | 2 | 3
  richText: RichTextType[]
  id: string
  children?: React.ReactNode
}

export function HeadingBlock({
  level,
  richText,
  id,
  children,
}: HeadingBlockProps) {
  return (
    <>
      <HeadingLink level={level} id={id}>
        <RichText richText={richText} />
      </HeadingLink>
      {children}
    </>
  )
}
