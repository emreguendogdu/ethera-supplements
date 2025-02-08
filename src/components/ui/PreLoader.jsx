"use client"

import { animate } from "motion"
import { motion } from "motion/react"
import { useEffect } from "react"

export default function PreLoader() {
  return (
    <motion.div
      id="preloader"
      className="absolute inset-0 bg-neutral-900 z-[105] h-screen w-full flex justify-center items-center"
      initial={{ opacity: 1, display: "flex" }}
      animate={{ opacity: 0, display: "none" }}
      transition={{ delay: 1.5 }}
    >
      <motion.div
        className="relative bg-black rounded-full w-4 h-4"
        id="circle"
        initial={{ width: 0, height: 0, borderRadius: "50%" }}
        animate={{
          width: window.innerWidth,
          height: window.innerHeight,
          borderRadius: 0,
        }}
        transition={{ duration: 1.5, ease: "easeIn" }}
      ></motion.div>
      <p className="text-4xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        Ethera Supplements<sup>®</sup>
      </p>
    </motion.div>
  )
}
