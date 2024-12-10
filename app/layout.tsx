import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Particles from '@/components/particles'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata = {
  title: "Felipe Giraldo's Portfolio",
  description: 'A student of Computer Systems Administration at UNAL in Colombia. I am on a journey to become a competent full-stack developer.',
  metadataBase: new URL('https://felipego.com'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: "Felipe Giraldo's Portfolio",
    description: 'A student of Computer Systems Administration at UNAL in Colombia. I am on a journey to become a competent full-stack developer.',
    url: 'https://felipego.com',
    siteName: "Felipe Giraldo's Portfolio",
    images: [
      {
        url: 'https://file.notion.so/f/f/a96fc2d8-c2ff-4207-8f8b-ead87ec386fa/68a1eb3b-069b-44ce-82fc-0a55ca4576ee/image.webp?table=block&id=11623bce-2002-8018-8ab6-dcb0b65994b5&spaceId=a96fc2d8-c2ff-4207-8f8b-ead87ec386fa&expirationTimestamp=1733184000000&signature=v2QTo7CdZJnfSfMAiKh4E58tectNP4rO51rBxM0Nsnw&downloadName=image.webp',
        width: 1200,
        height: 630
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: "Felipe Giraldo's Portfolio",
    description: 'A student of Computer Systems Administration at UNAL in Colombia. I am on a journey to become a competent full-stack developer.',
    creator: '@astrxnomo',
    images: ['https://file.notion.so/f/f/a96fc2d8-c2ff-4207-8f8b-ead87ec386fa/68a1eb3b-069b-44ce-82fc-0a55ca4576ee/image.webp?table=block&id=11623bce-2002-8018-8ab6-dcb0b65994b5&spaceId=a96fc2d8-c2ff-4207-8f8b-ead87ec386fa&expirationTimestamp=1733184000000&signature=v2QTo7CdZJnfSfMAiKh4E58tectNP4rO51rBxM0Nsnw&downloadName=image.webp']
  },
  keywords: [
    'Full Stack Developer',
    'Computer Systems Administration',
    'UNAL',
    'Colombia',
    'Felipe Giraldo',
    'Luis Felipe Giraldo Ortega',
    'Manizales',
    'Caldas',
    'Web Developer',
    'Programador',
    'Paginas web',
    'Frontend',
    'Backend',
    'React',
    'Next.js',
    'Node.js',
    'Crear paginas web'
  ],
  authors: [{ name: 'Felipe Giraldo' }],
  creator: 'Felipe Giraldo',
  publisher: 'Felipe Giraldo'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-neutral-100 dark:bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Particles className="fixed inset-0 -z-10" quantity={120} />
          <main className="p-5 mt-4 w-full mx-auto flex flex-col gap-6 md:max-w-4xl">
            {children}
          </main>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Felipe Giraldo',
            url: 'https://felipego.com',
            image: 'https://file.notion.so/f/f/a96fc2d8-c2ff-4207-8f8b-ead87ec386fa/68a1eb3b-069b-44ce-82fc-0a55ca4576ee/image.webp?table=block&id=11623bce-2002-8018-8ab6-dcb0b65994b5&spaceId=a96fc2d8-c2ff-4207-8f8b-ead87ec386fa&expirationTimestamp=1733184000000&signature=v2QTo7CdZJnfSfMAiKh4E58tectNP4rO51rBxM0Nsnw&downloadName=image.webp',
            sameAs: [
              'https://twitter.com/astrxnomo',
              'https://github.com/astrxnomo',
              'https://www.linkedin.com/in/felipegiraldoo',
              'https://www.instagram.com/astrxnomo',
              'https://www.facebook.com/astrxnomo',
              'https://www.tiktok.com/@astrxnomo',
              'https://www.twitch.tv/astrxnomo',
              'https://www.pinterest.com/astrxnomo',
              'https://www.dev.to/astrxnomo'
            ]
          })
        }} />
      </body>
    </html>
  )
}
