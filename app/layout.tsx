import { ThemeSwitcher } from '@/components/theme-switcher'
import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import Particles from '@/components/particles'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="p-5 mt-4 w-full mx-auto flex flex-col gap-6 md:max-w-4xl">
              <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={80}/>
                {children}
              <footer className="w-full flex items-center justify-center text-center text-xs gap-8 py-16">
                <p>
                  Develop by{' '}
                  <a
                    href="https://felipego.com"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    felipego.com
                  </a>
                </p>
                <ThemeSwitcher />
              </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
