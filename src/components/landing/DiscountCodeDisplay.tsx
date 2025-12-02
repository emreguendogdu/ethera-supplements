"use client";

import { CopyIcon } from "@/components/ui/Icons";
import { DiscountCode } from "@/lib/discount";

interface DiscountCodeDisplayProps {
  discountCode: DiscountCode;
  isCopied: boolean;
  onCopy: () => void;
}

export const DiscountCodeDisplay = ({
  discountCode,
  isCopied,
  onCopy,
}: DiscountCodeDisplayProps) => {
  return (
    <div className="flex items-center">
      <p className="uppercase inline-block font-bold">
        {discountCode.discount}% off code:{" "}
      </p>
      <button
        onClick={onCopy}
        className="ml-1 bg-radial from-white via-white to-gray-400 text-black px-3 py-1 rounded-lg uppercase font-bold inline-block cursor-pointer"
        aria-label={
          isCopied
            ? "Discount code copied"
            : `Copy discount code ${discountCode.code}`
        }
      >
        {isCopied ? "Copied!" : discountCode.code}
        {!isCopied && (
          <CopyIcon className="relative inline ml-1 -translate-y-1/4" />
        )}
      </button>
    </div>
  );
};

