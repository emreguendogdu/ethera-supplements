"use client"

import { ASSET_IDS, AssetId } from "@/stores/loadingStore"
import { useEffect, useState } from "react"
import { useLoadingStore } from "@/stores/loadingStore"
import { products } from "@/data"
import { motion } from "motion/react"
import Hero from "./Hero"
import Products from "./Products"
import BuyBundle from "../ui/BuyBundle"
import Info from "./Info"
import { GlobalPreloader } from "../ui/Preloader"

export default function LandingPage() {
  const { initializeAssets } = useLoadingStore((state) => state.actions)
  const allAssetsLoaded = useLoadingStore((state) => state.allAssetsLoaded)

  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const allPageAssetIds = [
      ASSET_IDS.bodybuilder,
      ...products.map((product) => product.slug),
    ]
    initializeAssets(allPageAssetIds as AssetId[])
  }, [initializeAssets])

  useEffect(() => {
    if (allAssetsLoaded) {
      // Optional: Add a small delay before showing content for a smoother transition
      // if your preloader has a fade-out animation.
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 500) // Match this delay to your preloader's fade-out duration
      return () => clearTimeout(timer)
    }
  }, [allAssetsLoaded])

  return (
    <>
      <GlobalPreloader />
      <motion.div
        style={{
          visibility: showContent ? "visible" : "hidden",
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.5s ease-in-out", // Optional fade-in for content
        }}
      >
        <Hero />
        <Products />
        <BuyBundle />
        <Info />
      </motion.div>
    </>
  )
}
