"use client";

import Stars from "../ui/Stars";
import { Product } from "@/types/product";

interface ProductHeaderProps {
  product: Product;
  averageRating: number;
  reviewsLength: number;
}

export const ProductHeader = ({
  product,
  averageRating,
  reviewsLength,
}: ProductHeaderProps) => {
  return (
    <header>
      <Stars rating={averageRating} reviewsLength={reviewsLength} />
      <h1>{product.name}</h1>
      <p className="uppercase font-bold my-2">{product.description}</p>
    </header>
  );
};

