import BlogList from "@/components/sections/blog-list"
import { getBlogPosts } from "@/lib/notion/queries"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Felipe Giraldo",
  description: "Lee mis últimos posts sobre desarrollo web y tecnología",
  alternates: {
    canonical: "/es/blog",
    languages: {
      en: "/blog",
      es: "/es/blog",
    },
  },
}

export default async function BlogPageEs() {
  const posts = await getBlogPosts("es")

  return <BlogList posts={posts} lang="es" />
}
