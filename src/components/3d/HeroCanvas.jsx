"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import useDeviceSize from "@/hooks/useDeviceSize"
import { easeInOut } from "motion"
import Bodybuilder from "@/components/3d/Bodybuilder"
import { Loader, PerspectiveCamera } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useMotionValueEvent, useTransform } from "motion/react"

const modalTransition = {
  type: "spring",
  stiffness: 25,
  damping: 5,
}

const lerp = (start, end, alpha) => start + (end - start) * alpha

function Environment({ scrollYProgress }) {
  const pulsingLightRef = useRef()
  const movingLightRef = useRef()

  const [modalRotateZ, setModalRotateZ] = useState(-3.25)
  const [modalPosY, setModalPosY] = useState(-8.1)

  const [pulsingLightIntensity, setPulsingLightIntensity] = useState(0.35)
  const [movingLightForward, setMovingLightForward] = useState(true)
  const [currentIntensity, setCurrentIntensity] = useState(0.35) // Smooth value

  useFrame(({ clock }) => {
    if (!pulsingLightRef.current) return

    const pulsingLightAnimation = 0.15 + Math.sin(clock.getElapsedTime()) * 0.15
    let targetIntensity =
      window.scrollY < 100 ? pulsingLightAnimation : pulsingLightIntensity

    // Blend towards target value (Smooth transition, prevents flickering)
    const newIntensity = lerp(currentIntensity, targetIntensity, 0.05)
    setCurrentIntensity(newIntensity)
    pulsingLightRef.current.intensity = newIntensity

    if (!movingLightRef.current) return

    movingLightForward
      ? (movingLightRef.current.position.x += 0.0375)
      : (movingLightRef.current.position.x -= 0.0375)

    movingLightRef.current.position.x >= 10
      ? setMovingLightForward(false)
      : movingLightRef.current.position.x <= -10 && setMovingLightForward(true)
  })

  const pulsingLightIntensityValue = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.35, 0.35, 0]
  )

  const { isMobile } = useDeviceSize()

  const modalPosYValue = useTransform(
    scrollYProgress,
    [0, 1],
    [isMobile ? -5 : -8.1, isMobile ? -3.5 : -7],
    modalTransition
  )
  const modalRotateZValue = useTransform(
    scrollYProgress,
    [0, 1],
    [-3.25, -0.05],
    modalTransition
  )

  useMotionValueEvent(scrollYProgress, "change", () => {
    setModalRotateZ(modalRotateZValue.get())
    setModalPosY(modalPosYValue.get())
    setPulsingLightIntensity(pulsingLightIntensityValue.get())
  })

  useEffect(() => {
    if (isMobile) {
      setModalPosY(-5)
    }
  }, [isMobile])

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 3, 0]} />
      <ambientLight intensity={0.22} />
      <directionalLight
        position={[-10, 5, 5]}
        intensity={pulsingLightIntensity}
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
