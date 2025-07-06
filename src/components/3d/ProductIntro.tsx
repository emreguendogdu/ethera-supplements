"use client"

import { Loader, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Tub } from "@/components/3d/Tub"
import { animate } from "motion"
import { useEffect, useRef, useState } from "react"
import { AnimationSequence, motion } from "motion/react"
import useDeviceSize from "@/hooks/useDeviceSize"
import { useScrollContext } from "@/context/ScrollContext"
import { Suspense } from "react"
import { Group } from "three"
import DisableRender from "../DisableRender"

const transition = {
  duration: 1.5,
  ease: "easeOut",
  mass: 3,
}

interface AnimationSequenceParams {
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: { x: number; y: number; z: number }
  isMobile: boolean
}

const animationSequence = (
  position: AnimationSequenceParams["position"],
  rotation: AnimationSequenceParams["rotation"],
  scale: AnimationSequenceParams["scale"],
  isMobile: boolean
) => [
  ["#product-preloader-text", { y: 0 }, { ...transition, at: 0 }],
  [position, { y: 0 }, { ...transition, at: 0 }],
  [rotation, { x: 0, y: 0 }, { ...transition, at: 0 }],
  [position, { x: isMobile ? 0 : -2 }, { ...transition, at: 1.45 }],
  [rotation, { y: isMobile ? 0.15 : 1 }, { ...transition, at: 1.45 }],
  [
    scale,
    { x: isMobile ? 0.65 : 1, y: isMobile ? 0.65 : 1, z: isMobile ? 0.65 : 1 },
    { ...transition, at: 1.45 },
  ],
  [
    "#product-preloader-text",
    { scale: 0 },
    { duration: 0.25, ease: "easeOut", at: 2.25 },
  ],
  [
    "#product-preloader-text",
    { opacity: 0 },
    { duration: 0.25, ease: "easeOut", at: 2.25 },
  ],
  [
    "#product-preloader",
    { opacity: 0 },
    { duration: 0.25, ease: "easeOut", at: 2.25 },
  ],
  [
    "#product-preloader",
    { display: "none" },
    { duration: 0.25, ease: "easeOut", at: 2.25 },
  ],
]

interface EnvironmentProps {
  isLoaded: boolean
  setAllowScroll: (allow: boolean) => void
  slug: string
  isAnimationFinished: React.MutableRefObject<boolean>
  setShowPreloader: (show: boolean) => void
}

const Environment = ({
  isLoaded,
  setAllowScroll,
  slug,
  isAnimationFinished,
  setShowPreloader,
}: EnvironmentProps) => {
  const productRef = useRef<Group>(null)
  const { isMobile } = useDeviceSize()

  useEffect(() => {
    if (!window) return

    window.scrollTo(0, 0)
    setAllowScroll(false)
  }, [setAllowScroll])

  useEffect(() => {
    if (!productRef.current) return
    const { position, rotation, scale } = productRef.current

    const preloaderAnimate = async () => {
      await animate(
        animationSequence(
          position,
          rotation,
          scale,
          isMobile
        ) as AnimationSequence
      ).then(() => {
        isAnimationFinished.current = true
        setAllowScroll(true)
        setTimeout(() => {
          setShowPreloader(false)
        }, 250)
      })
    }

    if (isLoaded && !isAnimationFinished.current) {
      preloaderAnimate()
    }

    return () => {
      isAnimationFinished.current = false
    }
  }, [
    isLoaded,
    isMobile,
    setAllowScroll,
    isAnimationFinished,
    setShowPreloader,
  ])

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 5]} />
      <directionalLight position={[0, 0, -5]} />
      <directionalLight position={[0, 6, 0]} />
      <directionalLight position={[5, 0, 0]} />
      <directionalLight position={[-5, 0, 0]} />
      <group ref={productRef} position={[0, -3, 0]} rotation={[1, 0, 0]}>
        <Suspense fallback={null}>
          <Tub slug={slug} />
        </Suspense>
      </group>
    </>
  )
}

interface ProductIntroProps {
  slug: string
}

export default function ProductIntro({ slug }: ProductIntroProps) {
  const { setAllowScroll } = useScrollContext()
  const [isLoaded, setIsLoaded] = useState(false)
  const isAnimationFinished = useRef(false)
  const [loaderActive, setLoaderActive] = useState(true)
  const [showPreloader, setShowPreloader] = useState(true)

  const handleLoaderChange = (active: boolean) => {
    setTimeout(() => {
      setLoaderActive(active)
    }, 0)
    return active
  }

  useEffect(() => {
    setIsLoaded(!loaderActive)
  }, [loaderActive])

  return (
    <>
      {showPreloader && (
        <div
          id="product-preloader"
          className="w-full h-screen absolute inset-0 z-[100]"
        >
          <motion.div
            id="preloader-canvas-container"
            className="fixed w-full h-full z-[99] bg-black"
          >
            <Canvas camera={{ fov: 50 }}>
              {(!isLoaded || isAnimationFinished.current) && <DisableRender />}
              <Environment
                isLoaded={isLoaded}
                setAllowScroll={setAllowScroll}
                slug={slug}
                isAnimationFinished={isAnimationFinished}
                setShowPreloader={setShowPreloader}
              />
            </Canvas>
            <Loader initialState={handleLoaderChange} />
          </motion.div>
          <motion.p
            className="fixed z-[100] h2 uppercase w-full md:w-fit left-0 right-0 md:right-auto text-center md:text-left bottom-0 px-0 py-2 md:px-8 md:py-4"
            style={{ y: "100%" }}
            id="product-preloader-text"
          >
            Ethera Supplements<sup>®</sup>
          </motion.p>
        </div>
      )}
    </>
  )
}
