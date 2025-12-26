import { Education } from "@/lib/notion/types"
import Link from "next/link"
import { Button } from "../ui/button"

export function EducationItem({
  time,
  title,
  educationUrl,
  educationName,
  details,
}: Education) {
  return (
    <li className="p-4">
      <div className="border-muted-foreground/50 bg-muted absolute -start-1.5 mt-1.5 size-2.5 rounded-xl border" />

      <time className="text-muted-foreground font-mono text-[10px]">
        {time}
      </time>

      <h3 className="text-base font-semibold">{title}</h3>
      {educationUrl && educationName && (
        <Button variant="link" asChild size="sm" className="p-0 opacity-80">
          <Link
            href={educationUrl}
            target="_blank"
            aria-label={`Link to ${educationName} website`}
          >
            {educationName}
          </Link>
        </Button>
      )}

      {details.length > 0 && (
        <ul>
          {details.map((detail, index) => (
            <li
              key={index}
              className="text-muted-foreground flex items-start gap-2 text-xs"
            >
              <span className="ms-2">{detail}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}
