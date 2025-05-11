"use client"

import { useFrame } from "@react-three/fiber"
import { easing } from "maath"

export const useProductAnimation = ({ ref, position, rotation, scale }) => {
  useFrame((state, delta) => {
    easing.damp3(ref.current.position, position, 0.35, delta)
    easing.damp3(ref.current.rotation, rotation(state), 0.25, delta)
    easing.damp3(ref.current.scale, [scale, scale, scale], 0.1, delta)
  })
}
