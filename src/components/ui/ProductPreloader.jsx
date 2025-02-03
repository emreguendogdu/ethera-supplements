"use client"

import { PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { AresCase } from "@/components/3d/products/AresCase"
import { animate } from "motion"
import { useEffect, useRef } from "react"
import { motion } from "motion/react"
import useDeviceSize from "@/hooks/useDeviceSize"
import { useScrollContext } from "@/context/ScrollContext"

const transition = {
  duration: 1.5,
  ease: "easeOut",
  mass: 3,
}

const animationSequence = (position, rotation, scale, isMobile) => [
  ["#product-preloader-text", { y: 0 }, { ...transition, at: 0 }],
  [position, { y: 0 }, { ...transition, at: 0 }],
  [rotation, { x: 0 }, { ...transition, at: 0 }],
  [position, { x: isMobile ? -0.15 : -2 }, { ...transition, at: 1.45 }],
  [rotation, { y: isMobile ? 0.15 : 1 }, { ...transition, at: 1.45 }],
  [scale, { x: 0, y: 0, z: 0 }, { ...transition, at: 2.5 }],
  ["#product-preloader-text", { scale: 0 }, { ...transition, at: 2.5 }],
  ["#product-preloader-text", { opacity: 0 }, { ...transition, at: 2.5 }],
  [
    "#product-preloader",
    { opacity: 0 },
    { duration: 0.5, ease: "easeOut", at: 2.5 },
  ],
  [
    "#product-preloader",
    { display: "none" },
    { duration: 0.5, ease: "easeOut", at: 3 },
  ],
]

function Environment({ setAllowScroll }) {
  const groupRef = useRef()

  const [isMobile] = useDeviceSize()

  setAllowScroll(false) // Disable scrolling
  useEffect(async () => {
    if (!groupRef.current) return

    const { position, rotation, scale } = groupRef.current
    animate(
      animationSequence(position, rotation, scale, isMobile)
    ).finished.then(() => {
      setAllowScroll(true) // Re-enable scrolling after animation completes
    })
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
        <AresCase position={[0, 0, 0]} />
      </group>
    </>
  )
}

export default function ProductPreloader() {
  const { setAllowScroll } = useScrollContext()
  return (
    <>
      <div
        id="product-preloader"
        className="w-full h-screen sticky inset-0 z-[100]"
      >
        <motion.div
          id="preloader-canvas-container"
          className="absolute w-full h-full z-[99] bg-black"
        >
          <Canvas camera={{ fov: 50 }}>
            <Environment setAllowScroll={setAllowScroll} />
          </Canvas>
        </motion.div>
        <motion.p
          className="absolute text-4xl z-[100] w-full md:w-fit left-0 right-0 md:right-auto text-center md:text-left bottom-0 px-0 py-2 md:px-8 md:py-4"
          style={{ y: " 100%" }}
          id="product-preloader-text"
        >
          Ethera Supplements<sup>®</sup>
        </motion.p>
      </div>
    </>
  )
}
