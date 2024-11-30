import { getProjects } from '@/lib/queries'
import { Github, LibraryBig, MoveRight, ScreenShare } from 'lucide-react'
import Image from 'next/image'

export default async function Projects () {
  const projectsData = await getProjects()

  return (
    <section className="flex flex-col p-8 gap-6 rounded-2xl overflow-hidden bg-neutral-200/30 border dark:bg-neutral-900/50 animate-pulse-fade-in animate-duration-500">
      <h2 className="text-2xl font-semibold flex gap-3 items-center text-neutral-800 dark:text-neutral-200">
        <LibraryBig />
        Projects
      </h2>

      <div className="grid gap-3 md:grid-cols-2">
        {projectsData.map(project => (
          <ProjectItem key={project.title} {...project} />
        ))}
      </div>

      <a href="https://github.com/astrxnomo" target="_blank" className="inline-flex items-center text-sm justify-center rounded-xl bg-neutral-200 dark:bg-neutral-800 py-2 px-4 opacity-80 transition-opacity duration-150 hover:opacity-100 w-full md:w-auto group gap-2 font-medium ">
        More projects
        <MoveRight className="size-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-[1.5px] duration-200"/>
      </a>
    </section>
  )
}

interface ProjectItemProps {
  title: string
  description: string
  technologies: string[]
  img: string
  githubLink?: string
  previewLink?: string
}

function ProjectItem ({ title, description, technologies, img, githubLink, previewLink }: ProjectItemProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl p-4 hover:bg-neutral-300/20 dark:hover:bg-neutral-800/20 duration-100">
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-300">{title}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">{description}</p>
        <div className="flex gap-1 mb-2">
          {technologies.map(tech => (
            <span key={tech} className="flex gap-1 items-center text-xs px-2.5 py-0.5 rounded-lg bg-neutral-200 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400">
              {tech}
            </span>
          ))}
        </div>

        <Image className="rounded-xl h-40 object-cover object-top" src={img} alt="Project image example" width={360} height={160}/>
      </div>
      <div className="flex gap-2 mt-1">
        {githubLink &&
          <a href={githubLink} className="inline-flex items-center justify-center rounded-xl bg-neutral-300/60 dark:bg-neutral-800 p-2 opacity-80 transition-opacity duration-150 hover:opacity-100 grow" target="_blank">
            <Github className="size-4"/>
          </a>
        }
        {previewLink &&
          <a href={previewLink} className="inline-flex items-center justify-center rounded-xl bg-neutral-300/60 dark:bg-neutral-800 p-2 opacity-80 transition-opacity duration-150 hover:opacity-100 grow" {...(previewLink !== '/#top' && { target: '_blank' })}>
            <ScreenShare className="size-4"/>
          </a>
        }
      </div>
    </div>
  )
}
