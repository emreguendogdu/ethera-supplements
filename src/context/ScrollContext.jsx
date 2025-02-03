"use client"

import { useContext, useEffect, useState } from "react"
import { createContext } from "react"
import { ReactLenis, useLenis } from "lenis/react"

const ScrollContext = createContext()

export const ScrollProvider = ({ children }) => {
  const [allowScroll, setAllowScroll] = useState(true)
  const lenis = useLenis(() => {})

  useEffect(() => {
    if (lenis) {
      if (allowScroll) {
        lenis.start()
      } else {
        lenis.stop()
      }
    }
  }, [allowScroll, lenis])

  return (
    <ScrollContext.Provider value={{ allowScroll, setAllowScroll }}>
      <ReactLenis root>{children}</ReactLenis>
    </ScrollContext.Provider>
  )
}

export const useScrollContext = () => {
  return useContext(ScrollContext)
}
