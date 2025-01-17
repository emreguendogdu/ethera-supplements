"use client"

import { createContext, useState, useEffect, ReactNode } from "react"

export interface CartItemType {
  slug: string
  name: string
  price: number
  salePrice: number
  size: string
  flavor: string
  id: string
  quantity?: number
}

export interface CartContextType {
  cart: { cartItems: CartItemType[] }
  addItemToCart: (item: CartItemType) => void
  deleteItemFromCart: (id: string) => void
  displayCart: boolean
  setDisplayCart: (display: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<{ cartItems: CartItemType[] }>({
    cartItems: [],
  })
  const [displayCart, setDisplayCart] = useState(false)

  useEffect(() => {
    setCartToState()
  }, [])

  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart") as string)
        : { cartItems: [] }
    )
  }

  const handleCartUpdate = (
    newCartItems: (CartItemType | CartItemType[])[]
  ) => {
    setCartToState()
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }))
  }

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
    }

    const existingAddedItem = cart?.cartItems?.find(
      (cartItem) => cartItem.id === addedItem.id
    )

    let newCartItems

    if (existingAddedItem) {
      newCartItems = cart?.cartItems?.map((cartItem) => {
        if (cartItem.quantity! + addedItem.quantity! <= 0)
          return cart?.cartItems?.filter((i) => i.id !== id)
        return cartItem.id === existingAddedItem.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity! + addedItem.quantity!,
            }
          : cartItem
      })
    } else {
      newCartItems = [...(cart?.cartItems || []), addedItem]
    }

    handleCartUpdate(newCartItems)
  }

  const deleteItemFromCart = (id: string) => {
    const newCartItems = cart?.cartItems?.filter((i) => i.id !== id)

    handleCartUpdate(newCartItems)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        deleteItemFromCart,
        displayCart,
        setDisplayCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
