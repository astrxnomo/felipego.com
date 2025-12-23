import { Certificate } from "@/lib/notion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

export function CertificateItem({
  time,
  title,
  certificatorUrl,
  certificatorName,
  credentialUrl,
  img,
}: Certificate) {
  return (
    <li className="p-4 pb-0">
      <div className="flex justify-between gap-4">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-muted-foreground/50 bg-muted absolute -start-1.5 mt-0.5 size-2.5 rounded-xl border" />

          <time className="text-muted-foreground font-mono text-[10px]">
            {time}
          </time>

          {credentialUrl ? (
            <Button
              variant="link"
              asChild
              className="h-auto w-fit gap-1 p-0 text-left text-base font-semibold whitespace-normal"
            >
              <Link
                href={credentialUrl}
                target="_blank"
                aria-label={`View ${title} credential`}
              >
                <h3 className="wrap-break-words">{title}</h3>
                <ArrowUpRight className="mt-0.5 size-3 shrink-0" />
              </Link>
            </Button>
          ) : (
            <h3 className="wrap-break-words text-base font-semibold">
              {title}
            </h3>
          )}

          {certificatorUrl && certificatorName && (
            <Button
              variant="link"
              asChild
              size="xs"
              className="w-fit p-0 opacity-80"
            >
              <Link
                href={certificatorUrl}
                target="_blank"
                aria-label={`Link to ${certificatorName} website`}
              >
                {certificatorName}
              </Link>
            </Button>
          )}
        </div>

        {img && (
          <div className="flex shrink-0 items-start">
            <div className="relative size-20 overflow-hidden rounded-lg">
              <Image
                src={img}
                alt={`${title} badge`}
                className="object-contain"
                fill
                sizes="80px"
              />
            </div>
          </div>
        )}
      </div>
    </li>
  )
}
