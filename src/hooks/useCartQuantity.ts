import { useCallback } from "react";
import { CartContextType } from "@/types/cart";
import { CartItemType } from "@/types/cart";
import { useCartContext } from "@/context/CartContext";

export const useCartQuantity = () => {
  const { addItemToCart } = useCartContext() as CartContextType;

  const updateQuantity = useCallback(
    (cartItem: CartItemType, quantityChange: number) => {
      const newQuantity = (cartItem.quantity || 1) + quantityChange;
      return addItemToCart({
        ...cartItem,
        quantity: newQuantity,
      });
    },
    [addItemToCart]
  );

  return {
    updateQuantity,
  };
};


