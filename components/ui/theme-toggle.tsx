"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { ThemeToggleButton, useThemeTransition } from "./theme-toggle-button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { startTransition } = useThemeTransition()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[2.5rem] w-[2.5rem]" />
  }

  const handleToggle = () => {
    startTransition(() => {
      setTheme(theme === "dark" ? "light" : "dark")
    })
  }

  return (
    <ThemeToggleButton
      theme={theme === "dark" ? "dark" : "light"}
      onClick={handleToggle}
      variant="circle-blur"
      start="top-right"
    />
  )
}
