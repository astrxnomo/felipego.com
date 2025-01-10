/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ["prod-files-secure.s3.us-west-2.amazonaws.com"],
    unoptimized: true,
  },
}

export default config
