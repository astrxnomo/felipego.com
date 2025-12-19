"use client"

import { useTheme } from "next-themes"
import { useState } from "react"
import { ThemeToggleButton, useThemeTransition } from "./theme-toggle-button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { startTransition } = useThemeTransition()
  const [mounted] = useState(true)

  if (!mounted) {
    return null
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
