import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

const DATABASE_IDS = {
  profile: process.env.NOTION_PROFILE_DB_ID,
  experience: process.env.NOTION_EXPERIENCE_DB_ID,
  projects: process.env.NOTION_PROJECTS_DB_ID,
  education: process.env.NOTION_EDUCATION_DB_ID,
  certificates: process.env.NOTION_CERTIFICATES_DB_ID
}

async function queryDatabase (databaseId: string) {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'show',
      checkbox: { equals: true }
    },
    sorts: [{
      property: 'id',
      direction: 'descending'
    }]
  })
  return response.results
}

export async function getProfile () {
  const results = await queryDatabase(DATABASE_IDS.profile ?? '')
  const page = results[0]
  const { properties } = page as any
  return {
    id: properties.id?.number || '',
    name: properties.name?.title?.[0]?.plain_text || '',
    description: properties.description?.rich_text?.[0]?.plain_text || '',
    location: properties.location?.rich_text?.[0]?.plain_text || '',
    contactEmail: properties.contactEmail?.rich_text?.[0]?.plain_text || '',
    technologies: properties.technologies?.multi_select?.map((tag: { name: string }) => tag.name) || [],
    avatar: properties.avatar?.files?.[0]?.file?.url || '',
    workLabel: properties.workLabel?.rich_text?.[0]?.plain_text || '',
    workUrl: properties.workUrl?.url || ''
  }
}

export async function getExperience () {
  const results = await queryDatabase(DATABASE_IDS.experience ?? '')
  return results.map((page) => {
    const { properties } = page as any
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

export async function getProjects () {
  const results = await queryDatabase(DATABASE_IDS.projects ?? '')
  return results.map((page) => {
    const { properties } = page as any
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

export async function getEducation () {
  const results = await queryDatabase(DATABASE_IDS.education ?? '')
  return results.map((page) => {
    const { properties } = page as any
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

export async function getCertificates () {
  const results = await queryDatabase(DATABASE_IDS.certificates ?? '')
  return results.map((page) => {
    const { properties } = page as any
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
