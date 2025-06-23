import { CirclePlus, Github, LibraryBig, ScreenShare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getPageContent } from "@/lib/queries"
import { type Project } from "@/lib/types"

import { Button } from "../ui/button"

export async function ProjectItem({
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
    <div className="hover:bg-primary/30 flex cursor-pointer flex-col gap-3 rounded-xl p-4 duration-100">
      <Dialog>
        <DialogTrigger className="group" asChild>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{title}</h3>

              <span className="bg-primary text-muted-foreground inline-flex items-center gap-1 rounded-xl px-2.5 py-0.5 text-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <CirclePlus className="size-3" />
                Read more
              </span>
            </div>

            <p className="text-muted-foreground mb-2 text-sm">{description}</p>
            <div className="mb-2 flex gap-1">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-primary text-muted-foreground flex items-center gap-1 rounded-xl px-2.5 py-0.5 text-xs"
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
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-4xl [&>button:last-child]:top-3.5">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="flex items-center gap-2 border-b px-6 py-4 text-xl">
              <LibraryBig />
              <span className="text-lg font-semibold">{title}</span>
            </DialogTitle>
            <div className="overflow-y-auto">
              <DialogDescription asChild>
                <div className="px-6 py-4">
                  <div
                    className="notion-render text-primary-foreground"
                    dangerouslySetInnerHTML={{ __html: details }}
                  ></div>
                </div>
              </DialogDescription>
            </div>
          </DialogHeader>
          <DialogFooter className="border-t px-6 py-4 sm:items-center">
            <div className="mt-1 flex w-full gap-2">
              {githubLink && (
                <Button asChild>
                  <Link
                    href={githubLink}
                    className="bg-primary inline-flex grow items-center justify-center rounded-xl p-2 opacity-80 transition-opacity duration-150 hover:opacity-100"
                    target="_blank"
                    aria-label="Link to Github repository"
                  >
                    <Github className="size-4" /> Repository
                  </Link>
                </Button>
              )}
              {previewLink && (
                <Button asChild>
                  <Link
                    href={previewLink}
                    className="bg-primary inline-flex grow items-center justify-center rounded-xl p-2 opacity-80 transition-opacity duration-150 hover:opacity-100"
                    target="_blank"
                    aria-label="Link to live preview"
                  >
                    <ScreenShare className="size-4" /> Live Preview
                  </Link>
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mt-1 flex gap-2">
        {githubLink && (
          <Link
            href={githubLink}
            className="bg-primary inline-flex grow items-center justify-center rounded-xl p-2 opacity-80 transition-opacity duration-150 hover:opacity-100"
            target="_blank"
            aria-label="Link to Github repository"
          >
            <Github className="size-4" />
          </Link>
        )}
        {previewLink && (
          <Link
            href={previewLink}
            className="bg-primary inline-flex grow items-center justify-center rounded-xl p-2 opacity-80 transition-opacity duration-150 hover:opacity-100"
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
