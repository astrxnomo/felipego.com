"use client"

import type { Language } from "@/lib/notion/client"
import type {
  Certificate,
  Education,
  Experience,
  Profile,
  Project,
} from "@/lib/notion/types"
import { createContext, useContext, useState, type ReactNode } from "react"

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

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  data: PageData
  allData: LanguageData
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
)

interface LanguageProviderProps {
  children: ReactNode
  initialLang: Language
  data: LanguageData
}

export function LanguageProvider({
  children,
  initialLang,
  data,
}: LanguageProviderProps) {
  const [lang, setLang] = useState<Language>(initialLang)

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        data: data[lang],
        allData: data,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
