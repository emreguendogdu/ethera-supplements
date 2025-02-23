"use client"

import { products } from "@/data"
import Image from "next/image"
import { useState } from "react"
import Button from "../ui/Button"
import useDeviceSize from "@/hooks/useDeviceSize"

const productPositionVariants = {
  left: { x: "-200%", scale: 0.25, zIndex: 3 },
  leftSelected: { x: "-200%", scale: 0.25, zIndex: 1 },
  center: { x: "0%", scale: 1, zIndex: 10 },
  right: { x: "200%", scale: 0.25, zIndex: 2 },
}

const mobileProductPositionVariants = {
  left: { x: "-55%", scale: 0.25, zIndex: 3 },
  leftSelected: { x: "-55%", scale: 0.25, zIndex: 1 },
  center: { x: "0%", scale: 1, zIndex: 10 },
  right: { x: "55%", scale: 0.25, zIndex: 2 },
}

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(0)

  const getProductPosition = (index) => {
    if (index === selectedProduct) return "center"
    if (index === (selectedProduct + 1) % products.length) return "right"
    return "left"
  }

  const handleProductClick = (i) => {
    if (i === selectedProduct) return
    setSelectedProduct(i)
  }

  const { isMobile } = useDeviceSize()

  return (
    <>
      <section className="relative min-h-[150vh] w-full mt-[75vh]">
        <div className="sticky top-0 p-section-m md:p-section h-screen flex flex-col justify-center items-center w-full gap-4 md:gap-8 md:justify-start text-center bg-black">
          <div>
            <h2 className="relative [&>span]:inline-block">
              <span className="text-neutral-200 h2 leading-none">
                No fluff.
              </span>
              <br />
              <span className="h1 relative leading-none">Only essentials.</span>
            </h2>
          </div>
          <ul className="relative w-screen h-[400px] flex justify-center">
            {products.map((product, i) => (
              <motion.li
                className={`absolute flex flex-col items-center w-[300px] h-[500px] gap-2 ${
                  i !== selectedProduct ? "cursor-pointer" : ""
                }`}
                key={`sp-${i}`}
                onClick={() => {
                  handleProductClick(i)
                }}
                variants={
                  isMobile
                    ? mobileProductPositionVariants
                    : productPositionVariants
                }
                animate={getProductPosition(i)}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                <div className="flex items-center justify-center w-2/3 h-1/2 md:w-3/4 md:h-3/4">
                  <Image
                    src={`/images/${product.slug}-tub.webp`}
                    width={225}
                    height={125}
                    alt={product.name}
                    className="relative select-none drag-none w-full h-full object-scale-down"
                  />
                </div>
                <div
                  className={`relative flex flex-col text-center justify-center items-center gap-4 ${
                    getProductPosition(i) !== "center" && "invisible"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <h3 className="subheading text-xl tracking-wide w-fit">
                      {product.name}
                    </h3>
                    <p>{product.description}</p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2">
                      <span className="line-through text-neutral-500">
                        ${product.stockData[0].price}
                      </span>
                      <span className="font-bold text-xl">
                        ${product.stockData[0].salePrice}
                      </span>
                    </p>
                    <div className="mt-2">
                      <Button href={`/products/${product.slug}`}>
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
