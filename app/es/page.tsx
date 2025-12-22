import { HomeLayout } from "@/components/home-layout"
import { getData } from "@/lib/notion/queries"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Felipe Giraldo - Desarrollador Full Stack",
  description: "Portafolio de Felipe Giraldo - Desarrollador Full Stack",
  alternates: {
    canonical: "/es",
    languages: {
      en: "/",
      es: "/es",
    },
  },
}

export default async function SpanishPage() {
  const data = await getData("es")

  return <HomeLayout data={data} lang="es" />
}
