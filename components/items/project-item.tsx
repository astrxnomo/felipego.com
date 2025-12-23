"use client"
import { Language, Project } from "@/lib/notion"
import { translations } from "@/lib/translations"
import {
  Github,
  LibraryBig,
  MousePointerClick,
  ScreenShare,
} from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { CardContent } from "../ui/card"
import { Cursor } from "../ui/cursor"

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
import { Spotlight } from "../ui/spotlight"

export function ProjectItem({
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
  const targetRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  const handlePositionChange = (x: number, y: number) => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect()
      const isInside =
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
      setIsHovering(isInside)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          ref={targetRef}
          className="group relative cursor-pointer overflow-hidden rounded-lg"
        >
          <Cursor
            attachToParent
            variants={{
              initial: { scale: 0.3, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0.3, opacity: 0 },
            }}
            transition={{
              ease: "easeInOut",
              duration: 0.15,
            }}
            onPositionChange={handlePositionChange}
          >
            <motion.div
              animate={{
                scale: isHovering ? [1, 1.1, 1] : 1,
              }}
              transition={{
                repeat: isHovering ? Infinity : 0,
                duration: 1.5,
              }}
              className="bg-muted-foreground/20 flex items-center gap-1 rounded px-2 py-1 text-xs font-medium backdrop-blur-xs"
            >
              <MousePointerClick className="size-4" />
              {t.readMore}
            </motion.div>
          </Cursor>
          <Spotlight
            className="bg-muted-foreground/5 blur-2xl"
            size={400}
            springOptions={{
              bounce: 0.3,
              duration: 0.1,
            }}
          />
          <CardContent className="relative z-10 flex flex-col gap-3 p-4 py-2 sm:flex-row">
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
            <DialogDescription asChild className="text-base">
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
                  className="flex gap-1"
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
