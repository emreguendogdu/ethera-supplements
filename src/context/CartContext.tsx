"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { CartItemType, CartContextType } from "../types/cart";
import { useScrollContext } from "./ScrollContext";

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<{ cartItems: CartItemType[] }>({
    cartItems: [],
  });
  const [displayCart, setDisplayCart] = useState(false);
  const { setAllowScroll } = useScrollContext();

  useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart") as string)
        : { cartItems: [] }
    );
  };

  const updateCart = (newCartItems: CartItemType[]) => {
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  useEffect(() => {
    if (displayCart) {
      setAllowScroll(false);
    } else {
      const timer = setTimeout(() => {
        setAllowScroll(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [displayCart, setAllowScroll]);

  const addItemToCart = async ({
    slug,
    name,
    price,
    salePrice,
    size,
    flavor,
    id,
    quantity = 1,
  }: CartItemType) => {
    const addedItem = {
      slug,
      name,
      price,
      salePrice,
      size,
      flavor,
      id,
      quantity,
    };

    const existingAddedItem = cart?.cartItems?.find(
      (cartItem) => cartItem.id === addedItem.id
    );

    let newCartItems;

    if (existingAddedItem) {
      const updatedQuantity = existingAddedItem.quantity! + addedItem.quantity!;
      if (updatedQuantity < 1) {
        newCartItems = cart?.cartItems?.filter(
          (cartItem) => cartItem.id !== existingAddedItem.id
        );
      } else {
        newCartItems = cart?.cartItems?.map((cartItem) =>
          cartItem.id === existingAddedItem.id
            ? {
                ...cartItem,
                quantity: updatedQuantity,
              }
            : cartItem
        );
      }
    } else {
      newCartItems = [...(cart?.cartItems || []), addedItem];
    }

    updateCart(newCartItems);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        displayCart,
        setDisplayCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
