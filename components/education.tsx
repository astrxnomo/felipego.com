import { GraduationCap } from "lucide-react"

import Card from "@/components/card"
import { getEducation } from "@/lib/queries"
import { type Education } from "@/lib/types"

export default async function EducationSection() {
  const educationData = await getEducation()

  return (
    <Card>
      <h2 className="flex items-center gap-3 text-2xl font-semibold">
        <GraduationCap />
        Education
      </h2>

      <ol className="relative space-y-1 border-s-2 border-primary">
        {educationData.map((education) => (
          <EducationItem key={education.id} {...education} />
        ))}
      </ol>
    </Card>
  )
}

function EducationItem({
  time,
  title,
  educationUrl,
  educationName,
  details,
}: Education) {
  return (
    <li className="ms-3 rounded p-4 duration-100 hover:bg-primary/30">
      <div className="absolute -start-[6.5px] mt-2 size-3 rounded border border-muted-foreground/50 bg-primary"></div>

      <time className="mb-2 font-mono text-xs font-normal leading-none text-muted-foreground">
        {time}
      </time>

      <div className="mt-1 flex flex-col space-y-0.5">
        <h3 className="text-lg font-semibold">{title}</h3>
        <a
          href={educationUrl}
          target="_blank"
          className="text-sm font-medium text-muted-foreground opacity-80 duration-150 hover:opacity-100"
          aria-label="Link to educator site"
        >
          <span>{educationName}</span>
        </a>

        <div className="p-1">
          <ol>
            {details.map((detail) => (
              <li
                key={detail}
                className="flex items-center gap-1 px-2.5 py-0.5 text-xs text-muted-foreground"
              >
                {detail}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </li>
  )
}
