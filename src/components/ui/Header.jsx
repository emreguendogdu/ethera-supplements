"use client"

import { useCartContext } from "@/context/CartContext"
import { products } from "@/data"
import Link from "next/link"
import LogoStrength from "@/components/icons/LogoStrength"
import CartIcon from "@/components/icons/CartIcon"

export default function Header() {
  const { cart, setDisplayCart } = useCartContext()
  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between py-4 bg-black text-neutral-500 z-20 px-sectionX-m md:px-sectionX">
        <Link
          href="/"
          className="font-display font-bold text-center uppercase [&>span]:block [&>span]:leading-4 hover:text-neutral-200 transition-colors subheading text-neutral-600"
        >
          <div className="text-xl flex items-center">
            <LogoStrength className="inline" />
            <span>Ethera</span>
          </div>
        </Link>
        <nav className="hidden md:flex md:gap-4">
          {products.map((product, i) => (
            <Link
              key={`hp__${i}`}
              href={`/products/${product.slug}`}
              className="text-neutral-500 hover:text-neutral-200 subheading font-light"
            >
              {product.name}
            </Link>
          ))}
          <Link
            href="/products/bundle"
            className="text-neutral-500 hover:text-neutral-200 subheading font-light"
          >
            Bundle
          </Link>
        </nav>
        <button
          className="flex gap-3 items-center text-neutral-500 hover:text-neutral-200 [&>p]:text-neutral-500 [&>p]:hover:text-neutral-200 transition-all [&>p]:transition-all"
          onClick={() => setDisplayCart(true)}
        >
          <CartIcon />
          <p className="subheading font-light">
            Cart ({cart?.cartItems?.length || 0})
          </p>
        </button>
      </header>
    </>
  )
}
