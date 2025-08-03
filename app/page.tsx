import Certificates from "@/components/certificates"
import Education from "@/components/education"
import Experience from "@/components/experience"
import FloatingNav from "@/components/floating-nav"
import Footer from "@/components/footer"
import Header from "@/components/header"
import Projects from "@/components/projects/projects-card"

export default function Index() {
  return (
    <>
      <div id="home">
        <Header />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="education">
        <Education />
      </div>
      <div id="certificates">
        <Certificates />
      </div>
      <Footer />
      <FloatingNav />
    </>
  )
}
