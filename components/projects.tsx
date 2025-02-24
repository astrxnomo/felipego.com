import { Github, Info, LibraryBig, MoveRight, ScreenShare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import Card from "@/components/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getPageContent, getProjects } from "@/lib/queries"
import { type Project } from "@/lib/types"

export default async function Projects() {
  const projectsData = await getProjects()

  return (
    <Card>
      <h2 className="flex items-center gap-3 text-2xl font-semibold">
        <LibraryBig />
        Projects
      </h2>

      <div className="grid gap-3 md:grid-cols-2">
        {projectsData.map((project) => (
          <ProjectItem key={project.title} {...project} />
        ))}
      </div>

      <Link
        href="https://github.com/astrxnomo"
        target="_blank"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium opacity-80 transition-opacity duration-150 hover:opacity-100 md:w-auto"
        aria-label="Explore more projects"
      >
        More projects
        <MoveRight className="size-4 opacity-70 duration-200 group-hover:translate-x-[1.5px] group-hover:opacity-100" />
      </Link>
    </Card>
  )
}

async function ProjectItem({
  id,
  title,
  description,
  technologies,
  img,
  githubLink,
  previewLink,
}: Project) {
  const details = await getPageContent(id)

  return (
    <div className="flex flex-col gap-3 rounded-xl p-4 duration-100 hover:bg-primary/30">
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mb-2 text-sm text-muted-foreground">{description}</p>
        <div className="mb-2 flex gap-1">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-1 rounded-xl bg-primary px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="relative h-40 w-full">
          <Image
            className="rounded-xl object-cover object-top"
            src={img}
            alt="Project image example"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="mt-1 flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Info />
              Detalles
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-4xl [&>button:last-child]:top-3.5">
            <DialogHeader className="contents space-y-0 text-left">
              <DialogTitle className="border-b px-6 py-4 text-base">
                {title}
              </DialogTitle>
              <div className="overflow-y-auto">
                <DialogDescription asChild>
                  <div className="px-6 py-4">
                    <div
                      className="notion-render"
                      dangerouslySetInnerHTML={{ __html: details }}
                    ></div>
                  </div>
                </DialogDescription>
              </div>
            </DialogHeader>
            <DialogFooter className="border-t px-6 py-4 sm:items-center">
              <span className="grow text-xs text-muted-foreground max-sm:text-center">
                By felipego.com
              </span>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {githubLink && (
          <Link
            href={githubLink}
            className="inline-flex grow items-center justify-center rounded-xl bg-primary p-2 opacity-80 transition-opacity duration-150 hover:opacity-100"
            target="_blank"
            aria-label="Link to Github repository"
          >
            <Github className="size-4" />
          </Link>
        )}
        {previewLink && (
          <Link
            href={previewLink}
            className="inline-flex grow items-center justify-center rounded-xl bg-primary p-2 opacity-80 transition-opacity duration-150 hover:opacity-100"
            target="_blank"
            aria-label="Link to live preview"
          >
            <ScreenShare className="size-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
