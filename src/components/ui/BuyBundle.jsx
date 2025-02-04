"use client"

import { products } from "@/data"
import Button from "./Button"

export default function BuyBundle() {
  const handleAddToCart = () => {}
  return (
    <section
      id="buy-bundle"
      className="flex flex-col gap-8 items-center justify-center text-center py-0"
    >
      <div className="flex flex-col gap-4 items-center justify-center text-center">
        <p className="subheading custom-border">Most Popular</p>
        <h2>
          <span className="h1">Buy Bundle</span> <br /> Save
          <span className="text-green-500"> 25% more</span>
        </h2>
      </div>
      <p>
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
        <Button text="Add to Cart" type="button" onClick={handleAddToCart} />
      </div>
    </section>
  )
}
