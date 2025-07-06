"use client"
import { useFrame } from "@react-three/fiber"

const DisableRender = (): null => {
  useFrame(() => null, 1000)
  return null
}

export default DisableRender
