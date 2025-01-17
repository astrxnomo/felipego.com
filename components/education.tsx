import { GraduationCap } from "lucide-react"

import Card from "@/components/card"
import { getEducation } from "@/lib/queries"
import { type Education } from "@/lib/types"

export default async function EducationSection() {
  const educationData = await getEducation()

  return (
    <Card>
      <h2 className="flex items-center gap-3 text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
        <GraduationCap />
        Education
      </h2>

      <ol className="relative space-y-1 border-s-2 border-neutral-300 dark:border-neutral-800">
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
    <li className="ms-3 rounded-xl p-4 duration-100 hover:bg-neutral-300/20 dark:hover:bg-neutral-800/20">
      <div className="absolute -start-[6.5px] mt-2 size-3 rounded-full border border-neutral-300 bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-800"></div>
      <time className="mb-2 font-mono text-xs font-normal leading-none text-neutral-600 dark:text-neutral-400">
        {time}
      </time>

      <div className="mt-1 flex flex-col space-y-0.5">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
          {title}
        </h3>
        <a
          href={educationUrl}
          target="_blank"
          className="text-sm font-medium text-neutral-700 opacity-80 duration-150 hover:opacity-100 dark:text-neutral-400"
          aria-label="Link to educator site"
        >
          <span>{educationName}</span>
        </a>

        <div className="p-1">
          <ol>
            {details.map((detail) => (
              <li
                key={detail}
                className="flex items-center gap-1 px-2.5 py-0.5 text-xs text-neutral-500 dark:text-neutral-400/85"
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
