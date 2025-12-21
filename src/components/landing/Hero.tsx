"use client";

import { motion } from "motion/react";
import { useHeroScrollAnimations } from "@/hooks/useHeroScrollAnimations";
import { ArrowOutward, Potion, Shield, Star } from "../ui/Icons";
import { Drop } from "../ui/Icons";
import HeroCanvas from "@/components/3d/HeroCanvas";
import { useState, useEffect, useRef } from "react";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import Copy from "../ui/Copy";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLoadingStore } from "@/stores/loadingStore";

export default function Hero() {
  const { inView, setRefs } = useHeroScrollAnimations();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const { scrollToProducts } = useScrollToSection();
  const cardRef = useRef<HTMLDivElement>(null);
  const preloaderAnimationComplete = useLoadingStore(
    (state) => state.preloaderAnimationComplete
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1 range (like Three.js pointer) based on viewport
      // This matches the canvas which is sized to viewport height
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1); // Invert Y axis

      setPointer({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(
    () => {
      if (!cardRef.current || !preloaderAnimationComplete) return;

      // Set initial opacity to 0
      gsap.set(cardRef.current, { opacity: 0 });
      gsap.set("#header-content", { opacity: 0, yPercent: "-100%" });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 1 },
      });

      // Animate opacity from 0 to 1
      tl.to(cardRef.current, {
        opacity: 1,
        duration: 1,
        delay: 0.8,
        ease: "power2.out",
      }).to(
        "#header-content",
        {
          opacity: 1,
          yPercent: 0,
          duration: 1,
          ease: "power2.out",
        },
        "<+0.2"
      );
    },
    { dependencies: [preloaderAnimationComplete] }
  );

  return (
    <motion.section
      id="hero"
      className="hero relative w-full"
      ref={setRefs}
      aria-label="Hero section"
    >
      {/* Hero Section */}
      <div className="w-full h-svh flex flex-col pt-[104px] sm:pt-[72px] px-sectionX-m md:px-sectionX py-5">
        <HeroCanvas inView={inView} pointer={pointer} />
        <Copy
          animateOnScroll={false}
          delay={0.2}
          type="chars"
          stagger={0.025}
          duration={1.2}
          shouldAnimate={preloaderAnimationComplete}
        >
          <span className="relative h0 -translate-x-[0.06125em] pb-[5svh]">
            Ethera
          </span>
        </Copy>
        <div className="relative w-full flex-1 flex justify-center sm:justify-end items-end">
          <div
            ref={cardRef}
            className="h-fit bg-preloader p-5 sm:p-10 flex flex-col gap-5 sm:gap-10 opacity-0"
          >
            <h2 className="h3">
              Elite Supplements. <br />
              Zero Noise.
            </h2>
            <p>
              The standard for the 1% who train in silence. <br /> Precision
              formulas with zero fillers, zero <br /> dyes, and zero hype. Just
              results.
            </p>
            <ul className="w-full flex justify-between items-center gap-2.5">
              <li className="flex flex-col items-center justify-center gap-1.25">
                <Potion className="w-[2em] aspect-square rounded-full" />
                <p className="text-center">
                  Clinically <br /> Dosed
                </p>
              </li>
              <li className="flex flex-col items-center justify-center gap-1.25">
                <Shield className="w-[2em] aspect-square rounded-full" />
                <p className="text-center">
                  3-rd Party <br /> Verified
                </p>
              </li>
              <li className="flex flex-col items-center justify-center gap-2.5">
                <Drop className="w-[2em] aspect-square rounded-full" />
                <p className="text-center">
                  0 <br /> Artificial
                </p>
              </li>
            </ul>
            <div className="relative w-full flex items-center justify-between gap-5">
              <button
                onClick={scrollToProducts}
                className="flex px-2.5 py-1.25 gap-2.5 items-center bg-foreground text-background w-fit rounded-full"
              >
                <span className="uppercase whitespace-nowrap">Shop Now</span>
                <ArrowOutward className="w-5 h-5 mt-0.5" />
              </button>
              <div className="flex flex-col w-fit gap-1.25 items-center">
                <div className="flex items-center gap-1.25">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star className="w-5 h-5" key={i} />
                  ))}
                </div>
                <span className="uppercase whitespace-nowrap text-[0.75em]">
                  4.8/5 from 365 reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="relative z-10 w-full h-svh flex pt-[104px] sm:pt-[72px] px-sectionX-m md:px-sectionX py-5 text-white">
        {/* Placeholder for empty left part */}
        <div className="flex-1" aria-hidden />

        {/* Products Content */}
        <div>
          {/* Title */}
          <div className="flex flex-col gap-2.5">
            <p className="font-bold leading-none -tracking-[0.02em] uppercase opacity-70">
              Zero Noise — Only Results.
            </p>

            <div className="relative flex flex-col">
              <div className="flex gap-10">
                <h2 className="uppercase">[3]</h2>
                <h2 className="uppercase">Essentials</h2>
              </div>

              <div className="w-full flex justify-end">
                <h2 className="uppercase">For growth.</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
