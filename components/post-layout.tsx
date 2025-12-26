import { NotionContent } from "@/components/notion-blocks/notion-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { TableOfContents } from "@/components/ui/table-of-contents"
import type { BlogPost } from "@/lib/notion/types"
import { translations } from "@/lib/translations"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface PostLayoutProps {
  post: BlogPost
  lang: "en" | "es"
}

export function PostLayout({ post, lang }: PostLayoutProps) {
  const t = translations[lang]

  return (
    <>
      <ScrollProgress className="bg-primary absolute top-0" />

      <article className="animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards mx-auto max-w-4xl px-6 py-12 delay-200 duration-500">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="size-3" />
            {t.back}
          </Link>
        </Button>

        {post.coverImage && (
          <div className="relative mb-8 h-80 w-full overflow-hidden rounded-lg">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <header className="mb-8 space-y-4">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <p className="text-muted-foreground text-lg">{post.description}</p>

          <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
            <span>{post.author}</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString(
                lang === "es" ? "es-ES" : "en-US",
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

        <hr className="my-8" />

        <TableOfContents blocks={post.blocks || []} lang={lang} />
        <hr className="my-8" />

        <NotionContent blocks={post.blocks || []} />

        <hr className="my-8" />

        <footer className="flex items-center justify-between">
          <Button variant="ghost" size="lg" asChild>
            <Link href="/blog">
              <ArrowLeft className="size-3" />
              {t.back}
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
