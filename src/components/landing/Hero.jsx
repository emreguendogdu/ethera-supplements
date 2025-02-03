"use client"

import Link from "next/link"
import { CopyIcon } from "@/components/icons/Copy"
import { discountCode } from "@/data"
import { useRef, useState } from "react"
import HeroCanvas, { Bodybuilder } from "@/components/3d/HeroCanvas"
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react"
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import Button from "../ui/Button"

export function Hero() {
  const [DISCOUNT_CODE_COPIED, SET_DISCOUNT_CODE_COPIED] = useState(false)

  const { scrollYProgress } = useScroll({
    offset: ["start start", "center end"],
  })
  const heroRef = useRef()

  const [rotateZ, setRotateZ] = useState(-0.05)
  const [posY, setPosY] = useState(-8.1)
  const [lightIntensity, setLightIntensity] = useState(0.5)

  const posYValue = useTransform(scrollYProgress, [0, 0.5], [-8.1, -7])
  const rotateZValue = useTransform(scrollYProgress, [0, 0.5], [-0.05, -3.25])
  const lightIntensityValue = useTransform(
    scrollYProgress,
    [0.5, 0.75],
    [0.5, 0]
  )

  const contentDivOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const contentDivScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.5])
  const contentDivY = useTransform(scrollYProgress, [0, 0.25], [0, -125])

  useMotionValueEvent(scrollYProgress, "change", () => {
    setRotateZ(rotateZValue.get())
    setPosY(posYValue.get())
    setLightIntensity(lightIntensityValue.get())
  })

  const copyDiscountCode = () => {
    navigator.clipboard.writeText(discountCode)
    SET_DISCOUNT_CODE_COPIED(true)
    setTimeout(() => {
      SET_DISCOUNT_CODE_COPIED(false)
    }, 1500) // Hide notification after 1.5 seconds
  }

  return (
    <>
      <motion.section id="hero" className="h-[300vh]" ref={heroRef}>
        <div className="fixed top-0 w-full h-screen -z-10">
          <div
            id="canvas-container"
            className="sticky top-0 h-screen w-full translate-y-36 -z-10"
          >
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 3, 0]} />
              <ambientLight intensity={0.22} />
              <directionalLight
                position={[-10, 10, 5]}
                intensity={lightIntensity}
                castShadow
              />
              <Bodybuilder
                position={[-0.05, posY, -6]}
                rotation={[-Math.PI / 2, 0, rotateZ]}
              />
            </Canvas>
          </div>
        </div>
        <motion.div
          className="sticky top-0 grid grid-cols-8 grid-rows-8 h-screen select-none"
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
            <Button>Shop Now</Button>
            {/* <Link href="/products/" className="button text-center px-20">
            Shop Now
          </Link> */}
          </div>
        </motion.div>
      </motion.section>
    </>
  )
}
