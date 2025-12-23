import { Language, Project } from "@/lib/notion"
import { translations } from "@/lib/translations"
import { ArrowRight, LibraryBig } from "lucide-react"
import Link from "next/link"
import { ProjectItem } from "../items/project-item"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"

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
    <Card className="animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards delay-200 duration-500">
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
        <Button asChild variant="outline" className="w-full">
          <Link
            href="https://github.com/astrxnomo"
            target="_blank"
            aria-label="Explore more projects on GitHub"
            className="flex gap-1"
          >
            {t.moreProjects}
            <ArrowRight className="size-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
