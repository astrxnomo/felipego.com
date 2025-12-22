import { type BlogPost, type Language } from "@/lib/notion"
import { translations } from "@/lib/translations"
import { Calendar, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "../ui/badge"
import { Spotlight } from "../ui/spotlight"

interface BlogListProps {
  posts: BlogPost[]
  lang: Language
}

export default function BlogList({ posts, lang }: BlogListProps) {
  const t = translations[lang]

  if (posts.length === 0) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <h1 className="mb-8 text-4xl font-bold">{t.blog}</h1>
        <p className="text-muted-foreground">No posts available.</p>
      </div>
    )
  }

  return (
    <section className="mx-auto flex w-full flex-col gap-4 px-4 py-12 md:max-w-4xl">
      <h1 className="mb-4 text-4xl font-bold">{t.blog}</h1>

      <div className="grid grid-cols-1 gap-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`${lang === "es" ? "/es" : ""}/blog/${post.slug}`}
          >
            <div className="group relative overflow-hidden rounded-lg">
              <Spotlight
                className="bg-muted-foreground/5 blur-2xl"
                size={300}
                springOptions={{
                  bounce: 0.3,
                  duration: 0.1,
                }}
              />
              <div className="relative z-10 flex flex-col gap-3 p-4 sm:flex-row">
                <div className="flex min-w-0 grow flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <p className="text-muted-foreground line-clamp-2 text-sm">
                      {post.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="text-muted-foreground flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString(
                            lang === "es" ? "es-ES" : "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="size-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {post.coverImage && (
                  <div className="relative h-32 w-full shrink-0 overflow-hidden rounded sm:h-24 sm:w-40">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
