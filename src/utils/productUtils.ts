import { ProductReview } from "@/types/product";

export const calculateAverageRating = (reviews: ProductReview[]): number => {
  if (reviews.length === 0) return 0;
  return (
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  );
};

