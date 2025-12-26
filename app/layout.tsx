import { Header } from "@/components/header"
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
      <body className={`${robotoMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme={false}
        >
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
