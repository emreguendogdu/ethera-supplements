"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Backdrop, ContactShadows, Environment, Html } from "@react-three/drei"
import { useRef, useState } from "react"
import { products } from "@/data"
import Item from "./Product"
import useElementInView from "@/hooks/useElementInView"

const Items = ({ canvasContainerRef, isSectionInView }) => {
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

export default function Products() {
  const canvasContainerRef = useRef(null)

  const { isInView: isSectionInView } = useElementInView(
    canvasContainerRef,
    0.03125
  )

  const DisableRender = () => useFrame(() => null, 1000)

  return (
    <>
      <div
        id="canvas-container"
        className="w-full h-screen md:h-[100vh]"
        ref={canvasContainerRef}
      >
        <Canvas camera={{ fov: 50, position: [0, 0, 3] }} className="z-20">
          {!isSectionInView && <DisableRender />}
          <Html
            center
            position={[0, 0.95, 0]}
            className="w-full relative"
            wrapperClass="w-full relative"
          >
            <div className="relative w-full flex flex-col gap-2 items-center justify-center">
              <p className="subheading">Zero Noise — Just Results.</p>
              <h2 className="uppercase">Only 3 Products.</h2>
            </div>
          </Html>
          <ambientLight intensity={0.35} />
          <directionalLight position={[0, -0.5, 0]} intensity={0.5} />
          <directionalLight position={[-1.7, -0.5, -0.9]} intensity={0.75} />
          <directionalLight position={[1.7, -0.5, 0.9]} intensity={0.75} />
          <Items
            canvasContainerRef={canvasContainerRef}
            isSectionInView={isSectionInView}
          />
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
