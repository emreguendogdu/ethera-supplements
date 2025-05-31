"use client"

import { useFrame } from "@react-three/fiber"
import { easing } from "maath"

const useLandingProductAnimation = ({
  ref,
  CFG,
  positionKey,
  selected,
  hovered,
  shouldAnimate = true,
}) => {
  useFrame((state, delta) => {
    if (!shouldAnimate) return

    const targetPosition = CFG[positionKey].position
    const targetRotation =
      selected || hovered
        ? [0, Math.sin(state.clock.getElapsedTime()) * 0.125, 0]
        : [0, Math.sin(state.clock.getElapsedTime() * 0.75) * 0.0625, 0]
    const targetScale = hovered
      ? CFG[positionKey].scale + 0.05
      : CFG[positionKey].scale

    easing.damp3(ref.current.position, targetPosition, 0.35, delta)
    easing.damp3(ref.current.rotation, targetRotation, 0.25, delta)
    easing.damp3(
      ref.current.scale,
      [targetScale, targetScale, targetScale],
      0.1,
      delta
    )
  })
}

export default useLandingProductAnimation
