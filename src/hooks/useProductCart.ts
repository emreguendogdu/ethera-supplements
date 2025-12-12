import { useCallback } from "react";
import { useCartContext } from "@/context/CartContext";
import { CartContextType } from "@/types/cart";
import { Product, ProductStock } from "@/types/product";

interface UseProductCartProps {
  product: Product;
  selectedFlavor: string;
  selectedSize: number;
  stockData: ProductStock[];
}

export const useProductCart = ({
  product,
  selectedFlavor,
  selectedSize,
  stockData,
}: UseProductCartProps) => {
  const { setDisplayCart, addItemToCart } =
    useCartContext() as CartContextType;

  const handleAddToCart = useCallback(() => {
    const selectedStock = stockData.find(
      (stock) => stock.size === selectedSize
    ) || stockData[0];

    addItemToCart({
      slug: product.slug,
      id: `${product.slug}-${selectedFlavor.toLowerCase()}-${selectedSize}`,
      name: product.name,
      flavor: selectedFlavor,
      size: selectedSize,
      price: selectedStock.price,
      salePrice: selectedStock.sale_price,
    });

    setDisplayCart(true);
  }, [product, selectedFlavor, selectedSize, stockData, addItemToCart, setDisplayCart]);

  return {
    handleAddToCart,
  };
};








