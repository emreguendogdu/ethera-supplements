"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import useDeviceSize from "@/hooks/useDeviceSize"
import Bodybuilder from "@/components/3d/Bodybuilder"
import { Loader, PerspectiveCamera } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useMotionValueEvent, useTransform } from "motion/react"

// Helper functions
const lerp = (start, end, alpha) => start + (end - start) * alpha

// Configuration
const CONFIG = {
  transition: {
    type: "spring",
    stiffness: 25,
    damping: 5,
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
  const currentIntensityRef = useRef(CONFIG.lights.pulsing.baseIntensity)

  // STATE FOR POSITION AND ROTATION - key for direct DOM updates
  const [modalRotateZ, setModalRotateZ] = useState(-3.25)
  const [modalPosY, setModalPosY] = useState(isMobile ? -5 : -8.1)
  const [pulsingLightIntensity, setPulsingLightIntensity] = useState(
    CONFIG.lights.pulsing.baseIntensity
  )
  const [movingLightForward, setMovingLightForward] = useState(true)

  // Define transforms
  const modalPosYValue = useTransform(
    scrollYProgress,
    [0, 1],
    [isMobile ? -5 : -8.1, isMobile ? -3.5 : -7],
    CONFIG.transition
  )

  const modalRotateZValue = useTransform(
    scrollYProgress,
    [0, 1],
    [-3.25, -0.05],
    CONFIG.transition
  )

  const pulsingLightIntensityValue = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      CONFIG.lights.pulsing.baseIntensity,
      CONFIG.lights.pulsing.baseIntensity,
      0,
    ]
  )

  // Connect motion values to state
  useMotionValueEvent(scrollYProgress, "change", () => {
    setModalRotateZ(modalRotateZValue.get())
    setModalPosY(modalPosYValue.get())
    setPulsingLightIntensity(pulsingLightIntensityValue.get())
  })

  // Handle mobile updates
  useEffect(() => {
    if (isMobile) {
      setModalPosY(-5)
    }
  }, [isMobile])

  // Animation loop
  useFrame(({ clock }) => {
    // Handle pulsing light
    if (pulsingLightRef.current) {
      const pulsingLightAnimation =
        0.15 + Math.sin(clock.getElapsedTime()) * 0.15
      const targetIntensity =
        window.scrollY < 100 ? pulsingLightAnimation : pulsingLightIntensity

      // Smooth transition
      currentIntensityRef.current = lerp(
        currentIntensityRef.current,
        targetIntensity,
        0.05
      )
      pulsingLightRef.current.intensity = currentIntensityRef.current
    }

    // Handle moving light
    if (movingLightRef.current) {
      // Update position based on direction
      movingLightForward
        ? (movingLightRef.current.position.x += CONFIG.lights.moving.speed)
        : (movingLightRef.current.position.x -= CONFIG.lights.moving.speed)

      // Change direction when reaching bounds
      if (movingLightRef.current.position.x >= CONFIG.lights.moving.bounds) {
        setMovingLightForward(false)
      } else if (
        movingLightRef.current.position.x <= -CONFIG.lights.moving.bounds
      ) {
        setMovingLightForward(true)
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
          position={[-0.05, modalPosY, -6]}
          rotation={[-1.57, 0, modalRotateZ]}
          scale={isMobile ? 0.65 : 1}
        />
      </Suspense>
    </>
  )
}

export default function HeroCanvas({ scrollYProgress }) {
  return (
    <div
      id="canvas-container"
      className="sticky top-0 h-screen w-full translate-y-36 -z-10"
    >
      <Canvas>
        <Environment scrollYProgress={scrollYProgress} />
      </Canvas>
      <Loader />
    </div>
  )
}
