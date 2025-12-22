import { Client } from "@notionhq/client"

export const notion = new Client({ auth: process.env.NOTION_API_KEY })

export type Language = "es" | "en"

export type DataSourceCategory =
  | "profile"
  | "experience"
  | "projects"
  | "education"
  | "certificates"
  | "blog"

// Data source IDs por idioma
const DATA_SOURCE_IDS: Record<Language, Record<DataSourceCategory, string>> = {
  es: {
    profile: process.env.NOTION_PROFILE_ES_ID ?? "",
    experience: process.env.NOTION_EXPERIENCE_ES_ID ?? "",
    projects: process.env.NOTION_PROJECTS_ES_ID ?? "",
    education: process.env.NOTION_EDUCATION_ES_ID ?? "",
    certificates: process.env.NOTION_CERTIFICATES_ES_ID ?? "",
    blog: process.env.NOTION_BLOG_ES_ID ?? "",
  },
  en: {
    profile: process.env.NOTION_PROFILE_EN_ID ?? "",
    experience: process.env.NOTION_EXPERIENCE_EN_ID ?? "",
    projects: process.env.NOTION_PROJECTS_EN_ID ?? "",
    education: process.env.NOTION_EDUCATION_EN_ID ?? "",
    certificates: process.env.NOTION_CERTIFICATES_EN_ID ?? "",
    blog: process.env.NOTION_BLOG_EN_ID ?? "",
  },
}

export function getDataSourceId(
  category: DataSourceCategory,
  lang: Language,
): string {
  return DATA_SOURCE_IDS[lang][category]
}

export function getFallbackLanguage(lang: Language): Language {
  return lang === "es" ? "en" : "es"
}

export function detectLanguage(acceptLanguageHeader?: string | null): Language {
  if (!acceptLanguageHeader) return "es"

  const languages = acceptLanguageHeader
    .split(",")
    .map((lang) => {
      const [code, qValue] = lang.trim().split(";q=")
      return {
        code: code.toLowerCase().split("-")[0],
        q: qValue ? parseFloat(qValue) : 1,
      }
    })
    .sort((a, b) => b.q - a.q)

  for (const { code } of languages) {
    if (code === "es") return "es"
    if (code === "en") return "en"
  }

  return "es"
}
