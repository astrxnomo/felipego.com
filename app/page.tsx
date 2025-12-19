import { PageWrapper } from "@/components/page-wrapper"
import Certificates from "@/components/sections/certificates"
import EducationSection from "@/components/sections/education"
import Experience from "@/components/sections/experience"
import Header from "@/components/sections/header"
import Projects from "@/components/sections/projects"
import { getAllPageDataBothLangs } from "@/lib/notion/queries"

export default async function Page() {
  const data = await getAllPageDataBothLangs()

  return (
    <PageWrapper data={data}>
      <Header />
      <Experience />
      <Projects />
      <EducationSection />
      <Certificates />
    </PageWrapper>
  )
}
