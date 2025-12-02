"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import Stars from "../ui/Stars";
import { Product, ProductReview } from "@/types/product";
import { ReviewItem } from "./ReviewItem";

interface ReviewsSectionProps {
  product: Product;
  averageRating: number;
  reviewsLength: number;
}

export const ReviewsSection = ({
  product,
  averageRating,
  reviewsLength,
}: ReviewsSectionProps) => {
  const reviews = product.product_reviews || [];

  return (
    <section
      id="reviews"
      className="flex flex-col gap-4 md:gap-8 p-section-m md:p-section"
    >
      <div className="text-center flex flex-col items-center gap-2 select-none">
        <h2 className="h2 uppercase">Reviews</h2>
        <Stars rating={averageRating} reviewsLength={reviewsLength} />
      </div>
      {reviews.length > 0 ? (
        <ul className="flex flex-col gap-8">
          {reviews.map((review: ProductReview, i) => (
            <Fragment key={`rws_${i}`}>
              <ReviewItem review={review} />
            </Fragment>
          ))}
        </ul>
      ) : (
        <p className="text-center">No reviews yet.</p>
      )}
      <div className="flex justify-center gap-2">
        {Array.from({ length: Math.ceil(reviewsLength / 5) }).map(
          (_, index) => {
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
          }
        )}
      </div>
    </section>
  );
};


