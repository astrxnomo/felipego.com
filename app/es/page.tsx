import Certificates from "@/components/sections/certificates"
import EducationSection from "@/components/sections/education"
import Experience from "@/components/sections/experience"
import Header from "@/components/sections/header"
import Projects from "@/components/sections/projects"
import { getData } from "@/lib/notion/queries"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Felipe Giraldo - Desarrollador Full Stack",
  description: "Portafolio de Felipe Giraldo - Desarrollador Full Stack",
  alternates: {
    canonical: "/es",
    languages: {
      en: "/",
      es: "/es",
    },
  },
}

export default async function SpanishPage() {
  const data = await getData("es")

  return (
    <>
      <Header profile={data.profile} lang="es" />
      <Experience experience={data.experience} lang="es" />
      <Projects projects={data.projects} lang="es" />
      <EducationSection education={data.education} lang="es" />
      <Certificates certificates={data.certificates} lang="es" />
    </>
  )
}
