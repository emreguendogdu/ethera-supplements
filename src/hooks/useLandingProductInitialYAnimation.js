"use client"

import { useState, useEffect, useRef, useTransition } from "react"

const FINAL_Y_CENTER = 0
const FINAL_Y_OTHER = -0.125
const INITIAL_Y = 2
const DURATION = 1500

const easeInOutQuad = (t) => {
  const p = 2 * t * t
  const q = 1 - Math.pow(-2 * t + 2, 2) / 2
  return t < 0.5 ? p : q
}

const lerp = (a, b, t) => a + (b - a) * t

const useLandingProductInitialYAnimation = ({
  canvasContainerRef,
  positionKey,
}) => {
  const [initialPositionY, setInitialPositionY] = useState(10)
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false)
  const [isSectionInView, setIsSectionInView] = useState(false)
  const animationFrameIdRef = useRef(null)
  const startRef = useRef(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (!canvasContainerRef?.current) return

    let observer

    const animatePositionY = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp
      const progress = Math.min((timestamp - startRef.current) / DURATION, 1)
      const easedProgress = easeInOutQuad(progress)
      const finalY = positionKey === "center" ? FINAL_Y_CENTER : FINAL_Y_OTHER
      startTransition(() => {
        setInitialPositionY(lerp(INITIAL_Y, finalY, easedProgress))
      })
      if (progress < 1) {
        animationFrameIdRef.current = requestAnimationFrame(animatePositionY)
      } else {
        setHasAnimatedIn(true)
      }
    }

    observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsSectionInView(entry.isIntersecting)
        if (entry.isIntersecting && !hasAnimatedIn) {
          startRef.current = null
          animationFrameIdRef.current = requestAnimationFrame(animatePositionY)
        }
      },
      { threshold: 0.03125 }
    )

    observer.observe(canvasContainerRef.current)
    return () => {
      observer.disconnect()
      if (animationFrameIdRef.current)
        cancelAnimationFrame(animationFrameIdRef.current)
    }
  }, [canvasContainerRef, hasAnimatedIn, positionKey])

  return { initialPositionY, hasAnimatedIn, isSectionInView, isPending }
}

export default useLandingProductInitialYAnimation
