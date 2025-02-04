"use client"

import { useCartContext } from "@/context/CartContext"
import { products } from "@/data"
import Link from "next/link"
import CartIcon from "@/components/icons/CartIcon"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { useState } from "react"

export default function Header() {
  const { cart, setDisplayCart } = useCartContext()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })
  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 flex items-center justify-between py-4 bg-black text-neutral-500 z-20 px-sectionX-m md:px-sectionX"
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <Link
          href="/"
          className=" tracking-tight uppercase hover:text-neutral-200 transition-colors subheading text-neutral-600 text-xl font-normal"
        >
          Ethera
        </Link>
        <nav className="hidden md:flex md:gap-4">
          {products.map((product, i) => (
            <Link
              key={`hp__${i}`}
              href={`/products/${product.slug}`}
              className="text-neutral-500 hover:text-neutral-200 subheading font-light transition-all"
            >
              {product.name}
            </Link>
          ))}
          <Link
            href="/products/bundle"
            className="text-neutral-500 hover:text-neutral-200 subheading font-light transition-all"
          >
            Bundle
          </Link>
        </nav>
        <button
          className="flex gap-2 items-center text-neutral-400 hover:text-neutral-200 [&>p]:text-neutral-400 [&>p]:hover:text-neutral-200 transition-all [&>p]:transition-all"
          onClick={() => setDisplayCart(true)}
        >
          <p className="subheading font-light">
            {cart?.cartItems?.length || 0}
          </p>
          <CartIcon />
        </button>
      </motion.header>
    </>
  )
}
