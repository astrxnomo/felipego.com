import Certificates from "@/components/certificates"
import Education from "@/components/education"
import Experience from "@/components/experience"
import Footer from "@/components/footer"
import Header from "@/components/header"
import Projects from "@/components/projects"

export default function Index() {
  return (
    <>
      <Header />
      <Experience />
      <Projects />
      <Education />
      <Certificates />
      <Footer />
    </>
  )
}
