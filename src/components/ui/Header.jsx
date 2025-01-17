"use client"

import CartContext from "@/context/CartContext"
import { products } from "@/data"
import Link from "next/link"
import { useContext } from "react"

export default function Header() {
  const { cart, setDisplayCart } = useContext(CartContext)
  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between py-2 md:py-4 bg-black z-10 brightness-50">
        <Link
          href="/"
          className="font-display font-bold text-center uppercase [&>span]:block [&>span]:leading-4"
        >
          <span className="text-2xl">Ethera</span>
          <span className="text-xs">
            Supplements<sup>®</sup>
          </span>
        </Link>
        <nav className="flex gap-4">
          {products.map((product, i) => (
            <Link key={`hp__${i}`} href={product.href}>
              {product.name}
            </Link>
          ))}
        </nav>
        <button
          className="flex gap-3 items-center"
          onClick={() => setDisplayCart((prev) => !prev)}
        >
          <svg
            width="1.5em"
            height="1.6em"
            viewBox="0 0 34 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.4165 1.3335H7.08317L10.8798 19.1868C11.0094 19.8007 11.3642 20.3521 11.8822 20.7446C12.4002 21.137 13.0483 21.3455 13.7132 21.3335H27.4832C28.148 21.3455 28.7962 21.137 29.3141 20.7446C29.8321 20.3521 30.187 19.8007 30.3165 19.1868L32.5832 8.00016H8.49984M14.1665 28.0002C14.1665 28.7365 13.5322 29.3335 12.7498 29.3335C11.9674 29.3335 11.3332 28.7365 11.3332 28.0002C11.3332 27.2638 11.9674 26.6668 12.7498 26.6668C13.5322 26.6668 14.1665 27.2638 14.1665 28.0002ZM29.7498 28.0002C29.7498 28.7365 29.1156 29.3335 28.3332 29.3335C27.5508 29.3335 26.9165 28.7365 26.9165 28.0002C26.9165 27.2638 27.5508 26.6668 28.3332 26.6668C29.1156 26.6668 29.7498 27.2638 29.7498 28.0002Z"
              stroke="#F3F3F3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>Cart ({cart?.cartItems?.length || 0})</p>
        </button>
      </header>
    </>
  )
}
