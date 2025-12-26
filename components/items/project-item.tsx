"use client"
import { Project } from "@/lib/notion/types"
import { Language } from "@/lib/translations"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { Badge } from "../ui/badge"
import { CardContent } from "../ui/card"
import { Spotlight } from "../ui/spotlight"

export function ProjectItem({
  slug,
  title,
  description,
  technologies,
  img,
  lang,
}: Project & { lang: Language }) {
  const targetRef = useRef<HTMLDivElement>(null)
  const projectUrl =
    lang === "es" ? `/es/projects/${slug}` : `/projects/${slug}`

  return (
    <Link href={projectUrl}>
      <div
        ref={targetRef}
        className="group relative cursor-pointer overflow-hidden rounded-lg"
      >
        <Spotlight
          className="bg-muted-foreground/5 blur-2xl"
          size={400}
          springOptions={{
            bounce: 0.3,
            duration: 0.1,
          }}
        />
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
    </Link>
  )
}
