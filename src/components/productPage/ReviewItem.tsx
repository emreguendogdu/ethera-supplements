"use client";

import { motion } from "motion/react";
import Stars from "../ui/Stars";
import { ProductReview } from "@/types/product";

interface ReviewItemProps {
  review: ProductReview;
}

export const ReviewItem = ({ review }: ReviewItemProps) => {
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



