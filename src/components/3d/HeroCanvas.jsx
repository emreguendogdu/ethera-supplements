"use client"

import { Suspense, useRef } from "react"
import { Loader, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Bodybuilder from "@/components/3d/Bodybuilder"
import useDeviceSize from "@/hooks/useDeviceSize"
import useElementInView from "@/hooks/useElementInView"
import useHeroEnvironmentAnimation, {
  CONFIG,
} from "@/hooks/useHeroEnvironmentAnimation"

function Environment({ scrollYProgress, isInView, isMobile }) {
  const {
    pulsingLightRef,
    movingLightRef,
    bodybuilderRef,
    modelPosition,
    modelRotation,
  } = useHeroEnvironmentAnimation({
    scrollYProgress,
    isInView,
    isMobile,
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
  const containerRef = useRef(null)
  const isInView = useElementInView(containerRef, 0.25)
  const { isMobile } = useDeviceSize()

  return (
    <div
      id="canvas-container"
      className="fixed top-0 h-screen w-full translate-y-36 -z-20"
      ref={containerRef}
    >
      <Canvas>
        <Environment
          scrollYProgress={scrollYProgress}
          isInView={isInView}
          isMobile={isMobile}
        />
      </Canvas>
      <Loader />
    </div>
  )
}
