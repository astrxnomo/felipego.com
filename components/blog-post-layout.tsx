import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { markdownComponents } from "@/components/ui/markdown"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { TableOfContents } from "@/components/ui/table-of-contents"
import { BlogPost } from "@/lib/notion"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

interface BlogPostLayoutProps {
  post: BlogPost
  backToBlogText: string
  backToBlogUrl: string
  lang: "en" | "es"
}

export function BlogPostLayout({
  post,
  backToBlogText,
  backToBlogUrl,
  lang: locale,
}: BlogPostLayoutProps) {
  return (
    <>
      <ScrollProgress className="bg-primary absolute top-0" />

      <article className="mx-auto max-w-4xl space-y-8 px-6 py-12">
        <Button variant="ghost" asChild>
          <Link href={backToBlogUrl}>
            <ArrowLeft className="size-3" />
            {backToBlogText}
          </Link>
        </Button>

        {post.coverImage && (
          <div className="relative h-80 w-full overflow-hidden rounded-lg">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <header className="space-y-4">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <p className="text-muted-foreground text-lg">{post.description}</p>

          <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
            {post.author && <span>{post.author}</span>}
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString(
                locale === "es" ? "es-ES" : "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </time>
            <span>{post.readTime}</span>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <hr />

        <TableOfContents content={post.content} lang={locale} />

        <hr />

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={markdownComponents}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <hr />

        <footer className="flex items-center justify-between">
          <Button variant="ghost" size="lg" asChild>
            <Link href={backToBlogUrl}>
              <ArrowLeft className="size-3" />
              {backToBlogText}
            </Link>
          </Button>

          <span className="text-muted-foreground font-mono text-xs">
            &copy; {new Date().getFullYear()} Felipe Giraldo
          </span>
        </footer>
      </article>
    </>
  )
}
