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
      <div className="relative w-full overflow-hidden rounded-lg">
        <Image
          src={url}
          alt={captionText || "Image"}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
          style={{ width: "100%", height: "auto" }}
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
