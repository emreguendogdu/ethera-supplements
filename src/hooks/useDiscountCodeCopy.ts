import { useState, useCallback } from "react";
import { DiscountCode } from "@/lib/discount";

const COPY_RESET_DELAY = 1500;

export const useDiscountCodeCopy = (discountCode: DiscountCode | null) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyDiscountCode = useCallback(() => {
    if (!discountCode) return;
    
    navigator.clipboard.writeText(discountCode.code);
    setIsCopied(true);
    
    setTimeout(() => {
      setIsCopied(false);
    }, COPY_RESET_DELAY);
  }, [discountCode]);

  return {
    isCopied,
    copyDiscountCode,
  };
};



