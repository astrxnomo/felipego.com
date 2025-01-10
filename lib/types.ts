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
  title: string
  description: string
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
