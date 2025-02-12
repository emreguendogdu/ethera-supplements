"use client"

import { useProgress } from "@react-three/drei"
import { motion } from "motion/react"
import { useEffect } from "react"

export default function LandingPreloader() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { progress, active } = useProgress()

  return (
    <motion.div
      id="preloader"
      className="sticky inset-0 bg-neutral-900 z-[105] h-screen w-full flex flex-col gap-4 md:gap-8 justify-center items-center"
      // initial={{ opacity: 1, display: "flex" }}
      // animate={{ opacity: 0, display: "none" }}
      // transition={{ delay: 2, duration: 1 }}
    >
      <div className="relative w-fit">
        <p className="text-4xl">
          Ethera Supplements<sup>®</sup>
        </p>
        <motion.div
          className="relative w-full h-[2px] bg-white mt-4 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress.toFixed() / 100 }}
          transition={{
            duration: active ? 10 : 0.25,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  )
}
