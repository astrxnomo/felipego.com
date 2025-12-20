import { LanguageSwitcher } from "@/components/language-switcher"
import Certificates from "@/components/sections/certificates"
import EducationSection from "@/components/sections/education"
import Experience from "@/components/sections/experience"
import Header from "@/components/sections/header"
import Projects from "@/components/sections/projects"
import { ThemeToggle } from "@/components/ui/theme-toggle"
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
      <div className="fixed right-0 z-20 flex gap-2 p-5">
        <LanguageSwitcher currentLang="en" />
        <ThemeToggle />
      </div>
      <main className="animate-in fade-in relative z-10 mx-auto flex w-full flex-col gap-6 p-5 duration-1000 ease-out md:max-w-3xl">
        <Header profile={data.profile} lang="en" />
        <Experience experience={data.experience} lang="en" />
        <Projects projects={data.projects} lang="en" />
        <EducationSection education={data.education} lang="en" />
        <Certificates certificates={data.certificates} lang="en" />
      </main>
    </>
  )
}
