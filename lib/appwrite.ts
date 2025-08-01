const sdk = require("node-appwrite")

let client = new sdk.Client()

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!)

let storage = new sdk.Storage(client)
let sites = new sdk.Sites(client)

export { sites, storage }
