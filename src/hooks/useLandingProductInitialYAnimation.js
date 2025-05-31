"use client"

import { useState, useEffect } from "react"

const FINAL_Y_CENTER = 0
const FINAL_Y_OTHER = -0.125
const INITIAL_Y = 3
const DURATION = 1750

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const lerp = (a, b, t) => a + (b - a) * t

const useLandingProductInitialYAnimation = ({
  canvasContainerRef,
  positionKey,
}) => {
  const [initialPositionY, setInitialPositionY] = useState(10)
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false)
  const [isSectionInView, setIsSectionInView] = useState(false)

  useEffect(() => {
    if (!canvasContainerRef?.current) return

    let animationFrameId
    let start = null

    const animatePositionY = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / DURATION, 1)
      const easedProgress = easeInOutCubic(progress)
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
        setIsSectionInView(entry.isIntersecting)
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
  }, [canvasContainerRef, hasAnimatedIn, positionKey])

  return { initialPositionY, hasAnimatedIn, isSectionInView }
}

export default useLandingProductInitialYAnimation
