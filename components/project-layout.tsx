import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { markdownComponents } from "@/components/ui/markdown"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { TableOfContents } from "@/components/ui/table-of-contents"
import { Project } from "@/lib/notion"
import { translations } from "@/lib/translations"
import { ArrowLeft, Github, ScreenShare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

interface ProjectLayoutProps {
  project: Project
  lang: "en" | "es"
}

export function ProjectLayout({ project, lang }: ProjectLayoutProps) {
  const t = translations[lang]
  const backUrl = lang === "es" ? "/es" : "/"

  return (
    <>
      <ScrollProgress className="bg-primary absolute top-0" />

      <article className="mx-auto max-w-4xl space-y-8 px-6 py-12">
        <Button variant="ghost" asChild>
          <Link href={backUrl}>
            <ArrowLeft className="size-3" />
            {t.backToProjects}
          </Link>
        </Button>

        {project.img && (
          <div className="relative h-80 w-full overflow-hidden rounded-lg">
            <Image
              src={project.img}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <header className="space-y-4">
          <h1 className="text-4xl font-bold">{project.title}</h1>
          <p className="text-muted-foreground text-lg">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.githubLink && (
              <Button variant="outline" size="sm" asChild>
                <Link
                  href={project.githubLink}
                  target="_blank"
                  aria-label="Link to GitHub repository"
                >
                  <Github className="size-4" /> {t.repository}
                </Link>
              </Button>
            )}
            {project.previewLink && (
              <Button variant="outline" size="sm" asChild>
                <Link
                  href={project.previewLink}
                  target="_blank"
                  aria-label="Link to live preview"
                >
                  <ScreenShare className="size-4" /> {t.livePreview}
                </Link>
              </Button>
            )}
          </div>

          {project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <hr />

        <TableOfContents content={project.content || ""} lang={lang} />

        <hr />

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={markdownComponents}
          >
            {project.content || ""}
          </ReactMarkdown>
        </div>

        <hr />

        <footer className="border-t pt-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="lg" asChild>
              <Link href={backUrl}>
                <ArrowLeft className="size-3" />
                {t.backToProjects}
              </Link>
            </Button>

            <span className="text-muted-foreground font-mono text-xs">
              &copy; {new Date().getFullYear()} Felipe Giraldo
            </span>
          </div>
        </footer>
      </article>
    </>
  )
}
