"use client";

import { DiscountCode } from "@/lib/discount";
import { DiscountCodeDisplay } from "./DiscountCodeDisplay";
import Button from "@/components/ui/Button";
import { useDiscountCodeCopy } from "@/hooks/useDiscountCodeCopy";
import { useScrollToSection } from "@/hooks/useScrollToSection";

interface HeroDescriptionProps {
  discountCode: DiscountCode | null;
}

export const HeroDescription = ({ discountCode }: HeroDescriptionProps) => {
  const { isCopied, copyDiscountCode } = useDiscountCodeCopy(discountCode);
  const { scrollToProducts } = useScrollToSection();

  return (
    <div className="col-start-5 col-end-7 row-start-5 row-span-4 flex flex-col gap-4">
      <p>
        Ethera is a <strong>supplement</strong> brand that aims minimalistic
        purity with the best products available.
      </p>
      {discountCode && (
        <DiscountCodeDisplay
          discountCode={discountCode}
          isCopied={isCopied}
          onCopy={copyDiscountCode}
        />
      )}
      <div className="relative w-3/5">
        <Button text="Shop Now" type="button" onClick={scrollToProducts} />
      </div>
    </div>
  );
};



