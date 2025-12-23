import { Experience } from "@/lib/notion"
import { translations, type Language } from "@/lib/translations"
import { BriefcaseBusiness } from "lucide-react"
import { ExperienceItem } from "../items/experience-item"
import { Card, CardContent, CardHeader } from "../ui/card"

interface ExperienceSectionProps {
  experience: Experience[]
  lang: Language
}

export default function ExperienceSection({
  experience,
  lang,
}: ExperienceSectionProps) {
  const t = translations[lang]

  if (experience.length === 0) {
    return null
  }

  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards delay-100 duration-500">
      <CardHeader>
        <h2 className="flex items-center gap-3 p-1 text-xl font-semibold">
          <BriefcaseBusiness className="size-5" />
          {t.experience}
        </h2>
      </CardHeader>
      <CardContent className="flex flex-col">
        <ol className="border-muted-foreground/20 relative -end-2 border-s-2">
          {experience.map((exp) => (
            <ExperienceItem key={exp.id} {...exp} />
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}
