import { MapPin, ArrowUpRight, Sparkle } from 'lucide-react'
import { getProfile } from '@/lib/queries'
import SocialLinks from '@/components/social-links'
import Image from 'next/image'

export default async function Header () {
  const profileData = await getProfile()

  const { avatar, technologies, name, description, location, contactEmail, workLabel, workUrl } = profileData as {
    avatar: string
    technologies: string[]
    name: string
    description: string
    location: string
    contactEmail: string
    workLabel: string
    workUrl: string
  }
  return (
    <section className="flex flex-col p-8 gap-6 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900/50 animate-pulse-fade-in animate-duration-500">
        <div className="flex flex-col md:flex-row gap-6">
        <figure className="flex justify-center items-center object-fit flex-shrink-0 relative">
            <Image
            className="rounded-2xl"
            src={avatar}
            alt="Profile image"
            width={224}
            height={224}
            />
        </figure>
        <div className="flex flex-col gap-6 grow">
            <div className="flex justify-between items-center flex-wrap">
            <a href={workUrl} className="flex items-center text-xs gap-1.5 font-medium py-1.5 px-3 rounded-xl bg-green-700/20 dark:bg-green-800/40 text-green-600 dark:text-green-200 opacity-80 transition-opacity duration-150 hover:opacity-100" target="_blank">
                <span className="flex size-2 items-center">
                <span className="absolute inline-flex size-1.5 animate-ping rounded-xl bg-green-600 dark:bg-green-300"></span>
                <span className="relative inline-flex size-1.5 rounded-xl bg-green-600 dark:bg-green-300"></span>
                </span>
                {workLabel}
            </a>
            <SocialLinks />
            </div>
            <div className="flex flex-col gap-2">
            <h1 className="text-neutral-900 dark:text-neutral-200 text-3xl font-semibold">{name}</h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">{description}</p>
            </div>
            <div className="flex flex-col grow justify-end">
            <div className="flex flex-col gap-4 md:flex-row justify-between">
                <div className="flex gap-2 items-center text-neutral-600 dark:text-neutral-400">
                <MapPin className="size-4"/>
                <p className="text-sm font-medium">{location}</p>
                </div>
                <a href={`mailto:${contactEmail}`} target="_blank" className="inline-flex items-center text-sm justify-center rounded-xl bg-neutral-200 dark:bg-neutral-800 dark:hover:text-neutral-50 py-2 px-4 opacity-80 transition-opacity duration-150 hover:opacity-100 w-full md:w-auto group gap-1 font-medium">
                Contact
                <ArrowUpRight className="size-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-[1.5px] duration-200"/>
                </a>
            </div>
            </div>
        </div>
        </div>
        <div className="w-full inline-flex flex-nowrap text-sm font-medium text-neutral-500 dark:text-neutral-400 overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-5 [&_img]:max-w-none animate-infinite-scroll prevent-select">
            {technologies.map((tech: string, index: number) => (
            <>
                <li>{tech}</li>
                {index < technologies.length && <Sparkle className="size-3"/>}
            </>
            ))}
        </ul>
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-5 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
            {technologies.map((tech: string, index: number) => (
            <>
                <li>{tech}</li>
                {index < technologies.length && <Sparkle className="size-3"/>}
            </>
            ))}
        </ul>
        </div>
    </section>
  )
}
