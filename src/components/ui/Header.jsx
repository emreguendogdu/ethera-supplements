"use client"

import { useCartContext } from "@/context/CartContext"
import { products } from "@/data"
import Link from "next/link"
import { CartIcon } from "@/components/ui/icons"

export default function Header() {
  const { cart, setDisplayCart } = useCartContext()

  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between py-4 bg-black text-neutral-500 z-50 px-sectionX-m md:px-sectionX">
        <Link
          href="/"
          className="subheading text-center uppercase text-neutral-500 hover:text-neutral-200 transition-all"
        >
          Ethera<sup>®</sup>
        </Link>
        <nav className="hidden md:flex md:gap-4">
          {products.map((product, i) => (
            <Link
              key={`hp__${i}`}
              href={`/products/${product.slug}`}
              className="text-neutral-500 hover:text-neutral-200 transition-all subheading"
            >
              {product.name}
            </Link>
          ))}
        </nav>
        <button
          className="flex gap-2 items-center group cursor-pointer"
          onClick={() => setDisplayCart(true)}
        >
          <p className="subheading text-neutral-500 group-hover:text-neutral-200 transition-all">
            {cart?.cartItems?.length || 0}
          </p>
          <CartIcon className="group-hover:fill-neutral-200 transition-all" />
        </button>
      </header>
    </>
  )
}
