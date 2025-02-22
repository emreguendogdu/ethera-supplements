"use client"

import { Loader, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Tub } from "@/components/3d/Tub"
import { animate } from "motion"
import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import useDeviceSize from "@/hooks/useDeviceSize"
import { useScrollContext } from "@/context/ScrollContext"
import { Suspense } from "react"

const transition = {
  duration: 1.5,
  ease: "easeOut",
  mass: 3,
}

const animationSequence = (position, rotation, scale, isMobile) => [
  ["#product-preloader-text", { y: 0 }, { ...transition, at: 0 }],
  [position, { y: 0 }, { ...transition, at: 0 }],
  [rotation, { x: 0, y: 0 }, { ...transition, at: 0 }],
  [position, { x: isMobile ? -0.15 : -2 }, { ...transition, at: 1.45 }],
  [rotation, { y: isMobile ? 0.15 : 1 }, { ...transition, at: 1.45 }],
  [scale, { x: 0, y: 0, z: 0 }, { ...transition, at: 2 }],
  ["#product-preloader-text", { scale: 0 }, { ...transition, at: 2 }],
  ["#product-preloader-text", { opacity: 0 }, { ...transition, at: 2 }],
  [
    "#product-preloader",
    { opacity: 0 },
    { duration: 0.5, ease: "easeOut", at: 2 },
  ],
  [
    "#product-preloader",
    { display: "none" },
    { duration: 0.5, ease: "easeOut", at: 2 },
  ],
]

function Environment({ setAllowScroll, slug, modalLoaded }) {
  const groupRef = useRef()

  const { isMobile } = useDeviceSize()

  setAllowScroll(false) // Disable scrolling
  useEffect(async () => {
    if (!groupRef.current && !window) return

    window.scrollTo(0, 0) // Scroll to top of page
    const { position, rotation, scale } = groupRef.current

    if (modalLoaded) {
      await animate(animationSequence(position, rotation, scale, isMobile))
      await setAllowScroll(true) // Enable scrolling
    }
  }, [])

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 5]} />
      <directionalLight position={[0, 0, -5]} />
      <directionalLight position={[0, 6, 0]} />
      <directionalLight position={[5, 0, 0]} />
      <directionalLight position={[-5, 0, 0]} />
      <group ref={groupRef} position={[0, -3, 0]} rotation={[1, 0, 0]}>
        <Suspense fallback={null}>
          <Tub slug={slug} position={[0, 0, 0]} />
        </Suspense>
      </group>
    </>
  )
}

export default function ProductPreloader({ slug }) {
  const { setAllowScroll } = useScrollContext()
  const [modalLoaded, setModalLoaded] = useState(false)
  return (
    <>
      <div
        id="product-preloader"
        className="w-full h-screen absolute inset-0 z-[100]"
      >
        <motion.div
          id="preloader-canvas-container"
          className="absolute w-full h-full z-[99] bg-black"
        >
          <Canvas camera={{ fov: 50 }}>
            <Environment
              setAllowScroll={setAllowScroll}
              modalLoaded={modalLoaded}
              slug={slug}
            />
          </Canvas>
          <Loader initialState={(active) => setModalLoaded(!active)} />
        </motion.div>
        <motion.p
          className="absolute z-[100] text-4xl w-full md:w-fit left-0 right-0 md:right-auto text-center md:text-left bottom-0 px-0 py-2 md:px-8 md:py-4"
          style={{ y: " 100%" }}
          id="product-preloader-text"
        >
          Ethera Supplements<sup>®</sup>
        </motion.p>
      </div>
    </>
  )
}
