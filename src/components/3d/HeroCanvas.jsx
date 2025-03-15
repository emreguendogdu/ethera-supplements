"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import useDeviceSize from "@/hooks/useDeviceSize"
import Bodybuilder from "@/components/3d/Bodybuilder"
import { Loader, PerspectiveCamera } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useMotionValueEvent } from "motion/react"

const lerp = (start, end, alpha) => start + (end - start) * alpha

const CONFIG = {
  transition: {
    smoothFactor: 0.1,
  },
  lights: {
    ambient: {
      intensity: 0.22,
    },
    pulsing: {
      position: [-10, 5, 5],
      baseIntensity: 0.35,
      pulseRange: 0.15,
    },
    moving: {
      position: [-10, 5, 5],
      intensity: 0.1,
      speed: 0.0375,
      bounds: 10,
    },
  },
}

function Environment({ scrollYProgress }) {
  const { isMobile } = useDeviceSize()
  const pulsingLightRef = useRef()
  const movingLightRef = useRef()
  const bodybuilderRef = useRef()
  const currentIntensityRef = useRef(CONFIG.lights.pulsing.baseIntensity)
  const movingLightForwardRef = useRef(true)

  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollProgressRef = useRef(0)

  const [modelPosition, setModelPosition] = useState([
    -0.05,
    isMobile ? -5 : -8.1,
    -6,
  ])
  const [modelRotation, setModelRotation] = useState([-1.57, 0, -3.25])

  useMotionValueEvent(scrollYProgress, "change", () => {
    const newValue = scrollYProgress.get()
    scrollProgressRef.current = newValue
    setScrollProgress(newValue)
  })

  useEffect(() => {
    const targetPosY = lerp(
      isMobile ? -5 : -8.1,
      isMobile ? -3.5 : -7,
      scrollProgress
    )

    const targetRotZ = lerp(-3.25, -0.05, scrollProgress)

    setModelPosition([-0.05, targetPosY, -6])
    setModelRotation([-1.57, 0, targetRotZ])
  }, [scrollProgress, isMobile])

  useFrame(({ clock }) => {
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

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 3, 0]} />
      <ambientLight intensity={CONFIG.lights.ambient.intensity} />

      <directionalLight
        position={CONFIG.lights.pulsing.position}
        intensity={CONFIG.lights.pulsing.baseIntensity}
        ref={pulsingLightRef}
        castShadow
      />

      <directionalLight
        position={CONFIG.lights.moving.position}
        intensity={CONFIG.lights.moving.intensity}
        ref={movingLightRef}
        castShadow
      />

      <Suspense fallback={null}>
        <Bodybuilder
          ref={bodybuilderRef}
          position={modelPosition}
          rotation={modelRotation}
          scale={isMobile ? 0.65 : 1}
        />
      </Suspense>
    </>
  )
}

export default function HeroCanvas({ scrollYProgress }) {
  return (
    <div id="canvas-container" className="h-full w-full">
      <Canvas>
        <Environment scrollYProgress={scrollYProgress} />
      </Canvas>
      <Loader />
    </div>
  )
}
