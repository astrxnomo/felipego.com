import { Github, Linkedin, Instagram } from "lucide-react";

export default function SocialLinks() {
  const socialLinks = [
    { url: "https://github.com/astrxnomo", icon: Github },
    { url: "https://www.linkedin.com/in/felipegiraldoo/", icon: Linkedin },
    { url: "https://www.instagram.com/astrxnomo/", icon: Instagram },
  ];
  return (
    <div className="flex gap-2">
      {socialLinks.map((app) => (
        <a
          key={app.url}
          href={app.url}
          className="inline-flex items-center justify-center rounded-xl bg-neutral-200 dark:bg-neutral-800 p-2 opacity-80 transition-opacity duration-150 hover:opacity-100"
          target="_blank"
          aria-label={`Link to ${app.url}`}
        >
          <app.icon className="size-4" />
        </a>
      ))}
    </div>
  );
}
