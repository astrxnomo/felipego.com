"use client"

import { CodeBlock } from "@/components/ui/code-block"
import type { RichText as RichTextType } from "@/lib/notion/types"
import { getPlainText } from "@/lib/utils"

interface CodeBlockComponentProps {
  code: string
  language: string
  caption?: RichTextType[]
}

export function CodeBlockComponent({
  code,
  language,
  caption,
}: CodeBlockComponentProps) {
  return (
    <div className="my-6">
      <CodeBlock language={language}>{code}</CodeBlock>
      {caption && caption.length > 0 && (
        <p className="text-muted-foreground mt-2 text-center text-sm">
          {getPlainText(caption)}
        </p>
      )}
    </div>
  )
}
