"use client"

import {
  useContext,
  useEffect,
  useState,
  createContext,
  ReactNode,
} from "react"
import { ReactLenis, useLenis } from "lenis/react"

interface ScrollContextType {
  allowScroll: boolean
  setAllowScroll: (allow: boolean) => void
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined)

interface ScrollProviderProps {
  children: ReactNode
}

export const ScrollProvider = ({ children }: ScrollProviderProps) => {
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
  const context = useContext(ScrollContext)
  if (context === undefined) {
    throw new Error("useScrollContext must be used within a ScrollProvider")
  }
  return context
}
