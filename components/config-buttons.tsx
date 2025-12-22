"use client"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { usePathname } from "next/navigation"

export function ConfigButtons() {
  const pathname = usePathname()
  const isBlogRoute =
    pathname?.startsWith("/blog") || pathname?.startsWith("/es/blog")

  if (isBlogRoute) {
    return null
  }

  return (
    <div className="fixed right-0 z-20 flex gap-2 p-5">
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  )
}
