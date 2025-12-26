"use client"

import { cn } from "@/lib/utils"
import { motion, SpringOptions, useScroll, useSpring } from "motion/react"
import { RefObject } from "react"

export type ScrollProgressProps = {
  className?: string
  springOptions?: SpringOptions
  containerRef?: RefObject<HTMLDivElement>
}

const DEFAULT_SPRING_OPTIONS: SpringOptions = {
  stiffness: 200,
  damping: 50,
  restDelta: 0.001,
}

export function ScrollProgress({
  className,
  springOptions,
  containerRef,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll({
    container: containerRef,
  })

  const scaleX = useSpring(scrollYProgress, {
    ...DEFAULT_SPRING_OPTIONS,
    ...(springOptions ?? {}),
  })

  return (
    <div className="pointer-events-none fixed top-0 left-0 z-50 hidden w-full md:block">
      <div className="bg-border absolute top-0 left-0 h-1 w-full" />
      <motion.div
        className={cn("inset-x-0 top-0 h-1 origin-left", className)}
        style={{
          scaleX,
        }}
      />
    </div>
  )
}
