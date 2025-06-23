import { ArrowUpRight, FileBadge, MoveRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import Card from "@/components/card"
import { getCertificates } from "@/lib/queries"
import { type Certificate } from "@/lib/types"

export default async function Certificates() {
  const certificates = await getCertificates()

  return (
    <Card>
      <h2 className="flex items-center gap-3 text-2xl font-semibold">
        <FileBadge />
        Certificates
      </h2>

      <ol className="border-primary relative space-y-1 border-s-2">
        {certificates.map((certificate) => {
          return <CertificateItem key={certificate.id} {...certificate} />
        })}
      </ol>

      <Link
        href="https://www.linkedin.com/in/felipegiraldoo/details/certifications/"
        target="_blank"
        className="group bg-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium opacity-80 transition-opacity duration-150 hover:opacity-100 md:w-auto"
        aria-label="Explore more certificates"
      >
        More certificates
        <MoveRight className="size-4 opacity-70 duration-200 group-hover:translate-x-[1.5px] group-hover:opacity-100" />
      </Link>
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
    <li className="hover:bg-primary/30 ms-3 rounded-xl p-4 duration-100">
      <div className="flex justify-between gap-5 md:flex-row">
        <div className="flex flex-col">
          <div className="border-muted-foreground/50 bg-primary absolute -start-[6.5px] size-3 rounded-xl border"></div>
          <time className="text-muted-foreground mb-2 font-mono text-xs leading-none font-normal">
            {time}
          </time>
          <h3 className="text-lg font-semibold">{title}</h3>
          <Link
            href={certificatorUrl}
            target="_blank"
            className="text-muted-foreground text-sm font-medium opacity-80 duration-150 hover:opacity-100"
            aria-label="Link to certificator page"
          >
            <span>{certificatorName}</span>
          </Link>

          <Link
            href={credentialUrl}
            target="_blank"
            className="group bg-primary mt-1.5 inline-flex h-8 w-28 items-center justify-center gap-1 rounded-xl px-3 py-2 text-xs font-medium opacity-80 transition-opacity duration-150 hover:opacity-100"
            aria-label={`Link to ${title} certificate`}
          >
            Credential
            <ArrowUpRight className="size-3 opacity-70 duration-200 group-hover:translate-x-[1.5px] group-hover:opacity-100" />
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="relative aspect-square size-24 max-h-full max-w-full">
            <Image
              src={img}
              alt="Certificate badge"
              className="rounded-xl object-contain"
              fill
              sizes="(max-width: 96px) 100vw, 96px"
            />
          </div>
        </div>
      </div>
    </li>
  )
}
