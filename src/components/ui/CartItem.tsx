"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CartItemType } from "@/types/cart";

interface CartItemProps {
  cartItem: CartItemType;
  onQuantityChange: (cartItem: CartItemType, change: number) => void;
}

export const CartItem = ({ cartItem, onQuantityChange }: CartItemProps) => {
  const handleDecrease = () => {
    onQuantityChange(cartItem, -1);
  };

  const handleIncrease = () => {
    onQuantityChange(cartItem, +1);
  };

  const isRemoveAction = cartItem.quantity === 1;

  return (
    <motion.li
      className="flex justify-between gap-8 border-b-[0.5px] border-b-neutral-700 py-4 relative"
      exit={{
        opacity: 0,
        scale: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      }}
      role="listitem"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <figure className="relative flex sm:justify-center sm:items-center h-[100px] min-w-[100px]">
          <Image
            src={`/images/${cartItem.slug}-tub.webp`}
            alt={`${cartItem.name} product image`}
            fill
            className="object-scale-down"
          />
        </figure>
        <div className="flex flex-col justify-between">
          <h3 className="text-white uppercase">{cartItem.name}</h3>
          <dl className="[&>dd]:text-neutral-300">
            {cartItem.slug !== "bundle" && (
              <>
                <dt className="sr-only">Package size</dt>
                <dd>{cartItem.size}g</dd>
              </>
            )}
            <dt className="sr-only">Flavor</dt>
            <dd>{cartItem.flavor}</dd>
          </dl>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div
          className="flex gap-2 items-center"
          role="group"
          aria-label="Pricing information"
        >
          <span
            className="line-through text-red-800"
            aria-label={`Original price: $${cartItem.price}`}
          >
            ${cartItem.price}
          </span>
          <span
            className="text-lg font-bold leading-relaxed"
            aria-label={`Sale price: $${cartItem.salePrice}`}
          >
            ${cartItem.salePrice}
          </span>
        </div>
        <div
          className="flex gap-2 [&_button]:text-xl [&_button]:text-neutral-200"
          role="group"
          aria-label={`Quantity controls for ${cartItem.name}`}
        >
          <div className="bg-neutral-900 flex items-center gap-2 rounded-lg [&>button]:bg-neutral-950 [&>button]:px-2 [&>*]:py-2">
            <button
              type="button"
              className="rounded-l-lg cursor-pointer"
              onClick={handleDecrease}
              aria-label={
                isRemoveAction
                  ? `Remove ${cartItem.name} from cart`
                  : `Decrease quantity of ${cartItem.name}`
              }
            >
              {isRemoveAction ? "×" : "−"}
            </button>
            <span
              className="select-none px-4 sm:px-8 text-base"
              aria-label={`Current quantity: ${cartItem.quantity}`}
              role="status"
            >
              {cartItem.quantity}
            </span>
            <button
              type="button"
              className="rounded-r-lg cursor-pointer"
              onClick={handleIncrease}
              aria-label={`Increase quantity of ${cartItem.name}`}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </motion.li>
  );
};
