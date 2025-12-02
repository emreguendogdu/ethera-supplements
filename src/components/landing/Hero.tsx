"use client";

import { CopyIcon } from "@/components/ui/Icons";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useMemo, useCallback } from "react";
import Button from "@/components/ui/Button";
import HeroCanvas from "@/components/3d/HeroCanvas";
import { useInView } from "react-intersection-observer";
import { DiscountCode } from "@/lib/discount";

interface HeroProps {
  discountCode: DiscountCode | null;
}

export default function Hero({ discountCode }: HeroProps) {
  const [DISCOUNT_CODE_COPIED, SET_DISCOUNT_CODE_COPIED] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.25,
  });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end 80%"],
  });

  const contentDivOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const contentDivScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.5]);
  const contentDivY = useTransform(scrollYProgress, [0, 0.25], [0, -125]);

  const handleShopNowClick = useCallback(() => {
    const element = document.getElementById("products-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const copyDiscountCode = useCallback(() => {
    if (!discountCode) return;
    navigator.clipboard.writeText(discountCode.code);
    SET_DISCOUNT_CODE_COPIED(true);
    setTimeout(() => {
      SET_DISCOUNT_CODE_COPIED(false);
    }, 1500);
  }, [discountCode]);

  return (
    <>
      <motion.section
        id="hero"
        className="h-[200vh] md:h-[250vh]"
        ref={(node) => {
          heroRef.current = node;
          inViewRef(node);
        }}
        aria-label="Hero section"
      >
        <HeroCanvas scrollYProgress={scrollYProgress} inView={inView} />
        <motion.div
          className="sticky top-0 h-screen select-none flex flex-col justify-center gap-4 py-20 md:py-0 px-sectionX-m md:px-0 md:grid md:grid-cols-8 md:grid-rows-8"
          style={{
            opacity: contentDivOpacity,
            scale: contentDivScale,
            y: contentDivY,
          }}
        >
          <header className="col-start-2 col-span-6 row-start-3 row-span-6">
            <h1 className="uppercase">
              Build muscle. <br />
              Boost strength. <br /> No BS.
            </h1>
          </header>
          <div className="col-start-5 col-end-7 row-start-5 row-span-4 flex flex-col gap-4">
            <p>
              Ethera is a <strong>supplement</strong> brand that aims
              minimalistic purity with the best products available.
            </p>
            {discountCode && (
              <div className="flex items-center">
                <p className="uppercase inline-block font-bold">
                  {discountCode.discount}% off code:{" "}
                </p>
                <button
                  onClick={copyDiscountCode}
                  className="ml-1 bg-radial from-white via-white to-gray-400 text-black px-3 py-1 rounded-lg uppercase font-bold inline-block cursor-pointer"
                  aria-label={
                    DISCOUNT_CODE_COPIED
                      ? "Discount code copied"
                      : `Copy discount code ${discountCode.code}`
                  }
                >
                  {DISCOUNT_CODE_COPIED ? "Copied!" : discountCode.code}
                  {!DISCOUNT_CODE_COPIED && (
                    <CopyIcon className="relative inline ml-1 -translate-y-1/4" />
                  )}
                </button>
              </div>
            )}
            <div className="relative w-3/5">
              <Button
                text="Shop Now"
                type="button"
                onClick={handleShopNowClick}
              />
            </div>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
}
