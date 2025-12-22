import { Language, Profile } from "@/lib/notion"
import { translations } from "@/lib/translations"
import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  MapPin,
  Sparkle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import { InfiniteSlider } from "../ui/infinite-slider"

const socialLinks = [
  { url: "https://github.com/astrxnomo", icon: Github },
  { url: "https://www.linkedin.com/in/felipegiraldoo/", icon: Linkedin },
  { url: "https://www.instagram.com/astrxnomo/", icon: Instagram },
]

interface HeaderProps {
  profile: Profile | null
  lang: Language
}

export default function Header({ profile, lang }: HeaderProps) {
  const t = translations[lang]

  if (!profile) {
    return null
  }

  return (
    <header>
      <Card>
        <CardContent className="flex flex-col gap-4 md:flex-row">
          {profile.img && (
            <Image
              className="self-center rounded-lg md:self-start"
              src={profile.img}
              alt="Profile image"
              width={160}
              height={160}
            />
          )}
          <div className="flex grow flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              {profile.workUrl && profile.workLabel && (
                <Button asChild variant="outline" size="xs">
                  <Link
                    href={profile.workUrl}
                    target="_blank"
                    aria-label="Link to Linkedin profile"
                  >
                    <span className="flex size-1.5 items-center">
                      <span className="bg-accent-foreground relative size-1 rounded-full" />
                      <span className="bg-accent-foreground/80 absolute size-1 animate-ping rounded-full" />
                    </span>
                    {profile.workLabel}
                  </Link>
                </Button>
              )}
              <div className="flex gap-1.5">
                {socialLinks.map(({ url, icon: Icon }) => (
                  <Button key={url} asChild size="icon" variant="outline">
                    <Link
                      href={url}
                      target="_blank"
                      aria-label={`Link to ${url}`}
                    >
                      <Icon className="size-3.5" />
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <h1 className="text-xl font-semibold">{profile.name}</h1>
              <p className="text-muted-foreground text-xs">
                {profile.description}
              </p>
            </div>
            <div className="mt-auto flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-muted-foreground flex items-center gap-1.5">
                <MapPin className="size-3.5" />
                <p className="text-xs font-medium">{profile.location}</p>
              </div>
              {profile.contactEmail && (
                <Button variant="outline" asChild className="w-fit gap-1">
                  <Link
                    href={`mailto:${profile.contactEmail}`}
                    aria-label="Link to email"
                  >
                    {t.contact}
                    <ArrowUpRight className="size-3" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
        {profile.technologies.length > 0 && (
          <CardFooter className="mt-3">
            <InfiniteSlider
              gap={10}
              speed={70}
              speedOnHover={40}
              className="text-muted-foreground mask-[linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-200px),transparent_100%)] text-xs font-medium"
            >
              {profile.technologies.map((tech) => (
                <div key={tech} className="flex items-center gap-2">
                  <Sparkle className="size-2.5" />
                  {tech}
                </div>
              ))}
            </InfiniteSlider>
          </CardFooter>
        )}
      </Card>
    </header>
  )
}
