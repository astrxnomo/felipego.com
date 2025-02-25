import { LibraryBig, MoveRight } from "lucide-react"
import Link from "next/link"

import Card from "@/components/card"
import { getProjects } from "@/lib/queries"

import { ProjectItem } from "./project-item"

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
          <ProjectItem key={project.id} {...project} />
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
