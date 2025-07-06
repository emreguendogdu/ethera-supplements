"use client"

import { useRef, useMemo, useCallback } from "react"
import useLandingProductAnimation from "@/hooks/useLandingProductAnimation"
import { Html } from "@react-three/drei"
import { Tub } from "@/components/3d/Tub"
import Button from "@/components/ui/Button"
import { products } from "@/data"
import useLandingProductInitialYAnimation from "@/hooks/useLandingProductInitialYAnimation"
import useLandingProductHover from "@/hooks/useLandingProductHover"
import { desktopCFG, mobileCFG } from "@/config/productAnimationConfig"

const initialPositionY = 3

const getPositionKey = (i, selected, selectedItem) => {
  if (selected) return "center"
  if (i === (selectedItem + 1) % products.length) return "right"
  return "left"
}

const Item = ({
  product,
  i,
  selectedItem,
  setSelectedItem,
  canvasContainerRef,
  isSectionInView,
  CFG,
}) => {
  const ref = useRef(null)
  const selected = useMemo(() => selectedItem === i, [selectedItem, i])

  const positionKey = getPositionKey(i, selected, selectedItem)

  // const { initialPositionY, hasAnimatedIn } =
  //   useLandingProductInitialYAnimation({
  //     canvasContainerRef,
  //     positionKey,
  //     isSectionInView,
  //   })

  const hasAnimatedIn = useMemo(() => false, [])

  // const { hovered, handlePointerOver, handlePointerOut } =
  //   useLandingProductHover(selected, isMobile)

  /*   useLandingProductAnimation({
    ref,
    CFG,
    positionKey,
    selected,
    hovered,
    shouldAnimate: hasAnimatedIn && isSec tionInView,
  })
 */
  const handleClick = useCallback(() => {
    setSelectedItem(i)
  }, [i, setSelectedItem])

  console.log("isThis rendering over and over and over and over and over?")

  return (
    <>
      <group
        ref={ref}
        position={
          hasAnimatedIn
            ? undefined
            : [
                CFG[positionKey].position[0],
                initialPositionY,
                CFG[positionKey].position[2],
              ]
        }
        scale={
          hasAnimatedIn
            ? undefined
            : [
                CFG[positionKey].scale,
                CFG[positionKey].scale,
                CFG[positionKey].scale,
              ]
        }
        // onPointerOver={handlePointerOver}
        // onPointerOut={handlePointerOut}
        onClick={handleClick}
        castShadow
        receiveShadow
      >
        <Tub slug={product.slug} />
      </group>
      {selected && (
        <Html
          center
          position={[
            CFG[positionKey].position[0],
            -0.85,
            CFG[positionKey].position[2],
          ]}
        >
          <div className="w-[250px] flex flex-col items-center justify-center text-center">
            {/* Product Name Title */}
            <h2 className="select-none">{product.name}</h2>
            {/* Price */}
            <p className="flex gap-2 items-center my-2">
              <span className="line-through text-neutral-500 leading-none">
                ${product.stockData[0].price}
              </span>
              <span className="font-bold leading-none">
                ${product.stockData[0].salePrice}
              </span>
            </p>
            {/* Button */}
            <div>
              <Button
                href={`/products/${product.slug}`}
                text="View Product"
                wrapperClassName="mt-2 md:mt-4"
                className="w-fit h-fit"
              />
            </div>
          </div>
        </Html>
      )}
    </>
  )
}

export default Item
