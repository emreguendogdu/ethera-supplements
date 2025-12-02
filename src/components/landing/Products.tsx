"use client";

import { useState } from "react";
import Item from "./Product";
import { Product } from "@/types/product";

interface ItemsProps {
  isSectionInView: boolean;
  products: Product[];
}

const Items = ({ isSectionInView, products }: ItemsProps) => {
  const [selectedItem, setSelectedItem] = useState(0);

  return (
    <>
      {products.map((product, i) => {
        return (
          <Item
            key={`product-${i}`}
            i={i}
            product={product}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            isSectionInView={isSectionInView}
            totalProducts={products.length}
          />
        );
      })}
    </>
  );
};

export default Items;
