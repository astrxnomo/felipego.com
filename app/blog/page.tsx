import BlogList from "@/components/sections/blog-list"
import { getBlogPosts } from "@/lib/notion/queries"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Felipe Giraldo",
  description: "Read my latest blog posts about web development and technology",
  alternates: {
    canonical: "/blog",
    languages: {
      en: "/blog",
      es: "/es/blog",
    },
  },
}

export default async function BlogPage() {
  const posts = await getBlogPosts("en")

  return <BlogList posts={posts} lang="en" />
}
