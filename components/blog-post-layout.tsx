import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { markdownComponents } from "@/components/ui/markdown"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { TableOfContents } from "@/components/ui/table-of-contents"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

interface BlogPost {
  title: string
  description: string
  content: string
  coverImage?: string
  author: string
  publishedAt: string
  readTime: string
  tags: string[]
}

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
      <div className="pointer-events-none fixed top-0 left-0 z-50 w-full">
        <div className="bg-border absolute top-0 left-0 h-1 w-full" />
        <ScrollProgress className="bg-primary absolute top-0" />
      </div>

      <div className="relative w-full p-6">
        <aside className="animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards pointer-events-none fixed top-24 left-8 hidden w-64 delay-500 duration-500 xl:block">
          <div className="pointer-events-auto sticky top-24">
            <TableOfContents content={post.content} />
          </div>
        </aside>

        <article className="animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards mx-auto w-full max-w-4xl space-y-4 delay-200 duration-300">
          <Button variant="ghost" size="lg" asChild>
            <Link href={backToBlogUrl}>
              <ArrowLeft className="size-4" />
              {backToBlogText}
            </Link>
          </Button>

          {post.coverImage && (
            <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-lg">
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
            <h1 className="text-4xl leading-tight font-bold md:text-5xl">
              {post.title}
            </h1>

            <p className="text-muted-foreground text-lg">{post.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="size-4" />
                  <span className="font-medium">{post.author}</span>
                </div>
              )}
              <div className="text-muted-foreground flex items-center gap-2">
                <Calendar className="size-4" />
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
              </div>
              <div className="text-muted-foreground flex items-center gap-2">
                <Clock className="size-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          <hr className="my-8" />

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={markdownComponents}
          >
            {post.content}
          </ReactMarkdown>

          <hr className="my-8" />

          <footer className="flex items-center justify-between">
            <Button variant="ghost" size="lg" asChild>
              <Link href={backToBlogUrl}>
                <ArrowLeft className="size-4" />
                {backToBlogText}
              </Link>
            </Button>

            <span className="text-muted-foreground font-mono text-xs">
              &copy; {new Date().getFullYear()} Felipe Giraldo
            </span>
          </footer>
        </article>
      </div>
    </>
  )
}
