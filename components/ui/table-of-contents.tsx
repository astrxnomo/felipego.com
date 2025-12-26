"use client"

import type { TransformedBlock } from "@/lib/notion/types"
import { translations, type Language } from "@/lib/translations"
import { useMemo } from "react"

interface NotionTableOfContentsProps {
  blocks: TransformedBlock[]
  lang?: Language
}

export function TableOfContents({
  blocks,
  lang = "en",
}: NotionTableOfContentsProps) {
  const headings = useMemo(() => {
    const extractHeadings = (
      blocks: TransformedBlock[],
    ): Array<{ id: string; text: string; level: number }> => {
      const result: Array<{ id: string; text: string; level: number }> = []

      for (const block of blocks) {
        if (
          block.type === "heading_1" ||
          block.type === "heading_2" ||
          block.type === "heading_3"
        ) {
          const level =
            block.type === "heading_1" ? 1 : block.type === "heading_2" ? 2 : 3

          result.push({
            id: block.content.id,
            text: block.content.text,
            level,
          })
        }

        // Recursively check children
        if (block.children && block.children.length > 0) {
          result.push(...extractHeadings(block.children))
        }
      }

      return result
    }

    return extractHeadings(blocks)
  }, [blocks])

  if (headings.length === 0) return null

  const filteredHeadings = headings.filter((h) => h.level === 2)

  return (
    <nav className="">
      <h2 className="mb-4 text-sm font-semibold tracking-wide">
        {translations[lang].tableOfContents}
      </h2>
      <ol className="ml-2 space-y-2.5 text-sm">
        {filteredHeadings.map((heading, index) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }}
              className="group flex items-start gap-2"
            >
              <span className="text-muted-foreground font-medium">
                {index + 1}.
              </span>
              <span className="text-foreground flex-1 underline decoration-dotted decoration-[1.5px] underline-offset-5 hover:opacity-80">
                {heading.text}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
