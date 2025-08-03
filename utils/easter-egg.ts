"use client"

import { useEffect, useState } from "react"

export function useEasterEgg() {
  const [isPartyMode, setIsPartyMode] = useState(false)
  const [konamiSequence] = useState([
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ])
  const [inputSequence, setInputSequence] = useState<string[]>([])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setInputSequence((prev) => {
        const newSequence = [...prev, event.code].slice(-konamiSequence.length)

        if (
          newSequence.length === konamiSequence.length &&
          newSequence.every((key, index) => key === konamiSequence[index])
        ) {
          setIsPartyMode(!isPartyMode)
          // Add some visual feedback
          document.body.classList.toggle("party-mode")
          return []
        }

        return newSequence
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [konamiSequence, isPartyMode])

  return { isPartyMode }
}
