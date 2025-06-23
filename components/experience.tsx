import { BriefcaseBusiness } from "lucide-react"
import Link from "next/link"

import Card from "@/components/card"
import { getExperience } from "@/lib/queries"
import { type Experience } from "@/lib/types"

export default async function ExperienceSection() {
  const experienceData = await getExperience()

  return (
    <Card>
      <h2 className="flex items-center gap-3 text-2xl font-semibold">
        <BriefcaseBusiness />
        Experience
      </h2>

      <ol className="border-primary relative space-y-1 border-s-2">
        {experienceData.map((experience) => (
          <ExperienceItem key={experience.id} {...experience} />
        ))}
      </ol>
    </Card>
  )
}
function ExperienceItem({
  time,
  title,
  companyUrl,
  companyName,
  description,
}: Experience) {
  return (
    <li className="hover:bg-primary/30 ms-3 rounded-xl p-4 duration-100">
      <div className="border-muted-foreground/50 bg-primary absolute -start-[6.5px] mt-2 size-3 rounded-xl border"></div>

      <time className="text-muted-foreground mb-2 font-mono text-xs leading-none font-normal">
        {time}
      </time>

      <div className="mt-2 flex flex-col space-y-0.5">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Link
          href={companyUrl}
          target="_blank"
          className="text-muted-foreground text-sm font-medium opacity-80 duration-150 hover:opacity-100"
          aria-label="Link to company site"
        >
          <span>{companyName}</span>
        </Link>
      </div>
      <p className="text-muted-foreground mt-3 text-sm text-pretty">
        {description}
      </p>
    </li>
  )
}
