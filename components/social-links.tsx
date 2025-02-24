import { Github, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export default function SocialLinks() {
  const socialLinks = [
    { url: "https://github.com/astrxnomo", icon: Github },
    { url: "https://www.linkedin.com/in/felipegiraldoo/", icon: Linkedin },
    { url: "https://www.instagram.com/astrxnomo/", icon: Instagram },
  ]
  return (
    <div className="flex gap-2">
      {socialLinks.map((app) => (
        <Link
          key={app.url}
          href={app.url}
          className="inline-flex items-center justify-center rounded-xl bg-primary p-2 opacity-80 transition-opacity duration-150 hover:opacity-100"
          target="_blank"
          aria-label={`Link to ${app.url}`}
        >
          <app.icon className="size-4" />
        </Link>
      ))}
    </div>
  )
}
