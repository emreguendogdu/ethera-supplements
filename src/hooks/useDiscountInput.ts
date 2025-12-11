import { useState, useCallback } from "react";

export const useDiscountInput = () => {
  const [displayDiscountInput, setDisplayDiscountInput] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const showDiscountInput = useCallback(() => {
    setDisplayDiscountInput(true);
  }, []);

  const hideDiscountInput = useCallback(() => {
    setDisplayDiscountInput(false);
    setDiscountCode("");
  }, []);

  const handleDiscountCodeChange = useCallback(
    (value: string) => {
      setDiscountCode(value);
    },
    []
  );

  return {
    displayDiscountInput,
    discountCode,
    showDiscountInput,
    hideDiscountInput,
    handleDiscountCodeChange,
  };
};






