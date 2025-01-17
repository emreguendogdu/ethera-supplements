"use client"

import { createContext, useState, useEffect } from "react"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [displayCart, setDisplayCart] = useState(false)

  useEffect(() => {
    setCartToState()
  }, [])

  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    )
  }
  // Asıl producttan name, fiyat bilgileri,
  // Sepete eklenenden ise id, quantity bilgileri alınır.

  const addItemToCart = async ({
    slug,
    name,
    price,
    salePrice,
    id,
    quantity = 1,
  }) => {
    const item = {
      slug,
      name,
      price,
      salePrice,
      id,
      quantity,
    }

    const isItemExist = cart?.cartItems?.find((i) => i.id === item.id)

    let newCartItems

    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
      )
    } else {
      newCartItems = [...(cart?.cartItems || []), item]
    }

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }))
    setCartToState()
  }

  const deleteItemFromCart = (id) => {
    const newCartItems = cart?.cartItems?.filter((i) => i.id !== id)

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }))
    setCartToState()
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
