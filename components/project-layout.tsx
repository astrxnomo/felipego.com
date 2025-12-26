import { NotionContent } from "@/components/notion-blocks/notion-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { TableOfContents } from "@/components/ui/table-of-contents"
import type { Project } from "@/lib/notion/types"
import { translations } from "@/lib/translations"
import { ArrowLeft, Github, ScreenShare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectLayoutProps {
  project: Project
  lang: "en" | "es"
}

export function ProjectLayout({ project, lang }: ProjectLayoutProps) {
  const t = translations[lang]

  return (
    <>
      <ScrollProgress className="bg-primary absolute top-0" />

      <article className="animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards mx-auto max-w-4xl px-6 py-12 delay-200 duration-500">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="size-3" />
            {t.back}
          </Link>
        </Button>

        {project.img && (
          <div className="relative mb-8 h-80 w-full overflow-hidden rounded-lg">
            <Image
              src={project.img}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <header className="mb-8 space-y-4">
          <h1 className="text-4xl font-bold">{project.title}</h1>
          <p className="text-muted-foreground text-lg">{project.description}</p>

          {(project.githubLink || project.previewLink) && (
            <div className="flex flex-wrap gap-2">
              {project.githubLink && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={project.githubLink} target="_blank">
                    <Github className="size-4" />
                    {lang === "es" ? "Código" : "Code"}
                  </Link>
                </Button>
              )}
              {project.previewLink && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={project.previewLink} target="_blank">
                    <ScreenShare className="size-4" />
                    {lang === "es" ? "Vista previa" : "Preview"}
                  </Link>
                </Button>
              )}
            </div>
          )}

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

        <hr className="my-8" />

        <TableOfContents blocks={project.blocks || []} lang={lang} />
        <hr className="my-8" />

        <NotionContent blocks={project.blocks || []} />

        <hr className="my-8" />

        <footer className="flex items-center justify-between">
          <Button variant="ghost" size="lg" asChild>
            <Link href="/">
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
