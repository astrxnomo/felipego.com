import { put } from '@vercel/blob'

export const isNotionUrl = (url: string): boolean => {
  return url.startsWith('https://prod-files-secure.s3.us-west-2.amazonaws.com') ||
         url.startsWith('https://s3.us-west-2.amazonaws.com') ||
          url.startsWith('https://img.notionusercontent.com')
}

export async function uploadToVercelBlob (url: string, filename: string): Promise<string> {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const { url: blobUrl } = await put(filename, blob, { access: 'public' })
    return blobUrl
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error)
    return url // Return original URL if upload fails
  }
}

export async function processImageUrl (url: string, id: string, prefix: string): Promise<string> {
  if (isNotionUrl(url)) {
    return await uploadToVercelBlob(url, `${prefix}-${id}.jpg`)
  }
  return url
}
