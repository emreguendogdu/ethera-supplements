"use client";

import Stars from "../ui/Stars";
import React, { Fragment, useCallback, useState } from "react";
import { useCartContext } from "@/context/CartContext";
import BuyBundle from "@/components/ui/BuyBundle";
import { Product, ProductReview } from "@/types/product";
import { CartContextType } from "@/types/cart";
import ProductCanvas from "@/components/3d/ProductCanvas";
import Button from "../ui/Button";
import { motion } from "motion/react";
import { CaretDown } from "@/components/ui/Icons";

export default function ProductPage(params: {
  product: Product;
  allProducts: Product[];
}) {
  const { product, allProducts } = params;
  const { setDisplayCart, addItemToCart } = useCartContext() as CartContextType;

  const nutrition = product.product_nutrition;
  const flavors = product.product_flavors || [];
  const stockData = product.product_stock || [];
  const reviews = product.product_reviews || [];
  const benefits = product.product_benefits || [];

  const [SELECTED_FLAVOR, SET_SELECTED_FLAVOR] = useState(
    flavors[0]?.name || ""
  );
  const [SELECTED_SIZE, SET_SELECTED_SIZE] = useState(stockData[0]?.size || 0);
  const [prices, setPrices] = useState([
    stockData[0]?.price || 0,
    stockData[0]?.sale_price || 0,
  ]);
  const [infoVisible, setInfoVisible] = useState({
    benefits: false,
    howToUse: true,
    nutritionFacts: true,
  });

  const toggleInfoVisible = useCallback((section: keyof typeof infoVisible) => {
    setInfoVisible((prev) => ({ ...prev, [section]: !prev[section] }));
  }, []);

  const handleAddToCart = () => {
    addItemToCart({
      slug: product.slug,
      id: `${product.slug}-${SELECTED_FLAVOR.toLowerCase()}-${SELECTED_SIZE}`,
      name: product.name,
      flavor: SELECTED_FLAVOR,
      size: SELECTED_SIZE,
      price: stockData[0].price,
      salePrice: stockData[0].sale_price,
    });

    setDisplayCart(true);
  };

  const handleSetSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(e.target.value);
    SET_SELECTED_SIZE(newSize);
    const selectedStock = stockData.find((stock) => stock.size === newSize);
    setPrices([
      selectedStock?.price || stockData[0].price,
      selectedStock?.sale_price || stockData[0].sale_price,
    ]);
  };

  return (
    <>
      <section
        id="product"
        className="relative min-h-screen flex flex-col md:flex-row gap-8 md:gap-16 p-section-m md:px-section md:pt-section md:pb-section-m"
      >
        <ProductCanvas slug={product.slug} glbUrl={product.glbUrl} />
        <div className="md:flex-1 flex flex-col gap-4 md:gap-8">
          <header>
            <Stars reviewsLength={reviews.length} />
            <h1>{product.name}</h1>
            <p className="uppercase font-bold my-2">{product.description}</p>
          </header>
          <div className="flex flex-col">
            {flavors.map((flavor, i) => (
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
                  <p className="w-full uppercase font-bold">{flavor.name}</p>
                </label>
              </div>
            ))}
          </div>
          <div className="flex border border-separate border-neutral-900 w-fit">
            {stockData.map((stock, i) => (
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
                  <p className="w-full uppercase font-bold">{stock.size}g</p>
                </label>
              </div>
            ))}
          </div>
          {/* Price */}
          <div className="flex justify-between items-center mt-8">
            <div className="flex gap-2 items-center">
              <p className="line-through text-neutral-500">${prices[0]}</p>
              <p className="h2">${prices[1]}</p>
            </div>
            <p className="text-neutral-300 text-right">
              {nutrition ? (
                <>
                  {SELECTED_SIZE / nutrition.serving_size} servings ($
                  {(
                    prices[1] /
                    (SELECTED_SIZE / nutrition.serving_size)
                  ).toFixed(2)}
                  /each)
                </>
              ) : (
                "N/A"
              )}
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
                className="w-full flex justify-between items-start cursor-pointer mb-2"
                onClick={() => toggleInfoVisible("benefits")}
              >
                <p className="font-bold uppercase">Benefits</p>
                <CaretDown
                  className={`text-xl transition-transform ${
                    infoVisible.benefits ? "rotate-180" : ""
                  }`}
                />
              </div>
              {infoVisible.benefits && (
                <div className="flex flex-col gap-2">
                  {benefits.map((benefit, i) => (
                    <p key={`bnf__${i}`}>{benefit.benefit || ""}</p>
                  ))}
                </div>
              )}
            </li>
            <li className="flex flex-col gap-2">
              <div
                className="w-full flex justify-between items-start cursor-pointer mb-2"
                onClick={() => toggleInfoVisible("nutritionFacts")}
              >
                <p className="font-bold uppercase">Nutrition Facts</p>
                <CaretDown
                  className={`text-xl transition-transform ${
                    infoVisible.nutritionFacts ? "rotate-180" : ""
                  }`}
                />
              </div>
              {infoVisible.nutritionFacts && nutrition && (
                <div className="flex flex-col gap-2">
                  <p>
                    <strong>Serving Size:</strong>{" "}
                    {nutrition.serving_description}
                  </p>
                  <p className="font-bold">Nutrition Facts (per one serving)</p>
                  <table className="table-auto w-full">
                    <tbody>
                      {Object.entries(nutrition.amount).map(([key, value]) => (
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
                      ))}
                    </tbody>
                  </table>
                  <p className="font-bold">Ingredients</p>
                  <p>{nutrition.ingredients}</p>
                </div>
              )}
            </li>
            <li>
              <div
                className="w-full flex justify-between items-start cursor-pointer mb-2"
                onClick={() => toggleInfoVisible("howToUse")}
              >
                <p className="font-bold uppercase">How to Use</p>
                <CaretDown
                  className={`text-xl transition-transform ${
                    infoVisible.howToUse ? "rotate-180" : ""
                  }`}
                />
              </div>
              {infoVisible.howToUse && (
                <motion.p>{product.how_to_use}</motion.p>
              )}
            </li>
          </ul>
        </div>
      </section>
      <div className="mt-sectionY-m md:mt-sectionY">
        <BuyBundle products={allProducts} />
      </div>
      <section
        id="reviews"
        className="flex flex-col gap-4 md:gap-8 p-section-m md:p-section"
      >
        <div className="text-center flex flex-col items-center gap-2 select-none">
          <h2 className="h2 uppercase">Reviews</h2>
          <Stars rating={4.5} reviewsLength={81} />
        </div>
        {reviews.length > 0 ? (
          <ReviewSection product={product} />
        ) : (
          <p className="text-center">No reviews yet.</p>
        )}
        <div className="flex justify-center gap-2">
          {Array.from({ length: Math.ceil(81 / 5) }).map((_, index) => {
            if (index > 4) return null;
            return (
              <motion.p
                key={`rwsb_${index}`}
                whileHover={{ scale: 1.25 }}
                className="select-none cursor-pointer first-of-type:text-white text-neutral-500"
              >
                {index + 1}
              </motion.p>
            );
          })}
        </div>
      </section>
    </>
  );
}

function ReviewSection(params: { product: Product }) {
  const { product } = params;
  const reviews = product.product_reviews || [];

  return (
    <ul className="flex flex-col gap-8">
      {reviews.length > 0 ? (
        reviews.map((review: ProductReview, i) => (
          <Fragment key={`rws_${i}`}>
            <Review review={review} />
          </Fragment>
        ))
      ) : (
        <p className="text-center">No reviews yet.</p>
      )}
    </ul>
  );
}

const Review = (params: { review: ProductReview }) => {
  const { review } = params;
  return (
    <motion.li
      className="px-8 py-4 pb-6 border border-custom-gray rounded-lg flex flex-col gap-2 relative"
      initial={{ background: "transparent" }}
    >
      <div className="flex justify-between">
        <div className="flex gap-2 items-center text-sm font-medium text-neutral-300">
          <Stars rating={review.rating} />
          <p>{review.author}</p>
        </div>
        <span className="text-neutral-500 text-sm">{review.date}</span>
      </div>
      <h3>{review.title}</h3>
      <p>{review.comment}</p>
    </motion.li>
  );
};
