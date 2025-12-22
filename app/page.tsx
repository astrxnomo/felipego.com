import { HomeLayout } from "@/components/home-layout"
import { getData } from "@/lib/notion/queries"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Felipe Giraldo - Full Stack Developer",
  description: "Felipe Giraldo's Portfolio - Full Stack Developer",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      es: "/es",
    },
  },
}

export default async function Page() {
  const data = await getData("en")

  return <HomeLayout data={data} lang="en" />
}
