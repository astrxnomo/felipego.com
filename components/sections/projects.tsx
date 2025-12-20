import { Language, Project } from "@/lib/notion"
import { translations } from "@/lib/translations"
import { Github, LibraryBig, ScreenShare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { markdownComponents } from "../ui/markdown"

interface ProjectsProps {
  projects: Project[]
  lang: Language
}

export default function Projects({ projects, lang }: ProjectsProps) {
  const t = translations[lang]
  if (projects.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="flex items-center gap-3 p-1 text-xl font-semibold">
          <LibraryBig className="size-5" />
          {t.projects}
        </h2>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-3">
          {projects.map((project) => (
            <ProjectItem key={project.id} {...project} lang={lang} />
          ))}
        </div>
      </CardContent>

      <CardFooter className="mt-2">
        <Button variant="outline" asChild className="w-full">
          <Link
            href="https://github.com/astrxnomo"
            target="_blank"
            aria-label="Explore more projects on GitHub"
          >
            {t.moreProjects}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function ProjectItem({
  title,
  description,
  content,
  technologies,
  img,
  githubLink,
  previewLink,
  lang,
}: Project & { lang: Language }) {
  const t = translations[lang]
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group hover:bg-primary/5 cursor-pointer rounded">
          <CardContent className="flex flex-col gap-3 p-4 py-2 sm:flex-row">
            <div className="flex min-w-0 grow flex-col gap-2">
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-semibold">{title}</h3>
                <p className="text-muted-foreground text-xs">{description}</p>
              </div>

              <div className="flex flex-wrap gap-1">
                {technologies.map((tech) => (
                  <Badge variant="outline" key={tech}>
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {img && (
              <div className="relative h-32 w-full shrink-0 overflow-hidden rounded sm:h-24 sm:w-40">
                <Image
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  src={img}
                  alt={`${title} preview`}
                  fill
                  sizes="(max-width: 640px) 100vw, 160px"
                />
              </div>
            )}
          </CardContent>
        </div>
      </DialogTrigger>

      <DialogContent className="flex max-h-[95vh] flex-col gap-0 p-0 sm:max-w-4xl [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="text-foreground flex shrink-0 items-center gap-2 border-b px-6 py-4 text-xl">
            <LibraryBig className="size-5" />
            <span className="text-lg font-semibold">{title}</span>
          </DialogTitle>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <DialogDescription asChild>
              <div className="flex flex-col px-6 py-4">
                {content ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={markdownComponents}
                  >
                    {content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-muted-foreground text-sm">{description}</p>
                )}
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="shrink-0 border-t px-6 py-4 sm:items-center">
          <div className="flex w-full gap-2">
            {githubLink && (
              <Button variant="outline" asChild className="grow">
                <Link
                  href={githubLink}
                  target="_blank"
                  aria-label="Link to GitHub repository"
                >
                  <Github className="size-4" /> {t.repository}
                </Link>
              </Button>
            )}
            {previewLink && (
              <Button variant="outline" asChild className="grow">
                <Link
                  href={previewLink}
                  target="_blank"
                  aria-label="Link to live preview"
                >
                  <ScreenShare className="size-4" /> {t.livePreview}
                </Link>
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
