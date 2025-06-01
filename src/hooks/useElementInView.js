"use client"

import { useEffect, useState } from "react"

const useElementInView = (ref, threshold = 0.25) => {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref?.current) return
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref, threshold])

  return isInView
}

export default useElementInView
