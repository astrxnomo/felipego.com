import { Certificate } from "@/lib/notion"
import { translations, type Language } from "@/lib/translations"
import { ArrowRight, FileBadge } from "lucide-react"
import Link from "next/link"
import { CertificateItem } from "../items/certificate-item"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"

interface CertificatesProps {
  certificates: Certificate[]
  lang: Language
}

export default function Certificates({
  certificates,
  lang,
}: CertificatesProps) {
  const t = translations[lang]

  if (certificates.length === 0) {
    return null
  }

  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards delay-400 duration-500">
      <CardHeader>
        <h2 className="flex items-center gap-3 p-1 text-xl font-semibold">
          <FileBadge className="size-5" />
          {t.certificates}
        </h2>
      </CardHeader>

      <CardContent className="flex flex-col">
        <ol className="border-muted-foreground/20 relative -end-2 border-s-2">
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
            className="flex gap-1"
          >
            {t.moreCertificates}
            <ArrowRight className="size-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
