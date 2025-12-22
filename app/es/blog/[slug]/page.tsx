import { BlogPostLayout } from "@/components/blog-post-layout"
import { getAllBlogSlugs, getBlogPost } from "@/lib/notion/queries"
import { translations } from "@/lib/translations"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs("es")
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug, "es")

  if (!post) {
    return {
      title: "Post no encontrado",
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
      canonical: `/es/blog/${slug}`,
      languages: {
        en: `/blog/${slug}`,
        es: `/es/blog/${slug}`,
      },
    },
  }
}

export default async function BlogPostPageEs({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug, "es")
  const t = translations.es

  if (!post) {
    notFound()
  }

  return (
    <BlogPostLayout
      post={post}
      backToBlogText={t.backToBlog}
      backToBlogUrl="/es/blog"
      lang="es"
    />
  )
}
