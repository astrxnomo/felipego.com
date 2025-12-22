import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { markdownComponents } from "@/components/ui/markdown"
import { getAllBlogSlugs, getBlogPost } from "@/lib/notion/queries"
import { translations } from "@/lib/translations"
import { ArrowLeft, Calendar, Clock, Share2, User } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs("en")
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug, "en")

  if (!post) {
    return {
      title: "Post not found",
    }
  }

  return {
    title: `${post.title} - Felipe Giraldo`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    alternates: {
      canonical: `/blog/${slug}`,
      languages: {
        en: `/blog/${slug}`,
        es: `/es/blog/${slug}`,
      },
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug, "en")
  const t = translations.en

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto max-w-4xl px-4 py-8">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/blog">
          <ArrowLeft className="size-4" />
          {t.backToBlog}
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

      <header className="mb-8 space-y-4">
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
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
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

      <div className="prose prose-neutral dark:prose-invert prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={markdownComponents}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      <footer className="mt-12 flex items-center justify-between border-t pt-6">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="size-4" />
            {t.backToBlog}
          </Link>
        </Button>

        <Button variant="ghost" size="sm">
          <Share2 className="size-4" />
          Share
        </Button>
      </footer>
    </article>
  )
}
