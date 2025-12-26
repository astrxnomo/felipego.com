"use client"

import React, { type HTMLAttributes } from "react"

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6
  id?: string
  children: React.ReactNode
}

export function HeadingLink({ level, id, children, ...props }: HeadingProps) {
  // Use provided id or generate slug from children
  const slug =
    id ||
    (typeof children === "string"
      ? children
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      : "")

  const Tag = `h${level}` as const

  const classNames = {
    1: "text-foreground mt-12 mb-6 text-3xl font-semibold",
    2: "text-foreground mt-10 mb-4 text-2xl font-semibold",
    3: "text-foreground mt-8 mb-3 text-xl font-semibold",
    4: "text-foreground mt-6 mb-3 text-lg font-semibold",
    5: "text-foreground mt-5 mb-2 text-base font-semibold",
    6: "text-foreground mt-5 mb-2 text-sm font-semibold",
  }

  const headingProps = {
    id: slug,
    className: `group flex scroll-mt-20 items-center gap-2 ${classNames[level]}`,
    ...props,
  }

  return React.createElement(
    Tag,
    headingProps,
    React.createElement(
      "a",
      { href: `#${slug}`, className: "hover:opacity-80" },
      children,
    ),
  )
}
