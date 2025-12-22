"use client";

import { ASSET_IDS } from "@/stores/loadingStore";
import { AssetId } from "@/types/store";
import { useEffect, useState, useMemo } from "react";
import { useLoadingStore } from "@/stores/loadingStore";
import ProductsSection from "./ProductsSection";
import BuyBundle from "../ui/BuyBundle";
import Info from "./Info";
import { motion } from "motion/react";
import { DiscountCode } from "@/lib/discount";
import { Product } from "@/types/product";
import Preloader from "../ui/Preloader";
import Hero from "./Hero";

interface LandingPageProps {
  initialProducts: Product[];
  discountCode: DiscountCode | null;
  skipPreloader?: boolean;
}

export default function LandingPage({
  initialProducts,
  discountCode,
  skipPreloader = false,
}: LandingPageProps) {
  const { initializeAssets } = useLoadingStore((state) => state.actions);
  const allAssetsLoaded = useLoadingStore((state) => state.allAssetsLoaded);

  const [showContent, setShowContent] = useState(false);

  const assetIds = useMemo(() => {
    return [
      ...Object.values(ASSET_IDS),
      ...initialProducts.map((product) => product.slug),
    ] as AssetId[];
  }, [initialProducts]);

  useEffect(() => {
    initializeAssets(assetIds);
  }, [initializeAssets, assetIds]);

  useEffect(() => {
    if (allAssetsLoaded) {
      // Add a small delay before showing content for a smoother transition
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 500); // Delay to allow preloader animation to complete
      return () => clearTimeout(timer);
    }
  }, [allAssetsLoaded]);

  return (
    <>
      <Preloader skipPreloader={skipPreloader} />
      <motion.main
      /* style={{
          visibility: showContent ? "visible" : "hidden",
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.5s ease-in-out", // Optional fade-in for content
        }} */
      >
        <Hero />
        {/* <Hero discountCode={discountCode} /> */}
        {/* <ProductsSection products={initialProducts} /> */}
        <BuyBundle products={initialProducts} />
        <Info />
      </motion.main>
    </>
  );
}
