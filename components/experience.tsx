import { BriefcaseBusiness } from 'lucide-react';

import Card from '@/components/card';
import { getExperience } from '@/lib/queries';
import { type Experience } from '@/lib/types';

export default async function ExperienceSection() {
  const experienceData = await getExperience();

  return (
    <Card>
      <h2 className="flex items-center gap-3 text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
        <BriefcaseBusiness />
        Experience
      </h2>

      <ol className="relative space-y-1 border-s-2 border-neutral-300 dark:border-neutral-800">
        {experienceData.map((experience) => (
          <ExperienceItem key={experience.id} {...experience} />
        ))}
      </ol>
    </Card>
  );
}
function ExperienceItem({ time, title, companyUrl, companyName, description }: Experience) {
  return (
    <li className="ms-3 rounded-xl p-4 duration-100 hover:bg-neutral-300/20 dark:hover:bg-neutral-800/20">
      <div className="absolute -start-[6.5px] mt-2 size-3 rounded-full border border-neutral-300 bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-800" />
      <time className="mb-2 font-mono text-xs font-normal leading-none text-neutral-600 dark:text-neutral-400">
        {time}
      </time>

      <div className="mt-2 flex flex-col space-y-0.5">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">{title}</h3>
        <a
          href={companyUrl}
          target="_blank"
          className="text-sm font-medium text-neutral-700 opacity-80 duration-150 hover:opacity-100 dark:text-neutral-400"
          aria-label="Link to company site"
        >
          <span>{companyName}</span>
        </a>
      </div>
      <p className="mt-3 text-pretty text-sm text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
    </li>
  );
}
