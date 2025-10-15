"use client";

import { useState } from "react";
import { products } from "@/data";
import Item from "./Product";

interface ItemsProps {
  isSectionInView: boolean;
}

const Items = ({ isSectionInView }: ItemsProps) => {
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
          />
        );
      })}
    </>
  );
};

export default Items;
