"use client"

import { Canvas } from "@react-three/fiber"
import { Tub } from "@/components/3d/Tub"
import { Backdrop, ContactShadows, Environment, Html } from "@react-three/drei"
import Button from "@/components/ui/Button"
import { useEffect, useMemo, useRef, useState } from "react"
import useDeviceSize from "@/hooks/useDeviceSize"
import { products } from "@/data"
import { useProductAnimation } from "@/hooks/useProductAnimation"
import { desktopCFG, mobileCFG } from "@/config/productConfig"

const getPositionKey = (i, selected, selectedItem) => {
  if (selected) return "center"
  if (i === (selectedItem + 1) % products.length) return "right"
  return "left"
}

const Item = ({ product, i, selectedItem, setSelectedItem, CFG, isMobile }) => {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const selected = selectedItem === i

  const positionKey = getPositionKey(i, selected, selectedItem)
  const targetPosition = CFG[positionKey].position
  const targetRotation = (state) =>
    selected || hovered
      ? [0, Math.sin(state.clock.getElapsedTime()) * 0.125, 0]
      : [0, Math.sin(state.clock.getElapsedTime() * 0.75) * 0.0625, 0]
  const targetScale = hovered
    ? CFG[positionKey].scale + 0.05
    : CFG[positionKey].scale

  useProductAnimation({
    ref,
    position: targetPosition,
    rotation: targetRotation,
    scale: targetScale,
  })

  // Event Handlers
  const handlePointerOver = (e) => {
    if (!selected && !isMobile) {
      e.stopPropagation()
      hover(true)
    }
  }
  const handlePointerOut = () => {
    if (!selected && !isMobile) hover(false)
  }
  const handleClick = () => {
    setSelectedItem(i)
    hover(false)
  }

  useEffect(() => {
    if (isMobile) return

    document.body.style.cursor = hovered ? "pointer" : "auto"
  }, [hovered, isMobile])

  return (
    <>
      <group
        ref={ref}
        position={[0, 10, 0]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
        castShadow
        receiveShadow
      >
        <Tub slug={product.slug} />
      </group>
      {selected && (
        <Html center position={[targetPosition[0], -0.85, targetPosition[2]]}>
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

const Items = () => {
  const [selectedItem, setSelectedItem] = useState(0)
  const { isMobile } = useDeviceSize()

  const CFG = useMemo(() => (isMobile ? mobileCFG : desktopCFG), [isMobile])

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
            isMobile={isMobile}
            CFG={CFG}
          />
        )
      })}
    </>
  )
}

export default function Products() {
  return (
    <>
      <div id="canvas-container" className="w-full h-screen md:h-[100vh]">
        <Canvas camera={{ fov: 50, position: [0, 0, 3] }} className="z-20">
          <Html
            center
            position={[0, 0.95, 0]}
            className="w-full relative"
            wrapperClass="w-full relative"
          >
            <div className="relative w-full flex flex-col gap-2 items-center justify-center">
              <p className="subheading">0 Noise — Just Results.</p>
              <h2 className="uppercase">Only 3 Products.</h2>
            </div>
          </Html>
          <ambientLight intensity={0.35} />
          <directionalLight position={[0, -0.5, 0]} intensity={0.5} />
          <directionalLight position={[-1.7, -0.5, -0.9]} intensity={0.75} />
          <directionalLight position={[1.7, -0.5, 0.9]} intensity={0.75} />
          <Items />
          <Backdrop
            castShadow
            floor={4}
            position={[0, -1, -2.2125]}
            scale={[50, 10, 4]}
          >
            <meshStandardMaterial color="#000000" />
          </Backdrop>
          <ContactShadows
            position={[0, -0.8, 0]}
            scale={10}
            blur={8}
            far={2}
            color="#ffffff"
          />

          <Environment preset="city" environmentIntensity={0.5} />
        </Canvas>
      </div>
    </>
  )
}
