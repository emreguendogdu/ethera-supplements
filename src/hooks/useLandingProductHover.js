"use client"

import { useState, useEffect, useCallback } from "react"

const useLandingProductHover = (selected, isMobile) => {
  const [hovered, setHovered] = useState(false)

  const handlePointerOver = useCallback(
    (e) => {
      if (!selected && !isMobile) {
        e.stopPropagation()
        setHovered(true)
      }
    },
    [selected, isMobile]
  )

  const handlePointerOut = useCallback(() => {
    if (!selected && !isMobile) setHovered(false)
  }, [selected, isMobile])

  useEffect(() => {
    if (isMobile) return
    document.body.style.cursor = hovered ? "pointer" : "auto"
    return () => {
      document.body.style.cursor = "auto"
    }
  }, [hovered, isMobile])

  return { hovered, handlePointerOver, handlePointerOut }
}

export default useLandingProductHover
