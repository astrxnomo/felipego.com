"use client"

import { Language } from "@/lib/notion"
import { translations } from "@/lib/translations"
import { FileText } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
  lang: Language
}

export function TableOfContents({ content, lang }: TableOfContentsProps) {
  const t = translations[lang]
  const [activeId, setActiveId] = useState<string>("")

  const headings = useMemo(() => {
    // Extract headings from markdown content
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-100px 0px -80% 0px",
      },
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <aside className="hidden xl:block">
      <nav className="sticky top-24 max-h-[calc(100vh-6rem)] w-64 overflow-y-auto">
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-2">
            <FileText className="size-4" />
            <h3 className="text-sm font-semibold">{t.onThisPage}</h3>
          </div>

          <div className="border-border border-l-2 pl-4">
            <ul className="space-y-2.5 text-sm">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  style={{
                    paddingLeft: `${(heading.level - 2) * 0.75}rem`,
                  }}
                  className="relative"
                >
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      const element = document.getElementById(heading.id)
                      if (element) {
                        const offset = 100
                        const elementPosition =
                          element.getBoundingClientRect().top
                        const offsetPosition =
                          elementPosition + window.pageYOffset - offset
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth",
                        })
                      }
                    }}
                    className={`group block py-0.5 transition-all ${
                      activeId === heading.id
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="line-clamp-2">{heading.text}</span>
                    {activeId === heading.id && (
                      <span className="bg-primary absolute top-1/2 -left-[1.1rem] h-5 w-0.5 -translate-y-1/2 rounded-full" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </aside>
  )
}
