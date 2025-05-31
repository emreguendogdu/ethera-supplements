"use client"

import { useRef, useMemo } from "react"
import useLandingProductAnimation from "@/hooks/useLandingProductAnimation"
import { Html } from "@react-three/drei"
import { Tub } from "@/components/3d/Tub"
import Button from "@/components/ui/Button"
import { products } from "@/data"
import useLandingProductInitialYAnimation from "@/hooks/useLandingProductInitialYAnimation"
import useLandingProductHover from "@/hooks/useLandingProductHover"
import useDeviceSize from "@/hooks/useDeviceSize"
import { desktopCFG, mobileCFG } from "@/config/productAnimationConfig"

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
}) => {
  const ref = useRef()
  const { isMobile } = useDeviceSize()
  const selected = selectedItem === i

  const CFG = useMemo(() => (isMobile ? mobileCFG : desktopCFG), [isMobile])

  const positionKey = getPositionKey(i, selected, selectedItem)

  const { initialPositionY, hasAnimatedIn } =
    useLandingProductInitialYAnimation({
      canvasContainerRef,
      positionKey,
      isInView,
    })

  const { hovered, handlePointerOver, handlePointerOut } =
    useLandingProductHover(selected, isMobile)

  useLandingProductAnimation({
    ref,
    CFG,
    positionKey,
    selected,
    hovered,
    shouldAnimate: hasAnimatedIn && isInView,
  })

  const handleClick = () => {
    setSelectedItem(i)
  }

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
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
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
