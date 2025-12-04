"use client";

interface CartEmptyProps {
  hasItems: boolean;
}

export const CartEmpty = ({ hasItems }: CartEmptyProps) => {
  if (hasItems) return null;

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Empty cart status"
    >
      <p className="text-neutral-200">Your cart is empty.</p>
    </div>
  );
};



