"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Tub } from "@/components/3d/Tub"
import { Html, ScrollControls, useScroll } from "@react-three/drei"
import Button from "@/components/ui/Button"
import { useEffect, useRef, useState } from "react"
import { easing } from "maath"
import useDeviceSize from "@/hooks/useDeviceSize"
import { products } from "@/data"

const CFG = {
  center: {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 0.75,
  },
  left: {
    position: [-2.5, 0, 0],
    rotation: [0, -2.25, 0],
    scale: 0.5,
  },
  right: {
    position: [2.5, 0, 0],
    rotation: [0, -0.75, 0],
    scale: 0.5,
  },
}

const Rig = (props) => {
  const ref = useRef()
  // const scroll = useScroll()

  // useFrame((state, delta) => {
  //   ref.current.rotation.y = -scroll.offset * (Math.PI / 2)

  //   console.log(scroll.offset)

  //   // easing.damp3(
  //   //   state.camera.position,
  //   //   [-state.pointer.x * 2, state.pointer.y, 3],
  //   //   0.3,
  //   //   delta
  //   // )
  // })

  return <group ref={ref} {...props} />
}

const Item = ({ slug, positionKey, selectedItem, setSelectedItem }) => {
  const product = products.find((p) => p.slug === slug)
  const ref = useRef()
  const [hovered, hover] = useState(false)

  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? scale + 0.125 : scale, 0.1, delta)
    easing.damp3(
      ref.current.rotation,
      [0, Math.sin(state.clock.getElapsedTime()) * 0.125, 0],
      0.25,
      delta
    )
  })

  
  const position = CFG[positionKey].position
  const scale = CFG[positionKey].scale

  return (
    <>
      <group
        ref={ref}
        position={position}
        scale={scale}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        onClick={() => setSelectedItem(slug)}
        castShadow
        receiveShadow
      >
        <Tub slug={slug} />
      </group>
      {positionKey === "center" && (
        <Html center position={[position[0], -1.25, position[2]]}>
          <div className="w-[200px] flex flex-col items-center justify-center">
            <h3 className="subheading text-xl tracking-wide w-fit">
              {product.name}
            </h3>
            <div>
              <Button href={`/products/${slug}`} className="mt-4 w-fit h-fit">
                Shop now
              </Button>
            </div>
          </div>
        </Html>
      )}
    </>
  )
}

const NewItems = () => {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <>
      <Item
        slug={"whey-isolate"}
        positionKey="center"
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <Item
        slug={"pre-workout"}
        positionKey="left"
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <Item
        slug={"creatine"}
        positionKey="right"
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </>
  )
}

const Items = () => {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const { isMobile } = useDeviceSize()

  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? 0.825 : 0.75, 0.1, delta)
    easing.damp3(
      ref.current.rotation,
      [0, Math.sin(state.clock.getElapsedTime()) * 0.125, 0],
      0.25,
      delta
    )
  })

  // Not working well - not priority
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto"
    return () => (document.body.style.cursor = "auto")
  }, [hovered])

  return (
    <>
      <group
        position={[0, 0, 0]}
        scale={0.75}
        ref={ref}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        castShadow
        receiveShadow
      >
        <Tub slug={"whey-isolate"} />
      </group>
      <Html center position={[0, -1.25, 0]}>
        <div className="w-[200px] flex flex-col items-center justify-center">
          <h3 className="subheading text-xl tracking-wide w-fit">
            Whey Isolate
          </h3>
          <div>
            <Button href="/products/whey-isolate" className="mt-4 w-fit h-fit">
              Shop now
            </Button>
          </div>
        </div>
      </Html>
      <Tub slug={"pre-workout"} {...CFG.left} castShadow receiveShadow />
      <Tub slug={"creatine"} {...CFG.right} castShadow receiveShadow />
    </>
  )
}

export default function Products() {
  return (
    <>
      <div id="canvas-container" className="w-full h-[65vh]">
        <Canvas camera={{ fov: 50, position: [0, 0, 3] }}>
          {/* <OrbitControls enableZoom={false} /> */}
          <ScrollControls pages={3} damping={0.1}>
            <ambientLight intensity={1.25} />
            <directionalLight position={[2, 2, 0]} intensity={0.5} />
            <directionalLight position={[-2, 2, 0]} intensity={0.5} />
            <Rig>
              <NewItems />
            </Rig>
          </ScrollControls>
        </Canvas>
      </div>
    </>
  )
}
