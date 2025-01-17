"use client"

import DeleteIcon from "@/components/icons/Delete"
import CartContext from "@/context/CartContext"
import { products } from "@/data"
import Image from "next/image"
import { useContext, useEffect } from "react"

interface CartItem {
  id: number
  name: string
  size: string
  flavor: string
  price: number
  salePrice: number
  quantity: number
}

export default function Cart() {

  const decreaseQty = (cartItem) => {
    const newQty = cartItem?.quantity - 1
    const item = { ...cartItem, quantity: newQty }

    if (newQty <= 0) return

    addItemToCart(item)
  }

  const increaseQty = (cartItem) => {
    const newQty = cartItem?.quantity + 1
    const item = { ...cartItem, quantity: newQty }

    if (newQty <= 0) return

    addItemToCart(item)
  }

  useEffect(() => {
    console.log("Cart:", cart)
  }, [cart])

  const amountWithoutTax = cart?.cartItems?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  )

  const taxAmount = (amountWithoutTax * 0.15).toFixed(2)

  const totalAmount = (Number(amountWithoutTax) + Number(taxAmount)).toFixed(2)

  return (
    <div
      className={`fixed inset-0 h-screen z-20 transition-all duration-300 ${displayCart ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
    >
      <div
        id="overlay"
        className="fixed w-full h-full bg-black opacity-55 z-20"
        onClick={() => setDisplayCart(false)}
      />
      <div className="fixed right-0 w-[50vw] h-full z-30 bg-black px-8 md:px-16 py-8 flex flex-col items-center justify-between gap-8 md:gap-16">
        <h2 className="text-white select-none">Cart</h2>
        <div id="items" className="relative w-full flex-1">
          {cart?.cartItems?.length >= 1 ? (
            <ul>
              {cart.cartItems.map((product, i) => (
                <li
                  className="flex justify-between border-b-[0.5px] border-b-neutral-700 py-4"
                  key={`product-${i}`}
                >
                  <div className="flex gap-2">
                    <Image
                      src="/images/product-obj.png"
                      width={125}
                      height={125}
                      alt="Product object test"
                    />
                    <div className="flex flex-col justify-between">
                      <h3>{product.name}</h3>
                      <div className="[&>p]:text-neutral-300">
                        <p>{product.size}</p>
                        <p>{product.flavor}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end">
                    <div className="flex gap-2 items-center">
                      <p className="line-through text-red-800">
                        ${product.price}
                      </p>
                      <p className="h3 leading-relaxed">${product.salePrice}</p>
                    </div>
                    <div className="flex gap-2 [&_button]:text-xl [&_button]:text-neutral-200">
                      <div className="bg-neutral-600 flex items-center gap-2 rounded-lg [&>button]:bg-neutral-800 [&>button]:px-2 [&>*]:py-2">
                        <button className="rounded-l-lg" onClick={() => decreaseQty(product)}>-</button>
                        <p className="select-none px-8 text-base">
                          {product.quantity}
                        </p>
                        <button
                          className="rounded-r-lg"
                          onClick={() => increaseQty(product)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-neutral-300">No items.</p>
          )}
        </div>
        <div id="checkout" className="relative w-full flex flex-col gap-8">
          <div className="flex justify-between items-end">
            <button className="text-gray-300 cursor-pointer">
              Use promotion code...
            </button>
            <div className="relative md:w-1/4 [&>p]:font-bold [&>p]:w-full [&>p]:inline-flex [&>p]:justify-between">
              <p className="text-green-600">
                <span>DISCOUNTS: </span>
                <span>-$20</span>
              </p>
              <p>
                <span>TOTAL: </span>
                <span>$29.99</span>
              </p>
            </div>
          </div>
          <button className="button w-full">Checkout</button>
        </div>
      </div>
    </div>
  )
}