import * as sdk from "node-appwrite"

const client = new sdk.Client()

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!)

const storage = new sdk.Storage(client)
const sites = new sdk.Sites(client)

export { sites, storage }

