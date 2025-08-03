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
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 dark:from-neutral-900 dark:to-neutral-800">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 transition-all duration-300 group-hover:from-blue-500/5 group-hover:to-purple-500/5" />
      <Dialog>
        <DialogTrigger className="group/trigger relative z-10" asChild>
          <div className="flex cursor-pointer flex-col">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {title}
              </h3>

              <span className="group/trigger-hover:opacity-100 group/trigger-hover:translate-x-0 inline-flex translate-x-2 items-center gap-1 rounded-xl bg-blue-500 px-2.5 py-0.5 text-xs text-white opacity-0 transition-all duration-200">
                <CirclePlus className="size-3" />
                Read more
              </span>
            </div>

            <p className="text-muted-foreground mb-2 text-sm transition-colors duration-200">
              {description}
            </p>
            <div className="mb-2 flex gap-1">
              {technologies.map((tech, index) => (
                <span
                  key={tech}
                  className="flex items-center gap-1 rounded-xl bg-blue-100 px-2.5 py-0.5 text-xs text-blue-700 transition-all duration-200 hover:scale-105 dark:bg-blue-900/30 dark:text-blue-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="relative h-40 w-full overflow-hidden rounded-xl">
              <Image
                className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                src={img}
                alt="Project image example"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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

      <div className="mt-3 flex gap-2">
        {githubLink && (
          <Link
            href={githubLink}
            className="inline-flex grow items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gray-700 to-gray-800 p-2 text-white transition-all duration-200 hover:scale-105 hover:from-gray-600 hover:to-gray-700 hover:shadow-md"
            target="_blank"
            aria-label="Link to Github repository"
          >
            <Github className="size-4" />
            <span className="text-sm font-medium">Code</span>
          </Link>
        )}
        {previewLink && (
          <Link
            href={previewLink}
            className="inline-flex grow items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-2 text-white transition-all duration-200 hover:scale-105 hover:from-blue-400 hover:to-blue-500 hover:shadow-md"
            target="_blank"
            aria-label="Link to live preview"
          >
            <ScreenShare className="size-4" />
            <span className="text-sm font-medium">Demo</span>
          </Link>
        )}
      </div>
    </div>
  )
}
