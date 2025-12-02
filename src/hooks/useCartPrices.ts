import { useMemo } from "react";
import { CartItemType } from "@/types/cart";

interface UseCartPricesProps {
  cartItems: CartItemType[] | undefined;
}

export const useCartPrices = ({ cartItems }: UseCartPricesProps) => {
  const priceWithoutDiscounts = useMemo(() => {
    return (
      cartItems?.reduce(
        (acc, item) => acc + (item.quantity || 1) * item.price,
        0
      ) || 0
    );
  }, [cartItems]);

  const salePrice = useMemo(() => {
    return (
      cartItems?.reduce(
        (acc, item) => acc + (item.quantity || 1) * item.salePrice,
        0
      ) || 0
    );
  }, [cartItems]);

  const totalDiscount = priceWithoutDiscounts - salePrice;

  return {
    priceWithoutDiscounts,
    salePrice,
    totalDiscount,
  };
};


