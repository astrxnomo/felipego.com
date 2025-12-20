import Certificates from "@/components/sections/certificates"
import EducationSection from "@/components/sections/education"
import Experience from "@/components/sections/experience"
import Header from "@/components/sections/header"
import Projects from "@/components/sections/projects"
import { getData } from "@/lib/notion/queries"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Felipe Giraldo - Full Stack Developer",
  description: "Felipe Giraldo's Portfolio - Full Stack Developer",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      es: "/es",
    },
  },
}

export default async function Page() {
  const data = await getData("en")

  return (
    <>
      <Header profile={data.profile} lang="en" />
      <Experience experience={data.experience} lang="en" />
      <Projects projects={data.projects} lang="en" />
      <EducationSection education={data.education} lang="en" />
      <Certificates certificates={data.certificates} lang="en" />
    </>
  )
}
