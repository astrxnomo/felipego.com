import { getCertificates } from '@/lib/queries'
import { ArrowUpRight, FileBadge, MoveRight } from 'lucide-react'
import Image from 'next/image'

export default async function Certificates () {
  const certificates = await getCertificates()

  return (
    <section className="flex flex-col p-8 gap-6 rounded-2xl overflow-hidden bg-neutral-200/30 border dark:bg-neutral-900/50 animate-pulse-fade-in animate-duration-500">
      <h2 className="text-2xl font-semibold flex gap-3 items-center text-neutral-800 dark:text-neutral-200">
        <FileBadge />
        Certificates
      </h2>

      <ol className="relative space-y-1 border-s-2 border-neutral-300 dark:border-neutral-800">
        {certificates.map((certificate) => {
          return (
            <CertificateItem key={certificate.id} {...certificate} />
          )
        })}
      </ol>

      <a href="https://www.linkedin.com/in/felipegiraldoo/details/certifications/" target="_blank" className="inline-flex items-center text-sm justify-center rounded-xl bg-neutral-200 dark:bg-neutral-800 dark:hover:text-neutral-50 py-2 px-4 opacity-80 transition-opacity duration-150 hover:opacity-100 w-full md:w-auto group gap-1 font-medium">
        More certificates
        <MoveRight className="size-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-[1.5px] duration-200" />
      </a>
</section>
  )
}

interface CredentialItemProps {
  time: string
  title: string
  certificatorUrl: string
  certificatorName: string
  credentialUrl: string
  img: string
}

function CertificateItem ({ time, title, certificatorUrl, certificatorName, credentialUrl, img }: CredentialItemProps) {
  return (
    <li className="ms-3 p-4 rounded-xl hover:bg-neutral-300/20 dark:hover:bg-neutral-800/20  duration-100">
      <div className="flex justify-between gap-5 md:flex-row">
        <div className="flex flex-col">
        <div className="absolute -start-[6.5px] mt-2 h-3 w-3 rounded-full border border-neutral-300 bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-800"></div>
        <time className="mb-2 font-mono text-xs font-normal leading-none text-neutral-600 dark:text-neutral-400">{time}</time>
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">{title}</h3>
          <a href={certificatorUrl} target="_blank" className="text-sm font-medium duration-150 text-neutral-700 dark:text-neutral-400 opacity-80 hover:opacity-100">
            <span>{certificatorName}</span>
          </a>

          <a href={credentialUrl} target="_blank" className="mt-1.5 inline-flex gap-1 items-center text-xs font-medium justify-center rounded-xl bg-neutral-300/60 dark:bg-neutral-800 py-2 px-3 opacity-80 transition-opacity duration-150 hover:opacity-100 group w-28 h-8">
            Credential
            <ArrowUpRight className="size-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-[1.5px] duration-200"/>
          </a>
        </div>

        <div className="flex flex-col justify-center items-center">
          <Image src={img} alt="Certificate badge" className="rounded-xl object-contain size-full" width={96} height={96} />
        </div>
      </div>
    </li>
  )
}
