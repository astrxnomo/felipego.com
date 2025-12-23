import Certificates from "@/components/sections/certificates"
import EducationSection from "@/components/sections/education"
import Experience from "@/components/sections/experience"
import Profile from "@/components/sections/profile"
import Projects from "@/components/sections/projects"
import PixelTrail from "@/components/ui/pixel-trail"
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
      <div className="fixed inset-0 z-0">
        <PixelTrail
          pixelSize={25}
          delay={0}
          fadeDuration={1000}
          pixelClassName="bg-card-foreground/50"
        />
      </div>
      <section className="relative z-10 mx-auto flex w-full flex-col gap-4 p-4 md:max-w-3xl">
        <Profile profile={data.profile} lang={lang} />
        <Experience experience={data.experience} lang={lang} />
        <Projects projects={data.projects} lang={lang} />
        <EducationSection education={data.education} lang={lang} />
        <Certificates certificates={data.certificates} lang={lang} />
      </section>
    </>
  )
}
