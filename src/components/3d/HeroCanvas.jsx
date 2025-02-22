"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import useDeviceSize from "@/hooks/useDeviceSize"
import { easeInOut } from "motion"
import Bodybuilder from "@/components/3d/Bodybuilder"
import { Loader, PerspectiveCamera } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useMotionValueEvent, useTransform } from "motion/react"

const lerp = (start, end, alpha) => start + (end - start) * alpha

function Environment({ scrollYProgress, modalLoaded }) {
  const pulsingLightRef = useRef()
  const movingLightRef = useRef()
  const [rotateZ, setRotateZ] = useState(-3.25)
  const [posY, setPosY] = useState(-8.1)
  const [lightIntensity, setLightIntensity] = useState(0.35)
  const [isMovingForward, setIsMovingForward] = useState(true)
  const [currentIntensity, setCurrentIntensity] = useState(0.35) // Smooth value

  useFrame(({ clock }) => {
    // Pulsing Light Animation

    if (!pulsingLightRef.current) return

    const pulsingLightAnimation = 0.15 + Math.sin(clock.getElapsedTime()) * 0.15
    let targetIntensity =
      window.scrollY < 100 ? pulsingLightAnimation : lightIntensity

    // Blend towards target value (Smooth transition, prevents flickering)
    const newIntensity = lerp(currentIntensity, targetIntensity, 0.05)
    setCurrentIntensity(newIntensity)

    // Apply to light
    pulsingLightRef.current.intensity = newIntensity

    // Moving Light Animation

    if (!movingLightRef.current) return

    isMovingForward
      ? (movingLightRef.current.position.x += 0.0375)
      : (movingLightRef.current.position.x -= 0.0375)

    movingLightRef.current.position.x >= 10
      ? setIsMovingForward(false)
      : movingLightRef.current.position.x <= -10 && setIsMovingForward(true)
  })

  const { isMobile } = useDeviceSize()

  const posYValue = useTransform(
    scrollYProgress,
    [0, 0.53],
    [isMobile ? -5 : -8.1, isMobile ? -3.5 : -7],
    { ease: easeInOut }
  )
  const rotateZValue = useTransform(
    scrollYProgress,
    [0, 0.53],
    [-3.25, -0.05],
    {
      ease: easeInOut,
    }
  )
  const lightIntensityValue = useTransform(
    scrollYProgress,
    [0, 0.35, 0.4, 0.55],
    [0.35, 0.5, 1.5, 0]
  )

  useMotionValueEvent(scrollYProgress, "change", () => {
    setRotateZ(rotateZValue.get())
    setPosY(posYValue.get())
    setLightIntensity(lightIntensityValue.get())
  })

  useEffect(() => {
    if (isMobile) {
      setPosY(-5)
    }
  }, [isMobile])

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 3, 0]} />
      <ambientLight intensity={0.22} />
      <directionalLight
        position={[-10, 5, 5]}
        intensity={lightIntensity}
        ref={pulsingLightRef}
        castShadow
      />
      <directionalLight
        position={[-10, 5, 5]}
        intensity={0.1}
        ref={movingLightRef}
        castShadow
      />
      <Suspense>
        <Bodybuilder
          position={[-0.05, posY, -6]}
          rotation={[-1.57, 0, rotateZ]}
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
