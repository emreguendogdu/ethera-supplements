"use client";

interface CartHeaderProps {
  onClose: () => void;
}

export const CartHeader = ({ onClose }: CartHeaderProps) => {
  return (
    <header className="w-full flex justify-between md:justify-center items-center px-8">
      <div aria-hidden="true" />
      <h2 id="cart-title" className="text-white select-none">
        Shopping Cart
      </h2>
      <button
        onClick={onClose}
        className="block md:hidden text-2xl h2 h-fit"
        aria-label="Close shopping cart"
        type="button"
      >
        ×
      </button>
    </header>
  );
};


