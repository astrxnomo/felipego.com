"use client"

import { useEffect, useRef } from "react"

export default function Card({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={cardRef}
      className="bg-background group flex flex-col gap-6 overflow-hidden rounded-xl border p-8 opacity-0 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-400/5"
    >
      {children}
    </section>
  )
}
