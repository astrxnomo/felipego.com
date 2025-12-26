import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"

export type NotionBlock = BlockObjectResponse

export interface RichText {
  type: "text"
  text: {
    content: string
    link: { url: string } | null
  }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  plain_text: string
  href: string | null
}

export interface TransformedBlock {
  id: string
  type: string
  content: any
  children?: TransformedBlock[]
}

export interface NotionText {
  plain_text: string
}

export interface NotionFile {
  file?: {
    url: string
  }
  external?: {
    url: string
  }
}

export interface NotionMultiSelect {
  name: string
}

export interface NotionPage {
  id: string
  properties: Record<
    string,
    {
      id: string
      type: string
      title?: NotionText[]
      rich_text?: NotionText[]
      url?: string
      files?: NotionFile[]
      multi_select?: NotionMultiSelect[]
      checkbox?: boolean
      date?: {
        start: string
        end?: string
      }
    }
  >
}

export interface Certificate {
  id: string
  time: string
  title: string
  certificatorUrl: string
  certificatorName: string
  credentialUrl: string
  img: string
}

export interface Experience {
  id: string
  time: string
  title: string
  companyUrl: string
  companyName: string
  description: string
}

export interface Project {
  id: string
  slug: string
  title: string
  description: string
  blocks?: TransformedBlock[]
  technologies: string[]
  githubLink?: string
  previewLink?: string
  img: string
}

export interface Education {
  id: string
  time: string
  title: string
  educationName: string
  educationUrl: string
  details: string[]
}

export interface Profile {
  id: string
  name: string
  description: string
  location: string
  contactEmail: string
  technologies: string[]
  img: string
  workLabel: string
  workUrl: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  description: string
  blocks?: TransformedBlock[]
  coverImage: string
  author: string
  publishedAt: string
  tags: string[]
  readTime: string
}

export interface PageData {
  profile: Profile
  experience: Experience[]
  projects: Project[]
  education: Education[]
  certificates: Certificate[]
}
