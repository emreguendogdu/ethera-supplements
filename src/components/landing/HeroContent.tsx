"use client";

import { motion, MotionValue } from "motion/react";
import { HeroHeader } from "./HeroHeader";
import { HeroDescription } from "./HeroDescription";
import { DiscountCode } from "@/lib/discount";

interface HeroContentProps {
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  y: MotionValue<number>;
  discountCode: DiscountCode | null;
}

export const HeroContent = ({
  opacity,
  scale,
  y,
  discountCode,
}: HeroContentProps) => {
  return (
    <motion.div
      className="sticky top-0 h-screen select-none flex flex-col justify-center gap-4 py-20 md:py-0 px-sectionX-m md:px-0 md:grid md:grid-cols-8 md:grid-rows-8"
      style={{
        opacity,
        scale,
        y,
      }}
    >
      <HeroHeader />
      <HeroDescription discountCode={discountCode} />
    </motion.div>
  );
};


