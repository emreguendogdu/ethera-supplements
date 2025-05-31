"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"

const lerp = (start, end, alpha) => start + (end - start) * alpha

export const CONFIG = {
  transition: { smoothFactor: 0.1 },
  lights: {
    ambient: { intensity: 0.22 },
    pulsing: { position: [-10, 5, 5], baseIntensity: 0.35, pulseRange: 0.15 },
    moving: {
      position: [-10, 5, 5],
      intensity: 0.1,
      speed: 0.0375,
      bounds: 10,
    },
  },
  modal: {
    posY: {
      start: { mobile: -5, desktop: -8.1 },
      end: { mobile: -3.5, desktop: -7 },
    },
    rotateZ: { start: -3.25, end: -0.05 },
  },
}

const useHeroEnvironmentAnimation = ({
  scrollYProgress,
  isInView,
  isMobile,
}) => {
  const pulsingLightRef = useRef()
  const movingLightRef = useRef()
  const bodybuilderRef = useRef()
  const currentIntensityRef = useRef(CONFIG.lights.pulsing.baseIntensity)
  const movingLightForwardRef = useRef(true)

  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollProgressRef = useRef(0)

  const [modelPosition, setModelPosition] = useState([
    -0.05,
    isMobile ? CONFIG.modal.posY.start.mobile : CONFIG.modal.posY.start.desktop,
    -6,
  ])
  const [modelRotation, setModelRotation] = useState([
    -1.57,
    0,
    CONFIG.modal.rotateZ.start,
  ])

  useEffect(() => {
    if (!scrollYProgress) return
    const unsubscribe = scrollYProgress.on("change", (newValue) => {
      scrollProgressRef.current = newValue
      setScrollProgress(newValue)
    })
    return () => unsubscribe && unsubscribe()
  }, [scrollYProgress])

  useEffect(() => {
    const targetPosY = lerp(
      isMobile
        ? CONFIG.modal.posY.start.mobile
        : CONFIG.modal.posY.start.desktop,
      isMobile ? CONFIG.modal.posY.end.mobile : CONFIG.modal.posY.end.desktop,
      scrollProgress
    )
    const targetRotZ = lerp(
      CONFIG.modal.rotateZ.start,
      CONFIG.modal.rotateZ.end,
      scrollProgress
    )
    setModelPosition([-0.05, targetPosY, -6])
    setModelRotation([-1.57, 0, targetRotZ])
  }, [scrollProgress, isMobile])

  useFrame(({ clock }) => {
    if (!isInView) return

    if (pulsingLightRef.current) {
      const pulsingLightAnimation =
        CONFIG.lights.pulsing.baseIntensity +
        Math.sin(clock.getElapsedTime()) * CONFIG.lights.pulsing.pulseRange

      const targetIntensity =
        scrollProgressRef.current < 0.1
          ? pulsingLightAnimation
          : scrollProgressRef.current > 0.5
          ? lerp(
              CONFIG.lights.pulsing.baseIntensity,
              0,
              (scrollProgressRef.current - 0.5) * 2
            )
          : CONFIG.lights.pulsing.baseIntensity

      currentIntensityRef.current = lerp(
        currentIntensityRef.current,
        targetIntensity,
        CONFIG.transition.smoothFactor
      )

      pulsingLightRef.current.intensity = currentIntensityRef.current
    }

    if (movingLightRef.current) {
      movingLightForwardRef.current
        ? (movingLightRef.current.position.x += CONFIG.lights.moving.speed)
        : (movingLightRef.current.position.x -= CONFIG.lights.moving.speed)

      if (movingLightRef.current.position.x >= CONFIG.lights.moving.bounds) {
        movingLightForwardRef.current = false
      } else if (
        movingLightRef.current.position.x <= -CONFIG.lights.moving.bounds
      ) {
        movingLightForwardRef.current = true
      }
    }
  })

  return {
    pulsingLightRef,
    movingLightRef,
    bodybuilderRef,
    modelPosition,
    modelRotation,
  }
}

export default useHeroEnvironmentAnimation
