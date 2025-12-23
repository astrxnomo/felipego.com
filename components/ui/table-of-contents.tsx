"use client"

import { translations, type Language } from "@/lib/translations"
import { useMemo } from "react"

interface TableOfContentsProps {
  content: string
  lang?: Language
}

export function TableOfContents({
  content,
  lang = "en",
}: TableOfContentsProps) {
  const headings = useMemo(() => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const matches = [...content.matchAll(headingRegex)]

    return matches.map((match) => {
      const level = match[1].length
      const text = match[2]
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      return { id, text, level }
    })
  }, [content])

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
