"use client"

import { products } from "@/data"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Button from "../ui/Button"
import { motion } from "framer-motion"

const positionVariants = {
  left: { x: "-200%", scale: 0.25, zIndex: 4 },
  center: { x: "0%", scale: 1, zIndex: 5 },
  right: { x: "200%", scale: 0.25, zIndex: 4 },
}

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(1)

  const getPosition = (index) => {
    const positions = ["left", "center", "right"]
    const offset = (index - selectedProduct + products.length) % products.length
    return positions[offset] || "right"
  }

  const handleClick = (direction) => {
    setSelectedProduct((prev) =>
      direction === "left"
        ? (prev - 1 + products.length) % products.length
        : (prev + 1) % products.length
    )
  }

  return (
    <>
      <section className="relative min-h-[200vh] w-full">
        <div className="sticky top-0 p-section-m md:p-section h-screen flex flex-col gap-4 md:gap-16 items-center w-full justify-center text-center">
          <div>
            <h2>
              No fluff.
              <br />
              <span className="h1">Only essentials.</span>
            </h2>
          </div>
          <ul className="w-full h-[800px] flex justify-center gap-4 md:gap-16 relative">
            {products.map((product, i) => (
              <motion.li
                className="absolute flex flex-col items-center gap-2 cursor-pointer"
                key={`sp-${i}`}
                onClick={() => setSelectedProduct(i)}
                variants={positionVariants}
                animate={getPosition(i)}
                transition={{ duration: 2 }}
              >
                <Image
                  src="/images/product-obj.png"
                  width={225}
                  height={125}
                  alt={product.name}
                  className="select-none drag-none"
                />
                <div
                  className={`relative flex flex-col items-center gap-8 ${
                    getPosition(i) !== "center" && "invisible"
                  }`}
                >
                  <div>
                    <h3 className="subheading text-xl tracking-wide">
                      {product.name}
                    </h3>
                    <p className="text-base font-bold">{product.description}</p>
                  </div>
                  <div>
                    <p>
                      <span className="line-through text-neutral-500">
                        ${product.stockData[0].price}
                      </span>
                      <span className="font-bold text-xl">
                        ${product.stockData[0].salePrice}
                      </span>
                    </p>
                    <Button href={`/products/${product.slug}`} className="mt-2">
                      Buy Now
                    </Button>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
          <div className="flex gap-4 mt-8 md:mt-16">
            <button onClick={() => handleClick("left")}>◀</button>
            <button onClick={() => handleClick("right")}>▶</button>
          </div>
        </div>
      </section>
    </>
  )
}
