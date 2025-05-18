"use client"

import React, { useEffect } from "react"
import { useLoadingStore } from "@/stores/loadingStore"
import { useScrollContext } from "@/context/ScrollContext"

export function GlobalPreloader() {
  // Subscribe to relevant parts of the loading store individually
  // to avoid creating new objects on each render, which can cause issues
  // with useSyncExternalStore and the "getServerSnapshot" warning.
  const allAssetsLoaded = useLoadingStore((state) => state.allAssetsLoaded)
  const assetsLoaded = useLoadingStore((state) => state.assetsLoaded)
  const totalAssets = useLoadingStore((state) => state.totalAssets)

  const { setAllowScroll } = useScrollContext()

  useEffect(() => {
    if (allAssetsLoaded) {
      setAllowScroll(true)
    } else {
      setAllowScroll(false)
    }
    return () => {
      setAllowScroll(true)
    }
  }, [allAssetsLoaded, setAllowScroll])

  // If all assets are loaded, the preloader doesn't render anything
  if (allAssetsLoaded) {
    return null
  }

  // Calculate loading progress
  // Object.values(assetsLoaded) will create a new array, but this calculation
  // only runs if allAssetsLoaded is false, and its inputs (assetsLoaded, totalAssets)
  // are now stable if their underlying values haven't changed.
  const loadedCount = Object.values(assetsLoaded).filter(Boolean).length
  const progressPercentage =
    totalAssets > 0 ? (loadedCount / totalAssets) * 100 : 0

  return (
    <div
      className="fixed inset-0 w-full h-full bg-neutral-900/95 text-neutral-100 flex items-end z-[9999] opacity-100 transition-opacity duration-700 ease-in-out"
      role="status"
      aria-live="polite"
    >
      <div className="p-8 relative w-full flex flex-col gap-4">
        <p className="subheading">
          {loadedCount} / {totalAssets} Assets Loaded (
          {Math.round(progressPercentage)}%)
        </p>
        <div className="w-full h-2 bg-neutral-700 rounded-full mx-auto overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
          <div
            className="h-full bg-white rounded-full transition-all duration-400 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <h2 className="h2 uppercase">
          Ethera Supplements<sup>®</sup>
        </h2>
      </div>
    </div>
  )
}
