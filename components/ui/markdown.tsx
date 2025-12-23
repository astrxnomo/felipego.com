import type { Components } from "react-markdown"
import { CodeBlock } from "./code-block"
import { HeadingLink } from "./heading-link"

export const markdownComponents: Components = {
  h1: ({ children, ...props }) => (
    <HeadingLink level={1} {...props}>
      {children}
    </HeadingLink>
  ),
  h2: ({ children, ...props }) => (
    <HeadingLink level={2} {...props}>
      {children}
    </HeadingLink>
  ),
  h3: ({ children, ...props }) => (
    <HeadingLink level={3} {...props}>
      {children}
    </HeadingLink>
  ),
  h4: ({ children, ...props }) => (
    <HeadingLink level={4} {...props}>
      {children}
    </HeadingLink>
  ),
  h5: ({ children, ...props }) => (
    <HeadingLink level={5} {...props}>
      {children}
    </HeadingLink>
  ),
  h6: ({ children, ...props }) => (
    <HeadingLink level={6} {...props}>
      {children}
    </HeadingLink>
  ),
  p: ({ ...props }) => <p className="text-muted-foreground" {...props} />,
  a: ({ ...props }) => (
    <a
      className="text-foreground underline decoration-dotted decoration-[1.5px] underline-offset-5 hover:opacity-80"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: ({ ...props }) => (
    <ul className="my-4 ml-6 list-disc space-y-2 [&>li]:mt-2" {...props} />
  ),
  ol: ({ ...props }) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 [&>li]:mt-2" {...props} />
  ),
  li: ({ ...props }) => <li className="text-muted-foreground" {...props} />,
  blockquote: ({ ...props }) => (
    <blockquote
      className="border-primary/50 bg-muted/50 *:text-muted-foreground my-6 border-l-4 py-4 pr-4 pl-6 italic"
      {...props}
    />
  ),
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "")
    const isInline = !match

    return isInline ? (
      <code
        className="bg-muted text-foreground border-border rounded border px-1.5 py-0.5 font-mono text-sm"
        {...props}
      >
        {children}
      </code>
    ) : (
      <CodeBlock language={match?.[1] || "text"}>
        {String(children).replace(/\n$/, "")}
      </CodeBlock>
    )
  },
  pre: ({ children }) => <>{children}</>,
  img: ({ ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="border-border my-8 h-auto w-full rounded-lg border shadow-sm"
      alt=""
      {...props}
    />
  ),
  hr: ({ ...props }) => (
    <hr className="border-border my-8 border-t" {...props} />
  ),
  table: ({ ...props }) => (
    <div className="border-border my-8 overflow-hidden rounded-lg border shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full" {...props} />
      </div>
    </div>
  ),
  thead: ({ ...props }) => <thead className="bg-muted/80" {...props} />,
  tbody: ({ ...props }) => (
    <tbody className="divide-border divide-y" {...props} />
  ),
  tr: ({ ...props }) => (
    <tr className="hover:bg-muted/50 transition-colors" {...props} />
  ),
  th: ({ ...props }) => (
    <th
      className="border-border border-r px-4 py-3 text-left text-sm font-semibold last:border-r-0"
      {...props}
    />
  ),
  td: ({ ...props }) => (
    <td
      className="text-foreground border-border border-r px-4 py-3 text-sm last:border-r-0"
      {...props}
    />
  ),
  details: ({ ...props }) => (
    <details
      className="bg-muted/50 border-border group my-6 rounded-lg border p-4 transition-all hover:shadow-sm"
      {...props}
    />
  ),
  summary: ({ ...props }) => (
    <summary
      className="text-foreground hover:text-primary marker:text-primary cursor-pointer font-semibold transition-colors"
      {...props}
    />
  ),
}
