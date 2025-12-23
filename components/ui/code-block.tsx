"use client"

import { Check, Copy } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import {
  oneLight,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/cjs/styles/prism"

interface CodeBlockProps {
  language: string
  children: string
  showLineNumbers?: boolean
}

export function CodeBlock({
  language,
  children,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isDark = theme === "dark"
  const codeStyle = isDark ? vscDarkPlus : oneLight

  return (
    <div className="group border-border relative my-6 overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-2.5 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="bg-muted-foreground/80 size-3 rounded-full" />
            <div className="bg-muted-foreground/60 size-3 rounded-full" />
            <div className="bg-muted-foreground/40 size-3 rounded-full" />
          </div>
          <span className="text-muted-foreground ml-2 font-mono text-xs font-semibold tracking-wide uppercase">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="hover:bg-accent flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all hover:scale-105"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="size-3.5" />
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          style={codeStyle}
          language={language}
          PreTag="div"
          showLineNumbers={showLineNumbers}
          wrapLongLines
          customStyle={{
            margin: 0,
            padding: "1.25rem",
            fontSize: "0.875rem",
            lineHeight: "1.7",
            background: isDark ? "#1e1e1e" : "#e5e5e5",
            borderRadius: 0,
          }}
          codeTagProps={{
            style: {
              fontFamily:
                'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
            },
          }}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
