"use client"

import { motionValue } from "motion/react"
import { useContext, useState } from "react"
import { createContext } from "react"

const CanvasContext = createContext()

export const CanvasProvider = ({ children }) => {
  const [heroYProgress, setHeroYProgress] = useState(motionValue(0))
  return (
    <CanvasContext.Provider value={{ heroYProgress, setHeroYProgress }}>
      {children}
    </CanvasContext.Provider>
  )
}

export const useCanvasContext = () => {
  return useContext(CanvasContext)
}
