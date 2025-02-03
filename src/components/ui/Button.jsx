"use client"

import { motion, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { useEffect } from "react"

export default function Button({
  text = "Shop Now",
  href = "",
  className = "",
}) {
  const pulse = useSpring(0, { damping: 0, mass: 5, stiffness: 10 })
  const pulsingBg = useTransform(pulse, (r) => {
    return `blur(${r}px)`
  })

  useEffect(() => {
    pulse.set(10)
  }, [])

  return (
    <div className={`relative w-40`}>
      <Link
        className={`relative bg-black px-3 py-2 rounded-md hover:bg-neutral-800 transition-all duration-200 z-10 w-full uppercase hover:font-bold block text-center my-4 ${className}`}
        href={href}
      >
        {text}
      </Link>
      <div
        className="absolute -inset-[1px] rounded-md"
        style={{
          background:
            "conic-gradient(#ffffff, #000000, #ffffff, #000000, #ffffff)",
        }}
      />
      <motion.div
        className="absolute -inset-[1px] rounded-md opacity-50"
        style={{
          background:
            "conic-gradient(#ffffff, #ffffff, #ffffff, #ffffff, #ffffff)",
          filter: pulsingBg,
        }}
      />
    </div>
  )
}
