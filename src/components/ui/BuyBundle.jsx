"use client"

import { products } from "@/data"
import Button from "./Button"
import Image from "next/image"
import { useCartContext } from "@/context/CartContext"

export default function BuyBundle({ className = "" }) {
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
      className={`flex flex-col gap-4 items-center justify-center text-center h-screen py-sectionY-m md:py-sectionY bg-gradient-to-b from-[#0A0A0D] to-black relative z-10 ${className}`}
    >
      <div className="flex flex-col gap-4 items-center justify-center text-center">
        <p className="subheading custom-border hover:border-green-500 hover:text-green-500 select-none transition-all">
          Most Popular
        </p>
        <div className="relative w-screen h-[35vh] md:w-[400px] md:h-[300px] overflow-hidden ">
          <Image
            src="/images/bundle-tub.webp"
            alt="Supplements bundle"
            fill
            className="object-scale-down drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          />
        </div>
        <div>
          <h2 className="uppercase mb-2">Warrior Bundle</h2>
          <p className="uppercase font-bold">
            Save
            <span className="text-green-500"> 25% more</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-8 items-center justify-center">
        <p className="flex gap-2 items-center">
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
      </div>
    </section>
  )
}
