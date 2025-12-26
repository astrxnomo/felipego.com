import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { RichText } from "./notion/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPlainText(richText: RichText[]): string {
  return richText.map((t) => t.plain_text).join("")
}

export function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}
