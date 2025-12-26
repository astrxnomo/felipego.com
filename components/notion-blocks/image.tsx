"use client"

import type { RichText as RichTextType } from "@/lib/notion/types"
import { getPlainText } from "@/lib/utils"
import Image from "next/image"

interface ImageBlockProps {
  url: string
  caption?: RichTextType[]
}

export function ImageBlock({ url, caption }: ImageBlockProps) {
  const captionText = caption ? getPlainText(caption) : ""

  return (
    <figure className="my-8">
      <div className="border-border relative h-96 w-full overflow-hidden rounded-lg border shadow-sm">
        <Image
          src={url}
          alt={captionText || "Image"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
        />
      </div>
      {captionText && (
        <figcaption className="text-muted-foreground mt-2 text-center text-sm">
          {captionText}
        </figcaption>
      )}
    </figure>
  )
}
