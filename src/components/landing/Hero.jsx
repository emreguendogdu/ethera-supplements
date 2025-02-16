"use client"

import Bodybuilder from "@/components/3d/Bodybuilder"
import { CopyIcon } from "@/components/icons/Copy"
import { discountCode } from "@/data"
import { PerspectiveCamera } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react"
import { Suspense, useEffect, useRef, useState } from "react"
import Button from "@/components/ui/Button"
import useDeviceSize from "@/hooks/useDeviceSize"
import LandingPreloader from "@/components/ui/LandingPreloader"
import { easeInOut } from "motion"

function HandleModalLoad({ load }) {
  useEffect(() => {
    load(true)
    return () => load(false)
  }, [])
}

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

  const [width, height, isMobile] = useDeviceSize()

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
      <Suspense fallback={<HandleModalLoad load={modalLoaded} />}>
        <Bodybuilder
          position={[-0.05, posY, -6]}
          rotation={[-1.57, 0, rotateZ]}
          scale={isMobile ? 0.65 : 1}
        />
      </Suspense>
    </>
  )
}

export default function Hero() {
  const heroRef = useRef()
  const [DISCOUNT_CODE_COPIED, SET_DISCOUNT_CODE_COPIED] = useState(false)

  const [modalIsLoading, modalLoaded] = useState(false)

  const { scrollYProgress } = useScroll()

  const contentDivOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const contentDivScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.5])
  const contentDivY = useTransform(scrollYProgress, [0, 0.25], [0, -125])

  const copyDiscountCode = () => {
    navigator.clipboard.writeText(discountCode.code)
    SET_DISCOUNT_CODE_COPIED(true)
    setTimeout(() => {
      SET_DISCOUNT_CODE_COPIED(false)
    }, 1500) // Hide notification after 1.5 seconds
  }

  return (
    <>
      {modalIsLoading && <LandingPreloader />}
      <motion.section id="hero" className="h-[300vh]" ref={heroRef}>
        <div className="fixed top-0 w-full h-screen -z-10">
          <div
            id="canvas-container"
            className="sticky top-0 h-screen w-full translate-y-36 -z-10"
          >
            <Canvas>
              <Environment
                modalLoaded={modalLoaded}
                scrollYProgress={scrollYProgress}
              />
            </Canvas>
          </div>
        </div>
        <motion.div
          className="sticky top-0 h-screen select-none flex flex-col justify-center gap-4 py-20 md:py-0 px-sectionX-m md:px-0 md:grid md:grid-cols-8 md:grid-rows-8"
          style={{
            opacity: contentDivOpacity,
            scale: contentDivScale,
            y: contentDivY,
          }}
        >
          <div className="col-start-2 col-span-6 row-start-3 row-span-6">
            <h1 className="uppercase">
              Build muscle. <br />
              Boost strength. <br /> No BS.
            </h1>
          </div>
          <div className="col-start-5 col-end-7 row-start-5 row-span-4 flex flex-col gap-4">
            <p>
              Ethera is a <strong>supplement</strong> brand that aims
              minimalistic purity with the best products available.
            </p>
            <div className="flex items-center">
              <p className="subheading inline-block">20% off code: </p>
              <button
                onClick={copyDiscountCode}
                className="ml-1 bg-gradient-radial from-white via-white to-gray-400 text-black px-3 py-1 rounded-lg uppercase font-bold inline-block"
              >
                {DISCOUNT_CODE_COPIED ? "Copied!" : "ETHERA"}
                {!DISCOUNT_CODE_COPIED && (
                  <CopyIcon className="relative inline ml-1 -translate-y-1/4" />
                )}
              </button>
            </div>
            <div className="relative w-3/5">
              <Button>Shop Now</Button>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </>
  )
}
