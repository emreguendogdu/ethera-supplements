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
import Checkout from "./Checkout"

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
  const [showCheckout, setShowCheckout] = useState(false)

  const updateQuantity = (cartItem: CartItemType, newQuantity: number) => {
    return addItemToCart({
      ...cartItem,
      quantity: newQuantity,
    })
  }

  const handleCheckout = () => {
    setShowCheckout(true)
  }

  const handleCloseCheckout = () => {
    setShowCheckout(false)
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
      <aside
        className={`fixed inset-0 h-screen z-50 transition-all duration-300 ${
          displayCart ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-hidden={!displayCart}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        aria-describedby="cart-description"
      >
        <div
          id="overlay"
          className="hidden md:block fixed w-full h-full bg-black opacity-75 z-40"
          onClick={() => setDisplayCart(false)}
          aria-label="Close cart overlay"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setDisplayCart(false)
            }
          }}
        />
        <motion.section
          className="fixed right-0 w-[100vw] sm:w-[45vw] md:w-[35vw] h-full max-h-screen z-60 bg-black px-8 md:px-16 py-8 flex flex-col items-center justify-between gap-8 md:gap-16 border-l border-l-neutral-950 backdro-blur-2xl"
          initial="hidden"
          variants={cartVariants}
          animate={displayCart ? "visible" : "hidden"}
          exit="exit"
          role="region"
          aria-label="Shopping cart"
        >
          <header className="w-full flex justify-between md:justify-center items-center px-8">
            <div aria-hidden="true" />
            <h2 id="cart-title" className="text-white select-none">
              Shopping Cart
            </h2>
            <button
              onClick={() => setDisplayCart(false)}
              className="block md:hidden text-2xl h2 h-fit"
              aria-label="Close shopping cart"
              type="button"
            >
              ×
            </button>
          </header>
          <main
            className="flex flex-col relative w-full flex-1 overflow-y-auto"
            id="cart-content"
            style={{
              maxHeight: "calc(100vh - 300px)",
              overscrollBehavior: "contain",
            }}
            role="main"
            aria-label="Cart items"
          >
            <p id="cart-description" className="sr-only">
              Your shopping cart contains {cart?.cartItems?.length || 0} items.
              Use the quantity controls to adjust amounts or remove items.
            </p>
            <AnimatePresence>
              {cart?.cartItems?.length ? (
                <ul
                  className="flex flex-col"
                  role="list"
                  aria-label="Shopping cart items"
                >
                  {cart?.cartItems?.map((cartItem, i) => (
                    <motion.li
                      className="flex justify-between border-b-[0.5px] border-b-neutral-700 py-4 relative"
                      key={`cartItem-${i}`}
                      exit={{
                        opacity: 0,
                        scale: 0,
                        transition: { duration: 0.5, ease: "easeOut" },
                      }}
                      role="listitem"
                    >
                      <div className="flex gap-4">
                        <figure className="relative flex justify-center items-center h-[100px] min-w-[100px]">
                          <Image
                            src={`/images/${cartItem.slug}-tub.webp`}
                            alt={`${cartItem.name} product image`}
                            fill
                            className="object-scale-down"
                          />
                        </figure>
                        <div className="flex flex-col justify-between">
                          <h3 className="text-white">{cartItem.name}</h3>
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
                              onClick={() => updateQuantity(cartItem, -1)}
                              aria-label={
                                cartItem.quantity === 1
                                  ? `Remove ${cartItem.name} from cart`
                                  : `Decrease quantity of ${cartItem.name}`
                              }
                            >
                              {cartItem.quantity === 1 ? "×" : "−"}
                            </button>
                            <span
                              className="select-none px-8 text-base"
                              aria-label={`Current quantity: ${cartItem.quantity}`}
                              role="status"
                            >
                              {cartItem.quantity}
                            </span>
                            <button
                              type="button"
                              className="rounded-r-lg cursor-pointer"
                              onClick={() => updateQuantity(cartItem, +1)}
                              aria-label={`Increase quantity of ${cartItem.name}`}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
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
          </main>
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ display: cart?.cartItems?.length > 0 ? "none" : "flex" }}
            role="status"
            aria-live="polite"
            aria-label="Empty cart status"
          >
            <p className="text-neutral-200">Your cart is empty.</p>
          </div>
          <footer
            id="checkout"
            className="relative w-full flex flex-col gap-8"
            role="contentinfo"
            aria-label="Cart summary and checkout"
          >
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
                  aria-label="Enter promotion code"
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
                    aria-label="Promotion code input"
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
                      aria-label="Cancel promotion code"
                    >
                      ×
                    </motion.button>
                    <motion.button
                      animate={{
                        opacity: displayDiscountInput ? 1 : 0,
                        display: displayDiscountInput ? "block" : "none",
                      }}
                      className="text-neutral-500"
                      aria-label="Apply promotion code"
                    >
                      ✓
                    </motion.button>
                  </div>
                </div>
              </div>
              <div
                className="relative w-1/2 md:w-1/3 [&>p]:font-bold [&>p]:w-full [&>p]:inline-flex [&>p]:justify-between"
                role="group"
                aria-label="Order summary"
              >
                <p
                  className="text-green-500"
                  aria-label={`Total discounts: $${(
                    priceWithoutDiscounts - salePrice
                  ).toFixed(2)}`}
                >
                  <span>DISCOUNTS: </span>
                  <span>
                    -${(priceWithoutDiscounts - salePrice).toFixed(2)}
                  </span>
                </p>
                <p aria-label={`Order total: $${salePrice.toFixed(2)}`}>
                  <span>TOTAL: </span>
                  <span>${salePrice.toFixed(2)}</span>
                </p>
              </div>
            </div>
            <Button text="Checkout" type="button" onClick={handleCheckout} />
          </footer>
          <Checkout showCheckout={showCheckout} onClose={handleCloseCheckout} />
        </motion.section>
      </aside>
    </AnimatePresence>
  )
}
