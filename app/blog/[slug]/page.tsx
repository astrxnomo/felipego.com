import { PostLayout } from "@/components/post-layout"
import { getAllBlogSlugs, getBlogPost } from "@/lib/notion/queries"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

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

  if (!post) {
    notFound()
  }

  return <PostLayout post={post} lang="en" />
}
