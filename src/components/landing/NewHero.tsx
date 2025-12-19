"use client";

import { motion } from "motion/react";
import HeroCanvas from "@/components/3d/HeroCanvas";
import { DiscountCode } from "@/lib/discount";
import { useHeroScrollAnimations } from "@/hooks/useHeroScrollAnimations";
import { HeroContent } from "./HeroContent";
import { ArrowOutward, Potion, Shield, Star } from "../ui/Icons";
import { Drop } from "../ui/Icons";

export default function NewHero() {
  const { scrollYProgress, inView, setRefs } = useHeroScrollAnimations();

  return (
    <motion.section
      id="hero"
      className="h-[200vh] md:h-[250vh]"
      ref={setRefs}
      aria-label="Hero section"
    >
      {/* <HeroCanvas scrollYProgress={scrollYProgress} inView={inView} /> */}

      <div className="sticky top-0 w-full h-svh flex flex-col items-center justify-center mt-[72px] px-sectionX-m md:px-sectionX">
        {/* Title */}
        <div className="pb-[5vw]">
          <span className="relative h0 -translate-x-[1.025vw]">Ethera</span>
        </div>

        {/* Main */}
        <div className="relative w-full flex-1 flex justify-end">
          {/* Card */}
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

            {/* Values */}
            <ul className="w-full flex justify-between items-center gap-2.5">
              <li className="flex flex-col items-center justify-center gap-1.25">
                {/* Icon placeholder */}
                <Potion className="w-[2em] aspect-square rounded-full" />
                {/* Value text */}
                <p className="text-center">
                  Clinically <br /> Dosed
                </p>
              </li>

              <li className="flex flex-col items-center justify-center gap-1.25">
                {/* Icon placeholder */}
                <Shield className="w-[2em] aspect-square rounded-full" />
                {/* Value text */}
                <p className="text-center">
                  3-rd Party <br /> Verified
                </p>
              </li>

              <li className="flex flex-col items-center justify-center gap-2.5">
                {/* Icon placeholder */}
                <Drop className="w-[2em] aspect-square rounded-full" />
                {/* Value text */}
                <p className="text-center">
                  0 <br /> Artificial
                </p>
              </li>
            </ul>

            {/* CTA & Reviews */}
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
