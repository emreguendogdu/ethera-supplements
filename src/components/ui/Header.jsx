"use client"

import { useCartContext } from "@/context/CartContext"
import { products } from "@/data"
import Link from "next/link"
import { CartIcon } from "@/components/ui/icons"

export default function Header() {
  const { cart, setDisplayCart } = useCartContext()

  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between py-4 bg-black text-neutral-500 z-20 px-sectionX-m md:px-sectionX">
        <Link href="/" className="text-center uppercase [&>span]:block">
          <span className="subheading font-light text-base leading-[0.8] bg-gradient-to-b from-[hsl(0,0%,50%)] to-[hsl(0,0%,35%)] text-transparent bg-clip-text">
            Ethera
          </span>
        </Link>
        <nav className="hidden md:flex md:gap-4">
          {products.map((product, i) => (
            <Link
              key={`hp__${i}`}
              href={`/products/${product.slug}`}
              className="text-neutral-500 hover:text-neutral-200 hover:tracking-[0.15em] transition-all subheading font-light"
            >
              {product.name}
            </Link>
          ))}
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
      </header>
    </>
  )
}
