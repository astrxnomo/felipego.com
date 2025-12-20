import PixelTrail from "@/components/ui/pixel-trail"
import { ThemeProvider } from "@/components/ui/theme-provider"
import type { Metadata } from "next"
import { Outfit, Roboto_Mono } from "next/font/google"
import "./globals.css"

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
})

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Felipe Giraldo - Full Stack Developer",
  description: "Felipe Giraldo's Portfolio - Full Stack Developer",
  openGraph: {
    title: "Felipe Giraldo - Full Stack Developer",
    description: "Felipe Giraldo's Portfolio - Full Stack Developer",
    type: "website",
    locale: "en_US",
    alternateLocale: "es_ES",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <head>
        <script
          async
          crossOrigin="anonymous"
          src="https://tweakcn.com/live-preview.min.js"
        />
      </head>
      <body
        className={`${robotoMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed inset-0 z-0">
            <PixelTrail
              pixelSize={25}
              delay={0}
              fadeDuration={1000}
              pixelClassName="bg-card-foreground/50"
            />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
