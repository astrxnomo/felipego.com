import {
  type DataSourceCategory,
  getDataSourceId,
  getFallbackLanguage,
  type Language,
  notion,
} from "./client"
import { fetchPageBlocks } from "./transformer"
import type {
  BlogPost,
  Certificate,
  Education,
  Experience,
  NotionPage,
  Profile,
  Project,
  TransformedBlock,
} from "./types"

export async function getNotionBlocks(
  pageId: string,
): Promise<TransformedBlock[]> {
  try {
    const blocks = await fetchPageBlocks(pageId)
    console.log(`Fetched ${blocks.length} blocks for page ${pageId}`)
    return blocks
  } catch (error) {
    console.error(`Error fetching page blocks for ${pageId}:`, error)
    return []
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
  const img =
    properties.img?.files?.[0]?.file?.url ??
    properties.img?.files?.[0]?.external?.url ??
    ""

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

  const projects = await Promise.all(
    results.map(async (page) => {
      const { properties } = page
      const slug = properties.slug?.rich_text?.[0]?.plain_text || ""

      const title = properties.title?.title?.[0]?.plain_text ?? "Project"
      const img =
        properties.img?.files?.[0]?.file?.url ??
        properties.img?.files?.[0]?.external?.url ??
        ""

      return {
        id: page.id,
        slug,
        title,
        description: properties.description?.rich_text?.[0]?.plain_text ?? "",
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

  return projects.filter((project) => project.slug)
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
      const img =
        properties.img?.files?.[0]?.file?.url ??
        properties.img?.files?.[0]?.external?.url ??
        ""

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

// Blog queries
export async function getBlogPosts(lang: Language): Promise<BlogPost[]> {
  const results = await queryDataSource<NotionPage>("blog", lang)

  const posts = await Promise.all(
    results.map(async (page) => {
      const props = page.properties
      const slug = props.slug?.rich_text?.[0]?.plain_text || ""

      const title = props.title?.title?.[0]?.plain_text || ""
      const coverImage =
        props.cover?.files?.[0]?.file?.url ??
        props.cover?.files?.[0]?.external?.url ??
        ""

      return {
        id: page.id,
        slug,
        title,
        description: props.description?.rich_text?.[0]?.plain_text || "",
        coverImage,
        author: props.author?.rich_text?.[0]?.plain_text || "",
        publishedAt: props.publishedAt?.date?.start || "",
        tags: props.tags?.multi_select?.map((tag) => tag.name) || [],
        readTime: props.readTime?.rich_text?.[0]?.plain_text || "5 min",
      }
    }),
  )

  return posts.filter((post) => post.slug)
}

export async function getBlogPost(
  slug: string,
  lang: Language,
): Promise<BlogPost | null> {
  const posts = await getBlogPosts(lang)
  const post = posts.find((p) => p.slug === slug)

  if (!post) return null

  // Load blocks with new transformer
  post.blocks = await getNotionBlocks(post.id)

  return post
}

export async function getAllBlogSlugs(lang: Language): Promise<string[]> {
  const posts = await getBlogPosts(lang)
  return posts.map((post) => post.slug)
}

export async function getProject(
  slug: string,
  lang: Language,
): Promise<Project | null> {
  const projects = await getProjects(lang)
  const project = projects.find((p) => p.slug === slug)

  if (!project) return null

  // Load blocks with new transformer
  project.blocks = await getNotionBlocks(project.id)

  return project
}

export async function getAllProjectSlugs(lang: Language): Promise<string[]> {
  const projects = await getProjects(lang)
  return projects.map((project) => project.slug)
}
