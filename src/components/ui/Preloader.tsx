"use client"

import React, { useEffect, useState } from "react"
import { useLoadingStore } from "@/stores/loadingStore"
import { useScrollContext } from "@/context/ScrollContext"
import { motion } from "motion/react"

export function GlobalPreloader() {
  // Subscribe to relevant parts of the loading store individually
  // to avoid creating new objects on each render, which can cause issues
  // with useSyncExternalStore and the "getServerSnapshot" warning.
  const allAssetsLoaded = useLoadingStore((state) => state.allAssetsLoaded)
  const assetsLoaded = useLoadingStore((state) => state.assetsLoaded)
  const totalAssets = useLoadingStore((state) => state.totalAssets)

  const { setAllowScroll } = useScrollContext()
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    if (allAssetsLoaded) {
      setAllowScroll(true)
      const timeout = setTimeout(() => setIsHidden(true), 700)
      return () => clearTimeout(timeout)
    } else {
      setAllowScroll(false)
      setIsHidden(false)
    }
    return () => {
      setAllowScroll(true)
    }
  }, [allAssetsLoaded, setAllowScroll])

  // Calculate loading progress
  // Object.values(assetsLoaded) will create a new array, but this calculation
  // only runs if allAssetsLoaded is false, and its inputs (assetsLoaded, totalAssets)
  // are now stable if their underlying values haven't changed.
  const loadedCount = Object.values(assetsLoaded).filter(Boolean).length
  const progressPercentage =
    totalAssets > 0 ? (loadedCount / totalAssets) * 100 : 0

  return (
    <motion.div
      className="fixed inset-0 w-full h-full bg-neutral-900/95 text-neutral-100 flex items-end z-[9999] opacity-100 transition-opacity duration-700 ease-in-out "
      role="status"
      aria-live="polite"
      initial={{ opacity: 1 }}
      animate={{ opacity: allAssetsLoaded ? 0 : 1 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      style={{ display: isHidden ? "none" : "flex" }}
    >
      <div className="p-8 relative w-full flex flex-col gap-4">
        <p className="subheading">Loading assets...</p>
        <div className="w-full h-2 bg-neutral-700 rounded-full mx-auto overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
          <motion.div
            className="h-full bg-white rounded-full"
            style={{ willChange: "width" }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <h2 className="h2 uppercase">
          Ethera Supplements<sup>®</sup>
        </h2>
      </div>
    </motion.div>
  )
}
