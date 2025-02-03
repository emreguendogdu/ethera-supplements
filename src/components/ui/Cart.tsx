"use client"

import {
  CartContextType,
  CartItemType,
  useCartContext,
} from "@/context/CartContext"
import { useScrollContext } from "@/context/ScrollContext"
import Image from "next/image"
import { useEffect, useMemo } from "react"

export default function Cart() {
  const { cart, displayCart, setDisplayCart, addItemToCart } =
    useCartContext() as CartContextType
  const { setAllowScroll } = useScrollContext()

  const updateQuantity = (cartItem: CartItemType, newQuantity: number) => {
    return addItemToCart({
      ...cartItem,
      quantity: newQuantity,
    })
  }

  // TODO - Discounts must be calculated with a discount code

  const cartPrice = useMemo(() => {
    return cart?.cartItems?.reduce(
      (acc, item) => acc + item.quantity! * item.price,
      0
    )
  }, [cart?.cartItems])

  const cartSalePrice = useMemo(() => {
    return cart?.cartItems?.reduce(
      (acc, item) => acc + item.quantity! * item.salePrice,
      0
    )
  }, [cart?.cartItems])

  useEffect(() => {
    if (displayCart) {
      setAllowScroll(false)
    } else {
      setAllowScroll(true)
    }
  }, [displayCart, setAllowScroll])

  return (
    <div
      className={`fixed inset-0 h-screen z-20 transition-all duration-300 ${
        displayCart ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        id="overlay"
        className="fixed w-full h-full bg-black opacity-55 z-20"
        onClick={() => setDisplayCart(false)}
      />
      <div className="fixed right-0 w-[50vw] h-full max-h-screen z-30 bg-black px-8 md:px-16 py-8 flex flex-col items-center justify-between gap-8 md:gap-16 border-l border-l-neutral-950">
        <h2 className="text-white select-none">Cart</h2>

        {cart?.cartItems?.length > 0 && (
          <ul
            className="flex flex-col relative w-full flex-1 overflow-y-auto"
            id="cart"
            style={{
              maxHeight: "calc(100vh - 300px)",
              overscrollBehavior: "contain",
            }}
          >
            {cart?.cartItems?.map((cartItem, i) => (
              <li
                className="flex justify-between border-b-[0.5px] border-b-neutral-700 py-4"
                key={`cartItem-${i}`}
              >
                <div className="flex gap-2">
                  <Image
                    src="/images/product-obj.png"
                    width={125}
                    height={125}
                    alt="Product object test"
                  />
                  <div className="flex flex-col justify-between">
                    <h3>{cartItem.name}</h3>
                    <div className="[&>p]:text-neutral-300">
                      <p>{cartItem.size}g</p>
                      <p>{cartItem.flavor}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <div className="flex gap-2 items-center">
                    <p className="line-through text-red-800">
                      ${cartItem.price}
                    </p>
                    <p className="text-lg font-bold leading-relaxed">
                      ${cartItem.salePrice}
                    </p>
                  </div>
                  <div className="flex gap-2 [&_button]:text-xl [&_button]:text-neutral-200">
                    <div className="bg-neutral-600 flex items-center gap-2 rounded-lg [&>button]:bg-neutral-800 [&>button]:px-2 [&>*]:py-2">
                      <button
                        className="rounded-l-lg"
                        onClick={() => updateQuantity(cartItem, -1)}
                      >
                        {cartItem.quantity === 1 ? "×" : "−"}
                      </button>
                      <p className="select-none px-8 text-base">
                        {cartItem.quantity}
                      </p>
                      <button
                        className="rounded-r-lg"
                        onClick={() => updateQuantity(cartItem, +1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div
          className={`w-full h-full flex items-center justify-center ${
            cart?.cartItems?.length > 0 && "hidden"
          }`}
        >
          <p className="text-neutral-200">No items.</p>
        </div>
        <div id="checkout" className="relative w-full flex flex-col gap-8">
          <div className="flex justify-between items-end">
            <button className="text-neutral-400 cursor-pointer">
              Use promotion code...
            </button>
            <div className="relative md:w-1/3 [&>p]:font-bold [&>p]:w-full [&>p]:inline-flex [&>p]:justify-between">
              <p className="text-green-500">
                <span>DISCOUNTS: </span>
                <span>-${(cartPrice - cartSalePrice).toFixed(2)}</span>
              </p>
              <p>
                <span>TOTAL: </span>
                <span>${cartSalePrice.toFixed(2)}</span>
              </p>
            </div>
          </div>
          <button className="button w-full">Checkout</button>
        </div>
      </div>
    </div>
  )
}
