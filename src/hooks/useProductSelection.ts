import { useState, useCallback } from "react";
import { ProductStock, ProductFlavor } from "@/types/product";

interface UseProductSelectionProps {
  flavors: ProductFlavor[];
  stockData: ProductStock[];
}

export const useProductSelection = ({
  flavors,
  stockData,
}: UseProductSelectionProps) => {
  const [selectedFlavor, setSelectedFlavor] = useState(
    flavors[0]?.name || ""
  );
  const [selectedSize, setSelectedSize] = useState(stockData[0]?.size || 0);
  const [prices, setPrices] = useState<[number, number]>([
    stockData[0]?.price || 0,
    stockData[0]?.sale_price || 0,
  ]);

  const handleFlavorChange = useCallback((flavorName: string) => {
    setSelectedFlavor(flavorName);
  }, []);

  const handleSizeChange = useCallback(
    (newSize: number) => {
      setSelectedSize(newSize);
      const selectedStock = stockData.find((stock) => stock.size === newSize);
      setPrices([
        selectedStock?.price || stockData[0].price,
        selectedStock?.sale_price || stockData[0].sale_price,
      ] as [number, number]);
    },
    [stockData]
  );

  return {
    selectedFlavor,
    selectedSize,
    prices,
    handleFlavorChange,
    handleSizeChange,
  };
};

