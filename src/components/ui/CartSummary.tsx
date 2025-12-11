"use client";

interface CartSummaryProps {
  totalDiscount: number;
  salePrice: number;
}

export const CartSummary = ({ totalDiscount, salePrice }: CartSummaryProps) => {
  return (
    <div
      className="relative w-1/2 md:w-1/3 [&>p]:font-bold [&>p]:w-full [&>p]:inline-flex [&>p]:justify-between"
      role="group"
      aria-label="Order summary"
    >
      <p
        className="text-green-500"
        aria-label={`Total discounts: $${totalDiscount.toFixed(2)}`}
      >
        <span>DISCOUNTS: </span>
        <span>-${totalDiscount.toFixed(2)}</span>
      </p>
      <p aria-label={`Order total: $${salePrice.toFixed(2)}`}>
        <span>TOTAL: </span>
        <span>${salePrice.toFixed(2)}</span>
      </p>
    </div>
  );
};






