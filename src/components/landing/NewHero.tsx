"use client";

import { motion } from "motion/react";
import { useHeroScrollAnimations } from "@/hooks/useHeroScrollAnimations";
import { ArrowOutward, Potion, Shield, Star } from "../ui/Icons";
import { Drop } from "../ui/Icons";
import MenuCanvas from "@/components/3d/MenuCanvas";
import { useState, useEffect } from "react";

export default function NewHero() {
  const { scrollYProgress, inView, setRefs } = useHeroScrollAnimations();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

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

  return (
    <motion.section
      id="hero"
      className="relative *h-[200vh] *md:h-[250vh] w-full"
      ref={setRefs}
      aria-label="Hero section"
    >
      <div className="sticky top-0 w-full h-svh flex flex-col pt-[104px] sm:pt-[72px] px-sectionX-m md:px-sectionX py-5">
        <MenuCanvas inView={inView} pointer={pointer} />
        <span className="relative h0 -translate-x-[0.06125em] pb-[5svh]">
          Ethera
        </span>
        <div className="relative w-full flex-1 flex justify-end items-end">
          <div className="h-fit bg-preloader p-5 flex flex-col gap-5">
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
              <button className="flex px-2.5 py-1.25 gap-2.5 items-center bg-foreground text-background w-fit rounded-full">
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
    </motion.section>
  );
}
