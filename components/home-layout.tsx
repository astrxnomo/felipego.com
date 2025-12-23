import Certificates from "@/components/sections/certificates"
import EducationSection from "@/components/sections/education"
import Experience from "@/components/sections/experience"
import Profile from "@/components/sections/profile"
import Projects from "@/components/sections/projects"
import type { Language } from "@/lib/notion"
import type {
  Certificate,
  Education,
  Experience as ExperienceType,
  Profile as ProfileType,
  Project,
} from "@/lib/notion/types"

interface HomeLayoutProps {
  data: {
    profile: ProfileType | null
    experience: ExperienceType[]
    projects: Project[]
    education: Education[]
    certificates: Certificate[]
  }
  lang: Language
}

export function HomeLayout({ data, lang }: HomeLayoutProps) {
  return (
    <>
      <section className="animate-in fade-in fill-mode-backwards mx-auto flex w-full flex-col gap-4 p-4 duration-700 md:max-w-3xl">
        <Profile profile={data.profile} lang={lang} />
        <Experience experience={data.experience} lang={lang} />
        <Projects projects={data.projects} lang={lang} />
        <EducationSection education={data.education} lang={lang} />
        <Certificates certificates={data.certificates} lang={lang} />
      </section>
    </>
  )
}
