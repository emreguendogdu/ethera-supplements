"use client"

import { Canvas } from "@react-three/fiber"
import { Tub } from "@/components/3d/Tub"
import { Backdrop, ContactShadows, Environment, Html } from "@react-three/drei"
import Button from "@/components/ui/Button"
import { useEffect, useMemo, useRef, useState } from "react"
import useDeviceSize from "@/hooks/useDeviceSize"
import { products } from "@/data"
import { useControls } from "leva"
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
        position={[0, 10, 0]} // Initial position - will be overridden by the useFrame hook
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
        castShadow
        receiveShadow
      >
        <Tub slug={product.slug} />
      </group>
      {selected && (
        <Html center position={[targetPosition[0], -0.8, targetPosition[2]]}>
          <div className="w-[200px] flex flex-col items-center justify-center text-center">
            <h3 className="subheading text-base md:text-xl tracking-wide w-fit select-none">
              {product.name}
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 justify-center items-center">
                <p className="line-through text-neutral-500">
                  ${product.stockData[0].price}
                </p>
                <p className="font-bold text-base">
                  ${product.stockData[0].salePrice}
                </p>
              </div>
              <div className="mt-2">
                <Button
                  href={`/products/${product.slug}`}
                  className="w-fit h-fit"
                >
                  Buy now
                </Button>
              </div>
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
  const { l1Pos, l2Pos, l3Pos } = useControls({
    // Light position controls array
    l1Pos: { value: [0, -0.5, 0] },
    l2Pos: { value: [-1.7, -0.5, -0.9] },
    l3Pos: { value: [1.7, -0.5, 0.9] },
  })

  return (
    <>
      <div id="canvas-container" className="w-full h-screen md:h-[100vh]">
        <Canvas camera={{ fov: 50, position: [0, 0, 3] }}>
          {/* <OrbitControls
            enableZoom={false}
            minAzimuthAngle={minAzimuthAngle}
            maxAzimuthAngle={maxAzimuthAngle}
          /> */}
          <ambientLight intensity={0.35} />
          <directionalLight position={l1Pos} intensity={0.5} />
          <directionalLight position={l2Pos} intensity={0.75} />
          <directionalLight position={l3Pos} intensity={0.75} />
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
