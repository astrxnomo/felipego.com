import { ArrowUpRight, MapPin, Sparkle } from 'lucide-react';
import Image from 'next/image';

import Card from '@/components/card';
import SocialLinks from '@/components/social-links';
import { getProfile } from '@/lib/queries';

export default async function Header() {
  const profileData = await getProfile();

  return (
    <header>
      <Card>
        <div className="flex flex-col gap-6 md:flex-row">
          <figure className="relative flex shrink-0 items-center justify-center">
            <Image
              className="rounded-2xl"
              src={profileData.img}
              alt="Profile image"
              width={224}
              height={224}
            />
          </figure>
          <div className="flex grow flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between">
              <a
                href={profileData.workUrl}
                className="flex items-center gap-1.5 rounded-xl bg-green-700/20 px-3 py-1.5 text-xs font-medium text-green-600 opacity-80 transition-opacity duration-150 hover:opacity-100 dark:bg-green-800/40 dark:text-green-200"
                target="_blank"
                aria-label="Link to Linkedin profile"
              >
                <span className="flex size-2 items-center">
                  <span className="absolute inline-flex size-1.5 animate-ping rounded-xl bg-green-600 dark:bg-green-300"></span>
                  <span className="relative inline-flex size-1.5 rounded-xl bg-green-600 dark:bg-green-300"></span>
                </span>
                {profileData.workLabel}
              </a>
              <SocialLinks />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold text-neutral-800 dark:text-neutral-200">
                {profileData.name}
              </h1>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {profileData.description}
              </p>
            </div>
            <div className="flex grow flex-col justify-end">
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                  <MapPin className="size-4" />
                  <p className="text-sm font-medium">{profileData.location}</p>
                </div>
                <a
                  href={`mailto:${profileData.contactEmail}`}
                  target="_blank"
                  className="group inline-flex w-full items-center justify-center gap-1 rounded-xl bg-neutral-200 px-4 py-2 text-sm font-medium opacity-80 transition-opacity duration-150 hover:opacity-100 dark:bg-neutral-800 dark:hover:text-neutral-50 md:w-auto"
                  aria-label="Link to email"
                >
                  Contact
                  <ArrowUpRight className="size-4 opacity-70 duration-200 group-hover:translate-x-[1.5px] group-hover:opacity-100" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="inline-flex w-full flex-nowrap overflow-hidden text-sm font-medium text-neutral-500 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] dark:text-neutral-400">
          <ul className="flex animate-infinite-scroll items-center justify-center">
            {profileData.technologies.map((tech) => (
              <li key={tech} className="flex items-center">
                <Sparkle className="mx-4 size-3" />
                {tech}
              </li>
            ))}
          </ul>
          <ul className="flex animate-infinite-scroll items-center justify-center">
            {profileData.technologies.map((tech) => (
              <li key={tech} className="flex items-center">
                <Sparkle className="mx-4 size-3" />
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </header>
  );
}
