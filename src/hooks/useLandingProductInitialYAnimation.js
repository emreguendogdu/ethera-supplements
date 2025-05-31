"use client"

import { useState, useEffect } from "react"

const FINAL_Y_CENTER = 0
const FINAL_Y_OTHER = -0.125
const INITIAL_Y = 3
const DURATION = 1500

const easeInOut = (t) => {
  const p = 2 * t * t
  const q = 1 - Math.pow(-2 * t + 2, 2) / 2
  return t < 0.5 ? p : q
}

const lerp = (a, b, t) => a + (b - a) * t

const useLandingProductInitialYAnimation = ({
  canvasContainerRef,
  positionKey,
  isInView,
}) => {
  const [initialPositionY, setInitialPositionY] = useState(10)
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false)

  useEffect(() => {
    if (!canvasContainerRef?.current) return

    let animationFrameId
    let start = null

    const animatePositionY = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / DURATION, 1)
      const easedProgress = easeInOut(progress)
      const finalY = positionKey === "center" ? FINAL_Y_CENTER : FINAL_Y_OTHER
      setInitialPositionY(lerp(INITIAL_Y, finalY, easedProgress))
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animatePositionY)
      } else {
        setHasAnimatedIn(true)
      }
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedIn) {
          requestAnimationFrame(animatePositionY)
        }
      },
      { threshold: 0.03125 }
    )

    observer.observe(canvasContainerRef.current)
    return () => {
      observer.disconnect()
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [canvasContainerRef, hasAnimatedIn, positionKey, isInView])

  return { initialPositionY, hasAnimatedIn }
}

export default useLandingProductInitialYAnimation
