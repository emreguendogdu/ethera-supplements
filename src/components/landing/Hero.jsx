"use client"

import Link from "next/link"
import { CopyIcon } from "@/components/icons/Copy"
import Image from "next/image"
import { products, discountCode } from "@/data"
import { useState } from "react"
import { Bodybuilder } from "@/components/3d/Bodybuilder"

export default function Hero() {
  const [
    showDiscountCodeCopiedNotification,
    setshowDiscountCodeCopiedNotification,
  ] = useState(false)

  const copyDiscountCode = () => {
    navigator.clipboard.writeText(discountCode)
    setshowDiscountCodeCopiedNotification(true)
    setTimeout(() => {
      setshowDiscountCodeCopiedNotification(false)
    }, 1500) // Hide notification after 1.5 seconds
  }
  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex justify-center items-center"
      >
        <div
          id="canvas-container"
          className="absolute right-0 top-0 bottom-0 w-screen h-screen"
        >
          <Bodybuilder />
        </div>
        <div
          id="hero-content"
          className="flex flex-col gap-4 -translate-y-[10%] text-center items-center"
        >
          <h1>
            Build muscle.
            <br />
            Boost strength.
            <br />
            No BS.
          </h1>
          <p className="uppercase font-bold">
            20% off code:{" "}
            <button
              onClick={copyDiscountCode}
              className="ml-1 bg-gradient-radial from-white via-white to-gray-400 text-black px-3 py-1 rounded-lg uppercase font-bold"
            >
              {showDiscountCodeCopiedNotification ? "Copied!" : "ETHERA"}
              {!showDiscountCodeCopiedNotification && (
                <CopyIcon className="relative inline ml-1 -translate-y-1/4" />
              )}
            </button>
          </p>
          <Link href="/shop" className="button text-center px-20">
            Shop Now
          </Link>
        </div>
      </section>
      <section className="relative flex flex-col gap-4 md:gap-16 items-center justify-center text-center">
        <h2>
          <span>No fluff.</span>
          <br />
          <span className="h1">Only essentials.</span>
        </h2>
        <ul className="flex gap-4 md:gap-16">
          {products.map((product, i) => (
            <Link href={product.href} key={`sp-${i}`}>
              <li className="flex flex-col items-center gap-2">
                <Image
                  src="/images/product-obj.png"
                  width={180}
                  height={100}
                  alt={product.name}
                />
                <h3>{product.name}</h3>
              </li>
            </Link>
          ))}
        </ul>
      </section>
    </>
  )
}
