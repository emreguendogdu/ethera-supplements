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
        // Scrollbar hidden
        // document.body.style.overflow = "visible"
      } else {
        // Set window x y to 0
        lenis.stop()
        // Scrollbar visible
        // document.body.style.overflow = "hidden"
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
