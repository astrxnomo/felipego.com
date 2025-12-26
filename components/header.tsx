"use client"
import { Home, Newspaper } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import { SpainFlag } from "./ui/spain-flag"
import { ThemeToggle } from "./ui/theme-toggle"
import { USAFlag } from "./ui/usa-flag"

export function Header() {
  const pathname = usePathname()
  const isSpanish = pathname.startsWith("/es")
  const isBlogRoute = pathname.includes("/blog")
  const langPrefix = isSpanish ? "/es" : ""

  return (
    <>
      <div className="bg-background/50 fixed right-0 bottom-0 z-20 m-1 flex gap-2 rounded p-1 backdrop-blur-md lg:bottom-auto lg:m-3">
        <Button variant="outline" size="icon-lg" asChild>
          <Link
            href={
              isSpanish
                ? pathname.replace(/^\/es/, "") || "/"
                : `/es${pathname}`
            }
            scroll={false}
          >
            {isSpanish ? <SpainFlag /> : <USAFlag />}
            <span className="sr-only">
              {isSpanish ? "Switch to English" : "Cambiar a español"}
            </span>
          </Link>
        </Button>
        <ThemeToggle />
      </div>
      <div className="bg-background/50 fixed bottom-0 left-0 z-20 m-1 rounded p-1 backdrop-blur-md lg:bottom-auto lg:m-3">
        <Button variant="outline" size={isBlogRoute ? "icon-lg" : "lg"} asChild>
          <Link
            href={isBlogRoute ? langPrefix || "/" : `${langPrefix}/blog`}
            className="flex gap-2"
          >
            {isBlogRoute ? (
              <Home />
            ) : (
              <>
                <Newspaper className="size-4" />
                Blog
              </>
            )}
          </Link>
        </Button>
      </div>
    </>
  )
}
