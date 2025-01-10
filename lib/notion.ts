import { Client } from "@notionhq/client"

export const notion = new Client({ auth: process.env.NOTION_API_KEY })

export const DATABASE_IDS = {
  profile: process.env.NOTION_PROFILE_DB_ID,
  experience: process.env.NOTION_EXPERIENCE_DB_ID,
  projects: process.env.NOTION_PROJECTS_DB_ID,
  education: process.env.NOTION_EDUCATION_DB_ID,
  certificates: process.env.NOTION_CERTIFICATES_DB_ID,
} as const
