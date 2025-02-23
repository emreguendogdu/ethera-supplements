"use client"

import { useState, useEffect } from "react"

const useDeviceSize = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const handleWindowResize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)

    if (window.innerWidth < 768) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    }
  }, [])

  useEffect(() => {
    handleWindowResize()
    window.addEventListener("resize", handleWindowResize)

    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])

  return { width, height, isMobile }
}

export default useDeviceSize
