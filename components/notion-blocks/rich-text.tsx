"use client"

import type { RichText as RichTextType } from "@/lib/notion/types"

interface RichTextProps {
  richText: RichTextType[]
  className?: string
}

export function RichText({ richText, className = "" }: RichTextProps) {
  if (!richText || richText.length === 0) return null

  return (
    <>
      {richText.map((text, index) => {
        const content = text.plain_text
        let element: React.ReactNode = <span key={index}>{content}</span>

        // Apply annotations
        if (text.annotations.bold) {
          element = <strong key={index}>{element}</strong>
        }
        if (text.annotations.italic) {
          element = <em key={index}>{element}</em>
        }
        if (text.annotations.strikethrough) {
          element = <s key={index}>{element}</s>
        }
        if (text.annotations.underline) {
          element = <u key={index}>{element}</u>
        }
        if (text.annotations.code) {
          element = (
            <code
              key={index}
              className="bg-muted text-foreground border-border rounded border px-1.5 py-0.5 font-mono text-sm"
            >
              {content}
            </code>
          )
        }

        // Apply link
        if (text.href) {
          element = (
            <a
              key={index}
              href={text.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-dotted decoration-[1.5px] underline-offset-5 hover:opacity-80"
            >
              {element}
            </a>
          )
        }

        return element
      })}
    </>
  )
}
