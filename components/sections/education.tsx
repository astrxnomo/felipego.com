import { Education } from "@/lib/notion"
import { translations, type Language } from "@/lib/translations"
import { GraduationCap } from "lucide-react"
import { EducationItem } from "../items/education-item"
import { Card, CardContent, CardHeader } from "../ui/card"

interface EducationSectionProps {
  education: Education[]
  lang: Language
}

export default function EducationSection({
  education,
  lang,
}: EducationSectionProps) {
  const t = translations[lang]
  if (education.length === 0) {
    return null
  }

  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards delay-300 duration-500">
      <CardHeader>
        <h2 className="flex items-center gap-3 p-1 text-xl font-semibold">
          <GraduationCap className="size-5" />
          {t.education}
        </h2>
      </CardHeader>
      <CardContent className="flex flex-col">
        <ol className="border-muted-foreground/20 relative -end-2 border-s-2">
          {education.map((edu) => (
            <EducationItem key={edu.id} {...edu} />
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}
