"use client"

import { useState, useEffect } from "react"

const FINAL_Y_CENTER = 0
const FINAL_Y_OTHER = -0.125
const INITIAL_Y = 3
const DURATION = 1500

const easeInOut = (t: number): number => {
  const p = 2 * t * t
  const q = 1 - Math.pow(-2 * t + 2, 2) / 2
  return t < 0.5 ? p : q
}

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

interface UseLandingProductInitialYAnimationProps {
  positionKey: "center" | string
  isInView: boolean
}

interface UseLandingProductInitialYAnimationReturn {
  initialPositionY: number
  hasAnimatedIn: boolean
}

const useLandingProductInitialYAnimation = ({
  positionKey,
  isInView,
}: UseLandingProductInitialYAnimationProps): UseLandingProductInitialYAnimationReturn => {
  const [initialPositionY, setInitialPositionY] = useState<number>(INITIAL_Y)
  const [hasAnimatedIn, setHasAnimatedIn] = useState<boolean>(false)

  useEffect(() => {
    if (isInView && !hasAnimatedIn) {
      let animationFrameId: number | null = null
      let start: number | null = null

      const animatePositionY = (timestamp: number): void => {
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

      animationFrameId = requestAnimationFrame(animatePositionY)

      return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isInView, hasAnimatedIn, positionKey])

  return { initialPositionY, hasAnimatedIn }
}

export default useLandingProductInitialYAnimation