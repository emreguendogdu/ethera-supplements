"use client"
import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Adjust smoothness
      easing: (t) => 1 - Math.pow(1 - t, 3), // Custom easing function
      smooth: true, // Enable smooth scrolling
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy() // Cleanup on unmount
    }
  }, [])
}
