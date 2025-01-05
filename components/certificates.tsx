import { ArrowUpRight, FileBadge, MoveRight } from 'lucide-react';
import Image from 'next/image';

import { getCertificates } from '@/lib/queries';
import Card from '@/components/card';
import { type Certificate } from '@/lib/types';

export default async function Certificates() {
  const certificates = await getCertificates();

  return (
    <Card>
      <h2 className="flex items-center gap-3 text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
        <FileBadge />
        Certificates
      </h2>

      <ol className="relative space-y-1 border-s-2 border-neutral-300 dark:border-neutral-800">
        {certificates.map((certificate) => {
          return <CertificateItem key={certificate.id} {...certificate} />;
        })}
      </ol>

      <a
        href="https://www.linkedin.com/in/felipegiraldoo/details/certifications/"
        target="_blank"
        className="group inline-flex w-full items-center justify-center gap-1 rounded-xl bg-neutral-200 px-4 py-2 text-sm font-medium opacity-80 transition-opacity duration-150 hover:opacity-100 dark:bg-neutral-800 dark:hover:text-neutral-50 md:w-auto"
        aria-label="Explore more certificates"
      >
        More certificates
        <MoveRight className="size-4 opacity-70 duration-200 group-hover:translate-x-[1.5px] group-hover:opacity-100" />
      </a>
    </Card>
  );
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
    <li className="ms-3 rounded-xl p-4 duration-100 hover:bg-neutral-300/20  dark:hover:bg-neutral-800/20">
      <div className="flex justify-between gap-5 md:flex-row">
        <div className="flex flex-col">
          <div className="absolute -start-[6.5px] mt-2 size-3 rounded-full border border-neutral-300 bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-800"></div>
          <time className="mb-2 font-mono text-xs font-normal leading-none text-neutral-600 dark:text-neutral-400">
            {time}
          </time>
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">{title}</h3>
          <a
            href={certificatorUrl}
            target="_blank"
            className="text-sm font-medium text-neutral-700 opacity-80 duration-150 hover:opacity-100 dark:text-neutral-400"
            aria-label="Link to certificator page"
          >
            <span>{certificatorName}</span>
          </a>

          <a
            href={credentialUrl}
            target="_blank"
            className="group mt-1.5 inline-flex h-8 w-28 items-center justify-center gap-1 rounded-xl bg-neutral-300/60 px-3 py-2 text-xs font-medium opacity-80 transition-opacity duration-150 hover:opacity-100 dark:bg-neutral-800"
            aria-label={`Link to ${title} certificate`}
          >
            Credential
            <ArrowUpRight className="size-3 opacity-70 duration-200 group-hover:translate-x-[1.5px] group-hover:opacity-100" />
          </a>
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
  );
}
