import { GraduationCap } from "lucide-react"
import Link from "next/link"

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

      <ol className="border-primary relative space-y-1 border-s-2">
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
    <li className="hover:bg-primary/30 ms-3 rounded-xl p-4 duration-100">
      <div className="border-muted-foreground/50 bg-primary absolute -start-[6.5px] mt-2 size-3 rounded-xl border"></div>

      <time className="text-muted-foreground mb-2 font-mono text-xs leading-none font-normal">
        {time}
      </time>

      <div className="mt-1 flex flex-col space-y-0.5">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Link
          href={educationUrl}
          target="_blank"
          className="text-muted-foreground text-sm font-medium opacity-80 duration-150 hover:opacity-100"
          aria-label="Link to educator site"
        >
          <span>{educationName}</span>
        </Link>

        <div className="p-1">
          <ol>
            {details.map((detail) => (
              <li
                key={detail}
                className="text-muted-foreground flex items-center gap-1 px-2.5 py-0.5 text-xs"
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
