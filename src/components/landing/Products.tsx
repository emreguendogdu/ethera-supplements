"use client"

import { RefObject, useState } from "react"
import { products } from "@/data"
import Item from "./Product"

interface ItemsProps {
  canvasContainerRef: RefObject<HTMLDivElement>
  isSectionInView: boolean
}

const Items = ({ canvasContainerRef, isSectionInView }: ItemsProps) => {
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
          />
        )
      })}
    </>
  )
}

export default Items
