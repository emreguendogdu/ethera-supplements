"use client";

import { AnimatePresence, motion } from "motion/react";
import { CartItemType } from "@/types/cart";
import { CartItem } from "./CartItem";

interface CartItemsListProps {
  cartItems: CartItemType[] | undefined;
  onQuantityChange: (cartItem: CartItemType, change: number) => void;
}

export const CartItemsList = ({
  cartItems,
  onQuantityChange,
}: CartItemsListProps) => {
  return (
    <AnimatePresence>
      {cartItems && cartItems.length > 0 ? (
        <ul
          className="flex flex-col"
          role="list"
          aria-label="Shopping cart items"
        >
          {cartItems.map((cartItem, i) => (
            <CartItem
              key={`cartItem-${i}`}
              cartItem={cartItem}
              onQuantityChange={onQuantityChange}
            />
          ))}
        </ul>
      ) : (
        <motion.div
          key="empty-cart-placeholder"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        />
      )}
    </AnimatePresence>
  );
};



