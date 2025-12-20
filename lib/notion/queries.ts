import { exportImage } from "@/lib/utils/images"
import { NotionToMarkdown } from "notion-to-md"

import {
  type DataSourceCategory,
  getDataSourceId,
  getFallbackLanguage,
  type Language,
  notion,
} from "./client"
import type {
  Certificate,
  Education,
  Experience,
  NotionPage,
  Profile,
  Project,
} from "./types"

// Initialize NotionToMarkdown
const n2m = new NotionToMarkdown({ notionClient: notion })

// Function to get page content as markdown
export async function getProjectContent(pageId: string): Promise<string> {
  try {
    const mdBlocks = await n2m.pageToMarkdown(pageId)
    const mdString = n2m.toMarkdownString(mdBlocks)
    return mdString.parent || ""
  } catch (error) {
    console.error(`Error getting content for page ${pageId}:`, error)
    return ""
  }
}

async function queryDataSource<T>(
  category: DataSourceCategory,
  lang: Language,
): Promise<T[]> {
  const dataSourceId = getDataSourceId(category, lang)

  if (!dataSourceId) {
    // Fallback to other language if data source ID is missing
    const fallbackLang = getFallbackLanguage(lang)
    const fallbackId = getDataSourceId(category, fallbackLang)

    if (!fallbackId) {
      console.error(`No data source ID for ${category} in any language`)
      return []
    }

    return queryDataSourceById<T>(fallbackId)
  }

  const results = await queryDataSourceById<T>(dataSourceId)

  // If no results, try fallback language
  if (results.length === 0) {
    const fallbackLang = getFallbackLanguage(lang)
    const fallbackId = getDataSourceId(category, fallbackLang)

    if (fallbackId) {
      return queryDataSourceById<T>(fallbackId)
    }
  }

  return results
}

async function queryDataSourceById<T>(dataSourceId: string): Promise<T[]> {
  try {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      sorts: [
        {
          property: "id",
          direction: "descending",
        },
      ],
    })

    // Filter by "show" property
    const filtered = response.results.filter((item: any) => {
      const showProp = item.properties?.show
      if (!showProp) return true
      return showProp.checkbox === true
    })

    return filtered as T[]
  } catch (error) {
    console.error(`Error querying data source ${dataSourceId}:`, error)
    return []
  }
}

export async function getProfile(lang: Language): Promise<Profile | null> {
  const results = await queryDataSource<NotionPage>("profile", lang)
  const page = results[0]

  if (!page) return null

  const { properties } = page

  const name = properties.name?.title?.[0]?.plain_text ?? "Profile"
  const img = await exportImage(
    properties.img?.files?.[0]?.file?.url ??
      properties.img?.files?.[0]?.external?.url ??
      "",
    "profile",
    name,
    page.id,
  )

  return {
    id: page.id,
    name,
    description: properties.description?.rich_text?.[0]?.plain_text ?? "",
    location: properties.location?.rich_text?.[0]?.plain_text ?? "",
    contactEmail: properties.contactEmail?.rich_text?.[0]?.plain_text ?? "",
    technologies:
      properties.technologies?.multi_select?.map(
        (tag: { name: string }) => tag.name,
      ) ?? [],
    img,
    workLabel: properties.workLabel?.rich_text?.[0]?.plain_text ?? "",
    workUrl: properties.workUrl?.url ?? "",
  }
}

export async function getExperience(lang: Language): Promise<Experience[]> {
  const results = await queryDataSource<NotionPage>("experience", lang)

  return results.map((page) => {
    const { properties } = page
    return {
      id: page.id,
      time: properties.time?.rich_text?.[0]?.plain_text ?? "",
      title: properties.title?.title?.[0]?.plain_text ?? "",
      companyUrl: properties.companyUrl?.url ?? "",
      companyName: properties.companyName?.rich_text?.[0]?.plain_text ?? "",
      description: properties.description?.rich_text?.[0]?.plain_text ?? "",
    }
  })
}

export async function getProjects(lang: Language): Promise<Project[]> {
  const results = await queryDataSource<NotionPage>("projects", lang)

  return await Promise.all(
    results.map(async (page) => {
      const { properties } = page

      const title = properties.title?.title?.[0]?.plain_text ?? "Project"
      const img = await exportImage(
        properties.img?.files?.[0]?.file?.url ??
          properties.img?.files?.[0]?.external?.url ??
          "",
        "projects",
        title,
        page.id,
      )

      // Get page content as markdown
      const content = await getProjectContent(page.id)

      return {
        id: page.id,
        title,
        description: properties.description?.rich_text?.[0]?.plain_text ?? "",
        content,
        technologies:
          properties.technologies?.multi_select?.map(
            (tag: { name: string }) => tag.name,
          ) ?? [],
        githubLink: properties.githubLink?.url,
        previewLink: properties.previewLink?.url,
        img,
      }
    }),
  )
}

export async function getEducation(lang: Language): Promise<Education[]> {
  const results = await queryDataSource<NotionPage>("education", lang)

  return results.map((page) => {
    const { properties } = page
    return {
      id: page.id,
      time: properties.time?.rich_text?.[0]?.plain_text ?? "",
      title: properties.title?.title?.[0]?.plain_text ?? "",
      educationName: properties.educationName?.rich_text?.[0]?.plain_text ?? "",
      educationUrl: properties.educationUrl?.url ?? "",
      details:
        properties.details?.multi_select?.map(
          (item: { name: string }) => item.name,
        ) ?? [],
    }
  })
}

export async function getCertificates(lang: Language): Promise<Certificate[]> {
  const results = await queryDataSource<NotionPage>("certificates", lang)

  return await Promise.all(
    results.map(async (page) => {
      const { properties } = page

      const title = properties.title?.title?.[0]?.plain_text ?? "Certificate"
      const img = await exportImage(
        properties.img?.files?.[0]?.file?.url ??
          properties.img?.files?.[0]?.external?.url ??
          "",
        "certificates",
        title,
        page.id,
      )

      return {
        id: page.id,
        time: properties.time?.rich_text?.[0]?.plain_text ?? "",
        title,
        certificatorName:
          properties.certificatorName?.rich_text?.[0]?.plain_text ?? "",
        certificatorUrl: properties.certificatorUrl?.url ?? "",
        credentialUrl: properties.credentialUrl?.url ?? "",
        img,
      }
    }),
  )
}

export async function getData(lang: Language) {
  const [profile, experience, projects, education, certificates] =
    await Promise.all([
      getProfile(lang),
      getExperience(lang),
      getProjects(lang),
      getEducation(lang),
      getCertificates(lang),
    ])

  return {
    profile,
    experience,
    projects,
    education,
    certificates,
  }
}

export async function getAllData() {
  const [es, en] = await Promise.all([getData("es"), getData("en")])

  return { es, en }
}
