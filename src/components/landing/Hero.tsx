"use client";

import { motion } from "motion/react";
import HeroCanvas from "@/components/3d/HeroCanvas";
import { DiscountCode } from "@/lib/discount";
import { useHeroScrollAnimations } from "@/hooks/useHeroScrollAnimations";
import { HeroContent } from "./HeroContent";

interface HeroProps {
  discountCode: DiscountCode | null;
}

export default function Hero({ discountCode }: HeroProps) {
  const {
    scrollYProgress,
    inView,
    contentDivOpacity,
    contentDivScale,
    contentDivY,
    setRefs,
  } = useHeroScrollAnimations();

  return (
    <motion.section
      id="hero"
      className="h-[200vh] md:h-[250vh]"
      ref={setRefs}
      aria-label="Hero section"
    >
      <HeroCanvas scrollYProgress={scrollYProgress} inView={inView} />
      <HeroContent
        opacity={contentDivOpacity}
        scale={contentDivScale}
        y={contentDivY}
        discountCode={discountCode}
      />
    </motion.section>
  );
}
