"use client"

import { useEffect, useState } from "react"
import { Home, Briefcase, FolderOpen, GraduationCap, Award } from "lucide-react"

const navigation = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Projects", href: "#projects", icon: FolderOpen },
  { name: "Education", href: "#education", icon: GraduationCap },
  { name: "Certificates", href: "#certificates", icon: Award },
]

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("home")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY > 100)

      // Determine active section based on scroll position
      const sections = navigation.map((item) => item.href.substring(1))
      let active = "home"

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            active = section
            break
          }
        }
      }
      setActiveSection(active)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const targetId = href.substring(1)
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  if (!isVisible) return null

  return (
    <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform">
      <div className="flex items-center gap-1 rounded-full bg-white/80 px-4 py-2 shadow-lg backdrop-blur-md dark:bg-neutral-900/80">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.href.substring(1)

          return (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={`group relative flex items-center justify-center rounded-full p-2 transition-all duration-200 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
              }`}
              aria-label={item.name}
            >
              <Icon className="h-4 w-4" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 transform rounded bg-neutral-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-white dark:text-neutral-900">
                {item.name}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
