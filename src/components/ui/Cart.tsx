"use client"

import {
  CartContextType,
  CartItemType,
  useCartContext,
} from "@/context/CartContext"
import { useScrollContext } from "@/context/ScrollContext"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import Button from "./Button"
import { AnimatePresence, motion } from "motion/react"
import { easeIn, easeOut } from "motion"

const cartVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { duration: 0.5, ease: easeOut } },
  exit: { width: 0, transition: { duration: 0.5, ease: easeIn } },
}

export default function Cart() {
  const { cart, displayCart, setDisplayCart, addItemToCart } =
    useCartContext() as CartContextType
  const { setAllowScroll } = useScrollContext()
  const [displayDiscountInput, setDisplayDiscountInput] = useState(false)
  const [salePrice, setSalePrice] = useState(0)
  const [discountCode, setDiscountCode] = useState("")

  const updateQuantity = (cartItem: CartItemType, newQuantity: number) => {
    return addItemToCart({
      ...cartItem,
      quantity: newQuantity,
    })
  }

  const priceWithoutDiscounts = useMemo(() => {
    return cart?.cartItems?.reduce(
      (acc, item) => acc + item.quantity! * item.price,
      0
    )
  }, [cart?.cartItems])

  useMemo(() => {
    setSalePrice(
      cart?.cartItems?.reduce(
        (acc, item) => acc + item.quantity! * item.salePrice,
        0
      )
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
    <AnimatePresence>
      <div
        className={`fixed inset-0 h-screen z-50 transition-all duration-300 ${
          displayCart ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          id="overlay"
          className="hidden md:block fixed w-full h-full bg-black opacity-55 z-40"
          onClick={() => setDisplayCart(false)}
        />
        <motion.div
          className="fixed right-0 w-[100vw] md:w-[50vw] h-full max-h-screen z-60 bg-black px-8 md:px-16 py-8 flex flex-col items-center justify-between gap-8 md:gap-16 border-l border-l-neutral-950"
          initial="hidden"
          variants={cartVariants}
          animate={displayCart ? "visible" : "hidden"}
          exit="exit"
        >
          <div className="w-full flex justify-between md:justify-center items-center px-8">
            <div />
            <h2 className="text-white select-none">Cart</h2>
            <button
              onClick={() => setDisplayCart(false)}
              className="block md:hidden text-2xl h2 h-fit"
            >
              ×
            </button>
          </div>
          <ul
            className="flex flex-col relative w-full flex-1 overflow-y-auto"
            id="cart"
            style={{
              maxHeight: "calc(100vh - 300px)",
              overscrollBehavior: "contain",
            }}
          >
            <AnimatePresence>
              {cart?.cartItems?.length ? (
                cart?.cartItems?.map((cartItem, i) => (
                  <motion.li
                    className="flex justify-between border-b-[0.5px] border-b-neutral-700 py-4 relative"
                    key={`cartItem-${i}`}
                    exit={{
                      opacity: 0,
                      scale: 0,
                      transition: { duration: 0.5, ease: "easeOut" },
                    }}
                  >
                    <div className="flex gap-4">
                      <div className="relative flex justify-center items-center h-[100px] min-w-[100px]">
                        <Image
                          src={`/images/${cartItem.slug}-tub.webp`}
                          alt={cartItem.name}
                          fill
                          className="object-scale-down"
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <h3>{cartItem.name}</h3>
                        <div className="[&>p]:text-neutral-300">
                          <p>
                            {cartItem.slug !== "bundle" && cartItem.size + "g"}
                          </p>
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
                        <div className="bg-neutral-900 flex items-center gap-2 rounded-lg [&>button]:bg-neutral-950 [&>button]:px-2 [&>*]:py-2">
                          <button
                            className="rounded-l-lg cursor-pointer"
                            onClick={() => updateQuantity(cartItem, -1)}
                          >
                            {cartItem.quantity === 1 ? "×" : "−"}
                          </button>
                          <p className="select-none px-8 text-base">
                            {cartItem.quantity}
                          </p>
                          <button
                            className="rounded-r-lg cursor-pointer"
                            onClick={() => updateQuantity(cartItem, +1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))
              ) : (
                // Invisible placeholder to keep AnimatePresence active
                <motion.div
                  key="empty-cart-placeholder"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                />
              )}
            </AnimatePresence>
          </ul>
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ display: cart?.cartItems?.length > 0 ? "none" : "flex" }}
          >
            <p className="text-neutral-200">No items.</p>
          </div>
          <div id="checkout" className="relative w-full flex flex-col gap-8">
            <div className="relative flex justify-between items-end">
              <div className="relative flex-1 h-full flex items-end justify-start">
                <motion.button
                  className={`absolute text-neutral-400 cursor-pointer`}
                  animate={{
                    opacity: displayDiscountInput ? 0 : 1,
                    display: displayDiscountInput ? "none" : "block",
                  }}
                  onClick={() => {
                    setDisplayDiscountInput(true)
                  }}
                >
                  Use promotion code...
                </motion.button>
                <div className="flex gap-2 items-center absolute bottom-0">
                  <motion.input
                    className={`text-neutral-200 p-2 rounded-lg focus:border-none focus:outline-none bg-transparent`}
                    animate={{
                      opacity: displayDiscountInput ? 1 : 0,
                      display: displayDiscountInput ? "block" : "none",
                    }}
                    type="text"
                    placeholder="Enter code..."
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    disabled
                  />
                  <div className="flex items-end gap-2">
                    <motion.button
                      onClick={() => {
                        setDisplayDiscountInput(false)
                      }}
                      animate={{
                        opacity: displayDiscountInput ? 1 : 0,
                        display: displayDiscountInput ? "block" : "none",
                      }}
                    >
                      ×
                    </motion.button>
                    <motion.button
                      animate={{
                        opacity: displayDiscountInput ? 1 : 0,
                        display: displayDiscountInput ? "block" : "none",
                      }}
                      className="text-neutral-500"
                    >
                      ✓
                    </motion.button>
                  </div>
                </div>
              </div>
              <div className="relative w-1/2 md:w-1/3 [&>p]:font-bold [&>p]:w-full [&>p]:inline-flex [&>p]:justify-between">
                <p className="text-green-500">
                  <span>DISCOUNTS: </span>
                  <span>
                    -${(priceWithoutDiscounts - salePrice).toFixed(2)}
                  </span>
                </p>
                <p>
                  <span>TOTAL: </span>
                  <span>${salePrice.toFixed(2)}</span>
                </p>
              </div>
            </div>
            <Button text="Checkout" />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
