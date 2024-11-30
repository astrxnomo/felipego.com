import { getEducation } from '@/lib/queries'
import { GraduationCap } from 'lucide-react'

export default async function Education () {
  const educationData = await getEducation()

  return (
    <section className="flex flex-col p-8 gap-6 rounded-2xl overflow-hidden bg-neutral-200/30 border dark:bg-neutral-900/50 animate-pulse-fade-in animate-duration-500">
      <h2 className="text-2xl font-semibold flex gap-3 items-center text-neutral-800 dark:text-neutral-200">
        <GraduationCap />
        Education
      </h2>

      <ol className="relative space-y-1 border-s-2 border-neutral-300 dark:border-neutral-800">

        {educationData.map(education => (
            <EducationItem key={education.id} {...education} />
        ))}
      </ol>
    </section>
  )
}

interface EducationItemProps {
  time: string
  title: string
  educationUrl: string
  educationName: string
  details: string[]
}

function EducationItem ({ time, title, educationUrl, educationName, details }: EducationItemProps) {
  return (
    <li className="ms-3 p-4 rounded-xl hover:bg-neutral-300/20 dark:hover:bg-neutral-800/20 duration-100">
      <div className="absolute -start-[6.5px] mt-2 h-3 w-3 rounded-full border border-neutral-300 bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-800"></div>
      <time className="mb-2 font-mono text-xs font-normal leading-none text-neutral-600 dark:text-neutral-400">{time}</time>

        <div className="mt-1 flex flex-col space-y-0.5">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">{title}</h3>
            <a href={educationUrl} target="_blank" className="text-sm font-medium duration-150 text-neutral-700 dark:text-neutral-400 opacity-80 hover:opacity-100">
                <span>{educationName}</span>
            </a>

            <div className="p-1">
                <ol>
                    {details.map(detail => (
                        <li key={detail} className="flex gap-1 items-center text-xs px-2.5 py-0.5 text-neutral-500 dark:text-neutral-400/85">
                            {detail}
                        </li>
                    ))}
                </ol>
            </div>

        </div>
    </li>
  )
}
