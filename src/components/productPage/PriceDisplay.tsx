"use client";

import { ProductNutrition } from "@/types/product";

interface PriceDisplayProps {
  prices: [number, number];
  selectedSize: number;
  nutrition: ProductNutrition | null;
}

export const PriceDisplay = ({
  prices,
  selectedSize,
  nutrition,
}: PriceDisplayProps) => {
  const calculateServings = () => {
    if (!nutrition) return null;
    const servings = selectedSize / nutrition.serving_size;
    const pricePerServing = (prices[1] / servings).toFixed(2);
    return { servings, pricePerServing };
  };

  const servingInfo = calculateServings();

  return (
    <div className="flex justify-between items-center mt-8">
      <div className="flex gap-2 items-center">
        <p className="line-through text-neutral-500">${prices[0]}</p>
        <p className="h2">${prices[1]}</p>
      </div>
      <p className="text-neutral-300 text-right">
        {servingInfo ? (
          <>
            {servingInfo.servings} servings (${servingInfo.pricePerServing}
            /each)
          </>
        ) : (
          "N/A"
        )}
      </p>
    </div>
  );
};






