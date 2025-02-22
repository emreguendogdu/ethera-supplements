"use client"

import { products } from "@/data"
import Button from "./Button"
import Image from "next/image"
import { useCartContext } from "@/context/CartContext"

export default function BuyBundle() {
  const { setDisplayCart, addItemToCart } = useCartContext()
  const handleAddToCart = () => {
    addItemToCart({
      slug: "bundle",
      name: "Bundle",
      price: 74,
      salePrice: 64,
      size: 0,
      flavor:
        "300g Creatine, 600g Whey Isolate, 300g Pre-Workout (Add flavors in notes)",
      id: "bundle",
      quantity: 1,
    })
    setDisplayCart(true)
  }
  return (
    <section
      id="buy-bundle"
      className="flex flex-col gap-8 items-center justify-center text-center h-screen py-sectionY-m md:py-sectionY bg-black relative z-10"
    >
      <div className="flex flex-col gap-4 items-center justify-center text-center">
        <p className="subheading custom-border">Most Popular</p>
        <div className="relative w-[400px] h-[300px]">
          <Image
            src="/images/bundle-tub.webp"
            alt="Supplements bundle"
            fill
            className="object-scale-down"
          />
        </div>
        <h2>
          <span className="h1">Buy Bundle</span> <br /> Save
          <span className="text-green-500"> 25% more</span>
        </h2>
      </div>
      <p className="flex gap-2 items-end">
        <span className="line-through text-neutral-500">
          $
          {Object.values(products).reduce(
            (sum, item) => sum + item.stockData[0].price,
            0
          )}
        </span>
        <span className="h2">
          $
          {Math.floor(
            Object.values(products).reduce(
              (sum, item) => sum + item.stockData[0].salePrice,
              0
            ) *
              0.75 -
              1 // %25 discount
          )}
        </span>
      </p>
      <div className="w-fit">
        <Button
          text="Add to Cart"
          type="button"
          onClick={() => {
            handleAddToCart()
          }}
        />
      </div>
    </section>
  )
}
