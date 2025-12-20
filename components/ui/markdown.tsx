import type { Components } from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"

export const markdownComponents: Components = {
  h1: ({ ...props }) => (
    <h1 className="text-foreground mt-2 mb-3 text-3xl font-bold" {...props} />
  ),
  h2: ({ ...props }) => (
    <h2
      className="text-foreground mt-2 mb-2 text-2xl font-semibold"
      {...props}
    />
  ),
  h3: ({ ...props }) => (
    <h3
      className="text-foreground mt-1.5 mb-1.5 text-xl font-semibold"
      {...props}
    />
  ),
  h4: ({ ...props }) => (
    <h4
      className="text-foreground mt-1.5 mb-1.5 text-lg font-semibold"
      {...props}
    />
  ),
  h5: ({ ...props }) => (
    <h5
      className="text-foreground mt-1 mb-1 text-base font-semibold"
      {...props}
    />
  ),
  h6: ({ ...props }) => (
    <h6
      className="text-foreground mt-1 mb-1 text-sm font-semibold"
      {...props}
    />
  ),
  p: ({ ...props }) => (
    <p
      className="text-muted-foreground mb-3 text-sm leading-relaxed"
      {...props}
    />
  ),
  a: ({ ...props }) => (
    <a
      className="text-primary font-medium hover:underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: ({ ...props }) => (
    <ul className="mb-3 ml-6 list-disc space-y-1" {...props} />
  ),
  ol: ({ ...props }) => (
    <ol className="mb-3 ml-6 list-decimal space-y-1" {...props} />
  ),
  li: ({ ...props }) => (
    <li className="text-muted-foreground text-sm" {...props} />
  ),
  blockquote: ({ ...props }) => (
    <blockquote
      className="border-muted-foreground bg-muted/30 my-3 border-l-4 py-2 pl-4 italic"
      {...props}
    />
  ),
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "")
    const isInline = !match

    return isInline ? (
      <code
        className="bg-muted text-foreground rounded px-1.5 font-mono text-xs"
        {...props}
      >
        {children}
      </code>
    ) : (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        wrapLongLines
        className="rounded-lg bg-[#1e1e1e]! [&>code]:bg-transparent [&>code]:p-0"
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    )
  },
  pre: ({ ...props }) => <pre className="my-1 bg-transparent p-0" {...props} />,
  img: ({ ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="my-3 h-auto w-full rounded-lg" alt="" {...props} />
  ),
  hr: ({ ...props }) => (
    <hr className="border-muted-foreground/30 my-4 border-t-2" {...props} />
  ),
  table: ({ ...props }) => (
    <div className="my-3 overflow-x-auto">
      <table className="border-muted min-w-full rounded-md border" {...props} />
    </div>
  ),
  thead: ({ ...props }) => (
    <thead className="bg-muted/50 first:rounded-t-md" {...props} />
  ),
  tbody: ({ ...props }) => (
    <tbody className="[&>tr:nth-child(even)]:bg-muted/30" {...props} />
  ),
  tr: ({ ...props }) => (
    <tr className="border-border group border-b last:border-b-0" {...props} />
  ),
  th: ({ ...props }) => (
    <th
      className="border-muted border-r px-4 py-2 text-left font-semibold first:rounded-tl-md last:rounded-tr-md last:border-r-0"
      {...props}
    />
  ),
  td: ({ ...props }) => (
    <td
      className="border-muted text-muted-foreground border-r px-4 py-2 text-sm group-last:first:rounded-bl-md last:border-r-0 group-last:last:rounded-br-md"
      {...props}
    />
  ),
  details: ({ ...props }) => (
    <details
      className="bg-muted/30 border-muted my-3 rounded-lg border p-3"
      {...props}
    />
  ),
  summary: ({ ...props }) => (
    <summary
      className="text-foreground hover:text-primary cursor-pointer font-semibold"
      {...props}
    />
  ),
}
