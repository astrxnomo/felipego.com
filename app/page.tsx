import { LanguageSwitcher } from "@/components/language-switcher"
import Certificates from "@/components/sections/certificates"
import EducationSection from "@/components/sections/education"
import Experience from "@/components/sections/experience"
import Header from "@/components/sections/header"
import Projects from "@/components/sections/projects"
import { Button } from "@/components/ui/button"
import PixelTrail from "@/components/ui/pixel-trail"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { getData } from "@/lib/notion/queries"
import { BookOpen } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

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
      <div className="fixed inset-0 z-0">
        <PixelTrail
          pixelSize={25}
          delay={0}
          fadeDuration={1000}
          pixelClassName="bg-card-foreground/50"
        />
      </div>
      <div className="bg-background/50 fixed right-2 bottom-2 z-20 rounded p-2 backdrop-blur-md lg:top-2 lg:bottom-auto">
        <div className="z-50 flex gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
      <div className="bg-background/50 fixed bottom-2 left-2 z-20 rounded p-2 backdrop-blur-md lg:top-2 lg:bottom-auto">
        <Button variant="outline" size="lg" asChild>
          <Link href="/blog" className="flex gap-2">
            <BookOpen className="size-4" />
            Blog
          </Link>
        </Button>
      </div>
      <section className="animate-in fade-in relative z-10 mx-auto flex w-full flex-col gap-4 p-4 duration-1000 ease-out md:max-w-3xl">
        <Header profile={data.profile} lang="en" />
        <Experience experience={data.experience} lang="en" />
        <Projects projects={data.projects} lang="en" />
        <EducationSection education={data.education} lang="en" />
        <Certificates certificates={data.certificates} lang="en" />
      </section>
    </>
  )
}
