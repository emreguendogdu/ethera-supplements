"use client"

import { useState } from "react"
import { products } from "@/data"
import Item from "./Product"

const Items = ({ canvasContainerRef, isSectionInView, CFG }) => {
  const [selectedItem, setSelectedItem] = useState(0)

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
            canvasContainerRef={canvasContainerRef}
            isSectionInView={isSectionInView}
            CFG={CFG}
          />
        )
      })}
    </>
  )
}

export default Items
