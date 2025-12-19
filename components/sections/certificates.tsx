"use client"

import { useLanguage } from "@/components/language-provider"
import { Certificate } from "@/lib/notion"
import { ArrowUpRight, FileBadge } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"

export default function Certificates() {
  const { data } = useLanguage()
  const certificates = data.certificates

  if (certificates.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="flex items-center gap-3 p-1 text-xl font-semibold">
          <FileBadge className="size-5" />
          Certificates
        </h2>
      </CardHeader>

      <CardContent className="flex flex-col">
        <ol className="border-muted relative -end-2 border-s-2">
          {certificates.map((certificate) => (
            <CertificateItem key={certificate.id} {...certificate} />
          ))}
        </ol>
      </CardContent>

      <CardFooter className="mt-2">
        <Button asChild className="w-full" variant="outline">
          <Link
            href="https://www.linkedin.com/in/felipegiraldoo/details/certifications/"
            target="_blank"
            aria-label="Explore more certificates on LinkedIn"
          >
            More certificates
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function CertificateItem({
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
        <div className="flex flex-col">
          <div className="border-muted-foreground/50 bg-muted absolute -start-1.5 mt-0.5 size-2.5 rounded-xl border" />

          <time className="text-muted-foreground font-mono text-[10px]">
            {time}
          </time>

          {credentialUrl ? (
            <Button
              variant="link"
              asChild
              className="w-fit gap-1 p-0 text-base font-semibold"
            >
              <Link
                href={credentialUrl}
                target="_blank"
                aria-label={`View ${title} credential`}
              >
                <h3>{title}</h3>
                <ArrowUpRight className="size-3" />
              </Link>
            </Button>
          ) : (
            <h3 className="text-base font-semibold">{title}</h3>
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
