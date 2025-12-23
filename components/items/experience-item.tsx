import { Experience } from "@/lib/notion"
import Link from "next/link"
import { Button } from "../ui/button"

export function ExperienceItem({
  time,
  title,
  companyUrl,
  companyName,
  description,
}: Experience) {
  return (
    <li className="p-4">
      <div className="border-muted-foreground/50 bg-muted absolute -start-1.5 mt-1.5 size-2.5 rounded-xl border"></div>

      <time className="text-muted-foreground font-mono text-[10px]">
        {time}
      </time>

      <h3 className="text-base font-semibold">{title}</h3>
      {companyUrl && companyName && (
        <Button
          variant="link"
          asChild
          size="sm"
          className="w-fit p-0 opacity-80"
        >
          <Link
            href={companyUrl}
            target="_blank"
            aria-label={`Link to ${companyName} website`}
          >
            {companyName}
          </Link>
        </Button>
      )}
      <p className="text-muted-foreground text-xs text-pretty">{description}</p>
    </li>
  )
}
