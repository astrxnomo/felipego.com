import { DATABASE_IDS, notion } from "@/lib/notion"
import {
  type Certificate,
  type Education,
  type Experience,
  type NotionPage,
  type Profile,
  type Project,
} from "@/lib/types"
import { exportImage } from "@/utils/images"

async function queryDatabase<T>(databaseId: string): Promise<T[]> {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "show",
      checkbox: { equals: true },
    },
    sorts: [
      {
        property: "id",
        direction: "descending",
      },
    ],
  })
  return response.results as T[]
}

export async function getProfile(): Promise<Profile> {
  const results = await queryDatabase<NotionPage>(DATABASE_IDS.profile ?? "")
  const page = results[0]
  if (!page) {
    throw new Error("No profile found")
  }
  const { properties } = page

  const name = properties.name?.title?.[0]?.plain_text ?? "profiles"
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

export async function getExperience(): Promise<Experience[]> {
  const results = await queryDatabase<NotionPage>(DATABASE_IDS.experience ?? "")
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

export async function getProjects(): Promise<Project[]> {
  const results = await queryDatabase<NotionPage>(DATABASE_IDS.projects ?? "")
  return await Promise.all(
    results.map(async (page) => {
      const { properties } = page

      const title = properties.title?.title?.[0]?.plain_text ?? "projects"
      const img = await exportImage(
        properties.img?.files?.[0]?.file?.url ??
          properties.img?.files?.[0]?.external?.url ??
          "",
        "projects",
        title,
        page.id,
      )

      return {
        id: page.id,
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
}

export async function getEducation(): Promise<Education[]> {
  const results = await queryDatabase<NotionPage>(DATABASE_IDS.education ?? "")
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

export async function getCertificates(): Promise<Certificate[]> {
  const results = await queryDatabase<NotionPage>(
    DATABASE_IDS.certificates ?? "",
  )
  return await Promise.all(
    results.map(async (page) => {
      const { properties } = page

      const title = properties.title?.title?.[0]?.plain_text ?? "certificates"
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
