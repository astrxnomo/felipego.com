export interface NotionPage {
  id: string
  properties: Record<string, any>
}

export interface Certificate {
  id?: string
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
  avatar: string
  workLabel: string
  workUrl: string
}
