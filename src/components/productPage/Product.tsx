"use client"

import Stars from "@/components/ui/Stars"
import React, { useState } from "react"
import { CartContextType, useCartContext } from "@/context/CartContext"
import BuyBundle from "@/components/ui/BuyBundle"
import { ProductProps } from "@/data"
import ProductCanvas from "@/components/3d/ProductCanvas"
import Button from "../ui/Button"
import { motion } from "motion/react"
import { CaretDown } from "@/components/icons/CaretDown"

export default function Product(params: { product: ProductProps }) {
  const { product } = params
  const { setDisplayCart, addItemToCart } = useCartContext() as CartContextType
  const [SELECTED_FLAVOR, SET_SELECTED_FLAVOR] = useState(
    product.flavor[0].name
  )
  const [SELECTED_SIZE, SET_SELECTED_SIZE] = useState(product.stockData[0].size)
  const [prices, setPrices] = useState([
    product.stockData[0].price,
    product.stockData[0].salePrice,
  ])
  const [infoVisible, setInfoVisible] = useState({
    benefits: false,
    howToUse: false,
    nutritionFacts: false,
  })

  const toggleInfoVisible = (section: keyof typeof infoVisible) => {
    setInfoVisible((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleAddToCart = () => {
    addItemToCart({
      slug: product.slug,
      id: `${product.slug}-${SELECTED_FLAVOR.toLowerCase()}-${SELECTED_SIZE}`,
      name: product.name,
      flavor: SELECTED_FLAVOR,
      size: SELECTED_SIZE,
      price: product.stockData[0].price,
      salePrice: product.stockData[0].salePrice,
    })

    setDisplayCart(true)
  }

  const handleSetSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    SET_SELECTED_SIZE(Number(e.target.value))
    const selectedStock = product.stockData.find(
      (stock) => stock.size === Number(e.target.value)
    )
    setPrices([
      selectedStock?.price || product.stockData[0].price,
      selectedStock?.salePrice || product.stockData[0].salePrice,
    ])
  }

  return (
    <>
      <section
        id="product"
        className="relative min-h-screen flex flex-col md:flex-row gap-8 md:gap-16 p-section-m md:px-section md:pt-section md:pb-section-m"
      >
        <ProductCanvas slug={product.slug} />
        <div className="md:flex-1 flex flex-col gap-4 md:gap-8">
          <header>
            <Stars reviewsLength={81} />
            <h1>{product.name}</h1>
            <p className="subheading my-2">{product.description}</p>
          </header>
          <div className="flex flex-col">
            {product.flavor.map((flavor, i) => (
              <div key={`flvr_${i}`}>
                <input
                  type="radio"
                  id={flavor.name}
                  name="flavor"
                  value={flavor.name}
                  className="hidden peer"
                  onInput={(e) =>
                    SET_SELECTED_FLAVOR((e.target as HTMLInputElement).value)
                  }
                  defaultChecked={i === 0}
                />
                <label
                  htmlFor={flavor.name}
                  className="inline-flex items-center gap-2 justify-between pr-2 w-fit rounded-lg cursor-pointer hover:text-[var(--color)] peer-checked:text-[var(--color)] text-neutral-400 hover:bg-neutral-900"
                  style={{ "--color": flavor.color } as React.CSSProperties}
                >
                  <div
                    className="w-3 h-3"
                    style={{ backgroundColor: flavor.color }}
                  />
                  <p className="w-full text-lg font-semibold">{flavor.name}</p>
                </label>
              </div>
            ))}
          </div>
          <div className="flex border border-separate border-neutral-900 w-fit">
            {product.stockData.map((stock, i) => (
              <div key={`sz_${i}`}>
                <input
                  type="radio"
                  id={String(stock.size)}
                  name="size"
                  value={stock.size}
                  className="hidden peer"
                  onInput={handleSetSize}
                  defaultChecked={i === 0}
                />
                <label
                  htmlFor={String(stock.size)}
                  className="inline-flex px-2 py-2 w-fit cursor-pointer hover:text-neutral-300 border border-separate border-neutral-800 peer-checked:text-white text-neutral-400 hover:bg-neutral-900"
                >
                  <p className="w-full text-lg font-semibold">{stock.size}g</p>
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <p className="line-through text-neutral-500">${prices[0]}</p>
              <p className="h3">${prices[1]}</p>
            </div>
            <p className="text-sm text-neutral-300 text-right">
              {SELECTED_SIZE / product.nutritionFacts.servingSize.size} servings
              ($
              {(
                prices[1] /
                (SELECTED_SIZE / product.nutritionFacts.servingSize.size)
              ).toFixed(2)}
              /each)
            </p>
          </div>
          <div className="relative w-full">
            <Button
              onClick={handleAddToCart}
              type="button"
              text="Add to Cart"
              className="w-full"
            />
          </div>
          <ul className="relative min-h-full flex flex-col gap-2 md:gap-8 text-neutral-300">
            <li className="w-full">
              <div
                className="w-full flex justify-between items-start cursor-pointer"
                onClick={() => toggleInfoVisible("benefits")}
              >
                <h3>Benefits</h3>
                <CaretDown
                  className={`text-xl transition-transform ${
                    infoVisible.benefits ? "rotate-180" : ""
                  }`}
                />
              </div>
              {infoVisible.benefits && (
                <div className="flex flex-col gap-2">
                  {product.benefits.map((benefit, i) => (
                    <p key={`bnf__${i}`}>{benefit}</p>
                  ))}
                </div>
              )}
            </li>
            <li className="flex flex-col gap-2">
              <div
                className="w-full flex justify-between items-start cursor-pointer"
                onClick={() => toggleInfoVisible("nutritionFacts")}
              >
                <h3>Nutrition Facts</h3>
                <CaretDown
                  className={`text-xl transition-transform ${
                    infoVisible.nutritionFacts ? "rotate-180" : ""
                  }`}
                />
              </div>
              {infoVisible.nutritionFacts && (
                <div>
                  <p>
                    <strong>Serving Size:</strong>{" "}
                    {product.nutritionFacts.servingSize.description}
                  </p>
                  <p className="font-bold">Nutrition Facts (per one serving)</p>
                  <table className="table-auto w-full">
                    <tbody>
                      {Object.entries(product.nutritionFacts.amount).map(
                        ([key, value]) => (
                          <tr
                            key={key}
                            className="border-b-[0.5px] border-neutral-500 text-neutral-200"
                          >
                            <th className="px-4 py-2 font-medium text-left">
                              {key
                                .split(/(?=[A-Z])/)
                                .join(" ")
                                .replace(/^\w/, (c) => c.toUpperCase())}
                            </th>
                            <td className="px-4 py-2 text-right">{value}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                  <p className="font-bold">Ingredients</p>
                  <p>{product.nutritionFacts.ingredients}</p>
                </div>
              )}
            </li>
            <li>
              <div
                className="w-full flex justify-between items-start cursor-pointer"
                onClick={() => toggleInfoVisible("howToUse")}
              >
                <h3>How to Use</h3>
                <CaretDown
                  className={`text-xl transition-transform ${
                    infoVisible.howToUse ? "rotate-180" : ""
                  }`}
                />
              </div>
              {infoVisible.howToUse && <motion.p>{product.howToUse}</motion.p>}
            </li>
          </ul>
        </div>
      </section>
      <BuyBundle />
      <section
        id="reviews"
        className="flex flex-col gap-4 md:gap-8 p-section-m md:p-section"
      >
        <div className="text-center flex flex-col items-center gap-2 select-none">
          <h2 className="h1">Reviews</h2>
          <Stars rating={4.5} reviewsLength={81} />
        </div>
        <ul className="flex flex-col gap-8">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, i) => (
              <motion.li
                key={i}
                className="px-8 py-4 pb-6 border border-custom-gray rounded-lg flex flex-col gap-2 relative"
                whileHover={{ scale: 1.1, x: -25, y: 20, rotate: 0.5 }}
              >
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center text-sm font-medium text-neutral-300">
                    <Stars rating={review.rating} />
                    <p>{review.author}</p>
                  </div>
                  <span className="text-neutral-500 text-sm">
                    {review.date}
                  </span>
                </div>
                <h3>{review.title}</h3>
                <p>{review.comment}</p>
              </motion.li>
            ))
          ) : (
            <p className="text-center">No reviews yet.</p>
          )}
        </ul>
        <div className="flex justify-center gap-2">
          {Array.from({ length: Math.ceil(81 / 5) }).map((_, index) => {
            if (index > 4) return null
            return (
              <motion.button key={`rwsb_${index}`} whileHover={{ scale: 1.25 }}>
                {index + 1}
              </motion.button>
            )
          })}
        </div>
      </section>
    </>
  )
}
