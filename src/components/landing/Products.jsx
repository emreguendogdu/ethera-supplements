"use client"

import { products } from "@/data"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Button from "../ui/Button"
import { motion } from "framer-motion"
import { useScroll, useTransform } from "motion/react"

const positionVariants = {
  left: { x: "-200%", scale: 0.25, zIndex: 3 },
  leftSelected: { x: "-200%", scale: 0.25, zIndex: 1 },
  center: { x: "0%", scale: 1, zIndex: 10 },
  right: { x: "200%", scale: 0.25, zIndex: 2 },
}

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(0)
  const targetRef = useRef()
  const { scrollYProgress } = useScroll({ target: targetRef })

  const scale = (startPosition) =>
    useTransform(scrollYProgress, [startPosition, startPosition + 0.2], [1, 0])

  const getPosition = (index) => {
    if (index === selectedProduct) return "center"
    if (index === (selectedProduct + 1) % products.length) return "right"
    return "left"
  }

  const handleClick = (i) => {
    if (i === selectedProduct) return
    setSelectedProduct(i)
  }

  return (
    <>
      <motion.section
        className="relative min-h-[250vh] w-full mt-[100vh] bg-black p-section-m md:p-section"
        ref={targetRef}
      >
        <div className="sticky top-0 px-sectionX-m md:px-sectionX py-sectionY-m md:pt-sectionY  h-screen flex flex-col items-center w-full gap-8 md:gap-16 text-center">
          <div>
            <motion.h2 className="relative [&>span]:inline-block">
              <motion.span style={{ scale: scale(0.6) }}>No fluff.</motion.span>
              <br />
              <motion.span
                className="h1 relative"
                style={{ scale: scale(0.7) }}
              >
                Only essentials.
              </motion.span>
            </motion.h2>
          </div>
          <motion.ul
            className="w-full h-[400px] flex justify-center gap-4 md:gap-16 relative"
            style={{ scale: scale(0.8) }}
          >
            {products.map((product, i) => (
              <motion.li
                className={`absolute flex flex-col items-center gap-2 ${
                  i !== selectedProduct && "cursor-pointer"
                }`}
                key={`sp-${i}`}
                onClick={() => {
                  handleClick(i)
                }}
                variants={positionVariants}
                animate={getPosition(i)}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                <div>
                  <Image
                    src={`/images/${product.slug}-tub.webp`}
                    width={225}
                    height={125}
                    alt={product.name}
                    className="select-none drag-none"
                  />
                </div>
                <div
                  className={`relative flex flex-col items-center gap-4 ${
                    getPosition(i) !== "center" && "invisible"
                  }`}
                >
                  <div>
                    <h3 className="subheading text-xl tracking-wide">
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
          </motion.ul>
        </div>
      </motion.section>
    </>
  )
}
