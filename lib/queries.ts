import { notion, DATABASE_IDS } from '@/lib/notion'
import { type NotionPage, type Certificate, type Experience, type Project, type Education, type Profile } from '@/lib/types'

async function queryDatabase<T> (databaseId: string): Promise<T[]> {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'show',
      checkbox: { equals: true }
    },
    sorts: [
      {
        property: 'id',
        direction: 'descending'
      }
    ]
  })
  return response.results as T[]
}

export async function getProfile (): Promise<Profile> {
  const results = await queryDatabase<NotionPage>(DATABASE_IDS.profile ?? '')
  const page = results[0]
  const { properties } = page
  return {
    id: properties.id?.number || '',
    name: properties.name?.title?.[0]?.plain_text || '',
    description: properties.description?.rich_text?.[0]?.plain_text || '',
    location: properties.location?.rich_text?.[0]?.plain_text || '',
    contactEmail: properties.contactEmail?.rich_text?.[0]?.plain_text || '',
    technologies: properties.technologies?.multi_select?.map((tag: { name: string }) => tag.name) || [],
    img: properties.img?.files?.[0]?.file?.url || '',
    workLabel: properties.workLabel?.rich_text?.[0]?.plain_text || '',
    workUrl: properties.workUrl?.url || ''
  }
}

export async function getExperience (): Promise<Experience[]> {
  const results = await queryDatabase<NotionPage>(DATABASE_IDS.experience ?? '')
  return results.map((page) => {
    const { properties } = page
    return {
      id: properties.id?.number || '',
      time: properties.time?.rich_text?.[0]?.plain_text || '',
      title: properties.title?.title?.[0]?.plain_text || '',
      companyUrl: properties.companyUrl?.url || '',
      companyName: properties.companyName?.rich_text?.[0]?.plain_text || '',
      description: properties.description?.rich_text?.[0]?.plain_text || ''
    }
  })
}

export async function getProjects (): Promise<Project[]> {
  const results = await queryDatabase<NotionPage>(DATABASE_IDS.projects ?? '')
  return results.map((page) => {
    const { properties } = page
    return {
      id: properties.id?.number || '',
      title: properties.title?.title?.[0]?.plain_text || '',
      description: properties.description?.rich_text?.[0]?.plain_text || '',
      technologies: properties.technologies?.multi_select?.map((tag: { name: string }) => tag.name) || [],
      githubLink: properties.githubLink?.url,
      previewLink: properties.previewLink?.url,
      img: properties.img?.files?.[0]?.file?.url || ''
    }
  })
}

export async function getEducation (): Promise<Education[]> {
  const results = await queryDatabase<NotionPage>(DATABASE_IDS.education ?? '')
  return results.map((page) => {
    const { properties } = page
    return {
      id: properties.id?.number || '',
      time: properties.time?.rich_text?.[0]?.plain_text || '',
      title: properties.title?.title?.[0]?.plain_text || '',
      educationName: properties.educationName?.rich_text?.[0]?.plain_text || '',
      educationUrl: properties.educationUrl?.url || '',
      details: properties.details?.multi_select?.map((item: { name: string }) => item.name) || []
    }
  })
}

export async function getCertificates (): Promise<Certificate[]> {
  const results = await queryDatabase<NotionPage>(DATABASE_IDS.certificates ?? '')
  return results.map((page) => {
    const { properties } = page
    return {
      id: properties.id?.number || '',
      slug: properties.slug?.rich_text?.[0]?.plain_text || '',
      time: properties.time?.rich_text?.[0]?.plain_text || '',
      title: properties.title?.title?.[0]?.plain_text || '',
      certificatorName: properties.certificatorName?.rich_text?.[0]?.plain_text || '',
      certificatorUrl: properties.certificatorUrl?.url || '',
      credentialUrl: properties.credentialUrl?.url || '',
      img: properties.img?.files?.[0]?.file?.url || ''
    }
  })
}
