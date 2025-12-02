"use client";

import BuyBundle from "@/components/ui/BuyBundle";
import { Product } from "@/types/product";
import ProductCanvas from "@/components/3d/ProductCanvas";
import Button from "../ui/Button";
import { useProductSelection } from "@/hooks/useProductSelection";
import { useInfoVisibility } from "@/hooks/useInfoVisibility";
import { useProductCart } from "@/hooks/useProductCart";
import { calculateAverageRating } from "@/utils/productUtils";
import { ProductHeader } from "./ProductHeader";
import { FlavorSelector } from "./FlavorSelector";
import { SizeSelector } from "./SizeSelector";
import { PriceDisplay } from "./PriceDisplay";
import { BenefitsSection } from "./BenefitsSection";
import { NutritionFactsSection } from "./NutritionFactsSection";
import { HowToUseSection } from "./HowToUseSection";
import { ReviewsSection } from "./ReviewsSection";

interface ProductPageProps {
  product: Product;
  allProducts: Product[];
}

export default function ProductPage({
  product,
  allProducts,
}: ProductPageProps) {
  const flavors = product.product_flavors || [];
  const stockData = product.product_stock || [];
  const reviews = product.product_reviews || [];
  const benefits = product.product_benefits || [];
  const nutrition = product.product_nutrition;

  const averageRating = calculateAverageRating(reviews);
  const reviewsLength = reviews.length;

  const {
    selectedFlavor,
    selectedSize,
    prices,
    handleFlavorChange,
    handleSizeChange,
  } = useProductSelection({ flavors, stockData });

  const { infoVisible, toggleInfoVisible } = useInfoVisibility();

  const { handleAddToCart } = useProductCart({
    product,
    selectedFlavor,
    selectedSize,
    stockData,
  });

  return (
    <>
      <section
        id="product"
        className="relative min-h-screen flex flex-col md:flex-row gap-8 md:gap-16 p-section-m md:px-section md:pt-section md:pb-section-m"
      >
        <ProductCanvas slug={product.slug} glbUrl={product.glbUrl} />
        <div className="md:flex-1 flex flex-col gap-4 md:gap-8">
          <ProductHeader
            product={product}
            averageRating={averageRating}
            reviewsLength={reviewsLength}
          />
          <FlavorSelector
            flavors={flavors}
            selectedFlavor={selectedFlavor}
            onFlavorChange={handleFlavorChange}
          />
          <SizeSelector
            stockData={stockData}
            selectedSize={selectedSize}
            onSizeChange={handleSizeChange}
          />
          <PriceDisplay
            prices={prices}
            selectedSize={selectedSize}
            nutrition={nutrition}
          />
          <div className="relative w-full">
            <Button
              onClick={handleAddToCart}
              type="button"
              text="Add to Cart"
              className="w-full"
            />
          </div>
          <ul className="relative min-h-full flex flex-col gap-2 md:gap-8 text-neutral-300">
            <BenefitsSection
              benefits={benefits}
              isOpen={infoVisible.benefits}
              onToggle={() => toggleInfoVisible("benefits")}
            />
            {nutrition && (
              <NutritionFactsSection
                nutrition={nutrition}
                isOpen={infoVisible.nutritionFacts}
                onToggle={() => toggleInfoVisible("nutritionFacts")}
              />
            )}
            <HowToUseSection
              howToUse={product.how_to_use}
              isOpen={infoVisible.howToUse}
              onToggle={() => toggleInfoVisible("howToUse")}
            />
          </ul>
        </div>
      </section>
      <div className="mt-sectionY-m md:mt-sectionY">
        <BuyBundle products={allProducts} />
      </div>
      <ReviewsSection
        product={product}
        averageRating={averageRating}
        reviewsLength={reviewsLength}
      />
    </>
  );
}
