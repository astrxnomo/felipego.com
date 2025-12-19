"use client"

import { LanguageProvider } from "@/components/language-provider"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import type { Language } from "@/lib/notion/client"
import type {
  Certificate,
  Education,
  Experience,
  Profile,
  Project,
} from "@/lib/notion/types"
import { type ReactNode, useEffect, useState } from "react"

interface PageData {
  profile: Profile | null
  experience: Experience[]
  projects: Project[]
  education: Education[]
  certificates: Certificate[]
}

interface LanguageData {
  es: PageData
  en: PageData
}

interface PageWrapperProps {
  children: ReactNode
  data: LanguageData
}

export function PageWrapper({ children, data }: PageWrapperProps) {
  const [initialLang, setInitialLang] = useState<Language>("es")

  useEffect(() => {
    // Detect browser language on client
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith("en")) {
      setInitialLang("en")
    }
  }, [])

  return (
    <LanguageProvider initialLang={initialLang} data={data}>
      <div className="fixed top-5 right-5 z-20 flex gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
      {children}
    </LanguageProvider>
  )
}
