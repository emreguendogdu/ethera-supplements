"use client";

import { motion } from "motion/react";
import { useHeroScrollAnimations } from "@/hooks/useHeroScrollAnimations";
import HeroCanvas from "@/components/3d/HeroCanvas";
import { useEffect, useRef } from "react";
import Copy from "../ui/Copy";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLoadingStore } from "@/stores/loadingStore";
import { HeroCard } from "./HeroCard";
import { HeroProductTeaser } from "./HeroProductTeaser";

export default function Hero() {
  const { inView, setRefs } = useHeroScrollAnimations();
  const pointerRef = useRef({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const preloaderAnimationComplete = useLoadingStore(
    (state) => state.preloaderAnimationComplete
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(
    () => {
      if (!cardRef.current || !preloaderAnimationComplete) return;

      // Set initial state
      gsap.set(cardRef.current, { opacity: 0 });
      gsap.set("#header-content", { opacity: 0, yPercent: "-100%" });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 1 },
      });

      // Entry animation
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
      aria-label="Hero section"
    >
      {/* Hero Content */}
      <div
        ref={setRefs}
        className="w-full h-svh flex flex-col pt-[104px] sm:pt-[72px] px-sectionX-m md:px-sectionX py-5 overflow-hidden"
      >
        <HeroCanvas inView={inView} pointer={pointerRef.current} />

        <div className="overflow-hidden w-[97svw]">
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
        </div>

        {/* Card Section */}
        <div className="relative w-full flex-1 flex justify-center sm:justify-end xl:items-end">
          <HeroCard ref={cardRef} />
        </div>
      </div>

      <HeroProductTeaser />
    </motion.section>
  );
}
