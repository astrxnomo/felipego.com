import { ProjectLayout } from "@/components/project-layout"
import { getAllProjectSlugs, getProject } from "@/lib/notion/queries"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs("en")
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug, "en")

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.img ? [project.img] : [],
      type: "article",
    },
    alternates: {
      canonical: `/projects/${slug}`,
      languages: {
        en: `/projects/${slug}`,
        es: `/es/projects/${slug}`,
      },
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug, "en")

  if (!project) {
    notFound()
  }

  return <ProjectLayout project={project} lang="en" />
}
