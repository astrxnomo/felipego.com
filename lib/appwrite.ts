import { Client, Sites, Storage } from "node-appwrite"

export const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID ?? ""
export const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? ""
export const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? ""

let client: Client | null = null
let storage: Storage | null = null
let sites: Sites | null = null

function getClient(): Client {
  if (!client) {
    client = new Client()
    client
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
      .setKey(process.env.APPWRITE_API_KEY!)
  }
  return client
}

export function getStorage(): Storage {
  if (!storage) {
    storage = new Storage(getClient())
  }
  return storage
}

export function getSites(): Sites {
  if (!sites) {
    sites = new Sites(getClient())
  }
  return sites
}
