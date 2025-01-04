import { getProjects } from "@/lib/queries";
import { type Project } from "@/lib/types";
import { Github, LibraryBig, MoveRight, ScreenShare } from "lucide-react";
import Image from "next/image";
import Card from "@/components/card";

export default async function Projects() {
  const projectsData = await getProjects();

  return (
    <Card>
      <h2 className="text-2xl font-semibold flex gap-3 items-center text-neutral-800 dark:text-neutral-200">
        <LibraryBig />
        Projects
      </h2>

      <div className="grid gap-3 md:grid-cols-2">
        {projectsData.map((project) => (
          <ProjectItem key={project.title} {...project} />
        ))}
      </div>

      <a
        href="https://github.com/astrxnomo"
        target="_blank"
        className="inline-flex items-center text-sm justify-center rounded-xl bg-neutral-200 dark:bg-neutral-800 py-2 px-4 opacity-80 transition-opacity duration-150 hover:opacity-100 w-full md:w-auto group gap-2 font-medium"
        aria-label="Explore more projects"
      >
        More projects
        <MoveRight className="size-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-[1.5px] duration-200" />
      </a>
    </Card>
  );
}

function ProjectItem({
  title,
  description,
  technologies,
  img,
  githubLink,
  previewLink,
}: Project) {
  return (
    <div className="flex flex-col gap-3 rounded-xl p-4 hover:bg-neutral-300/20 dark:hover:bg-neutral-800/20 duration-100">
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-300">
          {title}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
          {description}
        </p>
        <div className="flex gap-1 mb-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="flex gap-1 items-center text-xs px-2.5 py-0.5 rounded-lg bg-neutral-200 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="relative w-full h-40">
          <Image
            className="rounded-xl object-cover object-top"
            src={img}
            alt="Project image example"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-1">
        {githubLink && (
          <a
            href={githubLink}
            className="inline-flex items-center justify-center rounded-xl bg-neutral-300/60 dark:bg-neutral-800 p-2 opacity-80 transition-opacity duration-150 hover:opacity-100 grow"
            target="_blank"
            aria-label="Link to Github repository"
          >
            <Github className="size-4" />
          </a>
        )}
        {previewLink && (
          <a
            href={previewLink}
            className="inline-flex items-center justify-center rounded-xl bg-neutral-300/60 dark:bg-neutral-800 p-2 opacity-80 transition-opacity duration-150 hover:opacity-100 grow"
            target="_blank"
            aria-label="Link to live preview"
          >
            <ScreenShare className="size-4" />
          </a>
        )}
      </div>
    </div>
  );
}
