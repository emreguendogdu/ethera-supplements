"use client";

import { ASSET_IDS } from "@/stores/loadingStore";
import { AssetId } from "@/types/store";
import { useEffect, useState } from "react";
import { useLoadingStore } from "@/stores/loadingStore";
import Hero from "./Hero";
import ProductsSection from "./ProductsSection";
import BuyBundle from "../ui/BuyBundle";
import Info from "./Info";
import { GlobalPreloader, PRELOAD_FADE_OUT_DURATION_MS } from "../ui/Preloader";
import { motion } from "motion/react";
import { DiscountCode } from "@/lib/discount";
import { Product } from "@/types/product";

interface LandingPageProps {
  initialProducts: Product[];
  discountCode: DiscountCode | null;
}

export default function LandingPage({
  initialProducts,
  discountCode,
}: LandingPageProps) {
  const { initializeAssets } = useLoadingStore((state) => state.actions);
  const allAssetsLoaded = useLoadingStore((state) => state.allAssetsLoaded);

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const allPageAssetIds = [
      ASSET_IDS.bodybuilder,
      ...initialProducts.map((product) => product.slug),
    ];
    initializeAssets(allPageAssetIds as AssetId[]);
  }, [initializeAssets, initialProducts]);

  useEffect(() => {
    if (allAssetsLoaded) {
      // Optional: Add a small delay before showing content for a smoother transition
      // if your preloader has a fade-out animation.
      const timer = setTimeout(() => {
        setShowContent(true);
      }, PRELOAD_FADE_OUT_DURATION_MS - 200); // Match this delay to your preloader's fade-out duration
      return () => clearTimeout(timer);
    }
  }, [allAssetsLoaded]);

  return (
    <>
      <GlobalPreloader />
      <motion.main
        style={{
          visibility: showContent ? "visible" : "hidden",
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.5s ease-in-out", // Optional fade-in for content
        }}
      >
        <Hero discountCode={discountCode} />
        <ProductsSection products={initialProducts} />
        <BuyBundle products={initialProducts} />
        <Info />
      </motion.main>
    </>
  );
}
