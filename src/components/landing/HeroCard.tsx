import { ArrowOutward, Drop, Potion, Shield, Star } from "../ui/Icons";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { forwardRef } from "react";
import { cn } from "@/utils/cn";

interface HeroCardProps {
  className?: string;
}

export const HeroCard = forwardRef<HTMLDivElement, HeroCardProps>(
  ({ className }, ref) => {
    const { scrollToProducts } = useScrollToSection();

    return (
      <div
        ref={ref}
        className={cn(
          "hero-card h-fit bg-preloader p-5 sm:p-6 xl:p-10 flex flex-col gap-5 xl:gap-10 opacity-0",
          className
        )}
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
        <div className="relative w-full flex items-center justify-between gap-5 sm:gap-6">
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
    );
  }
);

HeroCard.displayName = "HeroCard";


