"use client"

import { Link2 } from "lucide-react"
import React, { type HTMLAttributes, useState } from "react"

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
}

export function HeadingLink({ level, children, ...props }: HeadingProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Generate slug from children
  const text = typeof children === "string" ? children : ""
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  const Tag = `h${level}` as const

  const classNames = {
    1: "text-foreground mt-12 mb-6 text-3xl font-bold",
    2: "text-foreground mt-10 mb-4 text-2xl font-semibold",
    3: "text-foreground mt-8 mb-3 text-xl font-semibold",
    4: "text-foreground mt-6 mb-3 text-lg font-semibold",
    5: "text-foreground mt-5 mb-2 text-base font-semibold",
    6: "text-foreground mt-5 mb-2 text-sm font-semibold",
  }

  const headingProps = {
    id: slug,
    className: `group flex scroll-mt-20 items-center gap-2 ${classNames[level]}`,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    ...props,
  }

  return React.createElement(
    Tag,
    headingProps,
    React.createElement(
      "a",
      { href: `#${slug}`, className: "flex items-center gap-2" },
      children,
      React.createElement(Link2, {
        className: `text-muted-foreground size-4 transition-opacity ${
          isHovered ? "opacity-100" : "opacity-0"
        }`,
      }),
    ),
  )
}
