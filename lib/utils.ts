import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { RichText } from "./notion/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper para extraer texto plano de rich text
export function getPlainText(richText: RichText[]): string {
  return richText.map((t) => t.plain_text).join("")
}

// Helper para generar IDs de headings
export function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

// Helper para verificar si una URL es de Notion (necesita regeneración)
export function isNotionHostedUrl(url: string): boolean {
  return url.includes("s3.us-west-2.amazonaws.com/secure.notion-static.com")
}
