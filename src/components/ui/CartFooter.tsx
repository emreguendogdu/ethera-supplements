"use client";

import Button from "./Button";
import { DiscountInput } from "./DiscountInput";
import { CartSummary } from "./CartSummary";

interface CartFooterProps {
  totalDiscount: number;
  salePrice: number;
  displayDiscountInput: boolean;
  discountCode: string;
  onShowDiscountInput: () => void;
  onHideDiscountInput: () => void;
  onDiscountCodeChange: (value: string) => void;
  onCheckout: () => void;
}

export const CartFooter = ({
  totalDiscount,
  salePrice,
  displayDiscountInput,
  discountCode,
  onShowDiscountInput,
  onHideDiscountInput,
  onDiscountCodeChange,
  onCheckout,
}: CartFooterProps) => {
  return (
    <footer
      id="checkout"
      className="relative w-full flex flex-col gap-8"
      role="contentinfo"
      aria-label="Cart summary and checkout"
    >
      <div className="relative flex justify-between items-end">
        <DiscountInput
          isVisible={displayDiscountInput}
          discountCode={discountCode}
          onShow={onShowDiscountInput}
          onHide={onHideDiscountInput}
          onCodeChange={onDiscountCodeChange}
        />
        <CartSummary totalDiscount={totalDiscount} salePrice={salePrice} />
      </div>
      <Button text="Checkout" type="button" onClick={onCheckout} />
    </footer>
  );
};



